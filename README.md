
<div align="center">

# Bahawal Khan — AI/ML Engineer Portfolio

**GenAI → Agentic AI systems, built and deployed end-to-end**

[![Live Site](https://img.shields.io/badge/Live-khanova.tech-4C7DFF?style=for-the-badge)](https://khanova.tech)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agentic%20AI-1C3C3C?style=flat-square)](https://www.langchain.com/langgraph)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)

**[🔗 Visit the live site →](https://khanova.tech)**

</div>

---

## Overview

This isn't just a static portfolio — it's a full-stack AI application. Alongside the usual sections (About, Skills, Projects), it ships with a **grounded, tool-using AI assistant** that visitors can actually talk to: it answers questions about my work using retrieval-augmented generation, fetches real project links through structured tools, and can even relay a message to me by email — with a human-in-the-loop confirmation step before anything is sent.

## ✨ Highlights

- **Interactive 3D hero** — built with React Three Fiber, with a static fallback for low-power devices and full `prefers-reduced-motion` support
- **AI Portfolio Assistant** — a LangGraph agent with:
  - Self-RAG grounded retrieval over a pgvector knowledge base (no hallucinated answers)
  - A structured project-fetch tool for accurate links (GitHub, live demos, résumé)
  - A Human-in-the-Loop **email tool** — visitors can ask it to notify me directly, with an explicit confirm step before anything sends
  - Streaming responses (SSE) with PostgreSQL-backed conversation persistence per anonymous session
- **Fully responsive**, scroll-animated, and built with a consistent design system from the ground up

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16, TypeScript, Tailwind CSS, React Three Fiber |
| **Backend** | FastAPI, LangGraph, LangChain |
| **AI / LLM** | Groq (Llama-based models), Self-RAG, HuggingFace embeddings |
| **Database** | PostgreSQL, pgvector |
| **Deployment** | Hostinger VPS, PM2, Nginx, Let's Encrypt |

## 🚀 Live Demo

The site is deployed and live at **[khanova.tech](https://khanova.tech)** — feel free to explore the projects, chat with the AI assistant, or reach out through it directly.

## 📄 License

This project is personal portfolio work. Feel free to draw inspiration from the structure, but please don't reuse the content or branding as-is.

---

<div align="center">
Built by <strong>Bahawal Khan</strong> — AI/ML Engineer
</div>
