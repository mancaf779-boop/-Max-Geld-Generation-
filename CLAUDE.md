# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## Current state of the repository

The project is a **Node.js (CommonJS) integration with the YouTube Data and
YouTube Analytics APIs**. Current layout:

```
.
├── README.md             # single-line title placeholder
├── CLAUDE.md             # this file
├── package.json          # Node manifest; dependency: googleapis; engines: node >= 18
├── .gitignore            # excludes node_modules/, out/, client_secret.json, token.json
├── youtube-auth.js       # OAuth2 helpers (loopback login + token-only loader)
├── youtube-analytics.js  # CLI: one-time login + 28-day channel report
├── website/index.html    # channel landing page (self-contained; GoDaddy upload)
└── .claude/skills/
    ├── run-max-geld-generation/  # smoke.sh: launch CLI, verify auth error paths
    ├── produce-video/            # produce.sh: script text -> TTS audio, thumbnail,
    │                             # 16:9 video, 9:16 Short (ffmpeg + espeak-ng)
    └── design-website/           # shot.mjs: brand tokens + responsive screenshot
                                  # checks (playwright-core device emulation)
```

There is **no test suite, linting, or CI configuration yet**. A Next.js
frontend is planned (see `getAuthedClientOrThrow` in `youtube-auth.js`) but not
present.

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
Never commit them and never print their contents into logs or PRs.

The report window is 28 days (start and end date are both inclusive in the
YouTube Analytics API) ending two days ago, because Analytics data lags by
roughly 48 hours.

OAuth scopes are read-only: `yt-analytics.readonly` and `youtube.readonly`.
Monetary metrics (e.g. `estimatedRevenue`) would additionally require the
`yt-analytics-monetary.readonly` scope and a re-login.

> **Important:** Keep this file honest. When real code, tooling, or conventions
> are added, update the sections below to describe them. Do not document
> aspirational structure that isn't actually present.

## Project intent

The name **"Max Geld Generation"** ("maximum money generation" in German)
points at an earnings/analytics application. The first concrete slice is a
YouTube-channel analytics integration: authenticate once via OAuth on the CLI,
then let application code (eventually a Next.js app) query the YouTube
Analytics API with the stored token.

## Repository & branch conventions

- Remote: `origin` → `https://github.com/mancaf779-boop/Max-Geld-Generation`
- Default branch: `main`
- Active development branch: `claude/claude-md-docs-tpypde`

Development workflow:

1. Do work on the designated feature branch, not on `main`.
2. Commit with clear, descriptive messages.
3. Push with `git push -u origin <branch-name>`.
4. Open a pull request only when explicitly requested.

## Commands

- Install: `npm install`
- One-time OAuth login + test report: `npm run yt:login`

Still to establish:

- [ ] Test suite and test command.
- [ ] Linting/formatting configuration.
- [ ] CI workflow under `.github/workflows/`.
- [ ] Expand `README.md` beyond the placeholder title.

## Conventions for AI assistants

- **Verify before you rely.** Because the repo is nearly empty, check for the
  existence of files, scripts, and tooling before invoking them.
- **Match what's there.** As code accumulates, follow the established naming,
  formatting, and structural patterns rather than introducing new ones.
- **Keep documentation current.** Any structural change (new directories, new
  build steps, new conventions) should be reflected in this file in the same
  change.
- **Ask when scope is ambiguous.** The project's direction is not yet fixed;
  confirm intent before making large architectural decisions.
