#!/usr/bin/env bash
# produce.sh — Skript-Text -> Audio (TTS) + Thumbnail + 16:9-Video + 9:16-Short
#
# Aufruf:
#   .claude/skills/produce-video/produce.sh <ausgabe-verzeichnis> <titel> <skript-textdatei> [stimme]
#
# Beispiel:
#   .claude/skills/produce-video/produce.sh out/ep001 "5 Spartipps" skript.txt de
#
# Ergebnis im Ausgabeverzeichnis:
#   audio.wav      — TTS-Sprachspur (espeak-ng)
#   thumbnail.png  — 1280x720-Thumbnail mit Titeltext
#   video.mp4      — 1920x1080, Standbild + Sprachspur (YouTube-Langform)
#   short.mp4      — 1080x1920 vertikal, auf 60 s gekappt (YouTube Short)
set -euo pipefail

OUT=${1:?Ausgabeverzeichnis fehlt}
TITLE=${2:?Titel fehlt}
SCRIPT_FILE=${3:?Skript-Textdatei fehlt}
VOICE=${4:-de}

FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
mkdir -p "$OUT"
# Absoluter Pfad: verhindert, dass ffmpeg relative Pfade mit ":" als
# Protokoll-Präfix fehlinterpretiert.
OUT=$(cd "$OUT" && pwd)

# Temporäre Titeldatei mit garantiert "harmlosem" Pfad (mktemp: nur
# [A-Za-z0-9./]). Der Pfad landet im ffmpeg-Filtergraph — dort würden
# Sonderzeichen aus $OUT (":", ",", "'", "[", Leerzeichen) den Parser
# brechen bzw. Options-Injektion erlauben.
TITLE_TXT=$(mktemp /tmp/produce-title.XXXXXXXX)
trap 'rm -f "$TITLE_TXT"' EXIT

# 1) TTS: Skript -> audio.wav (Sprechtempo 150 WpM, etwas tiefere Stimme)
espeak-ng -v "$VOICE" -s 150 -p 40 -w "$OUT/audio.wav" -f "$SCRIPT_FILE"

# 2) Thumbnail 1280x720: dunkler Verlauf + umbrochener Titel
#    drawtext bricht nicht automatisch um -> ZEICHENbasiert auf ~20 Zeichen/
#    Zeile umbrechen (fold zählt unter POSIX-Locale Bytes und zerschneidet
#    UTF-8-Umlaute an der Umbruchgrenze — deshalb python3/textwrap).
#    expansion=none: %{...}-Sequenzen im Titel wörtlich rendern statt expandieren.
python3 -c 'import sys, textwrap; print("\n".join(textwrap.wrap(sys.argv[1], 20) or [""]))' "$TITLE" > "$TITLE_TXT"
ffmpeg -y -v error \
  -f lavfi -i "color=c=0x0d1b2a:s=1280x720" \
  -vf "drawbox=x=0:y=0:w=1280:h=720:color=0x1b263b@0.6:t=fill, \
       drawtext=textfile=$TITLE_TXT:fontfile=$FONT:expansion=none:fontsize=96:fontcolor=white: \
       borderw=6:bordercolor=0xe63946:x=(w-text_w)/2:y=(h-text_h)/2" \
  -frames:v 1 "$OUT/thumbnail.png"

# 3) Langform-Video 1920x1080: Thumbnail als Standbild + Sprachspur
ffmpeg -y -v error \
  -loop 1 -i "$OUT/thumbnail.png" -i "$OUT/audio.wav" \
  -vf "scale=1920:1080" -c:v libx264 -tune stillimage -pix_fmt yuv420p \
  -c:a aac -b:a 128k -shortest -movflags +faststart "$OUT/video.mp4"

# 4) Short 1080x1920 (vertikal), max. 60 s
ffmpeg -y -v error \
  -loop 1 -i "$OUT/thumbnail.png" -i "$OUT/audio.wav" \
  -vf "scale=1080:608,pad=1080:1920:0:656:color=0x0d1b2a" \
  -c:v libx264 -tune stillimage -pix_fmt yuv420p \
  -c:a aac -b:a 128k -shortest -t 60 -movflags +faststart "$OUT/short.mp4"

echo "OK: $OUT/{audio.wav,thumbnail.png,video.mp4,short.mp4}"
