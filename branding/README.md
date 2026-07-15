# Kanal-Branding — Lokale Sichtbarkeit & Termine

Marken-Assets für den YouTube-Kanal, im selben Look wie Website und Videos
(Navy #0d1b2a · Rot #e63946 · Gold #f2b632 · Pin-Motiv).

| Datei | Zweck | Maße |
|---|---|---|
| `profilbild-800x800.png` | Kanal-Profilbild (wird rund beschnitten) | 800×800 |
| `banner-2048x1152.png` | Kanal-Banner / Kanalart | 2048×1152 |

Die `*.html` sind die Quellen — mit Headless-Chromium in exakter Größe
gerendert; Text/Farben dort anpassen und neu rendern:

```bash
/opt/pw-browsers/chromium --headless=new --disable-gpu --no-sandbox \
  --force-device-scale-factor=1 --window-size=2048,1152 \
  --screenshot=branding/banner-2048x1152.png "file://$PWD/branding/banner.html"
```

## Hochladen (YouTube Studio)
- **Profilbild:** studio.youtube.com → Anpassen → Branding → *Bild* → hochladen.
  Wichtige Elemente liegen mittig (der runde Zuschnitt schneidet die Ecken ab).
- **Banner:** Branding → *Banner-Bild* → hochladen. Alles Wichtige liegt in der
  zentralen sicheren Zone (1235×338), damit es auf Handy, Desktop und TV sichtbar
  bleibt; die Ränder sind bewusst nur dezent dekoriert.
