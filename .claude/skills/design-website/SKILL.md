---
name: design-website
description: Design, update, preview, or screenshot the Max Geld Generation channel website (website/index.html) — brand identity tokens, responsive checks with real device emulation, GoDaddy deployment.
---

# Website-Design: Max Geld Generation

Die Kanal-Website ist eine einzelne, komplett in sich geschlossene Datei:
`website/index.html` (kein Build, keine externen Assets, keine Webfonts).
**Alle Pfade relativ zum Repo-Root.**

## Marken-Identität (mit den Video-Thumbnails teilen!)

Die Website nutzt dieselbe visuelle Sprache wie die Thumbnails aus
`.claude/skills/produce-video/produce.sh` — Änderungen hier und dort
synchron halten:

| Token | Wert (dark) | Verwendung |
|---|---|---|
| Grund | `#0d1b2a` | Seiten-/Thumbnail-Hintergrund |
| Panel | `#1b263b` | Karten, Thumbnail-Verlauf |
| Akzent | `#e63946` | Buttons, Textkontur der Display-Schrift |
| Gold | `#f2b632` | NUR Monetarisierungs-Fortschritt + Eyebrow |
| Schrift hell | `#f4f7fb` / gedämpft `#9fb0c8` | Text |

Display-Typo: `Impact, "Arial Black", "Franklin Gothic Medium"` versal —
weiße Schrift mit rotem Kontur-Schatten (Thumbnail-Look). Fließtext:
`system-ui`. Light-Theme + `data-theme`-Overrides sind als CSS-Tokens in
`:root` definiert — neue Farben immer als Token, nie hart in Komponenten.

## Run (Agent-Pfad) — Screenshot-Treiber mit Geräte-Emulation

```bash
npm install --no-audit --no-fund   # einmalig; playwright-core ist devDependency
node .claude/skills/design-website/shot.mjs out/design-check
```

Erzeugt `desktop-dark.png`, `desktop-light.png`, `mobile.png` (390 px,
echte Mobil-Emulation) und schlägt mit Exit 1 fehl, wenn die Seite
horizontal scrollt. Nach jeder Layout-Änderung laufen lassen und die
PNGs **ansehen** (Read auf die Dateien) — der Overflow-Check fängt nicht
alles (z. B. Textkollisionen).

## Gotchas

- **Headless-Chrome-CLI (`--window-size=420 --screenshot`) taugt NICHT für
  Mobil-Tests:** Chrome klemmt die Fensterbreite auf ~500 px und der
  Screenshot ist nur ein beschnittener Desktop-Render — sieht aus wie
  horizontaler Overflow, ist aber keiner (hier passiert; deshalb der
  Playwright-Treiber, `viewport` emuliert echte Breiten).
- **Claude-Artifact-Version ≠ Deploy-Version:** Die Artifact-Vorschau
  braucht die Datei OHNE `<!doctype>/<html>/<head>/<body>` (wird beim
  Publizieren ergänzt); `website/index.html` hat das volle Gerüst für
  echtes Hosting. Bei Änderungen beide Fassungen anfassen (Gerüst-Zeilen
  1–7 + `</head><body>` + Schlusstags sind der einzige Unterschied).
- **Platzhalter vor Livegang ersetzen:** `@DEIN-KANALNAME` (alle
  YouTube-Links), Abo-Fortschritt (`.meter > i { width: …% }`,
  kommentiert), Impressum/Datenschutz im Footer (Pflicht in DE).
- Die Navigation hat `flex-wrap: wrap` — beim Hinzufügen von Nav-Punkten
  Mobil-Screenshot prüfen.

## Deployment (GoDaddy)

Klassisches Webhosting: `website/index.html` als `index.html` ins
Web-Root hochladen (Dateimanager/FTP) — fertig, keine Abhängigkeiten.
Der Baukasten „Websites + Marketing" akzeptiert kein eigenes HTML; dort
Texte/Farben manuell übertragen. (Hier nicht verifizierbar — kein Zugang
zum GoDaddy-Konto.)

## Troubleshooting

| Symptom | Fix |
|---|---|
| `shot.mjs`: `Executable doesn't exist` | Pfad prüfen: Treiber erwartet `/opt/pw-browsers/chromium` (Container-Standard); lokal `executablePath` anpassen |
| Screenshot bei kleiner `--window-size` rechts abgeschnitten | Kein CSS-Bug — Headless-Mindestbreite; `shot.mjs` benutzen |
| Seite im Artifact ohne Styles | Datei enthält volles HTML-Gerüst — für Artifacts die Variante ohne Gerüst publizieren |
