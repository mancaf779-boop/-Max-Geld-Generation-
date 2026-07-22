// shot.mjs — rendert cover.html (1600x900, exakte Pixelgröße) zu cover.png.
// Aufruf (aus dem Repo-Root):
//   node products/ai-content-empire-prompt-system/cover-assets/shot.mjs
import { chromium } from "playwright-core";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const url = "file://" + resolve(DIR, "cover.html");
const outPath = resolve(DIR, "cover.png");

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});
const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto(url);
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
console.log(`OK -> ${outPath}`);
