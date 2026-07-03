# HivePocket Improvement Loop — State

**Goal:** Build HivePocket (offline-first beekeeping inspection tracker) to MVP-complete,
one guarded iteration at a time, then a final report.
**Branch:** `claude/model-routing-safeguards-f4ed3o`
**App root:** `hive-pocket/`
**Cron job:** `7d774d61` — DELETED at MVP-complete (this iteration).

**STATUS: COMPLETE — MVP feature-complete (build-order items 1–6 done).**
**Completed iterations: 6.**

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
- [x] 2. Offline inspection form with giant tap targets
- [x] 3. Photo attachments (real, cross-platform) + voice-to-note (interface stubbed/flagged)
- [x] 4. Risk dashboard polish + next-action reminder generation
- [x] 5. Mite-count calculator screen + treatment logging with reminder scheduling
- [x] 6. Cloud backup + annual subscription paywall (scaffold-and-flag)
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

---

## Iteration 2 — Offline one-tap inspection form

**Audit findings:** No inspection form existed — the hive timeline literally read "the one-tap
inspection form lands in a coming update." The store had `addInspection` and the `Inspection`
type, but nothing wrote real inspections. (Photos/voice = item 3, mite entry = item 5, so out
of scope here.)

**~10 ideas:** inspect modal with big segmented controls; reusable `SegmentedField`; healthy
"quick log" defaults; note field; live risk preview; launch from timeline; auto follow-up task
(item 4 — defer); inline mite entry (item 5 — defer); single source of truth for options;
edit-later (defer).

**Chosen:** the core field form — reusable big-target `SegmentedField`, a typed options module,
an `inspect/[hiveId]` modal that writes to the offline store, a live colony-risk preview
(reuses tested `colonyRisk`), launched from the hive timeline.

**Built:**
- `lib/inspectionOptions.ts`: queen/brood/temperament/stores option lists + healthy defaults,
  each pinned to the domain union with `satisfies` (a typo or drifted enum fails tsc).
- `components/SegmentedField.tsx`: generic 56px-min-height segmented picker, radio a11y.
- `app/inspect/[hiveId].tsx`: inspection modal — opens on healthy defaults (clean colony = one
  "Save" tap), note field, live risk preview, save-first write via `addInspection`.
- Wired: registered the `inspect/[hiveId]` modal route; hive timeline now has a "+ Log
  inspection" button and updated empty-state copy.

**Model routing:** current session model only. Fable not invoked. No merge, no PR.

**Commands run:** `npx tsc --noEmit` (clean) · `npx eslint .` (clean) · `npx jest` (38/38 —
options module is compile-time checked, no new runtime cases needed) · `npx expo export
--platform web` (12 routes, `/inspect/[hiveId]` added).

**Errors found / fixes:** none — gate green first pass.

**Remaining opportunities:** photo + voice-note capture on the inspection (item 3); auto-generate
a follow-up task on save (item 4); inline mite count during inspection (item 5). Next up: item 3
— photo attachments + voice-to-note (native-only pieces stubbed with sourced disclaimers).

---

## Iteration 3 — Photo attachments + voice-to-note interface

**Audit findings:** `Inspection.photos` existed in the type but was never populated; the inspect
form captured only a typed note. Photos are a native surface but `expo-image-picker` has real
web support, so they can be genuinely cross-platform; speech-to-text has no reliable
web/sandbox path, so per the build order it's "interface/stub where native-only."

**~10 ideas:** photo pick/capture; thumbnails in the form; photos in timeline; pure photo-list
util; dictation abstraction with `.web` stub; availability flag + disclaimer; manual-typing
fallback; per-photo remove; AI note-cleanup hook (assist-only — defer real AI); photo badge on
hive cards.

**Chosen:** real cross-platform photos (with a tested pure util) + voice-to-note as an honest,
disclaimed interface stub that degrades to typing — no faked STT.

**Built:**
- `lib/photos.ts` (pure, tested): `mergePhotos` (dedup, order-preserving, caps at 8),
  `removePhoto`. `__tests__/photos.test.ts` (+7 cases).
- `lib/dictation.ts` + `lib/dictation.web.ts`: `DictationCapability` interface reporting
  `available:false` with a clear reason; `dictate()` throws that reason. No invented STT.
- `app/inspect/[hiveId].tsx`: "＋" photo picker (`expo-image-picker`, permission-checked,
  multi-select, quality 0.7), removable thumbnails, a "🎤 Dictate" button that surfaces the
  honest reason and leaves the note typeable; photos saved onto the inspection.
- `app/hive/[id].tsx`: timeline entries now render photo thumbnails.
- Dep: `expo-image-picker@57` (web + native).

**Model routing:** current session model only. Fable not invoked. No merge, no PR.

**Commands run:** `npm i expo-image-picker` (clean) · `npx tsc --noEmit` (clean) · `npx eslint .`
(clean) · `npx jest` (45/45, +7 photo cases) · `npx expo export --platform web` (12 routes,
image-picker bundles cleanly on web).

**Errors found / fixes:** none — gate green first pass.

**Remaining opportunities:** real on-device STT wiring + camera capture (dev build); AI
note-cleanup (assist-only, disclaimed). Next up: item 4 — risk dashboard polish + auto-generating
next-action reminders (tasks) from inspections/treatments.

---

## Iteration 4 — Reminder engine + dashboard polish

**Audit findings:** The Tasks screen read `store.tasks` but **nothing ever created a task** — the
headline "automatic next-action reminders" was entirely missing. The dashboard sorted by urgency
but gave no at-a-glance summary.

**~10 ideas:** pure reminder suggestions from an inspection; from a treatment follow-up window;
mite-driven recheck/treatment (sourced disclaimer); queen/stores-driven tasks; dedup vs open
tasks; wire into inspection save; dashboard risk-summary header; overdue highlighting; configurable
interval (defer); snooze (defer).

**Chosen:** the reminder engine (pure, tested, deduped, wired into save) + dashboard summary bar
+ overdue styling.

**Built:**
- `lib/reminders.ts` (pure, tested): `suggestTasksForInspection` (routine inspection at a 14-day
  default; feeding on light/empty stores; queen follow-up; mite recheck at moderate, plan-treatment
  at high **with a "confirm against local guidance" caveat**), `suggestTasksForTreatment`
  (follow-up at the withdrawal window), `taskKey` + `newTaskDrafts` (dedup vs OPEN tasks, collapses
  in-batch dupes). `__tests__/reminders.test.ts` (+11 cases).
- `lib/store.ts`: `addTasks(drafts)` — adds only non-duplicate drafts, returns count.
- `app/inspect/[hiveId].tsx`: on save, auto-generates reminders from the new inspection.
- `app/(tabs)/index.tsx`: risk-summary pills (urgent/watch/ok/new counts, colour-dotted).
- `app/(tabs)/tasks.tsx`: overdue tasks render red with an "· overdue" tag.

**Model routing:** current session model only. Fable not invoked. No merge, no PR.

**Commands run:** `npx tsc --noEmit` · `npx eslint .` · `npx jest` (56/56) · `npx expo export
--platform web` (12 routes).

**Errors found / fixes:** tsc flagged a test-only excess-property error (object literal with extra
`dueAt` passed to `taskKey`) that ts-jest had tolerated — assigned to a variable to satisfy the
strict gate. Caught precisely because typecheck runs on the whole tree, tests included.

**Remaining opportunities:** treatment-logging UI to feed `suggestTasksForTreatment`; configurable
inspection interval; task snooze/reschedule. Next up: item 5 — mite-count calculator screen +
treatment logging with reminder scheduling.

---

## Iteration 5 — Mite calculator + treatment logging

**Audit findings:** `lib/mites.ts` had the full calculator but no screen surfaced it, and the
inspect form never captured a mite count. `store.addTreatment` + `suggestTasksForTreatment`
(iteration 4) existed but had no UI, so that reminder path was dead code.

**~10 ideas:** standalone mite calculator; save the count as a mite-check inspection (feeds risk
+ reminders); mite entry inside the inspect form; treatment log screen; launch both from the
timeline; live risk colour + source; treatment history on timeline; typed option modules; numeric
big-tap inputs; preset withdrawal windows (rejected — "no invented facts").

**Chosen:** mite calculator that saves a mite-check inspection (reusing `infestationRisk` + the
reminder engine) + treatment log that auto-schedules its follow-up, both launched from the timeline.

**Built:**
- `lib/inspectionOptions.ts`: added `MITE_METHOD_OPTIONS` (wash / roll / board), union-pinned.
- `lib/treatmentOptions.ts`: `TREATMENT_OPTIONS`, union-pinned; withdrawal windows deliberately
  NOT hard-coded (vary by product/dose/regulation — the app asks, never invents).
- `app/mites/[hiveId].tsx`: method toggle, method-specific inputs (bees for wash/roll, days for
  board), live risk result with the shared palette + the HBHC source; "Save mite check" records a
  lightweight inspection (non-mite fields = unknown) so it flows into the dashboard + reminders.
- `app/treatment/[hiveId].tsx`: treatment type, user-entered follow-up window (with a label-your-
  product prompt), note; saves and auto-schedules the follow-up reminder.
- `app/hive/[id].tsx`: timeline bottom action bar — Inspect / Mites / Treat.
- Registered both modal routes.

**Model routing:** current session model only. Fable not invoked. No merge, no PR.

**Commands run:** `npx tsc --noEmit` · `npx eslint .` · `npx jest` (56/56 — screens reuse
already-tested logic) · `npx expo export --platform web` (14 routes).

**Errors found / fixes:** first gate run executed from the repo root (cwd resets between cron
firings) and mis-reported failures; re-ran from `hive-pocket/` — all green. (Also fixed a stray
`ColonyRiskLevel` import sourced from `types` instead of `risk` before the clean run.) Lesson for
the loop: always `cd hive-pocket` in the gate command.

**Remaining opportunities:** treatment entries on the timeline; configurable inspection interval.
Next up: item 6 — cloud backup + annual subscription paywall (scaffold-and-flag money lane), the
last MVP item.

---

## Iteration 6 — Cloud backup + paywall gating (scaffold-and-flag)

**Audit findings:** The payments layer + paywall screen existed but nothing routed to the paywall
or gated anything; `useEntitlement` was unused. No cloud backup (store had `snapshot`/`hydrate`
only). Free-tier limits weren't enforced.

**~10 ideas:** pure free-tier gate; wire add-hive → paywall; versioned backup envelope; guarded
push/pull; Backup button on Data tab; `backups` migration; last-backed-up metadata; account/
sign-in screen (defer); restore reconciler; real RC offering wiring (reject — needs real keys/device).

**Chosen:** pure free-tier gate wired so the paywall is reachable + cloud-backup envelope (tested)
with a guarded, flagged sync layer + the `backups` migration. All money/migration bits flagged,
never wired to real credentials.

**Built:**
- `lib/entitlements.ts` (pure, tested): `FREE_HIVE_LIMIT=2`, `canAddHive`, `hivesRemaining`.
  Gates hive COUNT only — export/data are never gated.
- `lib/backup.ts` (pure, tested): versioned `BackupEnvelope`, `buildBackup`, `readBackup`
  (validates version + shape), `isBackupConfigured`.
- `lib/backupSync.ts` (flagged scaffold): `pushBackup`/`pullBackup` against Supabase `backups`,
  inert with a clear message until Supabase + sign-in are configured. Kept separate so the pure
  envelope stays ts-jest-testable.
- `supabase/migrations/0002_backups.sql` (flagged): per-user backup table, RLS own-row.
- Wired: dashboard "+ Add hive" routes free users to `/paywall` past the limit (`useEntitlement`);
  Data tab gains a flagged "Back up now" with honest status.

**Model routing:** current session model only. Fable not invoked. No merge, no PR. The money/
migration surfaces (paywall, RC keys, Supabase migrations, rc-webhook, backups) remain scaffolded
and flagged for human review + real credentials on a dev build — never shipped autonomously.

**Commands run (from `hive-pocket/`):** `npx tsc --noEmit` · `npx eslint .` · `npx jest` (66/66) ·
`npx expo export --platform web` (14 routes).

**Errors found / fixes:** `backup.test.ts` failed to load because `lib/backup` imported
`lib/supabase` (RN/ESM) — split the network layer into `lib/backupSync.ts` so the pure envelope
logic imports nothing native; test then passed. Same pure-vs-native split used for purchases/paywall.

---

## FINAL SUMMARY — HivePocket MVP (iterations 0–6)

The fastest offline hive-inspection logger, per the research wedge. Shipped, on-branch, verified
statically every step:

- **Foundation** (it0): Expo SDK 57 + expo-router + TS; offline domain core; payments layer from
  the titan boilerplate; governing model-routing rules (`CLAUDE.md`).
- **Setup + portability** (it1): hive/apiary creation UI; free CSV export + paste-import.
- **Capture** (it2–3): one-tap inspection form with giant tap targets + live risk preview;
  cross-platform photo attachments; honest voice-to-note interface stub.
- **Guidance** (it4–5): auto-generated next-action reminders (deduped) from inspections/
  treatments; risk-summary dashboard; overdue tasks; mite-count calculator; treatment logging.
- **Backup + money** (it6): versioned cloud-backup envelope + flagged Supabase sync; free-tier
  paywall gating.

**End-to-end (on device):** create hive → inspect (photos, note, mite count) → colony auto-colours
on the dashboard → reminders schedule themselves → export CSV any time.

**Guardrails held every iteration:** offline save-first; export never paywalled; AI/advice
assist-only with sourced disclaimers (HBHC mite thresholds; no invented withdrawal windows); giant
tap targets; **Fable never invoked**; money/migration/security scaffolded-and-flagged, never wired
to real credentials; **no merge, no PR** — the branch is the record, awaiting a human "go".

**Verification reality:** static gate only (tsc, eslint, 66 Jest cases, web-export of 14 routes).
No simulator/EAS/real purchase exists in this sandbox — native + purchase + live-webhook paths are
flagged for on-device review, never claimed tested.

**Deferred (post-MVP, build order 7–8):** mentor/helper sharing; advanced reports; on-device STT +
camera; treatment entries on the timeline; real RevenueCat offering + Supabase auth wiring.
