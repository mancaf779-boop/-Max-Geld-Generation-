# YouTube-Video-Ordner

Hier landet jedes produzierte Video-Paket, upload-fertig. Ein Paket pro
Verzeichnis, nummeriert in Produktionsreihenfolge:

```
videos/paket-NN-<thema>/
├── hauptvideo.mp4     # 1920x1080, ~2 min — normales YouTube-Video
├── thumbnail.png      # 1280x720 — beim Hauptvideo als Thumbnail setzen
├── short-<thema>.mp4  # 1080x1920, <60 s — eigenständiger YouTube-Short
└── upload-texte.txt   # Titel, Beschreibung, Tags zum Kopieren
```

Upload: studio.youtube.com → „Erstellen" → Datei reinziehen → Texte aus
`upload-texte.txt` einfügen → Thumbnail setzen (nur Hauptvideo) →
öffentlich. Shorts erkennt YouTube am Hochformat automatisch.

Neue Pakete erzeugt der Skill `produce-video` (Skripte) — Ablage dann
nach obigem Schema hier einsortieren und committen.

| Paket | Hauptvideo | Short |
|---|---|---|
| 01 | 5 Spartipps für jeden Monat | Der 24-Stunden-Trick |
| 02 | 1.000 € Notgroschen aufbauen | Der 1%-Trick |
| 03 | Die Abo-Inventur | Zahle dich zuerst selbst |
| 04 | Das 3-Konten-Modell | 3 Konten = Ordnung |
| 05 | Die 50-30-20-Regel | 50-30-20 in 30 Sekunden |
