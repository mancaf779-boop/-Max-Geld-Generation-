---
name: produce-video
description: Create/produce a YouTube video, Short, thumbnail, and voiceover from a German script — three drivers: produce.sh (espeak, no key), make-short.sh (ElevenLabs voice, flat short), design_video.py (ElevenLabs + multi-scene designed short).
---

# Video-Produktion: Skript → Audio + Thumbnail + Video + Short

Drei Treiber, je nach gewünschter Qualität (alle Pfade relativ zum Repo-Root):

| Treiber | Stimme | Output | Key nötig |
|---|---|---|---|
| `produce.sh` | espeak-ng (robotisch) | Thumbnail + 16:9-Video + 9:16-Short | nein |
| `make-short.sh` | ElevenLabs | 1 flacher 9:16-Short (Titelkarte) | `.elevenlabs.env` |
| `design_video.py` | ElevenLabs **oder edge-tts (gratis)** | **aufwändiger** 9:16-Short/Video: designte Szene pro Satz, Motiv, Glas-Karte, Zoom, Fortschrittsbalken | key-frei mit edge-tts |

**`produce.sh`** erzeugt lokal ohne API-Key: TTS-Sprachspur, 1280×720-Thumbnail,
1920×1080-Langform-Video (Standbild + Ton) und 1080×1920-Short.

### Voraussetzungen

```bash
apt-get update -q && apt-get install -y -q ffmpeg espeak-ng   # produce.sh
pip install edge-tts                                          # gratis Neural-Stimme (design_video.py Standard)
```

`design_video.py` nutzt außerdem Chromium unter `/opt/pw-browsers/chromium`
(im Container vorhanden) zum Rendern der Szenen. Standard-Stimme ist
`de-DE-ConradNeural` (edge-tts, kostenlos, **kein Schlüssel/Limit**) — eine
`…Neural`-Stimme als 4. Argument wählt edge-tts, eine ElevenLabs-`voice_id`
wählt ElevenLabs (dann `.elevenlabs.env` nötig).

## ElevenLabs-Treiber (bessere Stimme)

Schlüssel gehört gitignoriert in `.elevenlabs.env` (`ELEVENLABS_API_KEY=...`).
Der Schlüssel braucht die Berechtigung **Text to Speech**; für eigene/geklonte
Stimmen zusätzlich **Voices Read**. Regler per Env: `SPEED` (1.1), `STABILITY`
(0.6), `SIMILARITY` (0.8). Voreingestellte Stimme: George
(`JBFqnCBsd6RMkjVDRZzb`, mehrsprachig); als 4. Argument eine andere voice_id.

```bash
# Flacher Short (Titelkarte + Stimme) — verifiziert:
SPEED=1.12 .claude/skills/produce-video/make-short.sh out/s.mp4 "Titel" skript.txt

# Aufwändiger, mehrszeniger Short (je Satz eine designte Szene) — verifiziert:
SPEED=1.12 python3 .claude/skills/produce-video/design_video.py out/s.mp4 "Kicker" skript.txt
```

`design_video.py` splittet das Skript in Sätze, erzeugt pro Satz eine
ElevenLabs-Spur (exakte Synchronität), rendert je Satz eine gestaltete
HTML-Szene (1080×1920) via Headless-Chromium (`/opt/pw-browsers/chromium`) und
setzt alles mit sanftem Zoom + Einblendung per ffmpeg zusammen. Referenzlauf:
6-Satz-Skript → 6 Szenen, ~20 s, h264 1080×1920 + AAC.

## Voraussetzungen

```bash
apt-get update -q && apt-get install -y -q ffmpeg espeak-ng
```

(Ohne vorheriges `apt-get update` schlägt die Installation im Container mit
404 auf mesa-/vaapi-Pakete fehl.)

Außerdem wird `python3` benötigt (zeichenbasierter Titel-Umbruch via
`textwrap`); im Container bereits vorhanden.

## Run (Agent-Pfad)

1. Skript als UTF-8-Textdatei schreiben (fließender Sprechtext, keine
   Markdown-Syntax — TTS liest alles wörtlich vor).
2. Treiber aufrufen:

```bash
.claude/skills/produce-video/produce.sh <ausgabe-dir> "<Titel>" <skript.txt> [stimme]
# Beispiel (verifiziert):
.claude/skills/produce-video/produce.sh /tmp/ep001 "5 Spartipps für jeden Monat" skript.txt de
```

3. Ergebnis prüfen — Erfolgsausgabe ist
   `OK: <dir>/{audio.wav,thumbnail.png,video.mp4,short.mp4}`; danach
   `thumbnail.png` **ansehen** (Text lesbar? Umbruch ok?) und Dauer/Auflösung
   verifizieren:

```bash
ffprobe -v error -show_entries format=duration -show_entries stream=codec_name,width,height -of csv <dir>/video.mp4
```

Referenzlauf in diesem Container: 90-Wörter-Skript → 37 s Audio,
video.mp4 h264 1920×1080 + AAC, short.mp4 1080×1920, Laufzeit < 30 s gesamt.

## Gotchas

- `drawtext` bricht Text **nicht** automatisch um — der Treiber bricht den
  Titel deshalb zeichenbasiert mit `python3`/`textwrap` auf ~20 Zeichen/Zeile
  um (`fold -w` zählt unter POSIX-Locale Bytes und zerschneidet Umlaute —
  verifiziert mit „Vermögensverwaltung für Anfänger"). Titel > ~40 Zeichen
  werden im Thumbnail klein/unleserlich; kurz halten.
- Der Titel wird über eine mktemp-Titeldatei (fester, „harmloser" Pfad) in
  den Filtergraph gereicht und mit `expansion=none` gerendert: Ausgabepfade
  mit `:`/Leerzeichen und Titel mit wörtlichem `%{...}` funktionieren
  (verifiziert). Bei Fehlabbrüchen räumt ein `trap` die Titeldatei weg.
- Stimmen: `de` (Deutsch), `en` — `espeak-ng --voices` listet alle.
  espeak-ng klingt robotisch; für bessere Qualität später eine
  Cloud-TTS einsetzen (braucht API-Key, hier nicht verifiziert).
- Das Langform-Video ist ein Standbild mit Ton — bewusst minimal.
  Szenenwechsel/B-Roll sind nicht Teil dieses Treibers.
- YouTube-Upload ist **nicht** Teil dieses Skills: braucht den Scope
  `https://www.googleapis.com/auth/youtube.upload` (Repo hat nur read-only)
  plus Re-Login. Siehe `youtube-auth.js`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `apt-get install ffmpeg` → 404 Not Found | Erst `apt-get update -q`, dann erneut installieren (hier so passiert) |
| Thumbnail-Text ragt über den Rand | Titel kürzen (< 40 Zeichen) |
| Audio klingt falsch/englisch | Stimmen-Parameter setzen: 4. Argument `de` |
