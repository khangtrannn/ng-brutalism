# Library Improvement Plan — 2026-07-09

> **Status (2026-07-10): Phases 1–4 shipped** on `refactor/token-customization`
> — `ca4377e` (Phase 1: type consolidation + export drift), `b7abc3a`
> (Phase 2: export-drift checker), `59a17e0` (Phase 3: CSS token discipline +
> reduced-motion + hook contract), `731fe0c` (Phase 4: JSDoc). Release of 0.3.0
> (F4) is prepared but not published. **Phase 5 (roadmap: visual-regression
> suite → dark theme → Phase 6 primitives) is not started.**


Scope: `libs/ui` (`@ng-brutalism/ui`) + `libs/ui/tokens`, audited on branch
`refactor/token-customization` **including uncommitted working-tree changes**
(shared token-type consolidation: new `size.ts`/`shape.ts`, `NbOrientation`,
`NbIconShape`; callout default size `lg` → `md`).

Builds on the frozen audit `docs/_archive/library-audit-2026-07-08.md`. That
audit's release-hygiene blockers (H1–H3) were resolved: CHANGELOG `[0.3.0]` is
written, `libs/ui/package.json` is bumped to 0.3.0, and the doc deletions were
archived. This plan covers what the new working-tree changes introduce plus
deeper consistency findings the previous audit did not reach.

Method: read core primitives, capabilities, input transforms, tokens sublibrary,
and representative components (button, callout, status-dot, icon-button, chip,
input-group, select types); ran `ui:lint`, `ui:test`, `ui:build`, `api-guard`,
`docs:tokens:check`; scripted scans for architecture anti-patterns, public-API
export drift, hardcoded token values, and reduced-motion coverage.

---

## Where the library stands (verified 2026-07-09)

Green on the current working tree: `ui:lint`, `ui:test`, `ui:build`,
`docs:tokens:check` (37 components). `api-guard` is **red** — expected, see A3.

Architecture compliance with `token-customization.md` is a near-clean sweep:

- **No final inline style bindings** for customizable tokens. The only
  `[style.<property>]` bindings left are the sanctioned runtime exceptions
  (§22): progress fill width, icon mask/background image, cluster separator
  geometry — plus one borderline case (C3, chip `text-transform`).
- **No mirror data attributes** (`data-radius` / `data-shadow` / `data-padding`
  / `data-gap`) anywhere.
- **No TS-duplicated CSS defaults** — zero `nb*Value` resolver calls outside
  the input-transform layer; no `resolvedX` computeds.
- **Every component directory has spec files.** Tone recipes are centralized;
  scalar inputs flow through named `nb*StyleTransform` functions into public
  per-component CSS variables, exactly as specified.

The remaining work is **consistency at the edges** — finishing the in-flight
type consolidation, closing public-API export drift, and evening out the CSS
token discipline — plus the carried-over roadmap (dark theme, visual
regression, new primitives).

---

## Findings

### A — Land the in-flight branch cleanly (blocks everything else)

**A1 · Type consolidation is half-applied.** The working tree introduces shared
vocabulary types (`NbSize`, `NbControlSize`, `NbSizeXs`, `NbOrientation`,
`NbIconShape`) and rebases 14 component aliases onto them — but several inline
unions that fit the same vocabulary remain:

| File | Current | Could be |
|---|---|---|
| `split/nb-split.ts:26` | `NbSplitCollapse = 'none' \| 'sm' \| 'md' \| 'lg'` | `'none' \| NbControlSize` |
| `chip/nb-chip.ts:33` | `NbChipSize = 'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none' \| NbSize` |
| `surface/nb-surface.ts:25` | `NbSurfaceSize = 'auto' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'auto' \| NbSize` |
| `icon/nb-icon.ts:10` | `NbIconSize = 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `NbSizeXs \| 'xl'` |

(`NbTextSize`/`NbTextMeasure` have genuinely different scales — leave them.
`NbHalftoneShape` adds `rectangle`; composing it from `NbIconShape` is optional
and arguably less readable — decide once, note the decision in
`design-props.md`.)

**A2 · New token types missing from the root entry point.** `libs/ui/src/index.ts`
re-exports every token type *except* the five new ones (`NbSize`,
`NbControlSize`, `NbSizeXs`, `NbOrientation`, `NbIconShape`). Consumers of the
main entry can name `NbRadius` but not `NbSize`.

**A3 · api-guard is red and the changelog is behind the working tree.**
The baseline predates the type consolidation, so `pnpm api-guard` fails on the
current tree. More importantly, **the callout default size change (`lg` → `md`)
is a user-visible behavioral change** that appears in no changelog entry —
`[Unreleased]` is empty and `[0.3.0]` (dated 2026-07-08) predates it. Since
0.3.0 is not yet tagged, fold it into `[0.3.0]` under **Changed** with a clear
"visual default changed" callout; log the type consolidation too (non-breaking:
aliases resolve to identical unions).

**A4 · Stale docs-index links.** `docs/INDEX.md:60` and `docs/progress.md:28,30`
point to `docs/architecture/library-audit-2026-07-08.md`, but the file lives in
`docs/_archive/`. (Fixed alongside this plan.)

### B — Public API surface consistency

**B1 · Export drift: public input types unreachable from the root entry.**
Scripted comparison of types defined in component files vs. component barrels
vs. `src/index.ts`:

In the component barrel but **not re-exported at root** — users cannot import
these from `@ng-brutalism/ui` even though they type public inputs:

```txt
NbCalloutRadius · NbChipRadius · NbChipShadow · NbDialogTone · NbDialogRadius
NbDialogShadow · NbDialogBorder · NbStatusDotSize · NbStatusDotRadius
```

Defined but **not even in the component barrel** (public-facing subset —
controllers/injection tokens like `NB_SELECT` are legitimately internal):

```txt
NbCalloutBorder · NbInputTone · NbInputBorder · NbInputRadius · NbInputShadow
NbProgressTone · NbRatingTone · NbChipGroupGap · NbClusterPadding
NbTextUnderline · NbInputAffixAlign (new this branch)
```

*Fix in two parts:* (1) close the current gaps; (2) make drift impossible by
adding a check — a small script (the audit's comparison can be reused) run in
the same gate as `api-guard`, asserting every `export type Nb*` that types a
public `input()` is reachable from the root entry. Decide and document the
policy for intentionally-internal exports (controllers, `NB_*` tokens) — e.g.
a `/** @internal */` tag or an allowlist in the checker.

### C — Theming / CSS token discipline

**C1 · Hardcoded `2px` borders bypass `--nb-border-width`.** `theme.css` defines
`--nb-border-width: 2px` as the themable border weight, but eight stylesheets
hardcode `2px`, so a theme that changes border weight (or a future
`theme-soft` variant) silently misses them:

```txt
status-dot/nb-status-dot.css:5      progress/nb-progress.css:7
surface/nb-surface.css:60,63        marquee/nb-marquee.css:11,12
dialog/nb-dialog.css:22,23          input-group/nb-input-group.css:6
avatar-group/nb-avatar-group.css:23 select/nb-select.css:119
```

*Fix:* replace with `var(--nb-border-width)` (or a deliberate component-level
fallback chain). Add a grep-based lint/CI check for `border[^-].*[0-9]px`
patterns in `libs/ui/src/lib/**/*.css` if this class of drift recurs.

**C2 · Uneven public CSS-variable hook coverage across size presets.** The
architecture's reference component (callout) exposes hooks per anatomy value in
each size rule (`--nb-callout-min-height`, `--nb-callout-padding`,
`--nb-callout-font-size`, …). Button and status-dot hardcode their size-preset
values (`height: 2.75rem`, `width: 12px`) with no equivalent hooks. This may be
intentional tiering (`design-props.md` distinguishes standard-input vs
CSS-only-hook tiers), but the tier assignment per component/property is not
recorded anywhere, so coverage looks arbitrary from outside. *Fix:* extend the
per-component matrix in `design-props.md` with a "public CSS var hooks" column,
decide the minimum contract (recommendation: bg/fg/border-color/border-width/
radius/shadow everywhere; anatomy hooks like min-height/padding only where a
real use case exists), and reconcile the CSS. The token-reference generator
(`docs:tokens:check`) already parses component CSS — extend it to flag
components below the minimum contract.

**C3 · `nb-chip` writes final `text-transform` inline** (`nb-chip.ts:96`). A
scalar design value bound as a final property — the pattern §22 forbids —
rather than through a `--nb-chip-text-transform` variable slot. Small, but it
is the only non-sanctioned inline final property left. Migrate or explicitly
add it to the §22 exception list with a reason.

### D — Accessibility

**D1 · `nb-status-dot` "live" pulse ignores `prefers-reduced-motion`.** The
animation uses a hardcoded `2s` duration (`nb-status-dot.css:39`); the global
reduced-motion block only zeroes `--nb-motion-fast/base` (`theme.css:142`), and
unlike marquee, status-dot has no local `@media (prefers-reduced-motion:
reduce)` rule. An infinitely pulsing element is exactly what that preference
exists for. *Fix:* disable the animation under reduced motion (match marquee's
pattern), and consider a `--nb-motion-pulse` token so future animations are
covered by the theme block automatically.

### E — Consumer DX

**E1 · Zero JSDoc across the public API.** None of the 70 exported classes (or
the exported types) carry doc comments, so consumers get no IDE hover docs, and
no API reference can be extracted. For a published library with this level of
internal polish, it is the single biggest DX gap. *Fix:* one doc comment per
exported directive/component (what it does, selector contract, one usage line)
and per public input where the name isn't self-evident. Verify api-guard
tolerates comment-only changes first (its 2026-07-08 failure mode was comment
stripping in the `.d.ts` rollup — if the normalizer still diffs comments,
harden it as part of this task).

### F — Carried-over roadmap (unchanged from 2026-07-08 audit)

- **F1 · Dark theme** — no `prefers-color-scheme` / `data-theme` hook yet.
  Highest-value feature gap. (Explicitly out of scope for the current branch.)
- **F2 · Playwright visual-regression suite** — the brutalist visual identity
  (shadows, offsets, hard borders) has no automated net; C1/C2-class
  regressions are invisible to unit tests. This suite is also the prerequisite
  safety net for shipping F1 confidently.
- **F3 · Phase 6 primitives** — Tabs, Switch, Radio, Tooltip, Menu, Toast.
- **F4 · Ship 0.3.0** — runbook in `docs/release/RELEASE.md`, after Phase 1
  below.

---

## Action plan

Phased so each phase is independently verifiable and committable.

### Phase 1 — Land the branch (S, do first)

1. Finish A1's four type consolidations → verify: `ui:lint` + `ui:test` green,
   no behavior change.
2. Add the five new token types to root `src/index.ts` re-exports (A2).
3. Close B1's export gaps (root re-exports + barrel exports for public input
   types) while the API surface is already being regenerated.
4. `pnpm nx build ui && pnpm api-guard:update`; review the baseline diff to
   confirm only intended additions (A3).
5. Update CHANGELOG `[0.3.0]`: callout default `lg`→`md` under **Changed**
   (call out the visual default change), type consolidation note, new exported
   types under **Added**.
6. Commit; then release 0.3.0 per `docs/release/RELEASE.md` (F4).

→ verify: `ui:lint`, `ui:test`, `ui:build`, `api-guard`, `smoke:ui` all green.

### Phase 2 — Automate API-surface consistency (S)

7. Add the export-drift checker to the api-guard gate; document the
   internal-export policy (B1 part 2).

→ verify: checker fails when a barrel type is dropped from root (test by
   temporarily removing one), passes on clean tree.

### Phase 3 — CSS token discipline + a11y fix (S–M)

8. Replace hardcoded `2px` borders with `var(--nb-border-width)` (C1).
9. Fix status-dot reduced-motion (D1).
10. Decide chip `text-transform` (migrate to var or document exception) (C3).
11. Record the CSS-var hook tiers in `design-props.md` and reconcile gaps (C2).

→ verify: `docs:tokens:check` updated + green; visual spot-check of the three
   themes on the docs site; reduced-motion emulation shows no pulse.

### Phase 4 — JSDoc the public API (M)

12. Doc comments on all exported classes + non-obvious inputs/types (E1),
    hardening the api-guard normalizer first if needed.

→ verify: hover docs appear in IDE for `NbButton`/`NbCallout`; `api-guard`
   green after baseline regen.

### Phase 5 — Roadmap (M–L, in order)

13. Playwright visual-regression suite (F2) — deliberately **before** dark
    theme, so the theme lands with a safety net.
14. Dark theme (F1).
15. Phase 6 primitives (F3), Tabs first.

---

## Non-findings (checked, explicitly fine)

- SSR safety, a11y wiring on interactive components, OnPush/signals/standalone
  discipline, packaging (`exports` map, `sideEffects`, secondary entry point,
  schematics) — re-verified unchanged from the 2026-07-08 audit's strengths.
- `icon-button`'s `iconSizeMap` TS mapping — behavioral size→icon-size
  coupling, not a token-customization concern; correct per §22.
- Remaining `[style.*]` bindings (progress fill, icon mask, cluster separator
  gap) — sanctioned runtime exceptions.
- `NbTextSize` / `NbTextMeasure` keeping bespoke scales — intentional.
