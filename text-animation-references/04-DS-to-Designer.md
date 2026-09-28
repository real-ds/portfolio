# DS. → Designer — Identity Text Interaction Reference

## Purpose
Custom navigation identity interaction.

Default:
```text
DS.
```

Hover/focus:
```text
Designer
```

This is a signature interaction, not a tooltip.

## Reveal
```text
DS. → D → De → Des → Desi → Desig → Design → Designer
```

## Portfolio role
**Identity / signature / design personality**

## Hover
On pointer enter:
- smoothly expand the identity area
- reveal `Designer`
- preserve vertical alignment
- avoid shifting surrounding navigation

On leave, smoothly reverse to `DS.`.

## Keyboard
`:focus-visible` must reproduce the meaningful expanded state.

## Motion
Suggested duration: **250–450ms**.
Suggested easing:
`cubic-bezier(0.22, 1, 0.36, 1)`

## Constraints
Do not make it a tooltip, bounce it, add a large glow, or cause navigation to jump.

**Semantic meaning: DS. → Designer = Personal signature / identity.**
