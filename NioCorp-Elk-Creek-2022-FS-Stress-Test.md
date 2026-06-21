# NioCorp / Elk Creek — Downside Decision Model

**Built from:** the June 2022 **S-K 1300 Technical Report Summary** (Exhibit 96.1 to NioCorp's FY2022 Form 10-K, SEC EDGAR accession 0001539497-22-001510, filed 2022-09-06 — the SEC counterpart of the June 2022 NI 43-101 report); the **Q3 FY2026 Form 10-Q** (period ended 2026-03-31, EDGAR accession 0001193125-26-223959, filed 2026-05-14); and live market data.
**Market data:** NB last trade **$5.31** (2026-06-18), prior close $5.19, 52-wk range $2.17–$12.58.
**Model date:** 2026-06-21.

**Confidence tags used throughout:**
- 🟢 **PRIMARY** — quoted verbatim from the TRS or 10-Q.
- 🟡 **COMPUTED** — my calculation derived from primary figures + a stated, transparent assumption (the report did NOT publish it).
- 🔴 **LOW-CONF** — sourced to an interview / investor deck / secondary article, or a rough estimate where the underlying data is a graph not a table.

> **Two essential caveats before any number is used:**
> 1. **The TRS economic-model base case is internally the one that ties together** ($2,350M after-tax NPV ↔ $21,900M LOM revenue ↔ $46.56/kg Nb economic-model price). NioCorp's own press release also circulated a lower-priced run (≈$1.7B after-tax NPV, $17.6B revenue, $39.60/kg Nb spot). **This model uses the TRS economic-model base** because it is the set that the published NPV is built on. Where the spot price ($39.60/kg Nb) differs, it is flagged.
> 2. **CAPEX, OPEX, all-product-price, and discount-rate sensitivities are presented in the TRS only as graphs (Figures 19-3 to 19-14), NOT as numeric tables.** Only **niobium price (Table 19-13)** and **scandium price (Table 19-14)** are tabulated numerically. Every capex/opex/combined NPV figure below the price tables is therefore 🟡 COMPUTED or 🔴 LOW-CONF, with the method shown.

---

# TABLE 1 — 2022 FS BASE CASE (TRS economic model) 🟢 PRIMARY

| Metric | Value | Source |
|---|---|---|
| **After-tax NPV @ 8%** | **US$ 2,350 M** | TRS §1.1, Table 19-11 |
| After-tax IRR | 27.6% | TRS §1.1 |
| After-tax payback (from production start) | 2.69 yrs | TRS §1.1 |
| Pre-tax NPV @ 8% | US$ 2,819 M | TRS §1.1 |
| Pre-tax IRR | 29.2% | TRS §1.1 |
| Mine life | 38 yrs | TRS §1.1 |
| LOM gross revenue | US$ 21,900 M | Table 19-11 |
| — Scandium | US$ 13,504 M (**61.7%**) | Table 19-11 |
| — Niobium | US$ 7,968 M (**36.4%**) | Table 19-11 |
| — Titanium | US$ 427 M (**1.9%**) | Table 19-11 |
| Avg annual EBITDA | US$ 397.5 M | Table 19-10 |
| Avg EBITDA margin | 69% | Table 19-10 |
| Effective tax rate | 16.4% | Table 19-10 |
| **Initial capex (gross)** | **US$ 1,140.5 M** | Table 1-6 / 19-9 |
| Pre-production revenue credit | (US$ 256.9 M) | Table 1-6 |
| Net initial capital outlay | US$ 883.6 M | Table 1-6 |
| LOM sustaining capital | US$ 466.1 M | Table 1-6 |
| Total LOM capital | US$ 1,606.6 M | Table 1-6 |
| LOM operating cost | US$ 7,182 M | §1.1 |
| Unit operating cost | US$ 195.94 / t ore | Table 1-7 |
| **Base price — ferroniobium / Nb** | **$39.60/kg Nb** (spot, 6/30/22) · **$46.56/kg** (economic-model base, Table 19-13) ⚠️ | §1, §16, Table 19-13 |
| Base price — scandium trioxide | $3,675/kg | Table 19-14 |
| Base price — titanium dioxide | $0.88/kg (§1) · $0.99/kg (§19) ⚠️ | §1, §19.2.2 |
| Accuracy / basis | ± 15%, Q1-2019 constant US$ | §1.9 |

## 1a. FULL INITIAL CAPEX BREAKDOWN 🟢 PRIMARY (TRS Table 1-6, US$ 000s, "Initial" column)

| Line item (your requested mapping) | TRS line | Initial US$ 000 |
|---|---|---|
| **Mine / underground development** | Mining Infrastructure | 256,981 |
| **Process plant** | Processing Plant | 367,439 |
| **Surface infrastructure** | Site Preparation & Infrastructure | 40,569 |
| **Tailings / waste** | Tailings Management | 21,423 |
| **Utilities — water (the ~$100M line)** | Water Mgmt & Treatment 73,756 + Mine Water Mgmt Indirects 8,520 | 82,276 |
| **Indirect costs** | Site-Wide 7,368 + Processing Indirects 96,028 + Mining Indirects 41,130 | 144,526 |
| **— of which EPCM** | inside Processing Indirects (Table 18-7) | 62,592 |
| **Owner's costs** | Owner's Costs | 33,619 |
| **Pre-production / commissioning** | Capitalized Preprod 77,053 + Process Commissioning 13,350 + Mining Commissioning 1,578 | 91,981 |
| **Contingency** | Contingency (9.79%) | 101,730 |
| **Subtotal — Total Initial Capital** | | **1,140,544** |
| Pre-production revenue credit | | (256,910) |
| **Net Project Total (initial)** | | **883,634** |
| **Working capital** | *no separate line in source* 🟡 | — |
| **Sustaining capital (LOM)** | Table 1-6 sustaining column | 466,058 |
| **Closure / reclamation** | $44,267k (cash-flow model) · $50.2M (narrative, 2019 basis) ⚠️ | 44,267 |
| **Excluded costs (financing fees, IDC)** | *not itemized as exclusions in source* 🟡 | — |

**Notes:** (i) There is **no explicit "working capital" line** — pre-production expense + commissioning are the closest analog. (ii) The TRS does **not state** that financing fees or interest-during-construction are excluded; they simply are not in the estimate (a real-world all-in number is higher). (iii) No salvage credit identified.

## 1b. CONTINGENCY ANALYSIS 🟢 PRIMARY + 🟡 JUDGMENT

| Item | Value | Source |
|---|---|---|
| Initial-capital contingency | **US$ 101,730k = 9.79%** | TRS §18.2.10, Table 18-19 |
| Sustaining-capital contingency | US$ 9,385k = 2.06% | TRS §18.2.10 |
| Method | "line-item analysis by category…averages 10%" — **applied by category, not a flat rate** | §18.2.10 (verbatim) |
| Highest line contingency | Processing Plant 13.9% / Process Commissioning 16.2% | Table 18-19 |
| Lowest line contingency | **Owner's Costs 0.0%**, Mine Water Mgmt 0.6% | Table 18-19 |

**Is ~9.79% adequate for a mine that has NOT entered full construction? 🟡 JUDGMENT — NO, it is thin.** A ±15%-accuracy feasibility estimate in Q1-2019 dollars with only ~9.8% contingency leaves little room for (a) **6+ years of construction-cost and labour inflation** since the 2019 cost basis, (b) the **scope change to twin declines + Railveyor + rare-earth and TiCl₄ circuits** that postdate this estimate, and (c) the **0% contingency on owner's costs**. Hard-rock projects of this type routinely overrun feasibility capex by 20–40%. The mitigant is that **capex is a weak NPV lever** (see Table 2) — so even a large overrun damages the *financing/dilution* picture far more than the *NPV*.

## 1c. SENSITIVITY TABLES AS PUBLISHED 🟢 PRIMARY

**Scandium price (Nb, Ti held constant) — TRS Table 19-14, after-tax NPV @ 8%:**

| Sc price | % base | After-tax NPV | After-tax IRR |
|---|---|---|---|
| $4,776 | 130% | $3,210 M | 33.9% |
| $4,041 | 110% | $2,641 M | 29.8% |
| **$3,674** | **100%** | **$2,350 M** | **27.6%** |
| $3,306 | 90% | $2,059 M | 25.4% |
| $2,939 | 80% | $1,766 M | 23.1% |
| $2,572 | 70% (−30%) | $1,473 M | 20.7% |
| $2,204 | 60% | $1,176 M | 18.3% |
| $1,837 | 50% (−50%) | $875 M | 15.7% |
| $1,469 | 40% | $570 M | 13.1% |
| $1,102 | 30% | $261 M | 10.4% |
| ~$814 | ~22% | ~$5 M | 8.0% |

*Scandium after-tax breakeven ≈ $1,130/kg (TRS narrative) — i.e., NPV→0 around 31% of the base price.*

**Niobium price (Sc, Ti held constant) — TRS Table 19-13, after-tax NPV @ 8%:**

| Nb price | % base | After-tax NPV | After-tax IRR |
|---|---|---|---|
| $60.55 | 130% | $2,866 M | 31.3% |
| **$46.56** | **100%** | **$2,350 M** | **27.6%** |
| $41.90 | 90% | $2,177 M | 26.3% |
| $37.24 | 80% | $2,003 M | 25.0% |
| $32.57 | 70% (−30%) | $1,829 M | 23.7% |
| $23.25 | 50% | $1,481 M | 21.0% |
| $11.59 | 25% | $1,044 M | 17.4% |
| $0.00 | 0% | $598 M | 13.5% |

**Read-through:** scandium is ~**1.7× more powerful** on NPV than niobium per equal % move. **Titanium price, capex, opex, and discount-rate sensitivities exist only as GRAPHS in the TRS** — no numeric NPV points were published for them.

---

# TABLE 2 — DOWNSIDE STRESS CASES

Base after-tax NPV @ 8% = **$2,350 M**. Rows tagged 🟢 are read directly from the TRS tables; 🟡 are my computations (method in footnotes); 🔴 are rough where the source is a graph.

| # | Stress case | After-tax NPV | Δ vs base | Tag | Method |
|---|---|---|---|---|---|
| **Capex** | | | | | |
| 1 | Capex **+10%** (+$114M) | ~$2,247 M | −$103 M | 🟡 | ΔNPV ≈ −0.9 × Δcapex¹ |
| 2 | Capex **+20%** (+$228M) | ~$2,145 M | −$205 M | 🟡 | ¹ |
| 3 | Capex **+30%** (+$342M) | ~$2,042 M | −$308 M | 🟡 | ¹ |
| **Opex** | | | | | |
| 4 | Opex **+10%** | ~$2,202 M | −$148 M | 🟡 | annuity PV² |
| 5 | Opex **+20%** | ~$2,053 M | −$297 M | 🟡 | ² |
| **All product prices** | | | | | |
| 6 | All prices **−10%** | ~$1,886 M | −$464 M | 🟡 | Sc−10% (−$291M) + Nb−10% (−$173M)³ |
| 7 | All prices **−20%** | ~$1,419 M | −$931 M | 🟡 | Sc−20% (−$584M) + Nb−20% (−$347M)³ |
| 8 | All prices **−30%** | ~$952 M | −$1,398 M | 🟡 | Sc−30% (−$877M) + Nb−30% (−$521M)³ |
| **Scandium-specific** | | | | | |
| 9 | **Scandium price −30%** | **$1,473 M** | −$877 M | 🟢 | Table 19-14, 70% row |
| 10 | **Scandium price −50%** | **$875 M** | −$1,475 M | 🟢 | Table 19-14, 50% row |
| 11 | **Scandium volume sold −50%** (demand fails) | ~$875 M (or lower) | ≈−$1,475 M | 🟡 | ≈ Sc price −50%⁴ |
| **Combined (answers the original Q20)** | | | | | |
| 12 | **Capex +20% AND prices −20%** | **~$1,214 M** | −$1,136 M | 🟡 | row 7 ($1,419M) then −$205M capex |
| **Discount rate** | | | | | |
| 13 | NPV @ 6% | ~$3,050 M 🔴 | +$700 M | 🔴 | graph only; rough |
| 14 | NPV @ 8% (base) | $2,350 M | — | 🟢 | Table 19-11 |
| 15 | NPV @ 10% | ~$1,850 M 🔴 | −$500 M | 🔴 | graph only; rough |
| 16 | NPV = 0 at after-tax IRR | discount rate = **27.6%** | — | 🟢 | §1.1 |
| **Schedule** | | | | | |
| 17 | Construction delay **1 yr** | ~$2,135 M | −$215 M | 🟡 | discount 1 yr + ~$40M carry⁵ |
| 18 | Construction delay **2 yr** | ~$1,934 M | −$416 M | 🟡 | discount 2 yr + ~$80M carry⁵ |

**Methodology footnotes**
1. **Capex:** initial capex is spent up-front, so PV ≈ 1; partly cushioned by depreciation tax shield (16.4% eff. rate). I use ΔNPV ≈ −0.9 × Δcapex. *Key finding: capex is a weak NPV lever — +30% capex cuts NPV only ~13%.*
2. **Opex:** annual opex ≈ $189 M; +10% = +$18.9 M/yr pre-tax → ×0.836 after-tax → × PV-annuity factor ≈ 9.4 (38-yr stream at 8%, discounted ~3 yrs to valuation) ≈ −$148 M.
3. **All-prices:** NPV is linear in revenue (capex/opex fixed), so the single-commodity table deltas are additive; titanium (1.9% of revenue) adds only ≈−$4 M per 10% and is folded in as negligible.
4. **Scandium volume −50%:** halving scandium *sold* removes the same ~$6.75 B LOM revenue as halving the scandium *price*, with ore-throughput opex essentially unchanged → NPV proxy ≈ $875 M; **could be modestly lower** because unsold scandium still incurs full mining/processing cost (and possible inventory/disposal cost) — so treat $875 M as the optimistic edge of this case.
5. **Delay:** pure 1-/2-yr deferral discounts the net value by 1.08⁻¹ / 1.08⁻² and adds ~$40 M/yr of incremental G&A + standby/interest carry.

**The single most important read of Table 2:** the project's NPV is **driven by scandium and protected by niobium.** Niobium going to **zero** still leaves **$598 M** NPV (row from Table 19-13) because scandium carries the model; scandium **−50%** alone wipes out **$1.48 B** of NPV. This is a **scandium project wearing a niobium jacket.**

---

# TABLE 3 — FINANCING & DILUTION CASES

**Inputs** 🟢 (10-Q / market): basic shares **145,587,048**; fully-diluted **174,456,547** (incl. 20.96M warrant-underlying shares, 4.40M options, 3.52M ECRC vested exchangeable shares; **excludes** contingent earnout shares, count not disclosed); in-the-money diluted at $5.31 = **156,608,329**; cash on hand (3/31/26) **$419 M**; price **$5.31**.

**Remaining capital need 🟡 COMPUTED:** project capital $1,141 M (base) − $419 M cash ≈ **$722 M**; adding financing fees / IDC / working capital not in the FS estimate pushes the realistic remaining all-in need to **~$800–900 M**. I anchor the scenarios on a **central ~$800 M remaining need**, which also matches the EXIM ask. *CEO soft guide of "capex ≤ $1.2 B" 🔴 LOW-CONF (interview, not a filing) would raise the need by up to ~$60 M.*

**Equity required under each EXIM outcome** (remaining need ≈ $800 M, debt-first):

| EXIM debt approved | Other/equity still required |
|---|---|
| **$800 M** (full ask) | ~$0 (de-risked; minimal new equity) |
| **$600 M** | ~$200 M |
| **$400 M** | ~$400 M |
| **$0** (rejection) | ~$800 M |

**Dilution matrix** — new shares = equity ÷ price; **dilution % = new ÷ (145.587 M basic + new):** 🟡 COMPUTED

| Equity to raise | @ **$5.31** (current) | @ **$3.98** (−25%) | @ **$2.66** (−50%) |
|---|---|---|---|
| **$200 M** (EXIM $600M) | +37.7 M sh → **20.6%** dilution | +50.3 M → **25.7%** | +75.2 M → **34.1%** |
| **$400 M** (EXIM $400M) | +75.3 M sh → **34.1%** | +100.5 M → **40.8%** | +150.4 M → **50.8%** |
| **$800 M** (EXIM $0) | +150.7 M sh → **50.9%** | +201.0 M → **58.0%** | +300.8 M → **67.4%** |

**Reading Table 3:**
- These dilutions stack **on top of** the existing ~16% overhang (145.6 M basic → 174.5 M fully diluted), though 17.5 M of that overhang is the **$11.50 public warrants, far out-of-the-money** at $5.31.
- **Full EXIM approval is the whole ballgame:** at $800 M debt, incremental equity dilution is ~nil. **EXIM rejection forces an ~$800 M equity raise** — which at a stressed $2.66 share price **triples the share count (~67% dilution)** and would likely have to be staged over years, with going-concern risk in between.
- The asymmetry is brutal: the equity need is largest *precisely* in the scenario (EXIM rejection / project doubt) where the share price is *lowest* — a classic dilution spiral.

---

# TABLE 4 — THESIS KILL SWITCHES

| Kill switch | Trigger / threshold | Consequence | Evidence |
|---|---|---|---|
| **1. EXIM rejection or under-funding** | Board votes < $800 M, or no | Forces up to ~$800 M equity → up to **~67% dilution** at depressed prices; possible multi-year stall | Table 3; no disclosed Plan-B lender |
| **2. Scandium demand fails to develop** | Can't sell > ~12 t/yr (only binding offtake) of ~97 t/yr planned | **~54% of LOM revenue is uncommitted scandium**; volume −50% → NPV ~$875 M | Table 5; Table 19-14 row 50% |
| **3. Scandium price collapse** | Sc < ~$1,130/kg (after-tax breakeven) | **NPV → ~0**; history shows spot often << FS's $3,675/kg | Table 19-14; narrative breakeven |
| **4. Capex blowout beyond thin contingency** | Overrun > ~9.8% contingency (likely, given 2019 basis + scope change) | Modest NPV hit (+30% → −13%) but **large extra equity / dilution** | Tables 1b, 2, 3 |
| **5. Updated FS disappoints** | REE economics weak, recovery/throughput cut, capex re-based up | Resets the entire base case; not yet released as of model date | prior research; TRS predates REE/Railveyor |
| **6. Construction delay** | +1–2 yrs | −$215 M to −$416 M NPV **plus** extended burn & EXIM covenant strain | Table 2 rows 17–18 |
| **7. Niobium is the floor, not the engine** | n/a (structural) | Even Nb→$0 leaves $598 M NPV; but **Nb alone cannot justify the valuation** without scandium | Table 19-13, 0% row |

---

# TABLE 5 — REVENUE CONCENTRATION & SPECULATIVE-DEMAND SHARE 🟢/🟡

| Revenue bucket | LOM US$ M | % of $21,900 M | Commercial status |
|---|---|---|---|
| Scandium — **binding** offtake (Traxys, ≤12 t/yr ≈ 12.4%) | 1,675 | 7.6% | 🟢 binding |
| Scandium — **uncommitted** (the speculative core) | **11,829** | **54.0%** | 🟡 non-binding / demand-creation |
| Niobium — **binding** (Thyssen 50% + Traxys 25%) | 5,976 | 27.3% | 🟢 binding |
| Niobium — uncommitted (remaining 25%) | 1,992 | 9.1% | 🟡 term-sheet/uncommitted |
| Titanium — uncommitted | 427 | 1.9% | 🟡 non-binding |
| **Total binding** | **7,651** | **34.9%** | |
| **Total uncommitted / non-binding** | **14,249** | **65.1%** | |
| **— of which speculative scandium demand-creation** | **11,829** | **≈ 54%** | |

**Bottom line on concentration:** only **~35% of projected project revenue sits under binding offtake** (three-quarters of niobium + a sliver of scandium). **~54% of the entire project's value rests on selling scandium that has no committed buyer into a market that today is ~30–40 t/yr globally — while Elk Creek alone plans ~97 t/yr (≈2.5–3× current world supply).** That single line is the thesis.

---

## What would have to be true for NB to be a high-conviction speculative buy
EXIM would need to **close the full ~$800 M debt package** (removing the dilution kill-switch and effectively underwriting ~65% of remaining capital with non-dilutive money), and NioCorp would need to **convert scandium from "demand-creation hope" into contracted tonnes** — turning the Traxys best-efforts arrangement and the FEA Materials / Lockheed-Martin / DoD Al-Sc master-alloy initiatives into **binding, priced, multi-year offtake for a meaningful share of the ~85 t/yr of currently-uncommitted scandium.** On top of that, the **updated Feasibility Study would need to confirm capex at or below the ~$1.14–1.2 B range with realistic (post-2019) cost inputs and adequate contingency, validate the twin-decline/Railveyor and rare-earth circuits at feasibility grade, and ideally add rare-earth NPV as genuine upside.** If those line up, the published economics ($2.35 B after-tax NPV, 27.6% IRR vs. a ~$0.77 B market cap) imply very large re-rating potential, and the downside tables show the project still clears a positive NPV (~$1.2 B) even under a simultaneous capex +20% / prices −20% stress — i.e., the *base case* is robust; the *binary risks* are financing and scandium demand.

## What would break the thesis
The thesis breaks if **EXIM under-delivers or rejects** and management is forced to fund construction with equity into a weak tape — an ~$800 M raise at a stressed price triples the share count (~67% dilution) and risks a financing-failure stall, the worst outcome because **there is no disclosed alternative lender.** It also breaks if **scandium demand never scales**: with ~54% of revenue riding on uncommitted scandium and the after-tax breakeven near **$1,130/kg** against a thin, volatile spot market that has frequently traded below the FS's $3,675/kg assumption, a scandium price or volume halving cuts NPV from $2.35 B to ~$0.88 B and a deeper move drives it toward zero. Secondary breakers compound these: an **updated FS that re-bases capex materially higher** (plausible given a 2019 cost basis, ~9.8% contingency, and a redesigned flowsheet) widens the funding gap and the dilution exactly when it hurts most; **construction delays** extend the cash burn and strain EXIM covenants. In short, the model's *operating economics* survive ordinary commodity and cost stress — what can actually kill it are the two binary, largely-out-of-management's-hands variables: **the EXIM decision and the existence of a real scandium market.**

---

### Disclaimer
Research compilation from public primary sources as of 2026-06-21 for informational/due-diligence purposes only. **Not investment advice** and not a recommendation to buy, sell, or hold any security. 🟡 COMPUTED and 🔴 LOW-CONF figures are my estimates derived from the cited primary data using the stated methods — they are **not** published by NioCorp and should be independently verified against the full technical report and latest filings before being relied upon. The 2022 FS predates the pending updated Feasibility Study and may change materially.
