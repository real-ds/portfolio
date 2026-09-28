# TextGenerateEffect / Blur Reveal — Text Effect Reference

## Purpose
Word-by-word reveal where each word begins blurred and low-opacity, then resolves into sharp visible text.

## Visual
```text
blur + dim → blur + visible → sharp + bright
```

Suggested initial state:
```css
opacity: 0.15;
filter: blur(8px);
transform: translateY(8px);
```

Resolved state:
```css
opacity: 1;
filter: blur(0);
transform: translateY(0);
```

## Portfolio role
**Editorial reading / About**

Primarily for the `THE OTHER SIDE` editorial statement.

## Timing
- Duration: **400–650ms**
- Stagger: **25–50ms**
- Tune for sentence length so long text does not become excessively slow.

## Trigger
Text enters viewport → words progressively resolve.

## Accessibility
The complete text remains semantically available. With reduced motion, remove the blur animation and show the text immediately.

## Design constraints
Keep it calm and editorial. Do not use it on every paragraph or combine it with aggressive scale/bounce.

**Semantic meaning: TextGenerateEffect = Editorial reading / thought becoming clear.**
