# Release Plan — `@ng-brutalism/ui` v0.1.0

Canonical release plan for the first public release.

This is the single source of truth for v0.1.0 planning, execution order,
verification, publishing, and post-publish work.

Current date: 2026-05-20.

---

## 0. Next Session Handoff

Start the next session from **Pass 1 — Release Plumbing** (§4).

Do first:

1. Inspect current git status.
2. Treat this file, `RELEASE_PLAN.md`, as the only release source of truth.
3. Do not restore `RELEASE_DECISIONS.md`; it was intentionally removed to
   avoid two competing plans.
4. Keep Pass 1 mechanical: package metadata, license packaging, docs
   prerendering, CNAME, GitHub Actions, and repo hygiene.
5. Do not rewrite README / CONTRIBUTING / CHANGELOG in Pass 1 unless a tiny
   placeholder is required for a build or package output.
6. After Pass 1, run:

   ```sh
   pnpm nx run-many -t lint test build --projects=ui,docs
   ```

Current workspace state to account for:

- `RELEASE_DECISIONS.md` is deleted by design.
- Raw visual assets were moved during planning to:
  - `apps/docs/public/showcase/release/image-card-demo.gif`
  - `apps/docs/public/showcase/release/showcase-portfolio.png`
- Final README asset targets are still:
  - `docs/assets/image-card-demo.gif`
  - `docs/assets/showcase-portfolio.png`
- The current GIF/PNG are over the final size budget. During Pass 2, optimize
  or replace them before wiring the final README.
- Root `README.md` is still the old monorepo-oriented README. Rewrite it in
  Pass 2 according to §5.1.

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
- Keep `provideNgBrutalism()` in v0.1.0, but document it as optional. CSS
  custom properties remain the primary theming path.

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
  }
}
```

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

Do not ship:

- source `.ts` files, except `.d.ts`
- sourcemaps
- `TOKENS.md`
- `TOKENS-ROLLOUT.md`
- planning docs
- `node_modules`

Sourcemaps may still be generated locally in `dist/ui`, but they should not be
included in the npm tarball. Verify with `npm publish --dry-run`.

### 2.5 README And Assets

- Root README becomes public-facing pitch copy.
- Monorepo commands and contributor workflow move to `CONTRIBUTING.md`.
- Keep the canonical package-description sentence exactly:

  ```text
  A neo-brutalist Angular component library — Signals • Zoneless • Token-based • Tailwind v4.
  ```

- Use README badges:
  - npm version
  - npm monthly downloads
  - CI workflow status
  - MIT license
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

- Publish first, then verify `npm view @ng-brutalism/ui` shows `latest: 0.1.0`.
- Run/confirm the local consume smoke test before posting.
- First announcement channel: LinkedIn.
- Within 48h: r/angular, dev.to long-form, X/Twitter short.
- Skip Hacker News for v0.1.0.

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
```

This is a binary gate, not a full audit. Deeper API surface verification is
deferred to §6.4 (local consume smoke test) and v0.2.

---

## 4. Pass 1 — Release Plumbing

Do this pass first. Keep it mechanical. Do not draft public copy unless a tiny
placeholder is needed to keep builds/package output working.

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

Rewrite root README as public-facing package README:

```md
# @ng-brutalism/ui

A neo-brutalist Angular component library — Signals • Zoneless • Token-based • Tailwind v4.

[badges]

[Documentation](https://ngbrutalism.khangtran.dev) ·
[npm](https://www.npmjs.com/package/@ng-brutalism/ui) ·
[GitHub](https://github.com/khangtrannn/ng-brutalism)

![demo](docs/assets/image-card-demo.gif)

## Install

...

## What it looks like

![showcase](docs/assets/showcase-portfolio.png)

## Status

`@ng-brutalism/ui` is pre-1.0. The component APIs are usable today, but minor
versions may include breaking changes while the library settles.

## License

MIT
```

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

Create `CONTRIBUTING.md` with:

- monorepo layout
- local dev commands
- how to run `pnpm serve:docs`
- PR guidance
- Conventional Commit prefixes welcome but not required
- lightweight conduct section:

  ```md
  Be kind, specific, and constructive. This project is early; clear bug
  reports, focused pull requests, and respectful design feedback are welcome.
  ```

Do not add a separate `CODE_OF_CONDUCT.md` for v0.1.0.

### 5.4 CHANGELOG

Create `CHANGELOG.md` using Keep a Changelog style.

For v0.1.0:

- date it
- enumerate components grouped by category
- include foundation/theming notes
- mention pre-1.0 status
- write it so it can be reused as GitHub release notes

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

Mandatory before publish:

```sh
pnpm nx build ui --configuration=production
cd dist/ui
npm pack

cd /tmp
pnpm create @angular@21 nb-smoke
cd nb-smoke
pnpm add /Users/khangtrann/ng-brutalism/dist/ui/ng-brutalism-ui-0.1.0.tgz
```

Then set up Tailwind v4 using the install docs and verify:

- `import { NbButton } from '@ng-brutalism/ui'` resolves with types
- `@import '@ng-brutalism/ui/styles.css'` works outside the monorepo
- install produces no missing peer warnings when Tailwind CSS v4 is present
- render at least `NbButton`, `NbCard`, and `NbDialog`
- an intentionally wrong input type produces a TypeScript error
- install docs are sufficient for a new consumer

Anything wrong here means fix, repack, and retest. Do not publish around it.

### 6.5 Publish Dry Run

```sh
pnpm nx build ui --configuration=production
cd dist/ui
npm publish --dry-run --access public
```

Confirm:

- no source `.ts` files except `.d.ts`
- no sourcemaps
- no `node_modules`
- no internal planning docs
- includes `README.md`, `LICENSE`, `package.json`, `fesm2022/`, `types/`,
  `styles.css`, `theme.css`, `CHANGELOG.md`
- packed tarball size is under 250 KB
- unpacked package size is under 1 MB

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

```sh
npm login
npm whoami
npm org ls ng-brutalism
```

The org already exists; do not run `npm org create ng-brutalism` unless
verification proves something is wrong.

Tag before npm publish:

```sh
git tag v0.1.0
git push origin v0.1.0
```

Publish npm:

```sh
cd dist/ui
npm publish --access public
```

Verify:

```sh
npm view @ng-brutalism/ui
npm view @ng-brutalism/ui dist-tags
```

Expected: `latest: 0.1.0`.

Create the public GitHub release only after npm verification succeeds:

```sh
gh release create v0.1.0 \
  --title "v0.1.0 — Initial release" \
  --notes-file docs/plans/_archive/RELEASE_NOTES_v0.1.0.md
```

Do not create the public GitHub release before npm publish succeeds.

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
