# Kurzanleitung — Core Prompt System v1 einrichten

Diese Anleitung zeigt drei Wege, die 5 Master-Prompts (Research, Script,
Thumbnail, SEO, Analytics) einzusetzen — vom einfachsten (Copy-Paste) bis zum
automatisierten Workflow.

## Weg 1: Manuell per Copy-Paste (kein Setup nötig)

Der einfachste Einstieg — funktioniert mit jedem Chat-Tool (ChatGPT, Claude,
etc.), ohne Konfiguration:

1. Öffne einen neuen Chat.
2. Kopiere den Master-Prompt eines Agenten (den Block zwischen `<<<` und
   `>>>` aus der jeweiligen Datei) als erste Nachricht.
3. Fülle die `<eingabe>`-Felder aus (z. B. Nische, Zielgruppe, Plattform beim
   Research Agent).
4. Der Agent liefert am Ende seiner Antwort einen JSON-Block unter
   "Übergabe an …-Agent".
5. Öffne einen neuen Chat für den nächsten Agenten, kopiere dessen
   Master-Prompt hinein, und füge den JSON-Block aus Schritt 4 als
   zusätzlichen Kontext bei.
6. Wiederhole das für alle 5 Agenten in der Kette: Research → Script →
   Thumbnail → SEO → (Upload) → Analytics.

Der Analytics Agent liefert am Ende wieder einen JSON-Block, den du in einem
neuen Research- oder Script-Chat als Ausgangspunkt für das nächste Video
nutzt — der Kreislauf schließt sich.

## Weg 2: Ein eigener Custom GPT / Claude Project pro Agent

Für regelmäßigen Einsatz lohnt sich ein dediziertes Setup, damit du nicht
jedes Mal den Master-Prompt neu einfügen musst:

1. Lege 5 Custom GPTs (ChatGPT) oder 5 Claude Projects an — je einen pro
   Agent.
2. Trage den jeweiligen Master-Prompt als System-Prompt/Instructions ein.
3. Benenne sie klar (z. B. "Content-Scout — Research Agent"), damit du in
   der Kette nicht durcheinanderkommst.
4. Der Workflow bleibt wie in Weg 1: Ausgabe eines Agenten (JSON-Block) als
   Eingabe für den nächsten kopieren.

Vorteil: Du musst die Master-Prompts nur einmal einrichten, danach reicht
Copy-Paste der JSON-Übergabe zwischen den 5 GPTs/Projects.

## Weg 3: Automatisiert in n8n

Für eine vollautomatische Kette (z. B. wöchentlich getriggert):

1. Lege pro Agent einen eigenen Workflow-Knoten an (HTTP Request an die
   OpenAI-/Anthropic-API oder den jeweiligen "AI Agent"/"LLM Chain"-Node,
   je nach n8n-Version).
2. Trage den Master-Prompt als System-Message des Knotens ein.
3. Die `<eingabe>`-Felder werden zu Workflow-Variablen (z. B. aus einem
   vorherigen Node, einer Google-Sheet-Zeile oder einem Formular-Trigger).
4. Verbinde die Knoten in der Reihenfolge Research → Script → Thumbnail →
   SEO → Analytics. Der JSON-"Übergabe an …"-Block jedes Agenten ist so
   strukturiert, dass er sich per n8n-Expression (`{{ $json.feldname }}`)
   direkt in den nächsten Knoten einspeisen lässt.
5. Für den Analytics Agent brauchst du echte Performance-Daten — entweder
   manuell eingetragen oder per YouTube-Analytics-API-Node automatisiert
   abgerufen.
6. Verbinde den Analytics-Knoten zurück auf den Research- oder
   Script-Knoten, um den Kreislauf zu schließen.

Der genaue Node-Aufbau hängt von deiner n8n-Version und den verfügbaren
LLM-Integrationen ab — die Prompts selbst sind absichtlich modell- und
tool-agnostisch geschrieben, damit sie in jedem Setup funktionieren.

## Wichtig für alle drei Wege

- Jeder Agent ist so angewiesen, fehlende Daten offen als Lücke zu
  benennen statt sie zu erfinden — je vollständiger deine Eingabe, desto
  besser das Ergebnis.
- Die Ausgabe jedes Agenten ist ein Entwurf, kein fertiges Endprodukt: vor
  Veröffentlichung immer selbst gegenlesen, redigieren und mit eigenem
  Wissen ergänzen.
