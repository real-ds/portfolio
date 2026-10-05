"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { motionTokens, easing } from "@/lib/motion";
import { useTheme } from "@/components/theme-provider";

const SANS =
  'Inter, "Helvetica Neue", Helvetica, Arial, "Segoe UI", system-ui, sans-serif';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: motionTokens.reveal,
      ease: easing.editorial,
    },
  }),
};

export function Hero() {
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <section
      id="home"
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
      style={{
        fontFamily: SANS,
        background: light ? "#fbfaf7" : "#0a0a0a",
      }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: light
              ? "radial-gradient(90% 85% at 48% 32%, #ffffff 0%, #fbfaf7 55%, #f3eee6 100%)"
              : "radial-gradient(90% 85% at 48% 32%, #1c1c1c 0%, #111 55%, #080808 100%)",
          }}
        />

        {/* Soft diagonal corner shape */}
        <div
          className="absolute left-0 top-0 h-[34%] w-[31%]"
          style={{
            background: light
              ? "linear-gradient(135deg, rgba(239,231,220,.72), rgba(251,250,247,0))"
              : "linear-gradient(135deg, rgba(255,255,255,.05), transparent)",
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />

        {/* Large circular form behind portrait. Themed: warm paper tone on
            light, ash grey on dark. Dark ramp is built from the heading's
            lightest text grey (#f5f5f2) at low alpha so it lifts off the
            black field as a soft tonal glow instead of a colour accent.
            Same geometry and alpha ladder in both themes. */}
        <div
          className="absolute right-[-9%] bottom-[-30%] h-[78vw] w-[78vw] max-h-[920px] max-w-[920px] rounded-full"
          style={{
            background: light
              ? "radial-gradient(circle at 42% 42%, rgba(239,225,209,.76) 0%, rgba(239,225,209,.52) 48%, rgba(239,225,209,.20) 72%, transparent 100%)"
              : "radial-gradient(circle at 42% 42%, rgba(245,245,242,.28) 0%, rgba(245,245,242,.20) 48%, rgba(245,245,242,.09) 72%, transparent 100%)",
            /* Belt-and-braces with the long gradient tail: the blur dissolves
               the rounded-full rim itself, so no disc edge survives. Radius
               tracks viewport so the softness stays proportional at any size
               rather than being a fixed px on a ~900px shape. */
            filter: "blur(clamp(20px, 3.5vw, 64px))",
          }}
        />

        {/* Fine editorial accents, light theme only */}
        {light && (
          <>
            {/* Fine editorial orbit line */}
            <div
              className="absolute right-[-6%] top-[15%] h-[74%] w-[55%] rounded-[50%]"
              style={{
                border: "1px solid rgba(194,154,118,.28)",
                transform: "rotate(-9deg)",
              }}
            />

            {/* Small floating dot */}
            <div
              className="absolute right-[42%] top-[25%] h-3.5 w-3.5 rounded-full"
              style={{ background: "rgba(205,169,137,.30)" }}
            />
          </>
        )}
      </div>

      {/* Film grain / paper texture. Blend mode is theme-aware: multiply reads
          correctly on the paper field but multiplies a near-black field to
          black, so dark switches to overlay, which modulates around mid-grey
          and keeps the speckle visible. Both layers span inset-0, so the
          whole background is grained. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          mixBlendMode: light ? "multiply" : "overlay",
          opacity: light ? 0.34 : 0.5,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.95' numOctaves='4' seed='17' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='.34'/%3E%3C/svg%3E\")",
          backgroundSize: "220px 220px",
        }}
      />

      {/* Fine photographic grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          mixBlendMode: light ? "soft-light" : "overlay",
          opacity: light ? 0.18 : 0.3,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='finegrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.7' numOctaves='2' seed='41' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23finegrain)' opacity='.5'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Portrait */}
      <motion.div
        className="absolute inset-y-0 right-0 z-[8] h-full w-full md:w-[67%] lg:w-[63%] xl:w-[61%]"
        initial={{ opacity: 0, x: 30, scale: 1.02 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.15, duration: 1.25, ease: easing.editorial }}
      >
        <Image
          src="/hero/hero-cutout.png"
          alt="Portrait of Divyanshu Singh"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 63vw"
          className="object-contain"
          style={{
            objectPosition: "100% 100%",
            filter: "grayscale(1) contrast(1.06) brightness(.98)",
            transform: "translateX(8%) scale(1.08)",
            transformOrigin: "50% 100%",
          }}
        />
      </motion.div>

      {/* Main content */}
      <div className="absolute inset-0 z-20 mx-auto max-w-[1700px] px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="flex h-full items-center">
          <motion.div
            className="relative mt-[8vh] max-w-[820px] md:mt-[4vh]"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.1}
          >
            <h1
              className="font-extrabold leading-[.84] tracking-[-0.065em]"
              style={{
                fontSize: "clamp(64px, 9.2vw, 158px)",
              }}
            >
              <span
                className="block"
                style={{ color: light ? "#11110f" : "#f5f5f2" }}
              >
                Divyanshu
              </span>

              <span
                className="block"
                style={{
                  color: light ? "#c7a486" : "#858581",
                  marginTop: "0.015em",
                }}
              >
                Singh<span style={{ color: light ? "#c7a486" : "#858581" }}>.</span>
              </span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Bottom-left soft shadow / organic accent */}
      {light && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-8%] left-[-4%] z-[4] h-[32%] w-[30%] opacity-30 blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(171,156,139,.35), transparent 68%)",
            transform: "rotate(-18deg)",
          }}
        />
      )}

      {/* Mobile CTA */}
      <a
        href="#contact"
        className="absolute bottom-6 right-6 z-30 border px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] md:hidden"
        style={{
          borderColor: light ? "#b79a86" : "#777",
          color: light ? "#734e3c" : "#eee",
        }}
      >
        Contact →
      </a>
    </section>
  );
}
