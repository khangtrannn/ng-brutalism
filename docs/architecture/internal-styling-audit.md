# Internal Styling Audit

Snapshot taken on `refactor/token-customization` at commit `9c74fcf`. Phase 0 — audit
only, no implementation files were changed while producing this report.

## Summary

- Total `nbClass` internal usages: **71 calls** across **34 files** (plus the definition
  in `core/class.ts` and the re-export in `index.ts`, both `PUBLIC_API_KEEP`)
- Total `--nb-resolved` usages: **53**, all inside `*.spec.ts` files as **negative**
  assertions (`expect(...).not.toContain('--nb-resolved')`) — none in implementation code
- Total `--_nb-` usages: **0**
- Total legacy marker class usages: **0** in implementation; **5** negative-assertion
  spec references (`'does not emit legacy capability marker classes'`) confirming the
  removal landed in `563f34c`
- Public `nbClass` API status: exported from `libs/ui/src/lib/core/class.ts` and
  re-exported from `libs/ui/src/index.ts` — stays public per the architecture target

## Implementation status (post-audit)

Phase 1 and Phase 2 — plus the tightly-coupled follow-ups this audit recommended folding
in (`NbInputGroup`/`NbInputGroupPrefix`/`NbInputGroupSuffix`, `NbButtonTrailingIcon`,
`NbLabel`) — have since been implemented on top of this snapshot and verified:

- `nbClass`/`[class]` removed from all eleven files; anatomy now lives in `styles` keyed
  on `data-*` attrs, with radius/shadow/focus-ring read directly from public hooks
- The `TEST_UPDATE_REQUIRED` specs listed below were rewritten to assert on data-attrs
  and computed styles instead of Tailwind class-string fragments
- `nx run ui:test`, `nx run ui:lint`, and `nx run ui:build` all pass

The tables below are kept as-written (the Phase 0 snapshot/proposal) for historical
reference; "proposed action" describes what was then implemented.

## Phase 1 candidates (implemented — see status note above)

Scope per plan: `NbButton`, `NbIconButton`, `NbSurface`, `NbInput`, `NbTextarea`, `NbNativeSelect`.

| File | Issue | Reason | Proposed action |
|---|---|---|---|
| [nb-button.ts](../../libs/ui/src/lib/button/nb-button.ts#L9) | Imports `nbClass`; `classes` computed (L78-90) builds the entire host class string (layout, focus-visible ring, disabled/aria-disabled, press hover-shadow variants via `shadowClass()`, size variants via `sizeClass()`) and is bound through `[class]` (L49) | Static layout/focus/disabled/size/press styling is exactly what the plan says belongs in `styles` + data-attrs; `data-press`/`data-size` attrs already exist (L50-51) so selectors can key off them | Move base layout, focus-visible, disabled, `[&_svg]` rules, size variants (`sm/md/lg/xl`), `fullWidth`, and press hover-shadow rules into `styles` keyed on `[data-size]`/`[data-press]`/`[data-full-width]`; drop `nbClass` import and `classes`/`shadowClass`/`sizeClass` |
| [nb-icon-button.ts](../../libs/ui/src/lib/icon-button/nb-icon-button.ts#L9) | Imports `nbClass`; `classes` computed (L104-115) builds layout, hover-shadow, focus-visible, disabled, size (`sizeMap`), and shape (`circle`/`square`) classes, bound via `[class]` (L69) | Same static-styling pattern as Button; `data-shape`/`data-size` attrs already exist (L70, L95) | Move layout/hover-shadow/focus/disabled/size/shape rules into `styles` keyed on `[data-shape]`/`[data-size]`; drop `nbClass` import and `classes`/`sizeMap` lookups from the template layer |
| [nb-surface.ts](../../libs/ui/src/lib/surface/nb-surface.ts#L9) | Imports `nbClass`; `classes` computed (L101-109) composes `sizeClass()`/`layoutClass()`/`edgeClass()`; `edgeClass()` (L134-143) additionally injects **local CSS custom properties** (`--nb-surface-edge-width`, `--nb-surface-edge-color`) through Tailwind arbitrary-property class syntax | Mixes static layout styling with ad-hoc CSS-variable injection via class strings — exactly the `[class]`/`[style.--nb-*]` anti-pattern the plan calls out; `data-size`/`data-layout`/`data-edge` attrs already exist (L67-69) | Move size/layout/edge rules into `styles` keyed on `[data-size]`/`[data-layout]`/`[data-edge]`; express the edge border directly in CSS (`border-top-width`, `border-color`) reading `var(--nb-border)` — no need for the intermediate `--nb-surface-edge-*` vars; drop `nbClass` import and the three class-builder methods |
| [nb-input.ts](../../libs/ui/src/lib/input/nb-input.ts#L3) | Imports `nbClass`; `classes` computed (L57-80) sets **local anatomy vars** (`--nb-input-radius`, `--nb-input-shadow`) via Tailwind arbitrary-property syntax, then consumes them in the same string for `rounded-(--nb-input-radius)`/`shadow-[var(--nb-input-shadow)]`, plus group/standalone layout, placeholder, file-input, focus-ring styling | Radius/shadow should be read straight from the public hooks in CSS (`border-radius: var(--nb-input-radius, var(--nb-radius))`, mirroring `styles.css` L270) instead of being funnelled through class-string-assigned vars; layout/placeholder/file/focus rules are static and belong in `styles` | Add `border-radius`/`box-shadow` rules to component CSS reading `var(--nb-input-radius, var(--nb-radius))` / shadow tokens directly; move flex/placeholder/file/disabled/focus-ring rules into `styles` keyed on `[data-size]` and an in-group data attr (e.g. `[data-in-group]`, mirroring `isInGroup`); drop `nbClass` import and `classes` |
| [nb-textarea.ts](../../libs/ui/src/lib/textarea/nb-textarea.ts#L3) | Same pattern as `nb-input.ts`: `classes` computed (L54-74) assigns `--nb-textarea-radius`/`--nb-textarea-shadow` via class strings, plus static layout/placeholder/disabled/resize/focus rules | Identical reasoning to Input | Same treatment as Input: move radius/shadow to direct CSS reads of `var(--nb-textarea-radius, var(--nb-radius))`; move static rules to `styles` keyed on `[data-size]`/in-group attr; drop `nbClass` |
| [nb-native-select.ts](../../libs/ui/src/lib/select/nb-native-select.ts#L3) | Imports `nbClass`; `classes` computed (L52-71) assigns `--nb-select-radius` via class string, references the `shadow-nb` Tailwind utility, plus static layout/disabled/focus-ring rules | Same anti-pattern as Input/Textarea; also the only Phase 1 file referencing the `shadow-nb` utility class instead of a token var | Move radius to a direct `border-radius: var(--nb-select-radius, var(--nb-radius))` CSS rule; replace `shadow-nb` with a direct `box-shadow` rule reading shadow tokens; move static layout/disabled/focus-ring rules into `styles` keyed on in-group attr; drop `nbClass` |

All six files also bind `'[class]': 'classes()'` in `host` — these bindings are removed as
part of the migration above (replaced by the static `class: 'nb-button'`-style anatomy
class plus `styles` + data attrs, per the Accordion reference pattern).

## Phase 2 candidates (implemented — see status note above)

Scope per plan: `NbStack`, `NbCluster`, `NbSplit`.

| File | Issue | Reason | Proposed action |
|---|---|---|---|
| [nb-stack.ts](../../libs/ui/src/lib/stack/nb-stack.ts#L60) | Imports `nbClass`; `classes` computed (L60-?) builds layout/gap classes, separate `solid`/`dashed`/`thick` separator class maps (L93-107) built with `nbClass`, bound via `[class]` (L32); `[style.--nb-stack-separator-gap]` (L38) sets a component-local anatomy var | Layout, gap fallback, and separator styling are exactly what Phase 2 says moves to `styles` + `data-separator`/`data-direction` selectors; `--nb-stack-separator-gap` is allowed to remain as a component-local anatomy var per the plan | Move `display:flex/flex-direction/gap` and the `solid/dashed/thick` separator pseudo-element rules into `styles` keyed on `[data-separator]`; keep `--nb-stack-separator-gap` as-is (already a `[style.*]` binding for an explicit input, matches the allowed pattern); drop `nbClass` import and the separator class maps |
| [nb-cluster.ts](../../libs/ui/src/lib/cluster/nb-cluster.ts#L84) | Same shape as Stack: `classes` computed (L84+) plus `separatorBaseClass`/`separatorStyleClass` maps (L145-163) built with `nbClass`, `[class]` binding (L46), `[style.--nb-cluster-separator-gap]` (L53) | Same reasoning as Stack | Same treatment: move layout/wrap/align/justify/separator rules into `styles` keyed on `data-align`/`data-justify`/`data-wrap`/`data-separator`; keep `--nb-cluster-separator-gap`; drop `nbClass` |
| [nb-split.ts](../../libs/ui/src/lib/split/nb-split.ts#L81) | Same shape again: `classes`/`separatorBaseClass`/`separatorStyleClass` maps (L81, 133, 144-163) built with `nbClass`, `[class]` binding (L48), `[style.--nb-split-separator-gap]` (L54); also the only one of the three referencing `--nb-border-width` directly in arbitrary-property class syntax (L156, 160) | Same reasoning as Stack/Cluster, plus the direct `--nb-border-width` reference should move into `styles` so it reads the public hook in CSS rather than through a Tailwind arbitrary-value selector string | Same treatment as Stack/Cluster; express the `border-inline-end-width: var(--nb-border-width)` rule directly in `styles`; keep `--nb-split-separator-gap`; drop `nbClass` |

## Phase 3 candidates

These are the complex/stateful primitives named in the plan's Phase 3 scope. Per the
plan, Phase 3 is an **audit-and-classify** step, not a migration — the table below only
flags the files and the specific `nbClass`/CSS-variable touchpoints that the Phase 3
audit will need to classify (`PUBLIC_HOOK` / `INTERNAL_ANATOMY_VAR` /
`STATE_SCOPED_EXCEPTION` / `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` /
`SHOULD_MIGRATE_TO_DATA_SELECTOR`).

The classification itself is now finalized — see "Phase 3 classification (finalized)"
below. The table here is kept as-written (the original flagging pass) for historical
reference.

| File | Issue | Reason | Proposed action |
|---|---|---|---|
| [nb-select.ts](../../libs/ui/src/lib/select/nb-select.ts#L160) / [nb-select-option.ts](../../libs/ui/src/lib/select/nb-select-option.ts#L76) | Four separate `nbClass`-built class computeds (`triggerClasses`, `valueClasses`, `listboxClasses`, `hostClasses`) plus `[style.--nb-select-focus-ring-color]` (L97) and a per-option mirror (`select-option.ts` L28) | Listbox/trigger/option overlay styling is stateful (open/closed, highlighted, selected) and spans two components — needs its own migration plan, not a quick pass | Defer to Phase 3 audit: classify `--nb-select-focus-ring-color` and decide whether trigger/listbox/option styling can move to `styles` + `data-state`/`data-highlighted`/`data-selected` selectors |
| [nb-checkbox.ts](../../libs/ui/src/lib/checkbox/nb-checkbox.ts#L31) | `classes` computed via `nbClass`; `[style.--nb-checkbox-bg]`/`[style.--nb-checkbox-fg]` (L13-14) assign tone-resolved colors to component-local vars | `--nb-checkbox-{bg,fg}` look like capability-resolved tone values funnelled through intermediate vars rather than mapped straight to `background`/`color`, similar to what Button/Surface already do directly | Defer to Phase 3 audit: classify `--nb-checkbox-bg`/`-fg` (likely `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` unless the checkmark glyph/CSS needs the var indirection) |
| [nb-rating.ts](../../libs/ui/src/lib/rating/nb-rating.ts#L66) | `classes`/`filledClass`/`emptyClass` computeds via `nbClass`, applied through a template `[class]` (L16) on each star span; `[style.--nb-rating-filled]` (L37) assigns a tone-resolved fill color | Per-star class switching plus a tone-resolved fill var — needs to confirm whether the var is required for `::before`/glyph coloring (exception) or can become a direct style binding | Defer to Phase 3 audit: classify `--nb-rating-filled` and decide whether `filledClass`/`emptyClass` can become `data-filled` selectors |
| [nb-progress.ts](../../libs/ui/src/lib/progress/nb-progress.ts#L75) | `hostClass`/`classes` computeds via `nbClass`; reads shadow tokens directly (no var assignment) | Lower complexity than the others in this list — mostly static class strings keyed on size/value | Defer to Phase 3 audit: likely a straightforward `styles` + `data-*` candidate, lowest risk in this group |
| [nb-status-dot.ts](../../libs/ui/src/lib/status-dot/nb-status-dot.ts#L59) | `classes` computed via `nbClass`; `[style.--nb-status-dot-size]` (L41) sets a size var | `--nb-status-dot-size` looks like a component-local anatomy var (drives `width`/`height`), not a style-capability hook | Defer to Phase 3 audit: likely `INTERNAL_ANATOMY_VAR`, but evaluate replacing with direct `[style.width]`/`[style.height]` bindings (`SHOULD_MIGRATE_TO_ACTUAL_PROPERTY`) |
| [nb-chip.ts](../../libs/ui/src/lib/chip/nb-chip.ts#L109) | Two `nbClass` computeds (L109, 164); `[style.--nb-chip-radius]`/`[style.--nb-chip-shadow]` (L147-148) assign capability-resolved values (`chipRadiusValue()`/`chipShadowValue()`) to component-local vars | These read like the same "resolve then funnel through an intermediate var" pattern Button/Surface avoid by binding `border-radius`/`box-shadow` directly | Defer to Phase 3 audit: classify `--nb-chip-radius`/`-shadow` (candidate `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY`) |
| [nb-badge.ts](../../libs/ui/src/lib/badge/nb-badge.ts#L55) | Single `classes` computed via `nbClass`; no CSS-variable assignment found | Lowest-complexity item in this group — mostly static/tone-driven class strings | Defer to Phase 3 audit: likely a straightforward `styles` + `data-*` candidate |
| [nb-card.ts](../../libs/ui/src/lib/card/nb-card.ts) (7 sub-directives: `NbCard`, `NbCardHeader`, `NbCardTitle`, `NbCardDescription`, `NbCardMedia`, `NbCardContent`, `NbCardFooter`) | Seven separate `classes`/`classes()` computeds via `nbClass` (L64, 92, 108, 121, 138, 156, 169), each with its own `[class]` host binding | Largest single-file surface area in this group — needs a sub-component-by-sub-component migration plan, not a single pass | Defer to Phase 3 audit: enumerate each sub-directive's static vs. tone-driven styling separately |
| [nb-avatar.ts](../../libs/ui/src/lib/avatar/nb-avatar.ts#L86) | `classes` computed via `nbClass`; reads `--nb-avatar-shadow`/`--nb-avatar-border-width` through `styles.css` token fallbacks (no internal var assignment) | Comparatively contained — CSS already reads public hooks directly; only the `nbClass`/`[class]` removal is in scope | Defer to Phase 3 audit: likely a `styles` + `data-*` candidate with no var-classification work needed |
| [nb-image-card.ts](../../libs/ui/src/lib/image-card/nb-image-card.ts#L98) | Three `classes`/`imageClasses`/`classes` computeds via `nbClass` across the card, image, and figure sub-elements (L98, 103, 127) | Multiple sub-elements each with their own class composition — similar shape to Card but smaller | Defer to Phase 3 audit: enumerate per-sub-element styling |
| [nb-dialog.ts](../../libs/ui/src/lib/dialog/nb-dialog.ts#L80) / [nb-dialog-actions.ts](../../libs/ui/src/lib/dialog/nb-dialog-actions.ts#L15) / [nb-dialog-content.ts](../../libs/ui/src/lib/dialog/nb-dialog-content.ts#L15) / [nb-dialog-description.ts](../../libs/ui/src/lib/dialog/nb-dialog-description.ts#L13) | Four sub-components each with their own `classes` computed via `nbClass`; no var assignment found; CSS already reads `--nb-dialog-shadow`/`-border-width` from `styles.css` | Multiple files but each individually low-complexity — mostly static class strings | Defer to Phase 3 audit: likely a coordinated but mechanical `styles` + `data-*` migration across all four files |
| [nb-callout.ts](../../libs/ui/src/lib/callout/nb-callout.ts#L66) | `classes` computed via `nbClass`; `[style.--nb-callout-radius]` (L45) assigns `radiusStyle()` (a capability-resolved value) to a component-local var | Same "resolve then funnel through an intermediate var" question as Chip/Checkbox — needs to confirm whether the var is consumed elsewhere (icon slot, pseudo-element) before concluding it should become a direct `border-radius` binding | Defer to Phase 3 audit: classify `--nb-callout-radius` (candidate `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` pending confirmation of consumers) |
| [nb-media-frame.ts](../../libs/ui/src/lib/media-frame/nb-media-frame.ts#L86) | `classes` computed via `nbClass`; reads `--nb-media-frame-border-width` from `styles.css` (no internal var assignment) | Comparatively contained, similar to Avatar | Defer to Phase 3 audit: likely a `styles` + `data-*` candidate |
| [nb-media-item.ts](../../libs/ui/src/lib/media-item/nb-media-item.ts#L116) | Multiple `nbClass` computeds (`classes`, `iconClasses`, size variant maps `xs/sm/md/lg`, plus a module-level helper, L116-251); `[style.--nb-media-item-icon-bg]` (L222) is conditionally assigned only `surface() ? background() : null` | The icon-bg var assignment is conditional and instance-scoped — looks like a legitimate state-scoped exception, but the surrounding class-map sprawl (4 size variants × icon/plain/chip styles) is the largest non-Card class-composition surface in this group | Defer to Phase 3 audit: classify `--nb-media-item-icon-bg` (candidate `STATE_SCOPED_EXCEPTION`); separately plan the size-variant class-map migration to `data-size`/`data-variant` selectors |
| [nb-sticker.ts](../../libs/ui/src/lib/sticker/nb-sticker.ts#L62) | No `nbClass` (uses static template strings); five `[style.--nb-sticker-*]` bindings (`fill`, `ink`, `shadow`, `rotate`, `scale`, L62-66) drive the sticker's CSS transforms/fills | All five vars look like sticker-specific visual mechanics rather than public style-capability hooks, but the Phase 3 audit should confirm none collide with the public-hook naming convention | Defer to Phase 3 audit: classify the five `--nb-sticker-*` vars (candidate `INTERNAL_ANATOMY_VAR` for all five, pending confirmation) |

### Files referenced by the plan but not in any phase's explicit scope

These showed up in the searches (active `nbClass`/`[style.--nb-*]` usage) but are not
named in Phase 1, 2, or 3 scope lists. Flagging them now so they aren't lost; they will
need their own classification pass (likely folded into or appended after Phase 3).

| File | Issue | Reason | Proposed action |
|---|---|---|---|
| [nb-section.ts](../../libs/ui/src/lib/section/nb-section.ts#L79) | `classes` computed via `nbClass`; `[style.--nb-section-flush-margin]` (L53) | Not named in any phase scope | Add to the post-Phase-3 classification backlog |
| [nb-marquee.ts](../../libs/ui/src/lib/marquee/nb-marquee.ts#L124) | Three `nbClass` computeds (`wrapperClass`, `strip1Class`, `strip2Class`), template-bound via `[class]` | Not named in any phase scope; animation-driven, likely needs careful handling | Add to the post-Phase-3 classification backlog |
| [nb-label.ts](../../libs/ui/src/lib/label/nb-label.ts#L12) | Single static `nbClass('font-bold leading-none')` | Trivial — effectively a constant string passed through `nbClass` for `twMerge` dedup | Could be migrated trivially alongside Phase 1/2 (replace with a literal class), but technically out of named scope — flag for a quick follow-up |
| [nb-stat.ts](../../libs/ui/src/lib/stat/nb-stat.ts#L30) | `classes` computed via `nbClass` | Not named in any phase scope | Add to the post-Phase-3 classification backlog |
| [nb-input-group.ts](../../libs/ui/src/lib/input-group/nb-input-group.ts#L33) / [nb-input-group-prefix.ts](../../libs/ui/src/lib/input-group/nb-input-group-prefix.ts#L20) / [nb-input-group-suffix.ts](../../libs/ui/src/lib/input-group/nb-input-group-suffix.ts#L20) | Each has its own `nbClass` computed; group also assigns `--nb-input-group-radius` via class string (mirrors the Input/Textarea/Select anti-pattern) | Closely coupled to the Phase 1 Input/Textarea/Select migration — likely should move in lockstep with them even though not explicitly named | Recommend folding into Phase 1 (small import-update allowance already covers tightly-coupled siblings) or doing immediately after as a follow-up |
| [nb-button-trailing-icon.ts](../../libs/ui/src/lib/button/nb-button-trailing-icon.ts#L99) | `classes` computed via `nbClass`; references `var(--nb-radius-sm, 0.25rem)` directly in a class-map value | Tightly coupled to `NbButton` (Phase 1) | Recommend migrating alongside `NbButton` as a small coupled follow-up |
| [nb-avatar-group.ts](../../libs/ui/src/lib/avatar-group/nb-avatar-group.ts#L17) | Static `[class]` binding to a literal string (no `nbClass`) | Not dynamic, trivial — `OK_EXCEPTION` candidate rather than a migration target | No action required; could be moved to `styles` opportunistically but isn't part of the `nbClass` removal effort |
| [nb-halftone.ts](../../libs/ui/src/lib/halftone/nb-halftone.ts#L69) | No `nbClass`; six `[style.--nb-halftone-*]` bindings driving canvas-like rendering | Not named in any phase scope; all vars look like component-local rendering parameters | Add to the post-Phase-3 classification backlog (likely `INTERNAL_ANATOMY_VAR`) |
| [nb-icon.ts](../../libs/ui/src/lib/icon/nb-icon.ts#L61) | No `nbClass`; `[style.--nb-icon-color]` reflects a resolved tone value | Not named in any phase scope | Add to the post-Phase-3 classification backlog (candidate `STATE_SCOPED_EXCEPTION` — mirrors the mask-icon coloring pattern) |
| [nb-typography.ts](../../libs/ui/src/lib/typography/nb-typography.ts#L26), [nb-text.ts](../../libs/ui/src/lib/text/nb-text.ts#L130), [nb-display.ts](../../libs/ui/src/lib/display/nb-display.ts#L74) | No `nbClass`; `[style.--nb-typography-font]` / `[style.--nb-underline-{gap,width}]` reflect resolved input values onto component-local vars consumed by descendant CSS | Not named in any phase scope; these already match the "primitive maps explicit input to a var consumed by CSS" shape that the plan endorses for Accordion-style cascading | Add to the post-Phase-3 classification backlog — likely `OK_EXCEPTION` / `INTERNAL_ANATOMY_VAR`, low risk |

## Phase 3 classification (finalized)

Every `nbClass`/CSS-variable touchpoint flagged in the Phase 3 candidates table and the
"referenced but not in scope" table above has now been read and classified using the
plan's five labels. This is still **audit-and-classify only** — no implementation files
were changed to produce this section; it is the input a future migration pass should
work from, file by file.

| File | Touchpoint | Classification | Rationale / migration note |
|---|---|---|---|
| [nb-select.ts](../../libs/ui/src/lib/select/nb-select.ts) / [nb-select-option.ts](../../libs/ui/src/lib/select/nb-select-option.ts) | `triggerClasses`/`valueClasses`/`listboxClasses`/`hostClasses`/option `classes` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Static layout/typography/state strings; `[data-state]`(open/closed)/`[data-disabled]` already cover trigger/listbox. The option needs a new `[data-selected]`/`[data-highlighted]` attr to replace the `selected() ? 'bg-[#bdf7c8]' : 'bg-transparent hover:...'` ternary |
| [nb-select.ts](../../libs/ui/src/lib/select/nb-select.ts#L97) | `--nb-select-focus-ring-color` | `STATE_SCOPED_EXCEPTION` | The color is only consumed inside a `:focus-within` pseudo-selector (`focus-within:ring-[var(...)]`); a direct `[style.outline-color]` binding can't be scoped to that pseudo-state, so the var indirection is required to bridge a resolved value into CSS-only state |
| [nb-select-option.ts](../../libs/ui/src/lib/select/nb-select-option.ts#L28) | `--nb-select-option-focus-ring-color` | `STATE_SCOPED_EXCEPTION` | Same reasoning as the trigger — `:focus-visible` ring color. Already sourced from the `NB_SELECT` controller via DI + `computed()` (the recommended cross-component pattern); only the final hop into the pseudo-selector needs the var |
| [nb-checkbox.ts](../../libs/ui/src/lib/checkbox/nb-checkbox.ts#L30) | `classes` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Static layout/focus/disabled/size rules; `[data-size]` attr already exists |
| [nb-checkbox.ts](../../libs/ui/src/lib/checkbox/nb-checkbox.ts#L13) | `--nb-checkbox-bg`/`-fg` | `STATE_SCOPED_EXCEPTION` | `checked:bg-[var(...)]`/`checked:text-[var(...)]` key off the native `:checked` pseudo-class, which the component does not track as Angular state (no `checked` signal/input). The var lets the resolved tone color apply conditionally in that pseudo-state via pure CSS, without adding change-detection overhead to mirror native checkbox state |
| [nb-rating.ts](../../libs/ui/src/lib/rating/nb-rating.ts#L66) | `classes`/`filledClass`/`emptyClass` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Per-star class switching → a `[data-filled]` attr on each generated star span |
| [nb-rating.ts](../../libs/ui/src/lib/rating/nb-rating.ts#L37) | `--nb-rating-filled` | `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` | The resolved tone color is consumed only by the component's own generated star spans — replace the host-var + `text-(--nb-rating-filled)` indirection with a direct `[style.color]="i <= filled() ? ratingFilledColor() : null"` binding per span |
| [nb-progress.ts](../../libs/ui/src/lib/progress/nb-progress.ts#L74) | `hostClass` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Static layout/border/shadow string; `[attr.data-nb-progress]` selector already present — lowest-risk item in the group as predicted |
| [nb-status-dot.ts](../../libs/ui/src/lib/status-dot/nb-status-dot.ts#L58) | `classes` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Static layout + `stateClass()` map → `[data-state]`/`[data-size]`, both already exist |
| [nb-status-dot.ts](../../libs/ui/src/lib/status-dot/nb-status-dot.ts#L41) | `--nb-status-dot-size` | `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` | `sizeVar()` is a literal px string from a static lookup map — bind `[style.width]`/`[style.height]` directly; no var or Tailwind arbitrary-value syntax needed |
| [nb-chip.ts](../../libs/ui/src/lib/chip/nb-chip.ts#L108) | `classes` (NbChip) | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Static layout/typography + `paddingMap`; `[data-padding]` attr already exists |
| [nb-chip.ts](../../libs/ui/src/lib/chip/nb-chip.ts#L113) | `--nb-chip-icon-size` (read-only reference) | `PUBLIC_HOOK` | Read with a library-default fallback (`size-[var(--nb-chip-icon-size,0.75rem)]`), never assigned internally — pure consumer-override surface; carry the rule into `styles` unchanged |
| [nb-chip.ts](../../libs/ui/src/lib/chip/nb-chip.ts#L147) | `--nb-chip-radius`/`--nb-chip-shadow` (NbChipGroup) | `PUBLIC_HOOK` | `styles.css` already reads both with library-default fallbacks (`var(--nb-chip-radius, 0px)` / `var(--nb-chip-shadow, 2px 2px 0 0 var(--nb-shadow))`) on `span[nbChip]` — the group broadcasts to arbitrary-depth descendant chips through the *same* var name a consumer would use to override a single chip directly. This is the sanctioned Accordion-style "compound descendants share the public override surface" shape, not the resolve-then-funnel anti-pattern; CSS-variable cascade is also the only practical broadcast mechanism since chips aren't queryable content children at a fixed depth |
| [nb-badge.ts](../../libs/ui/src/lib/badge/nb-badge.ts#L55) | `classes` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Fully static string, no var assignment — confirmed lowest-complexity item in the group |
| [nb-card.ts](../../libs/ui/src/lib/card/nb-card.ts) (7 sub-directives) | `classes`/`classes()` ×7 | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | All static layout strings; every sub-directive already carries `[data-slot]` (plus `[data-align]` on actions) — purely mechanical, one `styles` block per sub-directive |
| [nb-avatar.ts](../../libs/ui/src/lib/avatar/nb-avatar.ts#L86) | `classes` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Static string; CSS already reads `--nb-avatar-shadow`/`-border-width` public hooks directly via `[style.*]` bindings — confirms "no var-classification work needed" |
| [nb-image-card.ts](../../libs/ui/src/lib/image-card/nb-image-card.ts#L98) | `classes`/`imageClasses` (card + image), caption `classes` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | All three are static strings. `NbImageCardCaption` already binds `border-top-width`/`-color` directly from the parent card's resolved capability values (`captionBorderWidth`/`captionBorderColor`) — no var anywhere, comparatively contained as predicted |
| [nb-dialog.ts](../../libs/ui/src/lib/dialog/nb-dialog.ts#L80) | template `classes` (bound on the inner `<dialog>`, not host) | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Static string; move into `styles` keyed on the `[data-nb-dialog]`/`[data-slot=dialog]` selector chain |
| [nb-dialog-actions.ts](../../libs/ui/src/lib/dialog/nb-dialog-actions.ts#L16) / [nb-dialog-content.ts](../../libs/ui/src/lib/dialog/nb-dialog-content.ts#L16) | `--nb-dialog-actions-bg:transparent` / `--nb-dialog-content-bg:transparent` | `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` | Static literal constants funnelled through a Tailwind arbitrary-property class then immediately consumed by the same element — drop the var entirely, write `background: transparent` directly in `styles` |
| [nb-dialog-description.ts](../../libs/ui/src/lib/dialog/nb-dialog-description.ts#L14) | `--nb-dialog-description-fg:#4b5563` | `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` | Same pattern — replace with a direct `color: #4b5563` rule in `styles`, no var needed |
| [nb-callout.ts](../../libs/ui/src/lib/callout/nb-callout.ts#L65) | `classes` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | `sizeClass()`/`layoutClass()` maps → `[data-size]`/`[data-layout]`, both attrs already exist |
| [nb-callout.ts](../../libs/ui/src/lib/callout/nb-callout.ts#L45) | `--nb-callout-radius` (and the same-shaped sibling `--nb-callout-border-width`, not separately named in the original audit but identical pattern) | `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` | A size-derived default is written via Tailwind arbitrary-property classes (`[--nb-callout-radius:0.5rem]` per size), then an explicit `radius` input overrides it via `[style.--nb-callout-radius]`, and both feed the same-element `rounded-(--nb-callout-radius)` class. Replace with `border-radius`/`border-width` rules in `styles` keyed on `[data-size]` for the size-derived defaults, plus a direct `[style.border-radius]="radiusStyle()"` binding (already returns `null` when `radius` is unset) so an explicit input overrides the `[data-size]` rule through ordinary CSS specificity — the var-funnel becomes unnecessary |
| [nb-media-frame.ts](../../libs/ui/src/lib/media-frame/nb-media-frame.ts#L85) | `classes` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | `ratioClass()`/`fitClass()` → `[data-ratio]`/`[data-fit]`, both attrs already exist; comparatively contained as predicted |
| [nb-media-item.ts](../../libs/ui/src/lib/media-item/nb-media-item.ts#L115) | `classes`/`iconClasses`/`variantClass`/`orientationClass`/`alignClass`/`sizeClass` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | Largest non-Card class-composition surface, confirmed. `[data-variant]`/`[data-orientation]`/`[data-align]`/`[data-size]` all already exist on the host; the `[&_[data-nb-media-item-title]]:...`-style descendant rules translate mechanically to plain CSS descendant selectors in a dedicated multi-rule `styles` block |
| [nb-media-item.ts](../../libs/ui/src/lib/media-item/nb-media-item.ts#L48) (`NbMediaItemIcon`, same file, L222) | `--nb-media-item-icon-bg` | `STATE_SCOPED_EXCEPTION` | Confirmed instance-scoped: assigned only when `surface()` is true, sourced from an explicit per-instance `background` input (`surface() ? background() : null`). The `bg-(--nb-media-item-icon-bg)` consumer in `mediaItemIconClasses()` can carry over unchanged once that helper's static parts move into `styles` |
| [nb-sticker.ts](../../libs/ui/src/lib/sticker/nb-sticker.ts#L62) | `--nb-sticker-fill`/`--nb-sticker-ink` | `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` | Tone-resolved colors consumed only by the component's own `<path>` (`fill`/`stroke`) and `.nb-sticker__content` (`color`) — all within the same template. Bind `[style.fill]`/`[style.stroke]`/`[style.color]` directly on those elements and drop both vars |
| [nb-sticker.ts](../../libs/ui/src/lib/sticker/nb-sticker.ts#L64) | `--nb-sticker-shadow`/`-rotate`/`-scale` | `INTERNAL_ANATOMY_VAR` | `shadow` is a static constant (not tone-resolved, just `var(--nb-shadow, #050505)`); `rotate`/`scale` are independently-driven values composed into a single `transform: rotate(...) scale(...)` shorthand — CSS-var composition is the practical mechanism for combining two signals into one shorthand property, and none collide with the public-hook naming convention |
| [nb-section.ts](../../libs/ui/src/lib/section/nb-section.ts#L78) | `classes` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | `layoutClass()`/`alignClass()`/`dividerClass()`/`dividerStyleClass()` → `[data-layout]`/`[data-align]`/`[data-divider]`/`[data-divider-style]`, all attrs already exist |
| [nb-section.ts](../../libs/ui/src/lib/section/nb-section.ts#L53) | `--nb-section-flush-margin` | `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` | The value is fully resolved in TS (`calc(${padding.value()} * -1)`, with no descendant consumers); the `mx-(--nb-section-flush-margin)` class can become a direct `[style.margin-inline]="flush() ? flushMarginStyle() : null"` binding — no var/class indirection needed |
| [nb-marquee.ts](../../libs/ui/src/lib/marquee/nb-marquee.ts#L123) | `wrapperClass`/`strip1Class`/`strip2Class` | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | `nb-marquee-reverse`/`nb-pause-on-hover` toggle classes → `[data-reverse]`/`[data-pause-on-hover]` attrs; the existing component `styles` block's selectors (`.nb-marquee-strip-1.nb-marquee-reverse`, `.nb-marquee-wrapper.nb-pause-on-hover:hover ...`) translate mechanically to attribute selectors. Animation-driven, but not actually an exception — confirmed migratable |
| [nb-stat.ts](../../libs/ui/src/lib/stat/nb-stat.ts#L29) | `--nb-stat-value-size`/`-label-size`/`-label-fg` | `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` | All three are static constants funnelled through Tailwind arbitrary-value classes onto descendant spans for no structural reason — express `font-size`/`color` as plain rules in `styles` (or, if per-instance variation is ever wanted, direct `[style.font-size]`/`[style.color]` bindings); drop the vars entirely |
| [nb-stat.ts](../../libs/ui/src/lib/stat/nb-stat.ts#L29) | `classes` (layout: `inline-flex`/`flex-row`/`flex-col`) | `SHOULD_MIGRATE_TO_DATA_SELECTOR` | The `direction` row/column toggle has no backing data attr yet — add `[attr.data-direction]` alongside the existing `[data-slot]` so the rule can move to `styles` |
| [nb-input-group*.ts](../../libs/ui/src/lib/input-group/nb-input-group.ts) / [nb-button-trailing-icon.ts](../../libs/ui/src/lib/button/nb-button-trailing-icon.ts) / [nb-label.ts](../../libs/ui/src/lib/label/nb-label.ts) | — | _(already migrated)_ | Folded into the Phase 1 implementation pass per this audit's recommendation — see "Implementation status" note at the top of this document |
| [nb-avatar-group.ts](../../libs/ui/src/lib/avatar-group/nb-avatar-group.ts#L17) | static `[class]` | `OK_EXCEPTION` | Confirmed — literal string, no `nbClass`/dynamic computation; nothing to migrate |
| [nb-halftone.ts](../../libs/ui/src/lib/halftone/nb-halftone.ts#L69) | six `--nb-halftone-*` vars | `INTERNAL_ANATOMY_VAR` | Confirmed — every one is consumed inside `calc()`/`radial-gradient()`/`background-size` CSS expressions (dimensions, gradient stops, repeat tiling). No direct-property binding can substitute for a value embedded in a compound CSS function |
| [nb-icon.ts](../../libs/ui/src/lib/icon/nb-icon.ts#L61) | `--nb-icon-color` | `STATE_SCOPED_EXCEPTION` | Confirmed — required so `background-color: var(--nb-icon-color, currentColor)` can drive the mask-mode coloring technique with a `currentColor` fallback (and remain consumer-overridable via the same var name). Mirrors the doc's original prediction exactly |
| [nb-typography.ts](../../libs/ui/src/lib/typography/nb-typography.ts#L26) | `--nb-typography-font` | `SHOULD_MIGRATE_TO_ACTUAL_PROPERTY` | Write-only: nothing in `styles.css` or any component reads `var(--nb-typography-font)`. The direct `[style.font-family]="fontValue()"` binding plus normal CSS inheritance already gives every descendant the resolved font — the var assignment is redundant and should simply be dropped |
| [nb-text.ts](../../libs/ui/src/lib/text/nb-text.ts#L130) / [nb-display.ts](../../libs/ui/src/lib/display/nb-display.ts#L74) | `--nb-underline-gap`/`--nb-underline-width` | `PUBLIC_HOOK` | Confirmed — `styles.css` reads both with library-default fallbacks (`width: var(--nb-underline-width, 7rem)`, `margin-top: var(--nb-underline-gap, 0.75rem)`, plus the `bar`/`wave`-variant equivalents). Textbook input → var → CSS-with-fallback hook; no migration needed |

### Summary of the finalized classification

- **`SHOULD_MIGRATE_TO_DATA_SELECTOR`** — the large majority of `classes`/`nbClass`
  computeds across every file in this group. Every target file already exposes the
  `data-*` attrs the migration would key on (`[data-state]`, `[data-size]`,
  `[data-variant]`, `[data-slot]`, …), so this is mechanical, file-by-file work in
  the same shape as Phase 1/2 — the only net-new attrs needed are `[data-selected]`/
  `[data-highlighted]` (select option), `[data-direction]` (stat), and `[data-reverse]`/
  `[data-pause-on-hover]` (marquee).
- **`SHOULD_MIGRATE_TO_ACTUAL_PROPERTY`** — vars that funnel a same-element-resolved
  value through an intermediate CSS custom property for no structural reason (Rating,
  StatusDot, Sticker fill/ink, Section flush-margin, the three Dialog sub-component
  constants, Callout radius/border-width, Stat's three size/color vars, and the
  write-only `--nb-typography-font`). These all have a direct `[style.*]`-binding
  equivalent available today.
- **`STATE_SCOPED_EXCEPTION`** — every prediction in the original flagging pass was
  confirmed (Select focus-ring colors, Checkbox `:checked` bg/fg, MediaItem icon-bg,
  Icon mask color). All five share the same shape: a resolved value needs to reach a
  CSS-only state (`:focus-within`, `:checked`, conditional instance state, `mask`/
  `background-color` technique) that an Angular property binding cannot directly scope.
- **`PUBLIC_HOOK`** — Chip's `--nb-chip-icon-size`/`--nb-chip-radius`/`--nb-chip-shadow`
  and Text/Display's `--nb-underline-{gap,width}` are genuine consumer-override surfaces
  that `styles.css` already reads with library-default fallbacks; ChipGroup's broadcast
  to descendant chips reuses the same var name, matching the sanctioned Accordion
  cascading shape rather than the resolve-then-funnel anti-pattern.
- **`INTERNAL_ANATOMY_VAR`** — Sticker's shadow/rotate/scale (shorthand composition) and
  all six Halftone vars (values embedded in `calc()`/`radial-gradient()` CSS functions)
  are legitimate component-local rendering parameters with no direct-property
  alternative.
- **`OK_EXCEPTION`** — `nb-avatar-group.ts` confirmed as nothing-to-migrate (static
  literal class, no `nbClass`).

## Exceptions

| File | Exception | Reason | Follow-up |
|---|---|---|---|
| [core/class.ts](../../libs/ui/src/lib/core/class.ts#L12) | `nbClass` definition (`twMerge`/`clsx` wrapper) | This is the public utility the plan explicitly keeps exported | None — `PUBLIC_API_KEEP` |
| [index.ts](../../libs/ui/src/index.ts) | Re-exports `nbClass` | Same as above | None — `PUBLIC_API_KEEP` |
| [nb-accordion-trigger.ts](../../libs/ui/src/lib/accordion/nb-accordion-trigger.ts), [nb-accordion-item.ts](../../libs/ui/src/lib/accordion/nb-accordion-item.ts), [nb-accordion-content.ts](../../libs/ui/src/lib/accordion/nb-accordion-content.ts) | Already migrated; use `--nb-accordion-item-*` local hooks read directly in `styles` (e.g. `border-radius: var(--nb-accordion-item-radius, var(--nb-radius))`) | This is the reference implementation named by the plan | None — `OK_EXCEPTION` (reference pattern, do not touch) |
| `*.tokens.spec.ts` / `nb-style-capabilities.spec.ts` (19 files, 53 matches) | Negative assertions `expect(...).not.toContain('--nb-resolved')` | These are regression tests confirming capabilities do **not** write CSS variables — the exact invariant the plan wants to preserve | None — `OK_EXCEPTION`, keep passing as a guard rail |
| `input.tokens.spec.ts`, `accordion.tokens.spec.ts`, `textarea.tokens.spec.ts`, `select.tokens.spec.ts` (5 matches) | `it('does not emit legacy capability marker classes', ...)` negative assertions | Regression tests confirming the marker-class removal from `563f34c` stuck | None — `OK_EXCEPTION`, keep passing as a guard rail |
| [nb-avatar-group.ts](../../libs/ui/src/lib/avatar-group/nb-avatar-group.ts#L17) | Static literal `[class]` binding, no `nbClass`/dynamic computation | Not part of the `nbClass` removal effort — nothing dynamic to migrate | None — `OK_EXCEPTION` |
| [nb-stack.ts](../../libs/ui/src/lib/stack/nb-stack.ts#L38), [nb-cluster.ts](../../libs/ui/src/lib/cluster/nb-cluster.ts#L53), [nb-split.ts](../../libs/ui/src/lib/split/nb-split.ts#L54) | `--nb-{stack,cluster,split}-separator-gap` component-local vars | Explicitly allowed by the Phase 2 rules as component-local anatomy variables, not capability-resolved hooks | None now — re-confirm they're documented as anatomy vars (not capability tokens) when Phase 2 lands |

## Stale docs

| File | Stale content | Proposed action |
|---|---|---|
| _(none found)_ | A search of `docs/` for `--nb-resolved`, `--_nb-`, "legacy marker", "capability-written", and `nb-cap-` returned **zero matches**. [style-capabilities.md](../components/style-capabilities.md) already documents `NbAccordionTrigger` as the reference implementation (L216), states `nbClass` remains publicly exported (L313), and lists the Accordion family plus `NbSection`/`NbStack`/`NbCluster`/`NbSplit` as already migrated (L320-359/427) — consistent with what this audit finds in code. | No doc updates required in Phase 0; Phase 4's docs-cleanup pass should still do a final pass once Phases 1-3 land, since this audit only checked for the specific stale terms named in the plan. |

## Notes for Phase 1/2 test updates (`TEST_UPDATE_REQUIRED`)

Several of the existing tests assert directly on Tailwind class-string fragments that
will disappear once the corresponding files move to `styles` + data-attrs. These will
need rewriting to check `styles`/computed values/data attributes instead, per the plan's
"check the rendered style attribute or host bindings" guidance:

- `button/button.tokens.spec.ts` (L278, 298, 301, 307-308) — asserts `className` contains
  `inline-flex`, `gap-2`, `h-11`, `px-4`
- `surface/nb-surface.spec.ts` (L127, 129, 184-185, 201) — asserts `className` contains
  `size-11`, `inline-flex`, `flex`, `flex-col`
- `input/input.tokens.spec.ts` (L40-41, 59) — asserts `className` contains
  `rounded-(--nb-input-radius)`, `shadow-[var(--nb-input-shadow)]`, `flex`
- `textarea/textarea.tokens.spec.ts` (L40-41, 59) — same shape as Input
- `select/select.tokens.spec.ts` (L97, 118, 161, 175, 182) — asserts `className` contains
  `rounded-(--nb-select-radius)`, `shadow-nb`, `flex`

These are flagged here so the Phase 1 implementation pass knows up front which specs
will need rewriting (not just minor import-path tweaks).
