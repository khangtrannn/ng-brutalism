# Token Customization Migration Plan

Status: Active Draft
Last updated: 2026-06-30
Scope: Internal migration plan for `@ng-brutalism/ui` token customization architecture

Related documents:

- `docs/architecture/token-customization.md`
- `docs/architecture/token-customization-audit.md`

This migration follows the accepted architecture:

  Capability directive = semantic/state adapter.
  Input transform = scalar token normalization.
  Host binding = component namespace mapping.
  CSS = final visual style engine.

Primary direction:

  - Scalar inputs: direct `input()` calls + named pure input transforms -> write a single public component CSS variable.
  - Semantic inputs (tone, size, layout): write `data-*` attributes (use `data-nb-tone` for tone).
  - Shared tone recipe CSS maps `data-nb-tone` to internal `--_nb-tone-*` slots.
  - CSS owns final properties, fallbacks and recipes.

---

## Phase 0 — Preparation checklist

- [x] Add `libs/ui/src/lib/core/input-transforms/token-style-transform.ts` (core transform types).
- [x] Add named pure transform functions for radius, shadow, padding, gap, and border width under `core/input-transforms/`.
- [x] Export input transforms from `core/input-transforms/index.ts`.
- [x] Add the shared tone recipe CSS layer (centralized stylesheet) that maps `data-nb-tone` -> `--_nb-tone-*` using `:where()` selectors.
- [x] Use `data-nb-tone`, not `data-tone`.
- [x] Do not add per-component tone recipe blocks unless a component truly needs special tone behavior (explicit exception documented).
- [x] Do not create helpers that call Angular `input()`; `input()` must be called directly in class member initializers.
- [x] Keep input options inline (alias, transform).

Replace any checklist item that said "Add style input helpers" with "Add scalar token input transforms (input transforms)".

---

## Phase 1 — NbCallout pilot

Use `NbCallout` as the migration pilot. TypeScript and CSS should match the examples in the architecture doc.

Desired TypeScript changes (example):

- Host directive for tone: `hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }]` and `NbToneCapability` writes `data-nb-tone`.
- Use direct `input()` calls with inline options and named transforms: `protected readonly radiusVar = input(null, { alias: 'radius', transform: nbRadiusStyleTransform });`
- Host style bindings: `'[style.--nb-callout-radius]': 'radiusVar()'` and similarly for shadow.

CSS changes (example):

- Remove any per-component `[data-nb-callout][data-nb-tone='...']` recipe blocks.
- Component CSS should consume internal tone slots with neutral fallback, e.g. `background: var(--nb-callout-bg, var(--_nb-tone-bg, var(--nb-tone-neutral-bg)));`.

Remove list for the pilot (things to delete in code/docs):

- Remove `data-radius` if used to mirror scalar inputs.
- Remove manual computed radius logic that wrote final `border-radius` from TypeScript.
- Remove host bindings that wrote final `border-radius` or `box-shadow` properties from TypeScript (replace with public CSS variable writes).
- Remove tone final background/color/border-color host bindings in TypeScript.
- Remove per-component tone recipe examples from docs and styles.

Acceptance criteria (NbCallout):

- [x] No `radius` input -> no inline `--nb-callout-radius` is written.
- [x] `radius="sm"` writes inline `--nb-callout-radius` with the transform output.
- [x] Parent `--nb-callout-radius` customization works when no radius input exists.
- [x] Local `--nb-callout-radius` customization works when no radius input exists.
- [x] Radius input wins over inherited customization (inline style precedence).
- [x] `data-radius` is removed.
- [x] `size` and `layout` behavior remain unchanged.
# Token Customization Migration Plan

Status: Active Draft
Last updated: 2026-06-30
Scope: Internal migration plan for `@ng-brutalism/ui` token customization architecture

Related documents:

- `docs/architecture/token-customization.md`
- `docs/architecture/token-customization-audit.md`

Important: this migration follows the CSS-first, input-friendly architecture described in `token-customization.md`.

High-level direction:

```
Angular scalar inputs write the component's public CSS variable.
Semantic inputs reflect as data attributes (data-nb-*) and map to shared CSS recipes.
CSS is the final style engine and owns fallbacks.
```

---

## 0. Migration checklist (Phase 0)

- [x] Add `libs/ui/src/lib/core/input-transforms/token-style-transform.ts` (core transform types).
- [x] Add named pure transform functions for radius, shadow, padding, gap, border width (exported from `core/input-transforms/index.ts`).
- [x] Add a shared tone recipe CSS layer (centralized file, low specificity with `:where`).
- [x] Audit and replace all production `data-tone` references with `data-nb-tone`.
- [x] Do not add per-component tone recipe blocks unless a component needs a documented special-case.
- [x] Do not create helpers that call Angular `input()`; replace helper wrappers with named input transforms.
- [x] Keep input options inline in the `input()` call (alias + transform inline) to preserve Angular static analysis compatibility.

Remove any checklist item that instructs adding style input helpers that wrap `input()`; replace with "Add scalar token input transforms".

---

## 1. NbCallout pilot (recommended)

Apply the updated code/CSS shape to `NbCallout` as a pilot. Desired TypeScript and CSS shape is the example in `token-customization.md` (section 5). Key migration actions:

- Replace any `data-tone` usage with `data-nb-tone` and ensure `NbToneCapability` writes `data-nb-tone`.
- Remove `data-radius` and any computed radius fallback logic in TypeScript.
- Remove host bindings that set final properties (e.g. `[style.border-radius]`, `[style.box-shadow]`) and replace with host bindings that write public CSS variables (e.g. `[style.--nb-callout-radius]`).
- Export and use named input transforms (e.g. `nbRadiusStyleTransform`, `nbShadowStyleTransform`) and call `input()` directly in the initializer.
- Do not add per-component tone recipe blocks in the callout CSS; consume `--_nb-tone-*` provided by the shared recipe.

Removal list (examples to remove):

- Remove `data-radius` attribute usage.
- Remove any in-TS final style resolution for radius, box-shadow, border-color, background, color.
- Remove per-component `[data-nb-tone='...']` recipe blocks unless intentionally exceptional.

Acceptance criteria for NbCallout pilot:

- [x] No radius input => no inline `--nb-callout-radius` written.
- [x] `radius="sm"` writes inline `--nb-callout-radius`.
- [x] Parent `--nb-callout-radius` customization works when no radius input exists.
- [x] Local `--nb-callout-radius` customization works when no radius input exists.
- [x] Radius input wins over inherited customization.
- [x] `data-radius` is removed.
- [x] `size` and `layout` behavior remain unchanged.
- [x] `tone="warning"` renders `data-nb-tone="warning"` on the element.
- [x] No tone input renders no `data-nb-tone`.
- [x] Shared tone recipe CSS sets internal `--_nb-tone-*` slots.
- [x] NbCallout consumes `--_nb-tone-*` slots with neutral fallback.
- [x] Base CSS falls back to neutral tokens when no tone context exists.
- [x] Component-specific variables like `--nb-callout-bg` override the tone recipe.
- [x] No per-component tone recipe block is added unless intentionally justified and documented.

---

## 2. Testing policy updates

Tone tests:

- No tone input -> no `data-nb-tone` attribute.
- `tone="warning"` -> `data-nb-tone="warning"` written by `NbToneCapability`.
- Shared tone recipe provides `--_nb-tone-*` when `data-nb-tone` exists.
- Component CSS falls back to neutral tokens when no tone context exists.
- Component-specific public vars override tone recipe.
- Parent `data-nb-tone` provides inherited tone context; child component can override by writing its own `data-nb-tone`.

Scalar input tests:

- No scalar input -> no inline public CSS variable written.
- Scalar input -> inline public CSS variable is written.
- `null` binding -> inline public CSS variable is removed.
- Parent CSS customization works when no input exists.
- Local CSS customization (inline or class) works when no input exists.
- Input wins via the inline public CSS variable when present.

---

## 3. Temporary decisions to document

Shared internal tone slots:

- Limit: `--_nb-tone-*` variables are visible in DevTools even though they are internal.
- Reason: they prevent tone recipe duplication across components and avoid generating complex TypeScript multi-var outputs.
- Future: if this becomes confusing, consider generated CSS recipes, CSS mixins, or richer documentation for the internal layer.

Input transforms instead of input wrappers:

- Limit: component input declarations will be slightly more verbose compared to an `nbRadiusStyleInput()` wrapper.
- Reason: Angular `input()` must be called directly in a class member initializer for compiler support.
- Future: revisit if Angular adds an officially supported abstraction for `input()` wrappers.

---

If you want I can apply the NbCallout pilot patch next and run the audit searches listed in the audit doc to find remaining `data-tone` / helper occurrences.

```txt
tone -> semantic recipe
size -> semantic preset if it affects multiple anatomy values
layout -> semantic state
radius -> scalar design input
shadow -> scalar design input
padding -> scalar design input
gap -> scalar design input
disabled -> behavior/state
alt -> accessibility
value -> behavior/internal
```

### 8.2 Migrate semantic inputs

```txt
- [x] Reflect semantic inputs as data attributes.
- [x] Keep CSS selectors for semantic behavior.
- [x] Do not compute final visual values in TypeScript for semantic inputs.
```

### 8.3 Migrate scalar design inputs

```txt
- [x] Replace manual computed `undefined -> null` logic by using a named input transform and direct `input()`.
- [x] Bind scalar input to a public component CSS variable.
- [x] Do not bind scalar input to final CSS property.
- [x] Ensure unset input does not write the inline CSS variable.
```

### 8.4 Migrate CSS

```txt
- [x] Final CSS properties read public component CSS variables with fallback.
- [x] Component CSS does not set public customization variables as defaults.
- [x] Size/variant selectors can provide different fallbacks by repeating the final property.
- [x] Tone recipes are written in CSS using `data-nb-tone` selectors (centralized shared layer).
```

### 8.5 Remove design mirror attributes

```txt
- [x] Remove data attributes that only mirror scalar design values.
- [x] Keep data attributes used for semantic selectors or behavior.
```

### 8.6 Update tests

```txt
- [x] No input -> no inline public CSS variable.
- [x] Input -> inline public CSS variable.
- [x] Local CSS variable customization works.
- [x] Inherited CSS variable customization works.
- [x] Input wins over inherited customization.
- [x] Removed mirror attributes are no longer rendered.
```

---

## 9. Migration Phases

### Phase 0: Architecture and transform preparation

Status: Done

```txt
- Add architecture docs.
- Add migration docs.
- Add input transform utilities (core/token-style-transform and named transforms).
- Add index exports for transforms.
- Add shared tone recipe CSS layer.
```

### Phase 1: NbCallout pilot

Status: Done

Risk: High
Reason: exercises the full model.

```txt
- size preset
- layout state
- tone semantic recipe
- radius scalar input
- shadow scalar input
- data-radius removal
- CSS fallback by size
```

### Phase 2: Simple surfaces

Status: Done

Risk: Medium

Components:

```txt
NbCard
NbBadge
NbAvatar
NbMediaFrame (done)
NbImageCard
```

Likely scalar inputs:

```txt
radius
shadow
border
padding
```

Likely semantic inputs:

```txt
tone
size if preset-based
variant if present
```

### Phase 3: Surface, Button, IconButton

Status: Done

Risk: Medium/High

Components:

```txt
NbSurface (done)
NbButton
NbIconButton
```

Notes:

```txt
- Surface may have broader layout and typography concerns.
- Button size is likely a semantic preset.
- Button tone should be CSS recipe-based.
- Scalar inputs should write public component variables.
```

### Phase 4: Layout primitives

Status: Done

Risk: Medium

Components:

```txt
NbStack
NbCluster
NbSplit
NbSection
NbChipGroup
```

Likely scalar inputs:

```txt
gap
padding
separator gap if exposed
```

Likely semantic inputs:

```txt
align
justify
wrap
orientation
layout
separator
flush
divider
```

Notes:

```txt
- Keep layout state as data attributes.
- Move gap/padding to public component CSS variables.
- Avoid final inline gap/padding styles.
```

### Phase 5: Forms and overlays

Status: Done

Risk: High

Components:

```txt
NbCheckbox (done)
NbInput
NbTextarea
NbNativeSelect
NbSelect
NbDialog
```

Notes:

```txt
- These have inner elements and stateful styling.
- Keep state as data attributes.
- Use CSS variables for visual customization.
- Be careful with in-group, disabled, invalid, open, selected, focused states.
- Grouped form controls use CSS state selectors for transparent/merged chrome.
```

### Phase 6: Typography and Icon

Status: Done

Risk: High

Components:

```txt
NbText
NbDisplay
NbTypography
NbIcon
```

Notes:

```txt
- size/weight/tracking/leading/transform/measure are fixed-enum presets with
  always-concrete defaults (never null), so they reflect as data-* attributes
  with CSS owning the per-value final property + public var override, the same
  pattern NbCallout uses for size — an always-inline CSS var write would
  permanently block local/inherited customization for these inputs.
- tone (NbText/NbIcon) keeps its own narrower vocabulary ('default'/'muted'/
  'subtle'/'inverse' plus a subset of NbTone) and resolves to a public
  --nb-text-color / --nb-icon-color var rather than the shared --_nb-tone-*
  slots, since those text-only values have no bg/border surface and aren't
  part of the shared tone recipe. The var is only written when tone is
  explicit (nullable), so CSS still owns the neutral/currentColor fallback.
- NbTypography's font role moves from a duplicated final font-family write to
  a single --nb-typography-font var; CSS fallback is the literal `inherit`
  keyword (not a token) so the default 'inherit' role still inherits ambient
  font-family exactly as before.
- NbIcon's mask/background mechanism (mode-driven structural properties:
  size/position/repeat/background-color-for-mask) moved to CSS keyed by
  data-mode; only the src-driven mask-image/background-image url stays
  TS-bound since it's genuinely per-instance runtime data.
- Legacy data-tone mirror was already removed from NbText and NbIcon prior to
  this pass.
```

### Phase 7: Special components

Status: Done

Risk: High

Components:

```txt
NbSticker
NbHalftone
NbProgress
NbRating
NbSeparator
NbMediaItem
```

Notes:

```txt
- Some components involve drawing, geometry, or runtime values.
- Do not blindly apply the scalar input pattern to behavior/math values.
- Preserve runtime behavior such as progress width and halftone geometry.
- NbProgress/NbRating: fill/star color moved from TS-resolved literals to
  data-nb-tone + shared --_nb-tone-bg slot, with each component's CSS fallback
  matching its prior hardcoded default tone (primary / warning) so the
  visual default is unchanged. Runtime width/fill-count stays TS-driven.
- NbMediaItem: tone moved to data-nb-tone + shared tone slots; the `plain`
  variant still tints text-only (no surface) the same way it did before,
  preserved by giving the base rule a color fallback and only the boxed/chip
  rule a bg/border fallback. Removed the data-background mirror on
  NbMediaItemIcon (the public --nb-media-item-icon-bg var already covers it).
- NbSticker: fill/ink moved from TS tone-literal + CSS local-default (which
  blocked inheritance) to data-nb-tone + shared tone slots consumed at point
  of use. rotate/size switched from always-inline (numeric, never null) to
  input(null, {transform}), which also fixes a latent bug where the
  per-shape CSS rotation presets (e.g. splat's -10deg) were dead code because
  rotate's old default of 0 always won as an inline override.
- NbHalftone: rectangle-shape CSS no longer sets --nb-halftone-* as local
  defaults (that blocked inherited customization); defaults moved into the
  var() fallback at each point of use. Circle fill moved from a per-circle
  TS-resolved attr to a single CSS rule.
- NbSeparator: orientation/variant fully reflect as data attributes; CSS now
  owns the border side/width/style matrix that TS used to compute and write
  as final inline styles.
```

---

## 10. Component Status Table

| Component      | Phase | Status  | Risk        | Notes                 |
| -------------- | ----: | ------- | ----------- | --------------------- |
| NbCallout      |     1 | Done    | High        | Pilot component; uses data-nb-tone and public radius/shadow vars |
| NbCard         |     2 | Done    | Medium      | Uses data-nb-tone and public radius/shadow/border vars |
| NbBadge        |     2 | Done    | Medium      | Uses data-nb-tone and public radius/shadow/border vars |
| NbAvatar       |     2 | Done    | Medium      | Uses data-nb-tone and public radius/shadow/border vars |
| NbImageCard    |     2 | Done    | Medium      | Uses data-nb-tone and public radius/shadow/border vars |
| NbMediaFrame   |     2 | Done    | Medium      | Uses data-nb-tone and public radius/shadow/border vars |
| NbSurface      |     3 | Done    | High        | Uses data-nb-tone and public radius/shadow/border/padding vars |
| NbButton       |     3 | Done    | High        | Uses data-nb-tone and public radius/shadow/border vars |
| NbIconButton   |     3 | Done    | Medium/High | Uses data-nb-tone and public radius/shadow/border vars |
| NbStack        |     4 | Done    | Medium      | Gap writes public var; separator metrics remain CSS-owned |
| NbCluster      |     4 | Done    | Medium      | Gap/padding write public vars; separator metrics remain CSS-owned |
| NbSplit        |     4 | Done    | Medium      | Gap/padding write public vars; separator metrics remain CSS-owned |
| NbSection      |     4 | Done    | Medium      | Padding writes public var; flush stays CSS-owned |
| NbChipGroup    |     4 | Done    | Medium      | Gap writes public group var; child radius/shadow context uses public chip vars |
| NbCheckbox     |     5 | Done    | Medium      | Uses data-nb-tone; checked colors consume shared tone slots with primary fallback |
| NbInput        |     5 | Done    | High        | Uses data-nb-tone and public border-width var |
| NbTextarea     |     5 | Done    | High        | Uses data-nb-tone and public border-width var; group state is CSS-owned |
| NbNativeSelect |     5 | Done    | High        | Uses data-nb-tone and public border-width var; group state is CSS-owned |
| NbSelect       |     5 | Done    | High        | Uses data-nb-tone and public border-width var; listbox/options inherit CSS context |
| NbDialog       |     5 | Done    | High        | Inner surface uses data-nb-tone and public radius/shadow/border vars |
| NbText         |     6 | Done    | High        | size/weight/transform/tracking/measure/leading as data-* + CSS; tone writes public --nb-text-color var |
| NbDisplay      |     6 | Done    | High        | size/weight/tracking/leading as data-* + CSS (incl. fluid matrix) |
| NbTypography   |     6 | Done    | Medium      | Single --nb-typography-font var; CSS owns font-family with `inherit` fallback |
| NbIcon         |     6 | Done    | High        | size as data-size + CSS; tone writes public --nb-icon-color var; mask/image mechanics CSS-owned by data-mode |
| NbSticker      |     7 | Done    | High        | Uses data-nb-tone and shared tone slots for fill/ink; rotate/size are nullable scalar vars |
| NbHalftone     |     7 | Done    | High        | Rectangle rhythm vars no longer set as local defaults; circle fill is CSS-owned |
| NbProgress     |     7 | Done    | Medium/High | Uses data-nb-tone and shared tone slots for fill; runtime width unchanged |
| NbRating       |     7 | Done    | Medium/High | Uses data-nb-tone and shared tone slots for filled-star color; runtime fill count unchanged |
| NbSeparator    |     7 | Done    | Medium      | Orientation/variant as data-* attrs; CSS owns the border matrix |
| NbMediaItem    |     7 | Done    | High        | Uses data-nb-tone and shared tone slots; data-background mirror removed from NbMediaItemIcon |

---

## 11. Temporary Decisions and Limits

### 11.1 Style capability directives remain temporarily

Limit:

```txt
Old style capability directives may still exist during migration.
```

Reason:

```txt
They remain exported for compatibility and for any downstream usage, but the
production primitives in phases 1-5 no longer compose them.
```

Future:

```txt
Clean them up after enough components migrate to input transforms.
```

### 11.2 CSS may repeat public variables in size selectors

Example:

```css
[data-nb-callout][data-size='sm'] {
  border-radius: var(--nb-callout-radius, var(--nb-radius-md));
}

[data-nb-callout][data-size='lg'] {
  border-radius: var(--nb-callout-radius, var(--nb-radius-xl));
}
```

Limit:

```txt
This is repetitive and can feel odd at first glance.
```

Reason:

```txt
It is easier for users to understand than adding --*-default or --*-by-size variables.
```

Future:

```txt
If repetition becomes painful, revisit a derived fallback variable pattern.
```

### 11.3 Angular input and CSS customization share one slot

Example:

```txt
radius input writes --nb-callout-radius.
User CSS customization also uses --nb-callout-radius.
```

Limit:

```txt
Conflicts are possible if both are set on the same element.
```

Reason:

```txt
This keeps the public CSS API simple and preserves input priority through inline style.
```

Future:

```txt
If this becomes confusing in real usage, revisit --*-input variables for specific components only.
```

### 11.4 Tone recipe is CSS-only

Limit:

```txt
Tone recipes may need repeated CSS rules across components.
```

Reason:

```txt
This keeps tone semantic and avoids a TypeScript multi-var generator.
```

Future:

```txt
If repeated tone recipe CSS becomes too large, introduce CSS mixins, shared CSS layers, or generated CSS utilities.
```

### 11.5 No namespace-aware capability yet

Limit:

```txt
Each component must bind its own namespaced CSS variables.
```

Reason:

```txt
This is explicit and avoids dynamic host binding complexity.
```

Future:

```txt
After migration, revisit whether namespace-aware capabilities are worth the abstraction.
```

---

## 12. Do Not Do

Do not:

```txt
- Do not implement the old `--*-input / --*-default` architecture by default.
- Do not create `resolvedRadius`, `resolvedShadow`, or similar TS fallback computeds.
- Do not duplicate CSS defaults in TypeScript.
- Do not bind final customizable properties like border-radius, box-shadow, padding, or gap from TypeScript.
- Do not use data attributes that only mirror scalar design values.
- Do not introduce `nbTokenVarsInput` for tone.
- Do not refactor every component at once.
- Do not start by rewriting shared style capabilities globally.
- Do not set public customization variables as component defaults in CSS.
```

---

## 13. Agent Workflow

For each migration phase:

```txt
1. Read `token-customization.md`.
2. Read this migration plan.
3. Check the historical audit for component-specific risks.
4. Migrate one component or one small component group.
5. Update tests.
6. Run the test suite.
7. Report:
   - what changed;
   - what public inputs changed, if any;
   - what CSS variables changed;
   - what data attributes were removed;
   - what old capability usage remains;
   - any conflicts or visual regressions.
```

For `NbCallout`, report specifically:

```txt
- Did the directive become simpler?
- Did `data-radius` disappear?
- Does no input avoid writing inline CSS vars?
- Does radius input write `--nb-callout-radius`?
- Does inherited customization still work?
- Does local customization still work?
- Does input win over inherited customization?
- Is tone now `data-nb-tone` only?
- Are tone recipes CSS-owned?
- Are there any visual regressions?
```

---

## 14. Success Criteria

This migration is successful if:

```txt
1. User-facing customization becomes easier to understand.
2. DevTools output is less noisy than the `--*-input / --*-default` model.
3. TypeScript no longer acts as the final style engine.
4. CSS owns final properties and fallbacks.
5. Angular inputs remain ergonomic.
6. Local and inherited CSS customization continue to work.
7. Capability directives have a clearer semantic/state boundary.
8. Scalar design inputs become consistent through input transforms.
9. Existing visuals remain stable unless previous behavior was caused by incorrect inline final styles.
10. Future components have a clear implementation pattern.
```
