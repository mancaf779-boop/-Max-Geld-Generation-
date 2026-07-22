# Gumroad-Listing — Core Prompt System v1 (AI Content Empire)

> Arbeitsdokument für den Gumroad-Produkttext. Struktur: Hook/Titel → Problem
> → Lösung/Was du bekommst → Für wen es ist/nicht ist → Preis & Lieferumfang
> → FAQ.

## Hook/Titel

# Ein System, keine losen Prompts

5 fertige KI-Agenten für deine komplette Video-Pipeline — von der ersten
Idee bis zur Auswertung nach dem Upload.

## Problem

Du hast KI längst im Workflow — trotzdem fängt jedes Video wieder bei Null an.
Recherche, Skript, Thumbnail, SEO: jedes Mal neue, improvisierte Prompts, die
nie ganz sitzen. Die Ergebnisse aus den einzelnen Schritten passen selten
zusammen — das Skript verspricht etwas anderes, als das Thumbnail zeigt; der
Titel trifft nicht das Keyword aus der Beschreibung.

Das kostet Zeit an der falschen Stelle: Du bastelst an Prompts, statt am
Video zu arbeiten. Und nach dem Upload verpufft, was du eigentlich hättest
lernen können — ohne systematische Auswertung wiederholt das nächste Video
dieselben Fehler.

Als Solo-Creator hast du keine Redaktion, die das auffängt. Jeder Schritt
hängt an dir allein — und ohne System ist Konsistenz meist das Erste, was
bei Zeitdruck kippt.

## Lösung / Was du bekommst

Das Core Prompt System v1 ist ein Prompt-System, kein Plug-and-play-Tool:
fünf aufeinander abgestimmte Master-Prompts für deine komplette
Video-Pipeline — von der ersten Idee bis zur Auswertung nach dem Upload. Du
führst die Kette selbst: standardmäßig per Copy-Paste zwischen den Agenten,
bei Bedarf automatisiert in n8n.

**5 fertige Master-Prompts, sofort einsatzbereit:**

- 🔎 Research Agent — findet und belegt profitable Videoideen
- ✍️ Script Agent — schreibt sprechfertige Skripte mit bewährter
  Retention-Struktur (Hook → Problem/Versprechen → Story/Fakten → CTA)
- 🖼️ Thumbnail Agent — liefert Konzept + einsatzfertigen Bild-Prompt
- 📈 SEO Agent — Titel, Beschreibung, Tags, Kapitel, Hashtags, priorisiert
  nach echter Rankingwirkung
- 📊 Analytics Agent — wertet CTR, Retention, Kommentare aus und leitet
  konkrete Verbesserungen ab

Jeder Prompt übergibt sein Ergebnis strukturiert weiter — kein Fließtext zum
Interpretieren, sondern ein JSON-Block, den du 1:1 in den nächsten Agenten
einfügst. So sieht die Übergabe vom Research an den Script Agent aus:

```json
{
  "titel_idee": "5 Steuerfehler, die dich 2026 bares Geld kosten",
  "zielgruppe": "Berufseinsteiger, erste Steuererklärung",
  "kernproblem": "Angst, beim Finanzamt etwas falsch zu machen",
  "versprechen": "5 konkrete Fehler + wie du sie vermeidest",
  "keywords": ["steuererklärung berufseinsteiger", "steuerfehler vermeiden"],
  "wettbewerbs_learning": "Große Finanz-Kanäle bleiben abstrakt, konkrete Fehlerliste ist die Lücke",
  "typ": "evergreen"
}
```

Genau dieser Block landet als Eingabe im Script Agent — die Ergebnisse
bleiben aufeinander abgestimmt, egal ob du manuell weiterreichst oder in
n8n verkettest.

Und der Kreislauf schließt sich: Der Analytics Agent gibt seine Erkenntnisse
zurück an Research und Script — dein System lernt aus jedem Video, das du
veröffentlichst, statt bei jedem neuen Video wieder bei Null anzufangen.

Läuft mit oder ohne angebundene Recherche-/SEO-Tools, ist modell-agnostisch
(Custom GPT, Claude Projects, n8n, eigenes Backend) und funktioniert für
YouTube long-form, Shorts, TikTok und Reels gleichermaßen.

## Für wen es ist / nicht ist

**Ist für dich, wenn:**

- du YouTube/Social Media neben- oder hauptberuflich bespielst und endlich
  Routine in deine Pipeline bringen willst
- du schon mit ChatGPT/Claude arbeitest, aber ohne System — und die Zeit, die
  du in KI steckst, planbar nutzen willst statt jedes Mal neu zu improvisieren
- du bereit bist, die Ergebnisse selbst zu redigieren und mit eigenem Wissen
  und eigener Stimme zu füllen

**Ist nicht für dich, wenn:**

- du eine 100 % automatisierte "Content-Farm ohne Handanlegen" suchst — die
  Prompts brauchen jemanden, der die Ergebnisse kuratiert
- du eine fertige Tool-Integration (vidIQ, TubeBuddy, YouTube-API) im
  Lieferumfang erwartest — das hier ist Prompt-Text, keine Software

## Preis & Lieferumfang

**19 € — einmalig, sofort als Download**

Enthalten:

- 5 einzelne PDF-Guides — ein Guide pro Agent (Research, Script, Thumbnail,
  SEO, Analytics), jeweils copy-paste-fertig
- 1 PDF-Kurzanleitung: wie du die Kette in Custom GPT, Claude Projects oder
  n8n einrichtest
- Zugriff auf künftige Korrekturen/Feinschliff dieser Version (v1)

Lizenz: für den persönlichen Gebrauch (ein Nutzer, ein Kanal). Für mehrere
Personen oder Kanäle bitte mehrfach erwerben.

Sofort nach Kauf als Download verfügbar. Mit dem Kauf bestätigst du den
Verzicht auf dein 14-tägiges Widerrufsrecht, da der Zugriff auf die
digitalen Inhalte sofort beginnt.

Launch-Preis für v1. Erweiterungen (z. B. nischenspezifische Varianten,
tiefere Tool-Integration) sind für spätere Versionen geplant und dann
separat erhältlich.

## FAQ

**Brauche ich ChatGPT Plus oder ein anderes bezahltes Abo?**
Nein. Die Prompts sind modell-agnostisch und funktionieren mit jedem
ausreichend fähigen LLM (ChatGPT, Claude, etc.). Ein leistungsfähigeres
Modell liefert tendenziell bessere Ergebnisse, ein Pflicht-Abo ist aber
nicht Teil des Systems.

**Funktioniert das nur für YouTube?**
Nein, die Prompts sind plattformoffen geschrieben — YouTube long-form,
Shorts, TikTok, Reels.

**Brauche ich n8n oder Programmierkenntnisse?**
Nein. Die Basisnutzung ist Copy-Paste zwischen Chats. n8n oder ein anderes
Automatisierungstool ist optional, falls du die Kette später automatisieren
willst.

**Sind vidIQ, TubeBuddy oder die YouTube-API im Lieferumfang enthalten?**
Nein. Das System ist Prompt-Text und funktioniert eigenständig; angebundene
Recherche-/SEO-Tools verbessern die Datenqualität, sind aber keine
Voraussetzung.

**Ist das auch für einen Kanal geeignet, der gerade erst startet?**
Ja, mit einer Einschränkung: das System liefert die Struktur für Recherche
bis Auswertung — die Nischen-/Positionierungsentscheidung musst du selbst
treffen, bevor der Research Agent sinnvoll arbeiten kann.

**Bekomme ich Updates?**
Korrekturen und Feinschliff an v1: ja. Größere Erweiterungen erscheinen als
eigene, separat erhältliche Version.

**In welcher Sprache sind die Prompts?**
Deutsch, mit Ausnahme des Bild-Prompts im Thumbnail Agent (bewusst
Englisch, weil Bildmodelle darauf zuverlässiger reagieren).

**Kann ich das im Team nutzen?**
Der Kauf ist eine Einzel-Lizenz (ein Nutzer, ein Kanal). Für mehrere
Personen oder Kanäle im selben Team bitte entsprechend mehrfach erwerben.

**Kann ich den Kauf widerrufen, wenn es mir nicht gefällt?**
Nein. Da der Zugriff auf die digitalen Inhalte sofort nach Kauf beginnt,
bestätigst du beim Kauf den Verzicht auf dein gesetzliches
14-tägiges Widerrufsrecht.
