# Ag-Grow.com Improvement Loop — State

**Goal:** 10 improvement iterations on the `ag-grow-site/` marketing site, then a final report.
**Branch:** `claude/ag-grow-visit-1elzfw`
**Cron job:** `22ac2059` (every 3 min) — delete when iteration 10 is recorded.

**Completed iterations: 9 / 10**

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

---

## Iteration 4

**Audit findings:** Service Area section told but didn't *show* coverage — just a static chip
list. User explicitly prioritized service-area motion (#23). Opportunity for local
credibility + premium visual.

**10 ideas generated:**
1. Stylized coverage-hub diagram (Newton center, radar rings, town nodes) — #22/#23.
2. Literal geo map (rejected — risk of inaccurate coordinates / fake feel).
3. Service-card image parallax (#9).
4. Program-card hover tilt (#37).
5. Scroll-progress bar.
6. Animated SVG underline on kickers (#22).
7. Back-to-top button.
8. Counters proof band.
9. Section blade dividers (#46).
10. Hover spotlight on cards (#31).

**Ideas chosen:** #1 (coverage-hub diagram). Abstract hub (clearly not a literal map, so no
false geography), Newton centered with pulsing node, radar range rings drawing outward on
scroll, town nodes with labels staggering in. Town names ALSO kept as readable chip text
below for SEO + screen readers.

**Files changed:** `src/components/sections/ServiceAreaMap.tsx` (new SVG),
`src/components/sections/ServiceArea.tsx` (swap chip grid for map + keep readable town list).

**Higgsfield assets created:** none.

**Commands run:** `npm run build` (pass), Playwright desktop + mobile (390) screenshots.

**Errors found / fixes:** edge town labels clipped the viewBox — fixed by padding the
viewBox to `-48 -12 496 424`. Re-verified desktop + mobile, no clipping, no page errors.

**Remaining opportunities:** scroll-progress bar; section blade dividers; service-card
parallax; program-card hover depth; back-to-top; hover spotlight.

---

## Iteration 5

**Audit findings:** Biggest gap was credibility content — the scrape has a real founding
story (established 1998 in Jasper County, grown from fertilization into full-service) but the
site never told "who you're hiring." No about/story beat existed at all.

**10 ideas generated:**
1. "Locally owned since 1998" story section + credibility pillars (source-backed).
2. Parallax accent image (#9) inside that section.
3. Program-card hover tilt (#37).
4. Scroll-progress bar.
5. Section blade dividers (#46).
6. Back-to-top button.
7. Animated SVG underline on kickers (#22).
8. Team headshots (rejected — would need real photos; AI faces look fake; avoid).
9. Hover spotlight on cards (#31).
10. Counters in story pillars.

**Ideas chosen:** #1 + #2 — story section with a parallax macro-turf image, founding copy,
a "1998" badge, and four credibility pillars (Founded 1998 / 25+ yrs / Local crews /
Residential & commercial). All facts from the About scrape; no staff names or invented
claims. Combines the missing trust content with the prioritized image-parallax effect.

**Files changed:** `src/lib/content.ts` (ABOUT), `src/components/sections/Story.tsx` (new),
`src/App.tsx` (mount between SnowBand and ServiceArea).

**Higgsfield assets created:** none (reused existing lawn-care.jpg; avoided AI people).

**Commands run:** `npm run build` (pass), Playwright screenshot (no errors).

**Errors found / fixes:** none in code. Screenshot harness needed wheel-scrolling (Lenis
ignores native scrollIntoView) — tooling only, not a site issue.

**Remaining opportunities:** scroll-progress bar; section blade dividers; program-card hover
depth; back-to-top; hover spotlight; animated kicker underline.

---

## Iteration 6

**Audit findings:** The Programs section is the conversion centerpiece but the cards were
completely static — no tactile feedback where buyers decide, which undercut the premium feel.

**10 ideas generated:**
1. Pointer-driven 3D tilt + lift + cursor sheen on program cards (#37 hover depth / #31 spotlight).
2. Scroll-progress bar.
3. Section blade dividers (#46).
4. Back-to-top button.
5. Animated kicker underline (#22).
6. Hover lift on service cards.
7. Sticky "compare plans" mini-nav.
8. Price-anchor microcopy reveal.
9. Morphing CTA arrow on hover (#33).
10. Magnetic CTA buttons inside cards (#4, already used in hero).

**Ideas chosen:** #1 — a reusable TiltCard (subtle ≤5° tilt + 6px lift + radial cursor sheen)
applied to both program cards. Animation isolated in TiltCard; ScrollReveal still handles
entrance. Disabled on touch (hover/pointer media query) and under reduced motion.

**Files changed:** `src/components/animation/TiltCard.tsx` (new),
`src/components/sections/Programs.tsx` (wrap cards in TiltCard, move card visuals onto it),
`src/index.css` (.tilt-card sheen + reduced-motion/touch guards).

**Higgsfield assets created:** none.

**Commands run:** `npm run build` (pass), Playwright desktop hover + mobile (390) screenshots.

**Errors found / fixes:** Removed the highlighted card's `lg:-translate-y-3` (conflicted with
GSAP transforms); prominence now from dark bg + shadow + badge. Verified equal-height cards
and correct mobile stacking; no page errors.

**Remaining opportunities:** scroll-progress bar; section blade dividers; back-to-top;
animated kicker underline; service-card hover lift.

---

## Iteration 7

**Audit findings:** Long single-page site with zero orientation cues — no scroll-progress
indicator and the nav never shows the current section. Premium/UX gap that also keeps the
page structure legible (helps conversion).

**10 ideas generated:**
1. Thin scroll-progress bar at top of viewport (#32-ish).
2. Active-section nav highlighting (IntersectionObserver) + underline.
3. Section blade dividers (#46).
4. Back-to-top button.
5. Service-card hover lift.
6. Animated kicker underline (#22).
7. Smooth-scroll offset for anchor jumps under the fixed header.
8. Reading-time/section dots rail.
9. Hover spotlight on service cards (#31).
10. Sticky mini section-nav on desktop.

**Ideas chosen:** #1 + #2 — scroll-progress bar (position-driven, rAF-throttled, decorative
aria-hidden) and active-section nav with an animated underline (aria-current set on the live
link). Both orientation wins, no content change, reduced-motion safe.

**Files changed:** `src/components/layout/ScrollProgress.tsx` (new),
`src/components/layout/Header.tsx` (IntersectionObserver active section + underline +
aria-current), `src/App.tsx` (mount ScrollProgress).

**Higgsfield assets created:** none.

**Commands run:** `npm run build` (pass), Playwright scroll test — confirmed `aria-current`
lands on "Services" when that section is in view; no page errors.

**Remaining opportunities:** section blade dividers; back-to-top; service-card hover lift;
animated kicker underline; anchor scroll offset under fixed header.

---

## Iteration 8

**Audit findings:** Two real correctness bugs: (1) og:image pointed to /images/hero.jpg,
which doesn't exist (renamed after-mow.jpg) — social shares had no preview, and no Twitter
card/canonical existed; (2) nav-link jumps tucked section headings under the fixed header
(no scroll-margin-top).

**10 ideas generated:**
1. Fix og:image to a real, absolute URL.
2. Add Twitter summary_large_image card tags.
3. Add canonical + og:url + og:site_name.
4. scroll-margin-top on anchor-target sections.
5. Back-to-top button.
6. Section blade dividers (#46).
7. Service-card hover lift.
8. Preload the hero image for LCP.
9. Width/height on images to cut CLS.
10. sitemap.xml / robots.txt.

**Ideas chosen:** #1–#4 (grouped SEO + UX correctness). Real bug fixes, zero content risk.

**Files changed:** `index.html` (og:image -> https://www.ag-grow.com/images/after-mow.jpg,
og:url, og:site_name, og:image:alt, twitter card tags, canonical),
`src/index.css` (section[id] { scroll-margin-top: 5.5rem }).

**Higgsfield assets created:** none.

**Commands run:** `npm run build` (pass); confirmed built dist/index.html references the
existing image; Playwright nav-click test shows #services lands at 88px (clear of header).

**Errors found / fixes:** the broken OG image path was itself the bug being fixed. No new
errors.

**Remaining opportunities:** back-to-top; service-card hover lift; section dividers; hero
preload for LCP; sitemap/robots; image width/height for CLS.

---

## Iteration 9

**Audit findings:** As a React SPA, the hero LCP image only starts downloading after the JS
bundle executes (real LCP cost). No robots.txt or sitemap.xml for crawlers.

**10 ideas generated:**
1. Preload the hero image for faster LCP.
2. robots.txt allowing crawl + sitemap reference.
3. sitemap.xml (single homepage URL).
4. Non-blocking font load (rejected — risks serif FOUT; display=swap already handles it).
5. Width/height on images for CLS.
6. Back-to-top button.
7. Lazy-mount heavy below-fold sections (rejected — complexity/risk this late).
8. Service-card hover lift.
9. Section dividers (#46).
10. Compress/serve WebP variants (rejected — current JPGs already small, ~2MB total).

**Ideas chosen:** #1–#3 — preload hero (LCP), robots.txt, sitemap.xml. All low-risk
perf/crawlability wins; no content or layout change.

**Files changed:** `index.html` (hero image preload), `public/robots.txt` (new),
`public/sitemap.xml` (new).

**Higgsfield assets created:** none.

**Commands run:** `npm run build` (pass); confirmed robots.txt + sitemap.xml copied to dist
and served 200; verified no "preload unused" warning (URL matches the hero img exactly).

**Errors found / fixes:** none. (The ERR_CONNECTION_CLOSED in the headless console is the
sandbox blocking Google Fonts — environment artifact, not a site bug; fonts use display=swap.)

**Remaining opportunities:** back-to-top; service-card hover lift; section dividers; image
width/height for CLS; WebP variants.
