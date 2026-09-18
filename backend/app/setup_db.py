"""One-time (idempotent) DB setup: pgvector extension + tables.

Run with: python -m app.setup_db
Safe to re-run — everything is CREATE IF NOT EXISTS.

Note on the knowledge base table: PORTFOLIO_CHATBOT_COMPLETE_SPEC.md /
04_CHATBOT_AGENT_SPEC.md sketch a hand-rolled `knowledge_chunks` table but
also say to use "LangChain's PGVector vectorstore wrapper" for storage and
retrieval — that wrapper (langchain_postgres.PGVector, used in app/rag.py)
manages its own `langchain_pg_collection` / `langchain_pg_embedding` tables
and creates the `vector` extension itself on first use in app/ingest.py, so
we don't hand-roll a second, competing schema for the same data. It's still
a logically separate table from the LangGraph checkpoint tables below,
which is the actual requirement (long-term knowledge vs. per-thread state).
"""

import asyncio
import sys

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from app.db import get_conn, setup_checkpointer

RATE_LIMIT_STATEMENTS = [
    """
    CREATE TABLE IF NOT EXISTS chat_rate_limit (
        id SERIAL PRIMARY KEY,
        thread_id TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
    )
    """,
    """
    CREATE INDEX IF NOT EXISTS chat_rate_limit_thread_time_idx
        ON chat_rate_limit (thread_id, created_at)
    """,
    """
    CREATE TABLE IF NOT EXISTS contact_rate_limit (
        id SERIAL PRIMARY KEY,
        thread_id TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
    )
    """,
    """
    CREATE INDEX IF NOT EXISTS contact_rate_limit_thread_time_idx
        ON contact_rate_limit (thread_id, created_at)
    """,
]


async def main() -> None:
    print("Creating rate limit tables...")
    with get_conn() as conn:
        for statement in RATE_LIMIT_STATEMENTS:
            conn.execute(statement)

    print("Creating LangGraph checkpointer tables...")
    await setup_checkpointer()

    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
