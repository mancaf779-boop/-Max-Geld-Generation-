---
name: produce-video
description: Create/produce a YouTube video, Short, thumbnail, and TTS audio from a German script text — generate video assets locally with espeak-ng + ffmpeg (no API keys needed).
---

# Video-Produktion: Skript → Audio + Thumbnail + Video + Short

Erzeugt aus einer Skript-Textdatei lokal alle Upload-Artefakte für ein
Video: TTS-Sprachspur, 1280×720-Thumbnail mit Titel, 1920×1080-Langform-Video
(Standbild + Ton) und 1080×1920-Short (max. 60 s). Keine API-Keys nötig.
**Alle Pfade relativ zum Repo-Root.**

## Voraussetzungen

```bash
apt-get update -q && apt-get install -y -q ffmpeg espeak-ng
```

(Ohne vorheriges `apt-get update` schlägt die Installation im Container mit
404 auf mesa-/vaapi-Pakete fehl.)

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

- `drawtext` bricht Text **nicht** automatisch um — der Treiber faltet den
  Titel deshalb mit `fold -w 20` auf Zeilen. Titel > ~40 Zeichen werden im
  Thumbnail klein/unleserlich; kurz halten.
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
