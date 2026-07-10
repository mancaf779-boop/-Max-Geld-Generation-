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

Ohne Credentials prüft er: Modul lädt + Exporte da, CLI bricht ohne
`client_secret.json` mit Exit ≠ 0 ab, `getAuthedClientOrThrow()` wirft die
klare „Kein token.json"-Meldung. Mit vorhandenem `client_secret.json` startet
er stattdessen den echten Login/Report (interaktiv!). Erwartetes Ende: `SMOKE OK`.

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

Druckt eine `accounts.google.com`-URL, wartet auf Code-Eingabe per stdin,
schreibt `token.json`, zieht den Report. **Headless im Container nicht
abschließbar** — der Browser-Schritt braucht ein echtes Google-Konto; hier
verifiziert bis zur URL-Ausgabe + Code-Prompt.

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

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Fehler: ENOENT ... client_secret.json` | OAuth-Client in der Cloud Console anlegen, JSON als `client_secret.json` ins Repo-Root; aus dem Repo-Root starten |
| `Kein token.json gefunden — einmalig im Terminal ausführen: node youtube-analytics.js` | Genau das tun (interaktiv, nicht headless) |
| CLI hängt scheinbar | Es wartet auf die Code-Eingabe (`Code hier einfügen:`) — stdin nötig |
