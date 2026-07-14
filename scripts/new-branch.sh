#!/usr/bin/env bash
# new-branch.sh — startet eine neue Änderung immer auf einem FRISCHEN Branch,
# der vom aktuellen Stand des Default-Branch (main) abzweigt.
#
# Warum: Ein gemergter Branch ist abgeschlossen und darf nicht wiederverwendet
# werden. Neue Arbeit gehört auf einen frischen Branch ab main.
#
# Aufruf (aus dem Repo-Root):
#   scripts/new-branch.sh <branch-name>
#   scripts/new-branch.sh                # ohne Name -> claude/change-YYYYMMDD-HHMM
#
# Danach normal arbeiten, committen und pushen:
#   git push -u origin <branch-name>
set -euo pipefail

BASE=${BASE_BRANCH:-main}
NAME=${1:-"claude/change-$(date +%Y%m%d-%H%M)"}

# Sauberes Arbeitsverzeichnis verlangen, damit nichts verloren geht.
if [ -n "$(git status --porcelain)" ]; then
  echo "FEHLER: Arbeitsverzeichnis ist nicht sauber. Erst committen oder stashen." >&2
  git status --short >&2
  exit 1
fi

echo "Hole aktuellen Stand von origin/$BASE …"
for i in 1 2 3 4; do
  git fetch origin "$BASE" && break || { echo "Fetch-Fehler, neuer Versuch in $((2**i))s"; sleep $((2**i)); }
done

git checkout -B "$NAME" "origin/$BASE"
echo "✅ Frischer Branch '$NAME' von origin/$BASE erstellt."
echo "   Weiter: arbeiten -> committen -> git push -u origin \"$NAME\""
