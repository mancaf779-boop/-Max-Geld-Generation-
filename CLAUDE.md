# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## Current state of the repository

This repository is a **freshly initialized scaffold**. As of the last update to
this file, it contains only:

```
.
├── README.md   # single-line title placeholder
└── CLAUDE.md   # this file
```

There is **no application code, build system, dependency manifest, test suite,
or CI configuration yet**. Do not assume any framework, language, or tooling is
in place — none has been chosen. When you are asked to "run the build," "run the
tests," or "follow existing conventions," first confirm those things exist; at
present they do not.

> **Important:** Keep this file honest. When real code, tooling, or conventions
> are added, update the sections below to describe them. Do not document
> aspirational structure that isn't actually present.

## Project intent

The name **"Max Geld Generation"** ("maximum money generation" in German)
suggests the project is intended to grow into a finance/earnings-related
application. This is inferred from the name only — the concrete scope, stack, and
architecture have not yet been defined. Confirm the intended direction with the
user before scaffolding a specific technology stack.

## Repository & branch conventions

- Remote: `origin` → `https://github.com/mancaf779-boop/-Max-Geld-Generation-`
- Default branch: `main`
- Active development branch: `claude/claude-md-docs-tpypde`

Development workflow:

1. Do work on the designated feature branch, not on `main`.
2. Commit with clear, descriptive messages.
3. Push with `git push -u origin <branch-name>`.
4. Open a pull request only when explicitly requested.

## Getting started (once a stack is chosen)

When the project's technology is decided, this section should be filled in with
the real commands. Until then, use it as a checklist of what to establish:

- [ ] Choose a language/runtime and add its manifest (e.g. `package.json`,
      `pyproject.toml`, `go.mod`).
- [ ] Define install / build / run / test commands and document them here.
- [ ] Add linting/formatting configuration and document how to run it.
- [ ] Add a CI workflow under `.github/workflows/`.
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
