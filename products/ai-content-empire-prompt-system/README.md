# Core Prompt System v1 — AI Content Empire

Ein 5-Agenten-Prompt-System für die komplette Content-Pipeline eines
Video-Kanals (YouTube/Shorts/TikTok/Reels): von der Themenrecherche bis zur
Auswertung — und zurück in die nächste Runde.

## Die Kette

```
Research Agent → Script Agent → Thumbnail Agent → SEO Agent → (Upload) → Analytics Agent
      ↑                                                                         │
      └─────────────────────── Erkenntnisse fließen zurück ────────────────────┘
```

Jeder Agent hat eine einzige, klar abgegrenzte Aufgabe und übergibt sein
Ergebnis in einem strukturierten Format (Markdown + JSON-Block) an den
nächsten — dadurch lässt sich die Kette sowohl manuell (Copy-Paste zwischen
Chats) als auch automatisiert (n8n-Workflow, Custom-GPT-Actions, eigenes
Agenten-Backend) betreiben.

## Die 5 Agenten

| # | Agent | Datei | Aufgabe |
|---|-------|-------|---------|
| 1 | 🔎 Research Agent | [01-research-agent.md](01-research-agent.md) | Trends finden, Konkurrenz analysieren, profitable Themen identifizieren, Zielgruppe verstehen |
| 2 | ✍️ Script Agent | [02-script-agent.md](02-script-agent.md) | Sprechfertiges Skript mit hoher Zuschauerbindung (Hook → Problem/Versprechen → Story/Fakten → CTA) |
| 3 | 🖼️ Thumbnail Agent | [03-thumbnail-agent.md](03-thumbnail-agent.md) | Klickstarkes Thumbnail-Konzept + einsatzfertiger Bild-Prompt (FLUX o. ä.) |
| 4 | 📈 SEO Agent | [04-seo-agent.md](04-seo-agent.md) | Titelvarianten, Beschreibung, Tags, Kapitel, Hashtags — priorisiert nach echter Rankingwirkung |
| 5 | 📊 Analytics Agent | [05-analytics-agent.md](05-analytics-agent.md) | CTR, Zuschauerbindung, Kommentare auswerten, Verbesserungen ableiten, Kreislauf schließen |

Jede Datei enthält den fertigen, kopierbaren Master-Prompt (im `<<< … >>>`-
Block) plus einen kurzen Anwendungs-Hinweis.

## Einsatz

- **Custom GPT / Claude Project:** Jeden Master-Prompt als System-Prompt/
  Instructions eines eigenen GPT bzw. Projekts einsetzen — 5 separate
  Assistenten, die die JSON-Übergabeblöcke manuell weiterreichen.
- **n8n (oder vergleichbare Automatisierung):** Jeder Agent wird ein Knoten
  (LLM-Call mit dem jeweiligen Master-Prompt als System-Message); die
  `Übergabe an …`-JSON-Blöcke sind absichtlich strukturiert, damit sie
  zwischen Knoten geparst werden können.
- **Eigenes Agenten-Backend:** Die Prompts sind modell-agnostisch geschrieben
  (kein Tool-Call-Format vorausgesetzt) und funktionieren mit jedem
  hinreichend fähigen LLM.

## Design-Prinzipien dieses Systems

1. **Ein Agent, eine Aufgabe.** Kein Agent versucht, mehrere Rollen gleichzeitig
   zu übernehmen — das hält die Prompts fokussiert und die Ausgabequalität
   hoch.
2. **Keine erfundenen Zahlen.** Jeder Agent, der mit Kennzahlen arbeitet
   (Research, SEO, Analytics), ist explizit angewiesen, fehlende Daten als
   Lücke auszuweisen statt sie zu simulieren. Das ist Absicht: ein
   Content-System, das sich Erfolge einredet, ist wertlos.
3. **Strukturierte Übergabe.** Jeder Agent endet mit einem JSON-Block für den
   nächsten Schritt — kein "lies den Fließtext und rate, was gemeint war".
4. **Kreislauf statt Einbahnstraße.** Der Analytics Agent liefert nicht nur
   einen Bericht, sondern schickt konkrete Erkenntnisse zurück an Research
   und Script — das System lernt aus jedem veröffentlichten Video.

## Über dieses Produkt

- **Version:** v1 (Core Prompt System)
- **Format:** 5 Markdown-Dateien mit kopierfertigen Prompts, plattform-/
  modell-agnostisch
- **Zielgruppe:** Content-Creator, kleine Redaktionsteams, Agenturen, die
  eine YouTube-/Social-Media-Pipeline systematisieren wollen, statt bei jedem
  Video neu zu improvisieren
- **Nicht enthalten (bewusst):** Anbindung an konkrete Recherche-/SEO-/
  Analytics-Tools (vidIQ, TubeBuddy, YouTube-Analytics-API o. Ä.) — die
  Prompts sind Tool-agnostisch geschrieben und funktionieren mit oder ohne
  angebundene Live-Daten (siehe Regel 1 in jedem Agenten)

Verpackung/Preis/Vertriebskanal (Gumroad, Notion-Template, PDF-Bundle etc.)
ist bewusst nicht Teil dieser Dateien — das ist eine Entscheidung, die ihr
trefft, nicht etwas, das sich aus dem Prompt-Inhalt ableiten lässt.
