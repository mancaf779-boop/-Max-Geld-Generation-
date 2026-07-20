#!/usr/bin/env bash
# main.sh — YouTube-Kanal-Report (28 Tage) für den eigenen Kanal.
#
# Zwei Modi:
#   (ohne Argument)  Preflight (node/googleapis/token) → report.js
#   --self-test      Smoke-Check der CLI-Fehlerpfade (self-test.sh), kein Login nötig
#
# Preflight + Report sind eine reine Leseoperation (idempotent, mehrfach
# ausführbar). Fehlt eine Voraussetzung, kommt ein klarer Hinweis mit Fix
# statt eines Absturzes.
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# Skill liegt unter <repo>/.claude/skills/<skill>/ → Repo-Root = drei Ebenen höher.
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"

if [[ "${1:-}" == "--self-test" ]]; then
  exec "$SKILL_DIR/scripts/self-test.sh"
fi
if [[ -n "${1:-}" ]]; then
  echo "Unbekanntes Argument: $1  (erlaubt: --self-test oder keins)" >&2
  exit 64
fi

# ── Preflight ───────────────────────────────────────────────────────────────
if [[ ! -f "$REPO_ROOT/youtube-auth.js" ]]; then
  echo "Fehler: youtube-auth.js nicht in $REPO_ROOT gefunden." >&2
  echo "Dieser Skill gehört ins Max-Geld-Generation-Repo (nutzt dessen OAuth + googleapis)." >&2
  exit 1
fi

command -v node >/dev/null 2>&1 || { echo "Fehler: node ist nicht installiert." >&2; exit 1; }

if [[ ! -d "$REPO_ROOT/node_modules/googleapis" ]]; then
  echo "Abhängigkeiten fehlen. Einmalig im Repo:  npm install" >&2
  exit 1
fi

if [[ ! -f "$REPO_ROOT/token.json" ]]; then
  echo "Noch kein Login vorhanden (token.json fehlt)." >&2
  echo "Einmalig einloggen:  cd \"$REPO_ROOT\" && node youtube-analytics.js" >&2
  echo "Danach diesen Skill erneut ausführen." >&2
  exit 2
fi

# ── Report ──────────────────────────────────────────────────────────────────
cd "$REPO_ROOT"
exec node "$SKILL_DIR/scripts/report.js"
