"""FastAPI app — the HTTP layer between the portfolio chat widget and the
LangGraph agent. Owns thread-id issuance (server-side, never client-trusted),
rate limiting, CORS, SSE streaming, and turning any internal failure into a
friendly, non-leaky response.
"""

from __future__ import annotations

import json
import logging
import re
import uuid
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from langchain_core.messages import HumanMessage
from langgraph.types import Command

import asyncio

from app.config import settings
from app.db import open_async_pool
from app.graph import DECLINE_TEXT, UNAVAILABLE_TEXT, get_graph
from app.rag import get_embeddings
from app.rate_limit import check_and_record
from app.schemas import ChatRequest

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("portfolio_assistant")


@asynccontextmanager
async def lifespan(_app: FastAPI):
    await open_async_pool()
    # Pre-warm the embedding model (torch load + first inference is slow)
    # so the first real visitor isn't the one paying for it.
    await asyncio.to_thread(get_embeddings().embed_query, "warmup")
    yield


app = FastAPI(title="Bahawal Khan Portfolio Assistant", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

THREAD_COOKIE = "pf_thread_id"
COOKIE_MAX_AGE = 60 * 60 * 24 * 180  # ~6 months — "remembered on return visits"

# Node names whose LLM output is the actual visitor-facing answer — only
# these get forwarded token-by-token to the client.
STREAMING_NODES = {"generate", "generate_chitchat", "format_tool_response", "answer_from_history"}


def _resolve_thread_id(request: Request) -> tuple[str, bool]:
    """Server-side thread_id. Never trust a client-supplied id — only the
    httpOnly cookie WE set is honored, so nothing in a request body/query
    can point one visitor at another visitor's conversation."""
    existing = request.cookies.get(THREAD_COOKIE)
    if existing:
        return existing, False
    return str(uuid.uuid4()), True


def _set_thread_cookie(response: Response, thread_id: str) -> None:
    response.set_cookie(
        THREAD_COOKIE,
        thread_id,
        max_age=COOKIE_MAX_AGE,
        httponly=True,
        samesite="lax",
        secure=settings.cookie_secure,
    )


def _sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data)}\n\n"


_WORDS_WITH_TRAILING_SPACE = re.compile(r"\S+\s*")
# Canned text (decline, contact-flow prompts, etc.) has no live LLM stream to
# forward, so it's chunked and paced here to read the same word-by-word way
# as a real generation does, instead of the typing indicator suddenly being
# replaced by the whole message at once.
_WORD_STREAM_DELAY = 0.03  # seconds/word


async def _stream_words(text: str):
    for chunk in _WORDS_WITH_TRAILING_SPACE.findall(text):
        yield chunk
        await asyncio.sleep(_WORD_STREAM_DELAY)


def _pending_interrupts(snapshot) -> list:
    """A node paused mid-function on its own langgraph.types.interrupt()
    call (e.g. confirm_send, which calls interrupt() more than once) shows
    up in snapshot.tasks[*].interrupts — NOT snapshot.next, which reports
    the next *edge-level* node to run and is empty while a task is paused
    inside itself rather than between graph steps."""
    if not snapshot.tasks:
        return []
    return [i for task in snapshot.tasks for i in task.interrupts]


def _pending_interrupt_prompt(snapshot) -> str | None:
    """The interrupt's payload isn't in state["messages"] until it's
    resumed, so both the history endpoint and the stream endpoint need this
    to show the pending question rather than silently dropping it."""
    for i in _pending_interrupts(snapshot):
        if isinstance(i.value, dict) and i.value.get("prompt"):
            return i.value["prompt"]
    return None


@app.get("/api/health")
async def health() -> dict:
    return {"ok": True}


@app.get("/api/chat/history")
async def get_history(request: Request) -> dict:
    """Hydrate the widget on page load/return visit. Read-only — never
    issues a cookie itself, so a visitor who never chats never gets a
    thread row created just for loading the page."""
    thread_id = request.cookies.get(THREAD_COOKIE)
    if not thread_id:
        return {"messages": []}

    graph = await get_graph()
    config = {"configurable": {"thread_id": thread_id}}
    try:
        snapshot = await graph.aget_state(config)
    except Exception:
        logger.exception("history lookup failed for thread %s", thread_id)
        return {"messages": []}

    values = snapshot.values if snapshot else {}
    out = []
    for m in values.get("messages", []):
        if m.type == "human" and m.content:
            out.append({"role": "user", "content": m.content})
        elif m.type == "ai" and m.content:
            out.append({"role": "assistant", "content": m.content})

    pending_prompt = _pending_interrupt_prompt(snapshot) if snapshot else None
    if pending_prompt:
        out.append({"role": "assistant", "content": pending_prompt})

    return {"messages": out}


@app.post("/api/chat/new")
async def new_conversation() -> Response:
    """Explicit 'New conversation' — reissue a fresh thread_id. The old
    thread's history stays in Postgres but is no longer referenced by this
    visitor's cookie, so it's simply not resumed."""
    response = Response(content=json.dumps({"ok": True}), media_type="application/json")
    _set_thread_cookie(response, str(uuid.uuid4()))
    return response


@app.post("/api/chat/stream")
async def chat_stream(payload: ChatRequest, request: Request) -> StreamingResponse:
    thread_id, is_new = _resolve_thread_id(request)

    if not check_and_record(thread_id):
        async def rate_limited() -> AsyncIterator[str]:
            yield _sse(
                "error",
                {"message": "You've reached the hourly message limit — please try again later."},
            )

        resp = StreamingResponse(rate_limited(), media_type="text/event-stream")
        if is_new:
            _set_thread_cookie(resp, thread_id)
        return resp

    async def event_stream() -> AsyncIterator[str]:
        graph = await get_graph()
        config = {"configurable": {"thread_id": thread_id}}
        streamed_text = ""

        try:
            # If this thread is currently paused at a langgraph.types.interrupt()
            # (the contact-request confirmation gate), the visitor's message is
            # the answer to that prompt — resume the paused node via
            # Command(resume=...) instead of starting a fresh run from START.
            pre_snapshot = await graph.aget_state(config)
            resuming = bool(_pending_interrupts(pre_snapshot))
            graph_input = (
                Command(resume=payload.message)
                if resuming
                else {"messages": [HumanMessage(content=payload.message)]}
            )

            async for event in graph.astream_events(
                graph_input,
                config=config,
                version="v2",
            ):
                if event["event"] != "on_chat_model_stream":
                    continue
                node = event.get("metadata", {}).get("langgraph_node")
                if node not in STREAMING_NODES:
                    continue
                token = event["data"]["chunk"].content
                if not token:
                    continue
                streamed_text += token
                yield _sse("token", {"token": token})

            if not streamed_text:
                # Either a canned/deterministic path (decline, no-evidence
                # refusal, contact-request prompts) with no LLM tokens
                # streamed live, or the graph just paused at a new interrupt
                # (confirm_send) — either way, send the final text as one
                # message the widget can still render with its typing
                # indicator.
                snapshot = await graph.aget_state(config)
                pending_prompt = _pending_interrupt_prompt(snapshot)
                if pending_prompt:
                    final_text = pending_prompt
                else:
                    final_messages = snapshot.values.get("messages", [])
                    final_text = final_messages[-1].content if final_messages else DECLINE_TEXT
                async for chunk in _stream_words(final_text):
                    yield _sse("token", {"token": chunk})

            yield _sse("done", {})
        except Exception:
            logger.exception("chat_stream failed for thread %s", thread_id)
            yield _sse("error", {"message": UNAVAILABLE_TEXT})

    resp = StreamingResponse(event_stream(), media_type="text/event-stream")
    if is_new:
        _set_thread_cookie(resp, thread_id)
    return resp
