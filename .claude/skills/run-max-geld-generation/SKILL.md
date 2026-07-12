---
name: run-max-geld-generation
description: Run, start, test, or smoke-check the Max-Geld-Generation YouTube analytics CLI (node youtube-analytics.js) — OAuth login, 28-day channel report, credential error paths.
---

# Run: Max Geld Generation (YouTube-Analytics-CLI)

Node.js-CLI (CommonJS), das einmalig per OAuth einloggt (`token.json`) und
einen 28-Tage-Kanalreport zieht. Kein Server, keine GUI — der Treiber ist
`smoke.sh` bzw. der direkte `node`-Aufruf. **Alle Pfade relativ zum Repo-Root.**

## Voraussetzungen

- Node ≥ 18 (Container: Node 22 unter `/opt/node22/bin/node`) — sonst nichts.

## Setup

```bash
npm install --no-audit --no-fund
```

## Run (Agent-Pfad) — Smoke-Treiber

```bash
.claude/skills/run-max-geld-generation/smoke.sh
```

Der Treiber blockiert nie (CLI läuft mit geschlossenem stdin + 15-s-Timeout)
und prüft die konkreten Fehlermeldungen, nicht nur Exit-Codes. Je nach
Credential-Zustand (alle drei Fehlzustände hier verifiziert):

- **keine Credentials:** CLI bricht mit der „client_secret.json nicht
  gefunden"-Meldung ab; `getAuthedClientOrThrow()` wirft die klare
  „Kein token.json"-Meldung.
- **`client_secret.json` ohne `token.json`:** Login-URL
  (`accounts.google.com`) muss erscheinen; der Prozess wird nach dem Timeout
  beendet (der Login selbst braucht Browser + echtes Konto).
- **`token.json` ohne `client_secret.json`:** klare client_secret-Meldung,
  Exit ≠ 0.
- **beide vorhanden:** startet den echten Report.

Erwartetes Ende: `SMOKE OK`.

Direktaufruf interner Funktionen (ohne CLI):

```bash
node -e "console.log(Object.keys(require('./youtube-auth')))"
```

## Run (Mensch-Pfad) — echter Login

Braucht `client_secret.json` (OAuth-Client Typ „Desktop app" aus der Google
Cloud Console) im Repo-Root. Dann:

```bash
npm run yt:login   # = node youtube-analytics.js
```

Druckt eine `accounts.google.com`-URL und startet einen Loopback-Server auf
einem ephemeren `127.0.0.1`-Port, der Googles Umleitung mit `?code=...`
automatisch abfängt. Fallback (Browser auf anderem Rechner): komplette
Umleitungs-URL oder nur den `code=...`-Wert in den stdin-Prompt einfügen.
Schreibt `token.json` (Dateirechte 0600), zieht den Report. Re-Login nutzt
`prompt=consent`, damit Google wieder ein `refresh_token` ausstellt.
**Headless im Container nicht abschließbar** — der Browser-Schritt braucht
ein echtes Google-Konto; hier verifiziert bis zum Token-Tausch (Loopback-
Empfang und URL/Code-Fallback mit Dummy-Credentials, Abbruch erst bei
Googles `invalid_client`).

## Gotchas

- **cwd-abhängig:** `client_secret.json`/`token.json` werden relativ zum
  Arbeitsverzeichnis gesucht. Immer aus dem Repo-Root starten, sonst ENOENT
  trotz vorhandener Dateien.
- **Secrets:** `client_secret.json`/`token.json` sind gitignored. Nie
  committen, nie in Logs/PRs zitieren.
- `punycode`-DeprecationWarning von `googleapis` ist Rauschen — ignorieren.
- Scopes sind read-only (`yt-analytics.readonly`, `youtube.readonly`).
  `estimatedRevenue` u. a. monetäre Metriken brauchen zusätzlich
  `yt-analytics-monetary.readonly` + Re-Login (token.json löschen).
- Das Report-Fenster sind 28 Tage (start/end bei YouTube Analytics beide
  inklusiv) und endet vorgestern — Analytics-Daten laufen ~48 h nach.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Fehler: client_secret.json nicht gefunden — ...` | OAuth-Client in der Cloud Console anlegen, JSON als `client_secret.json` ins Repo-Root; aus dem Repo-Root starten |
| `client_secret.json ist kein gültiges JSON` / `ist ein "Web application"-Client` / `hat nicht das erwartete Format` | Client vom Typ „Desktop app" anlegen und die JSON-Datei neu herunterladen |
| `Kein token.json gefunden — einmalig im Terminal ausführen: node youtube-analytics.js` | Genau das tun (interaktiv, nicht headless) |
| CLI hängt scheinbar | Es wartet auf die Browser-Umleitung bzw. das Einfügen von Umleitungs-URL/Code — Login im Browser abschließen |
| `Fehler: Google hat den Login abgelehnt: access_denied` | Zugriff im Google-Consent-Screen erlauben, Login erneut starten |
