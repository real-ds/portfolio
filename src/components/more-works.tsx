"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { motionTokens, easing } from "@/lib/motion";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M5 19L19 5" />
      <path d="M8 5h11v11" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 5.8c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58A12 12 0 0012 0z" />
    </svg>
  );
}

export function MoreWorks() {
  return (
    <section
      id="more-works"
      className="px-6 py-28 md:px-12 md:py-36 lg:px-24"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ------------------------------------------------ */}
        {/* SECTION INTRO                                    */}
        {/* ------------------------------------------------ */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: motionTokens.standard,
            ease: easing.editorial,
          }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-end justify-between border-b border-[var(--dim)]/50 pb-5">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--dim)]">
                Additional work
              </p>

              <h2 className="font-display text-4xl tracking-tight text-[var(--foreground)] md:text-6xl">
                More works
              </h2>
            </div>

            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)] md:block">
              2026 / 02
            </span>
          </div>
        </motion.div>

        {/* ================================================= */}
        {/* MAROF                                             */}
        {/* ================================================= */}

        <motion.article
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: motionTokens.reveal,
            ease: easing.editorial,
          }}
          className="group relative mb-8 overflow-hidden border border-[var(--dim)]/50"
        >
          {/* Giant background number */}

          <div
            className="
              pointer-events-none
              absolute
              -right-5
              -top-20
              select-none
              font-display
              text-[220px]
              font-medium
              leading-none
              text-[var(--accent)]
              opacity-[0.055]
              transition-transform
              duration-700
              ease-out
              group-hover:translate-x-4
              group-hover:scale-105
              md:text-[340px]
            "
          >
            01
          </div>

          <div className="relative grid min-h-[460px] md:grid-cols-[42%_58%]">

            {/* LEFT */}

            <div
              className="
                relative
                flex
                flex-col
                justify-between
                border-b
                border-[var(--dim)]/40
                p-7
                md:border-b-0
                md:border-r
                md:p-10
              "
            >
              <div>
                <div className="mb-16 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
                    AI / Systems
                  </span>

                  <span className="font-mono text-[10px] text-[var(--dim)]">
                    2026
                  </span>
                </div>

                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--dim)]">
                  Multi-Agent
                  <br />
                  Resource Management
                </p>
              </div>

              {/* Technical decoration */}

              <div className="mt-16">
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-12 bg-[var(--accent)]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--dim)]">
                    System / 001
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1">
                  <span className="h-1 bg-[var(--accent)]" />
                  <span className="h-1 bg-[var(--dim)]/40" />
                  <span className="h-1 bg-[var(--dim)]/40" />
                  <span className="h-1 bg-[var(--dim)]/40" />
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="relative flex flex-col justify-between p-7 md:p-10">

              <div className="flex justify-end">
                <a
                  href="https://github.com/real-ds/marof.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open MAROF on GitHub"
                  className="
                    inline-flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    border
                    border-[var(--dim)]/60
                    text-[var(--foreground)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent)]
                    hover:bg-[var(--accent)]
                    hover:text-[var(--bg)]
                  "
                >
                  <GithubIcon />
                </a>
              </div>

              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--dim)]">
                    Under development
                  </span>
                </div>

                <h3
                  className="
                    max-w-3xl
                    font-display
                    text-6xl
                    font-medium
                    leading-[0.82]
                    tracking-[-0.045em]
                    text-[var(--foreground)]
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:translate-x-2
                    md:text-8xl
                    lg:text-[9rem]
                  "
                >
                  MARM
                </h3>

                <p className="mt-8 max-w-xl text-sm leading-6 text-[var(--muted)] md:text-[15px] md:leading-7">
                  A multi-agent resource management platform that observes
                  system telemetry, understands user activity, and coordinates
                  intelligent resource optimization.
                </p>

                <div className="mt-10 flex items-center justify-between border-t border-[var(--dim)]/40 pt-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--dim)]">
                    Python · FastAPI · XGBoost · Multi-Agent
                  </span>

                  <ArrowIcon />
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        {/* ================================================= */}
        {/* YOUTUBE                                          */}
        {/* ================================================= */}

        <motion.article
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: motionTokens.reveal,
            delay: 0.08,
            ease: easing.editorial,
          }}
          className="group relative overflow-hidden border border-[var(--dim)]/50"
        >
          {/* Giant number */}

          <div
            className="
              pointer-events-none
              absolute
              -left-6
              -top-20
              select-none
              font-display
              text-[220px]
              font-medium
              leading-none
              text-[var(--foreground)]
              opacity-[0.035]
              transition-transform
              duration-700
              ease-out
              group-hover:-translate-x-4
              group-hover:scale-105
              md:text-[340px]
            "
          >
            02
          </div>

          <div className="relative grid min-h-[430px] md:grid-cols-[58%_42%]">

            {/* LEFT / MAIN */}

            <div className="relative order-2 flex flex-col justify-between p-7 md:order-1 md:p-10">

              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
                  Browser / SDE
                </span>

                <span className="font-mono text-[10px] text-[var(--dim)]">
                  2026
                </span>
              </div>

              <div className="mt-20 md:mt-0">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--dim)]">
                    Under development
                  </span>
                </div>

                <h3
                  className="
                    max-w-2xl
                    font-display
                    text-5xl
                    font-medium
                    leading-[0.88]
                    tracking-[-0.04em]
                    text-[var(--foreground)]
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:translate-x-2
                    md:text-7xl
                    lg:text-[6.8rem]
                  "
                >
                  Hack Your
                  <br />
                  YouTube
                  <br />
                  Playback
                </h3>

                <p className="mt-8 max-w-lg text-sm leading-6 text-[var(--muted)] md:text-[15px]">
                  A browser-focused project exploring custom playback
                  controls and programmatic interaction with the YouTube
                  viewing experience.
                </p>
              </div>
            </div>

            {/* RIGHT / VISUAL */}

            <div
              className="
                relative
                order-1
                min-h-[230px]
                overflow-hidden
                border-b
                border-[var(--dim)]/40
                p-7
                md:order-2
                md:min-h-0
                md:border-b-0
                md:border-l
                md:p-10
              "
            >
              {/* Responsive 16:9 browser / player composition */}
              <div className="flex h-full w-full items-center justify-center">
                <div
                  className="
                    relative
                    flex
                    w-full
                    max-w-[760px]
                    flex-col
                    overflow-hidden
                    border
                    border-[var(--dim)]/50
                    bg-[var(--panel)]/20
                    shadow-[0_0_0_1px_rgba(255,255,255,0.01)]
                    aspect-video
                    transition-transform
                    duration-500
                    group-hover:-translate-x-2
                    group-hover:translate-y-2
                  "
                >
                  <div className="flex h-8 shrink-0 items-center gap-2 border-b border-[var(--dim)]/40 px-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--dim)]/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--dim)]/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--dim)]/30" />

                    <span className="ml-auto font-mono text-[7px] uppercase tracking-wider text-[var(--dim)]">
                      real-ds.github.io
                    </span>
                  </div>

                  <div className="relative min-h-0 flex-1 overflow-hidden bg-[var(--panel)]/20">
                    <Image
                      src="/projects/hack-your-youtube-playback.png"
                      alt="Hack Your YouTube Playback live site preview"
                      fill
                      priority
                      quality={100}
                      sizes="(max-width: 768px) calc(100vw - 3.5rem), (max-width: 1280px) 36vw, 500px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              <div
                className="
                  absolute
                  bottom-7
                  right-7
                  z-10
                  flex
                  items-center
                  gap-3
                  md:bottom-10
                  md:right-10
                "
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--dim)]">
                  Live site
                </span>

                <a
                  href="https://real-ds.github.io/hack-your-youtube-playback/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the Hack Your YouTube Playback live site"
                  className="
                    inline-flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    border
                    border-[var(--dim)]/60
                    bg-[var(--bg)]
                    text-[var(--foreground)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent)]
                    hover:bg-[var(--accent)]
                    hover:text-[var(--bg)]
                  "
                >
                  <ArrowIcon />
                </a>

                <a
                  href="https://github.com/real-ds/hack-your-youtube-playback"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Hack Your YouTube Playback on GitHub"
                  className="
                    inline-flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    border
                    border-[var(--dim)]/60
                    bg-[var(--bg)]
                    text-[var(--foreground)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent)]
                    hover:bg-[var(--accent)]
                    hover:text-[var(--bg)]
                  "
                >
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Bottom marker */}

        <div className="mt-10 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--dim)]">
            End of selected work
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--dim)]">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}