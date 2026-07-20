# Cloudinary FLUX — Generierungs-Queue (credit-budgetiert)

Fertige Text-zu-Bild-Prompts für Cloudinarys **AI Image Generation** (Modell
`flux-2-klein-9b`). Ziel: aus den **50 Credits** das Maximum holen — deshalb
**nicht alle ~119 Szenen**, sondern pro Video die **2 stärksten Signatur-Szenen**
(Problem-/Hook-Bild + Payoff-Bild). Ergibt **12 Bilder** → sicherer Puffer.

## So führst du es aus (im Cloudinary-Studio)

1. Cloudinary-Konsole → **Image → Generate Images** (oder die gezeigte cURL/REST).
2. Pro Eintrag: **Prompt** einfügen, **aspect_ratio 16:9**, **resolution 1K**,
   target `managed_asset`.
3. Erzeugtes Bild landet in deiner Media Library → für Video-Schnitt nutzen.

> **Wichtig:** Prüf zuerst mit **1 Testbild** die Qualität und die tatsächlichen
> **Credit-Kosten pro Generierung** (steht im Studio). Erst wenn Qualität passt,
> die restlichen generieren. Reichen die Credits nicht, hat Paket 01 Vorrang.
> Der Rest der Szenen bleibt über die bestehenden Nano-Banana-Prompts abgedeckt.

Stil-Klammer (in jedem Prompt schon enthalten): modern 3D explainer illustration,
deep navy #0d1b2a, coral-red #e63946 + gold #f2b632 + mint-green #37c98b, soft
studio lighting, generic non-branded UI, 16:9.

---

## Paket 01 — Google-Profil optimieren

```
[P01-A · Problem] Modern 3D explainer illustration, deep navy #0d1b2a background with soft glow, a worried stylized small-business owner (no realistic face) beside a small storefront in shadow, above them a generic non-branded map/search panel where their business is missing (empty grey card with a faint coral-red question mark), soft studio lighting, gold #f2b632 accents, shallow depth of field, professional, high detail
```
```
[P01-B · Payoff] Modern 3D explainer illustration, deep navy #0d1b2a with soft glow, a generic non-branded search-results panel with three white business cards, the bottom card rising to the number-one spot with a glowing mint-green #37c98b upward arrow and a red location pin marking it, coral-red and gold #f2b632 accents, soft studio lighting, rim light, professional success mood, high detail
```

## Paket 02 — 5 Fehler im Google-Eintrag

```
[P02-A · Problem] Modern 3D explainer illustration, deep navy #0d1b2a with coral-red glow, a clean white business-profile card with five small red X marks on different fields and a big bold red numeral "5", a gold #f2b632 warning triangle, generic non-branded UI, soft studio lighting, rim light, urgent professional mood, high detail
```
```
[P02-B · Payoff] Modern 3D explainer illustration, deep navy #0d1b2a, a business-profile card with all five fixes ticked in mint-green #37c98b, a gold "10 Min" clock #f2b632 and a rising inquiries chart, coral-red accents, soft studio lighting, accomplished mood, generic non-branded, high detail
```

## Paket 03 — Mehr Bewertungen

```
[P03-A · Hook] Modern 3D explainer illustration, deep navy #0d1b2a with warm glow, a large white review card with a row of five gold stars #f2b632 and a "#2" ribbon, a happy stylized customer scanning a gold QR code on a phone, mint-green #37c98b checkmark, coral-red accents, soft studio lighting, friendly professional mood, generic non-branded, high detail
```
```
[P03-B · Payoff] Modern 3D explainer illustration, deep navy #0d1b2a, a gold QR-code stand #f2b632 on a shop counter and a "4 Wochen" calendar arrow leading to a tall growing stack of gold five-star reviews with a mint-green #37c98b up arrow, coral-red accents, soft studio lighting, progress-over-time mood, generic non-branded, high detail
```

## Paket 04 — Klick zu Termin

```
[P04-A · Problem] Modern 3D explainer illustration, deep navy #0d1b2a with glow, a top-ranked white business card with a red location pin, but an interested stylized customer stuck facing a coral-red #e63946 dead-end sign (no booking button), gold #f2b632 accents, soft studio lighting, problem-setup mood, generic non-branded, high detail
```
```
[P04-B · Payoff] Modern 3D explainer illustration, deep navy #0d1b2a, a white profile card with a prominent coral-red #e63946 "Termin buchen" button, a cursor tapping it and the click transforming into a gold calendar appointment #f2b632 with a mint-green #37c98b checkmark, soft studio lighting, rewarding conversion mood, generic non-branded, high detail
```

## Paket 05 — Lokales SEO / Konkurrenz

```
[P05-A · Hook] Modern 3D explainer illustration, deep navy #0d1b2a with glow, a generic non-branded ranking list where a competitor white card sits at number one and "your" card sits lower with a puzzled icon and a coral-red #e63946 question mark, a red location pin, gold #f2b632 accents, soft studio lighting, competitive mood, high detail
```
```
[P05-B · Payoff] Modern 3D explainer illustration, deep navy #0d1b2a with glow, your white business card climbing a podium from third toward first with a mint-green #37c98b upward arrow, powered by two glowing gold #f2b632 levers labelled relevance and prominence, coral-red accents, soft studio lighting, comeback mood, generic non-branded, high detail
```

## Paket 06 — Beiträge & Fotos

```
[P06-A · Hook] Modern 3D explainer illustration, deep navy #0d1b2a with soft glow, a white generic non-branded business-profile card with two glowing gold #f2b632 features (a post megaphone icon and a photo gallery icon) emitting a mint-green #37c98b visibility pulse while other cards stay dark and unused, coral-red accents, soft studio lighting, insider-advantage mood, high detail
```
```
[P06-B · Payoff] Modern 3D explainer illustration, deep navy #0d1b2a, split scene: a dim grey inactive "existiert" card versus the same card glowing with a mint-green #37c98b activity pulse, gold stars #f2b632 and an upward arrow labelled "rankt", a small gold "10 Min" clock, coral-red accents, soft studio lighting, transformation mood, generic non-branded, high detail
```

---

## Budget-Logik

- **12 Signatur-Bilder** = je Video ein Hook-/Problem- und ein Payoff-Bild.
- Passt in 50 Credits mit Puffer (Kosten pro Bild im Studio vor der Serie prüfen).
- Reicht das Budget weiter, als Nächstes: Paket 01 auf seine 27 Szenen ausbauen
  (siehe `paket-01-.../produktion/langvideo-bild-prompts.md`), dann die übrigen.
- Die vollständigen Szenen-Prompts aller Pakete liegen unverändert in den
  jeweiligen `produktion/`-Ordnern und funktionieren auch mit Nano Banana.
