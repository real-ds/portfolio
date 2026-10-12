import { techIconPaths, type TechIcon } from "./tech-icons.generated";

/* =========================================================
   TECHNOLOGY → BRAND MARK

   Every project lists its stack as plain text ("Next.js",
   "Google OAuth", "WebSockets"), so we need a deterministic
   way to get from that string to the official Simple Icons
   mark. Explicit aliases come first; anything unknown falls
   back to a clean monogram rather than a broken tile.
   ========================================================= */

const TECH_ALIASES: Record<string, string> = {
  "Next.js": "nextdotjs",
  NextJS: "nextdotjs",
  React: "react",
  "React.js": "react",
  TypeScript: "typescript",
  JavaScript: "javascript",
  Python: "python",
  FastAPI: "fastapi",
  Pydantic: "pydantic",
  NodeJS: "nodedotjs",
  "Node.js": "nodedotjs",
  Express: "express",
  Tailwind: "tailwindcss",
  "Tailwind CSS": "tailwindcss",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Firebase: "firebase",
  Supabase: "supabase",
  Redis: "redis",
  Docker: "docker",
  Git: "git",
  GitHub: "github",
  "Socket.io": "socketdotio",
  "Socket.IO": "socketdotio",
  WebRTC: "webrtc",
  LangGraph: "langgraph",
  LangChain: "langchain",
  "Google Gemini": "googlegemini",
  Pinecone: "pinecone",
  OpenAI: "openai",
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  Keras: "keras",
  OpenCV: "opencv",
  XGBoost: "xgboost",
  "Scikit-learn": "scikitlearn",
  Vercel: "vercel",
  Render: "render",
  Playwright: "playwright",
  "Google OAuth": "google",
  "Web Scraping": "scrapy",
  "Web Scraping / Crawling": "scrapy",
  "Evaluation & Monitoring": "grafana",
};

/** Best-effort slug for anything not in the alias table. */
function guessSlug(technology: string) {
  return technology
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
}

/** Returns the official brand mark, or `undefined` when we have none. */
export function getTechIcon(technology: string): TechIcon | undefined {
  const slug = TECH_ALIASES[technology] ?? guessSlug(technology);
  return techIconPaths[slug];
}

/** Two-letter monogram used when a technology has no brand mark. */
export function getTechMonogram(technology: string) {
  const words = technology
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}