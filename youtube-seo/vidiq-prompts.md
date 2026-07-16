# vidIQ-Prompts — Sammlung (für Subagenten-Ausführung)

Gesammelte Research-Prompts des Nutzers für den **vidIQ-Konnektor**. Erst
**alle sammeln**, dann später an Subagenten verteilen (ein Subagent pro Prompt,
Supervisor prüft & committet). Nische: lokale Sichtbarkeit & Termine für kleine
Vor-Ort-Betriebe; deutscher Markt (Region **DE**); Kanal @francescomanca5183.

> **⚠️ Credit-Hinweis:** vidIQ-Tools kosten i. d. R. **5 Credits/Aufruf**.
> Aktueller Stand: **4 Credits** (erneuerbar 0/150, Reset 03.08.2026). Bis
> aufgeladen/erneuert wird, schlagen die Ausführungen fehl (ohne Kosten).
> Deshalb: **jetzt nur speichern**, Ausführung sobald Credits da sind.

Status-Legende: 🟡 gespeichert · 🔵 an Subagent zugewiesen · ✅ ausgeführt

---

## Zuweisung & Ausführungs-Reihenfolge (Stand: zugewiesen 🔵)

**Modell:** 1 Subagent pro Prompt, Supervisor prüft & committet. **Auslöser für
die Ausführung:** vidIQ-Konnektor **verbunden** UND genug **Credits** (jedes Tool
5 Credits; aktuell 4 → noch gesperrt, Reset 03.08.2026 oder Aufladung).

**Batch A — sofort ausführbar, sobald Credits da** (braucht KEINE eigenen Uploads):
- **01** schnellst wachsende Kanäle · **02** Instagram-Creator · **06** Low-Comp-
  Keywords · **08** Trending-Themen-Lücken · **09** Thema noch im Trend? · **03**
  (nur Konkurrenz-Benchmark-Teil)
- Reihenfolge nach Wert: **06 → 08 → 01 → 02 → 09 → 03**. Credits sind knapp →
  in dieser Reihenfolge abarbeiten, bis das Guthaben leer ist.

**Batch B — erst nach den ersten Uploads** (braucht veröffentlichte Videos/Historie):
- **04** letzte 5 Videos · **05** eigene CTR · **07** rankende Keywords · **10**
  90-Tage-Report · **03** (eigener-Kanal-Teil)

**Was ich beim Auslöser automatisch tue:** Batch A der Reihe nach an Subagenten
geben (credit-schonend, einer nach dem anderen), Ergebnisse als je eigene Datei
unter `youtube-seo/vidiq-ergebnisse/` ablegen, prüfen, committen. Batch B parken,
bis Videos live sind.

---

## 01 — Schnellst wachsende Kanäle in der Nische 🟡

**Prompt:** „Who are the fastest-growing channels in my niche this month?"

- **Passende vidIQ-Tools:** `vidiq_breakout_channels` (Durchbruch-/Schnellwachser),
  ergänzend `vidiq_channel_search` und `vidiq_similar_channels`.
- **Parameter-Idee:** Region `DE`; Nischen-Seeds: „lokales seo", „google
  unternehmensprofil", „lokales marketing", „mehr kunden".
- **Ziel-Output:** Liste der Kanäle + Wachstum, was sie richtig machen
  (Formate/Titel/Thumbnails), 2–3 Learnings für uns.

## 02 — Instagram-Creator zum Lernen + was funktioniert 🟡

**Prompt:** „Show me Instagram creators in my niche worth learning from, and what is working for them."

- **Passende vidIQ-Tools:** `vidiq_instagram_tiktok_outlier_search` +
  `vidiq_ig_accounts_from_outliers` (Creator finden), dann `vidiq_ig_profile` /
  `vidiq_ig_profile_reels` / `vidiq_ig_reel_watch` (was performt).
- **Parameter-Idee:** Nische: lokales Marketing / Google-Sichtbarkeit für kleine
  Betriebe; Region `DE`.
- **Ziel-Output:** 3–5 relevante Creator + konkret, welche Reel-Formate/Hooks
  bei ihnen ziehen, und was davon auf unsere Nische übertragbar ist.

## 03 — Kanal-Wachstum vs. Top-3-Konkurrenten 🟡

**Prompt:** „Compare my channel growth against my top 3 competitors."

- **Passende vidIQ-Tools:** `vidiq_user_channels` (eigener Kanal),
  `vidiq_list_competitors` / `vidiq_similar_channels` (Top-3 finden), dann
  `vidiq_channel_stats` + `vidiq_channel_performance_trends` +
  `vidiq_channel_analytics` je Kanal für den Vergleich.
- **Parameter-Idee:** eigener Kanal @francescomanca5183; Konkurrenten aus
  Nische (lokales SEO / Google-Unternehmensprofil, Region `DE`).
- **Ziel-Output:** Wachstums-Vergleich (Abos, Aufrufe, Frequenz), wo wir
  hinterher sind, 2–3 konkrete Aufhol-Hebel.
- **Ehrlich-Hinweis:** Unser Kanal ist noch am Anfang (kaum/keine
  veröffentlichten Videos) → auf unserer Seite nahe null; der Wert liegt v. a.
  im Benchmark, was die Konkurrenz macht.

## 04 — Warum die letzten 5 Videos underperformt haben 🟡

**Prompt:** „Why did my last 5 videos underperform? Show me the data."

- **Passende vidIQ-Tools:** `vidiq_user_channels` → `vidiq_channel_videos`
  (letzte 5) → `vidiq_video_stats` je Video; ergänzend
  `vidiq_channel_performance_trends` und `vidiq_video_comments` (Signale).
- **Ziel-Output:** je Video Kennzahlen (Impressionen, CTR, Watch-Time,
  Verweildauer), Muster der Schwäche (Titel/Thumbnail vs. Inhalt vs. Retention),
  konkrete Fixes.
- **Ehrlich-Hinweis:** Greift **erst, wenn Videos veröffentlicht** sind — aktuell
  liegen noch keine Upload-Daten vor. Also ein „später"-Prompt (nach den ersten
  Uploads) — dann aber sehr wertvoll für Titel-/Thumbnail-Korrekturen.

## 05 — Eigene CTR vs. Nischen-Benchmark 🟡

**Prompt:** „What's my average CTR vs. my niche benchmark?"

- **Passende vidIQ-Tools:** `vidiq_channel_analytics` / `vidiq_video_stats`
  (eigene CTR), gegen Nischen-Vergleich aus `vidiq_outliers` /
  `vidiq_trending_videos` / `vidiq_channel_performance_trends` der Konkurrenz.
- **Ziel-Output:** eigene Ø-CTR vs. Nischen-Richtwert, Einordnung (drüber/drunter),
  Thumbnail-/Titel-Hebel zum Verbessern.
- **Ehrlich-Hinweis:** Eigene CTR braucht **veröffentlichte Videos**; bis dahin
  liefert das Tool nur den Nischen-Benchmark (der allein schon nützlich ist, um
  ein Ziel für unsere Thumbnails zu setzen).

## 06 — Low-Competition-Keywords für ein Anfänger-Video 🟡 (Vorlage)

**Prompt:** „Find low-competition keywords for a beginner [topic] video."

- **Passende vidIQ-Tools:** `vidiq_keyword_research` (mode `research`, `country DE`;
  oder `country_search`), nach niedriger Competition + brauchbarem Volumen filtern.
- **`[topic]` einsetzen** — Standard-Themen aus unseren Paketen:
  „Google-Unternehmensprofil", „Google-Bewertungen", „lokales SEO",
  „Termine über Google", „Google-Beiträge", „lokal gefunden werden".
- **Ziel-Output:** je Thema 5–10 Keywords mit niedriger Konkurrenz + gutem
  Volumen, als Titel-/Tag-Bausteine.
- **Hinweis:** Braucht **keine** veröffentlichten Videos → sofort nutzbar,
  sobald Credits da sind. Einer der wertvollsten Prompts für Step 10 (Metadaten).

## 07 — Rankende, aber nicht voll optimierte Keywords 🟡

**Prompt:** „What keywords am I ranking for that I haven't fully optimized?"

- **Passende vidIQ-Tools:** `vidiq_user_channels` → `vidiq_channel_videos` /
  `vidiq_video_stats` (wofür Videos ranken), abgeglichen mit
  `vidiq_keyword_research` (Volumen/Competition) → Lücken, wo wir ranken, aber
  Titel/Tags/Beschreibung das Keyword nicht voll ausschöpfen.
- **Ziel-Output:** Liste „Keyword rankt bereits, aber untergenutzt" + konkrete
  Optimierungen (Titel-/Tag-/Beschreibungs-Anpassung).
- **Ehrlich-Hinweis:** Braucht **veröffentlichte Videos mit Ranking-Historie** →
  „später"-Prompt (nach ersten Uploads, wenn erste Rankings entstehen).

## 08 — Trending-Themen in der Nische, die wir noch nicht haben 🟡

**Prompt:** „What topics are trending in my niche that I haven't covered yet?"

- **Passende vidIQ-Tools:** `vidiq_trending_videos` / `vidiq_trend_categories` /
  `vidiq_outliers` (Region `DE`, Nischen-Seeds) + `vidiq_keyword_research`,
  abgeglichen gegen unsere 6 vorhandenen Themen (Content-Plan) → Lücken.
- **Ziel-Output:** trendende Themen, die wir noch NICHT abdecken, priorisiert
  nach Volumen/Konkurrenz — direkt für den Content-Fahrplan.
- **Hinweis:** Braucht **keine** eigenen Videos → sofort nutzbar (Credits
  vorausgesetzt). Ergänzt `videos/ideen-brainstorm.md` mit echten Trenddaten.

## 09 — Läuft [topic] noch, oder ist der Peak vorbei? 🟡 (Vorlage)

**Prompt:** „Is [topic] still trending, or has the peak passed?"

- **Passende vidIQ-Tools:** `vidiq_keyword_research` (Volumen-/Trend-Signal),
  `vidiq_trending_videos` / `vidiq_trend_categories` (aktuelle Dynamik, Region `DE`).
- **`[topic]` einsetzen** — z. B. „Google-Unternehmensprofil", „lokales SEO",
  „Google-Bewertungen", oder ein aus Prompt 08 gefundenes Trendthema.
- **Ziel-Output:** Einschätzung „noch im Aufwind / Plateau / Peak vorbei" +
  Empfehlung, ob sich ein Video jetzt noch lohnt.
- **Hinweis:** Braucht **keine** eigenen Videos → sofort nutzbar. Ideal als
  Timing-Check vor der Produktion eines neuen Themas.

## 10 — 90-Tage-Kanal-Gesundheitsreport 🟡

**Prompt:** „Give me a 90-day channel health report with key insights."

- **Passende vidIQ-Tools:** `vidiq_user_channels` → `vidiq_channel_analytics` +
  `vidiq_channel_performance_trends` + `vidiq_channel_stats` +
  `vidiq_channel_videos` (Zeitraum 90 Tage).
- **Ziel-Output:** Report über Abos, Aufrufe, Watch-Time, CTR, beste/schwächste
  Videos, Trend, 3–5 Key-Insights + nächste Schritte.
- **Ehrlich-Hinweis:** Braucht **veröffentlichte Videos + ~90 Tage Historie** →
  echter „später"-Prompt; sinnvoll als wiederkehrender Quartals-Check, sobald der
  Kanal läuft.

---

_(weitere Prompts folgen — Nutzer liefert nach; danach Subagenten-Zuweisung)_
