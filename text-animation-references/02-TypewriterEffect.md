# TypewriterEffect / TypewriterEffectSmooth — Text Effect Reference

## Purpose
Character-by-character typing with a blinking cursor.

**Reference behavior:** characters appear sequentially while a cursor indicates active typing.

## Visual
```text
_ → A_ → AI_ → AI E_ → AI ENGINEER_
```

## Portfolio role
**Voice / personality**

Use primarily for the hero supporting statement. It should make the introduction feel authored and personal.

## Motion
- Character-by-character reveal
- Blinking cursor
- Stable layout
- No bounce
- No dramatic spring

Suggested initial interval: **35–60ms/character**.

## Cursor
- Align with text baseline
- Blink subtly
- Never cause layout shift
- May become static/disappear after completion

## Trigger
Hero/page entry; normally play once.

## Accessibility
Expose the complete text semantically. With reduced motion, show the complete sentence immediately.

## Design constraints
Do not use typewriter on every heading or entire paragraphs.

**Semantic meaning: TypewriterEffect = Voice / Personality.**
