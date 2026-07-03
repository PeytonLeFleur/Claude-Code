# HivePocket Improvement Loop — State

**Goal:** Build HivePocket (offline-first beekeeping inspection tracker) to MVP-complete,
one guarded iteration at a time, then a final report.
**Branch:** `claude/model-routing-safeguards-f4ed3o`
**App root:** `hive-pocket/`
**Cron job:** `7d774d61` (every ~6 min) — delete when the loop is recorded COMPLETE.

**Completed iterations: 0 (foundation) / target ~10.**

---

## Governing rules (from `CLAUDE.md` + `hive-pocket/CLAUDE.md`) — honored every iteration

- **Model routing (documented):** Haiku reads · Sonnet builds · Opus seats (plan/judge/review)
  · **Fable is ask-first and is NEVER invoked by the loop.** The loop runs on the current
  session model only — this is the "don't burn Fable" safeguard, enforced by simply not calling it.
- **Guarded change:** branch → PR → check → merge → deploy → verify. The loop commits to the
  branch and **never merges or opens a PR itself.** No production deploy without an explicit "go".
- **Money / migrations / security are scaffold-and-flag only:** paywall, RevenueCat keys,
  Supabase migration, `rc-webhook`, RLS. Never wired to real credentials in an autonomous iteration.
- **Product guardrails:** offline save-first; CSV/PDF export never paywalled; AI is assist-only
  with sourced disclaimers (no definitive treatment advice); no invented facts; giant tap targets.

## Static verification gate — must ALL pass before any iteration commits

`npm run typecheck` (tsc --noEmit) · `npm run lint` · `npm test` (Jest) ·
`npm run web:export` (best-effort runtime smoke). No simulator / EAS / real purchase exists in
this sandbox — native and purchase paths are flagged for on-device review, never claimed tested.

## Build order (from HivePocket research `recommended_build_order`)

- [x] 0. Foundation: project shell, offline domain core, payments layer scaffold, first screens, tests
- [ ] 1. Hive/apiary setup UI + CSV import (export logic already in `lib/csv.ts`)
- [ ] 2. Offline inspection form with giant tap targets
- [ ] 3. Voice-to-note + photo attachments (interfaces/stubs where native-only)
- [ ] 4. Risk dashboard polish + next-action reminder generation
- [ ] 5. Mite-count calculator screen + treatment reminder scheduling
- [ ] 6. Cloud backup + annual subscription paywall (scaffold-and-flag)
- [ ] 7. Mentor/helper read-only sharing
- [ ] 8. Advanced reports + club/sideliner features

## Per-iteration procedure

1. Read this file + both `CLAUDE.md` files. Pick the next unchecked build-order item.
2. Audit the current state of that area; generate ~10 ideas; pick the highest-value /
   lowest-risk one or two that fit one iteration.
3. Implement, honoring every guardrail above. Money/migration/security → scaffold + flag, never wire.
4. Run the full static gate. Fix until green. Never commit red.
5. Commit to the branch with a clear message; push with backoff. Do NOT merge or open a PR.
6. Append an iteration entry below (audit → ideas → chosen → files → commands → errors/fixes →
   remaining). Tick the build-order box when an item is truly done.
7. When MVP is feature-complete (~build order 1–6 done), mark COMPLETE, post a plain-English
   summary, and delete the cron job.

---

## Iteration 0 — Foundation

**Audit findings:** Greenfield. No app existed — the two attached JSONs were a subscriptions
spec (titan) and market research (HivePocket), not code. Needed a verifiable Expo/TS foundation
plus the governing rules the branch name calls for.

**Built:**
- **Rules:** repo `CLAUDE.md` (model lanes + guarded-change), `hive-pocket/CLAUDE.md`
  (project lane + product guardrails), `AGENTS.md` pointer.
- **Project shell:** Expo SDK 57 + expo-router + TS; `package.json`, `app.json`, `tsconfig`,
  `babel/metro`, `jest`, `eslint` flat config. `npm install` clean (854 pkgs).
- **Offline domain core (pure, tested):** `lib/types.ts`, `lib/mites.ts` (mites/100 bees +
  HBHC 3% threshold), `lib/risk.ts` (worst-signal colony colour), `lib/dashboard.ts`
  (derived cards), `lib/csv.ts` (export — free core), `lib/store.ts` (Zustand + persist via
  AsyncStorage = save-first offline).
- **Payments layer (from titan boilerplate):** `lib/purchases.ts`, `hooks/useEntitlement.ts`,
  `lib/paywall.ts`, `lib/supabase.ts`, with `.web.ts` stubs so the web bundle omits native RC.
- **Money/migration scaffold (flagged, not wired):** `supabase/migrations/0001_subscriptions.sql`,
  `supabase/functions/rc-webhook/index.ts`.
- **Screens:** `app/_layout.tsx`, tabs (`Apiary` dashboard + `Tasks`), `hive/[id]` timeline,
  `paywall`. Glove-friendly cards via `components/HiveCard.tsx`.
- **Tests:** 31 Jest cases across mites/risk/dashboard/csv.

**Model routing:** ran entirely on the current session model. Fable not invoked. No merge, no PR.

**Commands run:** `npm install` (clean) · `npx jest` (31/31 pass) · `npx tsc --noEmit` (clean) ·
`npx eslint .` (clean) · `npx expo export --platform web` (8 routes rendered — real smoke).

**Errors found / fixes:** react pin 19.2.0 failed RN 0.86 peer (needs ≥19.2.3) → bumped to 19.2.7.

**Remaining opportunities:** everything in build order 1–8. Next up: item 1 — apiary/hive
setup UI wired to the store, and a CSV export/share action surfacing `lib/csv.ts`.
