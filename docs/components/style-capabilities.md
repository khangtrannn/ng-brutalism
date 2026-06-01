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
  MediaFrame `ratio`/`fit`, Button `press`/`size`/state, layout
  `align`/`justify`/`separator`, …) and a Tailwind base-class string that *consumes*
  the variables.

## Component variable contract

Each primitive owns a namespaced set of variables — easy to inspect, document,
and override:

| Primitive | namespace | variables written |
|---|---|---|
| nbSurface | `surface` | `--nb-surface-{bg,fg,border-color,radius,border-width,shadow,padding}` |
| nbMediaFrame | `media-frame` | `--nb-media-frame-{bg,fg,border-color,radius,border-width,shadow}` |
| nbButton | `button` | `--nb-button-{bg,fg,border-color,radius,border-width,shadow}` |
| nbIconButton | `icon-button` | `--nb-icon-button-{bg,fg,border-color,border-width,radius,shadow}` |
| nbChip | `chip` | `--nb-chip-{bg,fg,border-color,border-width,radius,shadow}` |
| nbMediaItem | `media-item` | `--nb-media-item-{bg,fg,border-color}` (+ local anatomy vars) |
| nbCallout | `callout` | `--nb-callout-{bg,fg,border-color,shadow}` (radius is size-derived) |
| nbBadge | `badge` | `--nb-badge-{bg,fg,border-color,border-width,radius,shadow}` |
| nbCard | `card` | `--nb-card-{bg,fg,border-color,border-width,radius,shadow}` |
| nbAvatar | `avatar` | `--nb-avatar-{bg,fg,border-color,border-width,radius,shadow}` |
| nbImageCard | `image-card` | `--nb-image-card-{bg,fg,border-color,border-width,radius,shadow}` |
| nbDialog | `dialog` | `--nb-dialog-{bg,fg,border-color,border-width,radius,shadow}` |
| nbAccordionItem | `accordion-item` | `--nb-accordion-item-{bg,fg,border-color,border-width,radius,shadow}` |
| nbSection | `section` | `--nb-section-padding` |
| nbStack | `stack` | `--nb-stack-gap` |
| nbCluster | `cluster` | `--nb-cluster-{gap,padding}` |
| nbSplit | `split` | `--nb-split-{gap,padding}` |

> Tone owns `bg` / `fg` / `border-color`; the border capability owns
> `border-width` only — so color and width never fight.

## Why some primitives only partially adopt capabilities

- **Button** composes **tone**, **radius**, **shadow**, and **border** capabilities.
  `tone` is the single color axis (default `primary`), and `shadow` is purely
  visual depth. The hover/active translate behavior is intentionally separate as
  `press` so `variant` never means color and `shadow` never means behavior.
- **Callout** keeps its size-derived radius/border-width (anatomy), composing only
  tone + shadow.
- **Surface** uses the padding capability for uniform container padding. **Chip**
  keeps its asymmetric pill padding primitive-local.

## Public API export policy

Public: the primitives, their type aliases, and the shared token types +
resolvers (`NbRadius`, `nbRadiusValue`, …). The capability directives and
`NB_STYLE_*` DI tokens are exported from the package entry **only** because
Angular requires classes referenced by `hostDirectives` to be reachable
(NG3001). They are re-exported with Angular private `ɵ` names and are not meant
for direct use.

---

## Migration summary

### Added
- Shared token contracts + resolvers: `NbRadius`/`nbRadiusValue`,
  `NbShadow`/`nbShadowValue`, `NbBorderStrength`/`nbBorderWidthValue`,
  `NbSpacing`/`nbSpacingValue`, `NbPadding`/`nbPaddingValue`, `NbDivider`, and
  `nbToneVars()` (+ `NbToneToken` neutral aliases `surface`/`background`/`ink`).
- Shared typography types in `tokens/typography.ts`: `NbUnderlineVariant`
  (`none|bar|wave`, shared alias for `NbTextUnderline` and `NbDisplayUnderline`)
  and `NbTextTracking` (`tight|normal|wide|wider`, shared by nbText + nbChipGroup).
- Internal capabilities: `NbToneCapability`, `NbRadiusCapability`,
  `NbShadowCapability`, `NbBorderCapability`, `NbPaddingCapability`,
  `NbGapCapability`, `NbUnderlineCapability`, `NbResetMarginCapability`.
- DI tokens: `NB_STYLE_NAMESPACE`, `NB_STYLE_DEFAULTS` (+ `NbStyleDefaults`).

### Changed
- `NbSurface`, `NbMediaFrame`, `NbButton`, `NbIconButton`, `NbChip`, `NbCallout`,
  `NbBadge`, `NbCard`, `NbAvatar`, `NbImageCard`, `NbDialog`,
  `NbAccordionItem`, `NbSection`, `NbStack`, `NbCluster`, and `NbSplit` now
  compose shared capabilities via `hostDirectives` instead of redefining token
  unions/maps.
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
- **Changed:** Button `shadow="reverse"` moved to `press="reverse"`; `shadow`
  now accepts the shared shadow token scale.
- **Unchanged:** all primitive selectors and every layout primitive input.

### Follow-ups
- Consider a shared `separator` type/capability across Stack/Cluster/Split (they
  now expose `separator`; Section keeps `divider`/`NbDivider` as placement).
- Optionally unify Surface/Chip padding onto the padding capability later.

---

## Capability adoption follow-up

The visual grammar now flows through internal capabilities across the major
primitives. IconButton, MediaItem, Chip, and Button all consume the shared
vocabulary instead of redefining it:

- `tone` writes `--nb-{namespace}-bg`, `--nb-{namespace}-fg`, and
  `--nb-{namespace}-border-color`.
- `radius` writes `--nb-{namespace}-radius`.
- `shadow` writes `--nb-{namespace}-shadow`.
- `border` writes `--nb-{namespace}-border-width`.

Component-specific behavior remains inside each primitive (IconButton square
dimensions/shape, Chip pill padding, MediaItem layout anatomy, Button/IconButton
hover-translate press behavior).

### Shipped in this pass
- **IconButton** adopts tone/radius/shadow/border capabilities. Local
  `NbIconButtonRadius` map and `NbIconButtonVariant` color map removed — `variant`
  is replaced by the shared `tone`; `md` radius now means `var(--nb-radius)`.
- **MediaItem** drops its hardcoded hex tone map; `tone` resolves through
  `NbToneCapability` / `nbToneVars()`, and `NbMediaItemTone` aliases `NbToneToken`.
- **Chip** and **Button** adopt `NbBorderCapability` for border *width*; border
  *color* comes from tone (`--nb-*-border-color`).
- **Button** folds `variant` into `tone` — `variant` and `NbButtonVariant` are
  removed (no alias), Button composes `NbToneCapability`, and color flows through
  `--nb-button-{bg,fg,border-color}`. Default tone is `primary` (replacing the
  bespoke `--nb-main`). `shadow` now composes `NbShadowCapability`; pressed motion
  is separated into `press`.
- **Badge** replaces `variant` with the shared `tone` capability and composes
  radius/shadow/border as a small visual shell.
- **Card**, **Avatar**, **ImageCard**, **Dialog**, and **AccordionItem** consume
  shared visual-shell capabilities; their subpart/layout anatomy stays local.
- **Surface** padding now writes `--nb-surface-padding` through
  `NbPaddingCapability`.
- Ambiguous `--nb-*-border` variables are normalized to `--nb-*-border-color`
  (color) and `--nb-*-border-width` (width).

### Typography capability sweep (2026-06-01)
- `NbUnderlineCapability` — handles `underline/underlineGap/underlineWidth`
  inputs and writes `data-underline`, `--nb-underline-gap`,
  `--nb-underline-width` on the host. No namespace injection needed (the vars
  are global, not primitive-scoped).
- `NbResetMarginCapability` — handles `reset` input and writes `margin: 0`
  when true (default). Removes native `<p>`/`<h*>` margins so layout primitives
  control spacing.
- Both composed into `NbText` and `NbDisplay` via `hostDirectives`; the 12
  lines of duplicated `computed()` calls and host bindings in each primitive are gone.
- `NbChipGroup` decoupled from `../text` — now imports `NbTextTracking` from
  `tokens/typography` directly.

### Deferred (see `docs/architecture/capability-discovery.md`)
- `NbPressCapability` — Button/IconButton hover-translate stays local.
- `NbFocusCapability`, `NbDisabledCapability` — accessibility chapter.
- `NbControlSizeCapability`, `NbAlign/NbJustifyCapability` — record only.
- Generic `NbSizeCapability` — **will not** be built; `size` means different
  anatomy per primitive.
