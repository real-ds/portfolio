"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/content";
import { motionTokens, easing } from "@/lib/motion";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: motionTokens.standard }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[var(--bg)]/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: motionTokens.reveal, ease: easing.editorial }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[var(--bg)] border border-[var(--dim)] rounded-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-[var(--dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--muted)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="p-8 md:p-12 lg:p-16 space-y-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.reveal }}
              className="space-y-5 pr-12"
            >
              <span className="text-sm font-mono tracking-[0.2em] uppercase text-[var(--accent)]">
                {project.category === "ai" ? "AI PROJECT" : "SDE PROJECT"} — {project.number}
              </span>
              <h1 id="modal-title" className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-tight text-[var(--foreground)]">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-[var(--dim)]">
                <span className="px-3 py-1 border border-[var(--dim)] text-[var(--muted)]">{project.type}</span>
                <span className="text-[var(--accent)]">{project.status}</span>
                <span>{project.year}</span>
              </div>
            </motion.div>

            {/* Preview Image */}
            {project.previewImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: motionTokens.reveal }}
                className="relative aspect-video overflow-hidden rounded-xl bg-[var(--panel)] border border-[var(--dim)]"
              >
                <Image
                  src={project.previewImage}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </motion.div>
            )}

            {/* Problem & Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: motionTokens.reveal }}
              className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-12"
            >
              <div className="space-y-5 p-6 md:p-8 lg:p-10 bg-[var(--panel)] border border-[var(--dim)] rounded-xl">
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Problem
                </h2>
                <p className="text-lg text-[var(--muted)] leading-relaxed">{project.problem}</p>
              </div>
              <div className="space-y-5 p-6 md:p-8 lg:p-10 bg-[var(--panel)] border border-[var(--dim)] rounded-xl">
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Solution
                </h2>
                <p className="text-lg text-[var(--muted)] leading-relaxed">{project.solution}</p>
              </div>
            </motion.div>

            {/* Technical Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: motionTokens.reveal }}
              className="space-y-6"
            >
              <h2 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
                Technical Details
              </h2>
              <div className="prose prose-invert max-w-none text-[var(--muted)] leading-relaxed">
                <p>{project.technicalDetails}</p>
              </div>
            </motion.div>

            {/* Architecture */}
            {project.architecture && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: motionTokens.reveal }}
                className="space-y-5 p-6 md:p-8 lg:p-10 bg-[var(--panel)] border border-[var(--dim)] rounded-xl"
              >
                <h2 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
                  Architecture
                </h2>
                <p className="text-lg text-[var(--muted)] leading-relaxed">{project.architecture}</p>
              </motion.div>
            )}

            {/* AI/ML Approach */}
            {project.aiApproach && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: motionTokens.reveal }}
                className="space-y-5 p-6 md:p-8 lg:p-10 bg-[var(--panel)] border border-[var(--dim)] rounded-xl"
              >
                <h2 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
                  AI / ML Approach
                </h2>
                <p className="text-lg text-[var(--muted)] leading-relaxed">{project.aiApproach}</p>
              </motion.div>
            )}

            {/* Important Technical Decisions */}
            {project.importantDecisions && project.importantDecisions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: motionTokens.reveal }}
                className="space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
                  Important Technical Decisions
                </h2>
                <ul className="space-y-3">
                  {project.importantDecisions.map((decision, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05, duration: motionTokens.reveal }}
                      className="flex gap-4 text-lg text-[var(--muted)] leading-relaxed"
                    >
                      <span className="w-2 h-2 mt-3 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      {decision}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Performance Considerations */}
            {project.performanceConsiderations && project.performanceConsiderations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: motionTokens.reveal }}
                className="space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
                  Performance & Scalability
                </h2>
                <ul className="space-y-3">
                  {project.performanceConsiderations.map((consideration, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + index * 0.05, duration: motionTokens.reveal }}
                      className="flex gap-4 text-lg text-[var(--muted)] leading-relaxed"
                    >
                      <span className="w-2 h-2 mt-3 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      {consideration}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Engineering Challenges */}
            {project.engineeringChallenges && project.engineeringChallenges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: motionTokens.reveal }}
                className="space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
                  Engineering Challenges
                </h2>
                <ul className="space-y-3">
                  {project.engineeringChallenges.map((challenge, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: motionTokens.reveal }}
                      className="flex gap-4 text-lg text-[var(--muted)] leading-relaxed"
                    >
                      <span className="w-2 h-2 mt-3 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      {challenge}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Iteration & Refinement */}
            {project.iterationRefinement && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: motionTokens.reveal }}
                className="space-y-5 p-6 md:p-8 lg:p-10 bg-[var(--panel)] border border-[var(--dim)] rounded-xl"
              >
                <h2 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
                  Iteration & Refinement
                </h2>
                <p className="text-lg text-[var(--muted)] leading-relaxed">{project.iterationRefinement}</p>
              </motion.div>
            )}

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: motionTokens.reveal }}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.02, duration: motionTokens.fast }}
                    className="px-4 py-2 text-sm font-mono text-[var(--muted)] bg-[var(--panel)] border border-[var(--dim)] hover:border-[var(--accent)] hover:text-[var(--foreground)] transition-colors duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: motionTokens.reveal }}
              className="flex flex-wrap items-center gap-4 pt-6 border-t border-[var(--dim)]"
            >
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-[var(--dim)] text-base font-mono tracking-wider uppercase text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524-.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.liveDemoUrl && project.liveDemoUrl !== "#" && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-[var(--accent)] text-base font-mono tracking-wider uppercase text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors duration-300"
                >
                  Live Demo
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}