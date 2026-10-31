"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { buildLanyardAssets, type LanyardAssets } from "./lanyard-faces";

// three.js + WebGL: client only, and kept out of the initial bundle.
const Lanyard = dynamic(() => import("@/components/ui/lanyard"), {
  ssr: false,
});

/* ---------- content: edit these ---------- */

const LINKEDIN_URL = "https://www.linkedin.com/in/realdivyanshusingh";
const GITHUB_URL = "https://github.com/real-ds"; 
const CREDLY_URL = "https://www.credly.com/users/divyanshusingh/badges/credly";
const RESUME_URL = "https://drive.google.com/drive/folders/13uGTRHyXc7JhJtswGmESU0KyVz-FGlGJ?usp=sharing";

const INTER = 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif';

/* ---------- Inter ---------- */

/** Loads Inter from Google Fonts once, so both the page and the card canvas can use it. */
function loadInter(): Promise<void> {
  return new Promise((resolve) => {
    const finish = async () => {
      try {
        await Promise.all([
          document.fonts.load("800 64px Inter"),
          document.fonts.load("500 32px Inter"),
        ]);
      } catch {
        /* fall back to system-ui */
      }
      resolve();
    };

    const existing = document.getElementById("inter-font") as HTMLLinkElement | null;
    if (existing) {
      void finish();
      return;
    }
    const link = document.createElement("link");
    link.id = "inter-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap";
    link.onload = () => void finish();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });
}

/* ---------- lanyard assets ---------- */

/** Builds the card art from the live --accent value and rebuilds when the theme changes it. */
function useLanyardAssets() {
  const [assets, setAssets] = useState<LanyardAssets | null>(null);

  useEffect(() => {
    let cancelled = false;
    let lastAccent = "";

    const build = async () => {
      const root = document.documentElement;
      const accent =
        getComputedStyle(root).getPropertyValue("--accent").trim() || "#ff0a3c";
      const light = root.getAttribute("data-theme") === "light";
      const key = `${accent}|${light}`;
      if (key === lastAccent) return;
      lastAccent = key;

      await loadInter();
      const next = await buildLanyardAssets(accent, INTER, undefined, light);
      if (!cancelled) setAssets(next);
    };

    void build();
    const observer = new MutationObserver(() => void build());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return assets;
}

/* ---------- background ---------- */

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function GradientField({
  still,
  mx,
  my,
}: {
  still: boolean;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const ax = useTransform(mx, (v) => v * -90);
  const ay = useTransform(my, (v) => v * -70);
  const bx = useTransform(mx, (v) => v * 80);
  const by = useTransform(my, (v) => v * 60);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        style={still ? undefined : { x: ax, y: ay }}
        className="absolute -left-[15vmax] -top-[20vmax] h-[65vmax] w-[65vmax]"
      >
        <motion.div
          className="h-full w-full rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 55%, transparent), transparent)",
            opacity: 0.7,
          }}
          animate={still ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        style={still ? undefined : { x: bx, y: by }}
        className="absolute -bottom-[25vmax] -right-[15vmax] h-[60vmax] w-[60vmax]"
      >
        <motion.div
          className="h-full w-full rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 35%, var(--muted)), transparent)",
            opacity: 0.55,
          }}
          animate={still ? undefined : { x: [0, -50, 0], y: [0, -50, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: grain }}
      />
    </div>
  );
}

/* ---------- connect buttons ---------- */

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  width: "18",
  height: "18",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const icons = {
  linkedin: (
    <svg {...iconProps}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
    </svg>
  ),
  github: (
    <svg {...iconProps}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  ),
  credly: (
    <svg {...iconProps}>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 9 2 2 4-4M8.5 14 7 22l5-3 5 3-1.5-8" />
    </svg>
  ),
  resume: (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h6" />
    </svg>
  ),
};

function ConnectButton({
  href,
  icon,
  children,
  primary = false,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group/btn relative isolate inline-flex items-center gap-2.5 overflow-hidden rounded-full px-5 py-3 text-[15px] font-semibold",
        "transition-[color,transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 active:translate-y-0",
        "hover:shadow-[0_10px_24px_-16px_var(--accent)] focus-visible:shadow-[0_10px_24px_-16px_var(--accent)]",
        "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        primary
          ? "border border-transparent bg-[var(--accent)] text-[var(--bg)] hover:text-[var(--bg)]"
          : "border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] text-[var(--foreground)] backdrop-blur-xl hover:border-[var(--foreground)] hover:text-[var(--bg)] focus-visible:text-[var(--bg)]",
      ].join(" ")}
      style={{ fontFamily: INTER }}
    >
      {/* fill that sweeps up on hover */}
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 -z-10 translate-y-full rounded-full",
          "transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] motion-reduce:transition-none",
          "group-hover/btn:translate-y-0 group-focus-visible/btn:translate-y-0",
          primary ? "bg-[var(--foreground)]" : "bg-[var(--foreground)]",
        ].join(" ")}
      />
      <span className="inline-flex transition-transform duration-300 group-hover/btn:-rotate-6 group-hover/btn:scale-110">
        {icon}
      </span>
      <span>{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="-ml-0.5 opacity-60 transition-[transform,opacity] duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1 group-hover/btn:opacity-100"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  );
}

/* ---------- page ---------- */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function AboutPageContent() {
  const still = useReducedMotion() ?? false;
  const assets = useLanyardAssets();

  // cursor position, -0.5..0.5, smoothed
  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });

  return (
    <main
      onPointerMove={
        still
          ? undefined
          : (e) => {
              mx.set(e.clientX / window.innerWidth - 0.5);
              my.set(e.clientY / window.innerHeight - 0.5);
            }
      }
      className="relative isolate min-h-svh overflow-hidden bg-[var(--bg)] text-[var(--foreground)] md:h-svh"
    >
      <GradientField still={still} mx={mx} my={my} />

      {/* Left: text. Padding matches the navbar so the logo and copy share one
          left margin. The block is vertically centred below the navbar. */}
      <motion.section
        variants={stagger}
        initial={still ? false : "hidden"}
        animate="show"
        className="relative z-10 flex flex-col justify-center px-6 pb-6 pt-28 md:absolute md:inset-y-0 md:left-0 md:w-1/2 md:px-12 md:pb-0 md:pt-[92px]"
      >
        <div className="flex w-full flex-col">
          <motion.h1
            variants={rise}
            className="max-w-[34rem] text-[clamp(2.75rem,4.8vw,5rem)] font-bold leading-[1.02] tracking-[-0.04em]"
            style={{ fontFamily: INTER }}
          >
            About Me
          </motion.h1>

          <motion.div
            variants={rise}
            lang="en"
            className="mt-7 mb-10 flex max-w-[34rem] flex-col gap-4 text-[17px] font-normal leading-[1.7] tracking-[-0.005em] text-[color-mix(in_oklab,var(--foreground)_72%,transparent)] text-pretty hyphens-auto text-justify xl:text-[18px]"
            style={{ fontFamily: INTER, textJustify: "inter-word" }}
          >
            <p>
              I&rsquo;m a GenAI, AI/ML and full-stack developer. I&rsquo;ve built
              hands-on projects across RAG, machine learning and applied AI,
              taking ideas from model to a working interface.
            </p>
            <p>
              I love using AI to solve real-world problems, and I build with that
              goal in mind.
            </p>
          </motion.div>

          <motion.div variants={rise} className="flex flex-col">
            <p
              className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]"
              style={{ fontFamily: INTER }}
            >
              Connect with me
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <ConnectButton href={LINKEDIN_URL} icon={icons.linkedin}>
                LinkedIn
              </ConnectButton>
              <ConnectButton href={GITHUB_URL} icon={icons.github}>
                GitHub
              </ConnectButton>
              <ConnectButton href={CREDLY_URL} icon={icons.credly}>
                Credly
              </ConnectButton>
              <ConnectButton href={RESUME_URL} icon={icons.resume} primary>
                Resume
              </ConnectButton>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Right: the lanyard hangs from the top edge, centred in the right half
          (between the page centre and the right edge). */}
      <div className="relative h-[560px] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2">
        {assets && (
          <Lanyard
            frontImage={assets.front}
            backImage={assets.back}
            strapImage={assets.strap}
            cardColor="#0c0c0f"
            finish="holographic"
            cornerRadius={0.35}
            size={0.66}
            anchor="center"
            strapLength={0.5}
            strapWidth={0.9}
            metal="silver"
            breeze={0.4}
          />
        )}
      </div>
    </main>
  );
}