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

  // 28-Tage-Fenster abfragen (Scope: yt-analytics.readonly — nicht-monetäre
  // Metriken). start/end sind bei YouTube Analytics BEIDE inklusiv, daher
  // end - 27 Tage; das Fenster endet vorgestern, weil Analytics-Daten
  // ~48 h nachlaufen.
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

  const headers = res.data.columnHeaders.map((h) => h.name);
  const row = (res.data.rows && res.data.rows[0]) || [];
  console.log(`\n28 Tage, ${isoDate(start)} bis ${isoDate(end)} (beide inklusive; Ende = heute − 2 Tage wegen Datenverzug):`);
  headers.forEach((name, i) => console.log(`  ${name}: ${row[i] ?? "—"}`));
}

main().catch((err) => {
  // Bei GaxiosError steckt die eigentliche API-Ursache in response.data.error;
  // Non-Error-Rejections nicht als "undefined" verschlucken.
  const apiErr = err && err.response && err.response.data && err.response.data.error;
  const msg =
    typeof apiErr === "string" ? apiErr
    : apiErr && (apiErr.message || JSON.stringify(apiErr))
    || (err && err.message)
    || String(err);
  console.error("Fehler:", msg);
  process.exit(1);
});
