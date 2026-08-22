# selfcustody

Python self-custody wallet toolkit + React Native iOS prototype for Frontier investors.

## Project State

**Always read `design-state.md` first** — it is the single source of truth for design decisions, open debt, and next steps. Update it after any significant design or build work.

## Current Status (v0.1 complete)

- `src/` — Python wallet scaffold + newsdigest FastAPI service
- `src/web/` — React wallet flow visualizer
- `selfcustody-mobile/` — React Native iOS prototype (Expo, TypeScript)
  - includes the Stake flow, Earn Hub tab, and `wallet-ia.md` information architecture
- `docs/design/` — this project's design outputs (taste profile, personas)
- `.claude/settings.json` — project settings; declares the Designpowers plugin

## v0.2 Priorities (pick up here in a new session)

Done: taste calibration + rollout, DD-001 (wallet name), DD-002 (SVG line chart),
DD-004 (accessibility labels), DD-005 (jargon glossing), Stake flow, Earn Hub.

1. **DD-007** — `main` does not typecheck clean: 12 `heroui-native` API drift errors
   (`isLoading`, `disabled`→`isDisabled`, `ChipColor`) plus a `WalletName` route
   missing from `RootStackParams`. Run `npx tsc --noEmit` in `selfcustody-mobile/`
2. **DD-006** — Six `Avatar` uses omit the required `alt`; `EarnHubScreen` and
   `StakeAmountScreen` have unlabelled touchables (postdated the DD-004 sweep)
3. **DD-003** — Settings back label truncation on narrow screens
4. **Send/Receive flow** — currently stub screens in `AssetDetailScreen`
5. **Demo mode toggle** — Settings screen: reset + replay agent simulator for investor demos
6. **EAS Build config** — `eas.json` for TestFlight distribution (no Mac needed)
7. **Inclusive personas** — run the `inclusive-personas` skill (Alex + 2 edge personas)
8. **Re-run reviews for real** — `design-critic` and `accessibility-reviewer` as
   dispatched agents now that Designpowers is a plugin (see design-state.md caveat)

## Design Tokens

`src/theme/colors.ts` encodes the taste profile's semantic split — read it before
adding colour:

- **`action.*`** (`#0f172a`) — anything that commits the user's money. All CTAs.
- **`accent.indigo`** (`#6366F1`) — the AI/agent layer only: chat, agent toggles,
  suggestion reasoning. **Never a button.**
- **`bg.primary`** (`#f2f2f7`) is the screen ground; **`bg.card`** (`#ffffff`) sits
  above it. Depth comes from that contrast — there are no shadows anywhere, and
  none should be added.

Primary Button colour comes from `--accent` in `global.css`, which overrides
heroui-native's theme. Change it there, not per-component.

## React Native App

```bash
cd selfcustody-mobile
npm install --legacy-peer-deps
npx expo start --ios   # iOS Simulator (requires macOS + Xcode)
npx expo start         # Expo Go on device (same WiFi)
```

**Environment variables** (optional — app works without them via mock fallback):
```
EXPO_PUBLIC_CLAUDE_API_KEY=      # claude-sonnet-4-6 for live chat
EXPO_PUBLIC_NEWSDIGEST_URL=http://localhost:8000
EXPO_PUBLIC_NEWSDIGEST_TOKEN=
```

**Demo auto-plays on Dashboard:** T+15s agent alert → T+45s threat alert → T+90s yield info

## Python Backend

```bash
export NEWSAPI_SAMPLE_PATH=research/sample_newsapi_response.json
export LLM_SCORING_ENABLED=false
uvicorn newsdigest.api:app --host 0.0.0.0 --port 8000
```

## Design Workflows

Designpowers is installed as a **Claude Code plugin**, declared at project scope
in `.claude/settings.json` (`extraKnownMarketplaces` + `enabledPlugins`). Nothing
to clone or initialise — it resolves automatically in any session, local or
remote.

It provides 36 skills and 10 agents. The entry point is the `using-designpowers`
skill; invoke it rather than calling agents directly. Skills auto-trigger on
description match — `design-taste`, `design-critic`, `inclusive-personas` and the
rest are invocable by name.

Design outputs for *this* project live in `docs/design/` (taste profiles,
personas). Verify with `claude plugin list`.
