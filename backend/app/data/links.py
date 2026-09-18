"""Structured, verified link/contact data.

Sourced directly from this repo's own source of truth for real content —
src/lib/content.ts (the live site's data) and portfolio-guidance/03_CONTENT.md
— never invented. This is the ONLY place link URLs live; the chatbot must
read from here via the tools in app/tools.py, never recall a URL from the
LLM's own memory.

If a field is None, the tool layer says so plainly instead of fabricating
a value (see PORTFOLIO_CHATBOT_COMPLETE_SPEC.md — "If a link is unavailable,
say so. Never fabricate one.").
"""

from __future__ import annotations

from typing import TypedDict


class ProjectLinks(TypedDict):
    name: str
    github: str | None
    live_demo: str | None
    live_demo_coming_soon: str | None  # set only once a real deploy URL exists but isn't live yet
    pitch: str
    tags: list[str]


PORTFOLIO_LINKS = {
    "github": "https://github.com/bahawal-khan",
    "linkedin": "https://www.linkedin.com/in/bahawal-khan-9b1124313",
    "email": "khanbahawal2004@gmail.com",
    "resume": "/documents/resume.pdf",
}

# Keyed by the slug used across the site (src/lib/content.ts) and the
# COMPLETE_SPEC's "Exactly Five Featured Projects" naming. `pitch` is taken
# verbatim from each project's `description` in src/lib/content.ts (the live
# site's own copy) so the chatbot never writes its own project blurb.
PROJECT_LINKS: dict[str, ProjectLinks] = {
    "chatmodel": {
        "name": "ChatModel",
        "github": "https://github.com/bahawal-khan",
        "live_demo": "https://nexor-ai.khanova.tech",
        "live_demo_coming_soon": None,
        "pitch": (
            "A multimodal agentic AI assistant capable of interacting with users, "
            "retrieving information, using external tools and working across text, "
            "vision, PDF, voice and image-generation workflows."
        ),
        "tags": ["agentic ai", "genai", "rag", "langgraph", "multimodal", "vision", "voice", "tool calling"],
    },
    "shopagent": {
        "name": "ShopAgent",
        "github": "https://github.com/bahawal-khan",
        "live_demo": "https://shopagent.khanova.tech",
        "live_demo_coming_soon": None,
        "pitch": (
            "An agent-based shopping workflow designed to simplify product "
            "discovery and booking, with a booking agent and Human-in-the-Loop "
            "(HITL) confirmation."
        ),
        "tags": ["agentic ai", "genai", "agents", "hitl", "booking", "tool calling"],
    },
    "churnai": {
        "name": "ChurnAI",
        "github": "https://github.com/bahawal-khan",
        "live_demo": "https://churnai.khanova.tech",
        "live_demo_coming_soon": None,
        "pitch": (
            "An end-to-end machine learning pipeline predicting customer churn, "
            "comparing multiple models before selecting a winner on real test data."
        ),
        "tags": ["machine learning", "ml", "classification", "tabular data"],
    },
    "customer_assistant": {
        "name": "Customer Assistant",
        "github": "https://github.com/bahawal-khan",
        "live_demo": "https://customer-support.khanova.tech",
        "live_demo_coming_soon": None,
        "pitch": (
            "An NLP/RAG support system that classifies incoming queries and "
            "retrieves grounded answers — transformer-based classification "
            "paired with embedding retrieval over a Postgres/pgvector-oriented store."
        ),
        "tags": ["nlp", "rag", "deep learning", "classification", "transformers"],
    },
    "plantcare_ai": {
        "name": "PlantCare AI",
        "github": "https://github.com/bahawal-khan",
        "live_demo": "https://plantcare.khanova.tech",
        "live_demo_coming_soon": None,
        "pitch": (
            "A deep learning model fine-tuned to detect plant diseases from images "
            "across the PlantVillage dataset — a real agricultural use case, "
            "trained end-to-end on CPU."
        ),
        "tags": ["deep learning", "computer vision", "classification", "transfer learning"],
    },
}

# Aliases so a router LLM's free-text guess ("shop agent", "the churn one")
# still resolves to the right project key.
PROJECT_ALIASES: dict[str, str] = {
    "chatmodel": "chatmodel",
    "chat model": "chatmodel",
    "shopagent": "shopagent",
    "shop agent": "shopagent",
    "churnai": "churnai",
    "churn ai": "churnai",
    "churn": "churnai",
    "customer assistant": "customer_assistant",
    "customer support": "customer_assistant",
    "customer_assistant": "customer_assistant",
    "plantcare": "plantcare_ai",
    "plantcare ai": "plantcare_ai",
    "plant care ai": "plantcare_ai",
    "plantcare_ai": "plantcare_ai",
    "plant disease": "plantcare_ai",
}


def resolve_project_key(name: str) -> str | None:
    return PROJECT_ALIASES.get(name.strip().lower())
