# selfcustody

Python self-custody wallet toolkit + React Native iOS prototype for Frontier investors.

## Project State

**Always read `design-state.md` first** — it is the single source of truth for design decisions, open debt, and next steps. Update it after any significant design or build work.

## Current Status (v0.1 complete)

- `src/` — Python wallet scaffold + newsdigest FastAPI service
- `src/web/` — React wallet flow visualizer
- `selfcustody-mobile/` — React Native iOS prototype (Expo, TypeScript)
- `designpowers/` — Designpowers design workflow system (git submodule — the tooling)
- `docs/design/` — this project's design outputs (taste profile, personas)
- `.claude/` — project hooks and settings

## v0.2 Priorities (pick up here in a new session)

Done: taste calibration (`docs/design/taste/`), DD-004 (accessibility labels),
DD-005 (jargon glossing).

1. **DD-002** — Replace bar sparkline with SVG line chart (`react-native-svg`)
2. **DD-001** — Personalised wallet name: prompt during onboarding, use in Dashboard greeting
3. **DD-003** — Settings back label truncation on narrow screens
4. **Visual taste rollout** — black CTAs (`#0f172a`), bg → `#f2f2f7`, remove all shadows
5. **Send/Receive flow** — currently stub screens in `AssetDetailScreen`
6. **Demo mode toggle** — Settings screen: reset + replay agent simulator for investor demos
7. **EAS Build config** — `eas.json` for TestFlight distribution (no Mac needed)
8. **Inclusive personas** — run `inclusive-personas` agent (Alex + 2 edge personas)

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

For design tasks, follow the instructions in:
`designpowers/skills/using-designpowers/SKILL.md`

`designpowers/` is a **git submodule** (`Owl-Listener/designpowers`) — empty in a
fresh clone or a fresh remote container. `.claude/hooks/session-start.sh` runs
`git submodule update --init --recursive` at session start, so it should already
be populated. If the directory is empty, run that command manually.

Design outputs for *this* project live in `docs/design/` (taste profiles,
personas) — not to be confused with `designpowers/`, which is the tooling.
