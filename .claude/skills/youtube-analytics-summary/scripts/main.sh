#!/usr/bin/env bash
# main.sh — YouTube-Analytics-Zusammenfassung (28 Tage) für den eigenen Kanal.
#
# Findet das Repo-Root (wo youtube-auth.js liegt), prüft Voraussetzungen und
# ruft scripts/summary.js auf. Nicht-interaktiv: nutzt den gespeicherten Token.
# Idempotent — reine Leseoperation, kein Schreiben, mehrfach ausführbar.
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# Skill liegt unter <repo>/.claude/skills/<skill>/ → Repo-Root = drei Ebenen höher.
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"

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

cd "$REPO_ROOT"
exec node "$SKILL_DIR/scripts/summary.js"
