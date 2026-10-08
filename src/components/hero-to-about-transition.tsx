"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easing } from "@/lib/motion";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export function HeroToAboutTransition() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const quoteOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [0, 1, 1, 1, 0]
  );

  const quoteY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [20, 0, 0, 0, -20]
  );

  const openingQuoteOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 0.78, 0.78, 0.78, 0]
  );

  return (
    <section
      ref={ref}
      aria-label="Transition"
      className="
        relative
        flex
        h-[320px]
        items-center
        justify-center
        overflow-hidden
        px-6
        sm:h-[330px]
        md:h-[350px]
        md:px-12
        lg:h-[370px]
        lg:px-24
      "
    >
      {/* Full-width dotted background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <DottedGlowBackground
          className="absolute inset-0 h-full w-full"
          opacity={0.28}
          gap={10}
          radius={1.5}
          colorLightVar="--color-neutral-500"
          glowColorLightVar="--color-neutral-600"
          colorDarkVar="--color-neutral-500"
          glowColorDarkVar="--color-sky-800"
          backgroundOpacity={0}
          speedMin={0.25}
          speedMax={1}
          speedScale={0.8}
        />
      </div>

      <motion.div
        style={{
          opacity: quoteOpacity,
          y: quoteY,
        }}
        className="
          relative
          z-10
          flex
          w-full
          max-w-[1380px]
          items-center
          justify-center
        "
      >
        {/* Oversized opening quotation mark */}
        <motion.span
          initial={{
            opacity: 0,
            y: 12,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 0.78,
            y: 0,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.75,
            ease: easing.editorial,
          }}
          style={{
            opacity: openingQuoteOpacity,
            fontFamily:
              "Baskerville, 'Libre Baskerville', Georgia, serif",
            fontStyle: "italic",
          }}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[10%]
            top-[-8%]
            select-none
            text-[7rem]
            leading-none
            text-[var(--accent)]
            sm:left-[12%]
            sm:top-[-10%]
            sm:text-[8rem]
            md:left-[14%]
            md:top-[-12%]
            md:text-[9.5rem]
            lg:left-[16%]
            lg:text-[10.5rem]
          "
        >
          “
        </motion.span>

        {/* Quote */}
        <motion.blockquote
          initial={{
            opacity: 0,
            y: 16,
            filter: "blur(6px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.85,
            ease: easing.editorial,
          }}
          className="
            relative
            z-10
            w-full
            max-w-[1200px]
            px-10
            py-8
            text-center
            sm:px-16
            md:px-24
            lg:px-32
          "
        >
          <p
            className="
              mx-auto
              max-w-[1120px]
              text-[2.15rem]
              leading-[0.88]
              tracking-[-0.055em]
              text-[var(--foreground)]
              sm:text-[2.8rem]
              md:text-[3.65rem]
              lg:text-[4.3rem]
              xl:text-[4.65rem]
            "
            style={{
              fontFamily:
                "Baskerville, 'Libre Baskerville', 'Times New Roman', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            <span className="block">
              Every problem is an opportunity
            </span>

            <span className="mt-1 block">
              to build something better.
            </span>
          </p>
        </motion.blockquote>
      </motion.div>
    </section>
  );
}