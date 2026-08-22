#!/bin/bash
# SessionStart hook — make the repo usable the moment a session opens.
#
# The designpowers/ submodule is empty in every fresh clone and in every fresh
# remote container. CLAUDE.md points design work at
# designpowers/skills/using-designpowers/SKILL.md, so without this it is a dead path.
# `git submodule update --init` is idempotent and near-instant once populated,
# so this runs in local sessions too.
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"

if [ -f .gitmodules ]; then
  if git submodule update --init --recursive 2>&1; then
    echo "designpowers: ready"
  else
    # A missing submodule is not worth failing a session over — the rest of the
    # repo works fine without it.
    echo "designpowers: submodule init failed (network?) — design workflows unavailable this session" >&2
  fi
fi
