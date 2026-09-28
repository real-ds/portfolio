"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { motionTokens, easing } from "@/lib/motion";

const phases = [
  {
    number: "01",
    title: "THE PROBLEM",
    description: "Understand the problem and the user's pain.",
    detail:
      "Identify the root cause, constraints, and desired outcome before defining the solution.",
  },
  {
    number: "02",
    title: "THE DESIGN",
    description: "Explore the solution with creative freedom.",
    detail:
      "Turn the problem into a clear system, interaction model, and visual direction.",
  },
  {
    number: "03",
    title: "THE BUILD",
    description: "Engineer the solution into a working system.",
    detail:
      "Transform the planned experience into a robust, scalable, and functional product.",
  },
  {
    number: "04",
    title: "ITERATE",
    description: "Test, learn, refine, and improve.",
    detail:
      "Use feedback and real-world behavior to continuously refine the solution.",
  },
  {
    number: "05",
    title: "IMPACT",
    description: "Deliver meaningful value to the end user.",
    detail:
      "Measure the outcome and ensure the final product creates tangible value.",
  },
];

type Phase = (typeof phases)[number];

function PhaseItem({ phase }: { phase: Phase }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  /*
   * THIS SCROLL PROGRESS BELONGS ONLY TO THIS PHASE.
   *
   * Phase 01 has its own 0 → 1
   * Phase 02 has its own 0 → 1
   * Phase 03 has its own 0 → 1
   * etc.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * ─────────────────────────────────────────
   * ONE PHASE = ONE COMPLETE ANIMATION
   * ─────────────────────────────────────────
   *
   * 0.00       Start
   * 0.15       Entering
   * 0.30       Sharp
   * 0.40       CENTER
   * 0.60       CENTER HOLD
   * 0.75       Exit
   * 1.00       Completely gone
   */

  const y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.30, 0.40, 0.60, 0.75, 1],
    [
      "55vh",
      "30vh",
      "8vh",
      "0vh",
      "0vh",
      "-15vh",
      "-55vh",
    ]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.30, 0.40, 0.60, 0.75, 1],
    [
      0.6,
      0.72,
      0.92,
      1,
      1,
      0.9,
      0.6,
    ]
  );

  /*
   * VISIBILITY BELONGS ONLY TO THIS PHASE.
   */
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.40, 0.60, 0.78, 0.92, 1],
    [
      0,
      0.25,
      0.8,
      1,
      1,
      0.75,
      0.2,
      0,
    ]
  );

  /*
   * BLUR BELONGS ONLY TO THIS PHASE.
   *
   * IMPORTANT:
   *
   * The text is COMPLETELY SHARP
   * while it is centered.
   *
   * Blur only happens:
   *
   *       ENTER          EXIT
   *         ↓             ↓
   *     blur → 0       0 → blur
   */
  const blur = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.32, 0.40, 0.60, 0.72, 0.88, 1],
    [
      "blur(20px)",
      "blur(12px)",
      "blur(5px)",
      "blur(1px)",
      "blur(0px)",
      "blur(0px)",
      "blur(4px)",
      "blur(12px)",
      "blur(24px)",
    ]
  );

  return (
    /*
     * THIS IS ONE ENTIRE PHASE.
     *
     * It owns its own 4-screen scroll region.
     */
    <section
      ref={sectionRef}
      className="relative h-[500vh]"
    >
      {/*
       * Sticky only belongs to this phase.
       *
       * When this parent finishes,
       * this sticky element leaves completely.
       */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{
            y,
            scale,
            opacity,
            filter: blur,
          }}
          className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
        >
          <div className="w-full max-w-5xl">

            <div className="flex items-baseline gap-4 md:gap-6 mb-6">
              <PhaseTitleHover
                number={phase.number}
                title={phase.title}
              />
            </div>

            <p
              className="
                max-w-4xl
                text-2xl
                md:text-4xl
                lg:text-5xl
                text-white
                leading-[1.05]
                tracking-[-0.025em]
              "
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {phase.description}
            </p>

            <p
              className="
                mt-8
                max-w-2xl
                text-base
                md:text-lg
                lg:text-xl
                text-white/45
                leading-relaxed
              "
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {phase.detail}
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhaseTitleHover({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  const reveal = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  const handleHoverStart = () => {
    animationRef.current?.stop();

    animationRef.current = animate(reveal, 1, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  const handleHoverEnd = () => {
    animationRef.current?.stop();

    animationRef.current = animate(reveal, 0, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  /*
   * Red surface:
   *
   * 0 → invisible
   * 1 → full width
   */
  const bgScaleX = useTransform(
    reveal,
    [0, 1],
    [0, 1]
  );

  /*
   * Black text:
   *
   * 0 → completely clipped
   * 1 → completely visible
   *
   * The clipping follows the exact same reveal
   * as the red background.
   */
  const blackClip = useTransform(
    reveal,
    (value) =>
      `inset(0 ${(1 - value) * 100}% 0 0)`
  );

  const numberClasses =
    "text-2xl md:text-3xl lg:text-4xl font-medium select-none";

  const titleClasses =
    "text-3xl md:text-4xl lg:text-6xl font-bold uppercase tracking-[-0.04em] select-none";

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="
        relative
        inline-flex
        w-fit
        items-baseline
        justify-center
        gap-3
        md:gap-4
        cursor-default
      "
    >
      {/* -------------------------------- */}
      {/* BASE / NORMAL TYPOGRAPHY         */}
      {/* -------------------------------- */}

      <span
        className={cn(
          numberClasses,
          "relative z-10 text-white/40"
        )}
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {number}
      </span>

      <h3
        className={cn(
          titleClasses,
          "relative z-10 text-white"
        )}
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {title}
      </h3>


      {/* -------------------------------- */}
      {/* RED EDITORIAL SURFACE            */}
      {/* -------------------------------- */}

      <motion.div
        aria-hidden="true"
        style={{
          scaleX: bgScaleX,
          transformOrigin: "left center",
        }}
        className="
          absolute
          -inset-x-[0.08em]
          -inset-y-[0.12em]
          z-20
          bg-[#FF003C]
          pointer-events-none
        "
      />


      {/* -------------------------------- */}
      {/* BLACK INVERTED TYPOGRAPHY        */}
      {/* -------------------------------- */}

      <motion.div
        aria-hidden="true"
        style={{
          clipPath: blackClip,
        }}
        className="
          absolute
          inset-0
          z-30
          overflow-hidden
          pointer-events-none
        "
      >
        <div
          className="
            flex
            w-fit
            items-baseline
            justify-center
            gap-3
            md:gap-4
          "
        >
          <span
            className={cn(
              numberClasses,
              "text-black"
            )}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {number}
          </span>

          <h3
            className={cn(
              titleClasses,
              "text-black"
            )}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}


export function DesignPlanningTheory() {
  return (
    <section className="relative bg-[#0B0B0B]">

      {/* Heading exists OUTSIDE the phase system */}
      <div className="px-6 md:px-12 lg:px-24 py-32">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: motionTokens.reveal,
            ease: easing.editorial,
          }}
          className="max-w-6xl mx-auto"
        >
          <p
            className="
              text-4xl
              md:text-6xl
              lg:text-7xl
              text-white
              font-bold
              leading-[0.95]
              tracking-[-0.04em]
            "
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            How I build
            <br />
            scalable AI solutions.
          </p>
        </motion.div>
      </div>

      {/*
       * FIVE COMPLETELY INDEPENDENT PHASES
       *
       * Each PhaseItem:
       *
       *   own ref
       *   own scrollYProgress
       *   own y
       *   own scale
       *   own opacity
       *   own blur
       *
       * Nothing here combines their progress.
       */}
      <div>
        {phases.map((phase) => (
          <PhaseItem
            key={phase.number}
            phase={phase}
          />
        ))}
      </div>

    </section>
  );
}