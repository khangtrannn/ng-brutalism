# Release Plan — `@ng-brutalism/ui` v0.1.0

Canonical release plan for the first public release.

This is the single source of truth for v0.1.0 planning, execution order,
verification, publishing, and post-publish work.

Current date: 2026-05-20.

---

## 1. Release Contract

- Package: `@ng-brutalism/ui`.
- Version: direct `0.1.0`. No RC dist-tag.
- License: MIT.
- Audience: Angular developers building neo-brutalist applications.
- Compatibility: Angular 21 only for v0.1.0.
- Consumer requirement: Angular 21 + Tailwind CSS v4.
- Stability: pre-1.0, experimental but usable. Minor versions may include
  breaking changes while the library settles.
- Publishing account: npm org/scope `ng-brutalism` already exists. Publish
  setup only needs login and membership verification.
- GitHub repo: `khangtrannn/ng-brutalism`.
- Docs URL: `https://ngbrutalism.khangtran.dev`.
- Docs hosting: GitHub Pages with static prerendering, not SSR runtime.

Package description:

```text
A neo-brutalist Angular component library — Signals • Zoneless • Token-based • Tailwind v4.
```

---

## 2. Locked Decisions

### 2.1 Public API

- Use suffixless Angular names publicly and in source:
  `NbSelect`, `NbDialog`, `NbCard`, etc.
- Do not keep `*Component` as primary implementation class names.
- Clean up `*.component.*` library filenames and test fixture names where
  practical so the codebase follows the same convention end-to-end.
- Root TypeScript import only for v0.1.0:

  ```ts
  import { NbButton } from '@ng-brutalism/ui';
  ```

- Do not add per-component secondary entrypoints for v0.1.0.
- Reserve `NbSelect` / `<nb-select>` for the custom select component.
- Rename the native select directive to `NbNativeSelect` with selector
  `select[nbNativeSelect]`.
- Remove/hide `NB_DENSITY` and `NbDensity` from the v0.1.0 public API.
- Remove the one-value `NbSelectSize = 'default'` public API and any
  corresponding `size` input.
- Keep `provideNgBrutalism()` in v0.1.0 as a **real, narrow, optional** API —
  not a reserved no-op. CSS custom properties remain the **primary** theming
  path; the provider is an alternative for callers who want to configure the
  same `--nb-*` variables from TypeScript at bootstrap (e.g. server-driven or
  env-aware theme values).
- Locked public surface for the provider in v0.1.0 — exported from
  `@ng-brutalism/ui` root, no additions:
  - `provideNgBrutalism(config?: NbConfig): EnvironmentProviders`
  - `NbConfig` (currently `{ theme?: NbThemeConfig }`)
  - `NB_THEME_CONFIG` (injection token)
  - `NbThemeConfig` (type with keys `primary`, `secondary`, `accent`, `danger`,
    `success`, `warning`, `radius`, `borderWidth`, `shadowOffsetX`,
    `shadowOffsetY`, `fontSans`, `fontMono`)
- Behavior is browser-only (no-ops during SSR). Do **not** broaden the API in
  v0.1.0 — no `prefix`, no overlay-container option, no per-component config.
  These belong in v0.2 if requested.
- Locked install snippet for `provideNgBrutalism()` — use this exact form in
  both the root README and `libs/ui/README.md`, after the minimal usage block.
  Do not invent additional options:

  ```ts
  // Optional: configure a subset of theme tokens from TypeScript at bootstrap.
  // Sets the corresponding `--nb-*` custom properties for these keys.
  // Tokens outside NbThemeConfig (e.g. --nb-background, --nb-field-bg) must
  // still be overridden in CSS.
  import { provideNgBrutalism } from '@ng-brutalism/ui';

  bootstrapApplication(AppComponent, {
    providers: [
      provideNgBrutalism({
        theme: {
          primary: '#ffd166',
          radius: '4px',
          borderWidth: '3px',
        },
      }),
    ],
  });
  ```

### 2.2 CSS

- Keep both `styles.css` and `theme.css`.
- Make `styles.css` include the default theme so first-time users need one CSS
  import.
- Keep `theme.css` as a direct advanced/token entrypoint.
- `--nb-yellow`, `--nb-mint`, `--nb-pink`, and `--nb-lavender` are docs-brand
  tokens only. Do not add them to `libs/ui/src/lib/styles/theme.css`.
- Copy-pastable docs snippets must use shipped semantic tokens such as
  `--nb-warning`, `--nb-success`, and `--nb-accent`.

### 2.3 Package Metadata

Use this package metadata in `libs/ui/package.json`:

```json
{
  "version": "0.1.0",
  "description": "A neo-brutalist Angular component library — Signals • Zoneless • Token-based • Tailwind v4.",
  "license": "MIT",
  "author": "Khang Tran <khangtrann8198@gmail.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/khangtrannn/ng-brutalism.git"
  },
  "homepage": "https://ngbrutalism.khangtran.dev",
  "bugs": {
    "url": "https://github.com/khangtrannn/ng-brutalism/issues"
  },
  "keywords": [
    "angular",
    "ui",
    "ui-library",
    "components",
    "neo-brutalism",
    "brutalism",
    "tailwind",
    "tailwindcss",
    "signals",
    "zoneless",
    "design-system"
  ],
  "peerDependencies": {
    "@angular/common": "^21.0.0",
    "@angular/core": "^21.0.0",
    "tailwindcss": "^4.0.0"
  },
  "engines": {
    "node": "^20.19.0 || ^22.12.0"
  }
}
```

The `engines.node` range mirrors Angular 21's own LTS support matrix exactly.
Do **not** invent a different range. Do **not** set `engine-strict` — npm should
warn, not error.

In `exports["."]`, remove the stale conditions:

```diff
- "esm2022": "./esm2022/ng-neo-brutalism-ui.mjs",
- "esm": "./esm2022/ng-neo-brutalism-ui.mjs",
```

Keep the `default` fesm2022 and `types` entries.

Do not add `@angular/forms` as a peer dependency for v0.1.0. The library does
not currently import Angular forms APIs or document form-control integration.
Revisit if a shipped component imports `@angular/forms`, implements
`ControlValueAccessor`, or documents `ngModel` / reactive forms usage.

### 2.4 Package Contents

Use a `files` whitelist in `libs/ui/package.json`:

```json
"files": [
  "fesm2022/",
  "types/",
  "*.css",
  "README.md",
  "CHANGELOG.md",
  "LICENSE",
  "package.json"
]
```

Ship only:

- runtime bundles
- type declarations
- published CSS entrypoints
- `README.md`
- `CHANGELOG.md`
- `LICENSE`
- `package.json`

Also ship sourcemaps. They cost ~110 KB unpacked and meaningfully improve
consumer debugging experience when an exception lands inside the library. The
`"fesm2022/"` glob in the whitelist above captures both `*.mjs` and `*.mjs.map`
intentionally — do not narrow it.

Do not ship:

- source `.ts` files, except `.d.ts`
- `TOKENS.md`
- `TOKENS-ROLLOUT.md`
- planning docs
- `node_modules`

Verify with `npm publish --dry-run`.

### 2.5 README And Assets

- Root README becomes public-facing pitch copy.
- Monorepo commands and contributor workflow move to `CONTRIBUTING.md`.
- Keep the canonical package-description sentence exactly:

  ```text
  A neo-brutalist Angular component library — Signals • Zoneless • Token-based • Tailwind v4.
  ```

- Use exactly these four README badges, in this order, in **both** the root
  README and `libs/ui/README.md`. No extras (no bundlephobia, no
  "made with Tailwind", no Angular-version badge) for v0.1.0:

  ```md
  [![npm version](https://img.shields.io/npm/v/@ng-brutalism/ui.svg)](https://www.npmjs.com/package/@ng-brutalism/ui)
  [![npm downloads](https://img.shields.io/npm/dm/@ng-brutalism/ui.svg)](https://www.npmjs.com/package/@ng-brutalism/ui)
  [![CI](https://github.com/khangtrannn/ng-brutalism/actions/workflows/ci.yml/badge.svg)](https://github.com/khangtrannn/ng-brutalism/actions/workflows/ci.yml)
  [![license](https://img.shields.io/npm/l/@ng-brutalism/ui.svg)](https://github.com/khangtrannn/ng-brutalism/blob/main/LICENSE)
  ```

  Notes:
  - The CI badge URL depends on the **workflow filename** `ci.yml`, not the
    workflow's `name:` field. Keep §2.8's `.github/workflows/ci.yml` filename
    in sync with this badge URL.
  - The license badge reads `package.json`'s `license` field, so the LICENSE
    file and `package.json` license must stay aligned (§2.3 already locks
    `MIT`).
  - The downloads badge will read `0` / `—` for the first ~24h. That's
    expected and acceptable.
- Use a navigation row:

  ```md
  [Documentation](https://ngbrutalism.khangtran.dev) ·
  [npm](https://www.npmjs.com/package/@ng-brutalism/ui) ·
  [GitHub](https://github.com/khangtrannn/ng-brutalism)
  ```

- Top README visual: optimized GIF of the Image Card docs page.
- Portfolio screenshot: one extra image under `## What it looks like`.
- Target asset paths:
  - `docs/assets/image-card-demo.gif`, under 2 MB
  - `docs/assets/showcase-portfolio.png`, under 300 KB
- Binaries live **once** at the paths above. Do not duplicate them into
  `libs/ui/` and do not ship them in the npm tarball.
- Root `README.md` (GitHub-facing) references the assets with **relative**
  paths: `docs/assets/image-card-demo.gif`.
- `libs/ui/README.md` (npm-facing) references the **same** assets with
  **absolute raw GitHub URLs pinned to `main`** so npm.com renders them:

  ```md
  ![demo](https://raw.githubusercontent.com/khangtrannn/ng-brutalism/main/docs/assets/image-card-demo.gif)
  ![showcase](https://raw.githubusercontent.com/khangtrannn/ng-brutalism/main/docs/assets/showcase-portfolio.png)
  ```

  Trade-off accepted: if the repo is renamed or made private, old npm
  versions' README images break. Solo/public repo makes this acceptable for
  v0.1.0; tag-pinned URLs can be revisited later.
- Do not use MP4 for the README hero; npm pages do not reliably render it.
- Raw planning assets may exist elsewhere in the repo. During the README/content
  pass, optimize or replace them and commit the final files under `docs/assets/`.

### 2.5.1 Asset Optimization Policy

Locked: optimize the existing GIF/PNG in place. Do **not** re-record or
re-screenshot for v0.1.0.

Toolchain:

- GIF: `gifsicle -O3 --lossy=80 --colors 128` first; if still over budget, also
  try `ffmpeg` with `palettegen` / `paletteuse` at the same dimensions.
- PNG: `oxipng -o max --strip safe`, then `pngquant --quality=70-90` if still
  over budget.

Budget policy — optimize first, then relax if best-effort can't hit the target
without re-recording:

- GIF target: **≤ 2 MB**. Hard cap: **5 MB**. If optimization can't beat 5 MB
  without re-recording, stop and revisit; do not ship a GIF larger than 5 MB.
- PNG target: **≤ 300 KB**. Hard cap: **600 KB**. The PNG is a marketing
  screenshot loaded once on the README, so relaxing it is acceptable.

Single-format only for v0.1.0: GIF on both root README and npm README; PNG on
both. Do not introduce MP4 / WebP / AVIF variants to avoid GitHub/npm
divergence. Revisit in v0.2 if asset weight becomes a complaint.

Commit the final, optimized files to `docs/assets/` per §2.5. After the
optimized assets are committed under `docs/assets/`, **delete** the entire
`apps/docs/public/showcase/release/` directory in the same Pass 2 commit. It
was a staging location; two copies of the same binaries in two places is drift
we'll regret. This step is required, not optional.

### 2.6 Docs Site

- Deploy static prerendered docs to GitHub Pages.
- Add `apps/docs/public/CNAME` with:

  ```text
  ngbrutalism.khangtran.dev
  ```

- Cloudflare DNS: `ngbrutalism` CNAME to `khangtrannn.github.io`, proxy off
  (grey cloud), or GitHub certificate issuance can fail.
- GitHub Pages setting: source = GitHub Actions.
- No SPA fallback hack for v0.1.0. Direct routes should prerender.
- Hardcode the full prerender route list for v0.1.0:

  ```ts
  const prerenderRoutes = [
    '/',
    '/components',
    '/components/accordion',
    '/components/avatar',
    '/components/badge',
    '/components/button',
    '/components/card',
    '/components/checkbox',
    '/components/dialog',
    '/components/image-card',
    '/components/input',
    '/components/input-group',
    '/components/label',
    '/components/marquee',
    '/components/select',
    '/components/textarea',
    '/components/title',
    '/docs',
    '/docs/introduction',
    '/docs/installation',
    '/docs/accordion',
    '/docs/avatar',
    '/docs/badge',
    '/docs/button',
    '/docs/card',
    '/docs/checkbox',
    '/docs/dialog',
    '/docs/image-card',
    '/docs/input',
    '/docs/input-group',
    '/docs/label',
    '/docs/marquee',
    '/docs/select',
    '/docs/textarea',
    '/docs/title',
    '/showcase/portfolio',
  ];
  ```

### 2.7 Docs Quality

Before publish, every component page must have:

- one-line description
- runnable preview
- copy-paste snippet
- accurate API table

The installation page must state the consumer environment requirements in one
visible line near the top:

> Requires Node 20.19+ or 22.12+, Angular 21, and Tailwind CSS v4.

Same line should appear in the README install section.

Baseline accessibility before publish:

- obvious semantic, ARIA, keyboard, focus, label, alt-text, and disabled-state
  issues fixed in core interactive components and examples
- exhaustive WCAG audits and per-component accessibility docs deferred

### 2.8 CI / CD

Add two workflows for v0.1.0.

**`.github/workflows/ci.yml`** — pull requests and manual dispatch:

- Workflow `name: CI` and job id `verify`. This pins the required status
  check name to `CI / verify`, which §2.9 references in branch protection.
  Do not rename either without updating §2.9.
- Steps in order:
  1. `actions/checkout@v4` with `fetch-depth: 0`
  2. `pnpm/action-setup@v4`
  3. `actions/setup-node@v4` with Node 22 and pnpm cache
  4. `nrwl/nx-set-shas@v4` — sets `NX_BASE` / `NX_HEAD` so `nx affected`
     resolves the PR base correctly. Do NOT pass `--base=origin/main`
     explicitly; that ref is not reliably available on PR runners.
  5. `actions/cache@v4` for the Nx local cache (`.nx/cache`), keyed on
     `pnpm-lock.yaml`. No Nx Cloud for v0.1.0 (extra signup, no
     cache-sharing benefit while solo).
  6. `pnpm install --frozen-lockfile`
  7. `pnpm nx affected -t lint test build`

**`.github/workflows/deploy-docs.yml`** — push to `main` and manual dispatch:

- Same setup steps (checkout, pnpm, node, install).
- `pnpm nx run-many -t lint test --projects=ui,docs`
- `pnpm nx build docs --configuration=production`
- Deploy `dist/apps/docs/client` to GitHub Pages.

No `release.yml`, Dependabot, Changesets, or release automation for v0.1.0.

### 2.9 Branch Protection

Branch protection is flipped after v0.1.0 publishes:

- require pull request before merging
- require status check `CI / verify` (this name comes from §2.8: workflow
  `name: CI` + job id `verify`; keep both in sync)
- no required approvals while solo
- no required linear history
- do not include administrators

The v0.1.0 prep itself can ship via direct commits to `main`.

### 2.10 Announcement

Post copy is written by the maintainer at publish time, not pre-drafted in the
plan. What the plan locks: **channel order, post shape, and a small don'ts
list**, so day-of-publish work is fill-in-the-blanks, not redesign.

Ordering:

- Publish first, then verify `npm view @ng-brutalism/ui` shows `latest: 0.1.0`.
- Run/confirm the local consume smoke test before posting.
- First announcement channel: LinkedIn.
- Within 48h: r/angular, dev.to long-form, X/Twitter short.
- Skip Hacker News for v0.1.0.

Per-channel shape:

- **LinkedIn** (hero post — longest, professional tone): hook → why it exists
  → one-paragraph capability summary → install line → one link to docs →
  one image. Target 150–220 words. Use the portfolio PNG, not the GIF
  (LinkedIn auto-pauses GIFs).
- **r/angular**: locked title pattern:
  `Show: @ng-brutalism/ui — a neo-brutalist Angular component library (Signals, Zoneless, Tailwind v4)`.
  Body ~200 words. One link to docs. "Show" flair. Be prepared for critique;
  do not delete posts on negative comments.
- **dev.to long-form**: 800–1200 words, "why I built this" framing, code
  samples from the README, embed the GIF (dev.to renders it). End with v0.x
  status and an invite to file issues.
- **X/Twitter**: ≤240 chars, one image (a static frame of the GIF), one link
  to docs. No thread for v0.1.0.

Don'ts — applies to all channels:

- No "1.0 quality" / "production ready" / "battle tested" language anywhere.
  Pre-1.0 status must read clearly.
- No comparison framing ("better than X library"). The brutalist styling is
  the differentiator, not a fight.
- No engagement-bait questions ("what should I build next?"). Launch day, not
  a poll.
- No paid promotion, no cross-posting bots.

Hard rule: **if docs site is down or `npm view` shows the wrong version at
announce time, postpone the entire announcement.** Do not announce around a
broken artifact.

---

## 3. Reality Check

Already done or user-confirmed:

- GitHub repo renamed to `khangtrannn/ng-brutalism`.
- npm org/scope `ng-brutalism` exists.
- Package name `@ng-brutalism/ui` was verified unused/reserved on npm
  on 2026-05-17.
- Workspace migrated to Angular 21 + zoneless.
- `libs/ui/README.md` is no longer the default Nx stub.
- Density tokens have already been removed from source.
- Native select rename to `NbNativeSelect` appears to be done.
- `NbDialogComponent` public alias appears to be dropped.
- `NbSelectSize` appears to be removed.
- Input-group internals appear to be hidden.
- Card docs selectors appear to be corrected to `nb-card*`.
- Static docs/API audit already exists in `PRE_RELEASE_AUDIT.md`.
  All original findings are marked resolved as of 2026-05-20.

Still verify these during build/smoke instead of blindly editing them again.
Do not rerun the full static audit for v0.1.0 unless later edits reopen docs/API
drift; use the normal build, docs smoke, and local consume smoke tests instead.

### 3.1 Pre-Pass-1 Drift Check

Run this checklist before starting Pass 1. Each command MUST return zero
matches; if any returns a hit, that "appears to be done" item is not actually
done — pause and fix before continuing.

```sh
grep -rE "\bNbDensity\b|\bNB_DENSITY\b" libs/ui/src/
grep -rE "\bNbSelectSize\b" libs/ui/src/
grep -rE "NbDialogComponent" libs/ui/src/
grep -rE "\*Component\b" libs/ui/src/lib/
grep -E "export" libs/ui/src/index.ts | grep -iE "density|selectsize"
grep -E "^export" libs/ui/src/index.ts | grep -E "\bNb[A-Z][A-Za-z]*Component\b"
```

The last grep catches `*Component` names leaking through the public barrel
(`libs/ui/src/index.ts`) even when the implementation class has been renamed
internally. Known offender as of plan-writing time: `NbSelectComponent` —
must be renamed to `NbSelect` before Pass 1 verification.

This is a binary gate, not a full audit. Deeper API surface verification is
deferred to §6.4 (local consume smoke test) and v0.2.

---

## 4. Pass 1 — Release Plumbing

Do this pass first. Keep it mechanical. Do not draft public copy unless a tiny
placeholder is needed to keep builds/package output working.

### 4.0 Pre-flight

Run **before** any Pass 1 edits. This is a binary gate: every command below
must return zero matches. If any returns a hit, the corresponding §3
"appears to be done" item is not actually done — pause and fix before
continuing.

First, the full §3.1 drift check:

```sh
grep -rE "\bNbDensity\b|\bNB_DENSITY\b" libs/ui/src/
grep -rE "\bNbSelectSize\b" libs/ui/src/
grep -rE "NbDialogComponent" libs/ui/src/
grep -rE "\*Component\b" libs/ui/src/lib/
grep -E "export" libs/ui/src/index.ts | grep -iE "density|selectsize"
grep -E "^export" libs/ui/src/index.ts | grep -E "\bNb[A-Z][A-Za-z]*Component\b"
```

Then three extra sanity scans for the un-grep-able §3 items:

```sh
# libs/ui/README.md is not the Nx stub:
head -5 libs/ui/README.md   # must not contain "This library was generated with"

# Input-group internals not in public barrel:
grep -E "^export" libs/ui/src/index.ts | grep -iE "internal|host|state"

# Card docs selectors use nb-card*:
grep -nE "<(nb-)?card" apps/docs/src/app/pages/docs/card.page.ts
```

This is still a gate, not a re-audit. Deeper API verification is deferred to
§6.4 (local consume smoke). Fix hits in place, then continue to §4.1.

### 4.1 Package

- Update `libs/ui/package.json`:
  - version `0.1.0`
  - description/license/author/repository/homepage/bugs/keywords
  - peer dependency `tailwindcss: ^4.0.0`
  - `files` whitelist
  - include `CHANGELOG.md` in the `files` whitelist
  - remove stale `esm2022` and `esm` export conditions
- Keep `sideEffects` for CSS.
- Add MIT `LICENSE` at repo root.
  - Use SPDX canonical MIT text.
  - Copyright line: `Copyright (c) 2026 Khang Tran` (no email; `author` field
    in `package.json` already carries it).
- Configure `libs/ui/ng-package.json` so `LICENSE` is copied to `dist/ui/`
  via the existing `assets` array (same mechanism as the CSS copy):

  ```json
  "assets": [
    { "glob": "*.css", "input": "src/lib/styles", "output": "." },
    { "glob": "LICENSE", "input": "../../", "output": "." }
  ]
  ```

- Ensure `dist/ui/package.json` has no dead export paths after build.
- **Do not refactor or remove** `libs/ui/src/lib/styles/styles.css`'s leading
  `@import './theme.css';`. The one-import promise in §2.2 depends on it.
  Verify with `head -2 libs/ui/src/lib/styles/styles.css` (must contain the
  import) before and after any styles touch.

### 4.2 Docs Hosting

- Expand `apps/docs/vite.config.ts` prerender route list.
- Add `apps/docs/public/CNAME`.
- Confirm docs build emits static output in `dist/apps/docs/client` suitable for
  GitHub Pages.

### 4.3 GitHub Actions

- Add `.github/workflows/ci.yml`.
- Add `.github/workflows/deploy-docs.yml`.
- Use Node 22, pnpm, checkout `fetch-depth: 0`.

### 4.4 Repo Hygiene

- Remove checked-in `.DS_Store` files.
- Add `.DS_Store` to `.gitignore` if absent.
- Move completed audit docs to `docs/plans/_archive/`:
  - `PRE_RELEASE_AUDIT_PLAN.md`
  - `PRE_RELEASE_AUDIT.md`
- Update `RELEASE_PLAN.md` references to the archived audit paths when moving
  those files.
- Remove dormant Changesets setup:
  - delete the root `release` script that runs `changeset publish`
  - remove `@changesets/cli` from dev dependencies
  - delete `.changeset/config.json`
  - update the lockfile through the package manager
- Reintroduce Changesets from scratch in v0.2 if release automation is adopted.
- Move planning docs to `docs/plans/_archive/` after this canonical plan is no
  longer needed at root.
- Move the library-local planning docs to `docs/plans/_archive/` in Pass 1:
  - `libs/ui/TOKENS.md`
  - `libs/ui/TOKENS-ROLLOUT.md`
  These are planning docs by content. Keeping them next to public source
  signals "still planning." The §2.4 `files` whitelist already keeps them out
  of the tarball; the move keeps them out of casual repo browsing too.
- Leave `docs/adr/` alone. ADRs are durable, versioned-with-the-code
  architectural records, not planning docs — they are not archive material.
- Final Pass 1 sweep for accidentally-committed editor/IDE cruft. Zero matches
  required:

  ```sh
  git ls-files | grep -E '\.(DS_Store|swp|swo)$|/\.idea/|/\.vscode/'
  ```

  Any hits: remove the offender (and the `.vscode/settings.json` exception, if
  intentional, must be explicitly retained — re-add by name after the sweep).
- Keep `RELEASE_PLAN.md` at root until v0.1.0 publishes.

### 4.5 Pass 1 Verification

Run:

```sh
pnpm nx run-many -t lint test build --projects=ui,docs
```

If it fails, fix source/config and rerun until green or document the blocker.

---

## 5. Pass 2 — Public Content

### 5.1 Root README

Rewrite root README as public-facing package README. The full locked template:

````md
# @ng-brutalism/ui

A neo-brutalist Angular component library — Signals • Zoneless • Token-based • Tailwind v4.

<!-- badges block from §2.5 -->

[Documentation](https://ngbrutalism.khangtran.dev) ·
[npm](https://www.npmjs.com/package/@ng-brutalism/ui) ·
[GitHub](https://github.com/khangtrannn/ng-brutalism)

![demo](docs/assets/image-card-demo.gif)

## Install

Requires Node 20.19+ or 22.12+, Angular 21, and Tailwind CSS v4.

```sh
pnpm add @ng-brutalism/ui
```

Import the styles once in your global CSS:

```css
@import '@ng-brutalism/ui/styles.css';
```

Use a component:

```ts
import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-root',
  imports: [NbButton],
  template: `<button nbButton>Click</button>`,
})
export class AppComponent {}
```

Optional — configure theme tokens from TypeScript at bootstrap (see §2.1 for
the exact snippet; same block used here).

[Full installation guide →](https://ngbrutalism.khangtran.dev/docs/installation)

## What it looks like

![showcase](docs/assets/showcase-portfolio.png)

## Status

`@ng-brutalism/ui` is pre-1.0. The component APIs are usable today, but minor
versions may include breaking changes while the library settles.

## License

MIT
````

Notes:

- Inline the full §2.5 badge block under the title; do not leave a placeholder
  comment in the shipped file.
- Inline the full §2.1 `provideNgBrutalism()` snippet where the "Optional"
  line points; do not replace it with a §2.1 reference in the shipped file.
- Component example uses `NbButton` because it's the simplest possible "did
  the install work" check. Do not expand to multi-component examples here —
  that's the docs site's job.

### 5.2 `libs/ui/README.md`

This file is what npm.com displays as the package page. Keep it
package-consumer focused, but include the hero GIF and portfolio screenshot
(see §2.5 for the raw GitHub URL form). Sections:

- title + tagline (same canonical sentence as root README)
- nav row (Documentation · npm · GitHub)
- hero GIF (raw GitHub URL, pinned to `main`)
- install
- one CSS import
- minimal component usage
- optional provider
- "What it looks like" with the portfolio screenshot (raw GitHub URL)
- docs URL
- v0.x status
- license

### 5.3 CONTRIBUTING

Create `CONTRIBUTING.md`. Tight scope, ~80 lines, six sections in this order
— do not add design philosophy, accessibility checklists, component
conventions, release process, or security policy:

**1. Preamble (one sentence)**

> This is a solo project; PRs are welcome but expect a slow turnaround.

**2. Prerequisites**

Node 20.19+ or 22.12+, pnpm 9+.

**3. Common commands** — exactly these four, no more:

```sh
pnpm install
pnpm nx serve docs
pnpm nx run-many -t lint test build --projects=ui,docs
pnpm nx affected -t lint test build
```

No `nx graph`, no `nx migrate`, no per-component watch. Keep it boring.

**4. Where things live** — six bullets max:

- `libs/ui/src/lib/` — components
- `apps/docs/` — docs site
- `docs/adr/` — architectural decisions
- `docs/plans/_archive/` — historical plans
- `docs/assets/` — README binaries
- `.github/workflows/` — CI

**5. Submitting changes** — exactly these six bullets:

- Open an issue first for non-trivial changes
- Keep PRs focused: one component or one fix per PR
- Run `pnpm nx affected -t lint test build` locally before pushing
- Conventional Commits welcomed but not required
- No requirement on PR description format
- I review when I can; not every PR will land

**6. Conduct** — use this exact text:

```md
Be kind, specific, and constructive. This project is early; clear bug
reports, focused pull requests, and respectful design feedback are welcome.
```

Do not add a separate `CODE_OF_CONDUCT.md` for v0.1.0.

### 5.4 CHANGELOG

Create `CHANGELOG.md` using Keep a Changelog style.

For v0.1.0:

- date it (`## [0.1.0] — <publish-date>`)
- enumerate components grouped by category — exact categories and order below
- include foundation/theming notes
- mention pre-1.0 status
- write it so it can be reused as GitHub release notes

Locked category structure, order, and component placement. Components are
listed alphabetically inside each category:

```md
### Added

**Form controls**
- `NbButton`
- `NbCheckbox`
- `NbInput`
- `NbInputGroup`
- `NbLabel`
- `NbNativeSelect` (directive on native `<select>`)
- `NbSelect` (custom select component)
- `NbTextarea`

**Layout & content**
- `NbAccordion`
- `NbAvatar`
- `NbBadge`
- `NbCard`
- `NbImageCard`
- `NbMarquee`
- `NbTitle`

**Overlays**
- `NbDialog`

**Foundation**
- MIT license, Angular 21 + Tailwind v4 peer dependencies
- `styles.css` single-import entrypoint (default theme)
- `theme.css` token-only entrypoint for advanced theming
- Optional `provideNgBrutalism()` provider
- CSS custom properties as the primary theming surface

**Notes**
- Pre-1.0: minor versions may include breaking changes while APIs settle.
```

Also create `docs/plans/_archive/RELEASE_NOTES_v0.1.0.md` with only the v0.1.0
release notes copied from the changelog section. Use this file for the GitHub
release so tag notes do not include future changelog sections.

---

## 6. Verification Gate

### 6.1 Clean Build

```sh
rm -rf dist/
pnpm install
pnpm nx build ui --configuration=production
```

Verify:

- `dist/ui/package.json` name is `@ng-brutalism/ui`
- version is `0.1.0`
- no dead `esm2022` / `esm` export paths
- `dist/ui/README.md` exists
- `dist/ui/CHANGELOG.md` exists
- `dist/ui/LICENSE` exists
- `dist/ui/fesm2022/ng-brutalism-ui.mjs` exists
- `dist/ui/types/` exists
- `dist/ui/styles.css` and `dist/ui/theme.css` exist

### 6.2 Lint, Test, Build

```sh
pnpm nx run-many -t lint test build --projects=ui,docs
```

All must pass before publish.

### 6.3 Docs Smoke

- Docs build completes without prerender errors.
- Home / introduction / installation render.
- Every component page renders without runtime errors.
- `/showcase/portfolio` renders.
- Dialog opens/closes.
- Direct navigation to prerendered routes works.

### 6.4 Local Consume Smoke Test

Mandatory before publish. Run **twice** — once on Node 20.19 (the floor locked
in §2.3's `engines.node`) and once on Node 22 (the CI version). Both must pass.
This is the cheapest enforcement of the stated Node floor; CI alone only proves
Node 22.

Each run starts from a clean `/tmp/nb-smoke`:

```sh
rm -rf /tmp/nb-smoke

nvm use 20.19   # or `nvm use 22` for the second pass

pnpm nx build ui --configuration=production
cd dist/ui
npm pack

cd /tmp
pnpm create @angular@21 nb-smoke
cd nb-smoke
pnpm add /Users/khangtrann/ng-brutalism/dist/ui/ng-brutalism-ui-0.1.0.tgz
```

Do **not** pin the Angular point version (`@angular@21`, not `@angular@21.0.0`).
The smoke must reflect what a real new consumer gets from `pnpm create
@angular@21` today; pinning defeats that. If a future 21.x patch breaks the
smoke, fix the library.

Then set up Tailwind v4 using the install docs and verify:

- `import { NbButton } from '@ng-brutalism/ui'` resolves with types
- After `@import '@ng-brutalism/ui/styles.css';` in the consumer's CSS,
  DevTools shows the computed style of `:root` includes
  `--nb-background: #ffffff` (and the rest of the `--nb-*` tokens) — the
  nested `@import './theme.css';` must resolve through `node_modules`
- install produces no missing peer warnings when Tailwind CSS v4 is present
- render at least `NbButton`, `NbCard`, and `NbDialog`
- an intentionally wrong input type produces a TypeScript error
- install docs are sufficient for a new consumer

Anything wrong here means fix, repack, and retest. Do not publish around it.

After both Node versions pass, clean up:

```sh
rm -rf /tmp/nb-smoke
```

No CI automation of the smoke for v0.1.0. The "automated smoke-test script"
work item lives in §8 for v0.2.

### 6.5 Publish Dry Run

```sh
pnpm nx build ui --configuration=production
cd dist/ui
npm publish --dry-run --access public
```

Confirm:

- no source `.ts` files except `.d.ts`
- sourcemaps **are** present (`fesm2022/*.mjs.map`) — see §2.4
- no `node_modules`
- no internal planning docs
- includes `README.md`, `LICENSE`, `package.json`, `fesm2022/`, `types/`,
  `styles.css`, `theme.css`, `CHANGELOG.md`
- packed tarball size is under **75 KB**
- unpacked package size is under **400 KB**

Budgets are set roughly 2× current size (measured on 2026-05-20: 36 KB packed
/ 230 KB unpacked) so a single fat regression — accidental binary asset, source
`.ts` leak, doubled bundle — trips the gate. Looser budgets caught nothing.

If either size budget is exceeded, inspect `npm publish --dry-run` output and
remove accidental files before publishing.

### 6.6 Git State Gate

Before publishing:

```sh
git status --short
git push origin main
```

Required state:

- all release files are committed
- `git status --short` is empty
- `main` is pushed before `npm publish`
- README raw GitHub asset URLs resolve from `main`
- GitHub Pages deploy has completed successfully from `main`
- `https://ngbrutalism.khangtran.dev` loads the release docs
- key direct docs routes work:
  - `/docs/introduction`
  - `/docs/installation`
  - `/components/button`
  - `/components/dialog`
  - `/showcase/portfolio`

Do not publish from an uncommitted, unpushed, failed-docs, pending-docs, or
stale-docs release state.

---

## 7. Publish

Order: **publish first, tag second, GitHub release third.** Nothing public on
the git side until npm `latest: 0.1.0` is verified.

Login and sanity check:

```sh
npm login
npm whoami
npm org ls ng-brutalism
```

The org already exists; do not run `npm org create ng-brutalism` unless
verification proves something is wrong.

Publish npm:

```sh
cd dist/ui
npm publish --access public
```

Verify before doing anything else:

```sh
npm view @ng-brutalism/ui
npm view @ng-brutalism/ui dist-tags
```

Expected: `latest: 0.1.0`.

Only after that verification succeeds, tag and push:

```sh
git tag v0.1.0
git push origin v0.1.0
```

Then create the public GitHub release:

```sh
gh release create v0.1.0 \
  --title "v0.1.0 — Initial release" \
  --notes-file docs/plans/_archive/RELEASE_NOTES_v0.1.0.md
```

### 7.1 Rollback Policy

Treat the `0.1.0` version as **burnable until the git tag is pushed.**

- If `npm publish` fails: do not tag, do not push, diagnose, retry.
- If `npm publish` succeeds but `npm view` shows the wrong dist-tag, wrong
  contents, or anything else looks wrong: **do not tag.** Investigate, and if
  needed `npm unpublish @ng-brutalism/ui@0.1.0` within the 72-hour window, then
  bump to `0.1.1` and restart from §6.
- Do not delete or force-push a tag that has already been pushed to `origin`.
  Once `v0.1.0` is on `origin`, the version is locked; any further fix ships
  as `0.1.1`.

No `npm dist-tag` shuffling, no republishing the same version, no force-push to
delete the tag.

---

## 8. Post-Publish

- Announce on LinkedIn after npm and docs are verified.
- Within 48h: r/angular, dev.to, X/Twitter.
- Enable branch protection on `main`.
- After v0.1.0 is published, docs are verified, and the first announcement is
  posted, move `RELEASE_PLAN.md` to
  `docs/plans/_archive/RELEASE_PLAN_v0.1.0.md`.
- Keep root clean for product/contributor-facing files. Do not archive
  `RELEASE_PLAN.md` before publish; it remains the active source of truth until
  v0.1.0 is complete.
- File v0.2 issues:
  - Dependabot
  - Changesets / release automation
  - automated smoke-test script
  - Sheet / Tooltip / Toast / Skeleton
  - per-component accessibility docs
  - recipe/cookbook pages
  - remaining low-priority audit polish
  - **token-gap audit**: `--nb-dialog-description-fg`, `--nb-dialog-content-bg`,
    `--nb-dialog-actions-bg`, and any other tokens referenced from
    `styles.css` without a definition or fallback in `theme.css`
  - **`NbThemeConfig` coverage expansion**: extend beyond the v0.1.0 12-key
    surface to cover the remaining `theme.css` tokens (`background`,
    `foreground`, `border`, `shadow`, `main*`, `surface*`, `field-bg`,
    `*-foreground` companions, size scale, font weights, focus ring, reverse
    shadow offsets) — additive, non-breaking
  - **install-docs polish**: one-line note on Tailwind v4 layer order
    (`@layer utilities` must come after `@layer base` for utilities to win
    over library defaults)

---

## 9. Anti-Decisions

Do not re-open these for v0.1.0:

- no RC dist-tag
- no GitHub org
- no per-component package entrypoints
- no MP4 README hero
- no `release.yml`
- no Dependabot
- no Changesets
- no branch protection during release prep
- no SSR runtime
- no Cloudflare orange-cloud proxy for docs domain
- no Hacker News launch
- no automated smoke-test script
