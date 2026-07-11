// shot.mjs — Screenshot-Treiber für website/index.html mit ECHTER
// Geräte-Emulation (Headless-Chrome-CLI hat eine Mindest-Fensterbreite
// von ~500px und taugt daher NICHT für Mobil-Tests).
//
// Aufruf (aus dem Repo-Root):
//   node .claude/skills/design-website/shot.mjs <ausgabe-dir>
//
// Erzeugt: desktop-dark.png, desktop-light.png, mobile.png (390px, iPhone-
// Format) und meldet horizontalen Overflow als Fehler (Exit 1).
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const outDir = process.argv[2] ?? "out/design-check";
mkdirSync(outDir, { recursive: true });
const url = "file://" + resolve("website/index.html");

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});

let failed = false;
const shots = [
  { name: "desktop-dark", viewport: { width: 1280, height: 2400 }, colorScheme: "dark" },
  { name: "desktop-light", viewport: { width: 1280, height: 2400 }, colorScheme: "light" },
  { name: "mobile", viewport: { width: 390, height: 3200 }, colorScheme: "dark", isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];

for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: s.viewport,
    colorScheme: s.colorScheme,
    isMobile: s.isMobile ?? false,
    hasTouch: s.hasTouch ?? false,
    deviceScaleFactor: s.deviceScaleFactor ?? 1,
  });
  const page = await ctx.newPage();
  await page.goto(url);
  const { vw, sw } = await page.evaluate(() => ({
    vw: document.documentElement.clientWidth,
    sw: document.documentElement.scrollWidth,
  }));
  const overflow = sw > vw;
  if (overflow) failed = true;
  await page.screenshot({ path: `${outDir}/${s.name}.png`, fullPage: false });
  console.log(`${overflow ? "OVERFLOW" : "OK"}: ${s.name} viewport=${vw} scrollWidth=${sw} -> ${outDir}/${s.name}.png`);
  await ctx.close();
}

await browser.close();
if (failed) {
  console.error("FEHLER: Seite scrollt horizontal — Layout fixen und erneut prüfen.");
  process.exit(1);
}
