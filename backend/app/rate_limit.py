"""Per-thread rate limiting — required since this widget is public (04_CHATBOT_AGENT_SPEC.md
"Production hardening"). Backed by Postgres so it survives process restarts,
same instance as everything else — no extra moving part.
"""

from __future__ import annotations

from app.config import settings
from app.db import get_conn


def check_and_record(thread_id: str) -> bool:
    """Record this message and return True if the visitor is within budget."""
    with get_conn() as conn:
        row = conn.execute(
            "SELECT count(*) AS count FROM chat_rate_limit "
            "WHERE thread_id = %s AND created_at > now() - interval '1 hour'",
            (thread_id,),
        ).fetchone()
        count = row["count"] if row else 0
        if count >= settings.rate_limit_per_hour:
            return False
        conn.execute("INSERT INTO chat_rate_limit (thread_id) VALUES (%s)", (thread_id,))
        return True


def check_and_record_contact(thread_id: str) -> bool:
    """Separate, tighter budget for the contact-request email tool — each
    send is a real email to Bahawal's inbox (email_feature.md)."""
    with get_conn() as conn:
        row = conn.execute(
            "SELECT count(*) AS count FROM contact_rate_limit "
            "WHERE thread_id = %s AND created_at > now() - interval '1 hour'",
            (thread_id,),
        ).fetchone()
        count = row["count"] if row else 0
        if count >= settings.contact_rate_limit_per_hour:
            return False
        conn.execute("INSERT INTO contact_rate_limit (thread_id) VALUES (%s)", (thread_id,))
        return True
