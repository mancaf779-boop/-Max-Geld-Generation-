// summary.js — Fasst die YouTube-Analytics der letzten 28 Tage zusammen.
//
// Nicht-interaktiv: nutzt den gespeicherten Token (token.json) über
// getAuthedClientOrThrow() aus youtube-auth.js — es wird NICHT nach einem
// Login gefragt. Ist kein Token da, bricht das Script mit klarem Hinweis ab.
//
// Erwartet cwd == Repo-Root (setzt main.sh via `cd`). Module werden von dort
// aufgelöst, damit require unabhängig vom Skill-Ort funktioniert.
const path = require("path");
const ROOT = process.cwd();
const { google } = require(path.join(ROOT, "node_modules", "googleapis"));
const { getAuthedClientOrThrow } = require(path.join(ROOT, "youtube-auth"));

function isoDate(d) { return d.toISOString().slice(0, 10); }
function fmtInt(n) { return Number(n).toLocaleString("de-DE"); }
function mmss(totalSeconds) {
  const s = Math.max(0, Math.round(Number(totalSeconds) || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

async function main() {
  let auth;
  try {
    auth = getAuthedClientOrThrow();
  } catch (e) {
    console.error("Kein gültiger Login (" + (e && e.message ? e.message : e) + ").");
    console.error("Einmalig einloggen:  node youtube-analytics.js");
    console.error("Danach den Skill erneut ausführen.");
    process.exit(2);
  }

  const yt = google.youtube({ version: "v3", auth });
  const ch = await yt.channels.list({ part: ["id", "snippet"], mine: true });
  const channel = ch.data.items && ch.data.items[0];
  if (!channel) {
    console.error("Kein Kanal für dieses Google-Konto gefunden.");
    process.exit(1);
  }

  // Gleiches 28-Tage-Fenster wie youtube-analytics.js: beide Grenzen inklusiv,
  // Ende = heute − 2 Tage (Analytics-Daten laufen ~48 h nach).
  const DAY = 24 * 60 * 60 * 1000;
  const end = new Date(Date.now() - 2 * DAY);
  const start = new Date(end.getTime() - 27 * DAY);

  const analytics = google.youtubeAnalytics({ version: "v2", auth });
  const res = await analytics.reports.query({
    ids: `channel==${channel.id}`,
    startDate: isoDate(start),
    endDate: isoDate(end),
    metrics: "views,estimatedMinutesWatched,averageViewDuration,subscribersGained",
  });

  const headers = (res.data.columnHeaders || []).map((h) => h.name);
  const row = (res.data.rows && res.data.rows[0]) || [];
  const val = (name) => {
    const i = headers.indexOf(name);
    const n = i >= 0 ? Number(row[i]) : NaN;
    return Number.isFinite(n) ? n : 0;
  };

  const views = val("views");
  const minutes = val("estimatedMinutesWatched");
  const avgDur = val("averageViewDuration");
  const subs = val("subscribersGained");
  const hours = Math.round(minutes / 60);
  const perDay = Math.round(views / 28);

  const line = "─".repeat(48);
  console.log(line);
  console.log(`  ${channel.snippet.title}`);
  console.log(`  28 Tage · ${isoDate(start)} → ${isoDate(end)}`);
  console.log(line);
  console.log(`  Aufrufe             ${fmtInt(views)}  (Ø ${fmtInt(perDay)}/Tag)`);
  console.log(`  Wiedergabezeit      ${fmtInt(hours)} Std  (${fmtInt(minutes)} Min)`);
  console.log(`  Ø Wiedergabedauer   ${mmss(avgDur)} Min`);
  console.log(`  Neue Abonnenten     ${subs >= 0 ? "+" : ""}${fmtInt(subs)}`);
  console.log(line);
  console.log("  Fenster endet heute − 2 Tage (Analytics-Verzug ~48 h).");
}

main().catch((err) => {
  const apiErr = err && err.response && err.response.data && err.response.data.error;
  const msg =
    (apiErr && (apiErr.message || JSON.stringify(apiErr))) ||
    (err && err.message) ||
    String(err);
  console.error("Fehler beim Abruf:", msg);
  process.exit(1);
});
