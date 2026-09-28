# DESIGN.md — Visual & Interaction Specification
## Personal Portfolio — AI Engineer × Design Enthusiast

**Source prototype:** `Personal Portfolio — AI Engineer × Design`  
**Figma:** https://www.figma.com/design/VdnOnJVngcNi5To9X6ndQi

---

# 1. Design language

The visual language is:

> **dark editorial × engineering terminal × cinematic interaction**

Core principles:

1. Oversized typography.
2. Large areas of intentional negative space.
3. Near-black canvas.
4. Muted text hierarchy that becomes brighter through interaction/scroll.
5. Sparse lime accent.
6. Thin rules and compact metadata.
7. Smooth, delayed, eased movement.
8. Concise project presentation.
9. Interaction as discovery.
10. Motion with a reason.

Every animation has a semantic job:

| Motion | Meaning |
|---|---|
| Encrypted text | Arrival |
| Typewriter | Voice / personality |
| Scroll saturation | Reading / attention |
| Hover quick view | Exploration |
| Terminal typing | Engineering |
| Dotted glow | Atmosphere |
| Faded footer wordmark | Signature |
| Theme transition | State change |

---

# 2. Composition

Reference viewport:

```text
1440 × 8200+ desktop composition
```

The prototype is a long editorial scroll rather than a conventional collection of boxed sections.

Use wide margins and avoid excessive cards.

---

# 3. Color

## Dark

| Token | Hex | Role |
|---|---|---|
| Background | #0B0B0B | Main canvas |
| Foreground | #F0F0E8 | Primary text |
| Muted | #6E6E69 | Secondary text |
| Dim | #333330 | Inactive text/rules |
| Panel | #131313 | Terminal/card surfaces |
| Accent | #D7FF3F | Active/highlight state |

## Light

| Token | Hex | Role |
|---|---|---|
| Background | #F5F5EF | Main canvas |
| Foreground | #11110F | Primary text |
| Muted | #6A6A63 | Secondary text |
| Dim | #C5C5BD | Inactive text/rules |
| Panel | #E9E9E2 | Terminal/card surfaces |
| Accent | #8AAE00 | Active/highlight state |

The light theme is not a simple inversion. It is an intentionally warmer editorial palette.

---

# 4. Navigation

Persistent top bar.

Identity interaction:

```text
rest:
DS.

hover/focus:
Designer
```

The morph should feel like a single object expanding rather than two unrelated labels swapping.

Navigation labels:

```text
WORK
ABOUT
EXPERIMENTS
```

Add directional arrow.

Theme control:
- compact
- editorial
- clearly clickable
- supports keyboard focus
- dark/light state should be visually obvious

---

# 5. Hero

Primary statement:

```text
AI ENGINEER
DESIGN ENTHUSIAST
```

Name:

```text
DIVYANSHU SINGH.
```

The name is the strongest visual object.

Supporting copy uses typewriter behavior.

The first viewport should communicate the entire identity before requiring the visitor to understand project details.

---

# 6. Scroll behavior

Scrolling should feel:
- smooth
- eased
- slightly delayed
- cinematic

Do not make scrolling sluggish.

Use browser-native smooth behavior and carefully tuned transform/reveal effects rather than fighting the browser's scroll model.

---

# 7. Encrypted welcome

Short welcome message.

Animation:

```text
░░░░░░░░
  ↓
W░░C░░M░
  ↓
WELCOME
```

The visual texture should resemble controlled signal decoding, not a hacker cliché.

Keep duration short.

---

# 8. Typewriter

Use for the hero/supporting statement.

Visual:
- normal editorial text
- blinking cursor
- character-by-character entry

Do not use typewriter everywhere. It is a personality accent.

---

# 9. TextGenerateEffect

Use in the About/editorial section.

Visual progression:

```text
blur + dim
     ↓
blur + visible
     ↓
sharp + bright
```

Word-level timing creates a calm editorial reveal.

---

# 10. Scroll saturation

The design uses two conceptual text states:

```text
inactive / dim
active / foreground
```

As the visitor scrolls, active text progressively becomes readable.

Avoid a binary “on/off” look.

---

# 11. Projects

The project presentation is intentionally concise.

Each project:

```text
PROJECT TITLE
one-line explanation

ROLE / YEAR / TYPE
STACK / STATUS
```

A visitor should understand the project in 3–5 seconds.

Do not turn the landing page into a case-study archive.

---

# 12. Hover quick view

Desktop:
- hover/focus reveals a compact preview card
- card floats without destroying surrounding hierarchy

Mobile:
- tap opens equivalent preview/detail state

Use transform/opacity.

Do not shift the entire page unexpectedly.

---

# 13. Terminal

The terminal is a visual metaphor for engineering.

Recommended appearance:
- near-black panel
- tiny top chrome
- monospace
- subtle syntax colors
- command prompt
- blinking cursor
- typed sequence

It is a simulated interface, not a real terminal.

---

# 14. Quote

Large typographic statement.

Supporting details:
- small syntax-like markers
- cursor
- thin rules

The quote should visually interrupt the otherwise structured page.

---

# 15. Motion specimen section

Use this section to document the visual language inside the prototype:

### Encrypted
Arrival.

### Typewriter
Voice.

### Blur reveal
Editorial reading.

### Cursor
Engineering personality.

Do not let the specimen section become visually louder than the actual portfolio.

---

# 16. Experiments

Rows rather than large cards.

Interaction:
- row brightens
- metadata becomes visible
- arrow shifts subtly
- optional quick preview

The page should feel like a lab notebook.

---

# 17. CTA

Primary:

```text
LET'S BUILD
SOMETHING
INTERESTING.
```

Background:
- dotted field
- subtle glow
- large negative space

The CTA should feel like a natural conclusion rather than a sales banner.

---

# 18. Footer

Footer uses aligned columns:

```text
CONTACT
NAV
SOCIAL
CURRENTLY
```

Then a giant low-opacity wordmark:

```text
DIVYANSHU SINGH.
```

The faded mark is a signature.

---

# 19. Project carousel

Preferred visual direction from the Apple Cards Carousel reference:

```text
PROJECTS, IN MOTION.

[ AI SYSTEMS ]
[ COMPUTER VISION ]
[ CREATIVE ENGINEERING ]
[ AUTOMATION ]
```

Interaction:
- horizontal movement
- active card
- previous/next
- click to expand
- project detail
- progress `01—04`

The interaction should feel premium and tactile, while remaining restrained.

---

# 20. Theme transition

Dark → Light:

```text
#0B0B0B → #F5F5EF
#F0F0E8 → #11110F
#131313 → #E9E9E2
#6E6E69 → #6A6A63
#D7FF3F → #8AAE00
```

Use a single coordinated transition rather than independent random fades.

Suggested duration:
`350–550ms`

---

# 21. Interaction states

Every interactive element should have:

- rest
- hover
- focus
- active
- disabled/unavailable where relevant

Keyboard focus should visually match the site's editorial language.

---

# 22. Motion restraint

Do NOT:
- animate every heading
- continuously float every object
- use large bounce effects
- overuse blur
- use excessive spring physics
- add scroll hijacking
- make animations compete with content

Do:
- use small translations
- opacity
- blur
- width expansion
- saturation
- controlled stagger
- coordinated transitions

---

# 23. Design QA checklist

Before implementation is considered complete:

- [ ] Hero identity is obvious immediately.
- [ ] Name is the strongest typographic element.
- [ ] Dark theme matches the prototype palette.
- [ ] Light theme preserves hierarchy.
- [ ] Navigation remains persistent.
- [ ] `DS.` → `Designer` interaction works on hover and focus.
- [ ] Encrypted welcome resolves correctly.
- [ ] Typewriter cursor is stable.
- [ ] TextGenerate blur reveal works.
- [ ] Scroll saturation feels progressive.
- [ ] Projects are scannable.
- [ ] Quick view works without layout breakage.
- [ ] Terminal animation is restrained.
- [ ] Carousel expands correctly.
- [ ] CTA dotted glow remains subtle.
- [ ] Footer wordmark is faded.
- [ ] Reduced-motion mode works.
