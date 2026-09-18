"""Long-term memory: pgvector-backed retrieval over the knowledge base.

Uses LangChain's PGVector vectorstore wrapper (embeddings + retrieval
utilities are LangChain's job; LangGraph nodes call into this — see
04_CHATBOT_AGENT_SPEC.md's "Framework roles" section) against the same
`knowledge_chunks` table created by app/setup_db.py.
"""

from __future__ import annotations

from functools import lru_cache

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_postgres import PGVector

from app.config import settings

COLLECTION_NAME = "portfolio_knowledge"


def _sqlalchemy_psycopg_url() -> str:
    """langchain_postgres builds a SQLAlchemy engine and defaults to the
    psycopg2 dialect for a plain postgresql:// URL. We already depend on
    psycopg (v3, via psycopg_pool for the checkpointer) — reuse it instead
    of adding a second Postgres driver."""
    url = settings.database_url
    if url.startswith("postgresql://"):
        return "postgresql+psycopg://" + url[len("postgresql://") :]
    return url


@lru_cache(maxsize=1)
def get_embeddings() -> HuggingFaceEmbeddings:
    return HuggingFaceEmbeddings(model_name=settings.embedding_model)


@lru_cache(maxsize=1)
def get_vectorstore() -> PGVector:
    return PGVector(
        embeddings=get_embeddings(),
        collection_name=COLLECTION_NAME,
        connection=_sqlalchemy_psycopg_url(),
        use_jsonb=True,
    )


def retrieve(query: str, k: int = 4) -> list[tuple[str, float, str]]:
    """Return (content, similarity_score, source) for the top-k chunks.

    Score is cosine similarity in [0, 1] range (higher = more similar) —
    used for the cheap first-pass relevance filter in grade_evidence.
    """
    store = get_vectorstore()
    results = store.similarity_search_with_relevance_scores(query, k=k)
    return [(doc.page_content, score, doc.metadata.get("source", "")) for doc, score in results]
