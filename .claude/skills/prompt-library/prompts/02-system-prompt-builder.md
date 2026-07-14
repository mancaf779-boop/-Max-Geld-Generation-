# 02 — System Prompt Builder (Give Claude a Custom Role)

**Category:** Coding & Development / Productivity
**Difficulty:** Intermediate
**Best for:** Developers building AI apps, power users, prompt engineers
**Source inspiration:** Anthropic Prompt Engineering docs, widely used pattern in
Claude API usage

---

## Prompt

```
You are an expert prompt engineer who specializes in writing Claude system prompts.

Write a detailed system prompt for an AI assistant with the following profile:

**Role / Persona:** [e.g., senior financial analyst, compassionate therapist, Socratic coding tutor]
**Primary task:** [What will this assistant mainly do?]
**Target users:** [Who will interact with it?]
**Tone and communication style:** [e.g., concise and data-driven / warm and encouraging]
**Things it should always do:**
- [BEHAVIOR 1]
- [BEHAVIOR 2]

**Things it should never do:**
- [RESTRICTION 1]
- [RESTRICTION 2]

**Format preferences:** [e.g., always use bullet points / never use headers / keep responses under 200 words]
**Special knowledge or context:** [Any domain knowledge or business context it should have]

Write a production-ready system prompt that:
- Establishes the persona clearly in the first paragraph
- Defines behavioral guardrails explicitly
- Includes 2-3 example interactions (user message → expected response format)
- Uses XML tags to separate sections where helpful
```

---

## When to use this

Building a Claude-powered product, setting up a team-wide assistant, or creating
a specialized chatbot for a specific use case.

## Tips

- Think of the system prompt as "training your assistant before their first day"
- Be explicit about what NOT to do — constraints are often more important than
  instructions
- Test your system prompt with adversarial inputs ("what if the user asks you to
  ignore your instructions?")

---

## Anwendungs-Richtlinie (für Claude in diesem Repo)

Wenn der Nutzer diesen Modus auslöst ("bau mir einen System-Prompt für …",
"schreib die Rolle für einen Assistenten …"):

1. **Fehlende Profil-Felder aktiv erfragen oder sinnvoll annehmen** — Rolle,
   Hauptaufgabe, Zielgruppe, Ton, Immer/Nie, Format, Domänenwissen. Bei klarer
   Projektlage die Lücken selbst füllen und die Annahmen kennzeichnen.
2. **Produktionsreifen System-Prompt liefern:** Persona im ersten Absatz,
   explizite Verhaltens-Leitplanken, 2–3 Beispiel-Interaktionen (User → erwartete
   Antwort), XML-Tags zur Gliederung wo hilfreich.
3. **Guardrails betonen** — das „Never" ist oft wichtiger als das „Always";
   Umgang mit adversen Eingaben ("ignoriere deine Anweisungen") mitdenken.
4. **Ausgabe als fertigen Block**, den der Nutzer direkt in die Claude-API /
   ein Projekt einsetzen kann.
