# Ag-Grow.com Improvement Loop — State

**Goal:** 10 improvement iterations on the `ag-grow-site/` marketing site, then a final report.
**Branch:** `claude/ag-grow-visit-1elzfw`
**Cron job:** `22ac2059` (every 3 min) — delete when iteration 10 is recorded.

**Completed iterations: 3 / 10**

Guardrails honored every iteration: no invented services/claims, source-backed copy only,
mobile not broken, phone/CTA/form never buried, no over-animation, no fake-looking visuals.

Source-backed facts available (from scrape): since 1998; 18 service-area towns; quotes
within 48 hrs; salt included on snow; residential & commercial; per-event or seasonal snow
pricing tiers (1-3"/4-7"/8-11"/12"+); priority scheduling for program customers; mowing to
3.5"; leaf removal no distance fees; Base vs. Base+Turf Protection programs; phone
(641) 791-5296; Office@Ag-Grow.com; Mon-Fri 6-4.

---

## Iteration 1

**Audit findings:** Strong hero, but no immediate trust-signal layer for a scanning local
buyer; dark hero hard-cut into the white Programs section; no visible keyboard focus styles
(a11y gap).

**10 ideas generated:**
1. Source-backed trust marquee under hero (#14 infinite horizontal).
2. Global `:focus-visible` rings for keyboard a11y.
3. Sticky click-to-call bar on mobile.
4. Animated number counters in a dedicated proof band.
5. Section-divider "blade" SVG transitions between dark/light sections (#46).
6. Parallax depth on service card images (#9).
7. Service-area map with animated pins (#23 route map).
8. Testimonial/quote reveal band (only if real testimonials exist — none in source, skip).
9. Scroll-progress indicator bar.
10. Hero headline SplitText polish.

**Ideas chosen:** #1 (trust marquee) + #2 (focus-visible) — highest trust impact, lowest risk.

**Files changed:** `src/lib/content.ts` (TRUST_POINTS), `src/components/sections/TrustBar.tsx`
(new), `src/index.css` (marquee keyframes + reduced-motion pause + focus-visible),
`src/App.tsx` (mount TrustBar between Hero and Programs).

**Higgsfield assets created:** none.

**Commands run:** `npm run build` (pass), Playwright screenshot verify (no page errors).

**Errors found / fixes:** none.

**Remaining opportunities:** mobile sticky call bar; animated service-area map; section
"blade" dividers; service-card parallax; proof-band counters; scroll progress.

---

## Iteration 2

**Audit findings:** On mobile the phone number is hidden (menu-only) and the primary CTA
requires scrolling — real contact friction for a tap-to-call local buyer. Header CTAs are
fine on desktop but absent in the mobile thumb zone.

**10 ideas generated:**
1. Sticky mobile contact bar (Call + Get a Quote) in the thumb zone.
2. Scroll-progress indicator at the top of the viewport.
3. Section "blade"/wave dividers between dark and light bands (#46).
4. Parallax on service-card images (#9 depth gallery).
5. Animated service-area map with pins (#23).
6. Counters in a dedicated proof band (#counters).
7. Click-to-call telephone schema / tel: affordances throughout.
8. Sticky desktop "Get a Quote" that docks after hero.
9. Hover depth/tilt on program cards (#37).
10. Back-to-top affordance.

**Ideas chosen:** #1 (sticky mobile contact bar) — highest mobile conversion, lowest risk,
fast. Appears only after the hero so it never covers the hero CTAs; respects safe-area
insets; hidden on md+.

**Files changed:** `src/components/layout/MobileContactBar.tsx` (new), `src/App.tsx` (mount).

**Higgsfield assets created:** none.

**Commands run:** `npm run build` (pass), Playwright mobile (390x844) screenshot (no errors).

**Errors found / fixes:** none.

**Remaining opportunities:** scroll-progress bar; section blade dividers; service-card
parallax; animated service-area map; proof-band counters; program-card hover depth.

---

## Iteration 3

**Audit findings:** No FAQ — buyers' price/area/scheduling questions go unanswered before
the form (objection friction), and a missed SEO opportunity (no FAQPage structured data,
thin long-tail coverage). Content for answers already exists in the scrape.

**10 ideas generated:**
1. FAQ accordion (source-backed) + FAQPage JSON-LD.
2. Scroll-progress bar at top of viewport.
3. Section blade/wave dividers (#46).
4. Service-card image parallax (#9).
5. Animated service-area map with pins (#23).
6. Program-card hover tilt/depth (#37).
7. Sticky desktop quote button after hero.
8. Testimonials band (skip — no real testimonials in source).
9. Back-to-top button.
10. Animated SVG "blade" underline on section kickers (#22).

**Ideas chosen:** #1 (FAQ accordion + FAQPage schema) — strong conversion (answers
objections right before the quote form), strong SEO, 100% source-backed content.

**Files changed:** `src/lib/content.ts` (FAQS), `src/components/sections/Faq.tsx` (new),
`src/App.tsx` (mount before Quote), `index.html` (FAQPage JSON-LD mirroring the FAQs).

**Higgsfield assets created:** none.

**Commands run:** `npm run build` (pass), Playwright screenshot + accordion click (no errors).

**Errors found / fixes:** none. Accordion is keyboard-accessible (button + aria-expanded +
aria-controls), reduced-motion safe.

**Remaining opportunities:** scroll-progress bar; section blade dividers; service-card
parallax; animated service-area map; program-card hover depth; back-to-top.
