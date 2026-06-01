# Internal Style-Capability Architecture

How ng-brutalism primitives share their visual vocabulary without duplicating
token logic. This is an **internal** architecture note — public users keep
composing the primitives (`nbSurface`, `nbButton`, …); they never touch the
capability layer.

## The five layers

```
tokens          libs/ui/src/lib/tokens/*        vocabulary + value resolvers
   ↓
DI tokens       core/capabilities/nb-style-tokens.ts   NB_STYLE_NAMESPACE / NB_STYLE_DEFAULTS
   ↓
capabilities    core/capabilities/*            internal directives, write --nb-<ns>-* vars
   ↓
primitives      lib/<primitive>/*              compose capabilities via hostDirectives
   ↓
CSS             primitive `classes()`          consume --nb-<ns>-* via Tailwind utilities
```

- **Tokens** define the vocabulary once: `NbRadius`, `NbShadow`,
  `NbBorderStrength`, `NbSpacing` (gap), `NbPadding`, `NbDivider`, plus
  `nbToneVars()`. Each file co-locates the type with its resolver
  (`nbRadiusValue()`, …) — the single source of truth, so a token means the same
  thing in every primitive.
- **Capabilities** are tiny standalone directives (`NbToneCapability`,
  `NbRadiusCapability`, …). Each injects `NB_STYLE_NAMESPACE` + `NB_STYLE_DEFAULTS`,
  resolves its one input, and binds a **signal-driven host `[style]` map** that
  writes namespaced component variables. No `effect()` — the dynamic variable
  name (`--nb-${ns}-radius`) is produced by a `computed()` style map, which is
  the declarative, zoneless-friendly idiom. Each also reflects a `data-<token>`
  attribute for inspection.
- **Resolution order** inside every capability:
  `explicit input → NB_STYLE_DEFAULTS[token] → capability hard fallback`.
- **Primitives** provide their namespace + defaults and compose the capabilities
  through Angular `hostDirectives`, forwarding the public input names
  (`inputs: ['tone']`). The primitive keeps only its own anatomy (Surface `clip`,
  MediaFrame `ratio`/`fit`, Button `variant`/`size`/state, layout
  `align`/`justify`/`separator`, …) and a Tailwind base-class string that *consumes*
  the variables.

## Component variable contract

Each primitive owns a namespaced set of variables — easy to inspect, document,
and override:

| Primitive | namespace | variables written |
|---|---|---|
| nbSurface | `surface` | `--nb-surface-{bg,fg,border-color,radius,border-width,shadow}` |
| nbMediaFrame | `media-frame` | `--nb-media-frame-{bg,fg,border-color,radius,border-width,shadow}` |
| nbButton | `button` | `--nb-button-radius` (+ existing `--nb-button-{bg,fg}`) |
| nbChip | `chip` | `--nb-chip-{bg,fg,border-color,radius,shadow}` |
| nbCallout | `callout` | `--nb-callout-{bg,fg,border-color,shadow}` (radius is size-derived) |
| nbSection | `section` | `--nb-section-padding` |
| nbStack | `stack` | `--nb-stack-gap` |
| nbCluster | `cluster` | `--nb-cluster-{gap,padding}` |
| nbSplit | `split` | `--nb-split-{gap,padding}` |

> Tone owns `bg` / `fg` / `border-color`; the border capability owns
> `border-width` only — so color and width never fight.

## Why some primitives only partially adopt capabilities

- **Button** composes the **radius** capability only. Its color is a
  `variant`(preset) + `tone`(override) hybrid layered over a `var(--nb-main)`
  default, and `shadow` encodes hover-translate behavior — neither matches the
  "always write a resolved value" capability contract. Its existing
  `--nb-button-bg/-fg` bindings already satisfy the namespaced-variable goal.
- **Callout** keeps its size-derived radius/border-width (anatomy), composing only
  tone + shadow.
- **Surface / Chip** keep their asymmetric padding primitive-local; only the
  uniform-container primitives (Section / Cluster / Split) use the padding
  capability.

## Public API export policy

Public: the primitives, their type aliases, and the shared token types +
resolvers (`NbRadius`, `nbRadiusValue`, …). The capability directives and
`NB_STYLE_*` DI tokens are exported from the package entry **only** because
Angular requires classes referenced by `hostDirectives` to be reachable
(NG3001); they are marked INTERNAL and are not meant for direct use.

---

## Migration summary

### Added
- Shared token contracts + resolvers: `NbRadius`/`nbRadiusValue`,
  `NbShadow`/`nbShadowValue`, `NbBorderStrength`/`nbBorderWidthValue`,
  `NbSpacing`/`nbSpacingValue`, `NbPadding`/`nbPaddingValue`, `NbDivider`, and
  `nbToneVars()` (+ `NbToneToken` neutral aliases `surface`/`background`/`ink`).
- Internal capabilities: `NbToneCapability`, `NbRadiusCapability`,
  `NbShadowCapability`, `NbBorderCapability`, `NbPaddingCapability`,
  `NbGapCapability`.
- DI tokens: `NB_STYLE_NAMESPACE`, `NB_STYLE_DEFAULTS` (+ `NbStyleDefaults`).

### Changed
- `NbSurface`, `NbMediaFrame`, `NbButton`, `NbChip`, `NbCallout`, `NbSection`,
  `NbStack`, `NbCluster`, `NbSplit` now compose shared capabilities via
  `hostDirectives` instead of redefining token unions/maps.
- Style capabilities write component-specific CSS variables (e.g.
  `--nb-surface-bg`, `--nb-button-radius`) via host `[style]` maps; primitives
  consume them with Tailwind utilities (no new `.nb-*` CSS classes).
- Per-primitive token type names (`NbSurfaceRadius`, `NbButtonRadius`,
  `NbStackGap`, …) are retained as **aliases** of the shared tokens.

### Removed
- Duplicated radius/shadow/border/gap/padding maps and tone computeds from the
  individual primitives.
- Drifted Surface values `radius="base"` and `shadow="lifted"`.

### Public API impact
- **Renamed (breaking):** `nbSection [border]` → `[divider]`,
  `[borderStyle]` → `[dividerStyle]`; `NbSectionBorder` → `NbSectionDivider`,
  `NbSectionBorderStyle` → `NbSectionDividerStyle`.
- **Removed (breaking, pre-1.0):** Surface `radius="base"`, `shadow="lifted"`.
- **Canonicalized values:** a token (e.g. `radius="lg"`) now resolves to one
  geometry everywhere; primitives whose old value differed shift slightly.
- **Unchanged:** all other primitive inputs/selectors, Button `variant`/`tone`/
  `shadow`, and every layout primitive input.

### Follow-ups
- Revisit folding Button `tone`/`variant` into the tone capability post-1.0.
- Consider a shared `separator` type/capability across Stack/Cluster/Split (they
  now expose `separator`; Section keeps `divider`/`NbDivider` as placement).
- Optionally unify Surface/Chip padding onto the padding capability later.
