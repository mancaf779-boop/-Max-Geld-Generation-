# 05 — Prompt Improver (Make Any Prompt Better)

**Category:** Productivity & Analysis
**Difficulty:** Intermediate
**Best for:** Anyone who uses AI regularly and wants better outputs
**Source inspiration:** Anthropic's official Prompt Improver tool; widely used
meta-prompting pattern

---

## Prompt

```
You are an expert prompt engineer who specializes in getting the best outputs from large language models, especially Claude.

Improve the following prompt:

**Original prompt:**
[PASTE YOUR CURRENT PROMPT HERE]

**What it's supposed to do:** [INTENDED OUTPUT / GOAL]
**What's wrong with current outputs:** [WHAT IS CLAUDE GETTING WRONG OR MISSING?]
**Model being used:** [e.g., Claude Sonnet / Claude Opus]
**Is this a one-off or a reusable template?** [One-off / Template with variables]

Analyze and improve the prompt by:
1. **Diagnosing the issue** — Why is the original prompt getting suboptimal results?
2. **Rewriting the prompt** — Provide a significantly improved version
3. **Changes explained** — For each major change, explain why it should work better
4. **Variables added** — If this should be a template, add [VARIABLE] placeholders for dynamic content
5. **Test cases** — Provide 2 example inputs I should test the new prompt with to verify it works

Apply these principles in your rewrite:
- Be specific about the role / persona for the model
- Make success criteria explicit
- Add format requirements
- Break complex tasks into numbered steps
- Use XML tags to separate input sections
- Add constraints that prevent common failure modes
```

---

## When to use this

When you're getting frustrating or inconsistent outputs from AI. One round of
prompt improvement often dramatically changes results.

## Tips

- This is a meta-prompt — use it on your most important, frequently used prompts
- Paste example bad outputs alongside the prompt for better diagnosis

---

## Anwendungs-Richtlinie (für Claude in diesem Repo)

Wenn der Nutzer einen Prompt zum Verbessern liefert ("mach diesen Prompt
besser", "warum liefert das schlechte Ergebnisse"):

1. **Diagnose zuerst** — konkret benennen, warum der Original-Prompt suboptimale
   Ergebnisse bringt (fehlende Rolle, unklare Erfolgskriterien, kein Format,
   zu viel auf einmal, fehlende Guardrails).
2. **Neue Version liefern** — deutlich verbessert, nicht nur kosmetisch.
3. **Änderungen erklären** — pro wesentlicher Änderung kurz das Warum.
4. **Variablen** ergänzen, falls es eine wiederverwendbare Vorlage werden soll.
5. **2 Testfälle** angeben, mit denen der Nutzer die neue Version prüft.
6. Prinzipien anwenden: klare Rolle, explizite Erfolgskriterien, Format-
   Vorgaben, nummerierte Schritte, XML-Tags für Eingabe-Abschnitte,
   Fehlermodus-Guardrails. Ehrlich bleiben: keine Scheinverbesserung, echte
   Ursache adressieren.
