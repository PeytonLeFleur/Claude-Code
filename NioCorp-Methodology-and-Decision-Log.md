# How This Package Was Built — Methodology & Decision Log

*A provenance record for the NioCorp (NB) research package: where every load-bearing number came from, when in the build it was decided, how it was derived, and which judgment calls drove it. The point is auditability — so a reader can see the seams, not just the conclusions.* **Not investment advice.**

Two fixed reference points used throughout the package:
- **Model date: 2026-06-21.** **Market data: NB $5.31 as of 2026-06-18** (last close before the build).
- Everything was produced in one working session, in the build order below. There are no wall-clock timestamps; "when" is expressed as the **build step** in which a number was decided, and which evidence had arrived by then.

---

## 1. The method in one paragraph

Each document was built by **fanning out parallel research sub-agents** against primary sources (SEC EDGAR, the 2022 S-K 1300 Technical Report, EXIM/DoD/White House/Federal Register, USGS), then **centralizing the math myself** (returns, sensitivities, dilution, per-share valuation) so the calculations were consistent and verifiable. Every figure was tagged by **type** — 🟢 disclosed/primary, 🟡 computed estimate, 🔶 external/live data, or judgment — and by **confidence** (High/Medium/Low). Where evidence was missing I wrote "not disclosed / NO EVIDENCE FOUND" rather than infer. Where later evidence contradicted an earlier conclusion, I corrected it in a new document and said so out loud rather than silently editing the original.

---

## 2. Build chronology (the "when") — what was decided at each step

| Step | Document produced | Key decisions made *at this step* | New evidence that arrived |
|---|---|---|---|
| 1 | **Due-Diligence** (50 Q) | Which of 50 questions are disclosed vs not; that the project is **scandium-weighted, not niobium**; flagged the NPDES-permit discrepancy | 6 parallel agents on SEC filings, 2022 FS, releases |
| 2 | **2022-FS-Stress-Test** | Chose the **TRS economic-model base ($2,350M NPV)** over the press-release run (~$1.7B); computed all capex/sensitivity/**dilution** tables; verified arithmetic in Python | A dedicated agent pulled the **actual S-K 1300 TRS** (capex line items, the Nb & Sc sensitivity tables); a second pulled the **exact share count** (145.6M basic / 174.5M FD) |
| 3 | **Government-Policy-Dossier** | Graded government support on a **1–10 commitment scale**; concluded support is "policy tailwind + one $10M grant," **not** binding | 8 parallel agents; found DLA scandium dollars went to **Rio Tinto, not NB**; Trump/Vance/Rubio never named NB |
| 4 | **Event-Study** | Built government-catalyst return windows; concluded catalysts **spike then fade** for pre-revenue names | Event agents + **price agents**; MCP market tool needed approval → pivoted to the public price API; corrupted scraped rows marked data-n/a |
| 5 | **README / Decision-Memo / rename** | Synthesized the thesis stack; renamed the stress file for consistency | — |
| 6 | **Cross-Examination + Scenario-Price-Model** | Set the **~35% EXIM probability**; built the **P/NAV valuation lattice**; let the **scandium $640/kg finding revise earlier confidence** | 4 verification agents (EXIM mechanics, filings audit, **scandium market — the $640/kg fact**, pre-revenue re-rate sample) |

**The single most important sequencing fact:** the **scandium spot price (~$640/kg)** and the **Perpetua "+12%, not zero"** correction both arrived in **Step 6**, *after* Steps 1–2 had already anchored on the FS's $3,675/kg. That is why those two items are presented as **corrections/overrides in the later documents** rather than baked into the originals — and why the package explicitly flags that the original Due-Diligence and Stress-Test carry the more generous scandium assumption.

---

## 3. Provenance of every load-bearing number (the "how")

Legend — **Type:** 🟢 repo/primary disclosed · 🟡 computed by me · 🔶 external/live · ⚖️ calibrated judgment.

| Number | Value | Type | How it was derived | Decided at step |
|---|---|---|---|---|
| Current price | $5.31 (2026-06-18) | 🟢 | Live quote pulled before build | 2 |
| Shares: basic / FD / ITM | 145,587,048 / 174,456,547 / 156,608,329 | 🟢/🟡 | Basic from 10-Q cover; FD = basic + 20.96M warrant-underlying + 4.40M options + 3.52M ECRC vested (agent summed from 10-Q Note 7) | 2 |
| Market cap | ~$773M | 🟡 | $5.31 × 145.6M | 2 |
| After-tax NPV @8% | $2,350M | 🟢 | TRS Table 19-11 (economic-model base, $3,675/kg Sc) — chosen over the $1.7B press run because it's the set the published NPV ties to | 2 |
| Initial capex | $1,141M | 🟢 | TRS Table 1-6 (summed line items; verified to $1,140.5M) | 2 |
| Contingency 9.79% | $101.7M | 🟢 | TRS Table 18-19; my judgment "thin" is ⚖️ | 2 |
| Funding gap | ~$800M | 🟡 | ≈ capex − cash, and matches the EXIM ask; a derived/round figure, not a company "remaining $" line | 1–2 |
| Stress NPVs ($1,214M / $952M / $875M / $261M) | — | 🟢/🟡 | Scandium/Nb rows read **directly** from TRS tables; capex/opex/combined rows **computed** (ΔNPV ≈ −0.9×Δcapex; annuity PV for opex), method shown in the Stress-Test footnotes; arithmetic Python-verified | 2 |
| Revenue split (Sc 61.7% / Nb 36.4% / Ti 1.9%) | — | 🟢 | TRS Table 19-11 LOM gross revenue | 1–2 |
| Dilution matrix (296M @ $5.31, 446M @ $2.66, etc.) | — | 🟡 | new shares = equity ÷ price; dilution = new ÷ (basic + new); Python-verified | 2 |
| Event-study analog moves (MP/LAC/PPTA/NB/Intel) | — | 🟢/🟡 | Adjusted closes from public price API; windows computed; corrupted rows excluded | 4 |
| Commitment scale (1–10) per catalyst | — | ⚖️ | A defined ordinal scale (1 binding equity … 10 political statement) applied to each event | 3 |
| 🔶 Scandium spot ~$640/kg; ~80 t/yr | — | 🔶 | USGS MCS-2026, pulled in Step 6 — **external override**, never substituted into the repo NPV | 6 |
| EXIM full-approval probability ~35% | — | ⚖️ | Not a formula — a weighing of named for/against factors (see §4) | 6 |
| P/NAV stage multiples (0.1–0.3 / 0.4–0.7 / 0.7–1.0×) | — | ⚖️ | Standard mining-developer convention, applied to the $16.14 full NAV | 6 |
| Scenario price ranges (LOW/BASE/HIGH) | — | 🟡+⚖️ | Reconciliation of Method (a) NAV/share and Method (b) catalyst overlay; Python-computed lattice | 6 |
| Probabilities on X1–X6 branches | — | ⚖️ | Calibrated judgment, stated with confidence tags | 6 |

---

## 4. The judgment calls — and exactly why (the "why")

These are the places where there is no disclosed number and I **decided** one. Each is labeled ⚖️ in the documents; here is the reasoning, so you can disagree with the inputs rather than the output.

- **EXIM full-approval ≈ 35%.** *For:* EXIM's active critical-minerals posture, Perpetua ($2.9B) and ioneer ($996M) precedents, a supportive chairman, NB already in TRC-2. *Against:* the LOI has sat **3+ years** with no board date; the updated FS is a **precondition** and isn't out; the export nexus only clears via a **discretionary carve-out**; EXIM gave the **same LOI to an Australian competitor**; an independent technical review will stress a scandium bank-case far below $3,675/kg. Net of those, I landed at ~35% (range 25–45%), explicitly a lean, not a calculation.
- **Choosing the $2,350M TRS base over the ~$1.7B press run.** Decided in Step 2 because the $2,350M figure is the one that **internally ties together** ($21,900M LOM revenue, $46.56/kg Nb economic-model price). I flagged the discrepancy rather than hide it.
- **Capex ΔNPV ≈ −0.9 × Δcapex.** A first-order rule (up-front spend, PV≈1, lightly cushioned by depreciation tax shield) used only because the TRS publishes capex sensitivity as a **graph, not a table**. Labeled 🟡 with the method shown.
- **P/NAV multiples.** Mining developers don't trade at 1.0× NAV pre-production; 0.1–0.3× pre-financing rising to 0.7–1.0× near production is the standard convention. Applied transparently so the discount is visible.
- **Letting scandium $640/kg override confidence, not the NPV.** The ground rule was "treat the repo as fact; label external data separately." So the $640 figure **lowers the probability and confidence on the high scenarios** and is shown as a kill-switch — but I did **not** rewrite the repo's $3,675/kg NPV. That's why both numbers coexist.
- **"Catalysts fade" = directional prior, not a law.** Decided in Step 6 after the re-rate-sample agent: n≈6–8, one 18-month regime, a real confounder — so I stated it as a lean, not a rule.

---

## 5. Tooling, limits, and where the data is soft

- **Market-data tool.** The sandbox's MCP market tool required an interactive approval unavailable in this run, so historical prices came from a **public price API** (per the brief's "secondary for prices if needed" rule). Some scraped rows were **corrupted** (a few 2026 prints); those were re-fetched/cross-checked or marked **data-n/a** — never fabricated.
- **SEC/government pages** intermittently returned 403/451 to the fetcher; those facts were corroborated via primary mirrors and tier-1 reporting, flagged inline where it mattered.
- **No contact with NioCorp IR.** Every "not disclosed" means "not in the reachable public record," **not** "IR declined."
- **Soft spots, by name:** the exact fully-diluted count (derived, not a single disclosed line); capex/opex NPV sensitivities (graphs, so computed); all probabilities and P/NAV multiples (judgment); event-study returns (good to ~2 significant figures, not audited).

---

## 6. Corrections made along the way (intellectual-honesty log)

When later evidence contradicted an earlier claim, I corrected it in a new document and said so, rather than quietly editing the original:

1. **Scandium market.** Originals carried the FS **$3,675/kg** and a "30–40 t/yr" market. Step-6 USGS data showed **~$640/kg and ~80 t/yr** — corrected and flagged as the most damaging fact, in the Cross-Examination and Scenario-Price-Model.
2. **Perpetua reaction.** The Event-Study read it as "no pop"; a Step-6 agent found CNBC reporting **~+12%** on approval day. Re-characterized as "muted/pre-priced," not zero.
3. **Filename.** `…Stress-Model.md` → `…2022-FS-Stress-Test.md` for consistency (Git-tracked rename).

---

### Caveats
Provenance record for a research package compiled on **2026-06-21** from public sources. Probabilities, P/NAV multiples, and scenario ranges are **calibrated judgment**, not disclosed facts. External data (🔶) is labeled and was used to adjust confidence, not to overwrite the repo's stated figures. **Informational and diligence purposes only — not investment advice, not a recommendation, no price target.**
