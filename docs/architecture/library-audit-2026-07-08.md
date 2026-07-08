# Library Implementation Audit — 2026-07-08

Scope: `libs/ui` (`@ng-brutalism/ui`) + `libs/ui/tokens` + `libs/schematics`.
Branch audited: `refactor/token-customization`.
Method: read core primitives + representative components (button, select,
accordion, dialog, checkbox, rating, field), ran the library's own gates
(`ui:lint`, `ui:test`, `ui:build`, `smoke:ui`, `api-guard`), and scanned the
whole source tree for SSR safety, code smells, a11y wiring, and theming.

---

## Verdict

The library is **mature and production-shaped**. Code quality is high and
consistent: modern Angular idioms everywhere, a clean composition architecture,
excellent SSR discipline, and real a11y wiring on the interactive components.
Green on lint, unit tests (49 spec files), library build, and the end-to-end
package smoke test (`ng add` + `ng build` in a fresh app).

The open work is **not implementation quality** — it is release hygiene (one red
CI gate, an empty changelog for a large refactor, uncommitted doc deletions) and
**roadmap breadth** (no dark theme, no visual-regression net, missing a handful
of common primitives).

---

## Strengths (verified)

1. **Modern Angular throughout.** Signal inputs/`model`/`computed`/`effect`,
   standalone directives & components, `hostDirectives` capability composition,
   `booleanAttribute` transforms, `ChangeDetectionStrategy.OnPush` on every
   component, zoneless-friendly. No `NgModule`, no `@Input()` decorators.
2. **Composition-first design.** Cross-cutting behavior lives in tiny
   capabilities (`NbToneCapability`, `NbUnderlineCapability`,
   `NbResetMarginCapability`) mixed in via `hostDirectives`. Form/text controls
   (`button`, `checkbox`, `input`) are directives on **native elements**, so they
   inherit native focus, keyboard, and `ControlValueAccessor` behavior for free.
3. **SSR-safe by construction.** Only `nb-select` touches `document`/`window`,
   and every access is guarded by `isPlatformBrowser`. `nb-dialog` guards
   `showModal()`/`close()`. No unguarded browser globals anywhere else.
4. **Real accessibility, not attribute theater.**
   - `nb-select`: full listbox pattern — `aria-haspopup`/`expanded`/`controls`,
     roving focus, typeahead, Escape/Arrow/Enter/Space handling, popover API.
   - `nb-field`: computes `aria-describedby` by joining description + (when
     invalid) error ids, plus `aria-invalid`/`aria-required` from a shared
     `trackControlStatus` helper.
   - `nb-accordion`: keyboard nav with focus management over enabled triggers.
   - `nb-dialog`: native `<dialog>` (focus trap + Esc for free).
   - `nb-icon`: dev-mode `console.warn` when neither `decorative` nor `label` set.
5. **Clean hygiene.** 0 `TODO`/`FIXME`/`HACK`, 0 `any` in source, 0
   `@ts-ignore`, 1 (legitimate, dev-only) `console.warn`.
6. **CSS-first token system.** Three tiers (raw palette → `--nb-tone-*` slots →
   per-component `--nb-<c>-*` hooks). Scalar inputs (`radius`/`shadow`/`border`)
   flow through typed `nbXStyleTransform` functions to public CSS variables.
   `prefers-reduced-motion` zeroes motion tokens.
7. **Packaging done right.** Granular `exports` map with per-component CSS for
   opt-in tree-shaking, `sideEffects: ["**/*.css"]`, secondary `tokens` entry
   point, `ng-add` schematic. Fresh-app smoke build: 105 KB JS / 75 KB CSS.

---

## Findings (severity-ranked)

### HIGH — release hygiene (blocks a clean publish)

- **H1 · `api-guard` is red.** The failure is baseline drift from JSDoc comments
  being dropped in ng-packagr's `.d.ts` rollup — the exported symbols are
  identical, only comments/ordering differ. It's cosmetic but it fails CI.
  *Fix:* either regenerate the baseline (`pnpm api-guard:update`) or make the
  guard's normalizer strip comments/whitespace before diffing so it can't fail
  on this class of artifact again.
- **H2 · Large refactor is unreleased and unlogged.** This branch is ~15 commits
  ahead of `main` (new `@ng-brutalism/ui/tokens` entry point, token-customization
  overhaul, per-component CSS exports, 8 new docs pages, select forms tests), yet
  `CHANGELOG.md` `[Unreleased]` is **empty** and `package.json` is still `0.2.0`.
  The new sub-entry point + token changes are minor-bump-worthy (→ `0.3.0`).
  *Fix:* write the `[Unreleased]` entry, choose the version bump, follow
  `docs/release/RELEASE.md`.
- **H3 · Uncommitted doc deletions.** Five completed architecture docs
  (`design-system-audit-2026-07-06`, `design-system-refactor-plan-2026-07-07`,
  `v0.3-refactor-plan`, `customization-flexibility-plan`, `capability-discovery`)
  are staged as deletions but not committed, and were **not** moved to
  `docs/_archive/`. Decide archive-vs-drop and commit, so the tree isn't left in
  a half-cleaned state.

### MEDIUM — roadmap gaps

- **M1 · No dark theme.** The token layer has no `prefers-color-scheme` and no
  `data-theme` hook (only `prefers-reduced-motion`). This is the single most
  expected feature of a modern design system and the highest-value next build.
- **M2 · No visual-regression net.** Brutalism is defined by shadows, offsets,
  and hard borders — exactly what unit tests can't catch. A Playwright
  screenshot-per-component harness would protect the thing that matters most.

### LOW — polish / API ergonomics

- **L1 · `nb-select` uses strict `===` for selection** (`nb-select.ts:153,254`),
  so object-valued options require reference stability. Fine for primitive
  values; add a `compareWith` input if object binding is a supported use case
  (matches Angular Material / Radix semantics).
- **L2 · Missing common primitives:** Tabs, Tooltip, Menu/Dropdown, Toast,
  Switch, Radio (already tracked as the unscheduled Phase 6 list).

---

## Next Action Plan (priority order)

| # | Action | Why | Effort |
|---|--------|-----|--------|
| 1 | Fix `api-guard` (regen baseline **or** strip comments in the normalizer) | Unblocks CI — the only red gate | S |
| 2 | Write `CHANGELOG` `[Unreleased]`, pick `0.3.0`, cut the release | Big refactor is shipped but invisible to consumers | S |
| 3 | Commit the architecture-doc deletions (archive or drop) | Leaves the working tree clean | XS |
| 4 | Design + ship a dark theme (`data-theme="dark"` token overrides + docs page) | Highest-value roadmap feature; most-requested | M |
| 5 | Stand up a Playwright visual-regression suite (one story per component) | Protects the visual identity unit tests can't | M |
| 6 | Add `compareWith` to `nb-select` | Removes the object-value foot-gun | S |
| 7 | Begin Phase 6 primitives (Tabs → Switch → Radio → Tooltip → Menu → Toast) | Close the gap vs mature libraries | L |

**Recommended immediate sequence:** 1 → 2 → 3 (a half-day of release hygiene that
gets the branch mergeable and publishable), then 4 (dark theme) as the next real
feature.
