"use client";

import { motion } from "framer-motion";
import { TextGenerate } from "./text-generate";
import { motionTokens, easing } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="py-32 md:py-40 px-6 md:px-12 lg:px-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: motionTokens.standard }}
        className="text-lg md:text-xl font-mono tracking-[0.3em] uppercase text-[var(--dim)] mb-14"
      >
        ABOUT ME
      </motion.p>

      <div className="max-w-4xl space-y-16">
        {/* Identity */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: motionTokens.reveal, ease: easing.editorial }}
            className="font-display text-6xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none"
          >
            DIVYANSHU SINGH
          </motion.h2>
        </div>

        {/* Two points about me */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: motionTokens.reveal, ease: easing.editorial }}
            className="space-y-3"
          >
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-[var(--accent)]">
              01 — Creative Engineer
            </p>
            <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed">
              Creative Programmer, AI Developer, and Designer who designs robust software solutions around real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: motionTokens.reveal, ease: easing.editorial }}
            className="space-y-3"
          >
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-[var(--accent)]">
              02 — AI Enthusiast
            </p>
            <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed">
              An AI enthusiast who creatively redefines how AI can be used to build software solutions that delivers value to the end user.
            </p>
          </motion.div>
        </div>

        {/* Education - Secondary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: motionTokens.reveal, ease: easing.editorial }}
          className="pt-8 border-t border-[var(--dim)]"
        >
          <p className="text-sm font-mono tracking-[0.2em] uppercase text-[var(--dim)] mb-4">
            Education
          </p>
          <blockquote className="text-base md:text-lg text-[var(--muted)] leading-relaxed font-light italic border-l-2 border-[var(--dim)] pl-6">
            <p className="font-medium text-[var(--foreground)] not-italic">Integrated M.Tech in Software Engineering</p>
            VIT Chennai · 2027
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}