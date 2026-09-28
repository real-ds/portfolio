"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { reducedMotion } from "@/lib/motion";

interface ScrollSaturationProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollSaturation({
  children,
  className,
}: ScrollSaturationProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // In reduced motion, show full text immediately
  if (reducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ opacity: 1, filter: "blur(0px)", color: "var(--foreground)" }}
      >
        {children}
      </motion.div>
    );
  }

  // Progressive interpolation from dim to active
  // Mapped across scroll zones for smooth progression:
  // - 0-30%: dim to muted
  // - 30-70%: muted to foreground (active reading zone)
  // - 70-100%: foreground maintained
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.2, 0.5, 0.8, 1]
  );
  const filter = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["blur(3px)", "blur(1px)", "blur(0px)"]
  );
  const color = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["var(--dim)", "var(--muted)", "var(--foreground)"]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, filter, color }}
    >
      {children}
    </motion.div>
  );
}
