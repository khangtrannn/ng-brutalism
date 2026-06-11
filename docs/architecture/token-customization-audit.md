# Token Customization Architecture Audit

Status: Historical audit / Source material
Original audit date: 2026-06-09
Last updated: 2026-06-10
Scope: Internal audit for `@ng-brutalism/ui` token customization architecture

Related documents:

- `docs/architecture/token-customization.md`
- `docs/architecture/token-customization-migration.md`

This audit captures implementation patterns, blockers, and migration targets. It has been updated to reflect the accepted architecture: scalar inputs use direct `input()` + named input transforms, semantic inputs use `data-nb-*` attributes, and CSS owns recipes and fallbacks.

Use `token-customization.md` for the accepted architecture direction and `token-customization-migration.md` for step-by-step migration guidance.

---

## 1. Current architecture summary

Many components still resolve tokens in TypeScript and write final inline styles. Migration targets are to:

1. Move final styling back to CSS (host bindings write public CSS variables, not final properties).
2. Replace helper wrappers that call `input()` with direct `input()` calls and named input transforms.
3. Replace `data-tone` with `data-nb-tone` and centralize tone recipes in a shared CSS layer that sets `--_nb-tone-*` internal slots.

Primary blockers:

- Shared capabilities that write final properties (background, color, border-color, border-width, border-radius, box-shadow, padding, gap).
- TypeScript duplicating CSS defaults and blocking CSS-based customization.
- Public customization variables used as local defaults, preventing inheritance.
- Data attributes that mirror scalar values instead of representing semantic state.

---

## 2. Key findings and recommended patterns

### 2.1 Host binding patterns to migrate

Replace patterns like:

```ts
host: {
  '[style.border-radius]': 'radiusStyle()',
}
```

with:

```ts
host: {
  '[style.--nb-component-radius]': 'radiusVar()',
}
```

and move final property resolution into CSS:

```css
[data-nb-component] {
  border-radius: var(--nb-component-radius, var(--nb-radius-xl));
}
```

### 2.2 Tone: centralized recipe + internal slots

Tone should be reflected as `data-nb-tone` and mapped in a shared CSS recipe layer to internal `--_nb-tone-*` slots. Components consume `--_nb-tone-*` and include neutral fallbacks.

Do not duplicate tone recipes per component; centralize them to avoid CSS duplication.

---

## 3. Input classification (audit checklist)

When auditing a component, classify inputs as:

- Semantic/preset/state inputs -> `data-*` attributes (e.g. `data-nb-tone`, `data-size`).
- Scalar design inputs -> `input()` + named input transform -> write `--nb-{component}-{prop}`.
- Internal/behavior inputs -> component logic (do not treat as token customization).

Examples of scalar tokens: `radius`, `shadow`, `padding`, `gap`, `border width`, `font size`, `icon size`.

---

## 4. Audit search patterns

Run these searches when auditing the codebase to find outdated patterns or exceptions:

1) Find old `data-tone` references to replace with `data-nb-tone`:

```bash
rg "data-tone" libs/ui/src/lib apps/docs
```

2) Find per-component tone recipe blocks that should generally be avoided:

```bash
rg "\[data-nb-[a-z-]+\]\[data-nb-tone" libs/ui/src/lib apps/docs
```

3) Ensure internal tone slots only appear in the shared tone recipe or as consumed fallbacks:

```bash
rg "--_nb-tone" libs/ui/src/lib apps/docs
```

4) Find outdated helper wording or helper APIs that imply wrapping Angular `input()`:

```bash
rg "StyleInput|input transform|nb[A-Za-z]+StyleInput|nb[A-Za-z]+StyleInput\(" docs libs/ui/src/lib
```

5) Find scalar input declarations that use `input()` with a transform inline (desired pattern):

```bash
rg "input\(.*transform:" libs/ui/src/lib
```

Purpose: verify the transform is a named pure function and that options are inline.

---

## 5. Component table (updated guidance)

Update target direction for tone-aware components:

Use `data-nb-tone` and the shared tone recipe slots. Components should consume `--_nb-tone-*` with neutral fallback and allow component-specific public variables to override tone.

For scalar design inputs:

Use direct `input()` with a named pure input transform. Bind the transformed value to a public component CSS variable. Let CSS own the final property and fallback.

Example audit entry (shortened):

- `NbToneCapability`: input classification `data`: tone. Current blockers: writes final bg/fg/border color. Target: reflect `data-nb-tone`; CSS maps to shared internal tone slots.

---

## 6. Exceptions & notes

Exception note:

The internal `--_nb-tone-*` variables are an intentional exception to an earlier preference for avoiding internal custom properties. They centralize current tone recipe state and prevent per-component tone duplication. They are still not public customization API; document them as internal and subject to change.

If a component truly needs special tone behavior that cannot be expressed via shared recipes and component-specific public variables, document the exception and justify it in the migration PR.

---

If you'd like, I'll run the audit search commands and produce a list of files that still contain `data-tone`, helper wrappers, or per-component tone recipes, then patch them to the new model. Would you like me to run those searches and start automatic replacements for safe patterns (e.g., `data-tone` -> `data-nb-tone`)?
| `NbButton`                | `data`: press/fullWidth/size/tone; `style var`: radius/shadow/border                                        | Final tone/styles; size selectors set final dimensions             | Keep size as preset; scalar inputs to vars; tone recipe in CSS | Medium/High |
| `NbButtonTrailingIcon`    | `data`: push/shape?; `style var`: size/radius/bg/color                                                      | Writes final width/height/radius/bg/color                          | Use style vars for scalar values; keep semantic data only      | Medium      |
| `NbCallout`               | `data`: size/layout/tone; `style var`: radius/shadow                                                        | `data-radius`; radius final style; tone/shadow via capability      | Pilot component for new model                                  | High        |
| `NbCard`                  | `data`: tone; `style var`: radius/shadow/border/padding                                                     | Capabilities write final styles                                    | Simple surface migration                                       | Medium      |
| Card parts                | `data`: actions align                                                                                       | Good selector use                                                  | Keep                                                           | Low         |
| `NbCheckbox`              | `data`: state/tone?; `style var`: size/colors                                                               | Writes vars/final values inconsistently; `data-nb-tone` may be unused | Use data for state, CSS vars for visual values                 | Medium      |
| `NbChip`                  | `data`: tone?; `style var`: padding/radius/shadow/border/iconSize                                           | Padding as data selector; capabilities final styles                | Style vars for scalar values; tone recipe in CSS               | Medium      |
| `NbChipGroup`             | `data`: direction/align; `style var`: gap/radius/shadow/transform/tracking                                  | Writes final gap/text styles and child vars                        | Use group vars/context carefully                               | Medium      |
| `NbCluster`               | `data`: align/justify/wrap/separator; `style var`: gap/padding                                              | Gap/padding final styles                                           | Style vars for gap/padding; keep semantic data                 | Medium      |
| `NbDialog`                | `internal`: open/close; `data`: tone; `style var`: radius/shadow/border                                     | Inner dialog writes final styles                                   | Bind vars to inner surface; CSS final styles                   | Medium      |
| Dialog parts              | behavior/slots                                                                                              | Good selector use                                                  | Keep                                                           | Low         |
| `NbDisplay`               | `data`: underline/reset; `style var`: size/weight/fluid/tracking/leading/underline values                   | Writes typography defaults from TS                                 | Move scalar typography inputs to CSS vars                      | High        |
| `NbHalftone`              | `data/internal`: shape; `style var`: color/size/gaps/rows/columns                                           | TS duplicates defaults; geometry-specific complexity               | Separate runtime geometry from token customization             | High        |
| `NbIcon`                  | `internal`: src/mode/decorative/label; `style var`: size/color                                              | Writes final width/height/color; mirror data maybe unused          | Use `--nb-icon-size`, `--nb-icon-color`; keep mode behavior    | High        |
| `NbIconButton`            | `data`: size/shape/tone; `style var`: radius/shadow/border                                                  | Capabilities final styles                                          | Keep semantic size/tone, scalar vars                           | Medium      |
| `NbImageCard`             | `internal`: image/alt; `data`: tone; `style var`: border/radius/shadow                                      | Host/caption write final styles                                    | Surface vars and CSS recipes                                   | Medium      |
| `NbInput`                 | `data`: in-group/size/state/tone?; `style var`: border/radius/bg/fg                                         | Writes final bg/border values                                      | CSS vars for visual tokens; data for state/preset              | High        |
| `NbTextarea`              | same as input                                                                                               | Same as input                                                      | Same as input                                                  | High        |
| `NbInputGroup`            | no public inputs                                                                                            | Public vars read, defaults may be hard-coded                       | Add customization-friendly fallbacks                           | Low         |
| `NbInputPrefix/Suffix`    | `data`: align                                                                                               | Good selector use                                                  | Keep                                                           | Low         |
| `NbLabel`                 | no inputs                                                                                                   | Hard-coded typography                                              | Optional CSS vars later                                        | Low         |
| `NbMarquee`               | `data`: reverse/pauseOnHover; `style var`: duration                                                         | Writes duration var directly                                       | Duration can be scalar style input; behavior data remains      | Medium      |
| `NbMarqueeItem`           | no inputs                                                                                                   | Hard-coded spacing/type                                            | Optional CSS vars later                                        | Low         |
| `NbMediaFrame`            | `data`: ratio/fit/tone; `style var`: radius/shadow/border                                                   | Migrated: `data-nb-tone`; scalar inputs write public CSS vars      | Done; keep tests on no-input/no-final-inline-style behavior    | Medium      |
| `NbMediaItem`             | `data`: variant/orientation/align/size/tone; `style var`: icon bg/anatomy values                            | CSS assigns public vars locally; tone final styles                 | Use data presets and public vars carefully                     | High        |
| `NbMediaItemIcon`         | `data`: surface; `style var`: background                                                                    | `data-background` mirrors design                                   | Remove design mirror; use `--nb-media-item-icon-bg`            | Low/Medium  |
| `NbProgress`              | `internal`: value/max/label; `data`: tone                                                                   | Fill/track colors final/defaulted from TS                          | Runtime width remains; colors via CSS recipe/vars              | Medium      |
| `NbRating`                | `internal`: value/max/count; `data`: tone                                                                   | Filled star color final/default from TS                            | Rating colors via CSS vars/recipe                              | Medium      |
| `NbSection`               | `data`: divider/layout/align/flush; `style var`: padding                                                    | Padding/flush margin final styles                                  | Padding var; flush math in CSS                                 | Medium      |
| `NbNativeSelect`          | `data`: in-group/size/tone?; `style var`: border/radius/colors                                              | Final bg/fg/border styles                                          | Same direction as inputs                                       | High        |
| `NbSelect`                | `data`: state/disabled/in-group/tone?; `internal`: value/options                                            | Host/listbox/option final colors and widths                        | Vars across host/listbox/options; data for state               | High        |
| `NbSelectOption`          | `data/internal`: selected/disabled/value                                                                    | Reads parent style functions                                       | Keep behavior; styles from select vars                         | Medium      |
| `NbSeparator`             | `data`: orientation/variant; `style var`: thickness/color                                                   | TS duplicates thickness defaults                                   | CSS selectors + vars for scalar styling                        | Medium      |
| `NbSplit`                 | `data`: ratio/collapse/align/separator; `style var`: gap/padding                                            | Gap/padding final styles                                           | Vars for gap/padding; data for layout                          | Medium      |
| `NbStack`                 | `data`: align/justify/separator; `style var`: gap                                                           | Gap final style                                                    | Var for gap; data for state                                    | Medium      |
| `NbStat`                  | `data`: direction; `internal`: value/label                                                                  | CSS vars already used                                              | Keep; optionally improve defaults                              | Low         |
| `NbStatusDot`             | `data`: state; `style var`: size/radius                                                                     | State selectors/final size; radius capability final style          | State data; scalar vars for size/radius                        | Medium      |
| `NbSticker`               | `data/internal`: shape/decorative/tone?; `style var`: rotate/size/fill/ink/shadow                           | TS writes tone/rotate/scale/shadow vars and CSS local defaults     | Separate shape/state from scalar vars                          | High        |
| `NbStickerFace`           | no inputs                                                                                                   | Reads sticker ink                                                  | Keep                                                           | Low         |
| `NbSurface`               | `data`: layout/edge/clip/size/tone; `style var`: radius/shadow/border/padding/typography                    | Migrated: `data-nb-tone`; scalar inputs write public CSS vars      | Done; typography remains composed through `NbTypography`       | High        |
| `NbText`                  | `data`: underline/reset; `style var`: size/weight/tone?/transform/tracking/measure/leading/underline values | Design mirror data attrs; final typography from TS                 | Remove mirror attrs; scalar typography vars                    | High        |
| `NbTitle`                 | data/visual fixed underline                                                                                 | No input                                                           | Keep                                                           | Low         |
| `NbTypography`            | `style var`: font                                                                                           | Writes public var and final font-family; mirror attr               | Use typography font var; remove mirror data                    | Medium      |

---

## 6. Specific Problem Patterns to Search For

### 6.1 Final style bindings

Search for host bindings like:

```txt
[style.background]
[style.background-color]
[style.color]
[style.border-color]
[style.border-width]
[style.border-radius]
[style.box-shadow]
[style.padding]
[style.gap]
[style.font-size]
[style.font-weight]
[style.line-height]
[style.letter-spacing]
[style.max-width]
[style.text-transform]
[style.width]
[style.height]
```

Command:

```bash
rg "\[style\.(background|background-color|color|border-color|border-width|border-radius|box-shadow|padding|gap|font-size|font-weight|line-height|letter-spacing|max-width|text-transform|width|height)\]" libs/ui/src/lib
```

Not every result is wrong. Runtime behavior styles may be valid. But every customizable token style should be reviewed.

---

### 6.2 Token resolver calls from possibly undefined inputs

Search for:

```bash
rg "nb[A-Z][A-Za-z]+Value\(this\.[A-Za-z0-9_]+\(\)\)" libs/ui/src/lib
```

Look for patterns like:

```ts
nbRadiusValue(this.radius())
nbShadowValue(this.shadow())
nbPaddingValue(this.padding())
```

If the input can be `undefined`, the new direction is to use a named input transform or keep the value in CSS.

---

### 6.3 Computed signals that only convert undefined to null

Search for:

```bash
rg "!== undefined|=== undefined|\?\? null|return .*: null" libs/ui/src/lib
```

Common pattern:

```ts
protected readonly radiusStyle = computed(() => {
  const radius = this.radius();

  return radius !== undefined ? nbRadiusValue(radius) : null;
});
```

Target:

```ts
readonly radius = input(null, {
  transform: nbRadiusStyleTransform,
});
```

---

### 6.4 Public variables assigned as defaults

Search for component CSS assignments like:

```css
--nb-component-property: fallback;
```

Command:

```bash
rg "--nb-[a-z0-9-]+:\s*" libs/ui/src/lib apps/docs/src
```

Review whether the variable is a public customization slot. If yes, do not assign it as a default on the component host unless intentionally blocking inheritance.

Avoid:

```css
[data-nb-callout] {
  --nb-callout-radius: var(--nb-radius-xl);
}
```

Prefer:

```css
[data-nb-callout] {
  border-radius: var(--nb-callout-radius, var(--nb-radius-xl));
}
```

---

### 6.5 Design mirror data attributes

Search for data attributes that mirror scalar design values:

```bash
rg "data-(radius|shadow|padding|border|gap|background|weight|tracking|measure|leading)" libs/ui/src/lib
```

Remove them unless CSS selectors or behavior truly require them.

---

## 7. Known High-Risk Areas

### 7.1 Shared style capabilities

Risk:

```txt
High blast radius.
```

Reason:

```txt
They affect many primitives at once.
```

Migration recommendation:

```txt
Do not start by rewriting shared style capabilities globally.
Start with one component pilot.
```

---

### 7.2 Forms and Select

Components:

```txt
NbInput
NbTextarea
NbNativeSelect
NbSelect
NbSelectOption
```

Risk:

```txt
High.
```

Reason:

```txt
They have inner elements, grouped states, disabled states, option states, focus states, and possibly multiple DOM targets.
```

Recommendation:

```txt
Migrate after simple surfaces and layout primitives.
```

---

### 7.3 Typography and Icon

Components:

```txt
NbText
NbDisplay
NbTypography
NbIcon
```

Risk:

```txt
High.
```

Reason:

```txt
They currently write many default visual values from TypeScript.
Some data attributes may be design mirrors.
```

Recommendation:

```txt
Audit input-by-input.
Do not blindly classify every input as semantic or scalar.
```

---

### 7.4 Special drawing/runtime components

Components:

```txt
NbSticker
NbHalftone
NbProgress
NbRating
NbSeparator
NbMediaItem
```

Risk:

```txt
High.
```

Reason:

```txt
They combine tokens with runtime geometry, drawing, or generated layout.
```

Recommendation:

```txt
Separate runtime behavior from token customization.
Keep runtime values in TypeScript when necessary.
Move visual tokens to CSS variables when possible.
```

---

## 8. Component Families

### 8.1 Surface-like components

Components:

```txt
NbCard
NbBadge
NbAvatar
NbSurface
NbMediaFrame
NbIconButton
NbImageCard
NbDialog
NbAccordionItem
```

Common tokens:

```txt
tone
radius
shadow
border
padding
```

Target pattern:

```ts
host: {
  '[attr.data-nb-tone]': 'tone() ?? null',
  '[style.--nb-card-radius]': 'radiusStyle()',
  '[style.--nb-card-shadow]': 'shadowStyle()',
  '[style.--nb-card-border-width]': 'borderWidthStyle()',
}
```

```css
[data-nb-card] {
  background: var(--nb-card-bg, var(--_nb-tone-bg, var(--nb-tone-neutral-bg)));
  color: var(--nb-card-fg, var(--_nb-tone-fg, var(--nb-tone-neutral-fg)));
  border-color: var(--nb-card-border-color, var(--_nb-tone-border-color, var(--nb-tone-neutral-border)));
  border-width: var(--nb-card-border-width, var(--nb-border-width-lg));
  border-radius: var(--nb-card-radius, var(--nb-radius-xl));
  box-shadow: var(--nb-card-shadow, var(--nb-shadow-hard));
}
```

---

### 8.2 Layout primitives

Components:

```txt
NbStack
NbCluster
NbSplit
NbSection
NbChipGroup
```

Common semantic inputs:

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

Common scalar inputs:

```txt
gap
padding
separator gap
```

Target pattern:

```ts
host: {
  '[attr.data-align]': 'align()',
  '[style.--nb-stack-gap]': 'gapStyle()',
}
```

```css
[data-nb-stack] {
  gap: var(--nb-stack-gap, var(--nb-space-4));
}
```

---

### 8.3 Forms

Components:

```txt
NbInput
NbTextarea
NbNativeSelect
NbSelect
```

Common semantic/state inputs:

```txt
size
tone
state
disabled
in-group
open
selected
invalid
```

Common scalar customization variables:

```txt
--nb-input-bg
--nb-input-fg
--nb-input-border-color
--nb-input-border-width
--nb-input-radius
--nb-input-shadow
--nb-input-padding
--nb-input-height
--nb-input-focus-ring-color
```

Target direction:

```txt
State remains data-driven.
Visual values read public CSS variables with fallbacks.
Do not write final form styles from TypeScript.
```

---

### 8.4 Typography

Components:

```txt
NbText
NbDisplay
NbTypography
```

Likely scalar inputs:

```txt
size
weight
leading
tracking
measure
transform
underlineGap
underlineWidth
font
```

Target pattern:

```ts
host: {
  '[style.--nb-text-size]': 'sizeStyle()',
  '[style.--nb-text-weight]': 'weightStyle()',
}
```

```css
[data-nb-text] {
  font-size: var(--nb-text-size, var(--nb-font-size-md));
  font-weight: var(--nb-text-weight, var(--nb-font-weight-regular));
}
```

Caution:

```txt
Some typography inputs may still be semantic presets.
Audit case by case.
```

---

### 8.5 Special components

Components:

```txt
NbSticker
NbHalftone
NbProgress
NbRating
NbSeparator
NbMediaItem
```

Rule:

```txt
Do not blindly apply scalar input transforms to runtime behavior.
```

Examples of runtime values to keep in TypeScript:

```txt
progress percentage width
rating filled count
halftone dot positions
icon mask/image source
sticker SVG geometry
```

Visual values should still move toward CSS variables where reasonable.

---

## 9. Migration Readiness Checklist

Before migrating a component, answer:

```txt
1. Which inputs are semantic/state/preset?
2. Which inputs are scalar design inputs?
3. Which inputs are behavior/internal?
4. Which inputs are accessibility?
5. Which host bindings write final CSS properties?
6. Which computed signals only convert undefined to null?
7. Which CSS rules assign public variables as defaults?
8. Which data attributes only mirror scalar design values?
9. Which visual defaults currently live in TypeScript?
10. Which final properties should move to CSS?
```

---

## 10. Accepted Migration Direction

Use this active direction, not the older audit proposal:

```txt
1. Semantic inputs use data attributes.
2. Scalar design inputs use input transforms.
3. Scalar design inputs write public component CSS variables inline.
4. CSS variables are the public customization API.
5. CSS owns final properties and fallbacks.
6. Tone is semantic data, not a TypeScript multi-var generator.
7. Capability directives are for semantic/state behavior.
8. Input transforms normalize scalar visual token inputs.
```

Do not use by default:

```txt
--nb-{component}-{property}-input
--nb-{component}-{property}-default
--_nb-{component}-{property}
```

These patterns may be revisited later for specific advanced cases, but they are not the baseline architecture.

---

## 11. Final Notes

This audit is intentionally broader than the active migration plan.

It should be used to understand the problem space, not as a literal implementation checklist.

The active implementation sequence lives in:

```txt
docs/architecture/token-customization-migration.md
```

The accepted architecture and thinking flow live in:

```txt
docs/architecture/token-customization.md
```

When in doubt:

```txt
Do not make TypeScript the style engine.
Do not leak internal CSS variable layers to users.
Keep Angular inputs ergonomic.
Keep CSS variables customizable.
Let CSS own final visual output.

---

## Search patterns and checks

Use these searches to find remaining uses to migrate.

```bash
rg "data-tone" libs/ui/src/lib apps/docs
rg "\[data-nb-[a-z-]+\]\[data-nb-tone" libs/ui/src/lib apps/docs
rg "--_nb-tone" libs/ui/src/lib apps/docs
```

Notes:

- `rg "data-tone"` finds legacy attributes that must be migrated to `data-nb-tone`.
- `rg "\[data-nb-[a-z-]+\]\[data-nb-tone"` finds per-component tone recipe blocks that should be removed or evaluated for special behavior.
- `rg "--_nb-tone"` finds uses of the internal current tone slots; ensure they appear only in the shared recipe layer or component consumption fallbacks, not as public examples.

- The internal `--_nb-tone-*` variables are intentionally the exception to the rule of avoiding internal custom properties: they centralize tone recipe state and prevent per-component duplication. They may appear in DevTools but are not part of the public customization API.
```
