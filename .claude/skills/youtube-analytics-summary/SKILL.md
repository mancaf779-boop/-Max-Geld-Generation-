---
name: youtube-analytics-summary
description: Fasst die YouTube-Analytics des eigenen Kanals der letzten 28 Tage zusammen — Aufrufe (inkl. Ø pro Tag), Wiedergabezeit in Stunden, durchschnittliche Wiedergabedauer und neue Abonnenten. Nicht-interaktiv über den gespeicherten OAuth-Token (token.json). Nutze diesen Skill, wenn der User sagt "fasse meine YouTube-Zahlen zusammen", "wie lief mein Kanal", "zeig mir meinen Analytics-Report", "wie viele Aufrufe/Abonnenten hatte ich zuletzt", "YouTube-Statistiken der letzten Wochen" oder Ähnliches. Setzt das Max-Geld-Generation-Repo voraus (youtube-auth.js + googleapis) sowie einen einmaligen Login via `node youtube-analytics.js`.
---

# youtube-analytics-summary

## Zweck
Gibt eine kompakte 28-Tage-Zusammenfassung der YouTube-Analytics des eigenen
Kanals aus, ohne interaktiven Login. Baut auf der bestehenden `youtube-analytics.js`-CLI
auf, formatiert die Rohmetriken aber lesbar (Stunden statt Minuten, m:ss für die
Wiedergabedauer, Ø Aufrufe pro Tag).

## Voraussetzungen
- Läuft **im Max-Geld-Generation-Repo** (braucht `youtube-auth.js` und `node_modules/googleapis`).
- Einmaliger Login: `node youtube-analytics.js` → schreibt `token.json` (danach nicht mehr nötig, Token rotiert automatisch).
- Read-only-Scopes reichen (`yt-analytics.readonly`, `youtube.readonly`). Umsatzzahlen sind **nicht** enthalten (bräuchten `yt-analytics-monetary.readonly` + Re-Login).

## Ablauf

### Schritt 1 — Ausführen
```bash
./scripts/main.sh
```
`main.sh` findet das Repo-Root, prüft node/googleapis/token.json und ruft dann
`scripts/summary.js` auf. Fehlt der Login, kommt ein klarer Hinweis (Exit 2)
statt eines Absturzes.

### Schritt 2 — Ausgabe
Eine Box mit Kanalname, Zeitfenster und den Metriken:
```
────────────────────────────────────────────────
  <Kanalname>
  28 Tage · 2026-06-20 → 2026-07-17
────────────────────────────────────────────────
  Aufrufe             12.480  (Ø 446/Tag)
  Wiedergabezeit      310 Std  (18.600 Min)
  Ø Wiedergabedauer   1:29 Min
  Neue Abonnenten     +204
────────────────────────────────────────────────
```
(Beispielzahlen — die echten kommen aus der API.)

## Fehlerbehebung
Siehe `references/notes.md` (Exit-Codes, Zeitfenster-Logik, häufige API-Fehler).
