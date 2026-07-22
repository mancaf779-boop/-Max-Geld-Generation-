# Gumroad-Listing — Core Prompt System v1 (AI Content Empire)

> Arbeitsdokument für den Gumroad-Produkttext. Struktur: Hook/Titel → Problem
> → Lösung/Was du bekommst → Für wen es ist/nicht ist → Preis & Lieferumfang
> → FAQ.

## Hook/Titel

[To be written]

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

Das Core Prompt System v1 ist kein Sammelsurium loser Prompts, sondern ein
komplettes 5-Agenten-System für deine Video-Pipeline — von der ersten Idee
bis zur Auswertung nach dem Upload.

**5 fertige Master-Prompts, sofort einsatzbereit:**

- 🔎 Research Agent — findet und belegt profitable Videoideen
- ✍️ Script Agent — schreibt sprechfertige Skripte mit bewährter
  Retention-Struktur (Hook → Problem/Versprechen → Story/Fakten → CTA)
- 🖼️ Thumbnail Agent — liefert Konzept + einsatzfertigen Bild-Prompt
- 📈 SEO Agent — Titel, Beschreibung, Tags, Kapitel, Hashtags, priorisiert
  nach echter Rankingwirkung
- 📊 Analytics Agent — wertet CTR, Retention, Kommentare aus und leitet
  konkrete Verbesserungen ab

Jeder Prompt übergibt sein Ergebnis strukturiert (JSON) an den nächsten
Agenten — die Kette funktioniert manuell per Copy-Paste zwischen Chats genauso
wie automatisiert in n8n oder einem eigenen Agenten-Backend.

Und der Kreislauf schließt sich: Der Analytics Agent gibt seine Erkenntnisse
zurück an Research und Script — dein System lernt aus jedem Video, das du
veröffentlichst, statt bei jedem neuen Video wieder bei Null anzufangen.

Läuft mit oder ohne angebundene Recherche-/SEO-Tools, ist modell-agnostisch
(Custom GPT, Claude Projects, n8n, eigenes Backend) und funktioniert für
YouTube long-form, Shorts, TikTok und Reels gleichermaßen.

## Für wen es ist / nicht ist

**Ist für dich, wenn:**

- du YouTube/Social Media neben- oder hauptberuflich bespielst und endlich
  Routine in deine Pipeline bringen willst (auch als kleines Redaktionsteam)
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

- 5 Master-Prompts als PDF-Guide (Research, Script, Thumbnail, SEO,
  Analytics), jeweils copy-paste-fertig
- 1 PDF-Kurzanleitung: wie du die Kette in Custom GPT, Claude Projects oder
  n8n einrichtest
- Zugriff auf künftige Korrekturen/Feinschliff dieser Version (v1)

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
