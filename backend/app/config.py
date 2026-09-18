"""Environment configuration.

Loads the repo-root .env (shared with the Next.js frontend, which already
reads GROQ_API_KEY / DATABASE_URL / LANGSMITH_* from the same file) rather
than keeping a second duplicate .env inside backend/.
"""

from pathlib import Path

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

REPO_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(REPO_ROOT / ".env")


class Settings(BaseSettings):
    model_config = SettingsConfigDict(extra="ignore")

    groq_api_key: str
    database_url: str

    langsmith_api_key: str | None = None
    langsmith_tracing: bool = False
    langsmith_project: str | None = None

    # Comma-separated list of allowed browser origins for the widget.
    cors_origins: str = "http://localhost:3000"

    # Models — a fast/cheap model for routing & grading, a stronger one for
    # the final grounded answer the visitor actually reads. Verified live
    # against Groq's /v1/models on 2026-09-10 — check `curl
    # https://api.groq.com/openai/v1/models` if these ever 404, Groq's
    # catalog rotates over time.
    router_model: str = "openai/gpt-oss-20b"
    generation_model: str = "openai/gpt-oss-120b"

    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"

    # Set true in production (served over HTTPS) so the thread-id cookie is
    # only ever sent over TLS.
    cookie_secure: bool = False

    rate_limit_per_hour: int = 20
    token_budget: int = 8000
    summary_target_tokens: int = 800
    recent_turns_token_budget: int = 3000

    # Contact-request tool (portfolio-guidance/email_feature.md) — separate,
    # tighter budget than the general chat rate limit since each send is a
    # real email to Bahawal's inbox.
    contact_rate_limit_per_hour: int = 4

    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_user: str | None = None
    smtp_password: str | None = None

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
