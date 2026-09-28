"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { motionTokens, easing } from "@/lib/motion";

const ROTATING_WORDS = ["Creativity", "AI Solutions"];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentWord) {
      // Pause at full word, then start deleting
      timeout = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && displayText === "") {
      // Move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText((prev) =>
            isDeleting
              ? currentWord.substring(0, prev.length - 1)
              : currentWord.substring(0, prev.length + 1)
          );
        },
        isDeleting ? 70 : 130
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-24"
    >
      {/* Name - The strongest visual object */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: motionTokens.cinematic,
          ease: easing.editorial,
        }}
        className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[6rem] font-black tracking-tight leading-none"
      >
        DIVYANSHU SINGH
      </motion.h1>

      {/* Tagline */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.0,
          duration: motionTokens.reveal,
          ease: easing.editorial,
        }}
        className="max-w-2xl mt-3"
      >
        <p className="text-lg md:text-xl lg:text-2xl text-[var(--muted)] leading-none font-medium">
          Incorporating Code with{" "}
          <span className="text-[var(--accent)] font-medium">
            {displayText}
            <span className="inline-block w-[2px] h-[1em] align-middle bg-[var(--accent)] ml-1 animate-pulse" />
          </span>
        </p>
      </motion.blockquote>

      {/* Scroll Indicator */}
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

      {/* Reserved space for future interactive background component */}
      <div className="absolute inset-0 z-0" aria-hidden="true" />
    </section>
  );
}