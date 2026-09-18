"""Structured link/contact tools — Mode 2 of the assistant.

These are plain structured-data lookups, not paraphrased out of retrieved
RAG text chunks (PORTFOLIO_CHATBOT_COMPLETE_SPEC.md: "Exact URLs must come
from controlled structured data, not LLM memory."). Wrapped as LangChain
`@tool`s so the graph's link-fetch node does real LLM tool-calling (bind
these to the router model and let it pick the right tool + arguments)
rather than ad-hoc keyword dispatch.
"""

from __future__ import annotations

from langchain_core.tools import tool

from app.data.links import PORTFOLIO_LINKS, PROJECT_LINKS, resolve_project_key


@tool
def get_portfolio_link(kind: str) -> str:
    """Get one of Bahawal's verified portfolio links.

    Args:
        kind: One of "github", "linkedin", "email", "resume".
    """
    value = PORTFOLIO_LINKS.get(kind.strip().lower())
    if value is None:
        return f"No verified '{kind}' link is available."
    return value


def _format_project_line(info: dict) -> str:
    github = info["github"] or "not available"
    if info["live_demo"]:
        live = info["live_demo"]
    elif info["live_demo_coming_soon"]:
        live = f"not deployed yet — coming soon at {info['live_demo_coming_soon']}"
    else:
        live = "not available yet"
    return f"{info['name']} — {info['pitch']} — GitHub: {github} — Live demo: {live}"


@tool
def get_project_link(project_name: str) -> str:
    """Get the pitch, GitHub, and live-demo links for one of Bahawal's 5 projects.

    Args:
        project_name: The project name, e.g. "ChatModel", "ShopAgent",
            "ChurnAI", "Customer Assistant", or "PlantCare AI".
    """
    key = resolve_project_key(project_name)
    if key is None:
        known = ", ".join(p["name"] for p in PROJECT_LINKS.values())
        return f"'{project_name}' doesn't match a known project. Known projects: {known}."

    return _format_project_line(PROJECT_LINKS[key])


@tool
def list_projects(category: str | None = None) -> str:
    """List Bahawal's featured projects with a one-line pitch and links.

    Use this for broad requests like "list his projects", "what has he
    built", "show me his ML projects", or "his agentic AI work" — anywhere
    the visitor wants to see multiple/all projects rather than one named one.

    Args:
        category: Optional filter, e.g. "ML", "machine learning", "deep
            learning", "NLP", "agentic AI", "GenAI", "computer vision".
            Leave empty to list all 5 projects.
    """
    matches = list(PROJECT_LINKS.values())
    note = ""
    if category and category.strip():
        words = category.strip().lower().split()
        filtered = [
            info
            for info in matches
            if any(word in tag or tag in word for tag in info["tags"] for word in words)
        ]
        if filtered:
            matches = filtered
        else:
            note = f"No exact match for '{category}', so here are all of Bahawal's projects:\n"

    lines = [_format_project_line(info) for info in matches]
    return note + "\n".join(lines)


@tool
def get_resume() -> str:
    """Get the link to Bahawal's downloadable resume."""
    return PORTFOLIO_LINKS["resume"]


@tool
def get_contact_info() -> str:
    """Get Bahawal's public contact information (email, GitHub, LinkedIn)."""
    return (
        f"Email: {PORTFOLIO_LINKS['email']} — "
        f"GitHub: {PORTFOLIO_LINKS['github']} — "
        f"LinkedIn: {PORTFOLIO_LINKS['linkedin']}"
    )


LINK_TOOLS = [get_portfolio_link, get_project_link, list_projects, get_resume, get_contact_info]
