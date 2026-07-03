# HivePocket — project rules & model lane

Inherits the repo-wide routing lanes and change safeguards in [`../CLAUDE.md`](../CLAUDE.md).
This file adds the product guardrails specific to HivePocket.

## Model lane for this project

- **Haiku 4.5** — read hive/inspection code, grep, scan test output.
- **Sonnet 5** — routine feature building (screens, forms, list views, pure logic).
- **Opus 4.8** — the seat: plans a feature, reviews a diff, judges tradeoffs.
- **Fable 5** — ask first. Only for: data-model **migrations** (Supabase SQL), the
  **subscription / paywall / webhook** money path, and any **security** review of RLS
  or the service-role key. These are the "design, danger, money" surfaces here.

## Product guardrails (do not violate in any iteration)

1. **Offline save-first.** Every inspection saves to local storage immediately; cloud sync
   is best-effort and never blocks capture. The app must be usable with no network.
2. **Data portability is a core promise, not a paywall hostage.** CSV/PDF export stays
   available; never gate raw export behind the subscription.
3. **AI is assist-only.** Voice-note cleanup and checklist suggestions are fine. Never emit
   definitive veterinary/treatment advice without a disclaimer and a reputable reference.
   The app records what the beekeeper observed; it does not prescribe.
4. **No invented facts.** Mite thresholds, treatment windows, and any guidance must trace to
   a citable source (e.g. Honey Bee Health Coalition, UMN Bee Lab). If unsourced, label it a
   user preference, not a recommendation.
5. **Field UX stays glove-friendly.** Giant tap targets, one-tap cards, minimal typing.
   Don't regress tap-target size or bury the capture flow.
6. **Money & migrations are guarded.** The paywall, RevenueCat keys, Supabase migration, and
   `rc-webhook` are scaffolded but never wired to real credentials or shipped without an
   explicit human "go" (repo rule 3). Real keys come from `eas env` / function secrets,
   never committed. `SUPABASE_SERVICE_ROLE_KEY` is server-only, never in the client bundle.

## Verification reality in this sandbox

This is a headless Linux environment: no iOS/Android simulator, no EAS build, no real
RevenueCat purchase. Automated verification is **static only** — `tsc --noEmit`, ESLint,
Jest on pure logic, and a best-effort `expo export --platform web`. Native and purchase
paths are scaffolded and **flagged for on-device review**, never claimed as tested.
