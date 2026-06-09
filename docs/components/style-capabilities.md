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
capabilities    core/capabilities/*            internal directives, resolve inputs to literal values only
   ↓
primitives      lib/<primitive>/*              compose capabilities via hostDirectives, map outputs to CSS props
   ↓
CSS             component `styles` (plain CSS)  read public hooks with fallbacks, state via data-attrs
```

- **Tokens** define the vocabulary once: `NbRadius`, `NbShadow`,
  `NbBorderStrength`, `NbSpacing` (gap), `NbPadding`, `NbDivider`, plus
  `nbToneVars()`. Each file co-locates the type with its resolver
  (`nbRadiusValue()`, …) — the single source of truth, so a token means the same
  thing in every primitive.
- **Capabilities** are tiny standalone directives (`NbToneCapability`,
  `NbRadiusCapability`, …). Each injects `NB_STYLE_NAMESPACE` + `NB_STYLE_DEFAULTS`,
  resolves its one input, and exposes **computed literal-or-`null` values**
  (`background`, `foreground`, `borderColor`, `value`, `width`, …) — `null`
  when the input is unset. Capabilities **do not write any CSS custom
  properties**. They may reflect a `data-<token>` modifier only when the input is
  actually provided; omitted inputs stay omitted in the DOM. No `effect()` —
  every output is a plain `computed()`, the declarative, zoneless-friendly idiom.
- **Primitives** provide their namespace + defaults, compose the capabilities
  through Angular `hostDirectives` (forwarding public input names like
  `inputs: ['tone']`), and **map each capability output straight onto the real
  CSS property** via host `[style.*]` bindings (`[style.background]`,
  `[style.border-radius]`, `[style.box-shadow]`, …). When a capability returns
  `null`, Angular removes the inline style entirely, letting the CSS fallback
  chain take over. The primitive keeps only its own anatomy (Surface `clip`,
  MediaFrame `ratio`/`fit`, Button `press`/`size`/state, layout
  `align`/`justify`/`separator`, …). Modifier inputs whose defaults are visual
  CSS defaults should also be optional (`undefined`) and bound directly to
  `data-*`, so the DOM only carries modifiers the user selected.
- **CSS** (global `:where()` rules or component `styles`) reads the primitive's
  **public** hooks directly — `var(--nb-button-bg, var(--nb-primary))` — and
  owns the library default as a literal fallback. There is no internal
  resolution layer in CSS: the cascade and inheritance do all the work for
  layers 2–4.

## Token customization priority model

Decided target order for every visual property a primitive exposes
(`background`, `tone`-derived colors, `radius`, `shadow`, …), highest wins:

1. **Directive input** — `tone`, `background`, `radius`, `shadow`, …
2. **Local CSS token customization** — `style="--nb-button-bg: …"` on the element itself
3. **Inherited CSS token customization** — `--nb-button-bg` set on an ancestor
4. **Library default** — the fallback baked into the component's `styles`

### Core rule: inputs and tokens must not write to the same CSS custom property

```txt
Input value
→ actual CSS property
→ [style.background], [style.color], [style.border-color], [style.border-radius], …

Token customization
→ public CSS custom property
→ --nb-button-bg, --nb-button-fg, --nb-button-radius, …

Inheritance
→ native CSS custom property inheritance

Default
→ fallback inside var(--nb-<namespace>-<prop>, <default>)
```

If an input wrote to the same `--nb-button-bg` hook that token customization
targets, a local/inherited token would be indistinguishable from — and could
even outrank — an explicit input, inverting the priority order. Routing inputs
to the **actual property** instead sidesteps the contention entirely: the
inline style (highest-specificity, element-level) always wins over anything a
custom property's `var()` fallback chain could produce, and when the input is
absent the inline style is gone and the public hook governs unopposed.

### The two halves, worked through `nbButton` background

**Capability** resolves the input only, returns `null` when unset:

```ts
readonly toneTokens = computed(() => {
  const tone = this.tone();
  if (!tone) return null;
  return nbToneVars(tone);
});

readonly background = computed(() => this.toneTokens()?.bg ?? null);
```

**Primitive** maps that resolved value straight onto the real property:

```ts
host: {
  '[style.background]': 'backgroundStyle()',
},
// ...
protected readonly backgroundStyle = computed(() => this.tone.background());
```

**CSS** reads the public hook with the library default as fallback — this is
the *only* place `--nb-button-bg` is consulted:

```css
.nb-button {
  background: var(--nb-button-bg, var(--nb-primary));
}
```

### Worked examples (`nbButton` background)

| Scenario | Resolution | Why |
|---|---|---|
| `tone="accent"` on element with inherited `--nb-button-bg: #ffcc00` | inline `background: var(--nb-accent)` | input resolves to a literal written straight to the actual property — the hook is never consulted |
| `tone="accent"` + local `style="--nb-button-bg: #00e5ff"` | inline `background: var(--nb-accent)` | input still wins — different property, no contention with the local token |
| no `tone`, local `--nb-button-bg: #00e5ff`, inherited `--nb-button-bg: #ffcc00` | no inline style; CSS `background: var(--nb-button-bg, var(--nb-primary))` → `#00e5ff` | native cascade — local custom property beats inherited |
| no `tone`, inherited `--nb-button-bg: #ffcc00` only | resolves to `#ffcc00` | inherited token, nothing closer overrides it |
| no `tone`, no token anywhere | resolves to `var(--nb-primary)` | CSS fallback owns the library default |

### Don't give inputs defaults that always activate the input layer

```ts
// Avoid — the input layer is permanently "on"; token customization can never win
readonly tone = input<NbButtonTone>('neutral');

// Prefer — undefined lets the CSS fallback own the default, keeping layers 2–4 reachable
readonly tone = input<NbButtonTone | undefined>(undefined);
```

`undefined` is what lets the capability return `null`, which removes the
inline style and lets the `var(--nb-<ns>-<prop>, <default>)` chain in CSS take
over — keeping layers 2–4 reachable.

### Modifier `data-*` attrs follow the same rule

`data-*` modifier attributes are CSS state hooks, not default metadata. If the
default visual state belongs in CSS, TypeScript should not know that default just
to decide whether to print an attribute.

```ts
// Avoid — the DOM always says "md", even though CSS owns the md/default shape.
readonly size = input<NbButtonSize>('md');

host: {
  '[attr.data-size]': 'size()',
}

// Prefer — absent means default; CSS owns what the default looks like.
readonly size = input<NbButtonSize | undefined>(undefined);

host: {
  '[attr.data-size]': 'size()',
}
```

```css
/* Base selector owns defaults. */
:where(button[nbButton]) {
  height: 2.75rem;
  padding-inline: 1rem;
}

/* Modifier selectors only describe non-default choices. */
:where(button[nbButton][data-size='lg']) {
  height: 3.25rem;
  padding-inline: 1.25rem;
}
```

Do not replace this with `value === default ? null : value`; that still teaches
TypeScript the CSS default. The better model is: optional input, direct
attribute binding, base CSS fallback.

This applies to visual/anatomy modifiers such as `data-tone`, `data-radius`,
`data-shadow`, `data-border`, `data-padding`, `data-gap`, `data-size`,
`data-layout`, `data-align`, `data-justify`, `data-separator`, `data-ratio`,
`data-fit`, `data-shape`, and `data-press` whenever their default is purely a CSS
default. Always-on identity/state attributes are different and should remain
explicit: `data-nb-*` identity hooks, `data-slot`, `data-state`, `data-disabled`,
`data-in-group`, `data-clip`, `data-full-width`, ARIA, IDs, and other runtime
state.

### Migration rule: no internal variable channel

Earlier drafts of this architecture introduced a second CSS custom-property
layer between capability outputs and public hooks. That layer is removed. It
blended "input" and "library default" into one value and then wrapped *that* in
the public hook — which let the hook win over an explicit input (backwards), and
made the implementation harder to reason about because the primitive no longer
mapped inputs directly to the CSS properties they affect. The replacement is the
three-part split above: capability resolves input values, primitive maps to the
real property, CSS reads the public hook with a literal default.

## Component variable contract

Each primitive owns a namespaced set of public variables — easy to inspect,
document, and override. These variables are **read**, not assigned, by the
primitive/capability CSS so consumers can override them on the primitive itself
or on an ancestor scope:

| Primitive | namespace | public variables read |
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

## Component internal styling philosophy

**Rule for migrated internals:** No Tailwind utility classes inside component templates. All component-internal styling lives in the `styles` array as plain CSS. State-driven styling uses existing `data-*` attributes as CSS selectors instead of signal-computed class strings. Capability-owned public hooks are read with fallbacks; they are not assigned locally by the component.

**Why not Tailwind in templates?**
The library already handles self-containment via `@source './fesm2022/...'` in `styles.css` — so this is not about self-containment. The reasons are DX and performance:
- Devtools shows a clean element with no class attribute instead of a 200-char class string
- `computed()` + `twMerge(clsx(...))` overhead is eliminated for static styles
- State changes (open/close, disabled) are handled by CSS selectors on `data-state`, requiring zero JS

**The pattern — reference implementation: `NbAccordionItem`**

The item host is the visual surface and composes only the low-level paint
capabilities it needs. It does not compose `NbSurface`, because `NbSurface`
also owns padding, typography, layout, edge, clip, and generic surface anatomy:

```typescript
@Component({
  selector: 'nb-accordion-item',
  template: `<ng-content />`,
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: {
    '[attr.data-nb-accordion-item]': '""',
    '[attr.data-slot]': '"accordion-item-surface"',
    '[attr.data-state]': 'open() ? "open" : "closed"',
  },
})
export class NbAccordionItem {}
```

Compound children lean on **native CSS** wherever possible. Trigger/content
backgrounds default to `transparent`, foreground defaults to `inherit`, and the
open trigger divider inherits the item host's border width when no public
`--nb-accordion-item-border-width` hook is set. The trigger still injects the
item for behavior (`open`, `disabled`, ids, `toggle()`), but it does not read
visual style methods from the item.

**Specificity note:** Angular's `ViewEncapsulation.Emulated` scopes `button { }` to `button[_ngcontent-…]` (specificity 0,1,1). `:host { }` becomes an attribute selector on the host element (0,1,0 — same as a Tailwind class). This only affects consumers trying to directly target internal elements from outside, which is not the supported override path. Consumers use CSS custom properties.

**Consumer override API:** Expose customizable values as CSS custom properties with defaults:
```css
min-height: var(--nb-accordion-trigger-min-height, 3.5rem);
stroke-width: var(--nb-accordion-trigger-icon-stroke, 3);
background-color: var(--nb-accordion-trigger-bg, transparent);
color: var(--nb-accordion-trigger-fg, inherit);
```

Do **not** assign the public hook on the host:

```css
/* Avoid: this blocks inherited overrides from nb-accordion / nb-accordion-item. */
:host {
  --nb-accordion-trigger-bg: transparent;
}
```

This keeps all of these override shapes valid:

```html
<nb-accordion style="--nb-accordion-trigger-bg: var(--nb-lavender)">
  ...
</nb-accordion>

<nb-accordion-item style="--nb-accordion-trigger-bg: var(--nb-lavender)">
  ...
</nb-accordion-item>

<nb-accordion-trigger style="--nb-accordion-trigger-bg: var(--nb-lavender)">
  Overview
</nb-accordion-trigger>
```

Compound descendants inherit the host-rendered surface with normal CSS where
possible and inject ancestors only for behavior/state. Public
`--nb-<component>-*` variables remain the only consumer-owned override surface.

**What stays in templates:** Data/ARIA attributes (`[attr.aria-expanded]`, `[attr.data-state]`, `[id]`), event bindings, structural directives. No `class` or `[class]` bindings on internal elements.

**What does NOT change:** The `@source` directive in `styles.css` still handles any remaining template Tailwind classes during the rollout period. `nbClass` remains publicly exported for consumers.

---

## Component internal styling rollout

Migrated — full `styles` pattern, no template class bindings:
- `NbAccordionTrigger` (2026-06-06) — reference implementation; `:host` public-var anti-pattern fixed
- `NbAccordionItem` (2026-06-09) — inner surface wrapper removed; host composes `NbToneCapability`, `NbRadiusCapability`, `NbShadowCapability`, and `NbBorderCapability`
- `NbAccordionContent` (2026-06-06) — open/close `grid-template-rows` transition driven by `[data-state='open']` CSS selector; no `computed()` class

Pending migration (grouped by complexity):

**Wave 1 — simple static components (no reactive classes):**
- `NbBadge`, `NbAvatar`, `NbLabel`, `NbCard` (sub-components), `NbImageCard`

**Wave 2 — interactive components with state (reactive classes → data-attr CSS):**
- `NbButton`, `NbIconButton`, `NbChip`, `NbCheckbox`, `NbInput`, `NbTextarea`
- `NbProgress`, `NbRating`, `NbStatusDot`, `NbStat`

**Wave 3 — complex / layout (separator logic, multiple dynamic class maps):**
- `NbSelect`, `NbDialog`, `NbCallout`, `NbSurface`, `NbMediaFrame`, `NbMediaItem`
- `NbStack`, `NbCluster`, `NbSplit`, `NbSection`, `NbMarquee`

**Decision per wave:** validate in devtools + run tests before proceeding to next wave.

---

## Migration summary

### Added
- Shared token contracts + resolvers: `NbRadius`/`nbRadiusValue`,
  `NbShadow`/`nbShadowValue`, `NbBorderStrength`/`nbBorderWidthValue`,
  `NbSpacing`/`nbSpacingValue`, `NbPadding`/`nbPaddingValue`, `NbDivider`, and
  `nbToneVars()` (`surface`, `background`, and `ink` included in the neutral
  tone family).
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
- Style capabilities resolve their one input to a literal-or-`null` value
  (e.g. `background`, `radius`, `shadow`) and write nothing to CSS; primitives
  map those outputs straight onto the real CSS property
  (`[style.background]`, `[style.border-radius]`, …), and component CSS reads
  the public hook with the library default as fallback (e.g.
  `background: var(--nb-button-bg, var(--nb-primary))`).
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

- `tone` resolves `background`/`foreground`/`borderColor`; the primitive maps
  them onto `[style.background]`/`[style.color]`/`[style.border-color]`, and
  its CSS reads `--nb-{namespace}-bg/fg/border-color` as the customization hook.
- `radius` resolves to `[style.border-radius]`, hook `--nb-{namespace}-radius`.
- `shadow` resolves to `[style.box-shadow]`, hook `--nb-{namespace}-shadow`.
- `border` resolves to `[style.border-width]`, hook `--nb-{namespace}-border-width`.

Component-specific behavior remains inside each primitive (IconButton square
dimensions/shape, Chip pill padding, MediaItem layout anatomy, Button/IconButton
hover-translate press behavior).

### Shipped in this pass
- **IconButton** adopts tone/radius/shadow/border capabilities. Local
  `NbIconButtonRadius` map and `NbIconButtonVariant` color map removed — `variant`
  is replaced by the shared `tone`; `md` radius now means `var(--nb-radius)`.
- **MediaItem** drops its hardcoded hex tone map; `tone` resolves through
  `NbToneCapability` / `nbToneVars()`, and `NbMediaItemTone` aliases `NbTone`.
- **Chip** and **Button** adopt `NbBorderCapability` for border *width*; border
  *color* comes from tone (`--nb-*-border-color`).
- **Button** folds `variant` into `tone` — `variant` and `NbButtonVariant` are
  removed (no alias), Button composes `NbToneCapability`, and explicit tone
  inputs map to actual color properties. CSS reads
  `--nb-button-{bg,fg,border-color}` only when the input is unset. Default tone
  is `primary` in CSS (replacing the bespoke `--nb-main`). `shadow` now composes
  `NbShadowCapability`; pressed motion is separated into `press`.
- **Badge** replaces `variant` with the shared `tone` capability and composes
  radius/shadow/border as a small visual shell.
- **Card**, **Avatar**, **ImageCard**, **Dialog**, and **AccordionItem** consume
  shared visual-shell capabilities; their subpart/layout anatomy stays local.
- **Surface** adopts `NbPaddingCapability`; explicit padding maps to actual
  `padding`, while unset padding lets CSS read `--nb-surface-padding`.
- Ambiguous `--nb-*-border` variables are normalized to `--nb-*-border-color`
  (color) and `--nb-*-border-width` (width).

### Typography capability sweep (2026-06-01)
- `NbUnderlineCapability` — handles `underline/underlineGap/underlineWidth`
  inputs and reflects `data-underline`; `NbText` / `NbDisplay` map the resolved
  gap and width to `--nb-underline-gap` / `--nb-underline-width` for their
  pseudo-element CSS. No namespace injection needed (the vars are global, not
  primitive-scoped).
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
