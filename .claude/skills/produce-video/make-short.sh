#!/usr/bin/env bash
# make-short.sh — vertikaler YouTube-Short (1080x1920) aus Skript-Text:
# ElevenLabs-Stimme + gebrandeter Titel-Hintergrund.
#
# Aufruf (aus dem Repo-Root):
#   .claude/skills/produce-video/make-short.sh <out.mp4> "<Titel>" <skript.txt> [voice_id]
#
# Liest ELEVENLABS_API_KEY aus .elevenlabs.env (gitignored).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
OUT=${1:?Ausgabedatei fehlt}
TITLE=${2:?Titel fehlt}
SCRIPT_FILE=${3:?Skript-Textdatei fehlt}
VOICE=${4:-JBFqnCBsd6RMkjVDRZzb}   # Default: George (mehrsprachig, ruhig)
MODEL=${ELEVEN_MODEL:-eleven_multilingual_v2}
FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf

# shellcheck disable=SC1090
. "$ROOT/.elevenlabs.env"

TMP=$(mktemp -d /tmp/short.XXXXXX)
trap 'rm -rf "$TMP"' EXIT

# 1) Anfrage-JSON bauen (Skripttext sicher als JSON-String)
MODEL="$MODEL" python3 - "$SCRIPT_FILE" "$TMP/req.json" <<'PY'
import json, os, sys
text = open(sys.argv[1], encoding="utf-8").read().strip()
json.dump({"text": text,
           "model_id": os.environ.get("MODEL", "eleven_multilingual_v2"),
           "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}},
          open(sys.argv[2], "w"))
PY

# 2) Stimme erzeugen (ElevenLabs -> mp3)
code=$(curl -sS -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" -H "Content-Type: application/json" \
  --data-binary "@$TMP/req.json" -o "$TMP/voice.mp3" -w "%{http_code}")
if [ "$code" != "200" ]; then echo "ElevenLabs-Fehler ($code):"; cat "$TMP/voice.mp3"; exit 1; fi

# 3) Titel zeichenbasiert umbrechen (POSIX-sicher)
python3 -c 'import sys,textwrap;print("\n".join(textwrap.wrap(sys.argv[1],14) or [""]))' "$TITLE" > "$TMP/title.txt"

# 4) Vertikales Video: gebrandeter Hintergrund + Titel + Sprachspur
ffmpeg -y -v error \
  -f lavfi -i "color=c=0x0d1b2a:s=1080x1920" -i "$TMP/voice.mp3" \
  -vf "drawbox=x=0:y=0:w=1080:h=1920:color=0x1b263b@0.5:t=fill, \
       drawtext=textfile=$TMP/title.txt:fontfile=$FONT:expansion=none:fontsize=96:fontcolor=white:borderw=7:bordercolor=0xe63946:x=(w-text_w)/2:y=(h-text_h)/2-100:line_spacing=18, \
       drawtext=text='Lokale Sichtbarkeit \& Termine':fontfile=$FONT:expansion=none:fontsize=40:fontcolor=0xf2b632:x=(w-text_w)/2:y=h-260" \
  -c:v libx264 -tune stillimage -pix_fmt yuv420p -c:a aac -b:a 160k \
  -shortest -movflags +faststart "$OUT"

echo "OK: $OUT"
