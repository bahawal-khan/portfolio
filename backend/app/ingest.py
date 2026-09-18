"""Embed the knowledge base into pgvector. Run once, re-run on content change.

    python -m app.ingest

Independent of any thread_id — this is the long-term/RAG memory, available
to every conversation from its very first message.
"""

from __future__ import annotations

from langchain_core.documents import Document

from app.data.knowledge_base import KNOWLEDGE_CHUNKS
from app.rag import get_vectorstore


def main() -> None:
    store = get_vectorstore()

    # Reset so re-running after a content edit doesn't leave stale chunks.
    store.delete_collection()
    store.create_collection()

    docs = [
        Document(page_content=content, metadata={"source": source})
        for source, content in KNOWLEDGE_CHUNKS
    ]
    ids = [f"{source}:{i}" for i, (source, _content) in enumerate(KNOWLEDGE_CHUNKS)]

    store.add_documents(docs, ids=ids)
    print(f"Ingested {len(docs)} knowledge chunks into pgvector.")


if __name__ == "__main__":
    main()
