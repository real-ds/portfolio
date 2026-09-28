"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "./theme-provider";
import { motionTokens, easing } from "@/lib/motion";

export function CTA() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start end", "center center"],
  });

  // Scroll progress → headline opacity + color interpolation.
  // Progress is bound to the headline's journey into the viewport:
  // 0 = just entered at the bottom, 1 = centered on screen.
  const opacity = useTransform(scrollYProgress, [0, 1], [0.18, 1]);
  const color = useTransform(
    scrollYProgress,
    [0, 1],
    ["#c8c8c8", theme === "dark" ? "#ffffff" : "#222222"]
  );

  return (
    <section
      className="relative py-40 md:py-56 lg:py-72 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Dotted glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--dim) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-20"
          style={{
            background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Scroll-driven headline */}
        <div ref={headlineRef}>
          <motion.h2
            style={{ opacity, color }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-tight tracking-tight max-w-4xl mx-auto"
          >
            LET&apos;S DISCUSS!
          </motion.h2>
        </div>

        <motion.a
          href="/about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: motionTokens.reveal, ease: easing.editorial }}
          className="inline-flex items-center gap-3 mt-14 px-10 py-5 border border-[var(--accent)] text-[var(--accent)] font-mono text-base tracking-wider uppercase hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          GET IN TOUCH
          <span className="ml-1">→</span>
        </motion.a>
      </div>
    </section>
  );
}