"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import LightRays from "@/components/light-rays";
import { motionTokens, easing } from "@/lib/motion";
import { useTheme } from "@/components/theme-provider";

/* -------------------------------------------------------------------------- */
/* Constants                                                                   */
/* -------------------------------------------------------------------------- */

// Hard-coded sans stack so the hero never inherits the site's mono font.
const SANS =
  'Inter, "Helvetica Neue", Helvetica, Arial, "Segoe UI", system-ui, sans-serif';

// Light source position (percent of hero width, above the top edge).
const SRC_X = 30;
const SRC_Y = -6;

// Emitter for the diagonal LightRays beam, in % of the hero. It sits just
// outside the top-left corner so the shader's unlit zone ends at the corner.
const DIAG_X = -21;
const DIAG_Y = -22;
const DIAG_ANGLE = -62; // degrees; more negative = flatter, aimed lower
// Beam centre in conic degrees (180 = straight down, <180 leans right).
const BEAM_CENTER = 172;

/* -------------------------------------------------------------------------- */
/* Procedural light rays (deterministic -> no hydration mismatch)             */
/* -------------------------------------------------------------------------- */

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function conicRays(opts: {
  seed: number;
  count: number;
  from: number;
  to: number;
  wMin: number;
  wMax: number;
  peak: number;
  sigma?: number;
}) {
  const { seed, count, from, to, wMin, wMax, peak, sigma = 26 } = opts;
  const rnd = mulberry32(seed);
  const slot = (to - from) / count;
  const stops: string[] = ["transparent 0deg", `transparent ${from}deg`];

  for (let i = 0; i < count; i++) {
    const c = from + slot * (i + 0.5) + (rnd() - 0.5) * slot * 0.3;
    const half = Math.min(slot * 0.33, wMin + rnd() * (wMax - wMin));
    const bell = Math.exp(-(((c - BEAM_CENTER) / sigma) ** 2));
    const o = (peak * (0.25 + 0.75 * rnd()) * bell).toFixed(3);
    stops.push(
      `rgba(255,250,240,0) ${(c - half).toFixed(2)}deg`,
      `rgba(255,250,240,${o}) ${c.toFixed(2)}deg`,
      `rgba(255,250,240,0) ${(c + half).toFixed(2)}deg`
    );
  }
  stops.push(`transparent ${to}deg`, "transparent 360deg");
  return `conic-gradient(from 0deg at 40% 0%, ${stops.join(", ")})`;
}

const RAYS_SHAFTS = conicRays({ seed: 11, count: 5, from: 138, to: 206, wMin: 0.9, wMax: 2.2, peak: 0.34 });
const RAYS_GLOW = conicRays({ seed: 7, count: 9, from: 128, to: 212, wMin: 3, wMax: 9, peak: 0.2 });
const RAYS_MAIN = conicRays({ seed: 23, count: 30, from: 128, to: 212, wMin: 0.3, wMax: 0.9, peak: 0.3 });
const RAYS_FINE = conicRays({ seed: 41, count: 70, from: 128, to: 212, wMin: 0.12, wMax: 0.38, peak: 0.24 });

/* -------------------------------------------------------------------------- */
/* Floating dust that only glows inside the beam                              */
/* -------------------------------------------------------------------------- */

function LightDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type P = { x: number; y: number; r: number; vx: number; vy: number; ph: number; sp: number };
    let w = 0;
    let h = 0;
    let raf = 0;
    let ps: P[] = [];

    const seed = () => {
      const n = Math.round(Math.min(110, (w * h) / 16000));
      ps = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.12,
        vy: 0.03 + Math.random() * 0.12,
        ph: Math.random() * Math.PI * 2,
        sp: 0.6 + Math.random() * 1.4,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (t: number, animate: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const sx = (SRC_X / 100) * w;
      const sy = (SRC_Y / 100) * h;
      const center = BEAM_CENTER + 3 * Math.sin(t / 9000); // follows the slow sway

      for (const p of ps) {
        if (animate) {
          p.x += p.vx + Math.sin(t * 0.0004 + p.ph) * 0.09;
          p.y += p.vy + Math.cos(t * 0.0003 + p.ph) * 0.05;
          if (p.y > h + 4) p.y = -4;
          if (p.x < -4) p.x = w + 4;
          if (p.x > w + 4) p.x = -4;
        }
        const dx = p.x - sx;
        const dy = p.y - sy;
        const conic = 180 - (Math.atan2(dx, dy) * 180) / Math.PI;
        const bell = Math.exp(-(((conic - center) / 22) ** 2));
        const fall = Math.exp(-dy / (h * 0.8));
        const tw = 0.55 + 0.45 * Math.sin(t * 0.001 * p.sp + p.ph);
        const a = bell * fall * tw;
        if (a < 0.02) continue;

        ctx.fillStyle = `rgba(255,248,235,${(a * 0.22).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,252,245,${Math.min(1, a * 0.95).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (!document.hidden) draw(t, true);
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduce) draw(0, false);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="hx-dust pointer-events-none absolute inset-0 z-[8] h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Styles (scoped via hx- prefix)                                              */
/* -------------------------------------------------------------------------- */

const HERO_CSS = `
.hx-rays{position:absolute;inset:0;z-index:7;overflow:hidden;pointer-events:none;mix-blend-mode:screen}
.hx-layer{
  position:absolute;left:-50%;top:${SRC_Y}%;width:200%;height:140%;
  transform-origin:40% 0%;will-change:transform,opacity;
  -webkit-mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.7) 36%,rgba(0,0,0,.2) 66%,transparent 90%);
  mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.7) 36%,rgba(0,0,0,.2) 66%,transparent 90%);
}
.hx-shafts{background:${RAYS_SHAFTS};filter:blur(11px);--lo:.55;--hi:1;
  animation:hxSwayA 41s ease-in-out infinite alternate,hxBreath 11s ease-in-out infinite}
.hx-glow{background:${RAYS_GLOW};filter:blur(30px);--lo:.7;--hi:1;
  animation:hxSwayB 33s ease-in-out infinite alternate,hxBreath 8s ease-in-out -3s infinite}
.hx-main{background:${RAYS_MAIN};filter:blur(3px);--lo:.6;--hi:1;
  animation:hxSwayC 27s ease-in-out infinite alternate,hxFlicker 13s linear infinite}
.hx-fine{background:${RAYS_FINE};filter:blur(1px);--lo:.45;--hi:.9;
  animation:hxSwayA 19s ease-in-out -7s infinite alternate-reverse,hxBreath 6s ease-in-out -2s infinite}

.hx-source{
  position:absolute;z-index:7;left:${SRC_X}%;top:${SRC_Y}%;width:58vw;height:34vw;
  transform:translate(-50%,-50%);pointer-events:none;mix-blend-mode:screen;
  background:radial-gradient(closest-side,rgba(255,250,240,.5),rgba(255,250,240,.16) 45%,transparent 100%);
  filter:blur(24px);animation:hxSource 7s ease-in-out infinite;
}

.hx-diag{position:absolute;inset:0;z-index:6;overflow:hidden;pointer-events:none;mix-blend-mode:var(--hx-diag-blend,screen)}
/* The ray stack, source glow and dust are additive white light with screen
   blending, which only reads against a dark field. On the light theme they are
   switched off, and LightRays renders through its lightMode ink pass with
   multiply blending instead. */
.hero-root[data-hx-light="true"] .hx-rays,
.hero-root[data-hx-light="true"] .hx-source,
.hero-root[data-hx-light="true"] .hx-dust{display:none}

/* hero-cutout.png is a 1671x941 RGBA cutout, so it is shown whole and anchored
   to the bottom-right (object-fit:contain + object-position 100% 100% in the
   markup). The PNG's own alpha does the blending, so no mask or edge fade is
   applied here — the previous left-side fade would have eaten the face. */

@keyframes hxSwayA{0%{transform:rotate(-2.6deg)}100%{transform:rotate(3deg)}}
@keyframes hxSwayB{0%{transform:rotate(2.2deg) scaleX(1)}100%{transform:rotate(-2.8deg) scaleX(1.04)}}
@keyframes hxSwayC{0%{transform:rotate(1.6deg)}50%{transform:rotate(-1.4deg) scaleX(1.02)}100%{transform:rotate(-3deg)}}
@keyframes hxBreath{0%,100%{opacity:var(--lo)}50%{opacity:var(--hi)}}
@keyframes hxFlicker{
  0%{opacity:.85}8%{opacity:1}17%{opacity:.78}29%{opacity:.96}41%{opacity:.82}
  57%{opacity:1}68%{opacity:.8}83%{opacity:.95}100%{opacity:.85}
}
@keyframes hxSource{0%,100%{opacity:.8;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}

@media (prefers-reduced-motion:reduce){
  .hx-layer,.hx-source{animation:none!important}
}
`;

/* -------------------------------------------------------------------------- */
/* Motion                                                                      */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export function Hero() {
  const { theme } = useTheme();
  const light = theme === "light";

  return (
    <section
      id="home"
      className="hero-root relative isolate min-h-[100svh] w-full overflow-hidden"
      data-hx-light={light ? "true" : "false"}
      style={{
        fontFamily: SANS,
        background: light ? "#f2f1ea" : "#0a0a0a",
        /* screen for the additive beam on dark, multiply so the lightMode ink
           pass actually tints the light field. */
        ["--hx-diag-blend" as string]: light ? "multiply" : "screen",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND — neutral charcoal                                       */}
      {/* ------------------------------------------------------------------ */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: light
              ? "radial-gradient(120% 100% at 50% 28%, #fbfaf5 0%, #f4f3ec 42%, #e9e7dd 100%)"
              : "radial-gradient(120% 100% at 50% 28%, #1c1c1c 0%, #131313 42%, #090909 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[70%]"
          style={{
            background: light
              ? "radial-gradient(60% 90% at 30% -10%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 45%, transparent 75%)"
              : "radial-gradient(60% 90% at 30% -10%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 45%, transparent 75%)",
          }}
        />
      </div>

      {/* Grain + vignette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3]">
        <div className="hero-grain absolute inset-0 overflow-hidden" />
        <div
          className="absolute inset-0"
          style={{
            background: light
              ? "radial-gradient(70% 85% at 100% 108%, rgba(122,118,101,0.16) 0%, transparent 60%), radial-gradient(140% 105% at 50% 46%, transparent 55%, rgba(122,118,101,0.13) 100%)"
              : "radial-gradient(70% 85% at 100% 108%, rgba(0,0,0,0.6) 0%, transparent 60%), radial-gradient(140% 105% at 50% 46%, transparent 52%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PORTRAIT                                                            */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        className="hx-portrait absolute inset-y-0 right-0 z-[4] h-full w-full md:w-[66%] lg:w-[60%]"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1.5, ease: easing.editorial }}
      >
        <Image
          src="/hero/hero-cutout.png"
          alt="Portrait of Divyanshu Singh"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 60vw"
          className="object-contain"
          style={{
            objectPosition: "100% 100%",
            filter: "grayscale(1) contrast(1.06) brightness(0.98)",
            /* The PNG carries ~22% empty alpha on its right, so anchoring the
               canvas to the right edge drags the figure left of centre. With
               `contain` the image is exactly as wide as the frame, leaving no
               horizontal slack, so object-position cannot correct it — nudge the
               whole image right instead. Only transparent pixels cross the
               viewport edge, so nothing visible is clipped.

               scale(1.15) zooms in a little; the origin is pinned to the bottom
               centre so the figure grows upward/outward from the baseline and
               stays anchored to the bottom of the hero. */
            transform: "translateX(11%) scale(1.15)",
            transformOrigin: "50% 100%",
          }}
        />
      </motion.div>

      {/* Accent wash from the right edge. Light theme only. Sits below the figure
          (z-[3] vs the portrait's z-[4]) so it reads as colour spilling in
          from behind rather than a tint laid over it. */}
      {light && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            /* Linear gradient running right -> left: solid accent at the edge,
               falling to fully transparent by mid-hero so it never tints the
               heading. The long even ramp avoids banding, and the colour is
               the light theme's --accent. */
            background:
              "linear-gradient(90deg, transparent 0%, rgba(114,47,55,0.03) 30%, rgba(114,47,55,0.16) 50%, rgba(114,47,55,0.42) 72%, rgba(114,47,55,0.62) 100%)",
          }}
        />
      )}

      {/* Left depth scrim (kept light so the rays stay visible) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[6]"
        style={{
          background: light
            ? "linear-gradient(100deg, rgba(226,223,210,0.75) 0%, rgba(233,231,220,0.45) 30%, transparent 52%)"
            : "linear-gradient(100deg, rgba(3,3,3,0.38) 0%, rgba(4,4,4,0.2) 30%, transparent 52%)",
        }}
      />

      <div aria-hidden className="hx-diag">
        <div
          style={{
            position: "absolute",
            left: `${DIAG_X - 50}%`,
            top: `${DIAG_Y + 20}%`,
            width: "100%",
            height: "100%",
            transformOrigin: "50% -20%",
            transform: `rotate(${DIAG_ANGLE}deg) scale(2.2)`,
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 4%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 4%)",
          }}
        >
          <LightRays
            raysOrigin="top-center"
            /* Dark: a muted grey rather than the old near-white cream, which washed the
               whole field (#fff4e2 scaled to ~1.0). #6d6d6c reuses the grey
               already in the heading gradient and cuts the beam ~2.4x. */
            raysColor={light ? "#c9b489" : "#6d6d6c"}
            raysSpeed={0.7}
            lightSpread={0.85}
            rayLength={1.6}
            fadeDistance={1.4}
            pulsating={false}
            saturation={0.55}
            followMouse
            mouseInfluence={0.42}
            noiseAmount={0.28}
            distortion={0.06}
            lightMode={light}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ANIMATED LIGHT STREAKS                                              */}
      {/* ------------------------------------------------------------------ */}
      <div aria-hidden className="hx-source" />
      <div aria-hidden className="hx-rays">
        <div className="hx-layer hx-glow" />
        <div className="hx-layer hx-shafts" />
        <div className="hx-layer hx-main" />
        <div className="hx-layer hx-fine" />
      </div>
      <LightDust />

      {/* Lettering legibility scrim. The beam layers sit at z-6/7/8 and the content
          at z-20, so the text is already in front; this only restores contrast
          where a bright shaft passes behind the glyphs. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[15] w-full max-w-[min(860px,100%)]"
          style={{
            /* Centred on the letterforms' new home (lower-left), not the old
              vertical middle. */
            background: light
              ? "radial-gradient(62% 46% at 26% 84%, rgba(248,247,241,0.9) 0%, rgba(248,247,241,0.58) 42%, transparent 76%)"
              : "radial-gradient(62% 46% at 26% 84%, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.44) 42%, transparent 76%)",
          }}
        />

        {/* ------------------------------------------------------------------ */}
        {/* CONTENT                                                             */}
        {/* ------------------------------------------------------------------ */}
        {/* Anchored to the bottom-left: justify-end drops the block to the
            baseline, items-start keeps it flush left, and the h1's own
            paddingBottom offsets its 0.9 line-height so the descender of
            "Singh." clears the container padding. */}
        <div className="absolute inset-0 z-20 mx-auto flex max-w-[1700px] flex-col justify-end px-6 pb-8 md:px-12 md:pb-10 lg:px-16 lg:pb-12 xl:px-20">
        <div
          className="hero-content flex flex-col items-start"
          style={{ maxWidth: "min(900px, 100%)" }}
        >
          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={{
              fontSize: "clamp(48px, min(8.6vw, 17vh), 168px)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              paddingBottom: "0.1em",
              marginBottom: "-0.1em",
            }}
          >
            <span className="block" style={{ color: light ? "#151513" : "#f6f6f4" }}>
              Divyanshu
            </span>
            <span
              className="block"
              style={{
                paddingBottom: "0.14em",
                marginBottom: "-0.14em",
                paddingRight: "0.06em",
                /* backgroundImage, not the `background` shorthand: this span
                   also sets backgroundClip, and React warns when a shorthand
                   is updated alongside a conflicting longhand. */
                backgroundImage: light
                  ? "linear-gradient(180deg, #1b1b18 0%, #55554f 52%, #83837c 100%)"
                  : "linear-gradient(180deg, #ececea 0%, #a2a2a0 52%, #6d6d6c 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Singh.
            </span>
          </motion.h1>
        </div>
      </div>
    </section>
  );
}