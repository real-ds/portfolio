# EncryptedText — Text Effect Reference

## Purpose
Character-level encrypted/scrambled text reveal for the **loading / arrival experience**.

**Reference behavior:** reveal the actual text character-by-character while scrambling unrevealed characters.

## Visual
```text
SCRAMBLED → PARTIALLY RESOLVED → FULLY RESOLVED
```

Unrevealed characters continue changing; resolved characters lock into place.

## Portfolio role
**Arrival / welcome**

Use primarily on the opening/loading screen. It communicates entry, anticipation and controlled decoding.

## Trigger
```text
Page arrival → short encrypted reveal → final welcome → portfolio
```

## Motion
- Character-level resolution
- Controlled scrambling
- Short duration
- Progressive locking
- No excessive random noise

Suggested character set:
`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`

## Accessibility
Keep the final text available in the DOM. With `prefers-reduced-motion`, show the final text immediately.

## Implementation note
The effect is an enhancement, not the content itself. Avoid indefinite scrambling or artificial loading delays.

**Semantic meaning: EncryptedText = Arrival.**
