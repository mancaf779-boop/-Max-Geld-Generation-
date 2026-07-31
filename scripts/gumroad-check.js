#!/usr/bin/env node
// Prüft, ob GUMROAD_ACCESS_TOKEN gültig ist — ruft GET /v2/user auf und
// gibt den Kontonamen aus. Kein Zugriff auf Produkte, nur ein Verbindungstest.
//
// Aufruf (aus dem Repo-Root):
//   node scripts/gumroad-check.js
//
// Token-Quelle (in dieser Reihenfolge):
//   1. Bereits gesetzte Umgebungsvariable GUMROAD_ACCESS_TOKEN
//   2. .gumroad.env im Repo-Root (Zeile "GUMROAD_ACCESS_TOKEN=...", gitignored)

const fs = require("node:fs");
const path = require("node:path");

function loadTokenFromEnvFile() {
  const envPath = path.resolve(__dirname, "..", ".gumroad.env");
  if (!fs.existsSync(envPath)) return undefined;
  const line = fs
    .readFileSync(envPath, "utf-8")
    .split("\n")
    .find((l) => l.startsWith("GUMROAD_ACCESS_TOKEN="));
  if (!line) return undefined;
  return line.slice("GUMROAD_ACCESS_TOKEN=".length).trim();
}

async function main() {
  const token = process.env.GUMROAD_ACCESS_TOKEN || loadTokenFromEnvFile();

  if (!token) {
    console.error(
      "Kein Token gefunden. Entweder GUMROAD_ACCESS_TOKEN exportieren oder " +
        ".gumroad.env im Repo-Root anlegen (siehe .gumroad.env.example).",
    );
    process.exit(1);
  }

  const res = await fetch("https://api.gumroad.com/v2/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  if (!res.ok || !data.success) {
    console.error("Token ungültig oder Gumroad-API-Fehler:", data.message || res.status);
    process.exit(1);
  }

  console.log(`OK — verbunden als: ${data.user.name} (${data.user.email})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
