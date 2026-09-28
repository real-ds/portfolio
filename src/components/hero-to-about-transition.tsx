"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motionTokens, easing } from "@/lib/motion";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export function HeroToAboutTransition() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const quoteOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 1, 1, 1, 0]);
  const quoteY = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [40, 0, 0, 0, -40]);
  const quoteScale = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [1.02, 1, 1, 1, 0.98]);

  const dividerWidth = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const dividerOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  const words = ["Every", "problem", "is", "an", "opportunity", "to", "build", "something", "better."];

  return (
    <section
      ref={ref}
      className="relative min-h-[10vh] flex items-center justify-center px-6 md:px-12 lg:px-24 py-32 overflow-hidden"
      aria-label="Transition"
    >
      <DottedGlowBackground
        className="pointer-events-none"
        opacity={0.6}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />

      <motion.div
        style={{
          opacity: quoteOpacity,
          y: quoteY,
          scale: quoteScale,
        }}
        className="max-w-5xl text-center relative z-10"
      >
        <motion.blockquote className="relative mb-12 flex flex-col items-center justify-center gap-8">
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easing.editorial }}
            className="text-8xl md:text-[12rem] text-[var(--accent)] italic leading-none"
            style={{ fontFamily: "Garamond, 'EB Garamond', Georgia, serif" }}
          >
            &ldquo;
          </motion.span>
          <p className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font leading-tight tracking-tight text-[var(--foreground)] max-w-4xl px-4" style={{ fontFamily: "Garamond, 'EB Garamond', Georgia, serif" }}>
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: easing.editorial }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </motion.blockquote>

        <motion.div
          style={{ opacity: dividerOpacity, width: dividerWidth }}
          className="mx-auto h-[1px] bg-[var(--accent)] my-12"
        />

        <motion.p
          style={{ opacity: quoteOpacity }}
          className="text-sm font-mono tracking-widest uppercase text-[var(--dim)]"
        >
          A temporary reminder
        </motion.p>
      </motion.div>
    </section>
  );
}