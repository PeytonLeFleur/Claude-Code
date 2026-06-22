# NioCorp (NB) — Scenario-Conditional Price Model

**Modeled scenario estimates, not predictions and not investment advice.** Built by treating the repo research package as the factual base, with external/live data labeled separately. All dates are **estimated windows** — the underlying catalysts are unscheduled and discretionary.

---

## STEP 1 — Load-bearing facts extracted from the repo

| Fact | Value | Source in repo |
|---|---|---|
| Current price / date | **$5.31** (2026-06-18) | Stress-Test, Event-Study |
| Basic shares outstanding | **145,587,048** (≈145.6M) | Due-Diligence, Stress-Test |
| Fully-diluted shares | **174,456,547** (≈174.5M) | Stress-Test |
| Market cap | **~$773M** | Stress-Test |
| After-tax NPV @8% (2022 FS economic-model base) | **$2,350M** (IRR 27.6%, payback 2.69y) | Stress-Test (TRS Table 19-11) |
| Initial capex (gross) / LOM total | **$1,141M** / $1,607M | Stress-Test |
| Cash on hand (3/31/26) | **$419M** | Stress-Test |
| Remaining funding gap | **~$800M** (≈ EXIM ask) | README, Event-Study |
| Scandium share of LOM revenue / FS price | **61.7%** @ **$3,675/kg** | Stress-Test, Due-Diligence |
| Stress: capex+20% & prices−20% | NPV **$1,214M** | Stress-Test |
| Stress: scandium −50% ($1,837/kg) | NPV **$875M** | Stress-Test (Table 19-14) |
| Stress: scandium 30% ($1,102/kg) | NPV **$261M** | Stress-Test |
| Binding scandium offtake | only **~12 t/yr of ~104 t/yr** (Traxys, a trader) | Due-Diligence, Policy Dossier |
| Enacted NB-specific federal cash | **$10M** DPA study grant (~0.9% of capex) | Policy Dossier |
| EXIM status | **LOI + application in TRC-2 review; no board vote** | Policy Dossier |
| Updated FS | **NOT released** as of 2026-06-21 | Due-Diligence + freshness check |
| Event-study analog moves (catalyst-day → decay) | see STEP 5 (E) | Event-Study |

### External / live data used as an OVERRIDE (labeled, NOT repo fact)
> 🔶 **Scandium spot price ≈ $640/kg (USGS MCS 2026), down from ~$1,000/kg in 2021** — roughly **one-sixth** of the repo/FS's $3,675/kg, with global production ~80 t/yr (the repo's "30–40 t/yr" understated existing supply). This single external fact is the most important caveat in this model: on the repo's own scandium sensitivity table, a realized price near spot pushes project NPV toward **zero**. The model therefore treats the FS-price NAV as a *ceiling* and carries an explicit scandium-price haircut. 🔶 Perpetua's binding $2.9B EXIM approval moved its stock only **~+12%** (CNBC), and Lynas's 2026 Pentagon NdPr price-floor LOI drew **−4.6%** — both confirm "anticipated binding catalyst ≈ muted/sell-the-news."

---

## STEP 2 — Sub-agent memos (assumptions, ranges, probabilities)

**A · EXIM / Financing.** EXIM has been active in critical minerals (Perpetua $2.9B, ioneer $996M), the chairman is supportive, and NB is in TRC-2. Against that: the LOI has been outstanding **3+ years** with no board date; the updated FS is a **precondition** and isn't out; Elk Creek clears EXIM's **export-nexus** test only via the discretionary critical-minerals "deemed-export" carve-out (it's a domestic-facing slate); EXIM handed the **same LOI instrument to an Australian scandium competitor** (Sunrise, ~$67M); and an independent technical review will stress a **bank-case scandium price far below $3,675/kg**. **My calibrated probabilities (judgment):** full ~$800M approval **35%**, partial **15%**, indefinite stall **30%**, rejection **20%**. Timing window: **mid-2027 (range Q4-2026 → 2028)**. Dilution: full debt ≈ no new equity (~145.6M sh); partial/none forces $200–800M equity → 221M–296M+ sh (≈446M at a stressed $2.66).

**B · Scandium demand.** Only ~12 t/yr of ~104 t/yr is under binding (trader, not end-user) offtake. Real volume end-users (SOFC/Bloom, aerospace primes, Stellantis auto) are unproven or non-binding; the realistic path to the other ~90 t/yr is NB **building its own** Al-Sc market — a **decade-class** effort with a poor 20-year adoption base rate. 🔶 Spot $640/kg vs FS $3,675/kg. **P(binding scandium offtake/floor naming NB within ~3y): ~20%.** Price-realization scenarios: bull (created premium market) $3,000–3,675/kg ~25%; base (partial premium) $1,500–2,500/kg ~40%; bear (toward spot) $640–1,200/kg ~35%.

**C · Feasibility / economics.** Updated FS pending; adds REE + new flowsheet but eats 6 yrs of inflation on a 2019 cost basis with only 9.79% contingency. Management guides capex "≤$1.2B" (their figure, not independently validated). The full integrated flowsheet — especially REE separation — has never run at commercial scale (first-of-kind risk). **P(updated FS as published confirms/improves) ~35%; in-line ~30%; worsens ~35%** — but note even a "confirming" FS that keeps $3,675/kg scandium may not be *believed* given spot. Window: **H2-2026 → H2-2027.**

**D · Dilution / capital structure (computed from repo).** Share-count by funding path: EXIM full debt **~145.6M**; $400M debt + $400M equity @$5.31 **~221M**; $0 debt, $800M equity @$5.31 **~296M**; same @$2.66 **~446M**. Yorkville facility expired; equity (ATM/offerings) is the main flexible lever if debt slips. This is the dominant per-share swing factor alongside the NPV itself.

**E · Event-study / base-rate.** Catalyst-day → decay, from repo analogs: political mention +0/+5/+12% (fades in days); agency grant (NB's own $10M) +18%@5d → +98%@60d → **faded to −7% vs miners by 180d**; binding offtake/MP-template +33/+57/+58% → **gave back alpha vs miners by 180d**; EXIM final commitment **muted/+10–12%** (Perpetua); rejection −15/−35/−50%+ (**durable** down). **No clean pre-revenue developer durably re-rated on a government catalyst** (LAC, Oklo, Perpetua, Syrah all faded; durable holders Centrus/MP/Lynas had revenue). Caveats: the 2024–26 critical-minerals regime is a major confounder; n≈6–8 — a **directional prior, not a law.**

**F · Valuation / synthesis.** Two methods below; reconciled in STEP 4–5.

---

## STEP 3 — Catalyst variables (estimated windows + branches)

| ID | Catalyst | Estimated window (judgment) | Branches |
|---|---|---|---|
| **X1** | Updated FS release | H2-2026 → H2-2027 | confirms/improves · in-line · worsens |
| **X2** | EXIM board decision | mid-2027 (Q4-26 → 2028) | full ~$800M · partial · rejection · indefinite stall |
| **X3** | Binding scandium offtake / price floor naming NB | unscheduled (2026–2029) | yes · no |
| **X4** | Full financing close | 2027–2028 (post-X2) | yes · no |
| **X5** | Construction milestones / first production | first production ~2030–2031 | on track · delayed |
| **X6** | Government demand event naming NB (e.g., DLA stockpile) | unscheduled | yes · no |

---

## STEP 4 — Valuation bridge (two transparent methods)

**Method (a) — Risk-adjusted NAV per share.** NAV = repo after-tax NPV@8% ÷ scenario share count, then × a stage **P/NAV multiple** (mining-developer convention: pre-financing 0.1–0.3×; financing/construction 0.4–0.7×; near-production 0.7–1.0×). Full FS NAV undiluted = $2,350M ÷ 145.6M = **$16.14/sh** (the theoretical ceiling at FS scandium, fully funded, fully de-risked).

NAV/share by NPV scenario × funding path (computed):

| NPV scenario | EXIM full (145.6M) | ½ debt/½ equity (221M) | all-equity @$5.31 (296M) | all-equity @$2.66 (446M) |
|---|---|---|---|---|
| FS econ ($3,675/kg Sc) **$2,350M** | $16.14 | $10.64 | $7.93 | $5.27 |
| capex+20%/px−20% **$1,214M** | $8.34 | $5.50 | $4.10 | $2.72 |
| all-prices −30% **$952M** | $6.54 | $4.31 | $3.21 | $2.13 |
| 🔶 scandium −50% ($1,837) **$875M** | $6.01 | $3.96 | $2.95 | $1.96 |
| 🔶 scandium 30% ($1,102) **$261M** | $1.79 | $1.18 | $0.88 | $0.58 |

*These are **fully-funded, fully-de-risked (P/NAV=1.0)** values. A pre-production developer trades at a fraction of NAV — apply the stage multiple. Example: FS econ, EXIM-full, at "financing secured" 0.4–0.7× → **$6.5–11.3**; at "pre-financing" 0.1–0.3× → **$1.6–4.8**.*

**Method (b) — Catalyst-reaction overlay** (apply repo event-study moves to the $5.31 baseline, then decay):

| Catalyst branch | low / base / high (catalyst-day) | decay/hold (repo base rate) |
|---|---|---|
| X2 EXIM full approval | $5.84 / $6.90 / $8.50 | often muted (Perpetua +12%); fades unless financing+offtake follow |
| X2 EXIM partial | $5.04 / $5.84 / $6.90 | fades; equity overhang |
| X2 rejection / indefinite stall | $2.65 / $3.45 / $4.51 | **durable down** |
| X1 FS confirms | $5.58 / $6.37 / $7.70 | fades toward NAV-at-stage |
| X1 FS worsens | $3.19 / $3.98 / $4.78 | durable down |
| X3 binding scandium offtake/floor | $6.90 / $8.34 / $9.82 | most durable IF priced + real volume |
| X6 DLA/gov demand names NB | $6.11 / $7.43 / $9.56 | holds only if recurring |
| Political mention only | $5.31 / $5.58 / $5.95 | gone in days |

**Reconciliation:** the two methods agree that near-term upside on any single catalyst is bounded around **$7–10** (catalyst overlay) and that durable values only reach the **$11–16** zone in method (a) under **FS scandium prices + minimal dilution + near-production de-risking simultaneously** — precisely the conjunction the 🔶 scandium-spot reality and the financing/dilution risk make low-probability. Downside in both methods clusters at **$2–4** on rejection/stall/worse-FS, with a tail toward **<$1** if a scandium-haircut NPV (toward the $261M row) is what an independent bank case actually underwrites.

---

## STEP 5 — Output: per-catalyst scenario tables (both branches)

*Price = blended read of methods (a) and (b); LOW/BASE/HIGH. Confidence: L/M/H.*

### X1 — Updated Feasibility Study
| Scenario | Window | Prob | Price (L/B/H) | Method & key assumptions | Conf |
|---|---|---|---|---|---|
| Confirms/improves (capex ≤$1.2B, recoveries hold, REE upside) | H2-26→H2-27 | 35% | $5.50 / $6.50 / $8.00 | (b) FS-confirms move; (a) lifts P/NAV toward 0.3–0.4× | L–M |
| In-line / mixed | H2-26→H2-27 | 30% | $4.50 / $5.25 / $6.25 | muted; status quo | M |
| Worsens (capex↑, recovery/scandium cut) | H2-26→H2-27 | 35% | $3.00 / $3.90 / $4.80 | (b) FS-worsens; (a) NAV row drops to capex/px-stress | M |

### X2 — EXIM board decision *(the binary)*
| Scenario | Window | Prob | Price (L/B/H) | Method & key assumptions | Conf |
|---|---|---|---|---|---|
| Full ~$800M approval | mid-27 (Q4-26→28) | 35% | $6.50 / $8.00 / $11.00 | (b) +10–60% but Perpetua-muted; (a) EXIM-full path, P/NAV 0.4–0.7× at FS Sc | L–M |
| Partial approval (forces equity) | mid-27 | 15% | $4.50 / $5.50 / $7.00 | (a) ½ debt/½ equity (221M sh); dilution offsets de-risk | L |
| Indefinite stall (no decision) | rolling | 30% | $2.75 / $3.75 / $4.75 | bridge raises, dilution, going-concern drift | M |
| Rejection (hard stop, no Plan B) | mid-27 | 20% | $1.25 / $2.25 / $3.25 | (b) −35–50%; (a) pre-financing P/NAV 0.1× on stress NPV | M |

### X3 — Binding scandium offtake / price floor naming NB
| Scenario | Window | Prob | Price (L/B/H) | Method & key assumptions | Conf |
|---|---|---|---|---|---|
| Yes (definitive, priced, real volume) | 2026–29 | 20% | $7.00 / $8.50 / $11.00 | (b) MP-template move; attacks demand risk; most durable catalyst | L |
| No | base case | 80% | n/a (absorbed in baseline) | demand stays "hoped-for" | M |

### X4 — Full financing close
| Scenario | Window | Prob | Price (L/B/H) | Method & key assumptions | Conf |
|---|---|---|---|---|---|
| Yes (EXIM + equity + offtake + strategic) | 2027–28 | 30% | $7.50 / $10.00 / $14.00 | (a) financing→construction P/NAV 0.4–0.7× at FS Sc; dilution per path | L |
| No (gap unfilled) | 2027–28 | 70% | $2.50 / $3.75 / $5.00 | stall/dilution; option value only | M |

### X5 — Construction / first production
| Scenario | Window | Prob (cond. on X4=yes) | Price (L/B/H) | Method & key assumptions | Conf |
|---|---|---|---|---|---|
| On track to first product | ~2030–31 | 40% | $10 / $14 / $18 | (a) near-production P/NAV 0.7–1.0× at FS Sc, min dilution | L |
| Delayed / overrun | ~2031+ | 60% | $4 / $7 / $10 | time-discount + extra equity; first-of-kind flowsheet risk | L |
| 🔶 Built but scandium unsellable at volume | ~2031+ | overlay | $1 / $3 / $5 | NPV collapses to Nb+Ti residual; equity impaired | L |

### X6 — Government demand event naming NB (e.g., DLA stockpile)
| Scenario | Window | Prob | Price (L/B/H) | Method & key assumptions | Conf |
|---|---|---|---|---|---|
| Yes | unscheduled | 12% | $6.50 / $7.75 / $9.75 | (b) demand-signal move; validates scandium | L |
| No (DLA keeps buying Rio Tinto) | base | 88% | n/a | incumbent competitor holds the buy | M |

---

## STEP 5b — Single most-likely path, 2026→2031 (probability-weighted)

The modal path multiplies the higher-probability branches (FS in-line/worse · EXIM stall-or-slow · no binding scandium offtake · serial dilution). It is **not** the bullish path.

| Date (est. window) | Modal state | Price range (L/B/H) | Why |
|---|---|---|---|
| **Now — Jun 2026** | Baseline | **$5.31** (repo) | Market cap ~$773M |
| **H2 2026** | Pre-FS drift, ATM dilution | **$3.75 / $4.75 / $6.00** | No catalyst; burn + overhang |
| **H1 2027** | Updated FS lands (in-line/worse, market skeptical on scandium) | **$3.25 / $4.25 / $6.50** | Two-way; scandium-spot overhang caps upside |
| **2027** | EXIM decision — modal = **stall or partial**, not clean full approval | **$2.75 / $4.00 / $8.00** | Wide: full-approval tail $8–11; stall/reject tail $2–3 |
| **2028** | Financing **mostly unresolved**; equity raises continue | **$2.50 / $4.00 / $9.00** | Bimodal: closed-stack tail up; unfunded tail down |
| **2030–2031** | IF built (≤~30%): near-production; ELSE option/zombie | **$2 / $5 / $16** | Fully bimodal; FS-Sc + low-dilution needed for the high |

**Expected-value read (qualitative, not a target):** probability-weighting the X2 branches alone (35% up to ~$8 · 15% ~$5.5 · 30% ~$3.75 · 20% ~$2.25) centers EV **near today's price with enormous variance** — i.e., the market is pricing roughly a coin-flip on financing. The upside requires a *conjunction* (full EXIM **and** real scandium demand **and** FS holding **and** tolerable dilution); the downside requires only **one** failure. That asymmetry — many AND-conditions for the high, one OR-condition for the low — is the core of the bear case, reinforced by the base rate that pre-revenue gov-catalyst names have not durably re-rated.

---

## STEP 6 — Kill-switch list (events that void the higher scenarios)

- **EXIM rejection** → hard stop, no disclosed Plan-B lender; collapses X2/X4/X5 highs. (Caps to the $1–3 zone.)
- **EXIM indefinite stall** → death-by-dilution; voids the de-risking premium even without a "no."
- **Updated FS worsens** (capex↑, recovery/scandium cut) → resets the NAV anchor down; voids X1/X4 highs.
- 🔶 **Scandium realized price toward spot ($640/kg)** → on the repo's own table, NPV toward $261M or below; voids every FS-price NAV in Method (a).
- **No binding scandium offtake** → demand stays hoped-for; caps X3/X5.
- **Heavy dilution at low prices** (446M-share path) → even FS economics yield ~$2–5/sh; voids the $11–16 zone.
- **Construction delay / first-of-kind flowsheet (REE separation) failure** → time-discount + capital; voids X5 high.
- **Government buys scandium from a competitor (Rio Tinto/ElementUS)** → voids X6 and undercuts the strategic-premium thesis.

---

### REQUIRED CAVEATS (verbatim)
- **Modeled scenario estimates derived from a single research package. Not predictions and not investment advice.**
- **All dates are estimated windows; the underlying events are unscheduled and discretionary.**
- **Wide uncertainty: small-cap, pre-revenue, binary financing risk. Ranges can be wrong in both directions, and an EXIM rejection is a hard stop with no Plan B.**

*Method note: Method (a) and (b) anchor to the repo's stated price ($5.31), shares (145.6M / 174.5M FD), NPV ($2,350M and stress cases), capex ($1,141M), and gap (~$800M). The scandium-spot ($640/kg), Perpetua/Lynas reaction, and EXIM-mechanics items are **live/external data, labeled 🔶**, used as overrides on probability and confidence — not substituted into the repo's NPV. Probabilities and P/NAV multiples are my calibrated judgment, flagged as such.*
