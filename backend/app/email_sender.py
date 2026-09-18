"""SMTP delivery for the chatbot's "contact request" tool
(portfolio-guidance/email_feature.md). Plain stdlib smtplib — one visitor
message per send, to a single fixed recipient (Bahawal's own inbox), so no
templating engine or transactional-email provider is warranted.
"""

from __future__ import annotations

import logging
import re
import smtplib
from email.message import EmailMessage

from app.config import settings
from app.data.links import PORTFOLIO_LINKS

logger = logging.getLogger("portfolio_assistant.email")

NOTIFY_EMAIL = PORTFOLIO_LINKS["email"]

# Header values travel through EmailMessage's own header encoding (which
# already rejects raw CRLF), but strip control characters ourselves too as
# defense in depth against header/script injection from visitor-supplied text.
_CONTROL_CHARS = re.compile(r"[\r\n\x00-\x08\x0b\x0c\x0e-\x1f]")
# Body isn't a header — no CRLF-injection risk there — so only strip other
# control bytes and keep newlines for the letter's paragraph structure.
_BODY_CONTROL_CHARS = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f]")


def _clean(value: str, max_len: int) -> str:
    return _CONTROL_CHARS.sub(" ", value).strip()[:max_len]


def _clean_body(value: str, max_len: int) -> str:
    normalized = value.replace("\r\n", "\n").replace("\r", "\n")
    return _BODY_CONTROL_CHARS.sub(" ", normalized).strip()[:max_len]


def send_contact_email(name: str, contact: str, subject_topic: str, body: str) -> bool:
    """Send a visitor's relayed message to Bahawal, as the already-composed
    letter (greeting through signature) built by app/graph.py. Returns False
    (never raises) on any failure so the caller can give an honest, non-leaky
    response instead of a stack trace."""
    if not (settings.smtp_host and settings.smtp_user and settings.smtp_password):
        logger.error("send_contact_email called without SMTP configured")
        return False

    safe_name = _clean(name, 100) or "A portfolio visitor"
    safe_contact = _clean(contact, 200)
    safe_topic = _clean(subject_topic, 80) or "Portfolio Message"
    safe_body = _clean_body(body, 6000)

    msg = EmailMessage()
    msg["Subject"] = f"Portfolio Contact: {safe_topic} – {safe_name}"
    msg["From"] = settings.smtp_user
    msg["To"] = NOTIFY_EMAIL
    msg["Reply-To"] = safe_contact if "@" in safe_contact else settings.smtp_user
    msg.set_content(safe_body)

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as server:
            server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(msg)
        return True
    except Exception:
        logger.exception("Failed to send contact email")
        return False
