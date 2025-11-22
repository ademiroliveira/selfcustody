# Self-Custody Wallet Scaffold

This repository contains the baseline Python scaffold for a self-custody wallet
toolkit. The project focuses on three primary areas:

- **Wallet management** – Interfaces and metadata that describe wallet
  capabilities and account discovery.
- **Key storage** – Abstractions that encapsulate local or remote key-store
  implementations.
- **Transaction signing** – Contracts for producing signing callables that
  operate on raw payloads.

The scaffold emphasises clarity and portability: there are no third-party
runtime dependencies, making it suitable for command-line tools, services, or
embedded agents.

## Tech Stack

- **Runtime**: Python 3.11+
- **Tooling**: `setuptools` packaging with standard library `unittest` test
  suites. Optional `coverage` configuration is provided should you wish to add
  the dependency later.

## Project Layout

```
.
├── pyproject.toml       # Project metadata and build configuration
├── src/
│   └── selfcustody/     # Wallet, key-store, and runtime primitives
├── tests/
│   ├── __init__.py      # Ensures src/ is importable during local testing
│   └── test_runtime.py  # Example unit tests for the runtime helpers
└── README.md            # Project documentation
```

## Getting Started

1. **Create a virtual environment** (recommended):

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

2. **Install the package in editable mode** (this pulls in FastAPI, httpx, and
   OpenAI client dependencies used by the news digest service):

   ```bash
   pip install -e .
   ```

3. **Run the unit tests**:

   ```bash
   python -m unittest discover
   ```

## Running the FastAPI news digest service

The repository now ships a simple FastAPI app that assembles a daily news digest from NewsAPI data and (optionally) scores articles with an LLM.

1. Export the required environment variables:

   ```bash
   export NEWSAPI_KEY="<your NewsAPI key>"
   # Optional overrides
   export NEWS_TOPIC="technology"
   export NEWSAPI_COUNTRY="us"
   export MAX_HEADLINES=5
   export LLM_SCORING_ENABLED=true        # turns on scoring
   export OPENAI_API_KEY="<your OpenAI key>"  # enables OpenAI scoring
   export SERVICE_TOKEN="<shared bearer token>"  # protects /run
   # For offline/demo use you can point to bundled sample data
   export NEWSAPI_SAMPLE_PATH=research/sample_newsapi_response.json
   ```

2. Start the API:

   ```bash
   uvicorn selfcustody.api:app --host 0.0.0.0 --port 8000
   ```

3. Trigger a digest:

   ```bash
   curl -X POST "http://localhost:8000/run" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer ${SERVICE_TOKEN}" \
     -d '{"topic": "custody"}'
   ```

The response includes the current day’s digest, headline metadata, and optional LLM/keyword scores.

## Architecture Goals

- Provide lightweight, dependency-free primitives that can be embedded into
  larger wallet applications.
- Encourage strong typing and runtime validation through dataclasses and
  explicit error handling.
- Keep bootstrapping logic minimal yet extensible so concrete wallet and
  key-store implementations can plug in quickly.

## Next Steps

- Add concrete wallet and key-store adapters (file-based, hardware signer,
  remote signer, etc.).
- Expand transaction-building helpers for specific blockchain ecosystems.
- Integrate continuous integration and coverage reporting as the project grows.
- Document security considerations for custody models and signing flows.
