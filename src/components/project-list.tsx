"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { aiProjects, sdeProjects, Project } from "@/lib/content";
import { motionTokens, easing } from "@/lib/motion";

/* =========================================================
   TECHNOLOGY LOGOS
   Brand marks come from Simple Icons via Iconify and are
   rendered as a CSS mask, so they inherit `currentColor`
   (works in both dark and light themes). If an icon does not
   exist (e.g. "RAG", "CLI", "Local-first"), we fall back to a
   clean monogram tile instead of a broken image.
========================================================= */

const techSlugs: Record<string, string> = {
  "Next.js": "nextdotjs",
  NextJS: "nextdotjs",
  React: "react",
  "React.js": "react",
  TypeScript: "typescript",
  JavaScript: "javascript",
  Python: "python",
  FastAPI: "fastapi",
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
  Pinecone: "pinecone",
  OpenAI: "openai",
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  Keras: "keras",
  OpenCV: "opencv",
  XGBoost: "xgboost",
  "Scikit-learn": "scikitlearn",
  "AI / LLM Systems": "openai",
  "AI / LLM": "openai",
  "Web Scraping": "scrapy",
  "Web Scraping / Crawling": "scrapy",
  "Evaluation & Monitoring": "grafana",
  Playwright: "playwright",
  Vercel: "vercel",
  Render: "render",
};

function getTechSlug(technology: string) {
  if (techSlugs[technology]) return techSlugs[technology];

  return technology
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[./]/g, "");
}

/** Remembers which icon URLs exist so we don't re-probe / flicker. */
const iconStatusCache = new Map<string, "ok" | "error">();

function getMonogram(technology: string) {
  const words = technology
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function TechLogo({ technology }: { technology: string }) {
  const slug = getTechSlug(technology);
  const url = `https://api.iconify.design/simple-icons:${slug}.svg`;

  const [status, setStatus] = useState<"loading" | "ok" | "error">(
    iconStatusCache.get(url) ?? "loading"
  );

  useEffect(() => {
    const cached = iconStatusCache.get(url);
    if (cached) {
      setStatus(cached);
      return;
    }

    let cancelled = false;
    const probe = new window.Image();

    probe.onload = () => {
      iconStatusCache.set(url, "ok");
      if (!cancelled) setStatus("ok");
    };
    probe.onerror = () => {
      iconStatusCache.set(url, "error");
      if (!cancelled) setStatus("error");
    };
    probe.src = url;

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <span
      className="
        flex h-16 w-16 shrink-0 items-center justify-center
        rounded-2xl border border-[var(--dim)]/30
        bg-[var(--panel)]/[0.06]
        text-[var(--foreground)]
        transition-all duration-300
        group-hover/tech:border-[var(--accent)]/60
        group-hover/tech:text-[var(--accent)]
        group-hover/tech:scale-105
      "
    >
      {status === "ok" ? (
        <span
          aria-hidden="true"
          className="block h-8 w-8 bg-current opacity-80 transition-opacity duration-300 group-hover/tech:opacity-100"
          style={{
            WebkitMaskImage: `url(${url})`,
            maskImage: `url(${url})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="font-mono text-base font-semibold tracking-wider opacity-80"
        >
          {status === "loading" ? "" : getMonogram(technology)}
        </span>
      )}
    </span>
  );
}

/* =========================================================
   ICONS
========================================================= */

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-6 w-6 shrink-0"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 5.8c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58A12 12 0 0012 0z" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px]"
      aria-hidden="true"
    >
      <path d="M5 19L19 5" />
      <path d="M9 5h10v10" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

/* =========================================================
   HELPERS
========================================================= */

/** Scales the title so long names never break mid-word. */
function getTitleSize(title: string) {
  const length = title.trim().length;

  if (length <= 6) return "clamp(3.5rem, 6vw, 6rem)";
  if (length <= 10) return "clamp(3rem, 4.6vw, 4.75rem)";
  if (length <= 14) return "clamp(2.5rem, 3.6vw, 3.75rem)";
  return "clamp(2rem, 3vw, 3rem)";
}

function isValidUrl(url?: string) {
  return Boolean(url && url !== "#");
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const router = useRouter();
  const projectNumber = String(project.number).padStart(2, "0");

  const openProject = () => {
    router.push(`/projects/${project.category}/${project.id}`);
  };

  const categoryLabel = project.category === "ai" ? "AI PROJECT" : "SDE PROJECT";
  const projectType =
    project.type?.toUpperCase() === "AI PRODUCT" ? "SAAS" : project.type;

  const hasGithub = isValidUrl(project.githubUrl);
  const hasLive = isValidUrl(project.liveDemoUrl);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: motionTokens.reveal,
        delay: index * 0.08,
        ease: easing.editorial,
      }}
      className="group w-full min-w-0 overflow-hidden rounded-[30px] border border-[var(--dim)]/35 bg-[var(--panel)]/[0.08] p-2.5 transition-all duration-700 ease-out hover:border-[var(--dim)]/65 hover:bg-[var(--panel)]/[0.13] sm:p-3 md:rounded-[34px] md:p-3.5"
    >
      {/*
        Bento layout (12 columns on lg+):

        ┌────────────────┬────────────────────────────┐
        │    CONTENT     │          PREVIEW           │
        │    5 cols      │          7 cols            │
        ├────────────────────────────┬────────────────┤
        │          LINKS             │  TECHNOLOGIES  │
        │          7 cols            │     5 cols     │
        └────────────────────────────┴────────────────┘

        Top row stretches to equal height (preview fills the row).
      */}
      <div className="grid min-w-0 grid-cols-1 gap-3 md:gap-4 lg:grid-cols-12">
        {/* =================================================
            TOP LEFT — PROJECT CONTENT
        ================================================= */}
        <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[25px] border border-[var(--dim)]/30 bg-[var(--bg)]/[0.62] p-6 sm:p-7 md:p-8 lg:col-span-5 lg:p-9">
          {/* Hover tint */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_18%,var(--accent)_100%)] opacity-[0.025] transition-opacity duration-700 group-hover:opacity-[0.055]"
          />

          {/* Large project number — gradient text, clipped correctly */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -right-2 z-0 select-none bg-clip-text font-display text-[clamp(8rem,11vw,13rem)] font-black leading-none tracking-[-0.06em] text-transparent opacity-[0.22] transition-all duration-700 group-hover:-translate-y-1 group-hover:opacity-[0.32]"
            style={{
              backgroundImage:
                "linear-gradient(160deg, var(--accent) 0%, transparent 85%)",
              WebkitBackgroundClip: "text",
            }}
          >
            {projectNumber}
          </div>

          {/* Header row */}
          <div className="relative z-10 flex min-w-0 items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]" />
              <span className="truncate font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)] sm:text-xs">
                {categoryLabel}
              </span>
            </div>

            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] sm:text-xs">
              {project.year}
            </span>
          </div>

          {/* Type row */}
          {projectType && (
            <div className="relative z-10 mt-4 flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-[var(--dim)]/50" />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--muted)] sm:text-xs">
                {projectType}
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            className="relative z-10 mt-8 min-w-0 max-w-full font-display font-black leading-[0.92] tracking-[-0.045em] text-[var(--foreground)] transition-transform duration-700 ease-out [hyphens:none] [text-wrap:balance] group-hover:translate-x-1 sm:mt-10"
            style={{ fontSize: getTitleSize(project.title) }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 mt-6 max-w-[520px] text-[15px] leading-[1.7] text-[var(--muted)] sm:text-base">
            {project.shortDescription}
          </p>

          {/* Footer */}
          <div className="relative z-10 mt-auto flex items-center gap-3 pt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--dim)] sm:text-[11px]">
              Project {projectNumber}
            </span>
            <span className="h-px w-10 bg-[var(--dim)]/40 transition-all duration-500 group-hover:w-16 group-hover:bg-[var(--accent)]" />
          </div>
        </div>

        {/* =================================================
            TOP RIGHT — PREVIEW (fills the row height on lg+)
        ================================================= */}
        <div className="relative min-w-0 lg:col-span-7">
          <div className="relative aspect-video w-full min-w-0 max-w-full overflow-hidden rounded-[25px] border border-[var(--dim)]/30 bg-[var(--bg)]/[0.62] lg:aspect-auto lg:h-full lg:min-h-[420px]">
            {project.previewImage ? (
              <Image
                src={project.previewImage}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,transparent_0%,transparent_55%,var(--accent)_260%)]">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--dim)]/40 bg-[var(--bg)]/50 text-[var(--dim)] backdrop-blur-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--dim)]">
                    Preview Coming Soon
                  </p>
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex min-w-0 items-end justify-between gap-4 sm:bottom-5 sm:left-5 sm:right-5">
              <div className="min-w-0">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 sm:text-[11px]">
                  Project Preview
                </p>
                <p className="max-w-[min(65vw,560px)] truncate font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  {project.title}
                </p>
              </div>

              <button
                type="button"
                onClick={openProject}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)] transition-all duration-300 hover:scale-110 sm:h-14 sm:w-14"
                aria-label={`Explore ${project.title}`}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM LEFT — LINKS / ACTIONS
        ================================================= */}
        <div className="relative min-w-0 overflow-hidden rounded-[25px] border border-[var(--dim)]/30 bg-[var(--bg)]/[0.62] p-6 sm:p-7 md:p-8 lg:col-span-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,var(--accent)_160%)] opacity-[0.018] transition-opacity duration-500 group-hover:opacity-[0.035]"
          />

          <div className="relative z-10 flex h-full flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[13px] font-medium uppercase tracking-[0.22em] text-[var(--foreground)] sm:text-sm">
                Links
              </span>
              <span className="h-px w-12 bg-[var(--dim)]/45" />
            </div>

            <div className="flex flex-1 flex-wrap content-center items-center gap-3 sm:gap-4">
              {hasGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} on GitHub`}
                  className="group/action inline-flex h-12 items-center gap-3 rounded-full border border-[var(--dim)]/50 px-6 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:h-14 sm:px-7 sm:text-xs"
                >
                  <GithubIcon />
                  Source Code
                </a>
              )}

              {hasLive && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${project.title}`}
                  className="group/action inline-flex h-12 items-center gap-3 rounded-full bg-[var(--accent)] px-6 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--bg)] transition-all duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_12px_30px_color-mix(in_srgb,var(--accent)_24%,transparent)] sm:h-14 sm:px-7 sm:text-xs"
                >
                  View Live
                  <span className="transition-transform duration-300 group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5">
                    <ExternalArrow />
                  </span>
                </a>
              )}

              <button
                type="button"
                onClick={openProject}
                className="inline-flex h-12 items-center gap-3 rounded-full px-4 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--accent)] sm:h-14 sm:text-xs"
              >
                Case Study
                <ArrowRight />
              </button>
            </div>

            {!hasGithub && !hasLive && (
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--dim)]">
                Repository &amp; demo links coming soon
              </p>
            )}
          </div>
        </div>

        {/* =================================================
            BOTTOM RIGHT — TECHNOLOGIES
        ================================================= */}
        <div className="relative min-w-0 overflow-hidden rounded-[25px] border border-[var(--dim)]/30 bg-[var(--bg)]/[0.62] p-6 sm:p-7 md:p-8 lg:col-span-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,var(--accent)_160%)] opacity-[0.018]"
          />

          <div className="relative z-10 mb-6 flex items-center gap-4">
            <span className="font-mono text-[13px] font-medium uppercase tracking-[0.22em] text-[var(--foreground)] sm:text-sm">
              Technologies
            </span>
            <span className="h-px w-12 bg-[var(--dim)]/45" />
          </div>

          <div className="relative z-10 grid min-w-0 grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-x-4 gap-y-7">
            {project.stack.map((technology) => (
              <div
                key={technology}
                title={technology}
                className="group/tech flex min-w-0 flex-col items-center gap-3 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <TechLogo technology={technology} />
                <span className="max-w-full font-mono text-[10px] font-medium uppercase leading-[1.35] tracking-[0.08em] text-[var(--muted)] transition-colors duration-300 [overflow-wrap:anywhere] group-hover/tech:text-[var(--foreground)] sm:text-[11px]">
                  {technology}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   PROJECT LIST
========================================================= */

export function ProjectList({
  projects,
  title,
  id,
}: {
  projects: Project[];
  title: string;
  id: string;
}) {
  return (
    <section
      id={id}
      className="w-full max-w-full overflow-hidden px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16 lg:py-36 xl:px-24"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1500px]">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: motionTokens.standard,
            ease: easing.editorial,
          }}
          className="mb-12 md:mb-16 lg:mb-20"
        >
          <div className="flex flex-col gap-5 border-b border-[var(--dim)]/40 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--dim)]">
                Selected Work
              </p>

              <h2 className="font-display text-[clamp(2.8rem,6vw,5.8rem)] font-medium leading-none tracking-[-0.055em] text-[var(--foreground)]">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--dim)]">
              <span>{String(projects.length).padStart(2, "0")} Projects</span>
              <span className="h-px w-8 bg-[var(--dim)]/50" />
            </div>
          </div>
        </motion.div>

        {/* BENTO PROJECTS */}
        <div className="grid min-w-0 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   AI PROJECTS
========================================================= */

export function AIProjects() {
  return (
    <ProjectList projects={aiProjects} title="AI PROJECTS" id="ai-projects" />
  );
}

/* =========================================================
   SDE PROJECTS
========================================================= */

export function SDEProjects() {
  return (
    <ProjectList projects={sdeProjects} title="SDE PROJECTS" id="sde-projects" />
  );
}