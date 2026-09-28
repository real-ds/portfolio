export const prefersReducedMotion = typeof window !== "undefined"
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

export const motionTokens = {
  fast: 0.36,
  standard: 0.7,
  reveal: 1.1,
  cinematic: 1.6,
  stagger: 0.07,
} as const;

export const motionTokensMs = {
  fast: 360,
  standard: 700,
  reveal: 1100,
  cinematic: 1600,
  stagger: 70,
} as const;

export const easing = {
  editorial: [0.22, 1, 0.36, 1] as const,
} as const;

export const springConfig = {
  gentle: {
    type: "spring" as const,
    stiffness: 120,
    damping: 20,
  },
};

export const reducedMotion = {
  duration: 0,
  ease: "linear",
};
