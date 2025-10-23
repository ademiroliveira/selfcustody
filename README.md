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

2. **Install the package in editable mode** (no external dependencies are
   required):

   ```bash
   pip install -e .
   ```

3. **Run the unit tests**:

   ```bash
   python -m unittest discover
   ```

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
