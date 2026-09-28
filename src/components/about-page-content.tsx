"use client";

import { motion } from "framer-motion";
import { motionTokens, easing } from "@/lib/motion";

export function AboutPageContent() {
  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-24">
      {/* Hero area for about page */}
      <section className="hero-section min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionTokens.cinematic,
            ease: easing.editorial,
          }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <p className="text-lg md:text-xl font-mono tracking-[0.3em] uppercase text-[var(--dim)]">
            ABOUT ME
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[6rem] font-black tracking-tight leading-none">
            DIVYANSHU SINGH
          </h1>

          <blockquote className="text-lg md:text-xl lg:text-2xl text-[var(--muted)] leading-relaxed font-light italic max-w-2xl mx-auto">
            Incorporating Code with Creativity
          </blockquote>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            delay: 1.4,
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-xs font-mono tracking-widest uppercase text-[var(--dim)]">
            Scroll
          </p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--muted)]"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Two points about me */}
      <section className="py-32 md:py-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: motionTokens.reveal, ease: easing.editorial }}
            className="space-y-6"
          >
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-[var(--accent)]">
              01
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl text-[var(--muted)] leading-relaxed font-light">
              Creative Programmer, AI Developer, and Designer focused on designing robust solutions around real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: motionTokens.reveal, ease: easing.editorial }}
            className="space-y-6 pt-8 border-t border-[var(--dim)]"
          >
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-[var(--accent)]">
              02
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl text-[var(--muted)] leading-relaxed font-light">
              AI enthusiast exploring creative ways to use AI in software development while keeping the end-user experience simple and valuable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-[var(--panel)]/30">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: motionTokens.standard }}
            className="text-lg md:text-xl font-mono tracking-[0.3em] uppercase text-[var(--dim)] mb-12"
          >
            GET IN TOUCH
          </motion.p>

          <div className="space-y-6 max-w-xl">
            {/* Email */}
            <motion.a
              href="mailto:"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: motionTokens.reveal, ease: easing.editorial }}
              className="flex items-center gap-4 p-5 bg-[var(--bg)] border border-[var(--dim)] hover:border-[var(--accent)] transition-colors duration-300 group"
            >
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--dim)] w-24">
                EMAIL
              </span>
              <span className="text-lg text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                Add email address
              </span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.05, duration: motionTokens.reveal, ease: easing.editorial }}
              className="flex items-center gap-4 p-5 bg-[var(--bg)] border border-[var(--dim)] hover:border-[var(--accent)] transition-colors duration-300 group"
            >
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--dim)] w-24">
                LINKEDIN
              </span>
              <span className="text-lg text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                Add LinkedIn profile
              </span>
            </motion.a>

            {/* Medium */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1, duration: motionTokens.reveal, ease: easing.editorial }}
              className="flex items-center gap-4 p-5 bg-[var(--bg)] border border-[var(--dim)] hover:border-[var(--accent)] transition-colors duration-300 group"
            >
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--dim)] w-24">
                MEDIUM
              </span>
              <span className="text-lg text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                Add Medium profile
              </span>
            </motion.a>

            {/* Resume */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.15, duration: motionTokens.reveal, ease: easing.editorial }}
              className="flex items-center gap-4 p-5 bg-[var(--bg)] border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 group"
            >
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] w-24">
                RESUME
              </span>
              <span className="text-lg font-medium group-hover:text-[var(--bg)] transition-colors">
                Open Resume PDF
              </span>
              <svg
                className="ml-auto w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="15 3 21 3 21 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="10" y1="14" x2="21" y2="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: motionTokens.standard }}
            className="mt-12 text-sm font-mono tracking-widest uppercase text-[var(--dim)]"
          >
            No contact form — direct links only.
          </motion.p>
        </div>
      </section>
    </div>
  );
}