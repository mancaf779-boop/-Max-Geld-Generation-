// shot-v2.mjs — rendert cover-v2.html (1600x1600) zu cover-v2.png.
import { chromium } from "playwright-core";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const url = "file://" + resolve(DIR, "cover-v2.html");
const outPath = resolve(DIR, "cover-v2.png");

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1600, height: 1600 }, deviceScaleFactor: 2 });
await page.goto(url);
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
console.log(`OK -> ${outPath}`);
