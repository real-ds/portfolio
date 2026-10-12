import { getTechIcon, getTechMonogram } from "@/lib/tech";

/* =========================================================
   TECH MARK

   Official brand glyph + the technology name underneath.
   The glyph inherits `currentColor` so it stays legible in
   both themes and never fights the page accent. Technologies
   without a brand mark (RAG, CLI, WebSockets…) fall back to a
   monogram so the row never breaks.
   ========================================================= */

export function TechMark({
  technology,
  size = "md",
}: {
  technology: string;
  size?: "sm" | "md" | "lg";
}) {
  const icon = getTechIcon(technology);

  const glyph = size === "lg" ? "h-9 w-9" : size === "sm" ? "h-5 w-5" : "h-7 w-7";
  const label =
    size === "lg"
      ? "text-[0.78rem] tracking-[0.1em]"
      : size === "sm"
        ? "text-[0.62rem] tracking-[0.1em]"
        : "text-[0.7rem] tracking-[0.12em]";

  return (
    <div className="group/mark flex min-w-0 flex-col items-center gap-3.5 text-center">
      <span
        aria-hidden="true"
        className="flex shrink-0 items-center justify-center text-[var(--foreground)]/70 transition-colors duration-300 group-hover/mark:text-[var(--accent)]"
      >
        {icon ? (
          <svg viewBox="0 0 24 24" className={glyph} fill="currentColor">
            <path d={icon.path} />
          </svg>
        ) : (
          <span
            className={`${glyph} flex items-center justify-center font-mono font-semibold leading-none text-[0.7em]`}
          >
            {getTechMonogram(technology)}
          </span>
        )}
      </span>

      <span
        className={`max-w-full font-mono font-medium uppercase leading-[1.35] text-[var(--muted)] transition-colors duration-300 [overflow-wrap:anywhere] group-hover/mark:text-[var(--foreground)] ${label}`}
      >
        {technology}
      </span>
    </div>
  );
}