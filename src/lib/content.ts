// Structured content sourced from PORTFOLIO_SPEC.md — the source of truth
// for this rebuild. Do not invent data here: metrics, links, and copy must
// come from the spec or be left as a clearly marked placeholder.
import type { SkillIconKey } from "@/components/ui/SkillIcon";

export const owner = {
  name: "Bahawal Khan",
  displayName: "BAHAWAL KHAN",
  role: "AI / ML Engineer",
  roleDisplay: "AI / ML ENGINEER",
  github: "https://github.com/bahawal-khan",
  linkedin: "https://www.linkedin.com/in/bahawal-khan-9b1124313",
  email: "khanbahawal2004@gmail.com",
  phone: "03352691598",
  phoneHref: "tel:+923352691598",
};

export const resume = {
  resumeHref: "/documents/resume.pdf",
};

// ---------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------
export const hero = {
  intro: "Hi, I'm",
  wave: "👋",
  typingLines: [
    "I am an AI/ML Engineer",
    "I build Machine Learning systems",
    "I work with Deep Learning, NLP & Transformers",
    "I build RAG applications",
    "I develop Agentic AI systems",
  ],
  supportingText:
    "Building intelligent systems that solve real-world problems.",
  portraitSrc: "/images/portrait.png",
  portraitAlt: "Portrait of Bahawal Khan, AI/ML Engineer",
};

// ---------------------------------------------------------------------
// About
// ---------------------------------------------------------------------
export const about = {
  headline: "I build AI systems, not just models.",
  paragraphs: [
    "I'm Bahawal Khan, a BS Computer Science student at the University of Lahore (UOL), currently in my 7th semester with a CGPA of 3.06. My focus is on Artificial Intelligence and Machine Learning — spanning classical machine learning, deep learning, NLP, transformers, Generative AI and Agentic AI.",
    "Alongside AI/ML, I also have hands-on web development experience, building interfaces and APIs with HTML, CSS, JavaScript, React.js, Next.js and FastAPI. I enjoy turning ideas into practical, end-to-end systems that can retrieve information, use tools, maintain context and interact with users.",
  ],
  progression: [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Transformers",
    "Generative AI",
    "RAG",
    "Agentic AI",
  ],
};

// ---------------------------------------------------------------------
// Technical Skills — grouped per PORTFOLIO_SPEC.md section 9, plus a
// Web Development category covering the owner's non-AI stack.
// ---------------------------------------------------------------------
export type SkillItem = { label: string; icon: SkillIconKey };
export type SkillCategory = { title: string; categoryIcon: SkillIconKey; items: SkillItem[] };

export const skillCategories: SkillCategory[] = [
  {
    title: "Machine Learning",
    categoryIcon: "machine-learning",
    items: [
      { label: "EDA", icon: "eda" },
      { label: "Feature Engineering", icon: "feature-engineering" },
      { label: "Linear Regression", icon: "linear-regression" },
      { label: "Logistic Regression", icon: "logistic-regression" },
      { label: "K‑Nearest Neighbors (KNN)", icon: "knn" },
      { label: "Random Forest", icon: "random-forest" },
      { label: "XGBoost", icon: "xgboost" },
      { label: "Model Evaluation", icon: "model-evaluation" },
      { label: "Hyperparameter Tuning", icon: "hyperparameter-tuning" },
      { label: "SHAP", icon: "shap" },
      { label: "Optuna", icon: "optuna" },
    ],
  },
  {
    title: "Deep Learning",
    categoryIcon: "deep-learning",
    items: [
      { label: "ANN", icon: "ann" },
      { label: "CNN", icon: "cnn" },
      { label: "RNN", icon: "rnn" },
      { label: "LSTM", icon: "lstm" },
      { label: "GRU", icon: "gru" },
      { label: "Transformers", icon: "transformers" },
      { label: "Self-Attention", icon: "self-attention" },
      { label: "DistilBERT", icon: "distilbert" },
      { label: "EfficientNetB0", icon: "efficientnetb0" },
      { label: "Transfer Learning", icon: "transfer-learning" },
    ],
  },
  {
    title: "NLP",
    categoryIcon: "nlp",
    items: [
      { label: "NLP", icon: "nlp" },
      { label: "TF-IDF", icon: "tf-idf" },
      { label: "Text Classification", icon: "text-classification" },
      { label: "Embeddings", icon: "embeddings" },
      { label: "Semantic Search", icon: "semantic-search" },
      { label: "Transformer-based NLP", icon: "transformer-based-nlp" },
    ],
  },
  {
    title: "Generative AI",
    categoryIcon: "generative-ai",
    items: [
      { label: "LLMs", icon: "llms" },
      { label: "RAG", icon: "rag" },
      { label: "LangChain", icon: "langchain" },
      { label: "LangGraph", icon: "langgraph" },
      { label: "Prompt Engineering", icon: "prompt-engineering" },
      { label: "AI Agents", icon: "ai-agents" },
      { label: "Tool Calling", icon: "tool-calling" },
      { label: "Memory", icon: "memory" },
      { label: "Context Management", icon: "context-management" },
      { label: "Hugging Face", icon: "hugging-face" },
      { label: "Model APIs", icon: "model-apis" },
    ],
  },
  {
    title: "Agentic AI",
    categoryIcon: "agentic-ai",
    items: [
      { label: "Agents", icon: "agents" },
      { label: "7 Tools", icon: "seven-tools" },
      { label: "Booking Agent", icon: "booking-agent" },
      { label: "HITL", icon: "hitl" },
      { label: "Tool Calling", icon: "tool-calling" },
      { label: "LangGraph", icon: "langgraph" },
    ],
  },
  {
    title: "Database & Retrieval",
    categoryIcon: "pgvector",
    items: [
      { label: "PostgreSQL", icon: "postgresql" },
      { label: "pgvector", icon: "pgvector" },
      { label: "FAISS", icon: "faiss" },
      { label: "Chroma", icon: "chroma" },
      { label: "SQL", icon: "sql" },
      { label: "Vector Databases", icon: "vector-databases" },
    ],
  },
  {
    title: "AI / Developer Tools",
    categoryIcon: "dev-tools",
    items: [
      { label: "Groq", icon: "groq" },
      { label: "Hugging Face", icon: "hugging-face" },
      { label: "LangSmith", icon: "langsmith" },
      { label: "Cloudflare", icon: "cloudflare" },
      { label: "Git", icon: "git" },
      { label: "GitHub", icon: "github" },
      { label: "Docker", icon: "docker" },
      { label: "FastAPI", icon: "fastapi" },
      { label: "External APIs", icon: "external-apis" },
    ],
  },
  {
    title: "Multimodal AI",
    categoryIcon: "vision",
    items: [
      { label: "Vision / Image-to-Text", icon: "vision" },
      { label: "PDF QA", icon: "pdf-qa" },
      { label: "Voice", icon: "voice" },
      { label: "Image Generation", icon: "image-generation" },
    ],
  },
  {
    title: "Web Development",
    categoryIcon: "web-dev",
    items: [
      { label: "HTML", icon: "html" },
      { label: "CSS", icon: "css" },
      { label: "JavaScript", icon: "javascript" },
      { label: "React.js", icon: "react" },
      { label: "Next.js", icon: "nextjs" },
    ],
  },
];

// ---------------------------------------------------------------------
// Projects — order and content per PORTFOLIO_SPEC.md sections 11-17.
// Flow steps with `branches` render as a fan-out/fan-in diagram.
// ---------------------------------------------------------------------
export type FlowStep = { label: string; branches?: string[]; highlight?: boolean };
export type ProjectStat = { label: string; value: string };

export type Project = {
  slug: string;
  flagshipLabel?: string;
  name: string;
  description: string;
  status?: string;
  capabilities?: string[];
  tech: string[];
  flow: FlowStep[];
  datasetStats?: ProjectStat[];
  trainingStats?: ProjectStat[];
  metrics?: { label: string; value: number; display: string }[];
  metricsNote?: string;
  /** Optional screenshot/preview image. No screenshots exist yet for any
   * project, so cards fall back to an icon-based visual panel — drop a path
   * here (e.g. "/images/projects/shopagent.png") once one is available. */
  image?: string;
  imageAlt?: string;
  github: string;
  liveUrl?: string;
  /** Reserved live-demo subdomain for a project not deployed yet — rendered
   * as a disabled "Coming Soon" state, never a clickable link. */
  liveUrlComingSoon?: string;
};

export const projects: Project[] = [
  {
    slug: "shopagent",
    flagshipLabel: "FLAGSHIP PROJECT",
    name: "ShopAgent",
    description:
      "An agent-based shopping workflow designed to simplify product discovery and booking.",
    status: "Built",
    capabilities: [
      "Agent",
      "Product search",
      "Recommendation / workflow",
      "Booking Agent",
      "Human‑in‑the‑Loop (HITL)",
      "Confirmation / approval",
      "Action",
    ],
    tech: ["Agents", "Booking Agent", "HITL"],
    flow: [
      { label: "User" },
      { label: "ShopAgent", highlight: true },
      { label: "Product Search" },
      { label: "Recommendation" },
      { label: "Booking Agent" },
      { label: "Human Approval (HITL)" },
      { label: "Action" },
    ],
    github: "https://github.com/bahawal-khan",
    liveUrl: "https://shopagent.khanova.tech",
  },
  {
    slug: "chatmodel",
    name: "ChatModel",
    description:
      "A multimodal agentic AI assistant capable of interacting with users, retrieving information, using external tools and working across text, vision, PDF, voice and image-generation workflows.",
    tech: ["LangGraph", "RAG", "PostgreSQL", "Tool Calling", "Vision", "PDF QA", "Voice", "Image Generation"],
    flow: [
      { label: "User" },
      {
        label: "AI Agent",
        highlight: true,
        branches: [
          "RAG",
          "Search / External Tools",
          "Vision",
          "PDF QA",
          "Voice",
          "Image Generation",
        ],
      },
      { label: "PostgreSQL / Memory" },
    ],
    datasetStats: [{ label: "External tools", value: "7" }],
    github: "https://github.com/bahawal-khan",
    liveUrl: "https://nexor-ai.khanova.tech",
  },
  {
    slug: "customer-assistant",
    name: "Customer Assistant",
    description:
      "An NLP/RAG support system that classifies incoming queries and retrieves grounded answers — transformer-based classification paired with embedding retrieval over a Postgres/pgvector-oriented store.",
    status: "Built",
    tech: ["DistilBERT", "RAG", "Embeddings", "pgvector", "FastAPI"],
    flow: [
      { label: "Support Query" },
      { label: "DistilBERT Classification", highlight: true },
      { label: "Embedding Retrieval (pgvector)" },
      { label: "Grounded Response" },
    ],
    datasetStats: [
      { label: "Training rows", value: "21,430" },
      { label: "Test rows", value: "2,699" },
      { label: "Classes", value: "27" },
    ],
    trainingStats: [
      { label: "Base model", value: "distilbert-base-uncased" },
      { label: "Best val. macro F1", value: "0.9982" },
    ],
    github: "https://github.com/bahawal-khan",
    liveUrl: "https://customer-support.khanova.tech",
  },
  {
    slug: "plantcare-ai",
    name: "PlantCare AI",
    description:
      "A deep learning model fine-tuned to detect plant diseases from images across the PlantVillage dataset — a real agricultural use case, trained end-to-end on CPU.",
    status: "Built",
    tech: ["EfficientNetB0", "Transfer Learning", "PlantVillage Dataset"],
    flow: [
      { label: "PlantVillage Dataset" },
      { label: "EfficientNetB0 (Transfer Learning)", highlight: true },
      { label: "Stage 1 Fine-Tuning" },
      { label: "Stage 2 Fine-Tuning" },
      { label: "Disease Classification (38 classes)" },
    ],
    datasetStats: [
      { label: "Training images", value: "54,305" },
      { label: "Classes", value: "38" },
    ],
    trainingStats: [
      { label: "Stage 1 best val. accuracy", value: "97.00%" },
      { label: "Stage 2 best val. accuracy", value: "98.64%" },
      { label: "Training hardware", value: "CPU-only" },
      { label: "Total training time", value: "~21 hours" },
    ],
    github: "https://github.com/bahawal-khan",
    liveUrl: "https://plantcare.khanova.tech",
  },
  {
    slug: "churnai",
    name: "ChurnAI",
    description:
      "An end-to-end machine learning pipeline predicting customer churn, comparing multiple models before selecting a winner on real test data.",
    status: "Built",
    tech: ["Logistic Regression", "Random Forest", "HistGradientBoostingClassifier", "ANN"],
    flow: [
      { label: "Customer Data (21,043 rows)" },
      { label: "9 Engineered Features" },
      {
        label: "Model Comparison",
        branches: [
          "Logistic Regression",
          "Random Forest",
          "HistGradientBoostingClassifier",
          "ANN",
        ],
      },
      { label: "Random Forest Selected (threshold 0.37)", highlight: true },
      { label: "Churn Prediction" },
    ],
    datasetStats: [
      { label: "Rows", value: "21,043" },
      { label: "Engineered features", value: "9" },
      { label: "Decision threshold", value: "0.37" },
    ],
    metrics: [
      { label: "Accuracy", value: 0.6585, display: "0.6585" },
      { label: "Precision", value: 0.4654, display: "0.4654" },
      { label: "Recall", value: 0.82, display: "0.8200" },
      { label: "F1", value: 0.5938, display: "0.5938" },
      { label: "ROC-AUC", value: 0.7777, display: "0.7777" },
      { label: "PR-AUC", value: 0.593, display: "0.5930" },
    ],
    metricsNote: "Final test metrics — Random Forest, threshold 0.37.",
    github: "https://github.com/bahawal-khan",
    liveUrl: "https://churnai.khanova.tech",
  },
];

// ---------------------------------------------------------------------
// Technical Journey — scroll-driven timeline (section 19). Sub-labels are
// pulled directly from the approved skills list, nothing invented.
// ---------------------------------------------------------------------
export const journeyStages = [
  { title: "Classical ML", detail: "EDA, feature engineering, regression, ensemble models" },
  { title: "Deep Learning", detail: "ANN, CNN, RNN, LSTM, GRU, transfer learning" },
  { title: "NLP", detail: "TF-IDF, text classification, embeddings, semantic search" },
  { title: "Transformers", detail: "Self-attention, DistilBERT, transformer-based NLP" },
  { title: "Generative AI", detail: "LLMs, LangChain, prompt engineering, model APIs" },
  { title: "RAG", detail: "Retrieval pipelines, vector databases, context management" },
  { title: "Agentic AI", detail: "LangGraph agents, tool calling, memory, HITL" },
];

// ---------------------------------------------------------------------
// Engineering / Architecture section (section 20) — explanatory diagram.
// ---------------------------------------------------------------------
export const architecture = {
  root: "AI / ML",
  rootBranches: ["Classical ML", "Deep Learning", "NLP"],
  mid: "Generative AI",
  midBranches: ["LLMs", "RAG", "LangChain", "LangGraph"],
  leaf: "Agentic AI",
  leafBranches: ["Tools", "Memory", "HITL", "External APIs"],
  sink: "PostgreSQL / Vector Retrieval",
};

// ---------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------
export const contact = {
  headline: "Let's build something intelligent.",
  text: "Have an AI project, idea, or opportunity?",
};

// ---------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------
export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];
