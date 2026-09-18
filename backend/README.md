# Portfolio Assistant — FastAPI + LangGraph backend

Implements `portfolio-guidance/PORTFOLIO_CHATBOT_COMPLETE_SPEC.md`: a
Self-RAG grounded chatbot over Bahawal Khan's portfolio content, with
structured link tools, PostgreSQL-backed persistence, and SSE streaming.

## Setup

```bash
cd backend
python -m venv .venv
./.venv/Scripts/pip install -r requirements.txt      # Windows
# .venv/bin/pip install -r requirements.txt           # macOS/Linux

# One-time (re-run setup_db.py if you ever drop the DB; re-run ingest.py
# whenever app/data/knowledge_base.py changes):
python -m app.setup_db
python -m app.ingest
```

Uses the repo-root `.env` (same file the Next.js app reads) — needs at
least `GROQ_API_KEY` and `DATABASE_URL` (Postgres with the `vector`
extension available; `CREATE EXTENSION` runs automatically on first
ingest). See `.env.example` at the repo root.

## Running

**Windows (local dev):**

```bash
python run.py
```

Not `uvicorn app.main:app` directly — see the comment in `run.py` for why
(psycopg's async mode needs the selector event loop, and uvicorn only sets
that up in its `--reload` subprocess path, not the default one).

**Linux (production / Hostinger VPS):**

```bash
uvicorn app.main:app --host 127.0.0.1 --port 8001
```

The Windows-only event loop issue doesn't apply here.

## Notes

- Models (`ROUTER_MODEL`/`GENERATION_MODEL` in `app/config.py`) point at
  specific Groq model IDs verified live against `GET /v1/models` — Groq's
  catalog rotates, so if calls start 404ing, re-check that endpoint.
- The knowledge base (`app/data/knowledge_base.py`) and link data
  (`app/data/links.py`) are the only source of truth for portfolio facts
  and URLs — the graph never lets the LLM recall a fact or URL from its
  own memory (see `PERSONA_RULES` in `app/graph.py`).
- Local port is 8001, not 8000 — the owner's separate NexaAI project
  already runs on 8000 on this machine.
