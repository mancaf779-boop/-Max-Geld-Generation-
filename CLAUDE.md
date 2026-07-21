# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## ⚠️ Session-Start-Regel (IMMER zuerst — vor jeder Arbeit)

Bevor du in einer neuen Sitzung irgendetwas tust, **lies zuerst die gespeicherten
MD-Steuerdateien** und arbeite nach ihnen — **nicht** frei drauflos. Das spart
Tokens und hält alles konsistent.

1. **Prompt-Bibliothek:** `.claude/skills/prompt-library/` (SKILL.md-Index +
   die passende `prompts/NN-*.md`). Muster anwenden statt improvisieren.
2. **Gespeicherte System-Prompts & Sammlungen unter `youtube-seo/`:**
   - `kanal-analyse-systemprompt.md` — Kanal-Reverse-Engineering (liegt über den
     vidIQ-Konkurrenz-Prompts 01 & 03)
   - `referenz-channel-operating-system.md` — Operating-System-Vorlage
   - `channel-setup-engine.md` — 8-Schritte-Setup für einen faceless Kanal von Null
   - `vidiq-prompts.md` — vidIQ-Research-Queue + Batch-Zuweisung (Ausführung nur
     mit vidIQ-Credits)
   - `wettbewerbsanalyse.md`, `keywords.md`, `kanal.md`, `video-metadaten.md`
   - `branding/kanal-identitaet.md` + `branding/kanal-angebot.md` (Stimme/Positionierung)
3. **Kein Eigenlauf:** keine unnötigen Tool-Aufrufe, keine Auto-Commits, keine
   Subagenten ohne ausdrückliches Kommando des Nutzers. Erst lesen → dann auf die
   Richtung des Nutzers warten. Der Nutzer sagt, wo es langgeht.
4. **Konnektoren** wackeln in dieser Session öfter; nie behaupten, etwas sei
   „erledigt", wenn ein Konnektor/Guthaben fehlt — ehrlich den Blocker nennen.

> Grund: Der Nutzer hat diese Dateien bewusst als Steuerung angelegt, damit
> keine Tokens verschwendet werden. Diese Regel hat Vorrang.

## Ton & Antwortstil (Regel — hat Vorrang)

- **Kein überheblicher, belehrender oder „komischer" Ton.** Nicht von oben herab,
  nicht klugscheißen, keine ungefragten Bewertungen oder Belehrungen.
- **Kurz und normal antworten** — auf den Punkt, wie unter Kollegen. Kein
  Zuballern mit Bullet-Listen, Hedging-Floskeln („ehrlich gesagt" …) und Emoji.
- Nur so viel erklären, wie gefragt ist. Der Nutzer entscheidet, wann er mehr will.

## Project intent

The repo name **"Max Geld Generation"** ("maximum money generation" in German)
is the project's original working title. The **actual YouTube channel built
here has since pivoted niche**: it now runs as **„Lokale Sichtbarkeit &
Termine"** (handle **@francescomanca5183**) — practical, screencast-based
tutorials that help small local businesses (hairdressers, medical practices,
tradespeople, restaurants, studios…) get found on Google and turn that
visibility into booked appointments. See `branding/kanal-identitaet.md` and
`branding/kanal-angebot.md` for the full voice/positioning, and
`videos/content-plan.md` for the content roadmap.

The original niche (personal finance / "Spartipps") was scrapped and its
prepared video packages are kept only for reference under
`videos/_archiv-off-niche-spartipps/` — **do not upload those**, they don't
match the current channel.

The technical backbone is a **Node.js (CommonJS) integration with the YouTube
Data and YouTube Analytics APIs**: authenticate once via OAuth on the CLI,
then let application code (a Next.js frontend is planned but not present yet)
query the YouTube Analytics API with the stored token. Around that sits a
whole content-production pipeline (scripting, TTS/video/thumbnail generation,
SEO, website, branding) driven by Claude Code skills.

## Current state of the repository

```
.
├── README.md               # single-line title placeholder — still not expanded
├── CLAUDE.md                # this file
├── HANDOFF.md                # handoff/status doc for the next agent session (German)
├── package.json / package-lock.json  # deps: googleapis; devDeps: playwright-core; engines: node >= 18
├── .gitignore                # excludes node_modules/, out/, secrets (see below), rendered videos
├── .mcp.json                  # project-scoped MCP server: vidIQ (needs $VIDIQ_TOKEN)
├── youtube-auth.js            # OAuth2 helpers (loopback login + token-only loader)
├── youtube-analytics.js       # CLI: one-time login + 28-day channel report
├── scripts/
│   └── new-branch.sh          # start every change on a fresh branch off main
├── website/
│   ├── index.html              # channel landing page (self-contained; GoDaddy upload)
│   ├── audit-landingpage.html  # lead-magnet landing page (free Google-profile audit)
│   ├── impressum.html / datenschutz.html  # required DE legal pages
│   └── copy-vorschlag.md       # landing page copy proposal (prompt 09 output)
├── branding/
│   ├── kanal-identitaet.md / kanal-angebot.md  # voice, positioning, offer
│   ├── banner.html / banner-v2.html / profilbild.html  # brand asset sources (rendered via headless Chromium)
│   ├── banner-2048x1152.png / banner-2560x1440.png / profilbild-800x800.png  # rendered channel art
│   └── README.md                # how to re-render + upload to YouTube Studio
├── youtube-seo/                 # SEO reference docs: kanal.md, keywords.md, video-metadaten.md,
│                                 # wettbewerbsanalyse.md, channel-setup-engine.md, vidiq-prompts.md,
│                                 # kanal-analyse-systemprompt.md, referenz-channel-operating-system.md
├── blog/                        # SEO blog posts written for the channel's topics
├── videos/
│   ├── content-plan.md, ideen-brainstorm.md, entscheidung-produktionsweg.md, wachstum-expertenpanel.md
│   ├── paket-0N-*/               # one folder per video: scripts, thumbnails, upload texts,
│   │                             # + produktion/ (AI-image production package: prompts, thumbnail concepts)
│   └── _archiv-off-niche-spartipps/  # old niche, kept for reference only — do not upload
└── .claude/skills/
    ├── run-max-geld-generation/   # smoke.sh: launch CLI, verify auth error paths
    ├── youtube-analytics-summary/ # non-interactive 28-day analytics summary via saved token.json
    ├── produce-video/             # produce.sh (espeak-ng, no key) / make-short.sh (ElevenLabs) /
    │                               # design_video.py (ElevenLabs or edge-tts) -> TTS + thumbnail + video/Short
    ├── design-website/            # shot.mjs: brand tokens + responsive screenshot checks (playwright-core)
    ├── channel-analyzer/          # reverse-engineer a competitor channel's structure
    ├── channel-strategist/        # act as growth strategist for this channel's niche
    ├── prompt-library/            # numbered, reusable prompt templates (prompts/01-14)
    └── lite-cge-*/                 # packaged CGE Lite skills: holy-trifecta, scriptwriter,
                                     # video-idea-finder, launch-optimization, monetization, settings
```

There is **no test suite, linting, or CI configuration**. A Next.js frontend
is planned (see `getAuthedClientOrThrow` in `youtube-auth.js`) but not present.

### Setup & credentials

1. Create an OAuth client (type "Desktop app") in the Google Cloud Console and
   save it as `client_secret.json` in the repo root.
2. Run `node youtube-analytics.js` (or `npm run yt:login`) once in a terminal;
   it prints an auth URL and starts a loopback server on an ephemeral
   `127.0.0.1` port that catches Google's redirect automatically. If the
   browser runs on another machine, paste the full redirect URL (or just the
   `code=...` value) into the prompt instead. On success it writes
   `token.json` (file mode 0600). Re-logins use `prompt=consent`, so a
   `refresh_token` is always issued; token rotation is persisted back to
   `token.json` automatically.
3. Server-side code (e.g. Next.js routes) must use `getAuthedClientOrThrow()`
   from `youtube-auth.js` — it never prompts interactively.

`client_secret.json` and `token.json` are **secrets** and are gitignored.
Never commit them and never print their contents into logs or PRs. The same
goes for `.elevenlabs.env`, `.vidiq.env`, and `.azure-speech.env` (used by the
`produce-video` skill and the vidIQ MCP connector).

The report window is 28 days (start and end date are both inclusive in the
YouTube Analytics API) ending two days ago, because Analytics data lags by
roughly 48 hours.

OAuth scopes are read-only: `yt-analytics.readonly` and `youtube.readonly`.
Monetary metrics (e.g. `estimatedRevenue`) would additionally require the
`yt-analytics-monetary.readonly` scope and a re-login. A future upload
automation would need `youtube.upload` added to `SCOPES` plus a re-login
(see `HANDOFF.md`, step 3).

### vidIQ MCP connector

`.mcp.json` wires up a project-scoped vidIQ MCP server
(`https://mcp.vidiq.com/mcp`), authenticated via `${VIDIQ_TOKEN}`. It backs
the vidIQ research calls referenced in `youtube-seo/vidiq-prompts.md` and the
`channel-analyzer` skill. Treat it like any other connector per the
session-start rule above — don't claim vidIQ research is "done" if the
connector or credits are unavailable; say so.

> **Important:** Keep this file honest. When real code, tooling, or conventions
> are added, update the sections below to describe them. Do not document
> aspirational structure that isn't actually present.

## Repository & branch conventions

- Remote: `origin` → `https://github.com/mancaf779-boop/-Max-Geld-Generation-`
- Default branch: `main`
- Active development branch: `claude/claude-md-docs-xhgzs6`

Development workflow:

1. **Start every new change on a FRESH branch off `main`** — never reuse a
   merged branch. Use the helper:

   ```bash
   scripts/new-branch.sh <branch-name>   # or no name -> claude/change-<date>
   ```

   It refuses to run on a dirty working tree, fetches `origin/main`, and
   branches from it. (A merged pull request is finished; new work never stacks
   on top of merged history.)
2. Do work on that branch, not on `main`.
3. Commit with clear, descriptive messages.
4. Push with `git push -u origin <branch-name>`.
5. Open a pull request only when explicitly requested.

## Commands

- Install: `npm install`
- One-time OAuth login + test report: `npm run yt:login` (= `node youtube-analytics.js`)
- Smoke-check the CLI across credential states: `.claude/skills/run-max-geld-generation/smoke.sh`
- Non-interactive 28-day analytics summary: see `.claude/skills/youtube-analytics-summary/`
- Website screenshot/regression check: `node .claude/skills/design-website/shot.mjs out/design-check`
- Produce a video from a script: `.claude/skills/produce-video/produce.sh` (see the skill's SKILL.md
  for the three drivers and their trade-offs)

Still to establish:

- [ ] Test suite and test command.
- [ ] Linting/formatting configuration.
- [ ] CI workflow under `.github/workflows/`.
- [ ] Expand `README.md` beyond the placeholder title.
- [ ] Complete the YouTube login (blocked on the user — see `HANDOFF.md` step 1).
- [ ] Take the website live on GoDaddy (blocked on user info — see `HANDOFF.md` step 2).
- [ ] Build upload automation and daily-run scheduling (see `HANDOFF.md` steps 3–4).

## Working phases (user-established convention)

Feature work follows a **Writer → Reviewer → Debugger** phase split (see
`HANDOFF.md`): Writer implements without committing and lists files + a short
rationale (no self-grading); Reviewer works from a fresh context on the diff
only and reports structured findings (Bug/Security/Style/Other); Debugger
(fresh context) fixes findings and verifies by actually running the code.
The orchestrator then summarizes and commits. Skills should document only
commands that were actually run and verified — no aspirational instructions.

## Conventions for AI assistants

- **Verify before you rely.** Check for the existence of files, scripts, and
  tooling before invoking them, and read the relevant `SKILL.md` before using
  a skill's driver script.
- **Match what's there.** Follow the established naming, formatting, and
  structural patterns (German-language content docs, English SKILL.md
  frontmatter) rather than introducing new ones.
- **Keep documentation current.** Any structural change (new directories, new
  build steps, new conventions) should be reflected in this file in the same
  change.
- **Ask when scope is ambiguous.** Confirm intent before making large
  architectural decisions or spending vidIQ credits.
- **Secrets stay out of git and out of chat.** Never print the contents of
  `client_secret.json`, `token.json`, or the `.{elevenlabs,vidiq,azure-speech}.env`
  files.
