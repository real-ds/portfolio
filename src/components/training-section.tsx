
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { motionTokens, easing } from "@/lib/motion";

type Training = {
  number: string;
  organization: string;
  title: string;
  category: string;
  image: string;
  alt: string;
};

const trainings: Training[] = [
  {
    number: "01",
    organization: "IBM SkillsBuild",
    title: "Data Analytics with Python and AI",
    category: "Data Analytics & AI",
    image: "/trainings/IBMSkillsBuild.png",
    alt: "IBM SkillsBuild training certificate",
  },
  {
    number: "02",
    organization: "AICTE TechSaksham",
    title: "AI and ML Foundations",
    category: "AI & Machine Learning",
    image: "/trainings/AICTETechSaksham.png",
    alt: "AICTE TechSaksham training certificate",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.reveal,
      ease: easing.editorial,
    },
  },
};

export function TrainingSection() {
  const still = useReducedMotion() ?? false;

  return (
    <section
      id="training"
      className="relative isolate overflow-hidden border-t border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[var(--bg)] px-6 py-24 md:px-12 md:py-32 lg:px-24"
    >
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 60% at 100% 0%, color-mix(in oklab, var(--accent) 6%, transparent) 0%, transparent 60%), radial-gradient(80% 60% at 0% 100%, color-mix(in oklab, var(--panel) 80%, transparent) 0%, transparent 65%)",
        }}
      />

      <motion.div
        variants={container}
        initial={still ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-[1500px]"
      >
        {/* Section heading */}
        <motion.div
          variants={item}
          className="mb-10 flex flex-col gap-5 border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] pb-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--dim)]">
              Learning & Development
            </p>

            <h2
              className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-none tracking-[-0.05em] text-[var(--foreground)]"
            >
              TRAINING
            </h2>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            02 PROGRAMS
          </p>
        </motion.div>

        {/* Training cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {trainings.map((training) => (
            <motion.article
              key={training.number}
              variants={item}
              className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color-mix(in_oklab,var(--panel)_72%,transparent)] p-5 sm:p-7 md:p-8"
            >
              {/* Card index and category */}
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {training.category}
                </p>

                <span className="shrink-0 font-mono text-xs text-[var(--muted)]">
                  {training.number} / 02
                </span>
              </div>

              {/* Certificate image */}
              <div className="relative mt-7 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_8%,transparent)] bg-white p-3 sm:p-5">
                <div className="relative h-full w-full">
                  <Image
                    src={training.image}
                    alt={training.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 650px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Training information */}
              <div className="mt-7 flex flex-1 items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    Training Program
                  </p>

                  <h3 className="font-display text-xl font-bold leading-[1.22] tracking-tight text-[var(--foreground)] sm:text-2xl [text-wrap:balance]">
                    {training.organization}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_65%,transparent)] sm:text-base">
                    {training.title}
                  </p>
                </div>

                {/* Static decorative icon */}
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] text-[var(--foreground)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3 14.8 8.7 21 9.6 16.5 14 17.6 20.2 12 17.2 6.4 20.2 7.5 14 3 9.6 9.2 8.7 12 3Z" />
                  </svg>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
