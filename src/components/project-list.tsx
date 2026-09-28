"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { aiProjects, sdeProjects, Project } from "@/lib/content";
import { motionTokens, easing } from "@/lib/motion";

interface ProjectRowProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function ProjectRow({ project, index, isExpanded, onHover, onLeave, onClick }: ProjectRowProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={previewRef}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="relative cursor-pointer group"
      style={{ willChange: "height" }}
    >
      {/* Compact Row - Default State */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 92,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{
          duration: motionTokens.reveal,
          ease: easing.editorial,
        }}
        className="overflow-hidden border-b border-[var(--dim)] px-0 py-6 md:py-7 transition-colors duration-300 hover:bg-[var(--panel)]/40"
      >
        <div className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-5 md:gap-8">
          {/* Fixed number column keeps every title perfectly aligned. */}
          <span className="text-xl md:text-2xl font-display font-black tracking-tight text-[var(--foreground)] text-right tabular-nums">
            {project.number}
          </span>

          {/* Fixed content column prevents long titles from changing the left edge. */}
          <div className="min-w-0 text-left">
            <h3 className="text-lg md:text-xl font-mono tracking-wider uppercase text-[var(--foreground)] truncate text-left">
              {project.title}
            </h3>
            <p className="mt-1 text-sm md:text-base text-[var(--muted)] truncate text-left">
              {project.shortDescription}
            </p>
          </div>

          {/* Project metadata + external actions. */}
          <div className="flex items-center justify-end gap-3 md:gap-5 whitespace-nowrap">
            <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-[var(--dim)]">
              <span>{project.type}</span>
              <span className="text-[var(--accent)]">{project.status}</span>
            </div>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} on GitHub`}
                  onClick={(event) => event.stopPropagation()}
                  className="group/action inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center border border-[var(--dim)] text-[var(--muted)] transition-all duration-300 ease-out hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:-translate-y-0.5"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover/action:scale-110"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live ${project.title} demo`}
                  onClick={(event) => event.stopPropagation()}
                  className="group/action inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center border border-[var(--dim)] text-[var(--muted)] transition-all duration-300 ease-out hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:-translate-y-0.5"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5"
                  >
                    <path d="M5 19L19 5" />
                    <path d="M9 5h10v10" />
                  </svg>
                </a>
              )}

              <motion.span
                animate={{ x: isExpanded ? 4 : 0 }}
                transition={{ duration: 0.3, ease: easing.editorial }}
                className="ml-1 text-[var(--dim)]"
                aria-hidden="true"
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded State - Reveals on Hover */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: motionTokens.reveal,
              ease: easing.editorial,
            }}
            className="
              overflow-hidden
              px-6
              md:px-10
              lg:px-14
              pb-10
              md:pb-14
              border-b
              border-[var(--dim)]
              bg-[var(--panel)]/30
            "
          >
            <div className="space-y-8 md:space-y-10 pt-8 md:pt-12">
              {/* Large Title + Project Actions */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionTokens.fast }}
                className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10"
              >
                <div className="min-w-0 space-y-3">
                  <span className="text-sm font-mono tracking-[0.2em] uppercase text-[var(--accent)]">
                    {project.category === "ai" ? "AI PROJECT" : "SDE PROJECT"} — {project.number}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight text-[var(--foreground)]">
                    {project.title}
                  </h3>
                </div>

                {/* Prominent external project actions. These stay pinned to the right on desktop. */}
                <div className="flex shrink-0 items-center gap-3 lg:pt-2">
{project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} on GitHub`}
                      onClick={(event) => event.stopPropagation()}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.25, ease: easing.editorial }}
                      className="group/action inline-flex h-14 w-14 items-center justify-center border border-[var(--dim)] bg-transparent text-[var(--foreground)] transition-colors duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] md:h-16 md:w-16"
                    >
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/action:scale-110"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </motion.a>
                  )}

{project.liveDemoUrl && (
                    <motion.a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live ${project.title} demo`}
                      onClick={(event) => event.stopPropagation()}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.25, ease: easing.editorial }}
                      className="group/live inline-flex h-14 items-center gap-4 border border-[var(--accent)] bg-[var(--accent)] px-5 text-[var(--bg)] transition-colors duration-300 hover:bg-transparent hover:text-[var(--accent)] md:h-16 md:px-6"
                    >
                      <span className="text-xs md:text-sm font-mono font-medium uppercase tracking-[0.18em] whitespace-nowrap">
                        View Live
                      </span>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/live:translate-x-1 group-hover/live:-translate-y-1"
                      >
                        <path d="M5 19L19 5" />
                        <path d="M9 5h10v10" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </motion.div>

              {/* Problem & Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: motionTokens.reveal }}
                className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-12"
              >
                <div className="space-y-5 p-6 md:p-8 bg-[var(--bg)] border border-[var(--dim)] rounded-lg">
                  <h4 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                    Problem
                  </h4>
                  <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div className="space-y-5 p-6 md:p-8 bg-[var(--bg)] border border-[var(--dim)] rounded-lg">
                  <h4 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                    Solution
                  </h4>
                  <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </motion.div>

              {/* Tech Stack & Metadata */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: motionTokens.reveal }}
                className="grid md:grid-cols-3 gap-6 md:gap-8"
              >
                <div className="space-y-3">
                  <h4 className="text-xs font-mono tracking-widest uppercase text-[var(--dim)]">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1 bg-[var(--bg)] border border-[var(--dim)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)] transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-mono tracking-widest uppercase text-[var(--dim)]">
                    Type / Year
                  </h4>
                  <div className="space-y-1 text-sm text-[var(--muted)]">
                    <p>{project.type}</p>
                    <p className="text-[var(--foreground)]">{project.year}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-mono tracking-widest uppercase text-[var(--dim)]">
                    Status
                  </h4>
                  <p className="text-sm font-mono text-[var(--accent)]">{project.status}</p>
                </div>
              </motion.div>

              {/* Project Preview - Large */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15, duration: motionTokens.reveal }}
                className="relative aspect-video overflow-hidden rounded-xl bg-[var(--bg)] border border-[var(--dim)]"
              >
                {project.previewImage ? (
                  <Image
                    src={project.previewImage}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-[var(--dim)]">
                      <svg
                        className="w-16 h-16 mx-auto mb-4 opacity-30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 17" />
                      </svg>
                      <p className="text-sm font-mono">Preview Available</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: motionTokens.reveal }}
                className="flex items-center gap-4 pt-6 border-t border-[var(--dim)]"
              >
{project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 border border-[var(--dim)] text-sm font-mono tracking-wider uppercase text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
{project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 border border-[var(--accent)] text-sm font-mono tracking-wider uppercase text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors duration-300"
                  >
                    Live Demo
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ProjectList({ projects, title, id }: { projects: Project[]; title: string; id: string }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleHover = (index: number) => setExpandedIndex(index);
  const handleLeave = () => setExpandedIndex(null);

  return (
    <section id={id} className="py-28 md:py-36 px-6 md:px-16 lg:px-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: motionTokens.standard }}
        className="text-lg md:text-xl font-mono tracking-[0.3em] uppercase text-[var(--dim)] mb-12"
      >
        {title}
      </motion.p>

      <div className="space-y-0">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            isExpanded={expandedIndex === index}
            onHover={() => handleHover(index)}
            onLeave={handleLeave}
            onClick={() => router.push(`/projects/${project.category}/${project.id}`)}
          />
        ))}
      </div>
    </section>
  );
}

export function AIProjects() {
  return <ProjectList projects={aiProjects} title="AI PROJECTS" id="ai-projects" />;
}

export function SDEProjects() {
  return <ProjectList projects={sdeProjects} title="SDE PROJECTS" id="sde-projects" />;
}
