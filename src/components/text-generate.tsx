"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { motionTokens, easing, reducedMotion } from "@/lib/motion";

interface TextGenerateProps {
  text: string;
  className?: string;
  staggerDelay?: number;
}

export function TextGenerate({
  text,
  className,
  staggerDelay = 0.035,
}: TextGenerateProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(" ");

  return (
    <motion.p ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{
            opacity: reducedMotion ? 1 : 0.15,
            filter: reducedMotion ? "blur(0px)" : "blur(8px)",
            y: reducedMotion ? 0 : 8,
          }}
          animate={
            isInView
              ? reducedMotion
                ? { opacity: 1, filter: "blur(0px)", y: 0 }
                : {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                  }
              : {}
          }
          transition={{
            duration: reducedMotion ? 0 : 0.55,
            delay: i * staggerDelay,
            ease: easing.editorial,
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
