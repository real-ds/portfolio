# Personal Portfolio — Divyanshu Singh

A premium, editorial-style portfolio website built with **Next.js 16.3.4**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. The site communicates Divyanshu's identity as a Creative Programmer · AI Developer · Designer through intentional typography, restrained motion, and interactive project presentation.

## 🎨 Design Philosophy

The site follows a **dark editorial × engineering terminal × cinematic interaction** language:

- **Oversized typography** — Name "DIVYANSHU SINGH" is the strongest visual element
- **Intentional negative space** — Large areas of breathing room around content
- **Near-black canvas** — `#0B0B0B` dark theme, warm light alternative
- **Mutating text hierarchy** — Text becomes brighter through interaction/scroll
- **Sparse accent color** — Wine red `#722F37` / neon crimson `#FF0033`
- **Smooth, eased movement** — Purpose-driven animation, not decoration
- **Concise project presentation** — Understandable in 3–5 seconds
- **Interaction as discovery** — Hover reveals, scroll-triggered animations

### Motion Principles

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

All animations have semantic jobs and communicate state, hierarchy, discovery, or personality.

## 🖥️ Built Features

### 1. Design Philosophy Section (`design-planning-theory.tsx`)
- **3-layer hover interaction** on each phase title (number + title):
  - Layer 1: Original white typography (baseline, always visible)
  - Layer 2: Red editorial surface `#FF003C` grows left→right via `scaleX`
  - Layer 3: Black duplicate text clipped with `clipPath: inset()` syncing with Layer 2
- Hover animates a `useMotionValue` from 0→1 over 0.55s with ease `[0.22, 1, 0.36, 1]`
- Touch devices: no hover, text stays white

### 2. Projects Section (`project-list.tsx`)
- **Apple Cards Carousel-inspired styling**:
  - Expanded container: `md:py-10` (responsive: 1.5rem → 2.5rem on md+)
  - Problem/Solution grids: `p-4` (reduced from `p-5`)
- **GitHub + Live Demo buttons** in title area (top right corner) of expanded state:
  - GitHub: SVG icon with hover `hover:text-[var(--foreground)]`
  - Live Demo: Button with `font-medium`, rounded borders, hover `bg-[var(--accent)] hover:text-[var(--bg)]`, shadow and focus ring
- **Project image repositioned** before Problem & Solution section
- **Fixed conditional rendering**: Changed `project.githubUrl && project.githubUrl !== "#"` to `project.githubUrl` (same for `liveDemoUrl`) since all projects have `githubUrl: "#"` and `liveDemoUrl: "#"` - buttons now render correctly

### 3. Project Interaction
- **Compact row** — Grid layout with fixed number column, GitHub/Live Demo links with hover animations
- **Expanded state** — Title → Project Preview → Problem & Solution → Tech Stack → Actions
- **Motion-assisted expansion** on GitHub/Live Demo buttons with scale/translate effects
- **Progress indicator `01—04`** on project carousel

### 4. Core Pages
- **Hero** — "DIVYANSHU SINGH" with typewriter tagline "Incorporating Code with Creativity"
- **Design & Planning Theory** — 5-phase scroll journey (SEE → DESIGN → BUILD → ITERATE → IMPACT)
- **Selected Work** — AI Projects + SDE Projects categories
- **About Me** — Identity + two-point summary
- **CTA** — "HAVE A PROBLEM WORTH SOLVING? LET'S BUILD SOMETHING MEANINGFUL."
- **Footer** — Signature "DIVYANSHU SINGH" wordmark

### 5. Motion & Animation
- **Framer Motion** for all choreography
- **Shared motion vocabulary**: `fast: 0.18`, `standard: 0.35`, `reveal: 0.55`, `cinematic: 0.8`, `stagger: 0.035`
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` throughout
- **Intersection Observer** for loader, text generation, typewriter, terminal reveal, scroll-triggered project entrances
- **Respects `prefers-reduced-motion`** — disables scrambling loops, long transitions, parallax

### 6. Color System

**Dark theme:**
- `--bg: #0B0B0B` | `--foreground: #F0F0E8` | `--muted: #6E6E69` | `--dim: #333330` | `--panel: #131313` | `--accent: #D7FF3F`

**Light theme:**
- `--bg: #F5F5EF` | `--foreground: #11110F` | `--muted: #6A6A63` | `--dim: #C5C5BD` | `--panel: #E9E9E2` | `--accent: #8AAE00`

### 7. Navigation
- Persistent top bar with `DS.` identity (hover expands to `Designer`)
- WORK / ABOUT / EXPERIMENTS links
- Theme toggle (dark/light with visual state communication)
- Directional arrow

### 8. Accessibility
- Never encode meaning using color alone
- Maintain readable contrast in both themes
- Provide visible keyboard focus
- Respect `prefers-reduced-motion`
- Hover-only information has equivalent focus/tap path
- Theme toggle has accessible name and state
- Encrypted text final text available in DOM
- No flashing or rapidly changing text

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

# Open http://localhost:3000 in your browser
```

## 📁 Project Structure

```
src/
  app/
    page.tsx        # Home page
    layout.tsx      # Root layout with ThemeProvider
  components/
    design-planning-theory.tsx  # 5-phase scroll journey with hover interaction
    project-list.tsx              # Projects grid with expanded state
    project-detail-modal.tsx      # Large project modal/overlay
    navigation.tsx                # Persistent top bar
    hero.tsx                      # Hero section with typewriter
    footer.tsx                    # Signature footer
    loading-screen.tsx            # Encrypted text launcher
    theme-toggle.tsx              # Dark/light theme switch
  lib/
    motion.ts                   # Motion tokens & easing
    content.ts                  # Project data (aiProjects, sdeProjects)
    accessibility.ts            # A11y utilities
  utils/
    cn.ts                       # Class name composer
```

## 🛠️ Tech Stack

- **Next.js 16.3.4** — App Router
- **React 19** — Latest React
- **Tailwind CSS v4** — Utility-first styling
- **TypeScript** — Type-safe codebase
- **Framer Motion** — Animation/choreography
- **Intersection Observer** — Scroll-linked effects

## 📦 Available Scripts

```bash
npm run dev    # Development server
npm run build  # Production build
npm run lint   # Lint check
npm run typecheck  # TypeScript check
```

## 📸 Screenshots

*(Screenshots would be added here)*

## 📜 Design References

- **Figma prototype**: `Personal Portfolio — AI Engineer × Design`
- **Figma file**: https://www.figma.com/design/VdnOnJVngcNi5To9X6ndQi
- **PRD**: Product requirements and goals
- **DESIGN**: Visual & interaction specification
- **TRD**: Technical requirements and architecture
- **PORTFOLIO**: Comprehensive portfolio narrative and content

## 🤖 Philosophy

>The portfolio should communicate Divyanshu as someone who sees real-world problems, designs and plans solutions creatively, uses engineering discipline to build robust systems, leverages AI according to the needs of the problem, builds iteratively, and cares deeply about the value and impact delivered to the end user.

>The experience is intentionally dark, editorial, typographic and cinematic, with restrained motion. Animation must communicate state, hierarchy, discovery or personality rather than exist as decoration.

>No AI chatbot on the portfolio. No generic SaaS dashboard aesthetic. No excessive gradients. No stock-photo-heavy portfolio.

## 📞 Contact

- **Email**: Placeholder (add later)
- **LinkedIn**: Placeholder (add later)
- **Medium**: Placeholder (add later)
- **Resume**: Opens PDF in new tab

---

*Built with precision for Divyanshu Singh — Creative Programmer · AI Developer · Designer*