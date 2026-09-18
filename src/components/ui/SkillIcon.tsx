import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiPostgresql,
  SiLangchain,
  SiLanggraph,
  SiHuggingface,
  SiDocker,
  SiGit,
  SiGithub,
  SiCloudflare,
  SiOptuna,
  SiFastapi,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
} from "react-icons/si";
import {
  LuChartScatter,
  LuSlidersHorizontal,
  LuTrendingUp,
  LuActivity,
  LuShare2,
  LuTreePine,
  LuZap,
  LuClipboardCheck,
  LuSettings2,
  LuPuzzle,
  LuNetwork,
  LuGrid3X3,
  LuRepeat,
  LuMemoryStick,
  LuRefreshCw,
  LuLayers3,
  LuFocus,
  LuFileText,
  LuGauge,
  LuArrowRightLeft,
  LuMessageSquareText,
  LuHash,
  LuTags,
  LuBoxes,
  LuSearch,
  LuLanguages,
  LuBrainCircuit,
  LuBookOpen,
  LuTerminal,
  LuBot,
  LuWrench,
  LuBrain,
  LuLayers,
  LuPlug,
  LuHammer,
  LuCalendarCheck,
  LuUserCheck,
  LuDatabase,
  LuScanSearch,
  LuTable,
  LuCpu,
  LuFlaskConical,
  LuGlobe,
  LuEye,
  LuFileQuestion,
  LuMic,
  LuImage,
  LuSparkles,
  LuCode,
} from "react-icons/lu";

// Registry of every icon key used across skills, the hero key-skills strip,
// and project technology tags. Keep keys aligned with PORTFOLIO_SPEC.md
// section 9 labels — do not add icons for skills not in the spec.
export const iconRegistry = {
  // Machine Learning
  eda: LuChartScatter,
  "feature-engineering": LuSlidersHorizontal,
  "linear-regression": LuTrendingUp,
  "logistic-regression": LuActivity,
  knn: LuShare2,
  "random-forest": LuTreePine,
  xgboost: LuZap,
  "model-evaluation": LuClipboardCheck,
  "hyperparameter-tuning": LuSettings2,
  shap: LuPuzzle,
  optuna: SiOptuna,

  // Deep Learning
  ann: LuNetwork,
  cnn: LuGrid3X3,
  rnn: LuRepeat,
  lstm: LuMemoryStick,
  gru: LuRefreshCw,
  transformers: LuLayers3,
  "self-attention": LuFocus,
  distilbert: LuFileText,
  efficientnetb0: LuGauge,
  "transfer-learning": LuArrowRightLeft,

  // NLP
  nlp: LuMessageSquareText,
  "tf-idf": LuHash,
  "text-classification": LuTags,
  embeddings: LuBoxes,
  "semantic-search": LuSearch,
  "transformer-based-nlp": LuLanguages,

  // Generative AI
  llms: LuBrainCircuit,
  rag: LuBookOpen,
  langchain: SiLangchain,
  langgraph: SiLanggraph,
  "prompt-engineering": LuTerminal,
  "ai-agents": LuBot,
  "tool-calling": LuWrench,
  memory: LuBrain,
  "context-management": LuLayers,
  "hugging-face": SiHuggingface,
  "model-apis": LuPlug,

  // Agentic AI
  agents: LuBot,
  "seven-tools": LuHammer,
  "booking-agent": LuCalendarCheck,
  hitl: LuUserCheck,

  // Database & Retrieval
  postgresql: SiPostgresql,
  pgvector: LuDatabase,
  faiss: LuScanSearch,
  chroma: LuBoxes,
  sql: LuTable,
  "vector-databases": LuLayers3,

  // Category heading icons
  "dev-tools": LuWrench,

  // AI / Developer Tools
  groq: LuCpu,
  langsmith: LuFlaskConical,
  cloudflare: SiCloudflare,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  fastapi: SiFastapi,
  "external-apis": LuGlobe,

  // Multimodal AI
  vision: LuEye,
  "pdf-qa": LuFileQuestion,
  voice: LuMic,
  "image-generation": LuImage,

  // Web Development
  "web-dev": LuCode,
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,

  // Hero key-skills strip / general
  python: SiPython,
  "machine-learning": LuChartScatter,
  "deep-learning": LuNetwork,
  "generative-ai": LuSparkles,
  "agentic-ai": LuBot,
} satisfies Record<string, IconType>;

export type SkillIconKey = keyof typeof iconRegistry;

// Per-skill accent color — authentic brand color where one exists (Python,
// PostgreSQL, Docker, Git, GitHub, Hugging Face, Cloudflare, FastAPI, ...),
// otherwise a curated hue so every icon reads distinctly, matching the
// colorful reference style rather than a single monochrome accent.
export const iconColors = {
  // Machine Learning
  eda: "#F59E0B",
  "feature-engineering": "#38BDF8",
  "linear-regression": "#34D399",
  "logistic-regression": "#A78BFA",
  knn: "#F472B6",
  "random-forest": "#4ADE80",
  xgboost: "#FB923C",
  "model-evaluation": "#60A5FA",
  "hyperparameter-tuning": "#FBBF24",
  shap: "#C084FC",
  optuna: "#3B5BFF",

  // Deep Learning
  ann: "#38BDF8",
  cnn: "#FB7185",
  rnn: "#4ADE80",
  lstm: "#FBBF24",
  gru: "#A78BFA",
  transformers: "#F472B6",
  "self-attention": "#60A5FA",
  distilbert: "#FDBA74",
  efficientnetb0: "#2DD4BF",
  "transfer-learning": "#34D399",

  // NLP
  nlp: "#38BDF8",
  "tf-idf": "#FBBF24",
  "text-classification": "#F472B6",
  embeddings: "#A78BFA",
  "semantic-search": "#4ADE80",
  "transformer-based-nlp": "#FB923C",

  // Generative AI
  llms: "#A78BFA",
  rag: "#38BDF8",
  langchain: "#3EB489",
  langgraph: "#10B981",
  "prompt-engineering": "#FBBF24",
  "ai-agents": "#4ADE80",
  "tool-calling": "#FB923C",
  memory: "#F472B6",
  "context-management": "#60A5FA",
  "hugging-face": "#FFD21E",
  "model-apis": "#34D399",

  // Agentic AI
  agents: "#4ADE80",
  "seven-tools": "#FB923C",
  "booking-agent": "#38BDF8",
  hitl: "#F472B6",

  // Database & Retrieval
  postgresql: "#60A5FA",
  pgvector: "#60A5FA",
  faiss: "#A78BFA",
  chroma: "#FBBF24",
  sql: "#4ADE80",
  "vector-databases": "#2DD4BF",

  // Category heading icons
  "dev-tools": "#FB923C",

  // AI / Developer Tools
  groq: "#FB923C",
  langsmith: "#A78BFA",
  cloudflare: "#F6821F",
  git: "#F05032",
  github: "#E6EDF3",
  docker: "#2496ED",
  fastapi: "#2DD4BF",
  "external-apis": "#38BDF8",

  // Multimodal AI
  vision: "#60A5FA",
  "pdf-qa": "#F472B6",
  voice: "#4ADE80",
  "image-generation": "#FBBF24",

  // Web Development
  "web-dev": "#38BDF8",
  html: "#E34F26",
  css: "#1572B6",
  javascript: "#F7DF1E",
  react: "#61DAFB",
  nextjs: "#EDEDED",

  // Category icons / general
  python: "#4B8BBE",
  "machine-learning": "#F59E0B",
  "deep-learning": "#38BDF8",
  "generative-ai": "#A78BFA",
  "agentic-ai": "#4ADE80",
} satisfies Record<SkillIconKey, string>;

export function getIconColor(icon: SkillIconKey): string {
  return iconColors[icon];
}

export function SkillIcon({
  icon,
  className = "",
  style,
}: {
  icon: SkillIconKey;
  className?: string;
  style?: CSSProperties;
}) {
  const Icon = iconRegistry[icon];
  return <Icon className={className} style={style} aria-hidden="true" />;
}
