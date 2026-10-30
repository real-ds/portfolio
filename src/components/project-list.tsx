"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { aiProjects, sdeProjects, Project } from "@/lib/content";
import { motionTokens, easing } from "@/lib/motion";

/* =========================================================
   ICONS
   ========================================================= */

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M5 19L19 5" />
      <path d="M9 5h10v10" />
    </svg>
  );
}

/* =========================================================
   HELPERS
   ========================================================= */

/** Scales the title so long names never break mid-word. */
function getTitleSize(title: string) {
  const length = title.trim().length;

  if (length <= 10) return "clamp(2.6rem, 6vw, 5.5rem)";
  if (length <= 16) return "clamp(2.2rem, 4.8vw, 4.5rem)";
  return "clamp(1.9rem, 3.8vw, 3.6rem)";
}

/* =========================================================
   PROJECT ROW
   ========================================================= */

function ProjectRow({
  project,
  index,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const projectNumber = String(project.number).padStart(2, "0");
  const projectType =
    project.type?.toUpperCase() === "AI PRODUCT" ? "SAAS" : project.type;
  const stackLine = project.stack.slice(0, 5).join("  /  ");

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: motionTokens.reveal,
        delay: index * 0.06,
        ease: easing.editorial,
      }}
      className={`relative border-b border-[var(--dim)]/40 ${
        isActive ? "z-20" : "z-0"
      }`}
    >
      <motion.div
        animate={{ opacity: isDimmed ? 0.28 : 1 }}
        transition={{ duration: motionTokens.standard, ease: easing.editorial }}
      >
        <Link
          href={`/projects/${project.category}/${project.id}`}
          onMouseEnter={onActivate}
          onMouseLeave={onDeactivate}
          onFocus={onActivate}
          onBlur={onDeactivate}
          aria-label={`Open ${project.title} project`}
          className="group relative block py-8 outline-none sm:py-10 lg:py-12"
        >
          {/* Accent line that draws across on hover */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left bg-[var(--accent)]"
            initial={false}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, ease: easing.editorial }}
          />

          <div className="grid grid-cols-[auto_1fr] items-start gap-x-5 sm:gap-x-8 lg:grid-cols-[4.5rem_1fr_auto]">
            {/* Number */}
            <span
              className={`pt-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 sm:text-xs lg:pt-5 ${
                isActive ? "text-[var(--accent)]" : "text-[var(--dim)]"
              }`}
            >
              {projectNumber}
            </span>

            {/* Title + reveal */}
            <div className="min-w-0 lg:max-w-[56%]">
              <motion.h3
                animate={{ scale: isActive ? 1.06 : 1 }}
                transition={{ duration: 0.6, ease: easing.editorial }}
                style={{ fontSize: getTitleSize(project.title) }}
                className="origin-left font-display font-black leading-[0.95] tracking-[-0.045em] text-[var(--foreground)] [hyphens:none] [text-wrap:balance]"
              >
                {project.title}
              </motion.h3>

              {/* Touch / small screens: always visible, no hover needed */}
              <div className="mt-5 lg:hidden">
                <p className="max-w-[520px] text-[15px] leading-[1.7] text-[var(--muted)] sm:text-base">
                  {project.shortDescription}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--dim)]">
                  {stackLine}
                </p>
              </div>

              {/* Desktop: description slides open on hover */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: easing.editorial }}
                    className="hidden overflow-hidden lg:block"
                  >
                    <p className="mt-6 max-w-[520px] text-base leading-[1.7] text-[var(--muted)]">
                      {project.shortDescription}
                    </p>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
                      {stackLine}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Meta (right) */}
            <div
              className={`col-span-2 mt-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-opacity duration-500 sm:text-xs lg:col-span-1 lg:mt-0 lg:flex-col lg:items-end lg:gap-3 lg:pt-5 ${
                isActive ? "lg:opacity-0" : "lg:opacity-100"
              }`}
            >
              {projectType && <span>{projectType}</span>}
              <span className="text-[var(--dim)]">{project.year}</span>
              <span className="ml-auto text-[var(--dim)] lg:ml-0">
                <ArrowUpRight />
              </span>
            </div>
          </div>

          {/* Preview overlay (desktop only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 hidden w-[300px] -translate-y-1/2 lg:block xl:right-4 xl:w-[360px]"
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: 48, rotate: 6, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, rotate: 3, scale: 1 }}
                  exit={{ opacity: 0, x: 24, rotate: 5, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: easing.editorial }}
                  className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--dim)]/50 bg-[var(--bg)] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65)]"
                >
                  {project.previewImage ? (
                    <Image
                      src={project.previewImage}
                      alt=""
                      fill
                      sizes="360px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,transparent_0%,transparent_55%,var(--accent)_260%)]">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
                        Preview Coming Soon
                      </p>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
                    <p className="truncate font-display text-lg font-bold tracking-tight text-white">
                      {project.title}
                    </p>
                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
                      View project
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
      </motion.div>
    </motion.li>
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
  const [activeId, setActiveId] = useState<string | null>(null);

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
          className="mb-4 md:mb-6 lg:mb-8"
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

        {/* LIST */}
        <ul className="min-w-0">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isActive={activeId === project.id}
              isDimmed={activeId !== null && activeId !== project.id}
              onActivate={() => setActiveId(project.id)}
              onDeactivate={() => setActiveId(null)}
            />
          ))}
        </ul>
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