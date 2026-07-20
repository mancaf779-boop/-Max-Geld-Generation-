#!/usr/bin/env bash
# self-test.sh — prüft das YouTube-Analytics-CLI im jeweils vorliegenden
# Credential-Zustand. Blockiert NIE: das CLI läuft mit geschlossenem stdin
# und Timeout, und es wird auf die konkreten Fehlermeldungen geprüft
# (nicht nur auf Exit != 0). Erwartetes Ende: SMOKE OK.
#
# Aufruf (bevorzugt über main.sh --self-test):
#   .claude/skills/youtube-channel-report/scripts/self-test.sh
set -euo pipefail
# Skript liegt unter <repo>/.claude/skills/<skill>/scripts/ → Repo-Root = vier Ebenen höher.
SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SELF_DIR/../../../.."   # Repo-Root; die Skripte nutzen relative Pfade!

[ -d node_modules ] || npm install --no-audit --no-fund

echo "== Modul lädt, Exporte vorhanden =="
node -e "
const m = require('./youtube-auth');
if (typeof m.getAuthedClientOrThrow !== 'function' || typeof m.getAuthedClientInteractive !== 'function')
  { console.error('FEHLER: Exporte fehlen'); process.exit(1); }
console.log('OK:', Object.keys(m).join(', '));
"

# CLI ohne stdin und mit Timeout starten — darf nie hängen.
run_cli() {
  set +e
  CLI_OUT=$(timeout 15 node youtube-analytics.js </dev/null 2>&1)
  CLI_RC=$?
  set -e
}

HAS_SECRET=false; HAS_TOKEN=false
[ -f client_secret.json ] && HAS_SECRET=true
[ -f token.json ] && HAS_TOKEN=true

if $HAS_SECRET && $HAS_TOKEN; then
  echo "== Credentials vollständig -> echter Report =="
  node youtube-analytics.js
elif $HAS_SECRET; then
  echo "== client_secret.json ohne token.json: Login-URL muss erscheinen, kein Hängen =="
  run_cli
  if ! grep -q "accounts.google.com" <<<"$CLI_OUT"; then
    echo "FEHLER: keine Login-URL ausgegeben. Ausgabe war:"; echo "$CLI_OUT"; exit 1
  fi
  echo "OK: Login-URL wird ausgegeben (der Login selbst braucht Browser + echtes Konto)"
elif $HAS_TOKEN; then
  echo "== token.json ohne client_secret.json: klare client_secret-Meldung =="
  run_cli
  if [ "$CLI_RC" -eq 0 ] || ! grep -q "client_secret.json" <<<"$CLI_OUT"; then
    echo "FEHLER: erwartet Exit != 0 mit client_secret.json-Meldung. Exit=$CLI_RC, Ausgabe:"; echo "$CLI_OUT"; exit 1
  fi
  echo "OK: CLI bricht ab mit: $(grep -m1 client_secret.json <<<"$CLI_OUT")"
else
  echo "== Keine Credentials: Fehlpfade müssen klar & terminierend sein =="
  run_cli
  if [ "$CLI_RC" -eq 0 ] || ! grep -q "client_secret.json" <<<"$CLI_OUT"; then
    echo "FEHLER: erwartet Exit != 0 mit client_secret.json-Meldung. Exit=$CLI_RC, Ausgabe:"; echo "$CLI_OUT"; exit 1
  fi
  echo "OK: CLI bricht ab mit: $(grep -m1 client_secret.json <<<"$CLI_OUT")"
  node -e "
  try { require('./youtube-auth').getAuthedClientOrThrow(); process.exit(1) }
  catch (e) {
    if (!/token\.json/.test(e.message)) { console.error('FEHLER: falsche Meldung:', e.message); process.exit(1); }
    console.log('OK: getAuthedClientOrThrow wirft:', e.message);
  }
  "
fi
echo "SMOKE OK"
