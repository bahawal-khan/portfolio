"""Shared Postgres connections + LangGraph checkpointer.

One Postgres instance, two pools, logically-separate concerns living in it:
- LangGraph checkpoint tables (short-term/thread memory) — via an ASYNC
  pool, since FastAPI's async request handlers drive the graph with
  `astream_events`/`aget_state` and the sync PostgresSaver raises
  NotImplementedError from async code.
- `chat_rate_limit` (and one-off setup scripts) — a small sync pool is
  simpler for these quick, non-LLM-path queries.
- The pgvector knowledge base lives in its own tables managed by
  langchain_postgres.PGVector (see app/rag.py), against this same DATABASE_URL.

See PORTFOLIO_CHATBOT_COMPLETE_SPEC.md's Persistence section.
"""

from __future__ import annotations

from contextlib import contextmanager

from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver
from psycopg.rows import dict_row
from psycopg_pool import AsyncConnectionPool, ConnectionPool

from app.config import settings

# Exact kwargs PostgresSaver/AsyncPostgresSaver's own from_conn_string uses —
# required for the checkpointer's dict-row deserialization to work over a
# pool we manage ourselves.
_connection_kwargs = {
    "autocommit": True,
    "prepare_threshold": 0,
    "row_factory": dict_row,
}

pool = ConnectionPool(
    conninfo=settings.database_url,
    max_size=5,
    kwargs=_connection_kwargs,
    open=True,
)

async_pool = AsyncConnectionPool(
    conninfo=settings.database_url,
    max_size=10,
    kwargs=_connection_kwargs,
    open=False,
)

# AsyncPostgresSaver.__init__ calls asyncio.get_running_loop(), so it can't
# be constructed at module import time (no loop running yet) — build it
# lazily, the first time an async caller actually needs it.
_checkpointer: AsyncPostgresSaver | None = None


async def open_async_pool() -> None:
    if async_pool.closed:
        await async_pool.open()


async def get_checkpointer() -> AsyncPostgresSaver:
    global _checkpointer
    if _checkpointer is None:
        await open_async_pool()
        _checkpointer = AsyncPostgresSaver(async_pool)
    return _checkpointer


async def setup_checkpointer() -> None:
    """Create LangGraph's checkpoint tables if they don't exist yet."""
    cp = await get_checkpointer()
    await cp.setup()


@contextmanager
def get_conn():
    with pool.connection() as conn:
        yield conn
