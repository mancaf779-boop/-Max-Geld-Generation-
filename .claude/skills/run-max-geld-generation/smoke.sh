#!/usr/bin/env bash
# smoke.sh — startet das YouTube-Analytics-CLI und prüft die erreichbaren Pfade.
#
# Aufruf (aus dem Repo-Root!):
#   .claude/skills/run-max-geld-generation/smoke.sh
#
# Ohne client_secret.json/token.json werden die Fehlpfade geprüft (klare
# Meldungen, Exit-Codes). Mit Credentials startet der echte Login/Report —
# der OAuth-Code muss dann interaktiv eingegeben werden.
set -euo pipefail
cd "$(dirname "$0")/../../.."   # Repo-Root; die Skripte nutzen relative Pfade!

[ -d node_modules ] || npm install --no-audit --no-fund

echo "== Modul lädt, Exporte vorhanden =="
node -e "
const m = require('./youtube-auth');
if (typeof m.getAuthedClientOrThrow !== 'function' || typeof m.getAuthedClientInteractive !== 'function')
  { console.error('FEHLER: Exporte fehlen'); process.exit(1); }
console.log('OK:', Object.keys(m).join(', '));
"

if [ -f client_secret.json ]; then
  echo "== client_secret.json vorhanden -> starte echten Login/Report =="
  node youtube-analytics.js
else
  echo "== Ohne Credentials: Fehlpfade müssen klar & terminierend sein =="
  if node youtube-analytics.js </dev/null 2>/dev/null; then
    echo "FEHLER: CLI hätte ohne client_secret.json fehlschlagen müssen"; exit 1
  else
    echo "OK: CLI bricht ohne client_secret.json mit Exit != 0 ab"
  fi
  node -e "
  try { require('./youtube-auth').getAuthedClientOrThrow(); process.exit(1) }
  catch (e) { console.log('OK: getAuthedClientOrThrow wirft:', e.message) }
  "
fi
echo "SMOKE OK"
