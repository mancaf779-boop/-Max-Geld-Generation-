# Notizen zu youtube-channel-report

## Modi
- **Standard** (`main.sh`): Preflight → `report.js`. Reine Leseoperation.
- **`main.sh --self-test`**: `self-test.sh` prüft die CLI-Fehlerpfade je nach
  Credential-Zustand, ohne echten Login. Erwartetes Ende: `SMOKE OK`.

## Exit-Codes (main.sh / report.js)
- `0` — Report erfolgreich ausgegeben (bzw. `SMOKE OK` im Self-Test).
- `1` — Umgebungsproblem: kein Repo-Root, node fehlt, googleapis fehlt,
  kein Kanal für das Konto, oder API-Fehler.
- `2` — Kein Login (`token.json` fehlt bzw. Token ungültig). Erst
  `node youtube-analytics.js` ausführen.
- `64` — Unbekanntes Argument an `main.sh`.

## Zeitfenster (identisch zu youtube-analytics.js)
- 28 Tage, **beide Grenzen inklusiv** (YouTube-Analytics-Konvention).
- Ende = heute − 2 Tage, weil Analytics-Daten ~48 h nachlaufen.
- `startDate = endDate − 27 Tage`.
- **Vorperiode** (für den Trend): die 28 Tage direkt davor.
  `prevEnd = start − 1 Tag`, `prevStart = prevEnd − 27 Tage`.

## Abgefragte Metriken
Aktuelles Fenster: `views, estimatedMinutesWatched, averageViewDuration, subscribersGained`
- `estimatedMinutesWatched` ist in **Minuten** → report.js rechnet in Stunden um.
- `averageViewDuration` ist in **Sekunden** → als `m:ss` formatiert.
- `subscribersGained` ist der Netto-Zuwachs im Fenster (kein Gesamtstand).

Vorperiode: nur `views` (Basis für den Prozent-Trend).

Top-Video: `views` mit `dimensions=video`, `sort=-views`, `maxResults=1`. Die
Analytics-API liefert nur die Video-ID; der Titel wird über die Data-API
(`youtube.videos.list`) nachgeschlagen. Beides ist von den read-only-Scopes
gedeckt.

## Trend-Logik
`pct(now, prev)`:
- Vorperiode > 0 → gerundeter Prozentwert mit Vorzeichen (`+18 %`, `-7 %`).
- Vorperiode = 0 und jetzt > 0 → `neu` (Prozent wäre unendlich).
- Beides 0 → `±0 %`.

## Warum ein eigenes Node-Script statt nur `youtube-analytics.js`?
`youtube-analytics.js` nutzt den **interaktiven** Client (fragt bei fehlendem
Token nach Login) und gibt Rohmetriken aus. Der Skill soll nicht-interaktiv
laufen und lesbar zusammenfassen — daher `getAuthedClientOrThrow()` (token-only,
wirft bei fehlendem Token) plus eigene Formatierung. Die Basis-Query ist
bewusst identisch, damit die Zahlen zur CLI passen.

## Häufige API-Fehler
- `insufficientPermissions` / Scope-Fehler → Re-Login nötig, ggf. Scopes prüfen.
- Leere Zeilen (`rows` fehlt) → im Fenster gab es keine Daten; report.js zeigt
  dann 0 bzw. „keine Videodaten im Fenster".
- Monetäre Kennzahlen (`estimatedRevenue`) fehlen absichtlich — bräuchten
  `yt-analytics-monetary.readonly` + Re-Login.

## Herkunft
Zusammengeführt aus den früheren Skills `run-max-geld-generation` (Smoke/
Fehlerpfade → jetzt `--self-test`) und `youtube-analytics-summary` (nicht-
interaktiver Report → jetzt `report.js`, erweitert um Trend + Top-Video).
