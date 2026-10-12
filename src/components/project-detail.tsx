"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import type { ReactNode } from "react";
import type { Project } from "@/lib/content";
import { easing } from "@/lib/motion";
import { TechMark } from "@/components/tech-mark";

/* =========================================================
   TYPE + COLOUR SCALE

   The site body is set in Cascadia Code at 20px, which is the
   right voice for labels but exhausting for long-form reading.
   Every reading passage below therefore opts into `cs-prose`
   (a scoped sans face at a comfortable measure), while all
   metadata stays on the mono face.
   ========================================================= */

const PROSE =
  "cs-prose max-w-[64ch] text-[color-mix(in_srgb,var(--foreground)_74%,transparent)]";

const META =
  "font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--dim)]";

/* =========================================================
   ICONS
   ========================================================= */

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function GithubMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 5.8c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58A12 12 0 0012 0z" />
    </svg>
  );
}

function Rule({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-px w-full bg-[var(--dim)]/30 ${className}`}
    />
  );
}

/* =========================================================
   MOTION

   One reveal, used everywhere: a short rise and a fade.
   Nothing slides sideways, nothing scales, nothing loops.
   ========================================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: reduced ? 0 : 0.75, delay, ease: easing.editorial }}
    >
      {children}
    </motion.div>
  );
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[var(--accent)]"
    />
  );
}

/* =========================================================
   PIECES
   ========================================================= */

/**
 * A real, pressable button: solid body + hairline edge. Hover
 * inverts the fill rather than lifting or glowing.
 */
function Button({
  href,
  children,
  icon,
  variant = "outline",
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "solid" | "outline";
}) {
  const solid = variant === "solid";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group
        inline-flex h-12 shrink-0 items-center gap-2.5 rounded-[6px]
        border px-6 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em]
        transition-colors duration-200
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]
        sm:h-13 sm:px-7 sm:text-[0.8rem]
        ${
          solid
            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] hover:border-[var(--accent-bright)] hover:bg-[var(--accent-bright)]"
            : "border-[var(--dim)]/70 bg-[var(--panel)]/40 text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
        }
      `}
    >
      {children}

      {icon ? (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </a>
  );
}

/**
 * One editorial spread: a sticky index rail on the left, the
 * reading column on the right. Used for every section so the
 * page keeps a single, consistent rhythm.
 */
function Section({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[var(--dim)]/30 pt-10 md:pt-14">
      <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="flex items-baseline gap-4">
            <span className={`${META} tabular-nums`}>{index}</span>
            <h2 className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] font-black uppercase leading-none tracking-[-0.02em] text-[var(--foreground)]">
              {label}
            </h2>
          </div>
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** Hairline-separated, numbered rows — no bullets, no boxes. */
function NumberedList({
  items,
  size = "md",
}: {
  items?: string[];
  size?: "md" | "lg";
}) {
  if (!items || items.length === 0) return null;

  const body =
    size === "lg"
      ? `cs-prose max-w-[58ch] text-[1.125rem] leading-[1.65] text-[var(--foreground)]/85 md:text-[1.3125rem]`
      : `${PROSE} max-w-[60ch] text-[1.0625rem] leading-[1.7] md:text-[1.125rem]`;

  return (
    <ol className="border-t border-[var(--dim)]/30">
      {items.map((item, i) => (
        <li
          key={item}
          className={`grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-5 border-b border-[var(--dim)]/30 ${size === "lg" ? "py-7" : "py-5"}`}
        >
          <span className={`${META} pt-[0.45rem] tabular-nums`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className={body}>{item}</p>
        </li>
      ))}
    </ol>
  );
}

function Paragraph({ children }: { children?: string }) {
  if (!children) return null;

  return (
    <p className={`${PROSE} text-[1.0625rem] leading-[1.8] md:text-[1.1875rem]`}>
      {children}
    </p>
  );
}

/** Same hairline rhythm as NumberedList, for prose too dense to stay a
    paragraph. Keeps the justified reading measure without the wall of
    text that long single-column sentences produce. */
function BulletList({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="border-t border-[var(--dim)]/30">
      {items.map((item) => (
        <li
          key={item}
          className="grid grid-cols-[0.9rem_minmax(0,1fr)] gap-x-4 border-b border-[var(--dim)]/30 py-4"
        >
          <span
            aria-hidden="true"
            className="relative top-[0.7rem] h-[5px] w-[5px] rounded-full bg-[var(--accent)]"
          />
          <p className={`${PROSE} text-[1.0625rem] leading-[1.7] md:text-[1.125rem]`}>
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** A section body is either a bulleted list or a single paragraph. */
function Body({
  text,
  points,
}: {
  text?: string;
  points?: string[];
}) {
  if (points?.length) return <BulletList items={points} />;
  return <Paragraph>{text}</Paragraph>;
}

/* =========================================================
   PAGE
   ========================================================= */

export function ProjectCaseStudy({
  project,
  siblings,
}: {
  project: Project;
  siblings: Project[];
}) {
  const isAi = project.category === "ai";
  const categoryLabel = isAi ? "AI Project" : "SDE Project";
  const backHref = isAi ? "/#ai-projects" : "/#sde-projects";
  const backLabel = isAi ? "All AI projects" : "All SDE projects";

  const position = siblings.findIndex((p) => p.id === project.id);
  const previous = position > 0 ? siblings[position - 1] : undefined;
  const next =
    position >= 0 && position < siblings.length - 1
      ? siblings[position + 1]
      : undefined;

  const hasGithub = Boolean(project.githubUrl && project.githubUrl !== "#");
  const hasLive = Boolean(project.liveDemoUrl && project.liveDemoUrl !== "#");

  const meta = [categoryLabel, project.type, project.year, project.status].filter(
    Boolean
  );

  /* Sections are collected first so the index rail is always correct,
     even when a project is missing optional fields. */
  const sections: { label: string; body: ReactNode }[] = [
    { label: "The problem", body: <Paragraph>{project.problem}</Paragraph> },
    { label: "The response", body: <Paragraph>{project.solution}</Paragraph> },
  ];

  if (project.technicalDetails || project.technicalDetailsPoints?.length) {
    sections.push({
      label: "How it works",
      body: (
        <Body
          text={project.technicalDetails}
          points={project.technicalDetailsPoints}
        />
      ),
    });
  }

  if (project.architecture || project.architecturePoints?.length) {
    sections.push({
      label: "Architecture",
      body: (
        <Body text={project.architecture} points={project.architecturePoints} />
      ),
    });
  }

  if (project.aiApproach || project.aiApproachPoints?.length) {
    sections.push({
      label: "AI approach",
      body: (
        <Body text={project.aiApproach} points={project.aiApproachPoints} />
      ),
    });
  }

  if (project.importantDecisions?.length) {
    sections.push({
      label: "Key decisions",
      body: <NumberedList items={project.importantDecisions} />,
    });
  }

  if (project.performanceConsiderations?.length) {
    sections.push({
      label: "Performance",
      body: <NumberedList items={project.performanceConsiderations} />,
    });
  }

  if (project.engineeringChallenges?.length) {
    sections.push({
      label: "Hard problems",
      body: <NumberedList items={project.engineeringChallenges} />,
    });
  }

  if (project.iterationRefinement) {
    sections.push({
      label: "Iteration",
      body: <Paragraph>{project.iterationRefinement}</Paragraph>,
    });
  }

  sections.push({
    label: "Built with",
    body: (
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {project.stack.map((tech) => (
          <TechMark key={tech} technology={tech} size="lg" />
        ))}
      </div>
    ),
  });

  /* Closes the page: what actually came out of building it. */
  if (project.learnings?.length) {
    sections.push({
      label: "What I learned",
      body: <NumberedList items={project.learnings} size="lg" />,
    });
  }

  return (
    <>
      <ReadingProgress />

      <main className="min-h-screen pb-28 pt-36 md:pt-44">
        <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          {/* ============================================
              MASTHEAD
              ============================================ */}

          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--dim)]/30 pb-5">
              <Link
                href={backHref}
                className="group inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
              >
                <ArrowLeft className="h-[13px] w-[13px] transition-transform duration-300 group-hover:-translate-x-1" />
                {backLabel}
              </Link>

              <span className={`${META} tabular-nums`}>
                {String(position + 1).padStart(2, "0")} /{" "}
                {String(siblings.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>

          <div className="pt-10 md:pt-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
              <div className="min-w-0">
                <Reveal delay={0.04}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {meta.map((item, i) => (
                      <span key={item} className="flex items-center gap-4">
                        {i > 0 && (
                          <span
                            aria-hidden="true"
                            className="hidden h-3 w-px bg-[var(--dim)]/50 sm:block"
                          />
                        )}
                        <span
                          className={`${META} ${i === 0 ? "text-[var(--accent)]" : ""}`}
                        >
                          {item}
                        </span>
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.9rem,10.5vw,9rem)] font-black leading-[0.84] tracking-[-0.05em] text-[var(--foreground)] [text-wrap:balance] [hyphens:none]">
                    {project.title}
                  </h1>
                </Reveal>
              </div>

              {(hasGithub || hasLive) && (
                <Reveal delay={0.12} className="shrink-0 lg:pb-3">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    {hasLive && (
                      <Button
                        href={project.liveDemoUrl!}
                        variant="solid"
                        icon={<ArrowUpRight className="h-[15px] w-[15px]" />}
                      >
                        Live site
                      </Button>
                    )}

                    {hasGithub && (
                      <Button
                        href={project.githubUrl!}
                        variant="outline"
                        icon={<GithubMark className="h-[16px] w-[16px]" />}
                      >
                        GitHub
                      </Button>
                    )}
                  </div>
                </Reveal>
              )}
            </div>

            <Reveal delay={0.16}>
              <p className="cs-prose mt-8 max-w-[52ch] text-left text-[clamp(1.05rem,1.9vw,1.5rem)] leading-[1.45] text-[var(--foreground)]/85">
                {project.shortDescription}
              </p>
            </Reveal>
          </div>

          {/* ============================================
              PREVIEW
              ============================================ */}

          {project.previewImage && (
            <Reveal delay={0.2} className="mt-16 md:mt-24">
              <figure className="m-0">
                <div className="relative aspect-video w-full overflow-hidden rounded-[14px] border border-[var(--dim)]/35 bg-[var(--panel)]/40">
                  <Image
                    src={project.previewImage}
                    alt={`${project.title} — interface preview`}
                    fill
                    priority
                    sizes="(max-width: 1536px) 92vw, 1400px"
                    className="object-contain object-center"
                  />
                </div>

                <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className={META}>
                    Fig. 01 — {project.title} in production
                  </span>
                  {hasLive && (
                    <a
                      href={project.liveDemoUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
                    >
                      Open live site
                      <ArrowUpRight className="h-[12px] w-[12px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          )}

          {/* ============================================
              THE CASE STUDY
              ============================================ */}

          <div className="mt-20 space-y-14 md:mt-28 md:space-y-20">
            {sections.map((section, i) => (
              <Reveal key={section.label}>
                <Section index={String(i + 1).padStart(2, "0")} label={section.label}>
                  {section.body}
                </Section>
              </Reveal>
            ))}
          </div>

          {/* ============================================
              OUTRO
              ============================================ */}

          <Reveal className="mt-24 md:mt-32">
            <Rule />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <span className={`${META} max-w-[34ch]`}>
                End of case study — {project.title}
              </span>

              <Link
                href={backHref}
                className="group inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
              >
                <ArrowLeft className="h-[13px] w-[13px] transition-transform duration-300 group-hover:-translate-x-1" />
                {backLabel}
              </Link>
            </div>
          </Reveal>

          {/* ============================================
              PREV / NEXT
              ============================================ */}

          {(previous || next) && (
            <nav className="mt-16 border-t border-[var(--dim)]/30 md:mt-20">
              {previous && (
                <Link
                  href={`/projects/${previous.category}/${previous.id}`}
                  className="group flex items-center gap-6 border-b border-[var(--dim)]/30 py-8 md:py-10"
                >
                  <ArrowLeft className="h-5 w-5 shrink-0 text-[var(--dim)] transition-all duration-300 group-hover:-translate-x-1.5 group-hover:text-[var(--foreground)]" />

                  <span className="min-w-0 flex-1">
                    <span className={`${META} block`}>Previous</span>
                    <span className="mt-2 block truncate font-display text-[clamp(1.6rem,4vw,2.75rem)] font-black leading-none tracking-[-0.035em] text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {previous.title}
                    </span>
                  </span>
                </Link>
              )}

              {next && (
                <Link
                  href={`/projects/${next.category}/${next.id}`}
                  className="group flex items-center justify-end gap-6 border-b border-[var(--dim)]/30 py-8 text-right md:py-10"
                >
                  <span className="min-w-0 flex-1">
                    <span className={`${META} block`}>Next</span>
                    <span className="mt-2 block truncate font-display text-[clamp(1.6rem,4vw,2.75rem)] font-black leading-none tracking-[-0.035em] text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {next.title}
                    </span>
                  </span>

                  <ArrowRight className="h-5 w-5 shrink-0 text-[var(--dim)] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--foreground)]" />
                </Link>
              )}
            </nav>
          )}
        </div>
      </main>
    </>
  );
}