// youtube-auth.js
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const CLIENT_SECRET = "client_secret.json";
const TOKEN = "token.json";
const SCOPES = [
  "https://www.googleapis.com/auth/yt-analytics.readonly",
  "https://www.googleapis.com/auth/youtube.readonly",
];

function loadClient() {
  const creds = JSON.parse(fs.readFileSync(CLIENT_SECRET)).installed;
  return new google.auth.OAuth2(creds.client_id, creds.client_secret, creds.redirect_uris[0]);
}

// Für die Next.js Route: liest NUR das gespeicherte Token, KEIN interaktiver
// Fallback. Wirft sofort einen klaren Fehler statt zu hängen.
function getAuthedClientOrThrow() {
  if (!fs.existsSync(TOKEN)) {
    throw new Error("Kein token.json gefunden — einmalig im Terminal ausführen: node youtube-analytics.js");
  }
  const oAuth2 = loadClient();
  oAuth2.setCredentials(JSON.parse(fs.readFileSync(TOKEN)));
  return oAuth2;
}

// Für den CLI-Login: fragt interaktiv nach dem Code, falls noch kein Token existiert.
async function getAuthedClientInteractive() {
  if (fs.existsSync(TOKEN)) return getAuthedClientOrThrow();

  const oAuth2 = loadClient();
  const authUrl = oAuth2.generateAuthUrl({ access_type: "offline", scope: SCOPES });
  console.log("\nDiesen Link im Browser öffnen und Zugriff erlauben:\n" + authUrl + "\n");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const code = await new Promise((r) =>
    rl.question("Code hier einfügen: ", (a) => { rl.close(); r(a.trim()); })
  );

  const { tokens } = await oAuth2.getToken(code);
  oAuth2.setCredentials(tokens);
  fs.writeFileSync(TOKEN, JSON.stringify(tokens));
  console.log("Token gespeichert -> token.json");
  return oAuth2;
}

module.exports = { getAuthedClientOrThrow, getAuthedClientInteractive };
