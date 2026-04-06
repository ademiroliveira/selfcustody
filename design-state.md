# Design State: Selfcustody Mobile

_Last updated: 2026-04-06 by content-writer + accessibility-reviewer (Designpowers)_

---

## Brief

- **Problem:** Individual accredited investors (Frontier investors) lack a self-custody wallet that combines portfolio visibility, AI-assisted decision-making, and transparent agent delegation — without sacrificing the security and trust that high-net-worth custody requires.
- **Primary persona:** Crypto-native accredited investor, high-net-worth, solo custody, open to AI assistance
- **Success metric:** Investor can set up self-custody, understand their portfolio at a glance, and approve/reject an AI agent action — all within 3 minutes of first launch
- **Prototype fidelity:** High-fidelity demo with mocked data. Architecture ready to swap in live blockchain data.

---

## Personas

_Formal persona documents not yet created (skipped in this sprint). Scheduled for v0.2._

**Working persona (from discovery):**
- **Alex, 38** — Individual accredited investor. Crypto-native. Holds BTC, ETH, and frontier DeFi positions. Manages own custody. Wants AI to monitor and suggest, but not act without explicit approval. Comfortable with DeFi concepts (yield, rebalancing, gas) but values clear explanations over jargon. Uses iPhone as primary device.

**Edge personas (not yet designed for):**
- First-time buyer transitioning from exchange to self-custody
- Investor with colour vision deficiency (flagged by accessibility-reviewer)
- User in high-stress scenario (lost access, price crash)

---

## Design Principles

1. **Trust Before Automation** — Every agent action is explainable and reversible before the user commits. Reasoning is never hidden behind a confirm button. We will NOT execute agent actions without surfacing the "why" first.

2. **Custody is Visible** — Key health and custody status are never buried. The user always knows where their keys are and what state they're in. We will NOT put security status only in a settings menu.

3. **Complexity Earns Itself** — Advanced features appear only after the user demonstrates readiness. The dashboard never overwhelms. We will NOT front-load DeFi jargon onto new sessions.

4. **Accessibility is Non-Negotiable** — Self-custody must work for investors regardless of vision, motor, or cognitive differences. Recovery moments — the highest-stakes UX — must be the most accessible. We will NOT use colour as the sole indicator of key health or P&L.

5. **Transparency in Yield Claims** _(added 2026-04-06, design-strategist)_ — APY, fees, and protocol risks are explicit at the decision point, not buried in footers. Rates are labelled as estimates. Receipt tokens, slashing risk, and counterparty dependency are disclosed before confirmation. We will NOT let investors commit capital without understanding what they're receiving and the risks involved.

6. **Reversibility of High-Value Actions** _(added 2026-04-06, design-strategist)_ — Staking and delegation actions must have a visible exit path. If an asset is staked, the unstake path is reachable from the portfolio. We will NOT create UX dead ends after high-value actions.

---

## Taste Profile

_No formal taste calibration was run. Craft evaluation uses general quality standards + inferred signals from build decisions._

**Inferred from build:**
- **Emotional target:** "Premium confidence" — serious, trustworthy, not flashy
- **Quality level:** Prototype (v0.1) → Production target for v1
- **Palette:** Deep navy dark UI (`#0A0C14`), Indigo accent (`#6366F1`), semantic colour for status
- **Shape language:** 16px card radius, 12px button radius — consistent, not fully rounded
- **Typography:** Inter for UI, monospace for addresses/numbers
- **Density:** Generous — scrollable, not cramped

_Full taste calibration scheduled before v0.2 visual polish._

---

## Decisions Log

### 2026-03-27 — Prototype v0.1 built

**Agent:** design-lead (build phase)

| Decision | Rationale |
|----------|-----------|
| Expo managed workflow | Fastest to investor demo; OTA updates |
| Zustand + React Query | No boilerplate; React Query handles news endpoint cache |
| Dark navy palette | Matches "premium confidence" target; standard for fintech |
| Approval gate at store level | Enforces "Trust Before Automation" in code, not just UI |
| Price simulation (±0.5% / 3s) | Live-feeling demo without network calls |
| Agent simulator timeline (T+15s, T+45s, T+90s) | Designed for investor demo pacing |
| Bar chart sparkline (not line chart) | Pragmatic — victory-native peer dep conflict; acceptable for prototype |

---

### 2026-03-27 — Critique v0.1 + fixes applied

**Agents:** design-critic, accessibility-reviewer

**Critical issues (fixed):**
- C1: PnLBadge was colour-only → fixed with ▲▼ arrows
- C2: AgentStatusPill status was colour-only → fixed, label now primary at 13px bold

**Major issues (fixed):**
- M1: SeedPhraseScreen was a stub → implemented with blur-on-background, checkbox confirmation gate, Alert confirmation
- M2: AssetRow touch targets → minHeight: 56 applied
- M3: Approval queue had no empty state → added with explanatory text
- M4: Chat error had no recovery → added "↺ Try again" button

**Deferred to v0.2 (see Design Debt Register):**
- m1: Dashboard greeting uses default wallet name
- m2: Price chart reads as histogram, not price line
- m3: Settings header back label may be truncated

---

### 2026-04-06 — Staking IA Evaluation

**Agents:** design-critic, heuristic-evaluator, design-strategist (Designpowers)
**Build reviewed:** Stake Flow (StakeAmount → StakeReview → StakeConfirm) + Earn Hub tab

#### Summary

The staking flow is conceptually sound and honours the brief's core promise — Trust Before Automation — through a three-screen confirmation flow with transparent yield calculations and epoch timing. Craft quality is solid: generous spacing, semantic colour, and a celebratory confirmation screen. However, three structural gaps would undermine investor trust in a live demo: a broken agent entry point, staked assets disappearing from portfolio view, and no inline validation feedback on the amount screen. The design-strategist also identified two missing principles (Transparency in Yield Claims, Reversibility of High-Value Actions) that are now added to the principles register.

#### Critical Issues (fix before demo)

| ID | Agent | Finding | Fix |
|----|-------|---------|-----|
| C1 | heuristic-evaluator | No inline error message when amount > balance or < minimum. Continue button disables silently. User must infer why. (H6 violation) | Add error text below input: "Minimum: 0.01 SOL" / "Max: 52.3 SOL". Updates dynamically. |
| C2 | design-strategist | Agent action-04 (SOL staking suggestion) does not navigate to StakeFlow. The agent entry point is completely broken — suggestions cannot be acted on. | Wire SuggestionCard approve action for staking actions to `navigate('StakeFlow', { screen: 'StakeAmount', params: { assetId: 'sol' } })` |
| C3 | design-strategist | After staking, assets disappear from portfolio view. No staked badge, no staked section, no indication that funds are still in user's custody. "Custody is Visible" principle violated. | Add [STAKED] indicator to asset position in Portfolio Dashboard and AssetDetailScreen. |

#### Major Issues (revise for v0.2)

| ID | Agent | Finding | Fix |
|----|-------|---------|-----|
| M1 | design-critic | Validator choice opaque. "Marinade (mSOL)" on Review but no reasoning, no metrics, no selection option. "Trust Before Automation" violated. | Add "Why this validator?" card on Review with uptime %, # validators, 30d APR. |
| M2 | design-critic | Network fee is visually buried — `text.tertiary` grey at bottom of Review card. Alex may not register the cost before confirming. | Upgrade fee row to `text.secondary` + `fontWeight: 500`. |
| M3 | design-critic | Post-confirm "Go to Earn Hub" (primary) vs "Back to Portfolio" (outline). Post-staking, the logical destination is portfolio to see the staked position — not the marketing hub. | Swap button priority. Or: route based on entry point (AssetDetail → back to AssetDetail; EarnHub → EarnHub). |
| M4 | heuristic-evaluator | No step indicator in the modal flow. User cannot gauge how far through 3 screens they are. (H1 violation) | Add "Step 1 of 3" to header or a progress dots row below header. |
| M5 | heuristic-evaluator | No explanation for ~48 hour activation. "Epoch" jargon without anchor. (H9 violation) | Add info tooltip next to "Activation timing": "Solana settles stakes at epoch boundaries, roughly every 24 hrs." |
| M6 | design-strategist | Screen headers are generic: "Stake" and "Review". Asset name is lost mid-flow. | Change to "Stake Solana", "Review Solana Stake", "Solana Stake Submitted". |
| M7 | design-strategist | Receipt tokens (mSOL, stETH, sAVAX) never mentioned in the flow. Users may not know they're receiving a new token. | Add receipt token disclosure on StakeAmount: "You'll receive mSOL — redeemable for SOL anytime." |
| M8 | design-strategist | APY risk disclaimer appears only in EarnHub footer. Not present at StakeAmount or StakeReview where the decision happens. | Move disclaimer to StakeAmount card footer and StakeReview disclaimer section. |

#### Minor Issues (deferred to design debt register)

- **m1** Liquidity guardrail is amber warning, not a hard block. User can trap themselves with 0 gas. → DD-009
- **m2** Epoch language inconsistent across screens (3 different phrasings). → Standardise to "~48 hrs at the next network checkpoint."
- **m3** APY badge inconsistent between featured SOL card (badged) and compact ETH/AVAX rows (plain text). → DD-010
- **m4** Confirm screen CTAs have asymmetric language ("Go to Earn Hub" / "Back to Portfolio"). → "Continue to Earn Hub" / "Return to Portfolio."
- **m5** Decimal places on balances: 52.300000 SOL. Round to 2-4 unless full precision is requested. → DD-011
- **m6** No "Learn more" links to protocol documentation (Marinade, Lido, BENQI). → DD-012

#### Persona Walkthrough Verdicts

| Persona | Outcome | Key friction |
|---------|---------|-------------|
| Alex (primary) | ✓ Completes staking — 7/10 confidence | Validator opacity, buried fee, post-confirm lands on Earn Hub not portfolio |
| Jordan (first-time buyer) | ⚠ Completes but confused | mSOL never explained, staking seems to "lose" SOL, jargon without anchor |
| Casey (colour vision deficiency) | ✗ Struggles | All APY badges and warning signals are colour-only; amber guardrail and green badge indistinguishable |

#### What Works Well

- Three-screen confirmation flow correctly honours Trust Before Automation
- Live reward calculation on StakeAmount is a strong trust and delight signal
- Liquidity guardrail (even as warning) demonstrates care for user's gas position
- Epoch timeline on StakeConfirm (indigo → amber → green dots) is elegant and educational
- Demo disclaimer is appropriately placed without disrupting flow
- accessibilityLabel/accessibilityRole coverage is solid on primary actions
- "No slashing risk · Liquid staking" on EarnHub is non-technical and reassuring

#### Recommendation

**Revise.** The flow is demo-ready for the happy path, but critical issues C1–C3 must be resolved before showing to investors. C2 (broken agent entry) and C3 (staked assets vanish) would immediately surface as questions that undermine confidence. Revise M3, M6, and M7 alongside the critical fixes for maximum impact. The two new design principles (P5, P6) should guide all subsequent staking and DeFi feature work.

#### design-critic → design-lead handoff

> "Verdict: revise. The three-screen staking flow is clean and the confirmation experience is genuinely strong — the epoch timeline and reward calculation are doing real work. But three things need fixing before demo: the agent entry point is broken (suggestions can't be acted on), staked assets disappear from portfolio view (violates Custody is Visible), and there's no inline validation feedback on the amount screen. Fix those and this is solid demo material. Also: add the asset name to the screen headers — users shouldn't have to remember they're staking SOL when the header just says 'Stake.'"

#### heuristic-evaluator → design-builder handoff

> "Two critical usability issues. The amount screen has no inline error messages — when someone enters 60 SOL with a 52.3 balance, the Continue button greys out silently and the user is left guessing. And there's no step counter anywhere in a 3-screen flow. These two fixes would eliminate the most likely demo friction points. The happy path tested well — the live reward calculation and the epoch timeline are genuinely excellent. Fix the error feedback and step visibility, and the usability is solid."

#### design-strategist → design-lead handoff

> "The staking IA has good bones but three structural gaps need addressing before investor demo: the agent action entry point doesn't connect to StakeFlow, staked assets are invisible in the portfolio, and screen headers lose the asset name mid-flow. I've added two new principles — Transparency in Yield Claims and Reversibility of High-Value Actions — that should guide staking and any future DeFi features. The journey mapping also revealed that users with colour vision deficiency can't distinguish APY badges from background; all colour-only signals need icon supplements. This is the most pressing accessibility gap now that aria labels are in place."

---

### 2026-04-06 — Content + Accessibility Review (staking screens)

**Agents:** content-writer + accessibility-reviewer (Designpowers, ran in parallel)
**Scope:** EarnHubScreen, StakeAmountScreen, StakeReviewScreen, StakeConfirmScreen, WalletNameScreen

#### Content Writer — Changes Made

| Item | Change | File |
|------|--------|------|
| DD-006 | Inline validation errors added: "Minimum stake is X SOL" / "Maximum available is X SOL" — announced via accessibilityLiveRegion | StakeAmountScreen |
| m2 | Epoch language standardized to "Earning starts in ~48 hours (next epoch)" across all 3 screens | StakeAmountScreen, StakeReviewScreen, StakeConfirmScreen |
| M7 | Receipt token disclosure added: "You'll receive mSOL — redeemable for SOL anytime" (per protocol) | StakeAmountScreen + staking.mock.ts |
| M8 | APY risk disclaimer added to StakeAmount and StakeReview: "APY (annual percentage yield) is estimated based on current network conditions and may vary." | StakeAmountScreen, StakeReviewScreen |
| M1 | "About this validator" → "Why [Protocol]?" with new rationale copy per protocol | StakeReviewScreen + staking.mock.ts |
| m4 | Button label asymmetry fixed: "Back to Portfolio" → "Go to Portfolio" — parallel structure with "Go to Earn Hub" | StakeConfirmScreen |
| guardrail | ⚠ prefix added to liquidity guardrail text — meaning now conveyed without relying on amber colour alone | StakeAmountScreen |
| trust signal | ✓ prefix added to "No slashing risk · Liquid staking" — positive signal independent of colour | EarnHubScreen |

**Reading level:** All copy reviewed at Grade 6–8. "DEX" kept in Marinade copy because it's paired with "any Solana DEX" — context carries meaning. "Epoch" retained throughout but now anchored: "~48 hours (next epoch)" — time always appears first.

**Vocabulary locked for staking screens:**
- "Earning starts" (not "active", not "rewards begin")
- "Redeemable for [asset] anytime" (not "unstakeable", not "liquid")
- "Go to [Place]" (not "Back to", not "Return to")
- "[Protocol]?" not "About this validator" — makes the rationale card scannable

#### Accessibility Reviewer — Targeted Staking Screen Review

**Standard:** WCAG 2.1 AA minimum

| # | Finding | Severity | Fix applied |
|---|---------|----------|-------------|
| A1 | `colors.accent.green` (#059669) on white background = 3.55:1 — fails AA for normal text. Affects APY badge text, trust signal, compact APY numbers, and rewards values. | **Major** | ✓ Fixed — changed to #047857 (4.84:1) globally in theme/colors.ts |
| A2 | Trust signal "No slashing risk · Liquid staking" was colour-only positive indicator (green text, no icon) | Major | ✓ Fixed — ✓ prefix added; meaning now conveyed by text + symbol |
| A3 | Epoch timeline dots in StakeConfirmScreen are colour-coded (indigo/amber/green) with no accessible markup | Minor | ✓ Fixed — `accessible={false}` on all dots; text labels carry full meaning |
| A4 | ✓ checkmark in StakeConfirmScreen success icon: Text emoji read by VoiceOver as "heavy check mark" not "success" | Minor | ✓ Fixed — wrapper View has `accessibilityLabel="Success"` + `accessibilityRole="image"`; emoji has `accessible={false}` |
| A5 | Validation error text in StakeAmountScreen needs live announcement | Minor | ✓ Fixed — `accessibilityLiveRegion="polite"` on error Text |
| A6 | Compact ETH/AVAX rows: icon container is 36×36px. Tappable area is the full row (likely 44px+ height), so not a violation. Visual icon size acceptable at 36px for non-tappable icon element. | Note | No fix needed — row height exceeds 44px minimum |
| A7 | StakeConfirmScreen: modal has no dismiss button (headerShown: false). iOS swipe-down dismisses. Android back button works. Not a WCAG violation but could trap users who navigate with switches. | Minor | Deferred — see DD-013 |
| A8 | APY badge in StakeAmountScreen and StakeReviewScreen: background is `colors.accent.green + '18'` (9.4% opacity) — near-transparent, no contrast issue with badge background itself. Text contrast is now resolved by global green token fix (A1). | ✓ Pass | — |

**What works well:**
- All primary action buttons have `accessibilityLabel` + `accessibilityRole="button"`
- EarnHub staking CTAs include full APY expansion: "APY (annual percentage yield)" in label
- StakeAmountScreen TextInput has `accessibilityLabel="Stake amount in SOL"` — clear and contextual
- WalletNameScreen has `accessibilityHint` on the input — excellent practice
- No colour-only status indicators remain after this pass (A1–A2 fixed)

**Overall verdict:** Pass (with fixed items applied). No remaining Critical issues. DD-013 logged for switch navigation edge case.

#### content-writer → design-builder handoff

> **content-writer → design-builder:** "All strings are final and in the files. Three important dynamic patterns: (1) validation errors use the asset symbol from the config — don't hardcode SOL; (2) receipt notes and 'Why [Protocol]?' copy are per-protocol fields in staking.mock.ts; (3) 'Go to Earn Hub' / 'Go to Portfolio' must stay parallel — no future renaming of one without the other. Reading level is Grade 7 across the staking screens. The word 'epoch' always appears after a time anchor (e.g. '~48 hours (next epoch)') — never alone."

#### accessibility-reviewer → design-builder handoff

> **accessibility-reviewer → design-builder:** "One global fix applied: green token changed from #059669 to #047857 — this lifts APY text, trust signals, and reward values to AA compliance across the entire app. All staking-specific colour-only signals are now resolved. One minor deferred item: StakeConfirmScreen has no modal dismiss affordance for switch users (DD-013) — not blocking, but schedule it before accessibility audit. The epoch dots, checkmark, and error announcements are all clean now."

---

## Design Debt Register

_Items: 13 | Oldest: 2026-03-27_

| ID | Date | Source | Severity | What | Who is affected | Suggested fix | Status |
|----|------|--------|----------|------|----------------|---------------|--------|
| DD-001 | 2026-03-27 | design-critic | Minor | Dashboard greeting shows "Primary Wallet" — not personalised | All users — cold, impersonal for HNW audience | Prompt for wallet name during onboarding; use it in greeting | **Closed** (2026-04-06) |
| DD-002 | 2026-03-27 | design-critic | Minor | PriceChart bar chart reads as histogram/volume, not price line | All users — misleading visual language | Replace with SVG line chart using react-native-svg directly | Open |
| DD-003 | 2026-03-27 | design-critic | Minor | Settings back label may truncate on narrow screens | All users | Set explicit back title or suppress back label | Open |
| DD-004 | 2026-03-27 | accessibility-reviewer | Minor | No accessibilityLabel on AssetRow, AgentCard, and other custom touchables | Screen reader users — VoiceOver announces nothing useful | Add accessibilityLabel and accessibilityRole to all interactive elements | **Closed** (2026-04-06) |
| DD-005 | 2026-03-27 | accessibility-reviewer | Minor | "Sharpe ratio" jargon appears in agent reasoning | Non-technical investors, cognitive accessibility | Replace or gloss jargon in agent copy — "risk-adjusted return score (Sharpe ratio)" | **Closed** (2026-04-06) |
| DD-006 | 2026-04-06 | heuristic-evaluator | **Major** | StakeAmount shows no inline error when amount is invalid — Continue disables silently | All stakers — confusing, no recovery path | Show inline error text below input: "Min: 0.01 SOL" / "Max available: X SOL" | **Closed** (2026-04-06) |
| DD-007 | 2026-04-06 | design-strategist | **Critical** | Agent action-04 (SOL staking suggestion) does not navigate to StakeFlow — entry point is broken | All users who receive staking suggestions from Portfolio Intelligence agent | Wire approve/action tap on staking SuggestionCard to `navigate('StakeFlow', ...)` | Open |
| DD-008 | 2026-04-06 | design-strategist | **Critical** | Staked assets are not visually indicated in Portfolio — "custody visibility" lost post-stake | All users who stake — assets appear to vanish | Add [STAKED] badge or dedicated staked section in Dashboard + AssetDetailScreen | Open |
| DD-009 | 2026-04-06 | design-strategist | Major | Liquidity guardrail is amber warning only — user can stake 100% and trap themselves with no gas | Power users who enter near-max amounts | Convert to hard block with override dialog: "You'll have only X SOL left. Continue?" | Open |
| DD-010 | 2026-04-06 | design-critic | Minor | APY badge style inconsistent — featured SOL card uses green badge; ETH/AVAX compact rows use plain text | All users — inconsistent signal hierarchy | Apply consistent APY treatment across featured + compact rows | Open |
| DD-011 | 2026-04-06 | design-critic | Minor | Balance shows 6 decimal places (e.g., 52.300000 SOL) — excessive precision for most users | All users — readability issue | Cap display at 4 decimal places; offer expand-to-full on tap | Open |
| DD-012 | 2026-04-06 | design-strategist | Minor | No links to protocol documentation (Marinade, Lido, BENQI) in staking flow | HNW investors who want to verify claims | Add external link icon next to protocol name on StakeReview | Open |
| DD-013 | 2026-04-06 | accessibility-reviewer | Minor | StakeConfirmScreen modal has no explicit dismiss affordance (headerShown: false). iOS swipe-down works. Switch users may get trapped. | Switch navigation users | Add a close/dismiss button to StakeConfirmScreen, or re-enable header | Open |

---

## Next Steps

**Pre-demo priorities (critical — do before any investor session):**
1. **DD-007** — Fix agent action entry point → StakeFlow navigation _(still open)_
2. **DD-008** — Add staked asset visibility to Portfolio (badge or staked section) _(still open)_
3. ~~DD-006~~ — ✓ Closed: inline validation error added to StakeAmountScreen

**v0.2 priorities (post-demo):**
4. **DD-009** — Convert liquidity guardrail to hard block with override dialog
5. ~~M1~~ — ✓ Closed: "Why [Protocol]?" card added to StakeReview
6. M3/M6 — Fix post-confirm routing + asset name in screen headers
7. ~~M7~~ — ✓ Closed: receipt token disclosure added to StakeAmountScreen
8. ~~M8~~ — ✓ Closed: APY disclaimer added to StakeAmount and StakeReview
9. **DD-013** — Add dismiss affordance to StakeConfirmScreen for switch navigation
10. DD-002 — SVG line chart to replace bar sparkline
11. Send/Receive flow (currently stub screens)
12. Demo mode toggle in Settings (reset + replay agent simulator)
13. Inclusive personas (formal documents for Alex + Jordan + Casey)
14. Taste calibration session → formal taste profile
15. EAS Build setup for TestFlight distribution

---

## Agent Pipeline Status

| Agent | Last run | Output |
|-------|----------|--------|
| design-strategist | 2026-04-06 | Staking IA evaluation — 2 critical gaps, 2 new principles added |
| design-lead | 2026-03-27 | v0.1 prototype built — 82 files |
| design-critic | 2026-04-06 | Staking IA critique — 0 critical, 3 major, 6 minor |
| heuristic-evaluator | 2026-04-06 | Staking IA heuristic eval — 3 critical, 3 major, 3 minor; conditional approval |
| accessibility-reviewer | 2026-04-06 | Targeted staking screen review — green contrast fixed globally (#059669 → #047857), colour-only signals resolved, 1 minor deferred (DD-013) |
| content-writer | 2026-04-06 | Staking copy pass — DD-006, M1, M7, M8, m2, m4, guardrail + trust signal fixed; vocabulary locked |
| inclusive-personas | Not run | Scheduled v0.2 |
| design-taste | Not run | Scheduled v0.2 |
| design-handoff | Not run | Pending production-ready milestone |
