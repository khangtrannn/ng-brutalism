# Release Decisions — `@ng-brutalism/ui` v0.1.0

Companion to [RELEASE_PLAN.md](./RELEASE_PLAN.md). Captures grill-session decisions
on 2026-05-20 and supersedes the plan where they conflict.

When resuming: read § Open Questions first, that's where the next round picks up.

---

## 1. Reality check — items struck from RELEASE_PLAN.md

Verified done in code on 2026-05-20. Ignore the corresponding section of the plan.

| Plan ref | Item | Evidence |
|---|---|---|
| §1.2 | `libs/ui/README.md` rewritten (no longer Nx stub) | Current file has install / styles / usage / optional provider / license sections |
| §1.6 | Density tokens removed | `NB_DENSITY` / `NbDensity` / `density.tokens.ts` absent from `libs/ui/src/` |
| §1.7 | `NbSelect` → `NbNativeSelect` rename | `libs/ui/src/index.ts:45` |
| §1.8 | `NbDialogComponent` alias dropped from public API | Only `NbDialog` exported from root `index.ts:54` |
| §1.9 | `NbSelectSize` removed | Not exported from root `index.ts` |
| §1.10 | Input-group internals hidden | `libs/ui/src/lib/input-group/index.ts` exposes only the three components + two align types |
| §2.1 | Card page selectors corrected | `apps/docs/src/app/pages/components/card.page.ts:118-178` uses `nb-card*` |

Several §2.x docs items likely also resolved by recent commits (`980c09a`,
`3038128`, `50ffed1`, `f0631bc`, `be37fc9`, `9da2809`, `983152b`). Spot-check
during the §4.3 docs build smoke; do not pre-fix without verification.

---

## 2. Locked decisions

### 2.1 Repository & domain

- **GitHub repo renamed** to `khangtrannn/ng-brutalism` (user-confirmed; local
  `origin` remote still points at the old URL — run `git remote set-url origin
  https://github.com/khangtrannn/ng-brutalism.git` for hygiene).
- **Docs hosting**: GitHub Pages with custom domain `ngbrutalism.khangtran.dev`.
- **DNS**: Cloudflare. The `ngbrutalism` CNAME → `khangtrannn.github.io` must
  have **proxy OFF** (grey cloud), or GitHub's Let's Encrypt cert issuance
  silently fails.
- **No GitHub org** for v0.1.0. Stays on personal account `khangtrannn`.

### 2.2 Library package metadata

- **Version**: direct `0.1.0`. No RC. Marketing concerns addressed via thorough
  smoke testing rather than dist-tag staging.
- **License**: MIT.
- **`author`**: `"Khang Tran <khangtrann8198@gmail.com>"`.
- **Fix §1.1 stale exports**: in `libs/ui/package.json`, **remove** the
  `esm2022` and `esm` conditions entirely. They point at non-existent files
  with an outdated `ng-neo-brutalism-ui.mjs` name. The `default` (fesm2022) +
  `types` entries are sufficient — modern bundlers will resolve correctly.
- **Add publish metadata** (description, license, repository, homepage, bugs,
  keywords, author). See § 4.1 for the full delta.
- **Pack via `files` whitelist** rather than `.npmignore` — open question § 6.

### 2.3 Docs site

- **Static prerendering, not SSR.** GitHub Pages is static-only; Analog
  prerender provides SSG at build time. LAUNCH.md Phase 5's SSR smoke check
  becomes a prerender-completes-without-error check.
- **Prerender route list must be expanded** to every page that ships:
  - All `/components/*` (16 components — currently lists 5)
  - All `/docs/*` siblings (currently lists 6)
  - `/showcase/portfolio`
  - Index pages (`/`, `/components`, `/docs`, `/installation`, `/introduction`)
  - Roughly **22-25 routes total**.
- Routes outside the prerender list will 404 on direct navigation, including
  links from LinkedIn / Google / OG previews. No SPA-fallback hack — it kills
  SEO and OG metadata.

### 2.4 CI / CD

Two workflow files. No `release.yml`, no Dependabot for v0.1.0.

**`.github/workflows/ci.yml`** — runs on PRs:

```yaml
name: CI
on:
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm nx affected -t lint test build --base=origin/main
```

**`.github/workflows/deploy-docs.yml`** — runs on push to `main`:

```yaml
name: Deploy docs
on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: pages
  cancel-in-progress: true

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm nx run-many -t lint test --projects=ui,docs
      - run: pnpm nx build docs --configuration=production
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/apps/docs/client
      - uses: actions/deploy-pages@v4
```

**Why split** — `affected` on PRs (fast slice), `run-many` on main (full
verification before deploy). Avoids the workflow_call indirection until needed.

**GitHub repo settings prerequisite**: Settings → Pages → Build and deployment
**source = "GitHub Actions"** (not "Deploy from a branch"). Without this, the
deploy step fails confusingly.

### 2.5 Branch protection — flipped *after* v0.1.0 publishes

Settings → Branches → main, when the time comes:

- ✅ Require pull request before merging
- ✅ Require status checks to pass — pick `CI / verify`
- ⬜ Require approvals (off — solo)
- ⬜ Require linear history (off)
- ⬜ Include administrators (off — keep an escape hatch)

The v0.1.0 prep itself ships via direct commits to `main`; the very next change
*after* publishing is the first PR.

### 2.6 README + visual assets

- **Split README**: root README becomes a public-facing pitch (~30 lines);
  monorepo commands + contributor guidance move to `CONTRIBUTING.md`.
- **Root README structure**:

  ```markdown
  # @ng-brutalism/ui

  [one-line elevator pitch]

  ![demo](docs/assets/dialog-demo.gif)

  📚 Docs · 📦 npm · ⭐ GitHub

  ## Install
  [3-line snippet]

  ## What it looks like
  ![showcase](docs/assets/showcase-portfolio.png)
  ![components](docs/assets/components-grid.png)

  ## Status — v0.x
  Pre-1.0; breaking changes between minor versions.

  ## License
  MIT
  ```

- **Visual assets — combined static + motion**:

  | Asset | Path | Size budget | Source |
  |---|---|---|---|
  | Hero GIF | `docs/assets/dialog-demo.gif` | < 2 MB | Contact dialog opening from `/showcase/portfolio` |
  | Showcase shot | `docs/assets/showcase-portfolio.png` | < 300 KB | Full-page DevTools capture of `/showcase/portfolio` |
  | Components grid | `docs/assets/components-grid.png` | < 300 KB | Full-page capture of `/components` index |

- **GIF tooling**: Cmd+Shift+5 to record `.mov` → `gifski` (`brew install
  gifski`) → 800×500 px, 15 fps, 3-5 second loop. Test file size before
  committing; if > 2 MB, drop to 12 fps or 720×450.
- **Format = GIF, not MP4.** MP4 doesn't render on npm package pages (~70% of
  first-impressions). GIF's color hit on brutalist designs is tolerable
  because the palette is mostly flat.
- **Optimize PNGs** with ImageOptim (drag-and-drop, lossless) or `pnpm dlx
  @squoosh/cli`. Expect 60-70% size reduction.
- **Commit to repo at `docs/assets/`** — small one-shots, no external host
  dependency.

### 2.7 CHANGELOG

- **Format**: Keep-a-Changelog convention.
- **Depth**: full component enumeration grouped by category, dated.
- **Will be reused** as the `gh release create --notes-file CHANGELOG.md`
  body, so write it for both audiences.

Draft committed at first-execution pass (Claude to draft from
`libs/ui/src/index.ts`; user reviews tone of the Notes section).

### 2.8 Verification gate — § 4.4 is mandatory

The **single highest-leverage check** is the local consume smoke test.
Non-negotiable before publish.

Ritual:

```sh
# Build & pack
pnpm nx build ui --configuration=production
cd dist/ui
npm pack
# yields ./ng-brutalism-ui-0.1.0.tgz

# Pretend to be a new consumer
cd /tmp
pnpm create @angular@21 nb-smoke
cd nb-smoke
pnpm add /Users/khangtrann/ng-brutalism/dist/ui/ng-brutalism-ui-0.1.0.tgz
# Set up Tailwind v4 per the install docs (this is itself a check)
```

Pass criteria:

- `import { NbButton } from '@ng-brutalism/ui'` resolves with types.
- `@import '@ng-brutalism/ui/styles.css'` works outside the monorepo's
  Nx ts-paths alias.
- **Render at least 3 components**: `NbButton`, `NbCard`, `NbDialog` (Dialog
  because it's the most likely SSG/prerender failure mode).
- Tweak an input to a wrong type, confirm TypeScript errors. Proves `.d.ts`
  is real, not just present.
- Tailwind v4 setup steps in install docs are sufficient (no missing
  prerequisites surfaced during setup).

Anything wrong here → fix in source, repack, retest. No published version burns.

### 2.9 Announcement

- **Channel order**: LinkedIn immediately after publish lands and § 4.4
  passes. Conditional on the smoke being thorough — that's the gate, not
  channel staging.
- The original "soft-launch via smaller channels first" hedge is dropped
  because: (a) it conflates marketing channel with beta-tester channel,
  (b) launch momentum dies fast, (c) the LinkedIn audience here is actually
  devs, not generic contacts.

---

## 3. Order of operations

1. **Library impl & metadata** (decisions in § 2.2):
   - Remove `esm2022`/`esm` conditions from `libs/ui/package.json` exports.
   - Bump version to `0.1.0`.
   - Add description, license, repository, homepage, bugs, keywords,
     author fields.
   - Add `files` whitelist (see § 6 — open).
2. **Repo hygiene**:
   - `git remote set-url origin https://github.com/khangtrannn/ng-brutalism.git`.
   - Add `LICENSE` (MIT) at repo root.
   - Configure ng-package.json to copy `LICENSE` into `dist/ui/`.
   - Add `CHANGELOG.md` (Option B, drafted).
   - Move `LAUNCH.md`, `MIGRATION_TO_NG21.md`, `PRE_RELEASE_AUDIT.md`,
     `PRE_RELEASE_AUDIT_PLAN.md`, `CONTEXT.md`, `RELEASE_PLAN.md`, and this
     file to `docs/_archive/` (or delete) once obsolete.
3. **README + assets**:
   - Capture GIF + 2 PNGs to `docs/assets/`.
   - Rewrite root `README.md` per § 2.6 structure.
   - Add `CONTRIBUTING.md` with monorepo commands and dev workflow.
4. **Docs site infra**:
   - Expand prerender route list in `apps/docs/vite.config.ts`.
   - Wire Cloudflare DNS: CNAME `ngbrutalism` → `khangtrannn.github.io`
     (proxy off).
   - Create `apps/docs/public/CNAME` file containing
     `ngbrutalism.khangtran.dev`.
   - Configure Settings → Pages → source = GitHub Actions.
5. **CI**:
   - Add `.github/workflows/ci.yml` (§ 2.4).
   - Add `.github/workflows/deploy-docs.yml` (§ 2.4).
   - First main push triggers initial deploy; verify the cert issues at
     `ngbrutalism.khangtran.dev` (24h window typical).
6. **Verification gate**:
   - Clean build (§ 4.1 in RELEASE_PLAN.md).
   - Lint + test all green.
   - Docs build green; browser smoke shows components render and Dialog
     prerenders cleanly.
   - **§ 4.4 local consume smoke test** — mandatory.
7. **Publish**:
   - `npm login` + `npm whoami` confirmation.
   - `npm org create ng-brutalism` (or verify exists).
   - `cd dist/ui && npm publish --dry-run --access public` — review file list.
   - `cd dist/ui && npm publish --access public`.
   - `npm view @ng-brutalism/ui` confirms `latest: 0.1.0`.
   - `git tag v0.1.0 && git push origin v0.1.0`.
   - `gh release create v0.1.0 --notes-file CHANGELOG.md`.
8. **Announce**:
   - LinkedIn post (immediate, contingent on smoke pass).
   - Within 48h: r/angular, dev.to long-form, X/Twitter short.
9. **Post-publish housekeeping**:
   - Flip branch protection on `main` (§ 2.5 settings).
   - File v0.2 issues: Dependabot, `ci.yml` Dependabot integration,
     Changesets release automation, the 20 LOW findings from
     `PRE_RELEASE_AUDIT.md`, Sheet / Tooltip / Toast / Skeleton components,
     CONTRIBUTING quality pass, smoke-test automation script.

---

## 4. Concrete artifacts (drafts pending)

### 4.1 `libs/ui/package.json` delta

Add fields:

```json
{
  "version": "0.1.0",
  "description": "<one-sentence pitch — TBD>",
  "license": "MIT",
  "author": "Khang Tran <khangtrann8198@gmail.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/khangtrannn/ng-brutalism.git"
  },
  "homepage": "https://ngbrutalism.khangtran.dev",
  "bugs": { "url": "https://github.com/khangtrannn/ng-brutalism/issues" },
  "keywords": ["TBD — see § 6"]
}
```

Remove from `exports.".":`
```diff
- "esm2022": "./esm2022/ng-neo-brutalism-ui.mjs",
- "esm": "./esm2022/ng-neo-brutalism-ui.mjs",
```

### 4.2 README, CHANGELOG, CONTRIBUTING

Pending drafts. Claude to produce on the next pass; user reviews.

### 4.3 Workflows

YAMLs in § 2.4 are final form. Lift directly into `.github/workflows/`.

---

## 5. Open Questions — resume here

Decisions deferred for the next grill round, in order:

### 5.1 `files` whitelist in `libs/ui/package.json`

What exactly ships in the tarball? Need to confirm the array. Candidate:

```json
"files": [
  "fesm2022/",
  "types/",
  "*.css",
  "README.md",
  "LICENSE",
  "package.json"
]
```

Verify with `npm publish --dry-run` that this excludes:
- Source `.ts` files (only `.d.ts` should remain via `types/`)
- Sourcemaps (`*.map`)
- `TOKENS.md`, `TOKENS-ROLLOUT.md` from `libs/ui/` (probably keep out)
- Anything else surprising.

Question: does `TOKENS.md` belong in the published tarball as consumer
documentation, or is it dev-internal?

### 5.2 npm `keywords` list

Plan suggested:
`["angular", "angular21", "ui", "ui-library", "components", "neo-brutalism", "brutalism", "tailwind", "signals", "zoneless"]`

To decide:
- Is `angular21` valuable, or does it date the package badly?
- Is `neo-brutalism` vs `brutalism` worth listing both? (One discoverable
  search term; the other is also one.)
- Should `analog` / `analogjs` / `ssr` / `prerender` appear? (Probably no —
  the library doesn't depend on Analog.)

### 5.3 Description for `libs/ui/package.json`

Single sentence, shows on npm search results and the package page header.
Needs to be punchy. Draft candidates to compare:

- "A neo-brutalist Angular component library — standalone, signal-driven,
  themable."
- "Angular 21 UI components in a neo-brutalist style. Tailwind v4 + signals
  + zoneless."
- "Brutalist UI for Angular. Loud borders, hard shadows, no nonsense."

Tone question to settle.

### 5.4 README copy

- Elevator pitch (one line) — same tone question as § 5.3.
- "What it looks like" section text.
- Status / v0.x callout wording.
- Three-link line: `Docs · npm · GitHub` — emoji or no emoji?

### 5.5 CONTRIBUTING.md scope

What goes in? At minimum:
- Monorepo layout (lift current root README's commands section).
- How to run `pnpm serve:docs` for local dev.
- How to add a new component (or defer to v0.2).
- PR / branch conventions (Conventional Commits? Squash-merge?).
- Code of conduct (skip for v0.1.0?).

### 5.6 Docs site §2.x verification

Spot-check whether the following are actually still open after recent commits:
- §2.2 Select page — directive `size` input documented?
- §2.3 Foundation token surface (`--nb-yellow` / `--nb-mint` / `--nb-pink` /
  `--nb-lavender` only in `apps/docs/src/styles.css`, not shipped theme.css).
- §2.4 Installation page — Tailwind v4 prereq + CSS import step + provider
  optionality.
- §2.5 stat-tile arithmetic errors across button / card / image-card / title
  / avatar pages.
- §2.6 demo/snippet parity — dialog importCode (commit `9da2809` mentions
  this), select / marquee snippet vs live demo (commit `980c09a` /
  `3038128`).
- §2.7 coverage gate.
- §2.8 homepage / introduction copy.

### 5.7 Where to put archived planning docs

Plan suggests `docs/_archive/`. Confirm path, or use `docs/plans/_archive/`
(to nest under existing `docs/plans/`)?

### 5.8 GIF — willingness to record now vs schedule it

The visual capture (~60-90 min including gifski tuning) is real work. Block
the release prep on this, or schedule it as a separate evening task with the
prep continuing in parallel?

### 5.9 npm scope creation

Verify whether `@ng-brutalism` npm org needs creating (`npm org create
ng-brutalism`) or whether the scope was already reserved during the May 17
verification. Run `npm org ls ng-brutalism` to check before publish.

---

## 6. Anti-decisions (settled by elimination, document so they don't come back)

- **No GitHub org** for v0.1.0.
- **No RC dist-tag**.
- **No MP4 hero clip** — GIF only, for npm-page rendering.
- **No `release.yml` automation** for v0.1.0 — publish manually once first.
- **No `ci.yml` Dependabot integration** for v0.1.0.
- **No Changesets** for v0.1.0.
- **No branch protection** during release prep.
- **No SSR runtime** — static prerender only.
- **No Cloudflare proxy** (orange cloud) on the docs subdomain.
- **No HN announcement** (per LAUNCH.md Phase 6).
- **No automated smoke-test script** for v0.1.0.

---

## 7. Cross-references

- [RELEASE_PLAN.md](./RELEASE_PLAN.md) — full punch-list with severities.
- [LAUNCH.md](./LAUNCH.md) — high-level phase checklist.
- [PRE_RELEASE_AUDIT.md](./PRE_RELEASE_AUDIT.md) — docs vs impl drift findings.
