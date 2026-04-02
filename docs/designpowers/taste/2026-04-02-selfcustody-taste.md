# Taste Profile: Selfcustody Mobile

_Calibrated: 2026-04-02 — design-taste agent_

---

## Existing Design System

The codebase has a working light-mode design system with:

- **Colour philosophy:** Slate-gray palette (`#f8fafc` → `#ffffff` surfaces), indigo accent (`#6366F1`), semantic red/green/amber
- **Density:** 4pt grid, moderate-generous spacing
- **Radius:** Pill chips (20px), chat bubbles (16px), cards delegated to heroui-native
- **Shadows:** None in practice — surface-color contrast does the work
- **Typography:** Inter (UI) + JetBrainsMono (addresses/numbers). 12px uppercase section labels. 40px bold for portfolio value
- **Agent personality:** Glyphs (`◈ ⚡ ◉ ⬡`), pulsing status dots, approval-gate UI

### Taste Signals from the System

- **Colour philosophy:** Restrained — slate grays dominate, accent held back for status
- **Density:** Generous vertical rhythm, comfortable for a high-stakes financial context
- **Personality:** Functional and serious — the agent glyphs add a distinctive layer of character without being playful
- **Typography voice:** Inter is neutral and precise — right for financial data

### Where the User Wants to Evolve

- The original brief called for a dark navy UI. The codebase chose light. This calibration confirms **light is correct** and goes further: warmer near-white (`#f2f2f7`) rather than cold white.
- Indigo has been used as a primary button colour throughout. This calibration **demotes indigo to the agent layer only** — financial actions get black CTAs.
- Any remaining shadows should be removed entirely.

---

## Emotional Target

Calm authority. The app should feel like a private wealth manager who speaks only when they have something worth saying — serious, measured, and in complete control. The numbers do the talking. The UI gets out of the way.

---

## Aesthetic Principles

1. **Restraint earns trust**
   Color is earned by context, not assigned by role. A button doesn't need to be indigo to be primary. The absence of color is itself a signal of confidence.
   _Test: Could this element be one colour less saturated and still communicate its purpose? If yes, strip it._

2. **Surface hierarchy over shadow**
   Depth comes from background-color shifts (`#f2f2f7` base → `#ffffff` cards), never drop shadows. Shadows introduce visual noise and suggest a UI that doesn't trust itself.
   _Test: If you removed all shadows, would the layout collapse? If yes, fix the layout._

3. **Black for commitment**
   Financial actions — Send, Receive, Approve, Confirm, Stake — use near-black CTAs (`#0f172a`). The gravity of the action is communicated by colour weight, not hue. When a user taps a black button, they know it matters.
   _Test: Is this button triggering a financial transaction or a custody action? If yes, it should be near-black, not indigo._

4. **Indigo is the agent layer**
   `#6366F1` belongs exclusively to AI/agent interactions: status pills, agent glyph backgrounds, AI chat bubbles. This creates a visible semantic boundary between "my money" (black) and "AI assistance" (indigo). The user always knows which layer they're operating in.
   _Test: Is this indigo element related to an AI agent action or status? If no, remove the indigo._

5. **Charts as raw data**
   Price lines are bold black strokes, full bleed, no axes, no fill, no gridlines. The data is the design. Decoration around a chart signals distrust of the data.
   _Test: Could you remove the chart frame, axis labels, or background fill and have the data become clearer? If yes, remove them._

---

## Quality Level

**Production**

Every layout decision is intentional. Typography hierarchy is complete and consistent. Colour usage has no exceptions to the rules above. Touch targets are accessible. Motion is functional, not decorative.

---

## References

| Reference | What to borrow | What to avoid |
|-----------|---------------|---------------|
| Revolut (Home, Move Money, Crypto, Earn, Asset Detail) | Warm near-white base (`#f2f2f7`), zero shadows, black CTAs, full-bleed black line charts, semantic-only accent color, pill button shapes | Revolut's orange brand accent — selfcustody uses indigo for the agent layer instead |

---

## Anti-References

| Anti-reference | What makes it wrong for us |
|----------------|---------------------------|
| Typical DeFi/crypto app (dark, neon accents, gradient buttons) | Signals speculation and noise. Our user is a serious HNW investor managing real custody — not a trader chasing pumps |
| Over-branded fintech (large coloured header bars, gradient CTAs) | Colour used for branding, not meaning. Erodes trust by suggesting the UI is selling something |
| Dashboard-heavy analytics tools (dense charts, many data points at once) | Complexity without purpose. Our principle: complexity earns itself |

---

## Craft Standards

- **Background:** `#f2f2f7` (warm near-white — not cold `#f8fafc`)
- **Card surface:** `#ffffff`
- **Primary CTA:** `#0f172a` near-black, fully rounded pill
- **Secondary CTA:** `#0f172a` border, white fill, fully rounded pill
- **Destructive CTA:** `#E11D48` rose, same pill shape
- **Indigo (`#6366F1`):** Agent status pills, AI chat bubbles, agent glyph backgrounds — never buttons
- **Shadows:** None. `elevation: 0` everywhere. No `shadowColor`, no `shadowOffset`
- **Borders:** `1px` at `#e2e8f0` (slate-200) — still fine as subtle card delimiters
- **Border radius:** 16px for cards, fully rounded (pill) for CTAs, 20px for status chips
- **Colour usage rule:** Semantic red/green/amber for financial status only. No decorative colour.
- **Typography:** Inter — no changes to existing scale. Monospace (JetBrainsMono) for addresses and raw token amounts only
- **Whitespace:** Current generous rhythm preserved — do not tighten
- **Animation:** Functional only — status transitions, loading states. No decorative entrance animations

---

## Personality

If this app were a person: a private wealth manager in their early 40s. Wears well-fitted navy or charcoal — no logos, no flash. Speaks in complete sentences. Never uses exclamation marks. Knows more than they say. When they do speak, you listen.
