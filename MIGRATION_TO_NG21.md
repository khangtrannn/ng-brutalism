# Migration Plan: Angular 18 → Angular 21 + First Release (v0.1.0)

Status: Plan finalized, ready to execute.
Owner: Khang Tran (solo).
Repo: `ng-brutalism` (Nx workspace, pnpm).

---

## TL;DR

Migrate the workspace from Angular 18.2 to Angular 21 stable in 3 sequential `nx migrate` hops, adopt zoneless change detection as a follow-on commit, then publish `@ng-brutalism/ui@0.1.0` to npm with peer deps locked to `^21.0.0`.

---

## Context: current state

- **Angular**: 18.2.x
- **Nx**: 20.0.0
- **TypeScript**: 5.5.2
- **ng-packagr**: 18.2
- **Node engine**: `>=20`
- **Library**: `@ng-brutalism/ui` at version `0.0.1`, 17 components, **already written in modern signal-based style** (`input()`, `model()`, `signal()`, `computed()`, `viewChild()`, `contentChildren()`, `@if`/`@for`, `standalone: true`, `host: {}`, `OnPush`). Zero legacy decorator API usage.
- **Docs app**: `apps/docs`, Analog-based (`@analogjs/router` 1.22, `@analogjs/platform` 1.19, `@analogjs/vite-plugin-angular` 1.19, `@analogjs/vitest-angular` 1.19). Currently zonefull.
- **Test runner**: Vitest via `@analogjs/vitest-angular`. Setup files use `@analogjs/vitest-angular/setup-zone`.
- **Zone usage in library code**: **none** (audited — no `NgZone`, `runOutsideAngular`, `zone.js`, `setTimeout`-for-CD).

---

## Decisions recap (with rationale)

| # | Decision | Rationale |
|---|---|---|
| 1 | **Target Angular 21 stable** for v1 (not 22-RC) | v22 is still RC on npm. Shipping a library v1 against an RC framework is a bad signal and forces re-tests on every RC bump. v21 is the current `latest`. |
| 2 | **Single-major support policy** (library major = Angular major) | Same approach as Angular Material, ng-bootstrap, Taiga UI. Sustainable for solo authors. Avoids a 4-version test matrix. |
| 3 | **Sequential `nx migrate` (18→19→20→21)** | Each hop runs that major's auto-codemods. Skipping majors risks lost migrations. Code is already modern, so most hops will be pure tooling bumps. |
| 4 | **Keep Analog 2.5.x as docs framework** | Analog 2.5.1 already supports Angular 21. No quarantine needed for v1. Re-evaluate the docs framework choice *after* v1 ships. |
| 5 | **First published version: `0.1.0`** (not `1.0.0` or `1.0.0-rc.0`) | Zero users yet. `0.x` defers SemVer commitments until the API has been exercised by real users. Save `1.0.0` as a marketing moment. |
| 6 | **Full zoneless adoption** (docs + tests) | Library is already zoneless-compatible. Zoneless is the `ng new` default in v21. Dogfooding it in docs catches the same bugs consumers will hit. Drops `zone.js` (~30KB) from the docs bundle. |
| 7 | **Single branch, multi-commit, no PR** | Solo author with no reviewers. One branch per hop is ceremony. One branch with atomic commits gives the same bisect/revert properties. |
| 8 | **Commit in-flight `select` work first on `main`** | Unrelated to the upgrade. Lands as a normal feature commit, becomes the clean baseline. |
| 9 | **Peer deps**: `^21.0.0` only. Do **not** add `zone.js` as peer. | Consumers choose zone vs zoneless. Library doesn't need zone.js. |
| 10 | **npm tag**: default `latest` for `0.1.0` | Normal — `--tag next` is only for pre-releases of a future major. |

---

## Pre-flight (on `main`, before branching)

1. **Finalize and commit the in-flight `select` work** as a normal feature commit. Currently dirty:
   ```
   M apps/docs/src/app/docs/docs-tokens.ts
   M libs/ui/src/lib/select/select-option.ts
   M libs/ui/src/lib/select/select.directive.ts
   M libs/ui/src/lib/select/select.spec.ts
   M libs/ui/src/lib/select/select.ts
   M libs/ui/src/lib/styles/styles.css
   ?? libs/ui/src/lib/select/select.tokens.spec.ts
   ```
   Verify before committing:
   ```bash
   pnpm nx run-many -t build test lint -p ui
   ```

2. **Capture baseline versions** for rollback reference:
   ```bash
   pnpm list --depth 0 | grep -E "@angular|@nx|@analogjs|typescript|ng-packagr|zone.js" > /tmp/ng-brutalism-baseline-versions.txt
   ```

3. **Confirm clean working tree**:
   ```bash
   git status   # should be empty
   ```

4. **Branch**:
   ```bash
   git switch -c chore/upgrade-to-ng-21
   ```

---

## Hop 1: Angular 18 → 19

```bash
# 1. Stage the migration: rewrites root package.json, generates migrations.json
pnpm nx migrate @angular/core@^19.0.0

# 2. Install the new versions
pnpm install --no-frozen-lockfile

# 3. Run the schematic migrations Nx + Angular registered
pnpm nx migrate --run-migrations

# 4. Clean up the migrations manifest
rm migrations.json

# 5. Run modern-API codemods explicitly (mostly no-op given the codebase is signal-based,
#    but worth confirming nothing was missed)
pnpm exec ng generate @angular/core:control-flow
pnpm exec ng generate @angular/core:signal-input-migration
pnpm exec ng generate @angular/core:signal-queries-migration
pnpm exec ng generate @angular/core:cleanup-unused-imports

# 6. Verify
pnpm nx run-many -t build test lint
pnpm nx serve docs   # click around briefly to smoke-test
```

### Things to expect / watch at this hop

- `nx migrate` will also bump `@nx/*` to a compatible major (likely Nx 20.x latest or 21.x). That's fine.
- `@analogjs/*` will likely need a bump. If `pnpm install` leaves Analog peer-warning on `@angular/core@19`, manually bump `@analogjs/router`, `@analogjs/platform`, `@analogjs/vite-plugin-angular`, `@analogjs/vitest-angular` to a version whose peer range includes 19. Analog 2.x covers Angular 15–21, so jumping straight to **Analog 2.5.1 at hop 1** is the safest move — it then stays put through all remaining hops.
- TypeScript will bump to ≥5.6.
- Angular 19 makes `standalone: true` the default — existing decorators already have it, harmless duplication.
- `zone.js` peer requirement may bump.

### Commit when green

```bash
git add -A
git commit -m "chore(ng): migrate workspace to Angular 19"
```

---

## Hop 2: Angular 19 → 20

```bash
pnpm nx migrate @angular/core@^20.0.0
pnpm install --no-frozen-lockfile
pnpm nx migrate --run-migrations
rm migrations.json

pnpm exec ng generate @angular/core:cleanup-unused-imports

pnpm nx run-many -t build test lint
pnpm nx serve docs
```

### Things to watch

- TypeScript bumps to ≥5.7.
- `resource()` and `httpResource()` go stable — no action needed (library doesn't use them).
- `provideZonelessChangeDetection` goes stable — relevant for the zoneless commit later.
- Some v18 deprecations become removals. Schematics handle the obvious ones; verify build output for warnings.
- Analog should already be on 2.5.x from hop 1 — no further bump needed.

### Commit

```bash
git add -A
git commit -m "chore(ng): migrate workspace to Angular 20"
```

---

## Hop 3: Angular 20 → 21

```bash
pnpm nx migrate @angular/core@^21.0.0
pnpm install --no-frozen-lockfile
pnpm nx migrate --run-migrations
rm migrations.json

pnpm exec ng generate @angular/core:cleanup-unused-imports

pnpm nx run-many -t build test lint
pnpm nx serve docs
```

### Things to watch

- TypeScript bumps to ≥5.8.
- Analog 2.5.1 supports v21 cleanly — should resolve without peer warnings.
- `ng-packagr` will be on 21.x; verify your existing `libs/ui/ng-package.json` still works (look for any deprecated options).
- Node floor: v21 requires Node ≥20.19 or ≥22. **Bump `engines.node`** in root `package.json` from `>=20` to `>=20.19` (or `>=22`) to match.

### Commit

```bash
git add -A
git commit -m "chore(ng): migrate workspace to Angular 21"
```

---

## Final commit on the branch: Zoneless flip

### File edits

**`apps/docs/src/main.ts`** — remove zone import:
```ts
// remove: import 'zone.js';
import './styles.css';
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
```

**`apps/docs/src/main.server.ts`** — remove zone-node import:
```ts
// remove: import 'zone.js/node';
// ...rest unchanged
```

**`apps/docs/src/app/app.config.ts`** — swap the provider:
```ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
// ...
providers: [
  provideZonelessChangeDetection(),   // was: provideZoneChangeDetection({ eventCoalescing: true })
  // ...rest unchanged
]
```

**`apps/docs/src/test-setup.ts`** and **`libs/ui/src/test-setup.ts`** — replace zone setup:

- If `@analogjs/vitest-angular/setup-zoneless` exists in v21 → use it in place of `setup-zone`.
- If not → drop the analog setup import and bootstrap testbed directly:
  ```ts
  import '@angular/compiler';
  import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
  } from '@angular/platform-browser-dynamic/testing';
  import { getTestBed } from '@angular/core/testing';

  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  );
  ```
  Then register `provideZonelessChangeDetection()` in each suite's `TestBed.configureTestingModule({ providers: [...] })`, or write a small `setupZonelessTestBed()` helper if many specs need it.

**Root `package.json`** — remove `zone.js` from `dependencies`.

### Verify

```bash
pnpm install
pnpm nx run-many -t build test lint
pnpm nx serve docs   # smoke-test in browser, especially click-driven things: dialog, select, accordion
```

### Commit

```bash
git add -A
git commit -m "feat(ng): adopt zoneless change detection in docs and tests"
```

---

## Merge to `main`

```bash
git switch main
git merge --no-ff chore/upgrade-to-ng-21
git branch -d chore/upgrade-to-ng-21
```

---

## Library publish prep (separate commits on `main`)

### 1. Bump peer deps in `libs/ui/package.json`

```json
{
  "name": "@ng-brutalism/ui",
  "version": "0.1.0",
  "peerDependencies": {
    "@angular/common": "^21.0.0",
    "@angular/core": "^21.0.0"
  }
}
```

Notes:
- Do **not** add `zone.js` as a peer — the library is zoneless-compatible.
- Keep existing runtime `dependencies` (`clsx`, `tailwind-merge`, `tslib`) unless one needs a version bump.

### 2. Verify the published artifact

```bash
pnpm nx build ui
cd dist/libs/ui   # or wherever ng-packagr outputs
npm pack --dry-run
```

Inspect the `files` list. Confirm `styles.css`, `theme.css`, types, and `fesm2022` bundles are all present and that `exports` map resolves correctly.

### 3. Set up changesets for the first release

`@changesets/cli` is already installed. Initialize if not already done:

```bash
pnpm changeset init   # creates .changeset/ folder (skip if it already exists)
```

Add a changeset describing the v0.1.0 release:

```bash
pnpm changeset add
# select @ng-brutalism/ui
# pick "minor" (since we're going 0.0.1 → 0.1.0)
# summary: "Initial public release on Angular 21 with zoneless support."
```

Apply the version bump:

```bash
pnpm changeset version
```

Publish:

```bash
pnpm changeset publish   # publishes to npm with default `latest` tag
```

### 4. Tag the release in git

```bash
git tag v0.1.0
git push --tags
```

### 5. Update README

Add a short support-policy section so consumers know what to expect:

> ### Versioning policy
>
> `@ng-brutalism/ui` is pre-1.0 — breaking changes may occur in minor releases. Pin exact versions in production.
>
> Each major version of `@ng-brutalism/ui` supports one major version of Angular, matching Angular's current `latest`. v0.x supports **Angular 21**.

---

## Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Analog peer-dep version doesn't exist for an intermediate hop | Low (Analog 2.5.1 covers 15–21) | Jump Analog to 2.5.1 immediately at hop 1; it then stays put through all hops |
| `nx migrate` fails to update an Analog-specific config | Medium | Manually edit `vite.config.ts` / analog plugin options if needed |
| Schematic migration mangles `ng-packagr` config | Low | Diff `libs/ui/ng-package.json` after each hop; revert hand-changes if needed |
| Zoneless flip exposes a hidden zone dependency in a component | Low (audit found none) | If a smoke test breaks, the file/component appears in the stack trace — fix and re-test |
| TS upgrade flags new type errors in library code | Medium | Each hop must compile clean; fix errors in the same hop's commit (don't defer) |
| Vitest version bump breaks test setup | Medium | Pinned by Analog peer-dep; if Analog can't catch up, manually pin vitest in root `package.json` |
| `@analogjs/vitest-angular` has no `setup-zoneless` entry | Medium | Fall back to manual zoneless testbed bootstrap (see Zoneless flip section) |

---

## Verification checklist per hop

After each `nx migrate` hop, confirm all of these before committing:

- [ ] `pnpm install --no-frozen-lockfile` resolves with no peer-dep errors (warnings on Analog are OK at hops 1–2 if Analog hasn't been bumped yet)
- [ ] `pnpm nx run-many -t build` passes for all projects
- [ ] `pnpm nx run-many -t test` passes for all projects
- [ ] `pnpm nx run-many -t lint` passes for all projects
- [ ] `pnpm nx serve docs` boots and the homepage renders
- [ ] No new TypeScript errors introduced
- [ ] `libs/ui/ng-package.json` still valid (build emits the expected `dist/libs/ui` artifact)

---

## Post-v0.1.0: deferred decisions

These are out of scope for v0.1.0 but worth tracking for later:

1. **Long-term docs framework strategy.** When Angular 22 ships stable, Analog may lag. Options to grill then: keep Analog + accept lag, replace with Storybook for Angular, replace with plain Angular CLI app, replace with non-Angular framework (Astro/VitePress) using component embeds, or no-docs-site + README-only.
2. **v2.0.0 on Angular 22.** When v22 ships stable AND Analog ships v22 support (or the docs framework decision above resolves), cut `@ng-brutalism/ui@2.0.0` peer `^22.0.0` following the same recipe (one hop instead of three).
3. **Visual regression testing.** Not in v0.1.0. Consider Playwright + percy/chromatic when the component count or visual surface justifies it.
4. **Stable release (`1.0.0`).** Cut when API has been exercised by real users and a clear set of design decisions feels final.

---

## Starting the new session

Pick up here:

> "I have a migration plan at `/Users/khangtrann/ng-brutalism/MIGRATION_TO_NG21.md`. Help me execute the pre-flight step: review the in-flight `select` changes, finalize them, and commit on `main` so I have a clean baseline before starting the upgrade branch."

Or, if the `select` work is already committed:

> "Pre-flight done. Start Hop 1 (Angular 18 → 19) per the plan in `MIGRATION_TO_NG21.md`."
