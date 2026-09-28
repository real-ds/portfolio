"use client";

import { motion } from "framer-motion";
import { motionTokens, easing } from "@/lib/motion";

export function MoreWorks() {
  return (
    <section id="more-works" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: motionTokens.standard }}
        className="text-lg md:text-xl font-mono tracking-[0.3em] uppercase text-[var(--dim)] mb-16"
      >
        MORE WORKS
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
        {/* More AI Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: motionTokens.reveal, ease: easing.editorial }}
          className="space-y-6 p-8 bg-[var(--panel)]/30 border border-[var(--dim)] rounded-2xl"
        >
          <h3 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
            More AI Works
          </h3>
          <div className="space-y-4">
            <p className="text-lg text-[var(--muted)] leading-relaxed">
              Additional AI projects and experiments can be added over time.
            </p>
            <div className="pt-4 border-t border-[var(--dim)]">
              <p className="text-2xl md:text-3xl font-display font-medium text-[var(--accent)] leading-tight">
                Currently Under Development
              </p>
              <p className="text-sm font-mono tracking-wider uppercase text-[var(--dim)] mt-2">
                Expanding the AI portfolio
              </p>
            </div>
          </div>
        </motion.div>

        {/* More SDE Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: motionTokens.reveal, ease: easing.editorial }}
          className="space-y-6 p-8 bg-[var(--panel)]/30 border border-[var(--dim)] rounded-2xl"
        >
          <h3 className="text-xl md:text-2xl font-mono tracking-wider uppercase text-[var(--foreground)]">
            More SDE Works
          </h3>
          <div className="space-y-4">
            <p className="text-lg text-[var(--muted)] leading-relaxed">
              Additional software-engineering projects can be added over time.
            </p>
            <div className="pt-4 border-t border-[var(--dim)]">
              <p className="text-2xl md:text-3xl font-display font-medium text-[var(--accent)] leading-tight">
                Currently Under Development
              </p>
              <p className="text-sm font-mono tracking-wider uppercase text-[var(--dim)] mt-2">
                Growing the engineering portfolio
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Note about portfolio being a growing body of work */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.3, duration: motionTokens.reveal, ease: easing.editorial }}
        className="mt-12 text-center text-base md:text-lg text-[var(--dim)] font-mono tracking-wider uppercase max-w-2xl mx-auto"
      >
        This portfolio is a continuously expanding body of AI and software-engineering work.
      </motion.p>
    </section>
  );
}