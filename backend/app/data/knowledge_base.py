"""Verified portfolio knowledge base — the RAG corpus.

Every fact here is taken directly from portfolio-guidance/
PORTFOLIO_CHATBOT_COMPLETE_SPEC.md (the authoritative chatbot spec) and the
owner's profile PDF. Nothing is invented. Each entry becomes one or more
embedded chunks in `knowledge_chunks`, tagged with a `source` label so
retrieval results stay traceable back to a section.

This is long-term memory (per PORTFOLIO_CHATBOT_COMPLETE_SPEC.md /
04_CHATBOT_AGENT_SPEC.md's Memory & State Architecture): static knowledge,
not conversation history. It is not re-run per request — see app/ingest.py.
"""

from __future__ import annotations

KNOWLEDGE_CHUNKS: list[tuple[str, str]] = [
    (
        "profile",
        "Bahawal Khan is an AI/ML Engineer in progress: a BS Computer "
        "Science (BSCS) student at the University of Lahore (UOL), "
        "currently in his 7th semester with a CGPA of 3.06. His career "
        "target is AI/ML Engineer, with a practical focus on machine "
        "learning, deep learning, NLP, Generative AI, RAG, Self-RAG / "
        "grounded AI, LangChain, LangGraph, Agentic AI, tool calling, "
        "multimodal AI, AI engineering, APIs, and databases/retrieval.",
    ),
    (
        "education",
        "Education: Bahawal Khan is pursuing a BS Computer Science (BSCS) "
        "degree at the University of Lahore (UOL). He is in his 7th "
        "semester with a CGPA of 3.06.",
    ),
    (
        "career_goal",
        "Career goal: Bahawal's goal is to progress from strong ML/DL "
        "foundations into advanced GenAI and Agentic AI, building complete "
        "intelligent systems rather than only isolated models. His focus "
        "includes LLM applications, grounded/self-RAG, complex LangGraph "
        "workflows, tool calling, memory, human-in-the-loop systems, "
        "multimodal AI, APIs, databases, and practical deployment. His "
        "engineering progression is ML -> DL -> NLP -> Transformers -> "
        "GenAI -> RAG -> Self-RAG/Grounding -> LangGraph -> Agents -> "
        "Tools -> State + Reducers -> Persistence -> Multimodal AI.",
    ),
    (
        "skills:machine_learning",
        "Machine Learning skills: EDA (Exploratory Data Analysis), Feature "
        "Engineering, Linear Regression, Logistic Regression, K-Nearest "
        "Neighbors (KNN), Random Forest, XGBoost, Model Evaluation, "
        "Hyperparameter Tuning, SHAP, Optuna.",
    ),
    (
        "skills:deep_learning",
        "Deep Learning skills: ANN, CNN, RNN, LSTM, GRU, Transformers, "
        "Self-Attention, DistilBERT, EfficientNetB0, Transfer Learning.",
    ),
    (
        "skills:nlp",
        "NLP skills: text preprocessing, TF-IDF, Text Classification, "
        "Embeddings, Semantic Search, Transformer-based NLP.",
    ),
    (
        "skills:generative_ai",
        "Generative AI skills: LLMs, RAG, LangChain, LangGraph, Prompt "
        "Engineering, AI Agents, Tool Calling, Memory, Context Management, "
        "Hugging Face, Model APIs.",
    ),
    (
        "skills:agentic_ai",
        "Agentic AI skills: Agents, complex multi-step workflows, Tool "
        "Calling, LangGraph, Booking Agent, Human-in-the-Loop (HITL).",
    ),
    (
        "skills:database_retrieval",
        "Database & Retrieval skills: PostgreSQL, SQL, pgvector, FAISS, "
        "Chroma, Vector Databases.",
    ),
    (
        "skills:dev_tools",
        "AI / Developer Tools: Groq, Hugging Face, LangSmith, Cloudflare, "
        "Git, GitHub, Docker, External APIs, FastAPI.",
    ),
    (
        "skills:multimodal",
        "Multimodal AI skills: Vision/Image-to-Text, PDF QA, Voice, Image "
        "Generation.",
    ),
    (
        "skills:web_dev",
        "Web Development skills: HTML, CSS, JavaScript, React.js, Next.js.",
    ),
    (
        "project:chatmodel",
        "ChatModel is Bahawal's Multimodal Agentic AI Assistant — his "
        "flagship project. It is an LLM conversational system combining "
        "RAG, a grounded/Self-RAG direction, LangGraph for stateful "
        "workflow orchestration, state and reducers, PostgreSQL "
        "persistence, external tools, memory/context management, "
        "vision/image-to-text, PDF QA, voice interaction, image "
        "generation, and agentic workflows. Bahawal does not claim "
        "perfect hallucination prevention or production-scale guarantees "
        "for ChatModel.",
    ),
    (
        "project:shopagent",
        "ShopAgent is Bahawal's Agentic Shopping & Booking Workflow "
        "project. It's an agent-based shopping workflow with a booking "
        "agent, tool calling, multi-step workflow orchestration, "
        "LangGraph-style workflows, and Human-in-the-Loop (HITL), which "
        "keeps a human involved for confirmation, approval, or "
        "intervention rather than letting sensitive actions run blindly. "
        "Bahawal does not claim real autonomous transactions unless "
        "verified.",
    ),
    (
        "project:churnai",
        "ChurnAI is Bahawal's Customer Churn Prediction project. He "
        "explored Logistic Regression, Random Forest, "
        "HistGradientBoostingClassifier, and ANN, and selected a Random "
        "Forest model with a decision threshold of 0.37. Reported final "
        "test metrics: Accuracy 0.6585, Precision 0.4654, Recall 0.8200, "
        "F1 0.5938, ROC-AUC 0.7777, PR-AUC 0.5930. The project included "
        "131 passing pytest tests.",
    ),
    (
        "project:customer_assistant",
        "Customer Assistant is Bahawal's NLP / RAG Support System — an AI "
        "customer-support system combining NLP classification, "
        "transformer-based NLP, DistilBERT, embeddings/retrieval, RAG "
        "concepts, and PostgreSQL/pgvector-oriented storage. The dataset "
        "had 21,430 training rows and 2,699 test rows across 27 classes. "
        "It fine-tuned distilbert-base-uncased and reported a best "
        "validation macro F1 of 0.9982 during training. Bahawal does not "
        "present this as production accuracy.",
    ),
    (
        "project:plantcare_ai",
        "PlantCare AI is Bahawal's Plant Disease Classification project, "
        "using EfficientNetB0 transfer learning on the PlantVillage "
        "dataset: 54,305 images across 38 classes, trained CPU-only. "
        "Stage 1 reached a best validation accuracy of 0.9700; Stage 2 "
        "fine-tuning reached 0.9864. Bahawal does not claim GPU training "
        "for this project.",
    ),
    (
        "projects:overview",
        "Bahawal has exactly five featured portfolio projects: ChatModel "
        "(multimodal agentic AI assistant, flagship), ShopAgent (agentic "
        "shopping/booking workflow with HITL), ChurnAI (customer churn "
        "prediction), Customer Assistant (NLP/RAG support system), and "
        "PlantCare AI (plant disease classification with deep learning).",
    ),
    (
        "self_rag",
        "Self-RAG / grounded RAG: Bahawal's conversational assistant "
        "design goes beyond basic retrieve-and-generate. Retrieval is "
        "evaluated for necessity and relevance, and generated responses "
        "are checked against the available evidence before being shown. "
        "The objective is to reduce unsupported claims and keep "
        "knowledge-base answers grounded — this is not presented as a "
        "guarantee of zero hallucinations.",
    ),
    (
        "architecture",
        "Engineering & workflow concepts across Bahawal's work: LangGraph "
        "(stateful graphs, nodes, conditional routing, tool nodes, "
        "reducers, persistence, multi-step workflows); RAG (chunking, "
        "embeddings, semantic retrieval, pgvector/FAISS/Chroma, grounded "
        "generation, Self-RAG direction); Agentic AI (agents, tools, tool "
        "calling, multi-step workflows, booking workflows, HITL); LLM "
        "Engineering (prompt engineering, context management, memory, "
        "model APIs, response grounding); Backend (FastAPI, API-oriented "
        "AI applications, environment-based configuration); Data/DB "
        "(PostgreSQL, SQL, pgvector, relational persistence and vector "
        "retrieval); Tools (Groq, Hugging Face, LangSmith, Cloudflare, "
        "Git/GitHub, Docker, External APIs).",
    ),
    (
        "positioning",
        "Bahawal's target role is AI/ML Engineer. His portfolio "
        "demonstrates progression from classical ML and deep learning to "
        "NLP, transformers, LLM applications, grounded RAG, LangGraph "
        "orchestration, agents, tools, memory, persistence, APIs, "
        "databases, and multimodal interaction. His profile intentionally "
        "avoids claims of perfect hallucination prevention, "
        "production-scale guarantees, or technologies not established in "
        "his work.",
    ),
    (
        "contact",
        "You can reach Bahawal Khan via his public email, GitHub, or "
        "LinkedIn (ask this assistant for the exact links, or use the "
        "contact section of the portfolio site), and his resume is "
        "available for download from the site.",
    ),
]
