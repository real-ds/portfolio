"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { motionTokens, easing } from "@/lib/motion";

/* ---------- motion ---------- */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.reveal, ease: easing.editorial },
  },
};

/* ---------- content ---------- */

const points = [
  {
    num: "01",
    kicker: "Creative Engineer",
    body: "Creative Programmer, AI Developer, and Designer who designs robust software solutions around real-world problems.",
  },
  {
    num: "02",
    kicker: "AI Enthusiast",
    body: "An AI enthusiast who creatively redefines how AI can be used to build software solutions that delivers value to the end user.",
  },
] as const;

/* ---------- magnetic name ---------- */

function MagneticName({ text }: { text: string }) {
  const still = useReducedMotion() ?? false;
  const wrapRef = useRef<HTMLSpanElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const centers = useRef<{ x: number; y: number }[]>([]);

  const words = text.split(" ");
  const offsets: number[] = [];
  let acc = 0;
  for (const w of words) {
    offsets.push(acc);
    acc += w.length;
  }

  // Cache each letter's rest position on enter; transforms never affect this.
  const capture = () => {
    centers.current = letters.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
  };

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (still || !centers.current.length) return;
    const radius = Math.max((wrapRef.current?.offsetWidth ?? 640) * 0.2, 110);

    letters.current.forEach((el, k) => {
      const c = centers.current[k];
      if (!el || !c) return;

      const dx = c.x - e.clientX;
      const dy = c.y - e.clientY;
      const dist = Math.hypot(dx, dy) || 1;
      const t = dist < radius ? 1 - dist / radius : 0;
      const s = t * t; // ease-out falloff

      // Repel away from the cursor, growing as it gets closer.
      el.style.transform = `translate3d(${(dx / dist) * s * 16}px, ${
        (dy / dist) * s * 16
      }px, 0) scale(${1 + s * 0.18})`;
      el.style.color = s > 0.28 ? "var(--accent)" : "";
    });
  };

  const reset = () => {
    letters.current.forEach((el) => {
      if (!el) return;
      el.style.transform = "";
      el.style.color = "";
    });
  };

  return (
    <span
      ref={wrapRef}
      onPointerEnter={capture}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline"
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          className={wi < words.length - 1 ? "mr-[0.24em] inline-block" : "inline-block"}
        >
          {Array.from(word).map((ch, ci) => (
            <span
              key={ci}
              ref={(el) => {
                letters.current[offsets[wi] + ci] = el;
              }}
              className="inline-block will-change-transform"
              style={{
                transition:
                  "transform 300ms cubic-bezier(.22,1,.36,1), color 300ms ease",
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

/* ---------- tile layers ---------- */

const sweeps = {
  up: "[clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0)]",
  right: "[clip-path:inset(0_0_0_100%)] group-hover:[clip-path:inset(0)]",
} as const;

/** Accent flood that sweeps in on hover. */
function Sweep({ from = "up" }: { from?: keyof typeof sweeps }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-[var(--accent)] transition-[clip-path] duration-[850ms] ease-[cubic-bezier(.7,0,.2,1)] motion-reduce:transition-none ${sweeps[from]}`}
    />
  );
}

/** Card that tilts toward the cursor and carries a follow-spotlight. */
function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion() ?? false;

  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const gx = useSpring(50, { stiffness: 110, damping: 22 });
  const gy = useSpring(50, { stiffness: 110, damping: 22 });

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 72%)`;

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        gx.set(px * 100);
        gy.set(py * 100);
        if (still) return;
        ry.set((px - 0.5) * 9);
        rx.set((0.5 - py) * 9);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        gx.set(50);
        gy.set(50);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className={`group relative isolate overflow-hidden rounded-[26px] border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color-mix(in_oklab,var(--panel)_72%,transparent)] ${className}`}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  );
}

const subFlip =
  "transition-colors duration-500 group-hover:text-[color-mix(in_oklab,var(--bg)_62%,transparent)]";

/* ---------- section ---------- */

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      onPointerMove={(e) => {
        const el = sectionRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
      className="relative isolate overflow-hidden px-6 py-32 md:px-12 md:py-40 lg:px-24"
    >
      {/* Subtle gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in oklab, var(--accent) 7%, transparent) 0%, transparent 38%), radial-gradient(120% 90% at 100% 0%, color-mix(in oklab, var(--panel) 85%, transparent) 0%, transparent 60%), radial-gradient(90% 70% at 0% 100%, color-mix(in oklab, var(--dim) 14%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Cursor-following ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(620px circle at var(--gx, 70%) var(--gy, 25%), color-mix(in oklab, var(--accent) 12%, transparent), transparent 68%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl"
      >
        {/* Header */}
        <motion.div
          variants={item}
          className="group/label mb-12 flex items-center gap-5"
        >
          <p className="font-mono text-lg uppercase tracking-[0.3em] text-[var(--dim)] transition-[letter-spacing,color] duration-500 group-hover/label:tracking-[0.5em] group-hover/label:text-[var(--accent)] md:text-xl">
            About Me
          </p>
          <span className="h-px w-full max-w-[240px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/label:scale-x-100" />
        </motion.div>

        {/* Name */}
        <motion.h2
          variants={item}
          className="font-display text-[clamp(2.75rem,7.5vw,6.5rem)] font-black leading-[0.95] tracking-tight"
        >
          <MagneticName text="DIVYANSHU SINGH" />
        </motion.h2>

        {/* Intro */}
        <motion.div variants={item} className="mt-10 max-w-2xl space-y-6">
          <p className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold leading-[1.15] tracking-tight text-[var(--foreground)]">
            Budding Creative Programmer
            <br />
            and <span className="text-[var(--accent)]">AI Enthusiast</span>
          </p>
          <p className="border-l-2 border-[var(--accent)] pl-6 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            I build products at the intersection of technology, creativity and
            real-world impact. Passionate about AI/ML, modern web development
            and solving meaningful problems.
          </p>
        </motion.div>

        {/* Two points */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {points.map((p) => (
            <motion.div key={p.num} variants={item}>
              <TiltCard className="h-full p-7 md:p-8">
                <Sweep from="up" />
                <div className="relative z-10 flex h-full flex-col gap-6 text-[var(--foreground)] transition-colors duration-500 group-hover:text-[var(--bg)]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm tracking-[0.28em] text-[var(--accent)] transition-colors duration-500 group-hover:text-[var(--bg)]">
                      {p.num}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--dim)] text-lg transition-all duration-500 group-hover:translate-x-1 group-hover:border-[var(--bg)] group-hover:text-[var(--bg)]">
                      ↗
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {p.kicker}
                  </h3>
                  <p className={`text-base leading-relaxed text-[var(--muted)] md:text-lg ${subFlip}`}>
                    {p.body}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div variants={item} className="mt-5">
          <TiltCard className="p-7 md:p-9">
            <Sweep from="right" />
            <div className="relative z-10 flex flex-col gap-6 text-[var(--foreground)] transition-colors duration-500 group-hover:text-[var(--bg)] md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className={`font-mono text-sm uppercase tracking-[0.25em] text-[var(--dim)] ${subFlip}`}>
                  Education
                </p>
                <p className="font-display text-xl font-bold tracking-tight md:text-2xl">
                  Integrated M.Tech in Software Engineering
                </p>
                <p className={`font-mono text-sm text-[var(--muted)] ${subFlip}`}>
                  VIT Chennai · 2027
                </p>
              </div>
              <span className="font-display text-5xl font-black leading-none tracking-tighter text-[color-mix(in_oklab,var(--foreground)_12%,transparent)] transition-colors duration-500 group-hover:text-[color-mix(in_oklab,var(--bg)_35%,transparent)] md:text-7xl">
                2027
              </span>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </section>
  );
}