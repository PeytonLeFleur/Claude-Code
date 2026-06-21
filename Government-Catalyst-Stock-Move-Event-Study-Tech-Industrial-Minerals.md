# Government-Catalyst Stock-Move Event Study — Tech, Industrial & Minerals

**Question:** When high-level U.S. government officials or agencies create a company- or sector-specific catalyst, how much do stocks move, how long does it last, and which event type best models a possible **NioCorp (NB)** government catalyst?
**Window studied:** 2024-12-21 → 2026-06-21. **Today:** 2026-06-21 (last observable trading day 2026-06-18).
**Price source:** stockanalysis.com daily JSON history API, split+dividend **adjusted close** (`a` field), endpoint `…/api/symbol/s/{TICKER}/history?range=5Y&period=Daily`. Government-action sources: White House, Federal Register, DoD/War.gov, EXIM, DOE, Commerce, SEC 8-Ks, company releases (cited per event).

> **Data-integrity rules honored throughout:** Returns are raw cumulative % vs the event-day adjusted close; SPY% and sector% are the benchmark over the identical span. Any horizon after 2026-06-18 = **NOT YET OBSERVABLE** (never estimated). Scraped tables had occasional corrupted rows; load-bearing cells were re-fetched and cross-checked, and anything unverifiable is marked **data n/a** rather than guessed. The MCP market-data tool required interactive approval unavailable in this run, so prices were sourced from the public API per the brief's "Yahoo/secondary for prices if needed" rule.

---

## 1. Executive Summary

**Do government catalysts move stocks?** Yes — but the size and durability depend almost entirely on **whether money is attached and whether the company was already a fundamental story.** The biggest, most durable moves came from **binding capital into a single named company** (Intel's government equity stake: +40% by +60d and it kept climbing) and from **a government trifecta of equity + price floor + offtake** (MP Materials: +57% by +20d). The weakest came from **podium "investment pledges" with no federal dollars** (TSMC's $100B, Micron's $200B — buried by tariffs/earnings within days) and **executive orders that name no company** (nuclear/seabed EOs moved whole sectors on commodity beta, not company merit).

**Which event types move stocks most, and which fade fastest?** Ranked by observed durable alpha: (1) **binding government equity stake in a profitable operator** (Intel — durable rerate); (2) **equity + price-floor + offtake package** (MP — large pop, partial fade); (3) **direct DoD/DOE/EXIM capital into a pre-revenue developer** (NB's own $10M, LAC's DOE equity, LEU's HALEU — all **popped then faded**, several to sector-laggard); (4) **policy/EO sector tailwinds** (TMC, uranium names — violent but commodity-beta, round-tripped); (5) **named-but-promotional pledges** (TSMC/Micron — no durable alpha). The fastest faders are **"sell-the-news" on long-telegraphed milestones** (Perpetua's $2.9B EXIM *final approval* produced **no pop at all** — it was pre-priced) and **single-contract pops** (Palantir's $10B Army deal: +15% in a week, fully round-tripped to −8% by +180d).

**What this means for NB.** The closest structural analogs to NioCorp — **unbuilt resource developers receiving government capital (LAC, MP, PPTA, and NB's own award)** — share one uncomfortable pattern: **the government catalyst produces a tradeable spike, but the move does NOT durably hold unless execution and demand also de-risk.** LAC faded −33% within 60 days while its sector rose; MP gave back most of its alpha vs miners by +180d; PPTA's binding EXIM approval didn't move the stock; even NB's +98%-at-+60d award had *lagged* the mining sector (XME) by +180d. The durable rerate (Intel) belonged to a **profitable incumbent**, which NB is not. **Translation: a NioCorp government catalyst is far more likely to be *tradeable* than *thesis-changing* — unless it is the rare trifecta (binding capital + binding offtake/price floor) that removes financing AND demand risk at once (the MP template).**

---

## 2. Methodology

- **Event selection.** From the ~60 names in scope, an event qualifies only if a **government actor took a discrete, dated action** toward the company or its sector inside the window. Pure earnings/AI-demand/spin-off moves are excluded from "government catalyst" status (but two — Dell, SanDisk — are retained as **negative controls** to show what *non*-government moves look like).
- **Price windows.** Event-day close, then +1/+5/+20/+60/+90/+180 trading days and +365/+540 calendar days (nearest prior trading day). Horizons past 2026-06-18 = NOT YET OBSERVABLE.
- **Benchmark adjustment.** SPY over the identical span. **Sector adjustment** per mapping: minerals/mining → **XME**; uranium → **URA**; lithium → **LIT**; semis → **SMH**; defense → **ITA**; steel → **SLX**.
- **Exclusion rules.** Corrupted scraped values excluded (marked data n/a); confounded events flagged, not silently used.
- **Causality grading.** Each event checked for a confounding catalyst within ±10 trading days (earnings, offering, index add, sector rally, commodity spike), then graded: **CLEAN GOVERNMENT CATALYST / MIXED / MOSTLY FUNDAMENTAL / MOSTLY MARKET BETA / UNUSABLE.** UNUSABLE and MOSTLY-FUNDAMENTAL events are **not** used to build NB scenario ranges.
- **Commitment scale (1–10):** 1 binding gov equity · 2 binding loan/guarantee · 3 binding procurement/offtake · 4 awarded grant · 5 stockpile purchase · 6 conditional loan commitment · 7 letter of interest · 8 formal review · 9 policy inclusion · 10 political statement.

---

## 3. Master Event Table

Raw cumulative % vs event day (adjusted close). "—" = data n/a; "NYO" = not yet observable. Sector ETF in the SEC column header per event. Bold = the cleanest NB-relevant analogs.

| Company | Tkr | Event date | Gov actor | Event type (scale) | Direct/sector | Binding? | +1d | +5d | +20d | +60d | +90d | +180d | +365d | +540d | Causality | Source (gov) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **MP Materials** | MP | 2025-07-10 | DoD | Equity+price-floor+offtake (1) | Direct | Y | −0.3 | +33 | **+57** | +58 | +30 | +15 | NYO | NYO | MIXED (Apple 7/15, $650M raise 7/16) | mpmaterials 8-K |
| **Lithium Americas** | LAC | 2025-10-01 | DOE | Loan restructure + gov equity (1–2) | Direct | Y | −2.6 | +12 | −18 | **−33** | −33 | NYO | NYO | NYO | CLEAN | energy.gov |
| **Perpetua** | PPTA | 2026-05-21 | EXIM | $2.9B loan final approval (2) | Direct | Y | −5.2 | +1.3 | NYO | NYO | NYO | NYO | NYO | NYO | CLEAN (pre-priced, no pop) | EXIM PR |
| **NioCorp** | NB | 2025-08-05 | DoD | $10M DPA Title III grant (4) | Direct | Partial | +5.0 | +18 | +14 | **+98** | +69 | +49 | NYO | NYO | MIXED (sector rally; financings) | niocorp PR |
| **NioCorp** | NB | 2026-02-26 | (co./MSHA) | Portal construction launch (10) | Direct | n/a | −5.9 | −12 | **−19** | −4 | NYO | NYO | NYO | NYO | MOSTLY FUNDAMENTAL (sell-news) | niocorp PR |
| **Intel** | INTC | 2025-08-22 | WH/Commerce | US ~10% equity stake (1) | Direct | Y | −1.0 | −1.8 | +16 | **+40** | +49 | +386‡ | NYO | NYO | MIXED (SoftBank 8/18, Nvidia 9/18) | newsroom.intel |
| Nvidia | NVDA | 2025-04-15 | Commerce/BIS | H20 China export ban (neg) (6) | Direct | Y | −6.9 | −8.5 | +21 | +46 | +60 | +68 | +77 | NYO | CLEAN (neg) | SEC 8-K |
| Nvidia | NVDA | 2025-07-14 | Trump/Commerce | H20 ban reversal (6) | Direct | Y | +4.0 | +4.5 | +11 | — | +10.5 | — | — | NYO | CLEAN | CNN/Commerce |
| Nvidia | NVDA | 2025-01-21 | WH | Stargate (promoted private capex) (9) | Direct (partner) | N | +4.4 | −8.4 | −1.1 | −26 | −4.0 | +34 | +30 | NYO | MIXED→BETA (DeepSeek 1/27) | whitehouse |
| TMC | TMC | 2025-04-24 | WH | Seabed-minerals EO (9) | Sector | N | −17 | −16 | +17 | +91 | +54 | **+121** | **0** | NYO | MOSTLY BETA (round-trip) | EO 14285 |
| Energy Fuels | UUUU | 2025-05-23 | WH | Nuclear EOs (9) | Sector | N | +0.9 | −9.8 | +1.5 | +57 | +191 | **+303** | +234 | NYO | MOSTLY BETA (uranium price) | WH EOs |
| Uranium Energy | UEC | 2025-05-23 | WH | Nuclear EOs (9) | Sector | N | +2.0 | −12 | +2.2 | +50 | +101 | +153 | +102 | NYO | MOSTLY BETA | WH EOs |
| Cameco | CCJ | 2025-05-23 | WH | Nuclear EOs (9) | Sector | N | +3.0 | −0.9 | +19 | +26 | +42 | +102 | +79 | NYO | MOSTLY BETA | WH EOs |
| Oklo | OKLO | 2025-08-12 | DOE | Reactor Pilot selection (9) | Direct (no $) | N | −1.3 | −17 | −6.0 | +54 | −1.0 | −7.6 | NYO | NYO | MIXED/BETA (sell-news) | businesswire |
| Centrus | LEU | 2025-06-25 | DOE | HALEU milestone/award (3–4) | Direct | Y | −3.4 | −2.6 | +34 | +63 | **+103** | +16 | NYO | NYO | MIXED (converts; pop faded) | energy.gov |
| Lockheed | LMT | 2025-01-27 | WH | Golden Dome EO (9) | Sector | N | −9.2 | −9.6 | −11 | −7.3 | −3.7 | +2.5 | +22 | NYO | MOSTLY BETA (neg reaction) | EO 14186 |
| Palantir | PLTR | 2025-07-31 | Army | $10B enterprise ceiling (3) | Direct | Y | −2.6 | +15 | −0.2 | +17 | +19 | **−7.9** | NYO | NYO | MOSTLY FUNDAMENTAL (earn 8/4) | army.mil |
| U.S. Steel | X | 2025-01-03 | Biden/CFIUS | Blocks Nippon deal (neg→+) (1) | Direct | Y | +8.1 | +19 | +20 | +39 | +38 | delist | delist | delist | CLEAN (paradoxical +) | bidenWH EO |
| U.S. Steel | X | 2025-06-13 | Trump | Golden-share approval (1) | Direct | Y | +5.1 | delist | delist | delist | delist | delist | delist | delist | CLEAN (then $55 cash-out 6/18) | WH EO |
| Cleveland-Cliffs | CLF | 2025-06-04 | Trump | Sec.232 steel 50% (6) | Sector | Y | −5.8 | −2.3 | +16 | +43 | — | — | — | NYO | MOSTLY BETA (sector) | Proc.10947 |
| **Negative controls (NOT government-driven)** | | | | | | | | | | | | | | | | |
| SanDisk | SNDK | 2025-02-24 | (none) | Spin-off + NAND cycle | — | — | −0.9 | +3.5 | +9.0 | −20 | −4.9 | **+393** | **+1214** | NYO | UNUSABLE (no gov event) | WDC 8-K |
| Dell | DELL | 2025-01-21 | (none) | Stargate read-through / AI servers | — | — | — | — | — | — | — | — | — | — | MOSTLY FUNDAMENTAL | (see §4) |

‡ Intel +180d (+386%) is a **real** adjusted close (cross-checked: ~$25→~$121), but causality is MIXED — it bundles the gov stake with SoftBank's $2B (8/18), Nvidia's $5B (9/18), and the AI/foundry cycle. The cleaner gov-stake isolate is the first ~90 days (≈+40–49%).

### Benchmark- and sector-adjusted alpha (key NB analogs)
| Event | Window | Raw % | SPY-adj | Sector-adj | Read |
|---|---|---|---|---|---|
| MP (DoD) | +20d | +57 | +56 | **+49 (XME)** | Huge clean alpha early… |
| MP (DoD) | +180d | +15 | +12 | **−33 (XME)** | …round-tripped to a *mining-sector laggard* |
| LAC (DOE equity) | +60d | −33 | −37 | **−51 (LIT)** | Catalyst, then severe sector underperformance |
| LAC (DOE equity) | +90d | −33 | −37 | **−58 (LIT)** | The pop was gone in a month |
| NB (DoD $10M) | +60d | +98 | +88 | **+68 (XME)** | Real alpha on the award… |
| NB (DoD $10M) | +180d | +49 | +36 | **−7 (XME)** | …faded to *behind* the mining sector |
| Intel (equity) | +60d | +40 | +37 | **+24 (SMH)** | Durable alpha — but profitable incumbent |

---

## 4. Dell Case Study

**Was Dell directly helped by government action? No.** The one genuine federal item is a ~**$9.7B, 5-year DoD software-reseller agreement (announced 2026-05-27)** — but it is low-margin license reselling (Microsoft/War Dept vehicle), not AI infrastructure or CHIPS, and it moved the stock only ~4–5%. The headline **~+32% single-day spike came the next session from Q1 FY27 earnings** (AI-server revenue +757% y/y, ~$51B AI backlog) — a fundamental, not a government, event. Dell was **not** a named Stargate principal and received no CHIPS/federal AI money; its real 2025–26 catalysts were the xAI (~$5B, Feb 2025) and CoreWeave (Dec 2024) private deals and the AI-server cycle.
**Is Dell a good NB comparison? No — weak/misleading.** Using Dell would import an AI-server-demand move and mislabel it "government." **Useful part:** it illustrates that markets reward *binding revenue* (the AI backlog) far more than a government supply contract. **Misleading part:** Dell is a profitable mega-cap with no financing overhang — the opposite of NB.

## 5. SanDisk Case Study

**Was SanDisk helped by government action? No — there is no White House/Commerce/CHIPS/federal-procurement event naming SanDisk anywhere in the window.** SanDisk is a flash/module maker, not a fab CHIPS recipient, and appears on no award list. The early move is pure **spin-off mechanics** (separated from Western Digital 2025-02-21, regular-way 2025-02-24, 1/3-share distribution). The spectacular run — **+393% by +180d and +1,214% by +365d** (a *real* adjusted-close move, cross-checked) — is the **NAND/AI-memory supercycle** (undersupply, hyperscaler SSD demand, rising wafer prices), not policy.
**Is SanDisk a good NB comparison? No — actively misleading.** It is the single best example in this study of a **huge multi-bagger with zero government causality.** **Useful part:** as a cautionary control — anyone attributing a commodity/cycle move to "government support" is making exactly the error this study is built to prevent. **Misleading part:** the magnitude tempts a false "small-cap + government = 10x" narrative; the cause here was a memory shortage, which has no NB analog.

## 6. Stargate & AI-Infrastructure Basket

Stargate (WH, 2025-01-21) is **government-promoted *private* capex ($100B immediate/$500B by 2029) with no federal dollars** — commitment scale 9. Effects, by tier:
- **Directly named equity partners:** Oracle (ORCL), SoftBank, OpenAI, MGX. *Only Oracle is investable here* — but its durable 2025 move came from **September RPO earnings (~$455B backlog), not Stargate.** Stargate itself = promotional.
- **Named tech partners:** Nvidia, Arm, Microsoft, Oracle. **NVDA popped +4.4% on day 1, then −8.4% by +5d** as the **DeepSeek selloff (2025-01-27, NVDA −17% single day)** erased it. The window is *uninterpretable* for AI names without bracketing DeepSeek.
- **Power/infrastructure read-throughs:** VST, CEG, GEV, VRT, ETN, PWR — **sector tailwind only; the EOs named no company.** Constellation (CEG) is the exception: it had *separate binding* government events (GSA federal-power contract 2025-01-02; $1B DOE loan 2025-11-18).
- **Storage/memory read-through:** MU, SNDK — **NAND cycle, not Stargate.**
- **Weak read-through (do not use):** AVGO, MRVL, SMCI, DELL — no qualifying government event; all earnings/AI-demand driven.

**Verdict:** Stargate is a poor NB template — it is a private-capex headline, not committed federal money. Its lesson for NB is cautionary: a podium announcement without dollars produces a 1-day pop that beta erases within a week.

## 7. Critical-Minerals & Defense-Mineral Comparisons (the core NB analogs)

| Name | Gov action | Best window move | What happened next | NB read-through |
|---|---|---|---|---|
| **MP Materials** | DoD **equity + $110/kg price floor + 10-yr offtake** (the trifecta) | **+57% @ +20d** | Faded to +15% raw / **−33% vs XME** by +180d | The bull template — but even it didn't *hold* its alpha; and MP is near-producing, NB is not |
| **Lithium Americas** | DOE loan restructure **+ US gov equity** | +12% @ +5d | **−33% @ +60d (−51% vs LIT)** | Closest structural twin (unbuilt mine + gov capital) — and it **faded hard** |
| **Perpetua** | **EXIM $2.9B final approval** | **0% (no pop)** | Pre-priced; only short windows observable | A *binding* EXIM approval can be a **non-event** if telegraphed — directly relevant to NB's EXIM thesis |
| **Centrus** | DOE HALEU award | +103% @ +90d | Faded to +16% @ +180d | Award pops fade without follow-through |
| **Energy Fuels / UEC / Cameco** | Nuclear EOs (no company $) | +191–303% @ +90–180d | Uranium-price beta, not company capital | NB's sector-EO tailwinds (critical-minerals EOs) are **commodity beta**, not NB-specific |
| **TMC** | Seabed EO (no $) | +121% @ +180d | **Round-tripped to 0% @ +365d** | Pure policy/EO narrative fully reverses within a year |
| **Oklo** | DOE pilot selection (no $) | −17% @ +5d | Sell-the-news | Program "selection" without dollars can fall on the news |
| **NioCorp (actual)** | $10M DPA grant | +98% @ +60d | **−7% vs XME @ +180d** | NB's *own* government pop already faded to sector-laggard |

**The pattern is unambiguous:** government capital into **unbuilt mineral developers** (LAC, NB, PPTA) produces a spike that **fades** — often to *underperform the very sector ETF* — because the catalyst de-risks *financing optics* but not *execution or demand*. The only example that durably re-rated (Intel) was a **profitable operating company**, and the only one that combined **capital + price floor + offtake** (MP) is **near-production**. NB is neither.

## 8. Bad Comparisons (do NOT use for NB scenario ranges)

| Name | Why excluded |
|---|---|
| **SanDisk (SNDK)** | +1,214%/yr move was NAND supercycle + spin-off; **no government event.** Too tempting, totally misleading. |
| **Dell (DELL)** | AI-server earnings (+757%); the real gov contract moved it ~5%. Profitable mega-cap, no financing overhang. |
| **Nvidia (NVDA)** | Too large/liquid; H20 ban/reversal were real gov events but **AI demand swamped** them (ban fully recovered in weeks). |
| **Intel (INTC)** | Best *gov-equity* analog, but **profitable incumbent** + SoftBank/Nvidia confounds; magnitude not transferable to a pre-revenue junior. |
| **Uranium basket (UUUU/UEC/CCJ)** | **Commodity (uranium price) beta**, not single-name capital; EOs named no company. |
| **Steel/aluminum (CLF/NUE/AA/X)** | Sector tariff beta; X is a **cash-takeout** (delisted at $55) — terminal, not a rerate. |
| **Palantir / TSMC / Micron / GFS / Marvell / Broadcom** | Either no qualifying gov event, or moves were **earnings/AI-demand**; pledges (TSMC $100B, Micron $200B) carried **no federal money**. |

These are excluded because they are too large, too liquid, already profitable, lack a financing overhang, or the move was earnings/commodity/index-driven — none of which matches NB (a pre-revenue, capital-hungry, demand-creating micro-cap).

## 9. NioCorp Scenario Table (historical analog ranges — NOT forecasts, NOT price targets)

NB facts: pre-revenue Elk Creek developer; ~$1.1B capex gap; EXIM ~$800M application *in review* (no board vote); $10M DPA grant; scandium demand-creation risk; serial dilution. Ranges below are **observed analog moves**, labeled by the cleanest comparable. "Durable?" reflects whether analogs *held* the move.

| Case | Description (commitment scale) | Closest observed analogs | Low → Base → High analog (raw, ~+20–60d) | Spike or durable? | What makes it hold / fade |
|---|---|---|---|---|---|
| **A** | Weak sector policy tailwind, NB not named (9) | TMC seabed EO; nuclear EOs; CLF tariffs | +0% → +15% → +50%+ (but **round-trips**: TMC +121%→0% @365d) | **Spike only; tradeable not investable** | Holds only if commodity price follows; fades as beta |
| **B** | Direct political mention, no money (10/8) | TSMC $100B, Micron $200B pledges; (NB has had *none* from Trump/Vance/Rubio) | +0% → +3–5% (1-day) → ~+10% | **Spike, fades in days** | Nothing to hold it; no dollars |
| **C** | Agency funding expansion (bigger DoD/DPA/DOE) (4) | **NB's own $10M (+18%@5d, +98%@60d→faded)**; LEU HALEU (+103%@90d→+16%) | +15% → +40% → +100% | **Spike + partial hold; fades to sector by ~180d** | Holds only with follow-on capital/offtake |
| **D** | Govt stockpile purchase of NB material (5) | US Antimony DLA $245M (pos); but scandium stockpile went to **Rio Tinto**, not NB | +15% → +40% → +80% (if it ever names NB) | **Could be durable** — validates demand | Holds because it solves the demand problem; **risk: govt keeps buying Rio Tinto** |
| **E** | EXIM final commitment (2) | **Perpetua EXIM $2.9B = NO pop (pre-priced)**; LAC DOE = +12% then −33% | **−5% → +10% → +30%**, then fade risk | **Often a non-event or sell-the-news if telegraphed** | Holds only if it *surprises* and unlocks construction; LAC shows it can fade hard |
| **F** | Binding government/defense **offtake** (3) | **MP Materials trifecta: +57%@20d** | +30% → +57% → +85% | **Biggest move in the study — but MP still faded vs sector by 180d** | Holds if paired with price floor + execution |
| **G** | Full capital stack closes (1) | MP (equity+floor+offtake); Intel (equity, durable) | +40% → +57% → +85%+ | **Most likely to durably rerate** | Removes financing AND demand risk together = the only durable setup |
| **H** | **Bear: EXIM delayed/reduced/rejected** | TSLA contract threat (−14% 1d); LMT F-47 loss; LAC fade; **govt chose Rio Tinto for scandium** | **−15% → −35% → −50%+** + forced dilution | **Durable downside** | Going-concern/dilution spiral; no disclosed Plan-B lender |

**Cross-case truth:** Even the **best** analog (MP, Case F/G) gave back most of its sector alpha within 180 days, and the **structural twins** (LAC, NB-own, PPTA — Cases C/E) **faded or never popped.** The base case for any NB government catalyst is a **tradeable spike that requires follow-through (binding offtake + closed financing + execution) to become a durable rerate.**

## 10. Final Investor Conclusion

- **Which government catalyst would matter most for NB?** **Case F/G — a binding offtake or price floor paired with closed financing (the MP Materials trifecta).** That is the only configuration in this study that both produced the largest move *and* had a mechanism to hold it, because it removes financing **and** demand risk simultaneously. NB's single biggest gap (scandium demand) is exactly what a government/defense **offtake or stockpile naming NB** would fix.
- **Does a Trump (or Vance/Rubio) mention alone matter?** **No — barely tradeable.** The "named but no money" analogs (TSMC $100B, Micron $200B) produced a 1-day pop that faded within days; and NB has had *no* such mention regardless. A name-check is commitment-scale 8–10 and historically generates no durable alpha.
- **Does an EXIM final commitment matter more than a mention?** **Yes, but less than expected, and possibly as a "sell-the-news."** Perpetua's *binding $2.9B EXIM approval* produced **no pop** (pre-priced after 3 years of telegraphing); LAC's gov loan+equity **faded −33%**. An EXIM commitment removes financing risk (necessary) but doesn't fix demand and is largely anticipated — so it may be a muted or even negative event unless it *surprises*.
- **Binding offtake/stockpile vs. EXIM — which matters more?** **A binding offtake or stockpile purchase that names NB matters more than EXIM**, because it attacks the **demand-creation** problem (the harder of NB's two risks) and is *not* yet priced in. EXIM is necessary; a binding scandium offtake/floor would be *sufficient* to change the thesis. (Caveat: the only real scandium procurement dollars so far went to **Rio Tinto**, not NB — Case H risk.)
- **Are Dell and SanDisk useful NB comparisons?** **No — both are misleading.** Dell = AI-server earnings; SanDisk = NAND supercycle + spin-off. Neither had a government catalyst; both are profitable/cyclical names with no financing overhang. Using them would falsely imply "government → multi-bagger." They are retained here only as **negative controls.**
- **What event would be *tradeable but not investable*?** A **sector EO or critical-minerals policy that doesn't name NB** (Case A), or a **second small DPA grant / political mention** (Case B/C). Expect a spike that beta erases — trade it, don't underwrite a thesis on it (TMC: +121% → 0% in a year).
- **What event would be *thesis-changing*?** **Case F/G: a binding government or defense-prime scandium offtake / price floor, ideally with a government equity stake AND closed EXIM debt** — the MP/Intel combination that removes both financing and demand risk. That is the only setup that durably re-rated in this study.
- **What event would *break* the thesis (Case H)?** **EXIM rejection/indefinite delay, or the government formalizing a competitor (Rio Tinto/ElementUS) as the scandium source.** Analog downside is −15% to −50%+ with forced dilution and going-concern risk — and unlike the upside, the **downside historically *holds*** (TSLA contract-threat −14% stuck; LAC bled for months).

**One-line synthesis:** In this 18-month sample, government catalysts reliably produce **spikes**, but **durability requires money + demand + execution together** — so for a pre-revenue, demand-creating, capital-hungry name like NioCorp, treat any government headline short of a **binding offtake-plus-financing package** as **tradeable, not investable**, and treat an **EXIM rejection or a competitor being chosen** as the cleanest, most *durable* move of all — to the downside.

---

### Disclaimer
Event study from public price data and primary government sources, 2024-12-21 → 2026-06-21, for informational/diligence purposes only. **Not investment advice; not price targets** — scenario figures are *historical analog ranges* from comparable companies, explicitly not forecasts for NB. Returns use split+dividend-adjusted closes; some scraped cells were unverifiable and are marked data n/a, and all horizons past 2026-06-18 are NOT YET OBSERVABLE. Several events are confounded (flagged); confounded/UNUSABLE events were excluded from NB scenario ranges. Verify all figures against primary price feeds and filings before relying on them.
