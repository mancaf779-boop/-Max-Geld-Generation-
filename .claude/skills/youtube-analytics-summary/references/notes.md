# Notizen zu youtube-analytics-summary

## Exit-Codes (main.sh / summary.js)
- `0` — Zusammenfassung erfolgreich ausgegeben.
- `1` — Umgebungsproblem: kein Repo-Root gefunden, node fehlt, googleapis fehlt,
  kein Kanal für das Konto, oder API-Fehler.
- `2` — Kein Login (`token.json` fehlt bzw. Token ungültig). Erst
  `node youtube-analytics.js` ausführen.

## Zeitfenster (identisch zu youtube-analytics.js)
- 28 Tage, **beide Grenzen inklusiv** (YouTube-Analytics-Konvention).
- Ende = heute − 2 Tage, weil Analytics-Daten ~48 h nachlaufen.
- `startDate = endDate − 27 Tage`.

## Abgefragte Metriken
`views, estimatedMinutesWatched, averageViewDuration, subscribersGained`
- `estimatedMinutesWatched` ist in **Minuten** → summary.js rechnet in Stunden um.
- `averageViewDuration` ist in **Sekunden** → als `m:ss` formatiert.
- `subscribersGained` ist der Netto-Zuwachs im Fenster (kein aktueller Gesamtstand).

## Warum ein eigenes Node-Script statt nur `youtube-analytics.js`?
`youtube-analytics.js` nutzt den **interaktiven** Client (fragt bei fehlendem
Token nach Login) und gibt Rohmetriken aus. Der Skill soll nicht-interaktiv
laufen und lesbar zusammenfassen — daher `getAuthedClientOrThrow()` (token-only,
wirft bei fehlendem Token) plus eigene Formatierung. Die Query selbst ist
bewusst identisch, damit die Zahlen zur CLI passen.

## Häufige API-Fehler
- `insufficientPermissions` / Scope-Fehler → Re-Login nötig, ggf. Scopes prüfen.
- Leere Zeilen (`rows` fehlt) → im Fenster gab es keine Daten; summary.js zeigt dann 0.
- Monetäre Kennzahlen (`estimatedRevenue`) fehlen absichtlich — anderer Scope.
