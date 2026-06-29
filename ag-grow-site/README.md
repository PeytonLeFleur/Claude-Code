# Ag Grow Plus Lawncare — Marketing Site

A fast, animated single-page marketing site for **Ag Grow Plus Lawncare** (Newton &
Central Iowa). Rebuilt from the content of ag-grow.com into a modern, conversion-focused
experience.

## Stack

- **Vite + React + TypeScript** — fast static build, component structure
- **Tailwind CSS v4** — design tokens + utility styling (brand greens / soil / sky)
- **GSAP + ScrollTrigger** — scroll reveals, kinetic headlines, pinned horizontal scroll,
  stat counters
- **Lenis** — smooth scroll, synced to ScrollTrigger
- Respects `prefers-reduced-motion` throughout; mobile falls back to simpler layouts

## Sections

1. **Hero** — parallax lawn photo, kinetic headline, animated stat strip
2. **Programs** — Base vs. Base + Turf Protection comparison cards
3. **Why Timing Wins** — the “individual treatments fail” thesis + seasonal timeline
4. **How It Works** — pinned horizontal scroll through the 4-step process
5. **Services** — lawn care, mowing, leaf removal, snow removal
6. **Before / After** — draggable scrubber (overgrown → freshly striped, same yard)
7. **Snow Band** — per-storm pricing tiers
8. **Service Area** — the 18 communities served
9. **Quote** — validated request form (composes an email to the office)

## Imagery

Photography was generated and optimized with Higgsfield (see `public/images/`). The
before/after pair uses the same Iowa home shot from one angle so the scrubber lines up
seamlessly.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    layout/      Header, Footer, Logo, PageShell (mounts Lenis)
    animation/   ScrollReveal, AnimatedHeadline, MagneticButton
    sections/    Hero, Programs, WhyTiming, Process, Services,
                 BeforeAfter, SnowBand, ServiceArea, Quote
  hooks/         useLenis, usePrefersReducedMotion
  lib/           gsap (plugin registration), content (all copy/data)
```

All site copy lives in `src/lib/content.ts` so sections stay declarative and content is
easy to edit.

## Contact (business)

Ag Grow Plus Lawncare · Newton, IA · (641) 791-5296 · Office@Ag-Grow.com
