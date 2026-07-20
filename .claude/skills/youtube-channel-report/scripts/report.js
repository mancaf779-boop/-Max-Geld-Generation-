// report.js — 28-Tage-Report der YouTube-Analytics des eigenen Kanals.
//
// Nicht-interaktiv: nutzt den gespeicherten Token (token.json) über
// getAuthedClientOrThrow() aus youtube-auth.js — es wird NICHT nach einem
// Login gefragt. Ist kein Token da, bricht das Script mit klarem Hinweis ab.
//
// Erwartet cwd == Repo-Root (setzt main.sh via `cd`). Module werden von dort
// aufgelöst, damit require unabhängig vom Skill-Ort funktioniert.
//
// Inhalt: Aufrufe (inkl. Ø/Tag), Wiedergabezeit, Ø Wiedergabedauer, neue
// Abonnenten, Trend der Aufrufe gegen die vorherige 28-Tage-Periode und das
// meistgesehene Video im Fenster.
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
// Prozent-Trend mit Vorzeichen. Vorperiode 0 → kein sinnvoller Prozentwert.
function pct(now, prev) {
  if (!(prev > 0)) return now > 0 ? "neu" : "±0 %";
  const p = Math.round(((now - prev) / prev) * 100);
  return `${p >= 0 ? "+" : ""}${p} %`;
}

// Eine Metrik-Zeile aus einer reports.query-Antwort ziehen (Header-basiert,
// damit die Reihenfolge der Spalten egal ist).
function pickValue(res, name) {
  const headers = (res.data?.columnHeaders || []).map((h) => h?.name);
  const row = res.data?.rows?.[0] || [];
  const i = headers.indexOf(name);
  const n = i >= 0 ? Number(row[i]) : NaN;
  return Number.isFinite(n) ? n : 0;
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
  const channel = ch.data?.items?.[0];
  if (!channel) {
    console.error("Kein Kanal für dieses Google-Konto gefunden.");
    process.exit(1);
  }

  // Gleiches 28-Tage-Fenster wie youtube-analytics.js: beide Grenzen inklusiv,
  // Ende = heute − 2 Tage (Analytics-Daten laufen ~48 h nach).
  const DAY = 24 * 60 * 60 * 1000;
  const end = new Date(Date.now() - 2 * DAY);
  const start = new Date(end.getTime() - 27 * DAY);
  // Vorperiode: die 28 Tage direkt davor (für den Trend).
  const prevEnd = new Date(start.getTime() - DAY);
  const prevStart = new Date(prevEnd.getTime() - 27 * DAY);

  const analytics = google.youtubeAnalytics({ version: "v2", auth });
  const channelId = `channel==${channel.id}`;
  const metrics = "views,estimatedMinutesWatched,averageViewDuration,subscribersGained";

  // Aktuelles Fenster, Vorperiode (nur Aufrufe für den Trend) und das
  // Top-Video parallel abfragen — spart Roundtrips.
  const [cur, prev, top] = await Promise.all([
    analytics.reports.query({ ids: channelId, startDate: isoDate(start), endDate: isoDate(end), metrics }),
    analytics.reports.query({ ids: channelId, startDate: isoDate(prevStart), endDate: isoDate(prevEnd), metrics: "views" }),
    analytics.reports.query({
      ids: channelId, startDate: isoDate(start), endDate: isoDate(end),
      metrics: "views", dimensions: "video", sort: "-views", maxResults: 1,
    }),
  ]);

  const views = pickValue(cur, "views");
  const minutes = pickValue(cur, "estimatedMinutesWatched");
  const avgDur = pickValue(cur, "averageViewDuration");
  const subs = pickValue(cur, "subscribersGained");
  const hours = Math.round(minutes / 60);
  const perDay = Math.round(views / 28);
  const prevViews = pickValue(prev, "views");

  // Top-Video auflösen: Analytics liefert nur die Video-ID → Titel über die
  // Data-API nachschlagen. Kann leer sein (keine Videodaten im Fenster).
  let topLine = null;
  const topRow = top.data?.rows?.[0];
  if (topRow && topRow[0]) {
    const videoId = topRow[0];
    const topViews = Number(topRow[1]) || 0;
    let title = videoId;
    try {
      const v = await yt.videos.list({ part: ["snippet"], id: [videoId] });
      title = v.data?.items?.[0]?.snippet?.title || videoId;
    } catch { /* Titel nicht auflösbar → ID zeigen */ }
    topLine = `  Top-Video: „${title}“ — ${fmtInt(topViews)} Aufrufe`;
  }

  const line = "─".repeat(48);
  console.log(line);
  console.log(`  ${channel.snippet?.title || channel.id}`);
  console.log(`  28 Tage · ${isoDate(start)} → ${isoDate(end)}`);
  console.log(line);
  console.log(`  Aufrufe             ${fmtInt(views)}  (Ø ${fmtInt(perDay)}/Tag)`);
  console.log(`  Wiedergabezeit      ${fmtInt(hours)} Std  (${fmtInt(minutes)} Min)`);
  console.log(`  Ø Wiedergabedauer   ${mmss(avgDur)} Min`);
  console.log(`  Neue Abonnenten     ${subs >= 0 ? "+" : ""}${fmtInt(subs)}`);
  console.log(`  Trend Aufrufe       ${pct(views, prevViews)}  (Vorperiode ${fmtInt(prevViews)})`);
  console.log(line);
  console.log(topLine || "  Top-Video: keine Videodaten im Fenster");
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
