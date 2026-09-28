# Scroll-Linked Text Saturation — Text Reference

## Purpose
Text progressively moves from muted/dim to active/bright as the visitor scrolls through the relevant section.

This is a text hierarchy effect, not a conventional entrance animation.

## Portfolio role
**Reading / attention**

## States
```text
DIM → MUTED → ACTIVE
```

The transition must be continuous rather than binary.

## Concept
```ts
progress = clamp(viewportProgress, 0, 1);
opacity = lerp(dimOpacity, activeOpacity, progress);
```

Color can similarly interpolate between dim and foreground tokens.

## Trigger
Scroll position determines progress. Do not simply switch between outside/inside states.

## Performance
Prefer a centralized scroll calculation and Intersection Observer for coarse activation. Avoid many independent high-frequency listeners.

## Accessibility
Full text remains readable without the effect. With reduced motion, use a static muted/foreground hierarchy.

## Constraints
Keep it subtle; never flash, hide text until a scroll point, or hijack scrolling.

**Semantic meaning: Scroll saturation = Reading / attention.**
