"use client";

import {
  motion,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import { motionTokens, easing } from "@/lib/motion";

/* ---------- content: edit these ---------- */

type Certificate = {
  title: string;
  image: string;
  /** TODO: replace "#" with the credential / verification URL. */
  href: string;
};

const certificates: Certificate[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    image: "/certificates/transparent/OCI25GAIOCP.png",
    href: "#",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    image: "/certificates/transparent/OCI25AICFA.png",
    href: "#",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    image: "/certificates/transparent/OCI25FNDCFA.png",
    href: "#",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Architect Associate",
    image: "/certificates/transparent/OCI25CAA.png",
    href: "#",
  },
  {
    title: "Agentic AI Foundations Associate",
    image: "/certificates/transparent/Agentic AI Foundations Associate.png",
    href: "#",
  },
];

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

/* ---------- card ---------- */

const isExternal = (href: string) => /^https?:\/\//.test(href);

function CertificateCard({ cert, still }: { cert: Certificate; still: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Tilt + inner image parallax.
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const px = useSpring(0, { stiffness: 150, damping: 20 });
  const py = useSpring(0, { stiffness: 150, damping: 20 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;

    if (still) return;

    ry.set((nx - 0.5) * 8);
    rx.set((0.5 - ny) * 8);
    px.set((nx - 0.5) * -12);
    py.set((ny - 0.5) * -12);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    px.set(0);
    py.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={cert.href}
      target={isExternal(cert.href) ? "_blank" : undefined}
      rel={isExternal(cert.href) ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (cert.href === "#") e.preventDefault();
      }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      aria-label={`View ${cert.title}`}
      style={{
        rotateX: still ? 0 : rx,
        rotateY: still ? 0 : ry,
        transformPerspective: 1000,
      }}
      className="group/cert relative isolate flex h-full w-full shrink-0 flex-col overflow-hidden rounded-[26px] border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color-mix(in_oklab,var(--panel)_72%,transparent)] p-7 outline-none transition-colors duration-500 hover:border-[color-mix(in_oklab,var(--foreground)_26%,transparent)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      {/* Badge (transparent PNG) */}
      <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center">
        <motion.div
          aria-hidden
          className="absolute inset-[6%]"
          style={{ x: still ? 0 : px, y: still ? 0 : py }}
        >
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            className="object-contain transition-transform duration-700 ease-out group-hover/cert:scale-[1.04]"
          />
        </motion.div>
      </div>

      {/* Meta */}
      <div className="relative z-10 mt-6 flex flex-1 items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
            Certification
          </p>
          <h3 className="font-display text-xl font-bold leading-[1.22] tracking-tight text-[var(--foreground)] [text-wrap:balance]">
            {cert.title}
          </h3>
        </div>

        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] text-[var(--foreground)] transition-all duration-500 group-hover/cert:-translate-y-0.5 group-hover/cert:translate-x-0.5 group-hover/cert:border-[var(--accent)] group-hover/cert:text-[var(--accent)]">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

/* ---------- arrows ---------- */

function ArrowButton({
  dir,
  onClick,
  label,
}: {
  dir: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] text-[var(--foreground)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] active:translate-y-0"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

/* ---------- section ---------- */

export function Certificates() {
  const still = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<number | null>(null);

  // Three copies of the set, so a one-card step can wrap in either direction
  // without ever running out of cards.
  const loop = [...certificates, ...certificates, ...certificates];

  // Distance advanced by a single "next"/"prev" press (one card + gap).
  const measureCard = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const a = cards[0];
    const b = cards[1];
    return a && b ? b.offsetLeft - a.offsetLeft : 0;
  }, []);

  // Width of one full copy of the set.
  const measureSet = useCallback(
    () => measureCard() * certificates.length,
    [measureCard]
  );

  const settle = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const set = measureSet();
    if (!set) return;

    el.style.scrollBehavior = "auto";
    // Keep the offset within [set, 2*set): the view is always a full copy
    // (three cards) with an identical copy available on either side.
    if (el.scrollLeft >= 2 * set) {
      el.scrollLeft -= set;
    } else if (el.scrollLeft < set) {
      el.scrollLeft += set;
    }
    requestAnimationFrame(() => {
      if (el) el.style.scrollBehavior = "";
    });
  }, [measureSet]);

  // Start with a full copy behind the viewport.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = measureSet();
  }, [measureSet]);

  useEffect(() => () => {
    if (settleRef.current) window.clearTimeout(settleRef.current);
  }, []);

  const onScroll = () => {
    if (still) return;
    if (settleRef.current) window.clearTimeout(settleRef.current);
    // Wait until scrolling has clearly stopped, then normalise.
    settleRef.current = window.setTimeout(settle, 140);
  };

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el || still) return;
    const distance = measureCard();
    if (!distance) return;
    el.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <section
      id="certificates"
      className="relative isolate overflow-hidden bg-[var(--bg)] px-6 py-24 md:px-12 md:py-32 lg:px-24"
    >
      {/* Ambient wash */}
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
        {/* Header */}
        <motion.div
          variants={item}
          className="mb-10 flex flex-col gap-5 border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] pb-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--dim)]">
              Credentials
            </p>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-none tracking-[-0.05em] text-[var(--foreground)]">
              CERTIFICATES
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <ArrowButton
                dir="left"
                label="Previous certificates"
                onClick={() => go(-1)}
              />
              <ArrowButton
                dir="right"
                label="Next certificates"
                onClick={() => go(1)}
              />
            </div>
          </div>
        </motion.div>

        {/* Horizontal track — exactly three cards are visible at rest */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="hide-scrollbar -mx-2 flex gap-6 overflow-x-auto px-2 pb-4"
        >
          {loop.map((cert, i) => (
            <div
              key={i}
              data-card
              className="w-[85%] shrink-0 sm:w-[46%] md:w-[calc((100%-3rem)/3)]"
            >
              <CertificateCard cert={cert} still={still} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}