#!/usr/bin/env python3
"""design_video.py — aufwändig gestalteter, vertikaler Short (1080x1920).

Pro Satz eine designte HTML-Szene (Verlauf, Glow, große Caption, Fortschritt),
gerendert via Headless-Chromium, dazu eine ElevenLabs-Stimme pro Satz (für
exakte Synchronität). ffmpeg baut Szenen mit sanftem Zoom + Einblendung
zusammen.

Aufruf (aus dem Repo-Root):
  python3 .claude/skills/produce-video/design_video.py <out.mp4> "<Kicker>" <skript.txt> [voice_id]

Liest ELEVENLABS_API_KEY aus .elevenlabs.env. Env-Regler:
  SPEED (1.1), STABILITY (0.6), SIMILARITY (0.8)
"""
import json, os, re, subprocess, sys, tempfile, urllib.request, html

ROOT = subprocess.check_output(
    ["git", "rev-parse", "--show-toplevel"], text=True).strip()
CHROMIUM = "/opt/pw-browsers/chromium"

def load_key():
    for line in open(os.path.join(ROOT, ".elevenlabs.env"), encoding="utf-8"):
        if line.startswith("ELEVENLABS_API_KEY="):
            return line.split("=", 1)[1].strip()
    sys.exit(".elevenlabs.env: ELEVENLABS_API_KEY fehlt")

def tts(text, voice, key, out_mp3):
    body = json.dumps({
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": float(os.environ.get("STABILITY", "0.6")),
            "similarity_boost": float(os.environ.get("SIMILARITY", "0.8")),
            "style": 0.0, "use_speaker_boost": True,
            "speed": float(os.environ.get("SPEED", "1.1")),
        }}).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice}",
        data=body, headers={"xi-api-key": key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r, open(out_mp3, "wb") as f:
        f.write(r.read())

def duration(path):
    return float(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "csv=p=0", path], text=True).strip())

SLIDE = """<!doctype html><html><head><meta charset="utf-8"><style>
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1920px;overflow:hidden;font-family:Arial,'DejaVu Sans',sans-serif}}
.stage{{position:relative;width:1080px;height:1920px;
  background:radial-gradient(120% 80% at 80% 8%, rgba(230,57,70,.22), transparent 55%),
             linear-gradient(160deg,#16243a 0%,#0d1b2a 70%)}}
.grain{{position:absolute;inset:0;background:
  radial-gradient(circle at 20% 85%, rgba(242,182,50,.10), transparent 40%)}}
.kicker{{position:absolute;top:150px;left:0;right:0;text-align:center;
  color:#f2b632;font-size:34px;font-weight:800;letter-spacing:.28em;text-transform:uppercase}}
.wrap{{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;
  justify-content:center;padding:0 90px}}
.headline{{color:#fff;font-weight:800;font-size:{fontsize}px;line-height:1.12;
  text-align:center;text-wrap:balance;
  text-shadow:0 6px 34px rgba(0,0,0,.45), 0 2px 0 rgba(230,57,70,.35)}}
.hl-accent{{color:#ff6b74}}
.bar{{position:absolute;bottom:250px;left:90px;right:90px;height:10px;border-radius:6px;
  background:rgba(159,176,200,.18);overflow:hidden}}
.bar>i{{display:block;height:100%;width:{progress}%;border-radius:6px;
  background:linear-gradient(90deg,#e63946,#f2b632)}}
.dots{{position:absolute;bottom:290px;left:0;right:0;text-align:center;color:#9fb0c8;
  font-size:26px;letter-spacing:.1em}}
.brand{{position:absolute;bottom:150px;left:0;right:0;text-align:center;
  color:#9fb0c8;font-size:30px;font-weight:700;letter-spacing:.06em}}
.brand b{{color:#fff}}
</style></head><body>
<div class="stage"><div class="grain"></div>
  <div class="kicker">{kicker}</div>
  <div class="wrap"><div class="headline">{headline}</div></div>
  <div class="dots">{index} / {total}</div>
  <div class="bar"><i></i></div>
  <div class="brand"><b>Lokale Sichtbarkeit</b> &amp; Termine</div>
</div></body></html>"""

def render_slide(text, kicker, idx, total, out_png, tmp):
    n = len(text)
    fontsize = 92 if n < 60 else (76 if n < 110 else 62)
    # erstes/wichtiges Wort hervorheben (einfaches Highlight des ersten Begriffs)
    safe = html.escape(text)
    progress = round(idx / total * 100)
    doc = SLIDE.format(kicker=html.escape(kicker), headline=safe, fontsize=fontsize,
                       index=idx, total=total, progress=progress)
    html_path = os.path.join(tmp, f"slide_{idx}.html")
    open(html_path, "w", encoding="utf-8").write(doc)
    subprocess.run([CHROMIUM, "--headless=new", "--disable-gpu", "--no-sandbox",
        "--hide-scrollbars", "--force-device-scale-factor=1",
        "--window-size=1080,1920", f"--screenshot={out_png}",
        f"file://{html_path}"], check=True,
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def make_clip(png, mp3, out_mp4):
    d = duration(mp3)
    frames = int(d * 30) + 30
    vf = (f"scale=1080:1920,zoompan=z='min(zoom+0.0007,1.12)':d={frames}:"
          f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,"
          f"fade=t=in:st=0:d=0.35")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-loop", "1", "-i", png,
        "-i", mp3, "-filter_complex", f"[0:v]{vf}[v]", "-map", "[v]", "-map", "1:a",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k",
        "-shortest", "-movflags", "+faststart", out_mp4], check=True)

def main():
    out, kicker, script_file = sys.argv[1], sys.argv[2], sys.argv[3]
    voice = sys.argv[4] if len(sys.argv) > 4 else "JBFqnCBsd6RMkjVDRZzb"
    key = load_key()
    text = open(script_file, encoding="utf-8").read().strip()
    segs = [s.strip() for s in re.split(r'(?<=[.!?])\s+', text) if s.strip()]
    tmp = tempfile.mkdtemp(prefix="design_")
    clips = []
    for i, seg in enumerate(segs, 1):
        mp3 = os.path.join(tmp, f"s{i}.mp3"); png = os.path.join(tmp, f"s{i}.png")
        clip = os.path.join(tmp, f"c{i}.mp4")
        tts(seg, voice, key, mp3)
        render_slide(seg, kicker, i, len(segs), png, tmp)
        make_clip(png, mp3, clip)
        clips.append(clip)
        print(f"  Szene {i}/{len(segs)} ok", file=sys.stderr)
    listf = os.path.join(tmp, "list.txt")
    open(listf, "w").write("".join(f"file '{c}'\n" for c in clips))
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
        "-i", listf, "-c", "copy", "-movflags", "+faststart", out], check=True)
    print(f"OK: {out}")

if __name__ == "__main__":
    main()
