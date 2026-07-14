#!/usr/bin/env python3
"""design_video.py — aufwändig gestalteter, vertikaler Short/Video (1080x1920).

Pro Satz eine designte HTML-Szene (Raster, Motiv-Icon, Schritt-Badge,
Glas-Karte, hervorgehobenes Schlüsselwort), gerendert via Headless-Chromium.
Stimme pro Satz via ElevenLabs (exakte Synchronität) — oder SILENT=1 für eine
stumme Design-Vorschau ohne Guthaben. ffmpeg fügt mit Zoom + Einblendung
zusammen.

Aufruf (aus dem Repo-Root):
  python3 .claude/skills/produce-video/design_video.py <out.mp4> "<Kicker>" <skript.txt> [voice_id] [motif]

motif: pin|stars|calendar|search|chart|camera (Default: pin)
Env: SPEED(1.1) STABILITY(0.6) SIMILARITY(0.8) | SILENT=1 SCENE_SECS(3.2)
"""
import json, os, re, subprocess, sys, tempfile, urllib.request, html

ROOT = subprocess.check_output(
    ["git", "rev-parse", "--show-toplevel"], text=True).strip()
CHROMIUM = "/opt/pw-browsers/chromium"

MOTIFS = {
    "pin": '<path d="M12 22s7-6.6 7-12A7 7 0 0 0 5 10c0 5.4 7 12 7 12z" fill="#e63946"/><circle cx="12" cy="10" r="2.6" fill="#0d1b2a"/>',
    "stars": '<path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 18l-6 3.4 1.4-6.8L2.3 9.9l6.9-.8z" fill="#f2b632"/>',
    "calendar": '<rect x="3" y="4.5" width="18" height="16" rx="2.4" fill="#e63946"/><rect x="3" y="4.5" width="18" height="4.5" fill="#b8222f"/><rect x="6.5" y="12" width="3" height="3" rx=".6" fill="#fff"/><rect x="14.5" y="12" width="3" height="3" rx=".6" fill="#fff"/>',
    "search": '<circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="#f2b632" stroke-width="2.2"/><line x1="15.5" y1="15.5" x2="21" y2="21" stroke="#f2b632" stroke-width="2.6" stroke-linecap="round"/>',
    "chart": '<rect x="4" y="12" width="3.6" height="8" rx="1" fill="#9fb0c8"/><rect x="10.2" y="8" width="3.6" height="12" rx="1" fill="#f2b632"/><rect x="16.4" y="4" width="3.6" height="16" rx="1" fill="#e63946"/>',
    "camera": '<rect x="3" y="7" width="18" height="13" rx="2.4" fill="#e63946"/><path d="M8.5 7l1.5-2.2h4L15.5 7z" fill="#b8222f"/><circle cx="12" cy="13.5" r="3.6" fill="#0d1b2a"/><circle cx="12" cy="13.5" r="1.8" fill="#fff"/>',
}

def load_key():
    for line in open(os.path.join(ROOT, ".elevenlabs.env"), encoding="utf-8"):
        if line.startswith("ELEVENLABS_API_KEY="):
            return line.split("=", 1)[1].strip()
    sys.exit(".elevenlabs.env: ELEVENLABS_API_KEY fehlt")

def tts(text, voice, key, out_mp3):
    body = json.dumps({
        "text": text, "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": float(os.environ.get("STABILITY", "0.6")),
            "similarity_boost": float(os.environ.get("SIMILARITY", "0.8")),
            "style": 0.0, "use_speaker_boost": True,
            "speed": float(os.environ.get("SPEED", "1.1"))}}).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice}", data=body,
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r, open(out_mp3, "wb") as f:
        f.write(r.read())

def duration(path):
    return float(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "csv=p=0", path], text=True).strip())

SLIDE = """<!doctype html><html><head><meta charset="utf-8"><style>
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1920px;overflow:hidden;font-family:Arial,'DejaVu Sans',sans-serif}}
.stage{{position:relative;width:1080px;height:1920px;background:
  radial-gradient(90% 55% at 82% 6%, rgba(230,57,70,.30), transparent 60%),
  radial-gradient(70% 45% at 12% 96%, rgba(242,182,50,.16), transparent 55%),
  linear-gradient(155deg,#1b2c46 0%,#0d1b2a 72%)}}
.grid{{position:absolute;inset:0;opacity:.06;background-image:
  linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);
  background-size:90px 90px}}
.motif{{position:absolute;top:250px;left:50%;transform:translateX(-50%);opacity:.14}}
.kicker{{position:absolute;top:140px;left:0;right:0;text-align:center;color:#f2b632;
  font-size:32px;font-weight:800;letter-spacing:.26em;text-transform:uppercase}}
.badge{{position:absolute;top:520px;left:50%;transform:translateX(-50%);width:150px;height:150px;
  border-radius:50%;background:linear-gradient(145deg,#e63946,#b8222f);
  box-shadow:0 18px 50px rgba(230,57,70,.45);display:flex;align-items:center;
  justify-content:center;color:#fff;font-size:74px;font-weight:800}}
.card{{position:absolute;top:730px;left:70px;right:70px;background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);border-radius:34px;padding:64px 56px;
  box-shadow:0 30px 80px rgba(0,0,0,.4)}}
.headline{{color:#fff;font-weight:800;font-size:{fontsize}px;line-height:1.16;text-align:center;
  text-shadow:0 4px 26px rgba(0,0,0,.4)}}
.hl{{color:#ff6b74}}
.dots{{position:absolute;bottom:300px;left:0;right:0;text-align:center;color:#9fb0c8;font-size:26px;letter-spacing:.1em}}
.bar{{position:absolute;bottom:250px;left:70px;right:70px;height:12px;border-radius:8px;
  background:rgba(159,176,200,.18);overflow:hidden}}
.bar>i{{display:block;height:100%;width:{progress}%;border-radius:8px;background:linear-gradient(90deg,#e63946,#f2b632)}}
.brand{{position:absolute;bottom:150px;left:0;right:0;text-align:center;color:#9fb0c8;
  font-size:30px;font-weight:700;letter-spacing:.05em}}
.brand b{{color:#fff}}
</style></head><body><div class="stage"><div class="grid"></div>
<svg class="motif" width="520" height="520" viewBox="0 0 24 24">{motif}</svg>
<div class="kicker">{kicker}</div>
<div class="badge">{index}</div>
<div class="card"><div class="headline">{headline}</div></div>
<div class="dots">{index} / {total}</div>
<div class="bar"><i></i></div>
<div class="brand"><b>Lokale Sichtbarkeit</b> &amp; Termine</div>
</div></body></html>"""

def highlight(text):
    """Längstes Wort dezent hervorheben (rot)."""
    esc = html.escape(text)
    words = re.findall(r"[A-Za-zÄÖÜäöüß]{6,}", text)
    if words:
        longest = html.escape(max(words, key=len))
        esc = esc.replace(longest, f'<span class="hl">{longest}</span>', 1)
    return esc

def render_slide(text, kicker, idx, total, motif, out_png, tmp):
    n = len(text)
    fontsize = 84 if n < 55 else (72 if n < 95 else 58)
    doc = SLIDE.format(kicker=html.escape(kicker), headline=highlight(text),
                       fontsize=fontsize, index=idx, total=total,
                       progress=round(idx / total * 100), motif=MOTIFS.get(motif, MOTIFS["pin"]))
    hp = os.path.join(tmp, f"s{idx}.html")
    open(hp, "w", encoding="utf-8").write(doc)
    subprocess.run([CHROMIUM, "--headless=new", "--disable-gpu", "--no-sandbox",
        "--hide-scrollbars", "--force-device-scale-factor=1",
        "--window-size=1080,1920", f"--screenshot={out_png}", f"file://{hp}"],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def make_clip(png, out_mp4, mp3=None, secs=None):
    d = duration(mp3) if mp3 else float(secs)
    frames = int(d * 30) + 30
    vf = (f"scale=1080:1920,zoompan=z='min(zoom+0.0007,1.12)':d={frames}:"
          f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,fade=t=in:st=0:d=0.35")
    cmd = ["ffmpeg", "-y", "-v", "error", "-loop", "1", "-i", png]
    if mp3:
        cmd += ["-i", mp3, "-filter_complex", f"[0:v]{vf}[v]", "-map", "[v]",
                "-map", "1:a", "-c:a", "aac", "-b:a", "160k", "-shortest"]
    else:
        cmd += ["-t", str(d), "-filter_complex", f"[0:v]{vf}[v]", "-map", "[v]"]
    cmd += ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out_mp4]
    subprocess.run(cmd, check=True)

def main():
    out, kicker, script_file = sys.argv[1], sys.argv[2], sys.argv[3]
    voice = sys.argv[4] if len(sys.argv) > 4 else "JBFqnCBsd6RMkjVDRZzb"
    motif = sys.argv[5] if len(sys.argv) > 5 else "pin"
    silent = os.environ.get("SILENT") == "1"
    secs = float(os.environ.get("SCENE_SECS", "3.2"))
    key = None if silent else load_key()
    text = open(script_file, encoding="utf-8").read().strip()
    segs = [s.strip() for s in re.split(r'(?<=[.!?])\s+', text) if s.strip()]
    tmp = tempfile.mkdtemp(prefix="design_")
    clips = []
    for i, seg in enumerate(segs, 1):
        png = os.path.join(tmp, f"s{i}.png"); clip = os.path.join(tmp, f"c{i}.mp4")
        render_slide(seg, kicker, i, len(segs), motif, png, tmp)
        if silent:
            make_clip(png, clip, secs=secs)
        else:
            mp3 = os.path.join(tmp, f"s{i}.mp3"); tts(seg, voice, key, mp3)
            make_clip(png, clip, mp3=mp3)
        clips.append(clip)
        print(f"  Szene {i}/{len(segs)} ok", file=sys.stderr)
    listf = os.path.join(tmp, "list.txt")
    open(listf, "w").write("".join(f"file '{c}'\n" for c in clips))
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
        "-i", listf, "-c", "copy", "-movflags", "+faststart", out], check=True)
    print(f"OK: {out}")

if __name__ == "__main__":
    main()
