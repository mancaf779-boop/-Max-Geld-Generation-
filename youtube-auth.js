// youtube-auth.js
const fs = require("fs");
const http = require("http");
const readline = require("readline");
const { google } = require("googleapis");

const CLIENT_SECRET = "client_secret.json";
const TOKEN = "token.json";
const SCOPES = [
  "https://www.googleapis.com/auth/yt-analytics.readonly",
  "https://www.googleapis.com/auth/youtube.readonly",
];

// client_secret.json einlesen und validieren — klare Meldungen statt
// TypeError/SyntaxError bei fehlender/kaputter Datei oder falschem Client-Typ.
function loadClientCreds() {
  let raw;
  try {
    raw = fs.readFileSync(CLIENT_SECRET, "utf8");
  } catch {
    throw new Error(
      `${CLIENT_SECRET} nicht gefunden — OAuth-Client (Typ "Desktop app") in der Google Cloud Console anlegen, JSON ins Repo-Root legen und aus dem Repo-Root starten.`
    );
  }
  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error(`${CLIENT_SECRET} ist kein gültiges JSON — Datei neu aus der Cloud Console herunterladen.`);
  }
  if (json.web) {
    throw new Error(`${CLIENT_SECRET} ist ein "Web application"-Client — benötigt wird der Typ "Desktop app" (Schlüssel "installed").`);
  }
  const creds = json.installed;
  if (!creds || !creds.client_id || !creds.client_secret) {
    throw new Error(`${CLIENT_SECRET} hat nicht das erwartete Format (Schlüssel "installed" mit client_id/client_secret fehlt).`);
  }
  return creds;
}

// token.json enthält das refresh_token -> nur für den Besitzer lesbar (0600).
function saveToken(tokens) {
  fs.writeFileSync(TOKEN, JSON.stringify(tokens, null, 2), { mode: 0o600 });
  fs.chmodSync(TOKEN, 0o600); // "mode" oben greift nur beim Neuanlegen der Datei
}

// OAuth2-Client bauen. Der "tokens"-Listener persistiert rotierte Tokens
// (z. B. neue access_tokens nach Refresh); das refresh_token geht dabei nie
// verloren, weil neue Werte über die alten gemergt werden.
function makeClient(redirectUri) {
  const creds = loadClientCreds();
  const oAuth2 = new google.auth.OAuth2(creds.client_id, creds.client_secret, redirectUri);
  oAuth2.on("tokens", (tokens) => {
    let old = {};
    try {
      old = JSON.parse(fs.readFileSync(TOKEN, "utf8"));
    } catch {}
    saveToken({ ...old, ...tokens });
  });
  return oAuth2;
}

// Für die Next.js Route: liest NUR das gespeicherte Token, KEIN interaktiver
// Fallback. Wirft sofort einen klaren Fehler statt zu hängen.
function getAuthedClientOrThrow() {
  if (!fs.existsSync(TOKEN)) {
    throw new Error("Kein token.json gefunden — einmalig im Terminal ausführen: node youtube-analytics.js");
  }
  const oAuth2 = makeClient();
  let tokens;
  try {
    tokens = JSON.parse(fs.readFileSync(TOKEN, "utf8"));
  } catch {
    throw new Error("token.json ist kein gültiges JSON — Datei löschen und neu einloggen: node youtube-analytics.js");
  }
  oAuth2.setCredentials(tokens);
  return oAuth2;
}

// Aus manueller Eingabe (kompletter Redirect-URL oder nur der Code) den
// OAuth-Code extrahieren.
function extractCode(input) {
  if (!input.includes("code=")) return input;
  try {
    const fromUrl = new URL(input).searchParams.get("code");
    if (fromUrl) return fromUrl;
  } catch {}
  const m = input.match(/code=([^&\s]+)/);
  return m ? decodeURIComponent(m[1]) : input;
}

// Für den CLI-Login (Loopback-Flow): lokaler HTTP-Server auf einem ephemeren
// Port fängt die Google-Umleitung mit ?code=... ab. Fallback: Redirect-URL
// oder Code manuell einfügen (z. B. wenn der Browser auf einem anderen
// Rechner läuft). prompt:"consent" erzwingt, dass Google auch beim Re-Login
// wieder ein refresh_token ausstellt.
async function getAuthedClientInteractive() {
  if (fs.existsSync(TOKEN)) return getAuthedClientOrThrow();

  const server = http.createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const redirectUri = `http://127.0.0.1:${server.address().port}`;
  const oAuth2 = makeClient(redirectUri);
  const authUrl = oAuth2.generateAuthUrl({ access_type: "offline", prompt: "consent", scope: SCOPES });

  console.log("\nDiesen Link im Browser öffnen und Zugriff erlauben:\n" + authUrl + "\n");
  console.log(`Der Browser wird danach auf ${redirectUri} umgeleitet (dieser Prozess fängt das ab).`);
  console.log("Läuft der Browser woanders: komplette Umleitungs-URL oder den code=...-Wert hier einfügen.\n");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const code = await new Promise((resolve, reject) => {
    server.on("request", (req, res) => {
      const params = new URL(req.url, redirectUri).searchParams;
      const c = params.get("code");
      const err = params.get("error");
      if (!c && !err) {
        res.writeHead(404).end(); // z. B. /favicon.ico — ignorieren
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(c ? "Login ok — dieses Fenster kann geschlossen werden." : `Login fehlgeschlagen: ${err}`);
      if (c) resolve(c);
      else reject(new Error(`Google hat den Login abgelehnt: ${err}`));
    });
    rl.question("Oder Umleitungs-URL/Code hier einfügen: ", (a) => resolve(extractCode(a.trim())));
  });
  rl.close();
  server.close();

  const { tokens } = await oAuth2.getToken(code);
  oAuth2.setCredentials(tokens);
  saveToken(tokens);
  console.log("Token gespeichert -> token.json (Dateirechte 0600)");
  return oAuth2;
}

module.exports = { getAuthedClientOrThrow, getAuthedClientInteractive };
