#!/usr/bin/env node
// Baut die verkaufsfertigen PDFs (5 Master-Prompts + Kurzanleitung) aus den
// Markdown-Quelldateien in diesem Ordner. Aufruf:
//   node products/ai-content-empire-prompt-system/build-pdfs.mjs

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { chromium } from "playwright-core";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(DIR, "pdf");
const CHROMIUM_PATH =
  process.env.CHROMIUM_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const FILES = [
  { md: "01-research-agent.md", title: "Research Agent" },
  { md: "02-script-agent.md", title: "Script Agent" },
  { md: "03-thumbnail-agent.md", title: "Thumbnail Agent" },
  { md: "04-seo-agent.md", title: "SEO Agent" },
  { md: "05-analytics-agent.md", title: "Analytics Agent" },
  { md: "anleitung.md", title: "Kurzanleitung" },
];

const CSS = `
  @page { margin: 22mm 20mm; }
  body {
    font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    color: #1a1a1a;
    line-height: 1.55;
    font-size: 11.5pt;
  }
  h1 { font-size: 20pt; margin-bottom: 0.2em; }
  h2 { font-size: 14pt; margin-top: 1.6em; border-bottom: 1px solid #ddd; padding-bottom: 0.2em; }
  h3 { font-size: 12pt; margin-top: 1.2em; }
  code, pre { font-family: "SFMono-Regular", Consolas, Menlo, monospace; font-size: 9.5pt; }
  pre {
    background: #f4f4f4;
    padding: 10px 12px;
    border-radius: 4px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  code { background: #f4f4f4; padding: 1px 4px; border-radius: 3px; }
  pre code { background: none; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; font-size: 10pt; }
  th { background: #f0f0f0; }
  blockquote { border-left: 3px solid #ccc; margin: 1em 0; padding: 0 1em; color: #555; }
  a { color: #1a5fb4; }
  .footer-brand { color: #888; font-size: 9pt; margin-top: 3em; border-top: 1px solid #eee; padding-top: 0.5em; }
`;

function toHtml(markdownText, title) {
  const body = marked.parse(markdownText);
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>${title} — AI Content Empire Core Prompt System v1</title>
<style>${CSS}</style>
</head>
<body>
${body}
<div class="footer-brand">AI Content Empire — Core Prompt System v1</div>
</body>
</html>`;
}

async function main() {
  if (!existsSync(CHROMIUM_PATH)) {
    console.error(`Chromium nicht gefunden unter ${CHROMIUM_PATH}`);
    console.error("Setze CHROMIUM_PATH oder passe den Pfad im Skript an.");
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });
  const page = await browser.newPage();

  for (const { md, title } of FILES) {
    const mdPath = path.join(DIR, md);
    const mdText = await readFile(mdPath, "utf-8");
    const html = toHtml(mdText, title);

    await page.setContent(html, { waitUntil: "load" });

    const pdfName = md.replace(/\.md$/, ".pdf");
    const pdfPath = path.join(OUT_DIR, pdfName);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
    });
    console.log(`OK  ${pdfName}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
