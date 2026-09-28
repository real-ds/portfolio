"use client";

import React from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { sdeProjects } from "@/lib/content";
import { motionTokens, easing } from "@/lib/motion";
import { Navigation } from "@/components/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { Footer } from "@/components/footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SDEProjectPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const project = sdeProjects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <MobileNav />
      <main className="min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: motionTokens.standard }}
          className="pt-32 pb-24 px-6 md:px-12 lg:px-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: motionTokens.reveal }}
            className="mb-8"
          >
            <Link
              href="/"
              scroll={false}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/#sde-projects";
              }}
              className="inline-flex items-center gap-2 text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300"
            >
              <span>←</span>
              <span>Back to SDE Projects</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: motionTokens.cinematic, ease: easing.editorial }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: motionTokens.fast }}
                className="text-sm font-mono tracking-[0.2em] uppercase text-[var(--accent)]"
              >
                SDE Project — {project.number}
              </motion.span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-tight text-[var(--foreground)]">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-3xl">
                {project.shortDescription}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: motionTokens.reveal }}
                className="space-y-3 p-6 bg-[var(--panel)]/30 border border-[var(--dim)] rounded-lg"
              >
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Problem
                </h2>
                <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                  {project.problem}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: motionTokens.reveal }}
                className="space-y-3 p-6 bg-[var(--panel)]/30 border border-[var(--dim)] rounded-lg"
              >
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Solution
                </h2>
                <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            </div>

            {project.technicalDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: motionTokens.reveal }}
                className="space-y-4 p-6 bg-[var(--panel)]/20 border border-[var(--dim)] rounded-lg"
              >
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Technical Details
                </h2>
                <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                  {project.technicalDetails}
                </p>
              </motion.div>
            )}

            {project.architecture && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: motionTokens.reveal }}
                className="space-y-4 p-6 bg-[var(--panel)]/20 border border-[var(--dim)] rounded-lg"
              >
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Architecture
                </h2>
                <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                  {project.architecture}
                </p>
              </motion.div>
            )}

            {project.importantDecisions && project.importantDecisions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: motionTokens.reveal }}
                className="space-y-4 p-6 bg-[var(--panel)]/20 border border-[var(--dim)] rounded-lg"
              >
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Important Decisions
                </h2>
                <ul className="space-y-2 text-base text-[var(--muted)]">
                  {project.importantDecisions.map((decision, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + index * 0.05, duration: motionTokens.fast }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>{decision}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project.performanceConsiderations && project.performanceConsiderations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: motionTokens.reveal }}
                className="space-y-4 p-6 bg-[var(--panel)]/20 border border-[var(--dim)] rounded-lg"
              >
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Performance Considerations
                </h2>
                <ul className="space-y-2 text-base text-[var(--muted)]">
                  {project.performanceConsiderations.map((consideration, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: motionTokens.fast }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>{consideration}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project.engineeringChallenges && project.engineeringChallenges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: motionTokens.reveal }}
                className="space-y-4 p-6 bg-[var(--panel)]/20 border border-[var(--dim)] rounded-lg"
              >
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Engineering Challenges
                </h2>
                <ul className="space-y-2 text-base text-[var(--muted)]">
                  {project.engineeringChallenges.map((challenge, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + index * 0.05, duration: motionTokens.fast }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project.iterationRefinement && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: motionTokens.reveal }}
                className="space-y-4 p-6 bg-[var(--panel)]/20 border border-[var(--dim)] rounded-lg"
              >
                <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                  Iteration & Refinement
                </h2>
                <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                  {project.iterationRefinement}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: motionTokens.reveal }}
              className="space-y-4 p-6 bg-[var(--panel)]/20 border border-[var(--dim)] rounded-lg"
            >
              <h2 className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.65 + index * 0.03, duration: motionTokens.fast }}
                    className="text-sm font-mono px-4 py-2 bg-[var(--bg)] border border-[var(--dim)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)] transition-colors duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: motionTokens.reveal }}
              className="flex flex-wrap items-center gap-4 pt-6 border-t border-[var(--dim)]"
            >
              {project.githubUrl && project.githubUrl !== "#" && (
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
              {project.liveDemoUrl && project.liveDemoUrl !== "#" && (
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
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}