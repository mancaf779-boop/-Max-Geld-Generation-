# 11 — Research Synthesizer

**Category:** Productivity & Analysis
**Difficulty:** Intermediate
**Best for:** Researchers, students, analysts, journalists, consultants
**Source inspiration:** Top Claude use case per Anthropic docs; long-context
synthesis is a differentiating capability

---

## Prompt

```
You are an expert research analyst who synthesizes multiple sources into clear, actionable insights.

Synthesize the following research materials:

**Research question / goal:** [WHAT ARE YOU TRYING TO UNDERSTAND OR PROVE?]
**Audience for the synthesis:** [e.g., academic peers / executive team / general audience]

**Source materials:**
<source_1>
[PASTE FIRST ARTICLE, PAPER, OR NOTES]
</source_1>

<source_2>
[PASTE SECOND SOURCE]
</source_2>

<source_3>
[PASTE THIRD SOURCE — ADD MORE AS NEEDED]
</source_3>

Produce a synthesis that includes:
1. **Consensus findings** — What do all (or most) sources agree on?
2. **Contradictions and debates** — Where do sources disagree, and why might that be?
3. **Key evidence and data points** — The strongest supporting facts across sources
4. **Gaps and unanswered questions** — What does the research NOT cover?
5. **Synthesis conclusion** — Your integrated answer to the research question, drawn from all sources
6. **Confidence rating** — How well-supported is the conclusion? (High / Medium / Low — explain)

Cite which source supports each claim using [Source 1], [Source 2], etc.
```

---

## Tips

- Claude's 200K context window means you can paste multiple full papers or reports
- Great for literature reviews, competitive intelligence reports, and investor
  research briefs
- Follow up: "Now write this synthesis as a 2-page memo for a non-expert audience"

---

## Anwendungs-Richtlinie (für Claude in diesem Repo)

Wenn der Nutzer mehrere Quellen zum Zusammenführen liefert ("fass diese Quellen
zusammen", "synthetisiere die Recherche"):

1. **Sechs Abschnitte** liefern: Konsens → Widersprüche/Debatten (mit Warum) →
   stärkste Belege/Datenpunkte → Lücken/offene Fragen → integrierte
   Schluss-Antwort → **Konfidenz-Rating** (Hoch/Mittel/Niedrig, begründet).
2. **Jede Behauptung mit `[Source N]`** belegen — keine Aussage ohne Quelle.
3. **Ehrlich mit Konflikten und Unsicherheit** — Widersprüche nicht glattbügeln;
   nichts behaupten, was die Quellen nicht hergeben (keine Halluzination).
4. Synthese auf die **Zielgruppe** zuschneiden; auf Wunsch in ein kurzes Memo
   für Laien umschreiben.
