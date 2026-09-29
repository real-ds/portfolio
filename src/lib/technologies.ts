import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export type Technology = {
  key: string;
  name: string;
  icon?: SimpleIcon;
  textMark?: string;
  category:
    | "programming"
    | "version-control"
    | "frontend"
    | "backend"
    | "database"
    | "ai-ml"
    | "generative-ai"
    | "infrastructure"
    | "agent-ecosystem";
};

function getIcon(slug: string): SimpleIcon | undefined {
  const exportName =
    `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons;

  return simpleIcons[exportName] as SimpleIcon | undefined;
}

/* =========================================================
   PROGRAMMING LANGUAGES
   ========================================================= */

export const programmingLanguages: Technology[] = [
  {
    key: "java",
    name: "Java",
    icon: getIcon("java"),
    category: "programming",
  },
  {
    key: "python",
    name: "Python",
    icon: getIcon("python"),
    category: "programming",
  },
  {
    key: "javascript",
    name: "JavaScript",
    icon: getIcon("javascript"),
    category: "programming",
  },
  {
    key: "typescript",
    name: "TypeScript",
    icon: getIcon("typescript"),
    category: "programming",
  },
];

/* =========================================================
   VERSION CONTROL & DEVELOPMENT
   ========================================================= */

export const versionControl: Technology[] = [
  {
    key: "git",
    name: "Git",
    icon: getIcon("git"),
    category: "version-control",
  },
  {
    key: "github",
    name: "GitHub",
    icon: getIcon("github"),
    category: "version-control",
  },
  {
    key: "docker",
    name: "Docker",
    icon: getIcon("docker"),
    category: "version-control",
  },
];

/* =========================================================
   FRONTEND
   ========================================================= */

export const frontend: Technology[] = [
  {
    key: "nextjs",
    name: "Next.js",
    icon: getIcon("nextdotjs"),
    category: "frontend",
  },
  {
    key: "vercel",
    name: "Vercel",
    icon: getIcon("vercel"),
    category: "frontend",
  },
];

/* =========================================================
   BACKEND & CLOUD
   ========================================================= */

export const backend: Technology[] = [
  {
    key: "nodejs",
    name: "Node.js",
    icon: getIcon("nodedotjs"),
    category: "backend",
  },
  {
    key: "flask",
    name: "Flask",
    icon: getIcon("flask"),
    category: "backend",
  },
  {
    key: "render",
    name: "Render",
    icon: getIcon("render"),
    category: "backend",
  },
];

/* =========================================================
   DATABASES
   ========================================================= */

export const databases: Technology[] = [
  {
    key: "supabase",
    name: "Supabase",
    icon: getIcon("supabase"),
    category: "database",
  },
  {
    key: "neon",
    name: "Neon",
    icon: getIcon("neon"),
    category: "database",
  },
];

/* =========================================================
   AI / MACHINE LEARNING
   ========================================================= */

export const aiMl: Technology[] = [
  {
    key: "pytorch",
    name: "PyTorch",
    icon: getIcon("pytorch"),
    category: "ai-ml",
  },
  {
    key: "tensorflow",
    name: "TensorFlow",
    icon: getIcon("tensorflow"),
    category: "ai-ml",
  },
  {
    key: "huggingface",
    name: "Hugging Face",
    icon: getIcon("huggingface"),
    category: "ai-ml",
  },
  {
    key: "langchain",
    name: "LangChain",
    icon: getIcon("langchain"),
    category: "ai-ml",
  },
  {
    key: "langgraph",
    name: "LangGraph",
    icon: getIcon("langgraph"),
    category: "ai-ml",
  },
];

/* =========================================================
   GENERATIVE AI
   ========================================================= */

export const generativeAi: Technology[] = [
  {
    key: "openai",
    name: "OpenAI",
    icon: getIcon("openai"),
    category: "generative-ai",
  },
  {
    key: "claude",
    name: "Claude",
    icon: getIcon("claude"),
    category: "generative-ai",
  },
  {
    key: "gemini",
    name: "Google Gemini",
    icon: getIcon("googlegemini"),
    category: "generative-ai",
  },
  {
    key: "openrouter",
    name: "OpenRouter",
    icon: getIcon("openrouter"),
    category: "generative-ai",
  },
];

/* =========================================================
   AI INFRASTRUCTURE / DATA
   ========================================================= */

export const infrastructure: Technology[] = [
  {
    key: "qdrant",
    name: "Qdrant",
    icon: getIcon("qdrant"),
    category: "infrastructure",
  },
  {
    key: "milvus",
    name: "Milvus",
    icon: getIcon("milvus"),
    category: "infrastructure",
  },
];

/* =========================================================
   AGENT / AI ECOSYSTEM
   ========================================================= */

export const agentEcosystem: Technology[] = [
  {
    key: "ollama",
    name: "Ollama",
    icon: getIcon("ollama"),
    category: "agent-ecosystem",
  },
  {
    key: "replicate",
    name: "Replicate",
    icon: getIcon("replicate"),
    category: "agent-ecosystem",
  },
  {
    key: "modal",
    name: "Modal",
    icon: getIcon("modal"),
    category: "agent-ecosystem",
  },
];

/* =========================================================
   CLAUDE CODE (special - text mark)
   ========================================================= */

export const claudeCode: Technology[] = [
  {
    key: "claude-code",
    name: "Claude Code",
    textMark: "CC",
    category: "agent-ecosystem",
  },
];

/* =========================================================
   COMPLETE TECHNOLOGY LIST
   ========================================================= */

export const allTechnologies: Technology[] = [
  ...programmingLanguages,
  ...versionControl,
  ...frontend,
  ...backend,
  ...databases,
  ...aiMl,
  ...generativeAi,
  ...infrastructure,
  ...agentEcosystem,
  ...claudeCode,
];

// Portfolio.md specific toolkit list
export const portfolioToolkit = [
  "Java",
  "Next.js",
  "Node.js",
  "Python",
  "Flask",
  "Git / GitHub",
  "Claude Code",
  "Vercel",
  "Render",
  "Supabase",
  "Neon",
  "PyTorch",
  "TensorFlow",
  "Hugging Face",
  "LangChain",
  "LangGraph",
  "OpenAI",
  "Claude",
  "Agentic AI Technologies",
  "Modern Web Technologies",
];