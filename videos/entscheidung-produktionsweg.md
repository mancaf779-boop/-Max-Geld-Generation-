> **Hinweis:** Dieses Dokument wurde mit **Prompt 14 — Decision Framework
> (Pros, Cons & Clarity)** aus der Prompt-Bibliothek
> (`.claude/skills/prompt-library/prompts/14-decision-framework.md`) erstellt.
> Es arbeitet die sechs Schritte des Frameworks ab: eigentliche Entscheidung
> klären → Pro/Contra je Option → blinde Flecken → Reversibilität →
> 10/10/10-Test → klare Empfehlung.

# Entscheidung: Produktionsweg für die Videos

**Zu entscheiden:** Wie werden die Videos des Kanals „Lokale Sichtbarkeit &
Termine" (@francescomanca5183) produziert?

**Optionen:**

- **A — Echte Screencasts:** Bildschirmaufnahme des echten Google-Unternehmens­
  profils, Schritt für Schritt vorgemacht, Conrad-Voiceover darüber.
- **B — KI-bebilderte Videos:** durchgestaltete 3D-Explainer-Szenen
  (Nano-Banana-Prompts / Cloudinary-FLUX-Signatur­bilder) + Voiceover, ohne
  echte Bildschirmaufnahme.
- **C — Hybrid:** Screencast als Rückgrat fürs „Wie mache ich das" + KI-Bilder
  für Hook, B-Roll/Übergänge und die Shorts.

**Was am meisten zählt (aus den Repo-Dateien abgeleitet):**

1. **Nischen-Fit / Ranking & Retention** — der Content-Plan sagt ausdrücklich:
   „Format: **Screencasts** … in dieser Nische das, was zieht."
2. **Marken-Identität** — die Kanal-Identität definiert den Kanal als
   „einfache Schritt-für-Schritt-**Screencasts**", „direkt **am Bildschirm
   gezeigt**", „zum Selbermachen".
3. **Ressourcen** — nur **50 Cloudinary-Credits** (FLUX-Kosten pro Bild noch
   ungetestet), plus knappe Produktionszeit über 6 Pakete + 6 Shorts.
4. **Echtheit & IP-Sauberkeit** — die echte Google-Oberfläche darf nur der
   Screencast zeigen; die KI-Bilder sind bewusst **generisch, ohne Google-Logo
   / -UI** gehalten (siehe Visual-Style-Hinweis „IP-Sicherheit").
5. **Skalierbarkeit** — der Weg muss über alle 6 Pakete tragen, nicht nur eins.

**Timeline:** Alle Assets für Paket 01–06 sind fertig (Skripte, Thumbnails,
Upload-Texte, Bild-Prompts). Es fehlt nur die eigentliche Aufnahme/Montage.
Entscheidung ist jetzt fällig, weil sie den gesamten Aufnahme-Workflow bestimmt.

**Wo der Schmerz sitzt (Unsicherheit):** Lohnt der Aufwand aufwändiger
KI-Bilder, oder bremst er nur das Veröffentlichen aus?

---

## 1 — Die eigentliche Entscheidung klären (Reframe)

Die Frage klingt nach „Welcher Look ist schöner?". Das ist die falsche Frage.

In einer **How-to-Nische** (lokales SEO, Google-Profil) suchen die Zuschauer
eine Antwort auf „**Wo klicke ich, was trage ich ein?**". Der Beweis dafür ist
die **echte Oberfläche**. Ein KI-Bild kann eine Karte „schöner" zeigen, aber es
kann den entscheidenden Handgriff nicht **vormachen** — und darf die echte
Google-UI laut eurem eigenen IP-Hinweis gar nicht nachbauen.

**Reframe:** Nicht „Screencast **oder** KI-Bild?", sondern
> „**Was ist Kern (die Demonstration) und was ist Deko (Aufmerksamkeit/
> Verpackung)?**"

Damit wird klar: Der Screencast ist der **Kern** (unersetzbar in dieser Nische
und für diese Marke). KI-Bilder sind **Deko** — hochwertig, aber austauschbar
und optional. Die echte Entscheidung lautet also: *pure Deko (B) verwerfen und
nur klären, wie viel Deko der Kern (A) verträgt (→ C).*

---

## 2 — Pro / Contra je Option (entlang der Prioritäten)

### Option A — Echte Screencasts

| Kriterium | Bewertung |
|---|---|
| Nischen-Fit / Ranking | **Stark** — genau das Format, das laut Plan zieht |
| Marken-Identität | **Perfekt** — „am Bildschirm gezeigt, zum Selbermachen" |
| Ressourcen (Credits/Zeit) | **Sehr gut** — 0 Credits; nur Aufnahme + Schnitt |
| Echtheit / IP | **Stark** — zeigt die echte UI (Demonstration), sauber |
| Skalierbarkeit | **Gut** — gleicher Ablauf für alle 6 Pakete |

- **Pro:** billigster, schnellster, am stärksten on-niche & on-brand; höchstes
  Vertrauen; keine Credit-Abhängigkeit.
- **Contra:** Hook/Thumbnail-Bewegtbild wirkt evtl. nüchterner; ein reiner
  Screencast-Hook ist visuell weniger „scroll-stoppend" als eine gestaltete
  Szene; **setzt ein echtes oder Demo-Google-Profil zum Aufnehmen voraus**
  (kleiner realer Aufwand/Datenschutz-Punkt, der in den Assets nicht abgedeckt
  ist).

### Option B — KI-bebilderte Videos

| Kriterium | Bewertung |
|---|---|
| Nischen-Fit / Ranking | **Schwach** — ersetzt die Demonstration, die die Nische verlangt |
| Marken-Identität | **Schwach** — widerspricht „am Bildschirm gezeigt" |
| Ressourcen (Credits/Zeit) | **Schwach** — 50 Credits reichen nur für ~12 Signaturbilder; Rest über Nano Banana = viel Handarbeit; FLUX-Kosten ungetestet |
| Echtheit / IP | **Gemischt** — IP-sauber (generisch), aber zeigt bewusst **nicht** die echte Google-UI → geringerer Praxisnutzen |
| Skalierbarkeit | **Schwach** — pro Video Dutzende Szenen à Bild + Montage (+ evtl. Motion) |

- **Pro:** visuell am aufwändigsten/„premium"; voll IP-sicher; komplett fertig
  geskriptet und geprompted.
- **Contra:** trifft den Kernbedarf der Nische nicht (kann das „Wie" nicht
  vorführen); bricht mit der Marken-Identität; teuerste/langsamste Variante;
  hartes 50-Credit-Limit mit ungeklärten Kosten → Risiko, mitten in der Serie
  „leerzulaufen"; Gefahr, dass 6 stilistisch gleiche 3D-Videos generisch/
  austauschbar wirken.

### Option C — Hybrid (Screencast-Kern + KI-Deko)

| Kriterium | Bewertung |
|---|---|
| Nischen-Fit / Ranking | **Stark** — Demonstration bleibt der Kern |
| Marken-Identität | **Stark**, wenn KI nur Hook/B-Roll/Shorts schmückt |
| Ressourcen (Credits/Zeit) | **Gut** — Credits gezielt auf ~12 Signaturbilder (Hook/Payoff) + Shorts; Body kostet 0 |
| Echtheit / IP | **Stark** — echte UI im Screencast, KI bleibt generisch → beide sauber getrennt |
| Skalierbarkeit | **Gut**, mit Disziplin — feste Regel: KI nur an definierten Stellen |

- **Pro:** behält die ziehende, markentreue Demonstration und nutzt die knappen
  Credits dort, wo Deko den höchsten Grenznutzen hat: **scroll-stoppende
  Hook-Frames und Shorts** (Shorts vertragen Deko am besten, brauchen kein
  echtes UI). Genau die **12 Signaturbilder** aus der Cloudinary-Queue sind für
  diesen Einsatz vorgesehen.
- **Contra:** mehr Koordinationsaufwand als A (zwei Materialarten schneiden);
  **Stilbruch-Risiko**, wenn realer Screen und 3D-Illustration ungeplant
  gemischt werden → nur an klar abgegrenzten Stellen (Hook, Übergänge, Shorts)
  einsetzen; hängt weiter am Credit-/Kostentest.

---

## 3 — Blinde Flecken & unausgesprochene Annahmen

- **„KI-Bild = Google-Oberfläche" ist falsch.** Euer eigener IP-Hinweis
  verbietet das Nachbauen der Google-UI. Ein KI-Video kann also das Kern-
  „Wie" prinzipiell **nicht** zeigen — nur der Screencast kann das.
- **„KI-Bilder = Cloudinary-Credits" ist unnötig eng.** Die Nano-Banana-Prompts
  in den `produktion/`-Ordnern laufen ohne Cloudinary-Credits. „KI-Weg" ist
  also nicht automatisch am 50er-Limit — kostet aber trotzdem viel **Zeit** und
  löst das UI-Problem nicht.
- **Credit-Kosten sind ungetestet.** Die Queue schreibt selbst vor: erst **1
  Testbild** generieren, Qualität + Kosten prüfen, dann erst die Serie. Jede
  credit-abhängige Planung ist bis dahin unbestätigt. Paket 01 hat Vorrang.
- **Thumbnails/Banner sind schon fertig und on-brand.** Der „hochwertige
  Look"-Vorteil von B ist an der wichtigsten Stelle (Vorschaubild) also **schon
  eingelöst** — ohne dass das ganze Video KI-bebildert sein muss. Das schwächt
  das Hauptargument für B deutlich.
- **Aufnahme-Voraussetzung bei A/C:** ein echtes oder ein neutrales Demo-Google-
  Profil zum Aufnehmen. Kein Blocker, aber real einzuplanen (Datenschutz:
  besser ein Test-/Demokonto als ein echtes Kundenprofil filmen).
- **Übersehene Option (leichter Zusatz):** Halb-Screencast — echter Screen mit
  eingeblendeten Marken-Grafik-Overlays (Pfeile, Zahlen, Badges im Navy/Gold-
  Look). Kein KI nötig, hebt die Screencasts optisch trotzdem an. Als günstige
  Ausbaustufe von A/C mitzudenken.

---

## 4 — Reversibilität

- **A:** **hoch reversibel.** Reine Screencasts jetzt; KI-Deko lässt sich später
  jederzeit ergänzen, ohne etwas zu verwerfen. Keine verbrannten Credits.
- **B:** **am wenigsten reversibel.** Generierte Credits sind weg; enttäuscht
  die Qualität nach der Generierung, ist das Budget futsch. Ein komplett
  KI-gebauter Kanal-Look ist zudem schwer zurückzudrehen, ohne die ersten
  Videos „anders" aussehen zu lassen.
- **C:** **hoch reversibel.** Screencast-Kern steht in jedem Fall; die KI-Deko
  ist optional und lässt sich nach dem 1-Bild-Kostentest jederzeit stoppen oder
  hochfahren. Bei Zeitdruck fällt man verlustfrei auf reines A zurück.

Bei knappem, unwiederbringlichem Budget (50 Credits) ist die reversible,
credit-sparsame Route klar zu bevorzugen — das spricht gegen B.

---

## 5 — 10/10/10-Test

- **In 10 Minuten:** A fühlt sich als schnellste Erleichterung an (einfach
  aufnehmen). B fühlt sich nach viel bevorstehender Arbeit an. C liegt
  dazwischen, mit etwas mehr Abstimmung.
- **In 10 Monaten:** Nach 6 Videos + 6 Shorts hat A eine konsistente, sofort
  wiedererkennbare „echter-Screen"-Bibliothek und volle Glaubwürdigkeit. Reines
  B riskiert, generisch/gleichförmig zu wirken und die Nische zu verfehlen —
  bei aufgebrauchten Credits. C hat die stärksten Hooks/Shorts **und** den
  intakten Vertrauens-Kern.
- **In 10 Jahren:** Das Format ist dann fast egal — was sich aufsummiert, ist
  die Identität „der, der dir die **echte** Google-Oberfläche zeigt und es
  selbst nachmachbar macht". Das verankert den Screencast dauerhaft als Kern;
  KI-Bilder sind eine austauschbare Beilage.

Alle drei Zeithorizonte zeigen in dieselbe Richtung: **Screencast als Kern**,
KI höchstens als Beilage — nie als Ersatz.

---

## 6 — Empfehlung (klar und direkt)

**Option C — aber als „schlanker Hybrid": Screencast-First, KI nur als Deko.
Wenn die Zeit knapp wird, ist der verlustfreie Rückfall Option A. Option B
wird verworfen.**

Konkret:

1. **Kern jeder Folge = echter Screencast** des Google-Profils (die 7 Schritte
   von Paket 01 vorführen). Das trägt Nische, Marke und Vertrauen.
2. **Erst der Pflicht-Test:** wie in der Queue vorgeschrieben **1 FLUX-Testbild**
   generieren, Qualität + Credit-Kosten prüfen. Erst danach über mehr
   entscheiden. Paket 01 hat Vorrang.
3. **KI-Deko gezielt** und nur an drei Stellen: **(a) Hook-Frame** der ersten
   ~15 Sek., **(b) 1–2 B-Roll/Übergangsbilder**, **(c) die Shorts** (dort
   verträgt Deko am meisten, echtes UI ist nicht nötig). Genau dafür sind die
   **12 Signaturbilder** (je Video Hook + Payoff) aus der Cloudinary-Queue
   gedacht — das passt ins 50-Credit-Budget mit Puffer.
4. **Body bleibt reiner Screencast** — Realbild und 3D-Illustration nicht
   wild mischen, sondern sauber trennen (Deko am Rand, Demonstration in der
   Mitte). So entsteht kein Stilbruch.
5. **Günstige Aufwertung ohne Credits:** Marken-Overlays (Pfeile, Zahlen,
   Navy/Gold-Badges) direkt auf den Screencast legen — hebt den Look ohne
   KI-Abhängigkeit.

**Warum nicht B:** Es verfehlt genau das, was die Nische verlangt (die echte
Demonstration), bricht mit der Identität „am Bildschirm gezeigt", darf die
Google-UI ohnehin nicht zeigen, ist die teuerste/langsamste Variante und hängt
an einem harten, ungetesteten 50-Credit-Limit. Der einzige echte Vorteil von B
— der Premium-Look — ist an der wichtigsten Stelle (Thumbnail/Banner) bereits
on-brand eingelöst.

**Ehrliche Einordnung:** Der Unterschied zwischen A und C ist bewusst klein.
Reines A ist völlig legitim und am schnellsten am Markt — wer jetzt sofort
veröffentlichen will, startet mit A und rüstet die KI-Deko später nach (voll
reversibel). C lohnt den Mehraufwand nur, wenn die Hook-/Shorts-Bilder den
Klick-/Watch-Uplift wirklich bringen — und das zeigt erst der 1-Bild-Test.
Nicht in aufwändige KI-Bebilderung investieren, bevor die ersten Screencasts
draußen sind.
