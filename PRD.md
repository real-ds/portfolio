# PRD — Personal Portfolio
## AI Engineer × Design Enthusiast

**Status:** Design specification / implementation-ready  
**Primary artifact:** Figma prototype — `Personal Portfolio — AI Engineer × Design`  
**Figma file:** https://www.figma.com/design/VdnOnJVngcNi5To9X6ndQi

---

## 1. Product vision

Create a distinctive personal portfolio for **Divyanshu Singh**, positioned at the intersection of:

- AI engineering
- software/system building
- interaction design
- visual/design experimentation

The site should feel like a **designed object**, not a conventional résumé website.

The experience is intentionally dark, editorial, typographic and cinematic, with restrained motion. Animation must communicate state, hierarchy, discovery or personality rather than exist as decoration.

**Hard exclusion:** no AI chatbot on the portfolio.

---

## 2. Goals

1. Establish a memorable personal identity immediately.
2. Communicate AI engineering credibility without becoming corporate.
3. Demonstrate design sensitivity through typography, spacing, motion and interaction.
4. Make projects understandable in approximately 3–5 seconds.
5. Give visitors opportunities to explore details without forcing long case studies.
6. Make motion feel smooth, deliberate and premium.
7. Support dark/light visual themes.
8. Provide a clear path from portfolio → contact.
9. Make the design system straightforward to implement in React/Next.js.

---

## 3. Non-goals

- No generic SaaS dashboard aesthetic.
- No excessive gradients.
- No stock-photo-heavy portfolio.
- No long case-study walls on the landing page.
- No AI chat widget.
- No animation that delays access to essential information unnecessarily.
- No overuse of glassmorphism.

---

## 4. Target audience

### Primary
Recruiters, hiring managers, engineers, designers and technical collaborators evaluating:

- engineering ability
- AI/system thinking
- product/design judgment
- quality of execution

### Secondary
Creative technologists, founders and peers interested in experiments and interaction design.

---

## 5. Information architecture

1. Loading / Intro
2. Hero
3. Intro / positioning
4. What I Do
5. Selected Work
6. Explore / capabilities
7. How I Build
8. About / The Other Side
9. Quote / personality statement
10. Motion specimens
11. Experiments
12. CTA
13. Footer
14. Project carousel component study

---

## 6. Section requirements

### Loading / Intro
Use encrypted text to reveal a short welcome message.

Purpose:
- establish arrival
- create anticipation
- introduce the site's motion language

The loader must be brief and skippable through normal page loading; it must never become a blocking gimmick.

### Hero
Large, immediate identity:

**DIVYANSHU SINGH.**

Supporting positioning:

**AI ENGINEER / DESIGN ENTHUSIAST**

Use a typewriter-style supporting statement to add personality.

### Intro
Use scroll-linked text saturation:

- initially muted/dim
- progressively becomes brighter as the text enters/advances through the viewport

This is a reading aid and hierarchy mechanism.

### What I Do
Four compact capability items. Keep them scannable and structured rather than paragraph-heavy.

### Selected Work
Three concise projects in the current prototype:

- INTELLIGENT SYSTEM
- VISION LAB
- AUTOMATION STACK

Each project gets:
- title
- one-line description
- compact metadata
- interaction cue
- quick-view behavior

### Explore
Capability rows should become brighter/active on interaction. Include a floating quick-view card.

### How I Build
Terminal-inspired engineering section.

Use:
- monospace typography
- command-line structure
- restrained syntax highlighting
- typing/reveal behavior
- viewport-triggered playback

### About / The Other Side
Editorial text using a word-by-word blur/reveal effect.

### Quote
Large typographic statement with lightweight syntax/cursor details.

### Motion specimens
Showcase the site's animation vocabulary without turning the page into a component catalog.

### Experiments
Compact exploratory rows for side projects/interactions.

### CTA
Large contact statement over a subtle dotted-glow field.

### Footer
Aligned navigation/contact columns plus a huge faded:

**DIVYANSHU SINGH.**

This acts as a visual signature.

### Project carousel
Use the Apple Cards Carousel-inspired interaction as the preferred project exploration pattern:

- horizontal cards
- active/selected card
- previous/next controls
- expandable project detail
- 01—04 progress indicator
- concise project metadata

The supplied React reference component should be adapted rather than copied blindly.

---

## 7. Success criteria

A successful implementation should:

- communicate identity in the first viewport
- preserve strong readability with animations disabled
- feel smooth at 60fps on normal hardware
- maintain keyboard accessibility
- respect `prefers-reduced-motion`
- have usable mobile behavior
- keep project summaries concise
- make dark/light theme switching understandable
- retain the visual hierarchy when theme changes

---

## 8. Accessibility

- Never encode meaning using color alone.
- Maintain readable contrast in both themes.
- Provide visible keyboard focus.
- Respect `prefers-reduced-motion`.
- Avoid flashing or rapidly changing text.
- Typewriter/encrypted effects must expose the final text to assistive technology.
- Theme toggle must have an accessible name and state.
- Hover-only information must have an equivalent focus/tap path.

---

## 9. Content principles

Copy should be:
- concise
- confident
- technical without jargon overload
- human
- editorial

Avoid:
- inflated claims
- generic phrases such as “passionate developer”
- lengthy explanations before evidence
- unnecessary buzzwords
