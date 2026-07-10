// youtube-analytics.js
// Einmaliger CLI-Login + Test-Abruf der YouTube-Analytics-Daten.
// Aufruf: node youtube-analytics.js
const { google } = require("googleapis");
const { getAuthedClientInteractive } = require("./youtube-auth");

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

async function main() {
  const auth = await getAuthedClientInteractive();

  // Eigenen Kanal ermitteln (Scope: youtube.readonly)
  const yt = google.youtube({ version: "v3", auth });
  const ch = await yt.channels.list({ part: ["id", "snippet"], mine: true });
  const channel = ch.data.items && ch.data.items[0];
  if (!channel) {
    console.error("Kein Kanal für dieses Google-Konto gefunden.");
    process.exit(1);
  }
  console.log(`Kanal: ${channel.snippet.title} (${channel.id})`);

  // Letzte 28 Tage abfragen (Scope: yt-analytics.readonly — nicht-monetäre Metriken)
  const end = new Date();
  const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000);
  const analytics = google.youtubeAnalytics({ version: "v2", auth });
  const res = await analytics.reports.query({
    ids: `channel==${channel.id}`,
    startDate: isoDate(start),
    endDate: isoDate(end),
    metrics: "views,estimatedMinutesWatched,averageViewDuration,subscribersGained",
  });

  const headers = res.data.columnHeaders.map((h) => h.name);
  const row = (res.data.rows && res.data.rows[0]) || [];
  console.log(`\nLetzte 28 Tage (${isoDate(start)} bis ${isoDate(end)}):`);
  headers.forEach((name, i) => console.log(`  ${name}: ${row[i] ?? "—"}`));
}

main().catch((err) => {
  console.error("Fehler:", err.message);
  process.exit(1);
});
