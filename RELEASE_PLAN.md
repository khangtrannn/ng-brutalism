# Release Plan — `@ng-brutalism/ui` v0.1.0

Consolidated, actionable punch-list to ship the first public release. Pulls in:
- Open items from [LAUNCH.md](./LAUNCH.md) (high-level checklist)
- Open findings from [PRE_RELEASE_AUDIT.md](./PRE_RELEASE_AUDIT.md) (docs vs. impl drift)
- Static scan of this workspace (`libs/ui`, `apps/docs`, root files, `dist/ui` build output)

Severity legend used below:
- **BLOCK** — must fix before `npm publish` or the package is broken / unprofessional.
- **HIGH** — must fix before the public announcement (post is louder than the fix is hard).
- **NICE** — polish; can ship without, file as issues.

Snapshot status (2026-05-20):
- Package name `@ng-brutalism/ui` is reserved and unused on npm (verified 2026-05-17).
- Workspace migrated to Angular 21 + zoneless (commits `8e06828`, `1cec75a`).
- Library builds to `dist/ui` with ng-packagr; fesm2022 artifact present.
- No `LICENSE`, no `CHANGELOG.md`, no root npm-publishable README.
- `libs/ui/README.md` is the default Nx stub.
- 38 docs/impl findings in [PRE_RELEASE_AUDIT.md](./PRE_RELEASE_AUDIT.md) (4 BLOCKING, 14 HIGH, 20 LOW).

---

## 1. Library packaging — BLOCK

These are problems in what actually goes into the tarball. Fix before any publish attempt.

### 1.1 [BLOCK] Stale `exports.esm2022` path in [libs/ui/package.json:13-17](libs/ui/package.json#L13-L17)

The published `dist/ui/package.json` carries this verbatim from source:

```json
"esm2022": "./esm2022/ng-neo-brutalism-ui.mjs",
"esm":     "./esm2022/ng-neo-brutalism-ui.mjs",
```

Neither file exists in the build output — `dist/ui/` contains only `fesm2022/ng-brutalism-ui.mjs` (verified). Bundlers that respect the `esm2022` condition will resolve to a 404. Either:

- Remove the `esm2022` and `esm` conditions and rely on the `default` (fesm2022) + `types` entries, OR
- Have ng-packagr emit `esm2022/` and rename the filename to match (`ng-brutalism-ui.mjs`).

Fix path: edit [libs/ui/package.json](libs/ui/package.json), rebuild, verify `dist/ui/package.json` matches reality.

### 1.2 [BLOCK] `libs/ui/README.md` is the Nx stub

Currently:

```
# ui

This library was generated with [Nx](https://nx.dev).
```

This is what shows on the npm package page. Replace with: install command, one minimal usage snippet, link to docs site, link to GitHub repo, v0.x stability note, license line. Keep under ~80 lines.

### 1.3 [BLOCK] No `LICENSE` file at repo root or in published package

LAUNCH.md Phase 5 calls for MIT. Decide license, add `LICENSE` at repo root, and either copy it into `libs/ui/` so ng-packagr includes it, or add an `assets` entry to [libs/ui/ng-package.json](libs/ui/ng-package.json) to copy the root `LICENSE` into `dist/ui/`.

### 1.4 [BLOCK] `libs/ui/package.json` is missing publish metadata

Currently has only `name`, `version`, `peerDependencies`, `dependencies`, `exports`, `sideEffects`. Add before publish:

- `"description"` — one sentence
- `"license": "MIT"` (or chosen license)
- `"repository": { "type": "git", "url": "git+https://github.com/khangtrannn/ng-brutalism.git" }`
- `"homepage"` — docs site URL (set when Vercel domain is finalised)
- `"bugs": { "url": "https://github.com/khangtrannn/ng-brutalism/issues" }`
- `"keywords": ["angular", "angular21", "ui", "ui-library", "components", "neo-brutalism", "brutalism", "tailwind", "signals", "zoneless"]`
- `"author"` — name + (optional) email
- `"sideEffects"` is already correct — keep.

ng-packagr passes these through to `dist/ui/package.json`.

### 1.5 [BLOCK] Library version bump

`libs/ui/package.json` is at `0.0.1`. LAUNCH.md targets `0.1.0`. Bump to `0.1.0` (or `0.1.0-rc.0` if a pre-release dry run is wanted first — see §6.3).

### 1.6 [HIGH] Decide on density token surface ([PRE_RELEASE_AUDIT.md §Foundation BLOCKING #1](./PRE_RELEASE_AUDIT.md))

`NB_DENSITY` / `NbDensity` are exported but no component consumes them. Either remove the export (and `density.tokens.ts`) until wired, or wire them into `provideNgBrutalism` + document. Shipping a no-op public API at v0.1 sets a precedent that's hard to walk back.

### 1.7 [HIGH] Rename or hide one half of the `NbSelect` / `NbSelectComponent` collision ([PRE_RELEASE_AUDIT.md §Foundation LOW #6](./PRE_RELEASE_AUDIT.md))

`NbSelect` is a directive on native `<select>`, `NbSelectComponent` is a full custom listbox. Two unrelated components sharing a confusing name is the worst kind of API. Suggested: rename the directive to `NbNativeSelect`. Easy to do now, breaking after publish.

### 1.8 [HIGH] Drop the redundant `NbDialogComponent` alias ([PRE_RELEASE_AUDIT.md §Foundation LOW #5](./PRE_RELEASE_AUDIT.md))

Both `NbDialog` and `NbDialogComponent` are exported. Docs only use `NbDialog`. Drop the second to match the `NbAccordion` / `NbCard` pattern.

### 1.9 [HIGH] Stub `NbSelectSize = 'default'` ([PRE_RELEASE_AUDIT.md §select HIGH #2](./PRE_RELEASE_AUDIT.md))

A one-value union exported as public API. Either add real sizes (`'sm' | 'md' | 'lg'`) or drop the type + input.

### 1.10 [HIGH] Input-group internals leaking via sub-barrel ([PRE_RELEASE_AUDIT.md §input-group HIGH](./PRE_RELEASE_AUDIT.md))

`NB_INPUT_GROUP`, `NB_INPUT_PREFIX`, `NB_INPUT_SUFFIX`, `NbInputGroupContext` are re-exported from `libs/ui/src/lib/input-group/index.ts`. Even though root `index.ts` doesn't list them, deep-imports work. Move to `*.internal.ts` so they cannot be reached from outside.

---

## 2. Docs site — HIGH

The docs site (`apps/docs`) is the public face of the library; it is what people will land on from the announcement. Treat every BLOCKING and HIGH finding from [PRE_RELEASE_AUDIT.md](./PRE_RELEASE_AUDIT.md) as required.

### 2.1 [BLOCK] Card page selectors are wrong ([PRE_RELEASE_AUDIT.md §card BLOCKING](./PRE_RELEASE_AUDIT.md))

API table on [apps/docs/src/app/pages/components/card.page.ts:106-176](apps/docs/src/app/pages/components/card.page.ts#L106-L176) shows selectors as `neo-card*`. Actual selectors are `nb-card*`. Anyone copying from the API table writes a template that does not compile. Search/replace `neo-card` → `nb-card` in that file.

### 2.2 [BLOCK] Select page does not document the directive's `size` input ([PRE_RELEASE_AUDIT.md §select BLOCKING](./PRE_RELEASE_AUDIT.md))

Split the API into two tables: `<nb-select>` (component) vs `select[nbSelect]` (directive). Depends on §1.9 outcome.

### 2.3 [HIGH] Foundation token surface ([PRE_RELEASE_AUDIT.md §Foundation HIGH #3-#4](./PRE_RELEASE_AUDIT.md))

Snippets use `--nb-yellow`, `--nb-mint`, `--nb-pink`, `--nb-lavender` but those are only defined in `apps/docs/src/styles.css`, not in `libs/ui/src/lib/styles/theme.css`. A consumer pasting them gets unstyled components. Pick one of:

- **fix-docs** — rewrite snippets to use shipped tokens (`var(--nb-warning)` etc.).
- **fix-impl** — add the four palette tokens to `libs/ui/src/lib/styles/theme.css`.

Apply consistently across button, accordion, input pages.

Also: `--nb-input-group-addon-bg` is documented as `var(--nb-yellow)` but the impl uses literal `#ffd24a`. Pick a side per [PRE_RELEASE_AUDIT.md §Foundation HIGH #4](./PRE_RELEASE_AUDIT.md).

### 2.4 [HIGH] Installation page is incomplete ([PRE_RELEASE_AUDIT.md §Installation LOW #1-#3](./PRE_RELEASE_AUDIT.md))

Currently missing:

- The CSS import step (`@import '@ng-brutalism/ui/styles.css';` or `angular.json` `styles` array entry).
- Tailwind v4 prerequisite note (every component composes Tailwind utilities via `nbClass`).
- A clear statement that `provideNgBrutalism` is *optional* (only needed for token overrides from TS).

These are LOW per the audit's "consumer can recover" rubric, but in practice a first-time install with no Tailwind = no styles = bad first impression. Promote to HIGH for launch.

### 2.5 [HIGH] Stat-tile / API-table arithmetic errors

Per [PRE_RELEASE_AUDIT.md](./PRE_RELEASE_AUDIT.md):
- button: "8 Variants / 4 Sizes" stat tiles point to sections that don't exist on the page.
- card: stat tile says "6 Parts", prose says "7", table has 7.
- image-card: "2 Inputs" — actually 3.
- title: "3 Wave tokens" — actually 4.
- avatar: snippet missing `class="h-20 w-20"` so a copy-paste renders at half size.

Each is a one-line fix.

### 2.6 [HIGH] Demo/snippet parity for select, dialog, marquee

- dialog: `importCode` is missing `NbButton` — copy-paste fails to compile ([PRE_RELEASE_AUDIT.md §dialog LOW #2](./PRE_RELEASE_AUDIT.md), promote to HIGH because the symptom is a compile error).
- select: snippet shows 2 options, live demo shows 4 (default); same divergence on the "Option Content" section.
- marquee: snippet uses `skills`, live demo uses `portfolioSkills`. Pick one name.

### 2.7 [HIGH] Component page coverage gate (from LAUNCH.md Phase 4)

Confirm every page has: 1-line description + ≥1 runnable example + API table. Spot-check with the page index after fixes from §2.1–§2.6 land.

### 2.8 [HIGH] Homepage / introduction copy

LAUNCH.md Phase 4: "Homepage rewrite — pitch + install command + prominent CTA to /showcase/portfolio + GitHub link". Also [PRE_RELEASE_AUDIT.md §Installation LOW #4](./PRE_RELEASE_AUDIT.md) — introduction page only links to two components.

### 2.9 [NICE] All other LOW findings ([PRE_RELEASE_AUDIT.md](./PRE_RELEASE_AUDIT.md))

The 20 LOW findings (wrapper divs, var-name drift, redundant attrs, etc.) are cosmetic. File a single GitHub issue listing them after publish; fix in v0.1.1 polish pass.

---

## 3. Repository hygiene — BLOCK / HIGH

### 3.1 [BLOCK] Repo root `README.md` is workspace-internal

Current root README ([README.md](./README.md)) reads like internal dev notes (talks about theming approach, lists migration breaking changes for an audience that has the repo cloned). For a public repo it should:

- Lead with what the project is (a brutalist Angular UI library).
- Show install + minimal usage.
- Link to docs site + showcase.
- Have screenshots / GIF (use the existing portfolio reference assets).
- State the v0.x contract.
- License badge.

The existing technical content is valuable — move to `docs/THEMING.md` and link from README.

### 3.2 [BLOCK] Rename GitHub repo to `ng-brutalism`

Per LAUNCH.md Phase 1. GitHub auto-redirects the old URL. Do this *before* the README mentions the new URL so the linked badges/CI work on the new name.

### 3.3 [HIGH] `npm org create ng-brutalism`

Open in LAUNCH.md Phase 1. Required to publish under `@ng-brutalism/*` scope.

### 3.4 [HIGH] Add `CHANGELOG.md` at repo root

For v0.1.0: short stanza summarising what's in the first release (the 16 components + foundation). Used as the release notes on GitHub Releases and (optionally) the npm description.

### 3.5 [HIGH] Add `.npmignore` or whitelist via `files` in `dist/ui/package.json`

Currently ng-packagr generates the tarball from `dist/ui/`. Verify `pnpm publish --dry-run` (see §6.3) does NOT include `TOKENS-ROLLOUT.md`, `TOKENS.md`, source `.ts` files, sourcemaps in production. Use either a `files: ["fesm2022", "types", "*.css", "README.md", "package.json"]` whitelist in `libs/ui/package.json`, OR a `.npmignore` in `dist/ui/` emitted via ng-package assets.

### 3.6 [NICE] CI

No `.github/workflows/` directory exists. For v0.1.0 not strictly required (publishing is manual per LAUNCH.md Phase 6). For v0.2+, add:

- `ci.yml` — install, lint, test, build on PR.
- `deploy-docs.yml` — Vercel deploy on main.
- (Later) `release.yml` — Changesets-driven publish on tag.

File as issues, do not block v0.1.0.

### 3.7 [NICE] Tidy planning docs

Once v0.1.0 ships, the planning docs at repo root (`LAUNCH.md`, `MIGRATION_TO_NG21.md`, `PRE_RELEASE_AUDIT.md`, `PRE_RELEASE_AUDIT_PLAN.md`, `CONTEXT.md`, this file) clutter the repo root for newcomers. Move to `docs/_archive/` or delete. Keep `README.md`, `CHANGELOG.md`, `LICENSE`, `CONTRIBUTING.md` (when added).

---

## 4. Verification — required before publish

Each step is a literal command and a verifiable check.

### 4.1 Clean build

```sh
rm -rf dist/
pnpm install
pnpm nx build ui --configuration=production
```

Verify:
- `dist/ui/package.json` `name` = `@ng-brutalism/ui`, `version` = `0.1.0` (or chosen).
- `dist/ui/package.json` `exports` field has no dead paths (§1.1).
- `dist/ui/README.md` is the rewritten one (§1.2), not the Nx stub.
- `dist/ui/LICENSE` exists (§1.3).
- `dist/ui/fesm2022/ng-brutalism-ui.mjs` exists and is non-trivial size.
- `dist/ui/types/ng-brutalism-ui.d.ts` exports every documented symbol (open and grep).
- `dist/ui/styles.css` + `dist/ui/theme.css` exist.

### 4.2 Lint + test

```sh
pnpm nx run-many --target=lint --projects=ui,docs
pnpm nx run-many --target=test --projects=ui,docs
```

All must pass. If `docs` tests don't exist or are minimal, ok — `ui` must pass.

### 4.3 Docs app builds + serves

```sh
pnpm build:docs
pnpm serve:docs
```

Manual smoke (browser):
- Home / introduction / installation pages render with no console errors.
- Each component page renders its preview without runtime errors.
- The /showcase/portfolio route renders end-to-end.
- Contact dialog opens and closes (SSR smoke per LAUNCH.md Phase 5).
- View source on a copied snippet for one component (e.g. button) and verify it would compile — this catches §2.1-type bugs that the audit may have missed.

### 4.4 Local consume smoke test

The most important check: pretend to be a downstream user.

```sh
# In ng-brutalism repo
pnpm nx build ui
cd dist/ui
npm pack
# produces ng-brutalism-ui-0.1.0.tgz

# In a fresh directory elsewhere
mkdir /tmp/nb-smoke && cd /tmp/nb-smoke
pnpm create @angular@21 nb-smoke-app   # or: ng new
cd nb-smoke-app
pnpm add /Users/khangtrann/ng-brutalism/dist/ui/ng-brutalism-ui-0.1.0.tgz
# Set up Tailwind v4 per docs
# Import a component, render in app.ts, run dev server.
```

Verify:
- `import { NbButton } from '@ng-brutalism/ui'` resolves.
- `import '@ng-brutalism/ui/styles.css'` resolves.
- Component renders with theme tokens applied.
- TypeScript catches a wrong input type (proves `.d.ts` types are real).

This is the single highest-leverage check. Skip nothing here.

### 4.5 SSR smoke

LAUNCH.md Phase 5: Analog SSR renders the Showcase contact section (which uses Dialog) without exception. Run `pnpm build:docs` (which does SSR) and grep the build log for "Error" / "ExpressionChanged" / "ReferenceError".

### 4.6 Deploy docs to Vercel

Set the final URL. Update `homepage` field in `libs/ui/package.json` (§1.4). Rebuild.

---

## 5. npm publish — step by step

### 5.1 One-time setup

```sh
npm login                      # opens browser, sign in as the publishing account
npm whoami                     # confirm the right account
npm org ls ng-brutalism        # verify you're a member (or owner) of the org
```

If the org does not exist:

```sh
npm org create ng-brutalism
```

(Free orgs are fine; the package will be published as **public**.)

### 5.2 Verify the package contents (dry run)

```sh
pnpm nx build ui --configuration=production
cd dist/ui
npm publish --dry-run --access public
```

The dry run prints the file list that *would* be uploaded. Read it. Confirm:

- No `*.ts` source files (other than `.d.ts`).
- No sourcemaps unless intentional.
- No `node_modules/`.
- No internal docs (`TOKENS.md`, `TOKENS-ROLLOUT.md`) unless desired.
- `README.md`, `LICENSE`, `package.json`, `fesm2022/`, `types/`, `styles.css`, `theme.css` are present.
- Total tarball size sane (probably <500 KB; if multi-MB, something is wrong).

If the list is wrong, fix §3.5 and re-build, do not just `--ignore-scripts`.

### 5.3 Publish

```sh
cd dist/ui
npm publish --access public
```

`--access public` is **required** for the first publish of a scoped package on the free plan; without it npm defaults to private and fails.

Verify within 1-2 minutes:

```sh
npm view @ng-brutalism/ui
npm view @ng-brutalism/ui dist-tags
```

Should show `latest: 0.1.0`.

### 5.4 Tag the release

```sh
git tag v0.1.0
git push origin v0.1.0
```

### 5.5 GitHub release

```sh
gh release create v0.1.0 \
  --title "v0.1.0 — Initial release" \
  --notes-file CHANGELOG.md
```

(Or use the GitHub UI and paste the changelog stanza.)

### 5.6 If something goes wrong post-publish

- **Wrong files shipped** — bump to `0.1.1`, fix, publish again. Do NOT `npm unpublish` if anyone might have installed; it leaves a hole in the version range and the version number can never be reused for 24h+.
- **Within 72h of publish, package is unused** — `npm unpublish @ng-brutalism/ui@0.1.0` is acceptable. Use as the last resort, not the first.
- **Critical bug** — `npm deprecate '@ng-brutalism/ui@0.1.0' "Critical bug; use 0.1.1+"` is the right tool; never unpublish a known-installed version.

### 5.7 Optional: pre-release dry run first

If 0.1.0 feels too final for a first publish, use `0.1.0-rc.0` with `--tag rc`:

```sh
# in libs/ui/package.json set "version": "0.1.0-rc.0"
pnpm nx build ui --configuration=production
cd dist/ui
npm publish --access public --tag rc
```

This publishes under the `rc` dist-tag so `pnpm add @ng-brutalism/ui` still resolves to nothing (latest is unset). Install via `pnpm add @ng-brutalism/ui@rc` to test. When ready, publish `0.1.0` under `latest`. Recommended only if a real consumer is available to install the rc.

---

## 6. Announcement — after publish lands

Per LAUNCH.md Phase 6. Do NOT post until:
- `npm view @ng-brutalism/ui` returns 0.1.0.
- Docs site URL works and looks correct on mobile + desktop.
- A fresh `pnpm add @ng-brutalism/ui` in a clean Angular project actually renders a component.
- The README on the npm package page (visit https://www.npmjs.com/package/@ng-brutalism/ui) looks correct, not the stub.

Then:

1. LinkedIn post (Tue/Wed morning local time, stay online ~4h).
2. Within 48h: r/angular, dev.to long-form, X/Twitter short.
3. Skip Hacker News (per LAUNCH.md).

The post angle is parked per LAUNCH.md — maintainer decides at post time. Default recommendation: dogfooding + visual lead, portfolio screenshot, three links (portfolio / npm / GitHub), soft CTA.

---

## 7. Order of operations (suggested)

A reasonable serialisation, smallest blast radius first:

1. **Library impl fixes** (§1.6 – §1.10) — break the API now if at all.
2. **Library packaging fixes** (§1.1 – §1.5) — metadata, version, exports, README, LICENSE.
3. **Docs fixes** (§2.1 – §2.8) — BLOCK and HIGH only.
4. **Repo hygiene** (§3.1 – §3.5) — README, repo rename, npm org, changelog.
5. **Verification gate** (§4.1 – §4.6) — clean build, smoke test, deploy docs.
6. **Publish** (§5.1 – §5.5).
7. **Announce** (§6).

If any step in §4 fails, loop back to the relevant fix section; do not paper over.

---

## 8. Out of scope for v0.1.0

Filed (or to file) as GitHub issues:

- Sheet, Tooltip, Sonner/Toast, Navigation Menu, Skeleton (per LAUNCH.md).
- Per-component accessibility documentation.
- Recipes / cookbook page.
- Changesets release automation (the `release` script in [package.json](./package.json) references it but no `.changeset/` config exists).
- Analytics on the docs site.
- Contribution guide.
- CI workflows.
- The 20 LOW findings from [PRE_RELEASE_AUDIT.md](./PRE_RELEASE_AUDIT.md).
