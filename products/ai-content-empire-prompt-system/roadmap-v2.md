# Roadmap v2 — Core Prompt System

Arbeitsdokument, kein Versprechen an Käufer. Nichts hier ist Teil des
v1-Lieferumfangs (siehe `gumroad-listing.md`) — erst wenn etwas gebaut und
verifiziert ist, wandert es in eine neue, separat erhältliche Version.

## Woher die Kandidaten kommen

Drei Quellen, keine geratenen Features:

1. Lücken aus dem Reader-Test von v1 (siehe Commit-Historie
   `gumroad-listing.md`): fehlende Beispiel-Outputs, manuelle
   Copy-Paste-Reibung, keine Team-Lizenz.
2. Bewusst aufgeschobene Entscheidungen aus dem v1-Build (z. B. Tool-
   Integration explizit ausgeschlossen, um v1 einfach und
   modell-agnostisch zu halten).
3. Strukturelle Lücke im System selbst: es gibt aktuell keinen Agenten, der
   die Ausgabe der anderen vor Veröffentlichung gegenprüft — der Käufer
   muss das laut v1-FAQ selbst tun.

## Wahrscheinlich als Nächstes

**Beispiel-Output-Bibliothek**
Ein Satz vollständig durchgespielter Agenten-Läufe (Research → Analytics)
für 2–3 Nischen, als Referenz beigelegt. Adressiert direkt die im
Reader-Test gefundene Lücke: Käufer sehen echte Qualität, statt dem
Verkaufstext zu vertrauen.

**Fertiges n8n-Workflow-Template (Import statt Nacherfinden)**
v1 liefert nur eine Anleitung, wie man die Kette in n8n *nachbaut*. v2
liefert eine fertige, importierbare Workflow-Datei (5 Knoten + Loop
vorverdrahtet), die nur noch mit API-Keys bestückt werden muss.

**6. Agent: Redaktions-Check**
Ein Agent, der Skript, Thumbnail-Konzept und SEO-Metadaten gegeneinander
prüft, bevor der Upload erfolgt (Konsistenz-Check: passt das Versprechen
im Hook zum Thumbnail? Trifft der Titel das SEO-Hauptkeyword?). Schließt
die Lücke, dass v1 explizit sagt "du musst selbst redigieren" — v2 gibt
dafür ein Werkzeug an die Hand, ersetzt die eigene Prüfung aber nicht.

## Denkbar später

- **Nischenspezifische Varianten** (vorausgefüllte Beispiel-Sets für z. B.
  Finanzen, lokale Dienstleister, Gaming) — im v1-Listing bereits als
  "geplant" angekündigt, siehe Preis & Lieferumfang.
- **Team-/Agentur-Lizenz** als eigene, höherpreisige Variante — v1 ist
  bewusst Einzel-Lizenz (siehe FAQ); eine formale Mehrfach-Nutzer-Lizenz
  ist ein separates Produkt, kein Upgrade-Preis-Trick.
- **Englische Version** des gesamten Systems — deutlich größerer
  Zielmarkt, aber eigene Übersetzungs- und Qualitätsarbeit, kein simples
  Durchschieben durch einen Übersetzer-Prompt.
- **Tool-Integrationen** (vidIQ-/YouTube-Analytics-API direkt anbinden,
  statt nur "funktioniert mit oder ohne") — nur sinnvoll, wenn genug
  Käufer das anfragen; sonst bleibt es bewusst tool-agnostisch.

## Geprüft, aber (noch) nicht

- **Video-/Audio-Produktion mit ins Paket** (TTS, Schnitt) — würde das
  Produkt vom "Prompt-System" zum "Software-Tool" verschieben, andere
  Zielgruppe, anderer Preis, anderes Supportmodell. Bewusst nicht
  angefasst, solange v1 nicht zeigt, dass dafür Nachfrage besteht.
- **Vollautomatisierter Analytics-Import** ohne manuelles Eintragen — setzt
  YouTube-API-Zugriff beim Käufer voraus, den nicht jeder hat; würde die
  Basisnutzung (Copy-Paste, keine Programmierkenntnisse) unnötig
  verkomplizieren.

## Bevor v2 startet

- v1 muss erst echtes Käufer-Feedback gesammelt haben — diese Roadmap ist
  eine Hypothese, keine Spezifikation. Priorität wird nach dem angepasst,
  was Käufer tatsächlich fragen/vermissen, nicht nach dieser Liste allein.
