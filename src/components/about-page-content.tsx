"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { motionTokens, easing } from "@/lib/motion";

/* ---------- motion ---------- */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1 },
};

/* ---------- tile styling ---------- */

type Tone = "glass" | "accent" | "ink";
type Layout = "split" | "row" | "center" | "end";

/** How the opposite-colour fill sweeps in on hover. */
type Fx = "up" | "down" | "right" | "left" | "circle" | "diag";

/** What colour the tile flips to. */
type Flip = "ink" | "accent" | "paper";

const tones: Record<Tone, { surface: string; sub: string }> = {
  glass: {
    surface:
      "border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] text-[var(--foreground)] backdrop-blur-xl",
    sub: "text-[var(--muted)]",
  },
  accent: {
    surface: "bg-[var(--accent)] text-[var(--bg)]",
    sub: "opacity-70",
  },
  ink: {
    surface: "bg-[var(--foreground)] text-[var(--bg)]",
    sub: "opacity-60",
  },
};

const layouts: Record<Layout, string> = {
  split: "flex-col justify-between p-5 md:p-6",
  row: "flex-row items-center justify-between gap-4 px-7 py-4",
  center: "flex-col items-center justify-center gap-2 p-6 text-center",
  end: "flex-col justify-end gap-3 p-6 md:p-8",
};

// Fill layer: hidden shape -> full shape. Written out in full so Tailwind sees every class.
const fxs: Record<Fx, string> = {
  up: "[clip-path:inset(100%_0_0_0)] group-hover/tile:[clip-path:inset(0)] group-focus-visible/tile:[clip-path:inset(0)]",
  down: "[clip-path:inset(0_0_100%_0)] group-hover/tile:[clip-path:inset(0)] group-focus-visible/tile:[clip-path:inset(0)]",
  right:
    "[clip-path:inset(0_100%_0_0)] group-hover/tile:[clip-path:inset(0)] group-focus-visible/tile:[clip-path:inset(0)]",
  left: "[clip-path:inset(0_0_0_100%)] group-hover/tile:[clip-path:inset(0)] group-focus-visible/tile:[clip-path:inset(0)]",
  circle:
    "[clip-path:circle(0%_at_var(--x,50%)_var(--y,50%))] group-hover/tile:[clip-path:circle(150%_at_var(--x,50%)_var(--y,50%))] group-focus-visible/tile:[clip-path:circle(150%_at_var(--x,50%)_var(--y,50%))]",
  diag: "[clip-path:polygon(0_0,0_0,0_0,0_0)] group-hover/tile:[clip-path:polygon(0_0,250%_0,0_250%,0_250%)] group-focus-visible/tile:[clip-path:polygon(0_0,250%_0,0_250%,0_250%)]",
};

const flips: Record<
  Flip,
  { fill: string; text: string; border: string; sub: string }
> = {
  ink: {
    fill: "bg-[var(--foreground)]",
    text: "hover:text-[var(--bg)] focus-visible:text-[var(--bg)]",
    border: "hover:border-[var(--foreground)]",
    sub: "group-hover/tile:text-[color-mix(in_oklab,var(--bg)_65%,transparent)] group-focus-visible/tile:text-[color-mix(in_oklab,var(--bg)_65%,transparent)]",
  },
  accent: {
    fill: "bg-[var(--accent)]",
    text: "hover:text-[var(--bg)] focus-visible:text-[var(--bg)]",
    border: "hover:border-[var(--accent)]",
    sub: "group-hover/tile:text-[color-mix(in_oklab,var(--bg)_65%,transparent)] group-focus-visible/tile:text-[color-mix(in_oklab,var(--bg)_65%,transparent)]",
  },
  paper: {
    fill: "bg-[var(--bg)]",
    text: "hover:text-[var(--accent)] focus-visible:text-[var(--accent)]",
    border: "hover:border-[var(--bg)]",
    sub: "group-hover/tile:text-[var(--accent)] group-focus-visible/tile:text-[var(--accent)]",
  },
};

// Pointer position becomes the origin of the circular reveal.
function setOrigin(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty(
    "--x",
    `${((e.clientX - r.left) / r.width) * 100}%`,
  );
  e.currentTarget.style.setProperty(
    "--y",
    `${((e.clientY - r.top) / r.height) * 100}%`,
  );
}

function Tile({
  children,
  className = "",
  radius = "rounded-[28px]",
  tone = "glass",
  layout = "split",
  fx = "up",
  flip = "ink",
  track = false,
  href,
  external = false,
}: {
  children: (sub: string) => ReactNode;
  className?: string;
  radius?: string;
  tone?: Tone;
  layout?: Layout;
  fx?: Fx;
  flip?: Flip;
  track?: boolean;
  href?: string;
  external?: boolean;
}) {
  const t = tones[tone];
  const f = flips[flip];

  // Muted labels on glass tiles need their own colour flip; the others inherit.
  const sub =
    tone === "glass"
      ? `${t.sub} transition-colors duration-300 group-hover/tile:delay-[260ms] group-focus-visible/tile:delay-[260ms] ${f.sub}`
      : t.sub;

  const shared = {
    variants: item,
    whileHover: { scale: 1.01 },
    transition: { duration: motionTokens.reveal, ease: easing.editorial },
    onPointerEnter: track ? setOrigin : undefined,
    onPointerLeave: track ? setOrigin : undefined,
    className: [
      "group/tile relative isolate flex overflow-hidden hover:z-10",
      "transition-colors duration-300 hover:delay-[260ms] focus-visible:delay-[260ms] motion-reduce:transition-none",
      "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
      layouts[layout],
      radius,
      t.surface,
      f.text,
      f.border,
      className,
    ].join(" "),
  };

  const fill = (
    <span
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 -z-10",
        f.fill,
        fxs[fx],
        "transition-[clip-path] duration-500 ease-[cubic-bezier(.7,0,.2,1)] motion-reduce:transition-none",
        "group-hover/tile:duration-700 group-hover/tile:delay-150",
        "group-focus-visible/tile:duration-700 group-focus-visible/tile:delay-150",
      ].join(" ")}
    />
  );

  return href ? (
    <motion.a
      {...shared}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {fill}
      {children(sub)}
    </motion.a>
  ) : (
    <motion.div {...shared}>
      {fill}
      {children(sub)}
    </motion.div>
  );
}

/* ---------- background ---------- */

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function GradientField({ still }: { still: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute -left-[15vmax] -top-[20vmax] h-[65vmax] w-[65vmax] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 55%, transparent), transparent)",
          opacity: 0.7,
        }}
        animate={still ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[25vmax] -right-[15vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 35%, var(--muted)), transparent)",
          opacity: 0.55,
        }}
        animate={still ? undefined : { x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: grain }}
      />
    </div>
  );
}

/* ---------- page ---------- */

export function AboutPageContent() {
  const still = useReducedMotion() ?? false;

  return (
    /* md:h-svh = the grid fits exactly one screen on desktop (no overflow).
       pt-24 / md:pt-[92px] clears your fixed navbar; adjust if it changes. */
    <main className="relative isolate overflow-hidden bg-[var(--bg)] text-[var(--foreground)] md:h-svh md:min-h-[720px]">
      <GradientField still={still} />

      <div className="mx-auto flex h-full max-w-[1600px] flex-col px-4 pb-4 pt-24 md:px-8 md:pt-[92px] lg:px-12">
        <motion.div
          variants={container}
          initial={still ? false : "hidden"}
          animate="show"
          className="grid min-h-0 flex-1 grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-6 md:gap-3"
        >
          {/* Statement: ink floods in from wherever the cursor enters */}
          <Tile
            fx="circle"
            flip="ink"
            track
            radius="rounded-[40px_140px_40px_40px]"
            className="col-span-2 min-h-[320px] md:[grid-area:1/1/5/8]"
          >
            {(sub) => (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -z-10 rounded-full blur-3xl"
                  style={{
                    right: "-15%",
                    bottom: "-35%",
                    width: "65%",
                    height: "85%",
                    background:
                      "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 35%, transparent), transparent)",
                  }}
                />
                <p className={`text-sm font-medium ${sub}`}>Divyanshu Singh</p>
                <h1 className="font-display text-[clamp(3rem,6.6vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                  <span className="block">Code with</span>
                  <span className="block">intent.</span>
                </h1>
              </>
            )}
          </Tile>

          {/* Intro: diagonal sweep to accent */}
          <Tile
            fx="diag"
            flip="accent"
            className="col-span-2 gap-6 md:[grid-area:1/8/3/13]"
          >
            {(sub) => (
              <>
                <p className={`text-sm ${sub}`}>
                  Creative programmer and AI developer
                </p>
                <p className="font-display text-lg font-semibold leading-snug tracking-tight xl:text-xl 2xl:text-2xl">
                  I build software where engineering, AI and product design
                  meet, turning real problems into simple, useful things.
                </p>
              </>
            )}
          </Tile>

          {/* Focus: arch fills upward */}
          <Tile
            fx="up"
            flip="ink"
            layout="end"
            radius="rounded-t-full rounded-b-[28px]"
            className="col-span-1 min-h-[240px] md:[grid-area:3/8/6/11]"
          >
            {(sub) => (
              <>
                <p className={`text-sm ${sub}`}>Focus</p>
                <p className="font-display text-2xl font-bold leading-[1.05] tracking-tight xl:text-4xl">
                  AI and product engineering
                </p>
              </>
            )}
          </Tile>

          {/* Status: accent circle opens to paper from the centre */}
          <Tile
            tone="accent"
            fx="circle"
            flip="paper"
            layout="center"
            radius="rounded-full"
            className="col-span-1 aspect-square md:aspect-auto md:[grid-area:3/11/5/13]"
          >
            {() => (
              <>
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full bg-current"
                />
                <p className="font-display text-lg font-bold leading-tight tracking-tight xl:text-xl">
                  Available
                  <br />
                  for work
                </p>
              </>
            )}
          </Tile>

          {/* Based in: drops down to accent */}
          <Tile
            fx="down"
            flip="accent"
            className="col-span-1 min-h-[150px] md:[grid-area:5/11/7/13]"
          >
            {(sub) => (
              <>
                <p className={`text-sm ${sub}`}>Based in</p>
                <p className="font-display text-4xl font-bold tracking-tight xl:text-5xl">
                  India
                </p>
              </>
            )}
          </Tile>

          {/* Resume: ink pill, accent slides in from the right */}
          <Tile
            tone="ink"
            fx="left"
            flip="accent"
            layout="row"
            radius="rounded-full"
            href="/resume.pdf"
            external
            className="col-span-1 self-center md:self-auto md:[grid-area:6/8/7/11]"
          >
            {(sub) => (
              <>
                <p className="font-display text-xl font-bold tracking-tight xl:text-2xl">
                  Resume
                </p>
                <p className={`text-sm ${sub}`}>PDF</p>
              </>
            )}
          </Tile>

          {/* Stack: ink wipes in from the left */}
          <Tile
            fx="right"
            flip="ink"
            radius="rounded-[28px_72px_28px_28px]"
            className="col-span-2 md:[grid-area:5/1/7/5]"
          >
            {(sub) => (
              <>
                <p className={`text-sm ${sub}`}>Stack</p>
                <p className="flex flex-wrap gap-x-4 font-display text-2xl font-bold leading-tight tracking-tight md:flex-col md:gap-x-0 xl:text-3xl">
                  <span>Next.js</span>
                  <span>Python</span>
                  <span>FastAPI</span>
                </p>
              </>
            )}
          </Tile>

          {/* Contact pills */}
          <Tile
            fx="right"
            flip="accent"
            layout="row"
            radius="rounded-full"
            href="mailto:divyanshu.vitc@gmail.com"
            className="col-span-2 md:[grid-area:5/5/6/8]"
          >
            {(sub) => (
              <>
                <p className="font-display text-xl font-bold tracking-tight xl:text-2xl">
                  Email
                </p>
                <p className={`min-w-0 truncate text-xs 2xl:text-sm ${sub}`}>
                  divyanshu.vitc@gmail.com
                </p>
              </>
            )}
          </Tile>

          <Tile
            fx="left"
            flip="ink"
            layout="row"
            radius="rounded-full"
            href="https://www.linkedin.com/in/realdivyanshusingh"
            external
            className="col-span-2 md:[grid-area:6/5/7/8]"
          >
            {(sub) => (
              <>
                <p className="font-display text-xl font-bold tracking-tight xl:text-2xl">
                  LinkedIn
                </p>
                <p className={`min-w-0 truncate text-xs 2xl:text-sm ${sub}`}>
                  realdivyanshusingh
                </p>
              </>
            )}
          </Tile>
        </motion.div>
      </div>
    </main>
  );
}