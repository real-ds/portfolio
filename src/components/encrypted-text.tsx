"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { motionTokens, easing, reducedMotion } from "@/lib/motion";

interface EncryptedTextProps {
  text: string;
  duration?: number;
  className?: string;
  onComplete?: () => void;
}

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function EncryptedText({
  text,
  duration = 1200,
  className,
  onComplete,
}: EncryptedTextProps) {
  const [displayChars, setDisplayChars] = useState<string[]>([]);
  const [resolvedCount, setResolvedCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const characters = text.split("");

    if (reducedMotion) {
      setDisplayChars(characters);
      setResolvedCount(characters.length);
      onComplete?.();
      return;
    }

    const interval = duration / characters.length;
    let currentIndex = 0;

    // Initialize with all scrambled
    setDisplayChars(
      characters.map(() => CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)])
    );

    const resolveInterval = setInterval(() => {
      if (currentIndex >= characters.length) {
        clearInterval(resolveInterval);
        setDisplayChars(characters);
        setResolvedCount(characters.length);
        onComplete?.();
        return;
      }

      // Resolve current character and keep scrambling unresolved ones
      setDisplayChars((prev) =>
        characters.map((char, i) => {
          if (i <= currentIndex) return char; // Resolved - lock it
          if (prev[i] === char) {
            // Already showing correct char, scramble it
            return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
          }
          // Scramble unrevealed characters
          return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
        })
      );

      setResolvedCount(currentIndex + 1);
      currentIndex++;
    }, interval);

    return () => clearInterval(resolveInterval);
  }, [text, duration, isInView, onComplete, reducedMotion]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: motionTokens.fast, ease: easing.editorial }}
      aria-label={text}
    >
      {displayChars.map((char, i) => (
        <span
          key={i}
          className={`transition-colors duration-100 ${
            i < resolvedCount ? "text-[var(--foreground)]" : "text-[var(--muted)]"
          }`}
        >
          {char}
        </span>
      ))}
    </motion.span>
  );
}
