---
name: prompt-library
description: Reusable prompt patterns / templates the user has collected. Apply one as a working guideline when the user invokes it or the situation matches (e.g. "act as expert", consultation, critique). Each prompt is stored verbatim under prompts/ with an application guideline.
---

# Prompt-Bibliothek

Gesammelte, wiederverwendbare Prompt-Muster des Nutzers. Jede Datei unter
`prompts/` enthält **den Prompt wörtlich** plus eine kurze
Anwendungs-Richtlinie für Claude. Neue Prompts werden fortlaufend nummeriert
ergänzt.

## Verwendung

- Löst der Nutzer ein Muster aus (z. B. „act as …", „nimm Prompt 1", oder die
  Situation passt inhaltlich), wende die **Anwendungs-Richtlinie** am Ende der
  jeweiligen Prompt-Datei an — nicht nur den Text vorlesen, sondern danach
  handeln.
- Der Nutzer kann Muster auch kombinieren (z. B. Experten-Rolle + strukturierte
  Rückfragen).
- Beim Speichern eines neuen Prompts: nächste freie Nummer, Prompt **wörtlich**
  übernehmen, darunter eine „Anwendungs-Richtlinie (für Claude)" ergänzen.

## Index

| # | Prompt | Zweck |
|---|--------|-------|
| 01 | [Universal Expert Role ("Act As")](prompts/01-act-as-expert.md) | In eine konkrete Expertenrolle schlüpfen; direkte, ehrliche Beratung mit konkreten nächsten Schritten |
| 02 | [System Prompt Builder](prompts/02-system-prompt-builder.md) | Produktionsreifen Claude-System-Prompt (Persona, Guardrails, Beispiele) für einen Assistenten schreiben |
| 03 | [Product Description Generator](prompts/03-product-description-generator.md) | Verkaufsstarke Produktbeschreibungen in zwei Versionen (Standard/SEO + Story) |
| 04 | [Senior Data Analyst](prompts/04-senior-data-analyst.md) | Daten für Stakeholder aufbereiten: Kennzahlen, Trends, Ausreißer, Visualisierungen, Handlungsempfehlungen |
| 05 | [Prompt Improver](prompts/05-prompt-improver.md) | Einen bestehenden Prompt diagnostizieren und deutlich verbessern (Meta-Prompt) |
| 06 | [Personal Brand Statement Builder](prompts/06-personal-brand-statement.md) | Personal-Branding: Tagline, LinkedIn-Headline, Bios, Elevator-Pitch, About-Sektion |
| 07 | [Expert Panel](prompts/07-expert-panel.md) | 4 gegensätzliche Experten-Perspektiven simulieren und zu einer Empfehlung synthetisieren |
| 08 | [Brainstorming Machine](prompts/08-brainstorming-machine.md) | Ideen in drei Stufen (solide → Twists → Wildcards) generieren, Top 2 empfehlen |
| 09 | [Landing Page Copywriter](prompts/09-landing-page-copywriter.md) | Conversion-Landingpage-Text: Hero, Benefit-Blöcke, Social Proof, FAQ, CTA |
| 10 | [LinkedIn Post Writer](prompts/10-linkedin-post-writer.md) | Engagement-starke LinkedIn-Posts in 3 Hook-Varianten (Frage/Bold/Story) |
| 11 | [Research Synthesizer](prompts/11-research-synthesizer.md) | Mehrere Quellen zusammenführen: Konsens, Widersprüche, Belege, Lücken, Fazit, Konfidenz |
| 12 | [SEO Blog Post Writer](prompts/12-seo-blog-post-writer.md) | SEO-optimierter Blogartikel mit Struktur, FAQ, CTA, Meta-Description |
| 13 | [Competitive Analysis Framework](prompts/13-competitive-analysis-framework.md) | Strukturierte Wettbewerbsanalyse: 6 Dimensionen, 2×2-Karte, Differenzierung, Empfehlungen |
| 14 | [Decision Framework](prompts/14-decision-framework.md) | Entscheidungen strukturieren: Reframe, Pro/Contra, Reversibilität, 10/10/10, klare Empfehlung |

_(weitere Prompts folgen — Nutzer liefert sie nach und nach)_
