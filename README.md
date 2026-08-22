# selfcustody

Monorepo for the Selfcustody investor toolkit. Four initiatives, loosely coupled:

| Directory | What it is | Language |
|-----------|-----------|----------|
| `src/selfcustody/` + `src/newsdigest/` | Python wallet primitives + news digest service | Python |
| `cloudflare/` | Cloudflare Worker proxy for the news service | JavaScript |
| `selfcustody-mobile/` | React Native iOS prototype (Expo) | TypeScript |
| `src/web/` | Interactive wallet flow visualizer | TypeScript |

See **`CLAUDE.md`** for quick-starts and v0.2 priorities. See **`design-state.md`** for design decisions, personas, and debt register.

---

## Python wallet toolkit (`src/selfcustody/`)

Dependency-free wallet primitives: key-store abstractions, wallet metadata, and runtime bootstrap helpers. Suitable for embedding in larger services or CLI tools.

```bash
python -m venv .venv && source .venv/bin/activate
pip install -e '.[news]'   # omit [news] to skip FastAPI/httpx/OpenAI deps
python -m unittest discover
```

---

## Python news digest service (`src/newsdigest/`)

Standalone FastAPI service that fetches headlines from NewsAPI and optionally scores them with an LLM. Used by the mobile app via `EXPO_PUBLIC_NEWSDIGEST_URL`.

```bash
export NEWSAPI_SAMPLE_PATH=research/sample_newsapi_response.json
export LLM_SCORING_ENABLED=false
uvicorn newsdigest.api:app --host 0.0.0.0 --port 8000

# Trigger a digest:
curl -X POST http://localhost:8000/run \
  -H "Content-Type: application/json" \
  -d '{"topic": "custody"}'
```

**Optional env vars:** `NEWSAPI_KEY`, `OPENAI_API_KEY`, `SERVICE_TOKEN`, `NEWS_TOPIC`, `MAX_HEADLINES`

---

## Cloudflare Worker proxy (`cloudflare/`)

A thin Cloudflare Worker that proxies POST requests to the newsdigest `/run` endpoint, injecting the bearer token from Cloudflare environment variables. Useful for exposing the news service publicly without embedding secrets in the mobile app.

```bash
cd cloudflare
wrangler deploy
```

**Required Cloudflare env vars:** `SERVICE_ENDPOINT` (public URL of FastAPI deployment), `SERVICE_TOKEN`

---

## React Native mobile app (`selfcustody-mobile/`)

High-fidelity iOS prototype for accredited investors. Combines portfolio visibility, AI-assisted agent actions with approval gates, and live news digest integration. Runs against mocked portfolio data by default; live features are environment-gated.

```bash
cd selfcustody-mobile
npm install --legacy-peer-deps
npx expo start --ios   # iOS Simulator (requires macOS + Xcode)
npx expo start         # Expo Go on device (same WiFi)
```

**Optional env vars:**
```
EXPO_PUBLIC_CLAUDE_API_KEY=       # claude-sonnet-4-6 for live chat
EXPO_PUBLIC_NEWSDIGEST_URL=http://localhost:8000
EXPO_PUBLIC_NEWSDIGEST_TOKEN=
```

Demo auto-plays on Dashboard: T+15s agent alert → T+45s threat alert → T+90s yield info.

---

## React web visualizer (`src/web/`)

Interactive flow diagram of wallet creation and transaction flows, built with React Flow. Deployed automatically to GitHub Pages on every push to `src/web/**`.

```bash
cd src/web
npm install
npm run dev
```

---

## Repository split roadmap

The current monorepo will be split into three repositories as the project grows toward production and brings in collaborators. Planned future state:

### `selfcustody` — Python backend (keep current repo)
- `src/selfcustody/`, `src/newsdigest/`, `cloudflare/`, `tests/`, `research/`, `pyproject.toml`

### `selfcustody-mobile` — Mobile app + design system
- `selfcustody-mobile/` contents → repo root
- `designpowers/` git submodule → moved here (design tooling belongs with mobile)
- `design-state.md` → moved here (mobile design source of truth)

### `selfcustody-web` — React flow visualizer
- `src/web/` → repo root
- GitHub Pages workflow simplified (no `src/web/**` path filter needed)

**Split method:** `git subtree split` per directory to preserve history, or copy + squash commit for a clean start.

**When to split:** Before EAS Build / TestFlight phase, when bringing in mobile-only contributors.
