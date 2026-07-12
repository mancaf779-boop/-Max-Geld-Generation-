# HANDOFF — Projekt „Max Geld Generation"

Übergabe-Prompt für eine Claude-Code-Instanz (oder einen Menschen), die an
diesem Repo weiterarbeitet. Stand: 2026-07-11, Branch
`claude/claude-md-docs-tpypde`, letzter Commit `1c1258e`.

> **An die ausführende Instanz:** Lies zuerst `CLAUDE.md` (Repo-Konventionen)
> und dann dieses Dokument. Arbeite die offenen Schritte unter
> [Nächste Schritte](#nächste-schritte) in Reihenfolge ab. Frage den Nutzer
> nur, wo es als BLOCKIERT markiert ist.

## Projektziel

Automatisierter Workflow für den YouTube-Kanal **Max Geld Generation**
(deutschsprachig, Finanzen/Spartipps): Recherche → Skript → Video/Short/
Thumbnail-Produktion → Upload → Analytics-Auswertung. Etappenziel: 500
Abonnenten (YouTube-Fan-Funding-Stufe; volle Monetarisierung braucht 1.000
Abos + Watchtime). Täglich 1–2 Videos plus Shorts.

**Qualitäts-Leitplanke:** YouTube lehnt Kanäle mit massenhaft unverändert
auto-generierten Inhalten („inauthentic content") bei der
Monetarisierungsprüfung ab. Die Pipeline liefert das Handwerk; Skripte
müssen pro Video echten, redaktionellen Mehrwert haben.

## Was fertig und verifiziert ist

| Komponente | Datei(en) | Status |
|---|---|---|
| OAuth-Login (Loopback + manueller Fallback, `prompt=consent`, Token-Rotation, 0600) | `youtube-auth.js` | Code fertig; bis Token-Tausch verifiziert; echter Login noch offen (s. u.) |
| Analytics-CLI (28-Tage-Report, Datenverzug −2 Tage) | `youtube-analytics.js` | fertig; wartet auf echten Login |
| Smoke-Treiber (alle 4 Credential-Zustände, blockiert nie) | `.claude/skills/run-max-geld-generation/` | verifiziert, `SMOKE OK` |
| Video-Produktion: Skript-Text → TTS + Thumbnail + 16:9-Video + 9:16-Short | `.claude/skills/produce-video/produce.sh` | mehrfach end-to-end verifiziert (espeak-ng + ffmpeg, lokal, keine API-Keys) |
| Kanal-Website (eine Datei, Thumbnail-Look, responsive, hell/dunkel) | `website/index.html` | per Playwright-Screenshots verifiziert (Desktop + 390-px-Mobil, kein Overflow) |
| Design-Skill (Marken-Tokens + Screenshot-Treiber) | `.claude/skills/design-website/` | verifiziert |

Historie: Feature-Implementierung → unabhängiges Review (17 Findings) →
alle behoben und einzeln verifiziert (Commits `b3790ce`, `36a2040`,
`591c5c6`, `1c1258e`).

## Arbeitsregeln (vom Nutzer festgelegt)

1. Implementierung in Phasen: **Writer** (baut, committet nicht, listet
   Dateien + Kurzbegründung, keine Selbstbewertung) → **Reviewer**
   (frischer Kontext, sieht nur Diffs, strukturierte Findings:
   Bug/Security/Style/Sonstiges) → **Debugger** (frischer Kontext, behebt
   Findings, verifiziert durch echte Ausführung). Danach fasst der
   Orchestrator zusammen und committet.
2. Skills dokumentieren **nur ausgeführte, funktionierende Befehle** —
   keine Wunschdoku.
3. `client_secret.json` / `token.json` sind Secrets: gitignored, nie
   committen, nie in Logs/Ausgaben zitieren.
4. Branch `claude/claude-md-docs-tpypde`, Push mit `git push -u origin
   <branch>`, PR nur auf ausdrücklichen Wunsch.

## Nächste Schritte

### 1. YouTube-Login abschließen — BLOCKIERT auf Nutzer

Kontext: Der Nutzer hat in der Google Cloud Console einen OAuth-Client
(Typ „Desktop app") angelegt und die JSON bereits erhalten. Er war dabei,
die App auf **„Production"** zu stellen (wichtig: im Test-Modus laufen
Refresh-Tokens nach 7 Tagen ab — für tägliche Automation unbrauchbar).
Beim ersten Login-Versuch kam `access_denied` (Testnutzer fehlte).

Ablauf für die Instanz:
1. Nutzer bitten, den Inhalt seiner `client_secret.json` bereitzustellen;
   als `client_secret.json` (Rechte 600) ins Repo-Root schreiben.
2. Aus dem Repo-Root eine Auth-URL mit `redirect_uri=http://localhost`
   erzeugen (googleapis `generateAuthUrl` mit `access_type=offline`,
   `prompt=consent`, Scopes aus `youtube-auth.js`) und dem Nutzer geben.
3. Nutzer öffnet die URL, bestätigt die „App nicht überprüft"-Warnung
   (Erweitert → Weiter), erlaubt beide Berechtigungen und landet auf einer
   **toten `http://localhost/?code=…`-Seite — das ist korrekt.** Er liefert
   die komplette URL aus der Adressleiste zurück.
4. Code extrahieren, mit demselben `redirect_uri=http://localhost` gegen
   Tokens tauschen, als `token.json` (0600) speichern, dann
   `node youtube-analytics.js` — der 28-Tage-Report ist der Funktionsnachweis.
5. `token.json` dem Nutzer als Datei zum lokalen Sichern schicken
   (Container ist flüchtig!) und daran erinnern, dass ein dauerhafter,
   sicherer Ablageort für beide Secrets nötig ist.

### 2. Website live schalten — BLOCKIERT auf Nutzer-Infos

`website/index.html` ist fertig. Vor dem Livegang: alle
`@DEIN-KANALNAME`-Platzhalter durch die echte Kanal-URL ersetzen
(beim Nutzer erfragen), Abo-Fortschritt pflegen (`.meter > i`),
Impressum/Datenschutz verlinken (Pflicht in DE). Deployment: bei
GoDaddy-Webhosting als `index.html` ins Web-Root laden; der Baukasten
„Websites + Marketing" nimmt kein eigenes HTML (dann Inhalte als
Copy-Paste-Bausteine liefern). Nach Änderungen:
`node .claude/skills/design-website/shot.mjs out/design-check` + PNGs ansehen.

### 3. Upload-Automation bauen (nach Schritt 1)

- Scope `https://www.googleapis.com/auth/youtube.upload` zu `SCOPES` in
  `youtube-auth.js` hinzufügen; `token.json` löschen; Re-Login (Schritt 1).
- Upload-Modul (`videos.insert`, resumable) + CLI bauen: nimmt
  `produce.sh`-Output (video.mp4/short.mp4/thumbnail.png) + Titel/
  Beschreibung/Tags; Thumbnail via `thumbnails.set`.
- Dem Phasen-Workflow folgen (Writer → Reviewer → Debugger).

### 4. Tägliche Automation (nach Schritt 3)

- Themen-/Keyword-Recherche (Websuche + Analytics-Daten), Skript mit echtem
  Mehrwert schreiben, `produce-video`-Skill ausführen, Upload, Ergebnis
  loggen. 1–2 Videos + Shorts/Tag.
- Zeitsteuerung je nach Umgebung (Cron/Routine). Erst einrichten, wenn
  Upload nachweislich funktioniert.
- Stimmqualität: espeak-ng klingt robotisch → Cloud-TTS evaluieren
  (braucht API-Key vom Nutzer).

### 5. Offene Kleinigkeiten

- `README.md` ist noch Platzhalter.
- Kein Test-Runner/Linter/CI (siehe CLAUDE.md-Checkliste).
- Monetäre Metriken im Report brauchen Scope
  `yt-analytics-monetary.readonly` + Re-Login.

## Wichtige Gotchas (alle hier real aufgetreten)

- Googles OOB-Flow ist tot; Desktop-Clients haben `http://localhost` als
  Redirect. Der Nutzer muss den Code aus der URL-Leiste der toten
  localhost-Seite fischen — das ist der erwartete Weg.
- Ohne `prompt=consent` gibt Google beim Re-Login **kein** `refresh_token`.
- `fold` zählt unter POSIX-Locale Bytes → zerschneidet Umlaute; deshalb
  bricht `produce.sh` Titel mit python3/textwrap um.
- ffmpeg-Filtergraph: Pfade mit `: , ' [ `/Leerzeichen zerbrechen den
  Parser → Titeldatei via `mktemp`, `$OUT` absolut.
- Headless-Chrome-CLI hat ~500 px Mindest-Fensterbreite → für
  Mobil-Screenshots `shot.mjs` (Playwright-Emulation) nutzen.
- `apt-get install ffmpeg espeak-ng` schlägt ohne vorheriges
  `apt-get update` mit 404 fehl.
- YouTube-Analytics: start/end beide inklusiv; Daten laufen ~48 h nach.
