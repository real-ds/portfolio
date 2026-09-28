"use client";

import { useState } from "react";
import { allTechnologies } from "@/lib/technologies";

type RibbonProps = {
  label?: string;
  className?: string;
};

type MarqueeRowProps = {
  direction: "left" | "right";
  size: "normal" | "large";
  hoveredLogoKey: string | null;
  setHoveredLogoKey: (key: string | null) => void;
};

function MarqueeRow({
  direction,
  size,
  hoveredLogoKey,
  setHoveredLogoKey,
}: MarqueeRowProps) {
  /*
   * TWO IDENTICAL COPIES
   *
   * The second copy follows the first continuously.
   * The track moves exactly 50%, creating the seamless loop.
   */
  const technologies = [
    ...allTechnologies,
    ...allTechnologies,
  ];

  const isPaused = hoveredLogoKey !== null;

  const isLarge = size === "large";

  /*
   * Fixed dimensions.
   *
   * These are deliberately kept here rather than depending
   * on external CSS/Tailwind rules.
   */
  const itemWidth = isLarge ? 260 : 240;
  const itemHeight = isLarge ? 104 : 96;

  const iconSize = isLarge ? 48 : 46;
  const fontSize = isLarge ? 24 : 20;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${itemHeight}px`,
        overflow: "hidden",

        /*
         * Fade the edges of the ribbon.
         */
        maskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div
        data-paused={isPaused ? "true" : "false"}
        style={{
          /*
           * THESE ARE THE IMPORTANT FIXES.
           *
           * The track is ALWAYS one horizontal line.
           */
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",

          width: "max-content",
          maxWidth: "none",

          height: `${itemHeight}px`,

          alignItems: "center",

          flexShrink: 0,

          whiteSpace: "nowrap",

          /*
           * Animation direction.
           */
          animation:
            direction === "left"
              ? "technology-ribbon-left 82s linear infinite"
              : "technology-ribbon-right 88s linear infinite",

          animationPlayState: isPaused
            ? "paused"
            : "running",

          willChange: "transform",
        }}
      >
        {technologies.map((technology, index) => {
          const isActive =
            hoveredLogoKey === technology.key;

          const copy =
            index < allTechnologies.length
              ? "first"
              : "second";

          return (
            <button
              key={`${technology.key}-${copy}`}
              type="button"
              aria-label={technology.name}
              title={technology.name}
              data-active={
                isActive ? "true" : "false"
              }
              data-any-active={
                isPaused ? "true" : "false"
              }
              onMouseEnter={() =>
                setHoveredLogoKey(technology.key)
              }
              onMouseLeave={() =>
                setHoveredLogoKey(null)
              }
              onFocus={() =>
                setHoveredLogoKey(technology.key)
              }
              onBlur={() =>
                setHoveredLogoKey(null)
              }
              style={{
                /*
                 * FIXED WIDTH
                 *
                 * Every technology gets exactly one slot.
                 */
                display: "flex",
                flex: `0 0 ${itemWidth}px`,
                width: `${itemWidth}px`,
                minWidth: `${itemWidth}px`,
                maxWidth: `${itemWidth}px`,

                height: `${itemHeight}px`,

                flexDirection: "row",
                flexWrap: "nowrap",

                alignItems: "center",
                justifyContent: "center",

                gap: "16px",

                padding: "0 18px",

                boxSizing: "border-box",

                /*
                 * Prevent any global button styles from
                 * changing the visual layout.
                 */
                border: "0",
                outline: "none",

                background: "transparent",

                cursor: "pointer",

                color: "var(--foreground)",

                opacity:
                  isPaused && !isActive
                    ? 0.16
                    : isActive
                      ? 1
                      : 0.42,

                filter:
                  isPaused && !isActive
                    ? "grayscale(100%) contrast(0.55)"
                    : "grayscale(100%) contrast(0.72)",

                transform: isActive
                  ? "scale(1.045)"
                  : "scale(1)",

                transition:
                  "opacity 300ms ease, filter 300ms ease, transform 300ms ease",

                whiteSpace: "nowrap",

                overflow: "hidden",
              }}
            >
              {technology.icon ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    display: "block",

                    width: `${iconSize}px`,
                    height: `${iconSize}px`,

                    minWidth: `${iconSize}px`,
                    maxWidth: `${iconSize}px`,

                    minHeight: `${iconSize}px`,
                    maxHeight: `${iconSize}px`,

                    flex: `0 0 ${iconSize}px`,

                    flexShrink: 0,

                    fill: "currentColor",

                    overflow: "hidden",

                    pointerEvents: "none",
                  }}
                >
                  <path
                    d={technology.icon.path}
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <span
                  style={{
                    display: "block",

                    flexShrink: 0,

                    fontFamily: "monospace",

                    fontSize: isLarge
                      ? "20px"
                      : "18px",

                    fontWeight: 700,

                    lineHeight: 1,

                    letterSpacing: "0.06em",

                    whiteSpace: "nowrap",
                  }}
                >
                  {technology.textMark}
                </span>
              )}

              <span
                style={{
                  display: "block",

                  minWidth: 0,

                  maxWidth:
                    itemWidth -
                    iconSize -
                    52,

                  overflow: "hidden",

                  textOverflow: "ellipsis",

                  whiteSpace: "nowrap",

                  fontSize: `${fontSize}px`,

                  lineHeight: 1.1,

                  fontWeight: 500,

                  letterSpacing: "-0.015em",

                  color: "currentColor",
                }}
              >
                {technology.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TechnologyRibbon({
  label = "TECHNOLOGIES I WORK WITH",
  className = "",
}: RibbonProps) {
  const [hoveredLogoKey, setHoveredLogoKey] =
    useState<string | null>(null);

  return (
    <section
      className={className}
      aria-label="Technology stack"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      {/* =====================================================
          LABEL
      ====================================================== */}

      {label && (
        <div
          style={{
            width: "100%",

            marginBottom: "34px",

            textAlign: "center",

            fontFamily: "monospace",

            fontSize: "12px",

            lineHeight: 1,

            letterSpacing: "0.28em",

            textTransform: "uppercase",

            color: "var(--dim)",
          }}
        >
          {label}
        </div>
      )}

      {/* =====================================================
          RIBBONS
      ====================================================== */}

      <div
        style={{
          display: "flex",

          flexDirection: "column",

          width: "100%",

          maxWidth: "100%",

          gap: "12px",

          overflow: "hidden",
        }}
      >
        {/* ===================================================
            TOP ROW
            RIGHT → LEFT
        ==================================================== */}

        <MarqueeRow
          direction="left"
          size="normal"
          hoveredLogoKey={hoveredLogoKey}
          setHoveredLogoKey={setHoveredLogoKey}
        />

        {/* ===================================================
            BOTTOM ROW
            LEFT → RIGHT
        ==================================================== */}

        <MarqueeRow
          direction="right"
          size="large"
          hoveredLogoKey={hoveredLogoKey}
          setHoveredLogoKey={setHoveredLogoKey}
        />
      </div>

      <style jsx>{`
        /* =====================================================
           TOP ROW
           RIGHT → LEFT
        ====================================================== */

        @keyframes technology-ribbon-left {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* =====================================================
           BOTTOM ROW
           LEFT → RIGHT
        ====================================================== */

        @keyframes technology-ribbon-right {
          from {
            transform: translate3d(-50%, 0, 0);
          }

          to {
            transform: translate3d(0, 0, 0);
          }
        }

        /* =====================================================
           HOVER
        ====================================================== */

        button[data-active="true"] {
          opacity: 1 !important;

          filter:
            grayscale(100%)
            contrast(1.15) !important;

          transform: scale(1.045) !important;
        }

        button:focus-visible {
          outline: 1px solid var(--dim) !important;

          outline-offset: -6px;
        }

        /* =====================================================
           MOBILE
        ====================================================== */

        @media (max-width: 768px) {
          .technology-ribbon-mobile {
            display: none;
          }
        }

        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {
          div[data-paused] {
            animation: none !important;

            transform: translate3d(0, 0, 0) !important;
          }
        }
      `}</style>
    </section>
  );
}