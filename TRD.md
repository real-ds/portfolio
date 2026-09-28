# TRD — Technical Requirements
## Personal Portfolio — AI Engineer × Design Enthusiast

---

## 1. Recommended stack

### Application
- React
- TypeScript
- Next.js preferred for production
- CSS / CSS Modules or Tailwind only where useful
- Framer Motion or Motion for complex motion choreography

### Rendering
Prefer semantic HTML and CSS transforms/opacity for animation.

Avoid JavaScript-driven per-frame layout calculations where CSS or Intersection Observer can do the job.

---

## 2. Architecture

Suggested structure:

```text
app/
  page.tsx
  layout.tsx
  globals.css

components/
  navigation/
  hero/
  encrypted-text/
  typewriter/
  text-generate/
  scroll-saturation/
  project-list/
  apple-project-carousel/
  terminal/
  theme-toggle/
  dotted-glow/
  footer/

lib/
  motion/
  content/
  accessibility/

public/
  projects/
```

Keep content separate from presentation so projects can be changed without rewriting components.

---

## 3. Design tokens

### Dark theme

```css
--bg: #0B0B0B;
--foreground: #F0F0E8;
--muted: #6E6E69;
--dim: #333330;
--panel: #131313;
--accent: #D7FF3F;
```

### Light theme

```css
--bg: #F5F5EF;
--foreground: #11110F;
--muted: #6A6A63;
--dim: #C5C5BD;
--panel: #E9E9E2;
--accent: #8AAE00;
```

Do not hard-code these values repeatedly. Map them to CSS variables/design tokens.

---

## 4. Typography

Typography is a primary visual element.

Requirements:
- oversized hero/name typography
- compact uppercase metadata
- editorial spacing
- monospace for terminal/code UI
- muted → active saturation hierarchy

Use a display face with strong geometry and a highly readable sans/mono pairing. The exact production font can be selected during implementation, but typography must preserve the Figma hierarchy.

---

## 5. Navigation

Persistent navigation.

Elements:
- `DS.` identity
- hover state that expands/reveals `Designer`
- WORK
- ABOUT
- EXPERIMENTS
- theme toggle
- directional arrow

Theme control should communicate:
- current mode
- available alternate mode
- active state
- keyboard focus

---

## 6. Theme switching

Theme switching must be functional in the production site.

Implementation:

```ts
type Theme = "dark" | "light";
```

Persist the preference in `localStorage`.

Avoid flash of incorrect theme by resolving the stored/system theme before first paint.

Recommended transition:

```text
background + foreground + muted + panel + accent
0.35s–0.55s
ease-out / custom cubic-bezier
```

Do not animate every property indiscriminately. Limit the transition to theme-relevant properties.

---

## 7. Animation system

Create a shared motion vocabulary.

Suggested tokens:

```ts
const motion = {
  fast: 0.18,
  standard: 0.35,
  reveal: 0.55,
  cinematic: 0.8,
  stagger: 0.035,
};
```

Recommended easing:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Use a consistent easing family instead of unrelated animation curves.

---

## 8. Intersection Observer

Use Intersection Observer for:
- encrypted loader completion
- text generation
- typewriter sections
- terminal reveal
- scroll-triggered project entrances

Avoid repeatedly attaching expensive scroll listeners to every element.

For scroll-linked saturation, one centralized observer/scroll mechanism is preferable.

---

## 9. EncryptedText

### Behavior
Unrevealed characters continuously cycle through a controlled character set while revealed characters remain fixed.

Sequence:

```text
SCRAMBLED → PARTIALLY RESOLVED → FULLY RESOLVED
```

Trigger:
- initial page arrival
- optionally `inView`

Requirements:
- deterministic enough to avoid visual chaos
- short duration
- final text available in DOM
- no accessibility regression

Suggested character set:

```text
ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
```

Optional sound must be disabled by default.

---

## 10. TypewriterEffect

### Behavior

Characters appear sequentially:

```text
_ → A_ → AI_ → AI  E_ → AI ENGINEER_
```

Use a blinking cursor.

Rules:
- preserve spaces
- cursor must not cause layout shift
- final content remains selectable
- can trigger once
- configurable speed

Recommended initial typing interval:
`35–60ms/character`

---

## 11. TextGenerateEffect / blur reveal

Each word begins:
- low opacity
- blurred
- slightly displaced

Then transitions to:
- opacity 1
- blur 0
- normal position

Recommended:

```css
filter: blur(8px);
opacity: 0.15;
transform: translateY(8px);
```

to:

```css
filter: blur(0);
opacity: 1;
transform: translateY(0);
```

Duration:
`400–650ms`

Stagger:
`25–50ms`

---

## 12. Scroll-linked saturation

Initial state:

```text
DIM → MUTED → ACTIVE
```

The active copy should brighten as the relevant text crosses the viewport trigger zone.

Do not use abrupt opacity jumps.

The effect should feel like the page is “reading” the visitor's scroll position.

---

## 13. Hover identity interaction

Default:

```text
DS.
```

On hover:

```text
D → De → Des → Desi → Desig → Design → Designer
```

The interaction should:
- smoothly expand width
- type/reveal `Designer`
- preserve alignment
- reverse on pointer leave
- work on keyboard focus

This is an identity interaction, not a tooltip.

---

## 14. Terminal interaction

Terminal UI should include:
- command prompt
- fake/representative command sequence
- syntax highlighting
- typing/reveal
- viewport trigger
- optional sound disabled by default

Keep terminal behavior lightweight and decorative; it must not pretend to be an actual shell.

---

## 15. Project quick view

Hover/focus a project:

```text
normal
  ↓
preview affordance
  ↓
quick-view card
```

The quick view should not require navigating away.

On mobile:
- convert hover to tap
- preserve discoverability

---

## 16. Apple Cards Carousel

Adapt the supplied Apple Cards Carousel component.

Expected behavior:
- horizontal project cards
- previous/next
- card selection
- expandable project detail
- motion-assisted expansion
- progress indicator `01—04`

The project card should expose the same concise project summary used elsewhere.

Do not introduce unrelated visual styles from the original demo.

---

## 17. Dotted glow

CTA/footer background uses a subtle dotted field with glow.

Requirements:
- low contrast
- atmospheric
- never compete with CTA text
- animate only if useful
- respect reduced motion

Prefer CSS radial/repeating gradients or a lightweight canvas only if necessary.

---

## 18. Performance

Targets:
- 60fps for normal motion
- no layout thrashing
- use transform/opacity
- lazy-load project imagery
- avoid huge unoptimized images
- avoid continuous animation when section is off-screen

Use `will-change` sparingly.

---

## 19. Reduced motion

When:

```css
@media (prefers-reduced-motion: reduce)
```

then:
- disable scrambling loops
- remove long transitions
- remove parallax
- replace typewriter with immediate reveal
- replace blur animation with immediate opacity
- keep content visible

The site must remain fully usable.

---

## 20. Responsive behavior

Desktop is the reference composition.

Mobile requirements:
- preserve hierarchy
- reduce heading scale
- convert hover interactions to tap/focus
- collapse navigation appropriately
- make project cards horizontally scrollable
- keep CTA legible
- avoid horizontal overflow

---

## 21. SEO / semantics

Use:
- one clear H1
- semantic section landmarks
- descriptive links
- metadata/Open Graph
- meaningful page title
- accessible alt text

Animations must not be the only source of information.

---

## 22. Analytics

Keep analytics optional and privacy-conscious. Do not allow analytics instrumentation to influence the visual experience.

---

## 23. Browser support

Target current versions of:
- Chrome
- Edge
- Firefox
- Safari

Gracefully degrade advanced effects rather than breaking layout.
