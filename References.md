# References

## 1. Primary design reference

**Figma prototype**

Personal Portfolio — AI Engineer × Design

https://www.figma.com/design/VdnOnJVngcNi5To9X6ndQi

This is the primary visual source of truth for the current prototype.

---

## 2. Component reference

**Apple Cards Carousel**

Source supplied during the design process:

`apple-cards-carousel-demo.tsx`

The component demonstrates:
- horizontal project cards
- expandable cards
- motion-based transitions
- previous/next controls
- project detail expansion

The production implementation must adapt its interaction model to this portfolio's visual language.

---

## 3. Text animation references

### EncryptedText
Concept:
- scramble/reveal characters
- unresolved characters cycle
- resolved characters lock into place
- trigger on arrival/in-view

Portfolio purpose:
**arrival / welcome**

### TypewriterEffect / TypewriterEffectSmooth
Concept:
- character-by-character typing
- blinking cursor
- controlled typing interval

Portfolio purpose:
**voice / personality**

### TextGenerateEffect
Concept:
- word-by-word reveal
- blur + low opacity → sharp + visible

Portfolio purpose:
**editorial reading / About**

---

## 4. Interaction references

### Terminal UI
Concept:
- command prompt
- syntax-highlighted text
- typing
- viewport trigger
- optional sound

Portfolio purpose:
**engineering identity**

### Hover Quick View
Concept:
- reveal contextual preview without leaving the page

Portfolio purpose:
**exploration**

### Dotted Glow
Concept:
- subtle dotted/radial field
- atmospheric rather than decorative overload

Portfolio purpose:
**CTA atmosphere**

### Faded Wordmark
Concept:
- oversized low-opacity footer identity

Portfolio purpose:
**signature**

---

## 5. Motion references

Recommended implementation technologies:

- Framer Motion / Motion for React choreography
- Intersection Observer for in-view triggers
- CSS transitions for theme/color changes
- CSS transforms/opacity for performant micro-interactions

Official resources:

- Motion: https://motion.dev/
- MDN Intersection Observer: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- MDN CSS transitions: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions

---

## 6. Figma implementation reference

Use the existing Figma file as the visual specification.

Important prototype areas:
- root frame: `3:2`
- navigation and hero
- What I Do
- Selected Work
- Explore
- Terminal
- About
- Quote
- Motion specimens
- Experiments
- CTA/footer
- project carousel component study

The design is an editorial long-form portfolio rather than a generic template.
