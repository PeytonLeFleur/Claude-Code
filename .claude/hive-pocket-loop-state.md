# HivePocket Improvement Loop — State

**Goal:** Build HivePocket (offline-first beekeeping inspection tracker) to MVP-complete,
one guarded iteration at a time, then a final report.
**Branch:** `claude/model-routing-safeguards-f4ed3o`
**App root:** `hive-pocket/`
**Cron job:** `7d774d61` (every ~6 min) — delete when the loop is recorded COMPLETE.

**Completed iterations: 1 / target ~10.**

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
- [x] 1. Hive/apiary setup UI + CSV import/export (surfaced in a Data tab)
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

---

## Iteration 1 — Hive/apiary setup UI + CSV import/export

**Audit findings:** The dashboard "+ Add hive" FAB *faked* creation — auto-named "Home Yard" /
"Hive N" with no user input, no yard choice, no install date. `lib/csv.ts` export logic existed
but was surfaced **nowhere** — the free-export core promise was unreachable. No CSV import, no
apiary management.

**~10 ideas:** real New-hive modal (name + yard picker); inline new-apiary creation; a Data tab
surfacing CSV export; CSV paste-import (cross-platform, no native file picker); apiary
section-grouping; edit/delete; empty-state CTA → creation; free-tier hint; reusable form
primitives; full-JSON backup.

**Chosen (fits one iteration, completes item 1):** real hive/apiary **creation UI** + **CSV
export surfaced** (copy to clipboard — works web + native, keeps the gate green) + **CSV
paste-import** backed by a pure, tested parser. Deferred native file/share export to a later
on-device iteration (needs a real device to verify anyway).

**Built:**
- `lib/csv.ts`: `parseCsv` (RFC-4180-ish: quotes, "" escapes, embedded newlines, CRLF),
  `parseHivesCsv` (tolerant header mapping, skips hive-less rows, never throws), `hivesToCsv`
  (round-trips with the parser).
- `lib/store.ts`: `importHives(rows)` — find-or-create apiary by name (incl. within one batch),
  bulk-add hives, returns count.
- `app/hive/new.tsx`: glove-friendly New-hive modal — name, yard chips + inline new-yard field,
  optional install date; disabled-until-valid save; writes straight to the offline store.
- `app/(tabs)/data.tsx`: Data tab — copy hives/inspections CSV, paste + import hives, live status.
- Wiring: registered `hive/new` modal route; added Data tab; dashboard FAB + empty state now open
  the real creation flow (removed the fake auto-add).
- Dep: `expo-clipboard@57` (web + native).

**Model routing:** ran on the current session model. Fable not invoked. No merge, no PR.

**Commands run:** `npm i expo-clipboard` (clean) · `npx tsc --noEmit` (clean) · `npx eslint .`
(clean) · `npx jest` (38/38, +7 new CSV cases) · `npx expo export --platform web` (11 routes).

**Errors found / fixes:** none — gate green first pass.

**Remaining opportunities:** native file/share export + document-picker import (on-device);
apiary section-grouping and edit/delete on the dashboard. Next up: item 2 — the offline
one-tap inspection form with giant tap targets, writing `Inspection` records to the store.
