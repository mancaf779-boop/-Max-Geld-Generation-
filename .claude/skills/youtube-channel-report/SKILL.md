---
name: youtube-channel-report
description: Erstellt einen kompakten 28-Tage-Report der YouTube-Analytics des eigenen Kanals — Aufrufe (inkl. Ø/Tag), Wiedergabezeit in Stunden, Ø Wiedergabedauer, neue Abonnenten, Aufruf-Trend gegen die Vorperiode und das meistgesehene Video im Fenster. Nicht-interaktiv über den gespeicherten OAuth-Token (token.json). Nutze diesen Skill immer, wenn der User seine YouTube-/Kanalzahlen sehen will — z. B. "wie lief mein Kanal", "fasse meine YouTube-Zahlen zusammen", "zeig mir meinen Analytics-Report", "wie viele Aufrufe/Abonnenten zuletzt", "was war mein bestes Video", "geht's mit dem Kanal auf- oder abwärts" — auch beiläufig formuliert. Deckt außerdem "läuft die Analytics-CLI / smoke-teste sie" über den --self-test-Modus ab. Setzt das Max-Geld-Generation-Repo voraus (youtube-auth.js + googleapis) sowie einen einmaligen Login via `node youtube-analytics.js`.
---

# youtube-channel-report

## Zweck
Ein Skill für den YouTube-Kanal von **Max Geld Generation** — er beantwortet
„wie lief mein Kanal?" mit einem lesbaren 28-Tage-Report und deckt zugleich
„läuft die CLI überhaupt?" per Self-Test ab. Baut auf `youtube-auth.js` +
`youtube-analytics.js` im Repo auf, läuft aber **nicht-interaktiv** über den
gespeicherten Token und formatiert die Rohmetriken lesbar (Stunden statt
Minuten, m:ss für die Wiedergabedauer, Ø Aufrufe/Tag, Prozent-Trend).

## Voraussetzungen
- Läuft **im Max-Geld-Generation-Repo** (braucht `youtube-auth.js` und
  `node_modules/googleapis`; einmalig `npm install`).
- Einmaliger Login: `node youtube-analytics.js` → schreibt `token.json`
  (danach nicht mehr nötig, Token rotiert automatisch).
- Read-only-Scopes reichen (`yt-analytics.readonly`, `youtube.readonly`).
  Umsatzzahlen sind **nicht** enthalten (bräuchten `yt-analytics-monetary.readonly`
  + Re-Login).

## Report erstellen (Standardfall)
```bash
.claude/skills/youtube-channel-report/scripts/main.sh
```
`main.sh` findet das Repo-Root, prüft node/googleapis/token.json und ruft dann
`report.js` auf. Fehlt der Login, kommt ein klarer Hinweis (Exit 2) statt eines
Absturzes — dann einmal `node youtube-analytics.js` ausführen und erneut starten.

### Ausgabe
Eine Box mit Kanalname, Zeitfenster, Metriken, Aufruf-Trend und Top-Video:
```
────────────────────────────────────────────────
  <Kanalname>
  28 Tage · 2026-06-20 → 2026-07-17
────────────────────────────────────────────────
  Aufrufe             12.480  (Ø 446/Tag)
  Wiedergabezeit      310 Std  (18.600 Min)
  Ø Wiedergabedauer   1:29 Min
  Neue Abonnenten     +204
  Trend Aufrufe       +18 %  (Vorperiode 10.580)
────────────────────────────────────────────────
  Top-Video: „<Titel>“ — 3.240 Aufrufe
────────────────────────────────────────────────
  Fenster endet heute − 2 Tage (Analytics-Verzug ~48 h).
```
(Beispielzahlen — die echten kommen aus der API.)

Gib die Box unverändert an den User weiter; ordne bei Bedarf den Trend kurz ein
(z. B. „Aufrufe klar über der Vorperiode"), aber erfinde keine Zahlen dazu.

## Läuft die CLI? (Self-Test statt echter Report)
Wenn es nicht um Zahlen geht, sondern darum, ob die CLI/OAuth-Kette sauber
arbeitet (z. B. „smoke-teste die Analytics-CLI", „prüf die Fehlerpfade"):
```bash
.claude/skills/youtube-channel-report/scripts/main.sh --self-test
```
Prüft je nach Credential-Zustand die konkreten Fehlermeldungen (nicht nur
Exit-Codes), blockiert nie (geschlossenes stdin + Timeout) und endet mit
`SMOKE OK`. Der echte interaktive Login ist headless im Container nicht
abschließbar (Browser + echtes Google-Konto nötig) — bis zum Token-Tausch ist
alles verifizierbar.

## Gotchas
- **cwd-abhängig:** `client_secret.json`/`token.json` werden relativ zum
  Arbeitsverzeichnis gesucht. `main.sh` wechselt selbst ins Repo-Root; bei
  manuellem Direktaufruf von dort starten, sonst ENOENT trotz vorhandener Dateien.
- **Secrets:** `client_secret.json`/`token.json` sind gitignored. Nie committen,
  nie in Logs/PRs zitieren.
- `punycode`-DeprecationWarning von `googleapis` ist Rauschen — ignorieren.
- Zeitfenster: 28 Tage, beide Grenzen inklusiv, Ende = heute − 2 Tage. Die
  Vorperiode für den Trend sind die 28 Tage direkt davor.

## Details
Exit-Codes, Zeitfenster-/Trend-Logik, abgefragte Metriken und häufige API-Fehler
stehen in `references/notes.md`.
