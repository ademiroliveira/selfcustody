# Design State: Selfcustody Mobile

_Last updated: 2026-03-27 by design-critic + accessibility-reviewer_

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

## Design Debt Register

_Items: 5 | Oldest: 2026-03-27_

| ID | Date | Source | Severity | What | Who is affected | Suggested fix | Status |
|----|------|--------|----------|------|----------------|---------------|--------|
| DD-001 | 2026-03-27 | design-critic | Minor | Dashboard greeting shows "Primary Wallet" — not personalised | All users — cold, impersonal for HNW audience | Prompt for wallet name during onboarding; use it in greeting | Open |
| DD-002 | 2026-03-27 | design-critic | Minor | PriceChart bar chart reads as histogram/volume, not price line | All users — misleading visual language | Replace with SVG line chart using react-native-svg directly | Open |
| DD-003 | 2026-03-27 | design-critic | Minor | Settings back label may truncate on narrow screens | All users | Set explicit back title or suppress back label | Open |
| DD-004 | 2026-03-27 | accessibility-reviewer | Minor | No accessibilityLabel on AssetRow, AgentCard, and other custom touchables | Screen reader users — VoiceOver announces nothing useful | Add accessibilityLabel and accessibilityRole to all interactive elements | Open |
| DD-005 | 2026-03-27 | accessibility-reviewer | Minor | "Sharpe ratio" jargon appears in agent reasoning | Non-technical investors, cognitive accessibility | Replace or gloss jargon in agent copy — "risk-adjusted return score (Sharpe ratio)" | Open |

---

## Next Steps

**v0.2 priorities (from debt + open work):**
1. Taste calibration session → formal taste profile
2. Inclusive personas (formal documents for Alex + 2 edge personas)
3. DD-004 — accessibilityLabels across all interactive elements
4. DD-005 — jargon glossing in agent copy
5. DD-002 — SVG line chart to replace bar sparkline
6. Send/Receive flow (currently stub screens)
7. Demo mode toggle in Settings (reset + replay agent simulator)
8. EAS Build setup for TestFlight distribution

---

## Agent Pipeline Status

| Agent | Last run | Output |
|-------|----------|--------|
| design-strategist | 2026-03-27 | Principles established (inline, not in separate doc) |
| design-lead | 2026-03-27 | v0.1 prototype built — 82 files |
| design-critic | 2026-03-27 | Critique complete — 2 critical, 4 major, 3 minor |
| accessibility-reviewer | 2026-03-27 | Review complete — 2 critical fixed, 2 minor deferred |
| inclusive-personas | Not run | Scheduled v0.2 |
| design-taste | Not run | Scheduled v0.2 |
| design-handoff | Not run | Pending production-ready milestone |
