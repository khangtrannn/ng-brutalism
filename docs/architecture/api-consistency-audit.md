# API Consistency Audit

> **Status:** Decision document. Audited 2026-06-01 against the actual code on
> `refactor/api-consistency-audit`. This audit predates the CSS-first
> token-customization architecture and should be treated as historical context,
> not the current implementation direction.
>
> Current docs:
> - [`token-customization.md`](./token-customization.md)
> - [`token-customization-hardening.md`](./token-customization-hardening.md)
> - [`composition-philosophy.md`](../components/composition-philosophy.md)
> - Archived: [`token-customization-audit.md`](../_archive/token-customization-audit.md),
>   [`token-customization-migration.md`](../_archive/token-customization-migration.md)
>
> The old style-capability layer (`tokens → capabilities → hostDirectives →
> public CSS hooks`) is preserved only as a reference in
> [`style-capabilities.md`](../_archive/style-capabilities.md).
>
> **API language cleanup — shipped (2026-06-01).** The public-vocabulary half of
> this audit landed in the API-language-cleanup PR:
>
> - `size` middle rung renamed `default` → **`md`** on IconButton, Display, Input,
>   Textarea, Checkbox (Button/Callout already used `md`). No `size="default"`
>   remains.
> - Layout child line style renamed `divider` → **`separator`** on Stack, Cluster,
>   Split (types `NbStackSeparator` / `NbClusterSeparator` / `NbSplitSeparator`;
>   CSS vars `--nb-cluster-separator-*`; `data-separator` attribute). Section keeps
>   `divider` / `dividerStyle` as **placement**.
> - Button typography inputs (`fontSize`, `weight`, `transform`, `tracking`) and
>   their types (`NbButtonFontSize` / `NbButtonWeight` / `NbButtonTransform` /
>   `NbButtonTracking`) **removed**; expressive labels compose a nested `nbText`.
>   Button keeps a default `font-bold`.
> - Recipes (Podcast/Job/Travel cards) + docs updated; no backward-compatible
>   aliases were kept.
>
> **Button tone normalization — shipped (2026-06-01).** Button's `variant` +
> `tone` dual color system was folded into a single `tone` API:
>
> - `variant` input and the `NbButtonVariant` type **removed** (no alias); the
>   local variant color map is gone.
> - Button composes `NbToneCapability` (alongside the existing
>   `NbRadiusCapability` / `NbBorderCapability`). `tone` is the only color axis,
>   defaulting to `primary` (was the bespoke `--nb-main`; no new `main` tone).
> - Color now flows through the shared resolver into `--nb-button-bg`,
>   `--nb-button-fg`, and `--nb-button-border-color`; the manual `toneBg()` /
>   `toneFg()` bindings were deleted.
> - Button `shadow`/press behavior stays local (still encodes hover/active
>   translate + `reverse`); splitting it is a future `NbPressCapability` pass.
>
> **Full-library capability adoption sweep — shipped (2026-06-01).** The
> remaining high-confidence visual shells now use existing capabilities:
> Surface padding, Badge, Card, Avatar, ImageCard, Dialog shell, and
> Accordion item shell. Badge `variant` was removed in favor of shared `tone`.
>
> Still **follow-ups**: `NbPressCapability` (Button/IconButton shadow-press
> split), `NbFocusCapability`, `NbDisabledCapability`, control-size review,
> shell-default flip, Surface `size` reconsideration.

Guiding rule for every decision below:

```txt
Same concept = same name, same type, same meaning.
Different concept = different name.
Repeated implementation = shared token/capability candidate.
Primitive-specific behavior = stays in the primitive.
Recipe-specific layout = stays as Tailwind.
```

---

## 1. Executive summary

The shared token vocabulary (`NbRadius`, `NbShadow`, `NbBorderStrength`,
`NbSpacing`, `NbPadding`, `NbDivider`, `nbToneVars`) and six internal
capabilities (`tone`, `radius`, `shadow`, `border`, `padding`, `gap`) are in
place and adopted by the **container/layout** primitives (Surface, MediaFrame,
Chip, Callout, Section, Stack, Cluster, Split). For those primitives a token now
means the same thing everywhere: explicit inputs map to actual CSS properties,
and component CSS reads predictable `--nb-<ns>-<prop>` public hooks when inputs
are unset. That part of the language is healthy.

The remaining drift is concentrated in five places:

1. **`size` scale split** — `sm | md | lg | xl` (Button, Callout) vs
   `sm | default | lg | xl` (IconButton, Display). `md` and `default` are the
   same rung under two names. **High priority.**
2. **Three color systems for one concept** — the shared `tone` capability;
   ~~Button's `variant` (preset) + `tone` (override) hybrid~~ (resolved — Button
   now uses the tone capability); and hardcoded color
   maps in IconButton, MediaItem, and Badge have been removed. StatusDot keeps
   semantic state colors. **Mostly resolved; future state-tone review only.**
3. **`divider` means two different things** — placement (`top/bottom/…`) on
   Section, but line *style* (`solid/dashed/thick`) on Stack/Cluster/Split.
   **High priority (naming collision).**
4. **Duplicated token type definitions** — `NbMediaItemTone` and
   `NbIconButtonRadius` re-declare unions that already exist as `NbTone` /
   `NbRadius`, and IconButton's radius *values* don't even match the shared
   scale. **Medium.**
5. **Typography leaking onto non-text primitives** — Button exposes
   `fontSize`, `weight`, `transform`, `tracking`; these belong to `nbText`.
   **High (recipe-facing).**

None of these require breaking the capability architecture — they are
follow-through. This document fixes the *language*; the next refactor PR
implements it.

---

## 2. Current API inventory

Captured from code. "Public CSS hooks read" = variables the primitive's CSS
consults for customization; "Class-based only" = no custom-property contract.

| Primitive | Selector | Current inputs | Current defaults | Public CSS hooks read | Capability adoption | Notes |
|---|---|---|---|---|---|---|
| Surface | `[nbSurface]` | tone, radius, shadow, border, padding, size, layout, edge, clip | tone `surface`, radius `md`, shadow `default`, border `default`, padding `none`, size `auto`, layout `block`, edge `none`, clip `false` | `--nb-surface-{bg,fg,border-color,radius,border-width,shadow,padding}` | tone+radius+shadow+border+padding | `size` = square dimensions; `edge` = top/bottom hairline |
| MediaFrame | `[nbMediaFrame]` | tone, radius, shadow, border, ratio, fit | tone `surface`, radius `lg`, shadow `none`, border `default`, ratio `auto`, fit `cover` | `--nb-media-frame-{bg,fg,border-color,radius,border-width,shadow}` | tone+radius+shadow+border | Clean. `ratio`/`fit` are correct anatomy |
| Button | `button[nbButton], a[nbButton]` | tone, shadow, size, radius, border, fullWidth | tone `primary`, shadow `default`, size `md`, radius `md`, border `default`, fullWidth `false` | `--nb-button-{bg,fg,border-color,radius,border-width}` (+ local `-shadow`) | tone+radius+border ✓ | `tone` is the single color axis (variant removed); `shadow` still encodes hover-translate (future `NbPressCapability`) |
| IconButton | `button[nbIconButton]` | shape, size, tone, radius, shadow, border, icon | shape `square`, size `md`, tone `surface`, radius `none`, shadow `default`, border `default` | `--nb-icon-button-{bg,fg,border-color,border-width,radius,shadow}` | tone+radius+shadow+border ✓ | Local radius/variant maps removed; `tone` replaces `variant`; border via capability |
| Chip | `span[nbChip]` | tone, radius, shadow, border, padding, icon, iconSize | tone `surface`, radius `none`, shadow `sm`, border `default`, padding `md`, iconSize `sm` | `--nb-chip-{bg,fg,border-color,border-width,radius,shadow}` | tone+radius+shadow+border ✓ | `padding` is **local** asymmetric pill anatomy (intentional) |
| Callout | `[nbCallout]` | tone, shadow, size, layout, radius | tone `yellow`, shadow `hard`, size `lg`, layout `inline`, radius `undefined` | `--nb-callout-{bg,fg,border-color,shadow}` (+ size-derived `-radius,-border-width`) | tone+shadow | radius/border-width are size-derived anatomy; optional `radius` override uses shared `nbRadiusValue` |
| Section | `[nbSection]` | padding, divider, dividerStyle, layout, align, flush | padding `md`, divider `none`, dividerStyle `solid`, layout `default`, align `stretch`, flush `false` | `--nb-section-padding` | padding | `divider` = **placement** (`NbDivider`). Already renamed from `border` ✓ |
| Stack | `[nbStack]` | gap, align, justify, divider | gap `md`, align `stretch`, justify `start`, divider `none` | `--nb-stack-gap` | gap | `divider` = **line style** (`solid/dashed/thick`) — collides with Section's meaning |
| Cluster | `[nbCluster]` | gap, padding, align, justify, wrap, divider | gap `md`, padding `none`, align `center`, justify `start`, wrap `wrap`, divider `none` | `--nb-cluster-{gap,padding}` | gap+padding | same `divider`=style collision |
| Split | `[nbSplit]` | ratio, gap, padding, collapse, align, divider | ratio `1:1`, gap `lg`, padding `none`, collapse `md`, align `stretch`, divider `none` | `--nb-split-{gap,padding}` | gap+padding | same `divider`=style collision; `ratio`/`collapse` correct anatomy |
| Text | `[nbText]` | size, weight, tone, transform, tracking, measure, leading, underline, reset | size `md`, weight `normal`, tone `default`, transform `none`, tracking `normal`, measure `none`, leading `normal`, underline `none`, reset `true` | inline `[style.*]` (color, font-size, …) | none (typography owner) | Typography authority. `tone` is a text-specific palette (muted/subtle/inverse) |
| Display | `[nbDisplay]` | size, tracking, leading, underline, reset | size `default`, tracking `tight`, leading `none`, underline `none`, reset `true` | `--nb-display-{size,color}` consumed | none | `size` uses `default` (not `md`); headline typography |
| MediaItem | `nb-media-item, [nbMediaItem]` | variant, orientation, align, size, tone, icon, iconAlt, iconBackground, title, description | variant `plain`, orientation `horizontal`, align `start`, size `md`, tone `surface` | `--nb-media-item-{bg,fg,border-color}` (+ local anatomy vars) | tone ✓ | Hardcoded hex tone map removed; `NbMediaItemTone` now aliases `NbTone`; tone via capability |
| Stat | `nb-stat` | value, label, direction | direction `column` | `--nb-stat-{value-size,label-size,label-fg}` (local) | none | Composition block; no shared tokens |
| StatusDot | `span[nbStatusDot]` | state | state `online` | `--nb-status-dot-size` consumed | none | Uses semantic theme colors directly, not `tone` |
| Sticker / StickerFace | `nb-sticker*` | (decorative) | — | `--nb-sticker-*` (local) | none | Decorative art; out of token scope |
| Halftone | `nb-halftone` | position, color, size, gap, rows, cols | position `bottom-right`, color `var(--nb-border)`, size `6`, gap `5`, rows `7`, cols `7` | None (SVG attrs) | none | Decorative art; `gap`/`size` here are **numeric SVG geometry**, not tokens |

**Interactive/form components (high-level only):** `nbInput`, `nbTextarea`,
`nbCheckbox` expose local control sizes; `nbSelect` and `nbInputGroup` keep
their field shell/focus behavior local for a future control-capability pass.
`nbDialog` and `nbAccordionItem` now use visual shell capabilities, while their
modal/disclosure behavior and subpart layout stay local.

---

## 3. Primitive responsibility matrix

Meanings: **Yes** = should own · **Maybe** = own only if repeated real use ·
**No** = should not own · **Default only** = may set default text appearance,
custom typography belongs to `nbText`.

| Primitive | Tone | Radius | Shadow | Border | Divider | Padding | Gap | Size | Typography | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| nbSurface | Yes | Yes | Yes | Yes | No | Maybe | No | Questionable | No | Visual shell |
| nbSection | No | No | No | No | **Yes** | Yes | No | No | No | Layout region + divider placement |
| nbStack | No | No | No | No | Maybe* | No | Yes | No | No | Vertical layout (*separator = style, rename) |
| nbCluster | No | No | No | No | Maybe* | Maybe | Yes | No | No | Inline/wrap layout |
| nbSplit | No | No | No | No | Maybe* | Maybe | Yes | No | No | Two-column responsive split |
| nbMediaFrame | Yes | Yes | Yes | Yes | No | No | No | No | No | Media wrapper |
| nbButton | Yes | Yes | Yes | Yes | No | No | No | Yes | Default only | Interaction surface |
| nbIconButton | Yes | Yes | Yes | Yes | No | No | No | Yes | No | Square action |
| nbChip | Yes | Yes | Maybe | Yes | No | Yes† | No | Yes | Default only | Compact label (†pill anatomy padding) |
| nbCallout | Yes | Yes | Yes | Yes | No | Yes† | Maybe | Yes | Default only | Announcement (†size-derived anatomy) |
| nbText | Tone only | No | No | No | No | No | No | Yes | Yes | Typography owner |
| nbDisplay | Tone only | No | No | No | No | No | No | Yes | Yes | Display typography |
| nbMediaItem | Yes‡ | No | No | No | No | No | No | Yes | Default only | Composition block (‡via tone capability, not hex) |
| nbStat | No | No | No | No | No | No | No | No | Default only | Composition block |
| nbStatusDot | Maybe | No | No | No | No | No | No | Maybe | No | Status indicator (semantic color) |
| nbSticker | No | No | No | No | No | No | No | No | No | Decorative |
| nbHalftone | No | No | No | No | No | No | No | No | No | Decorative |

`* divider` on layout primitives is a **child-separator line style**, a
different concept from Section's placement `divider` — see §4.4 / §5.

### Per-primitive responsibility statements

**nbSurface** — brutalist visual shell for grouping content.
Owns: tone, border strength, radius, shadow, optional convenience padding,
clipping. Does not own: page layout, responsive visibility, arbitrary
width/height as a primary job, custom typography, decorative positioning.
*Open question:* `size` (square dimensions) is the only "Questionable" cell —
see §4.7 / §10.

**nbSection** — layout region: internal container padding + optional divider
placement. Owns: padding, divider placement + style, internal layout
(default/center/between), align. Does not own: tone, radius, shadow, border
strength.

**nbStack** — vertical flex layout. Owns: gap, align, justify, optional
between-child separator. Does not own: visual-shell tokens.

**nbCluster** — inline/wrapping flex layout. Owns: gap, optional padding, align,
justify, wrap, optional separator. Does not own: visual-shell tokens.

**nbSplit** — two-column responsive split. Owns: ratio, collapse breakpoint,
gap, optional padding, align, optional column divider. Does not own:
visual-shell tokens.

**nbMediaFrame** — image/video/object frame. Owns: tone, radius, shadow, border,
aspect ratio, object fit. Does not own: layout, typography.

**nbButton** — interactive action surface. Owns: tone, radius, shadow, border,
size (interactive density), interaction/focus/disabled state, **default**
typography. Does not own: custom expressive typography (→ `nbText`).

**nbIconButton** — square interactive action. Owns: tone, radius, shadow,
border, size (square dimensions), shape (square/circle). Does not own:
typography.

**nbChip** — compact label/status/action token. Owns: tone, radius, shadow,
border, pill padding (anatomy), size (density), **default** typography. Does not
own: custom typography, layout.

**nbCallout** — attention/announcement block. Owns: tone, radius, shadow,
border, size (block scale → anatomy), layout (inline/between/center), **default**
typography. Does not own: custom typography.

**nbText / nbDisplay** — typography owners. Own: size, weight, tracking,
transform, leading, measure, underline treatment, text tone. Do not own: shells,
shadows, borders, layout.

**nbMediaItem / nbStat** — composition blocks built *from* primitives. Own their
anatomy + default typography; should consume the **tone capability** rather than
re-declaring color maps.

**nbStatusDot / nbSticker / nbHalftone** — indicators and decorative art. Out of
the shared-token scope (StatusDot may optionally narrow `tone` later).

---

## 4. Input family audit

For each family: current usage · inconsistencies · recommended shared type ·
ownership · capability status · public API decision.

### 4.1 `tone`

**Current usage.** Shared `NbTone` (17-value palette, including neutral
`surface`/`background`/`ink`) flows through `NbToneCapability` into Surface,
MediaFrame, Button, IconButton, Chip, Callout, MediaItem, Badge, Card, Avatar,
ImageCard, Dialog, and AccordionItem — these resolve `bg`/`fg`/`border-color`
from the single `nbToneVars()` resolver.
**State and typography systems remain intentionally separate:**

- **Button**: ~~`variant` (preset enum) **plus** `tone` override, writing
  button color hooks directly via `nbToneTokens()`~~ **resolved (2026-06-01)** —
  `variant` removed; Button now composes `NbToneCapability` with `tone` as the
  single color axis (default `primary` in CSS).
- **IconButton**: ~~`variant` only, hardcoded class map; no `tone`, no capability~~
  **resolved** — now composes tone/radius/shadow/border capabilities.
- **MediaItem**: ~~hardcoded hex tone map~~ **resolved** — `tone` now flows
  through `NbToneCapability`; layout anatomy remains local.
- **Badge**: ~~`variant` color API~~ **resolved** — `variant` removed; use
  shared `tone`.
- **StatusDot**: semantic theme colors keyed off `state`, not `tone`.

**Inconsistencies.** General host color is now unified under `tone`. Text tone,
display color, icon tone, and state colors remain separate because they are not
the same host-level paint concept.

**Recommended shared type** (rationalize `NbTone` into documented
sub-families):

```ts
export type NbSemanticTone = 'primary' | 'secondary' | 'accent'
  | 'success' | 'warning' | 'danger';
export type NbPlayfulTone  = 'yellow' | 'pink' | 'mint' | 'lavender' | 'blue';
export type NbNeutralTone  = 'surface' | 'background' | 'ink'
  | 'cream' | 'white' | 'black';
export type NbTone = NbSemanticTone | NbPlayfulTone | NbNeutralTone;
```

**Ownership.** Every primitive that paints a bg/fg/border. **Capability:**
already `NbToneCapability` — extend adoption.

**Public API decision.**
- Use shared `NbTone` globally; primitives may *narrow* (Callout,
  Chip) but never re-declare the full union (kill `NbMediaItemTone`).
- MediaItem and IconButton adopt `NbToneCapability`; delete their hardcoded maps.
- **Button:** ✅ Shipped (2026-06-01) — `variant` removed and folded into `tone`;
  Button composes `NbToneCapability` with `tone` as the single color axis
  (default `primary`).

### 4.2 `radius`

**Current usage.** Shared `NbRadius` (`none|sm|md|lg|xl|full`, `md` =
`var(--nb-radius)`) via `NbRadiusCapability` on Surface, MediaFrame, Button,
Chip. Callout derives radius from `size` with an optional shared override.

**Inconsistencies.**
- **IconButton** re-declares `NbIconButtonRadius` with the *same names* but
  **different values** — `md` = `0.5rem` literal, vs the shared `md` =
  `var(--nb-radius)`. Two `md`s that don't match: the exact drift this audit
  exists to prevent.
- No primitive uses `base` (good — that earlier inconsistency is already gone).

**Recommended shared type.** Keep `NbRadius = none|sm|md|lg|xl|full`. Do not
introduce `base`.

**Ownership.** Shell + control primitives. **Capability:** `NbRadiusCapability`.

**Public API decision.** IconButton adopts `NbRadiusCapability`; delete
`NbIconButtonRadius` and its local value map. `md` resolves to `var(--nb-radius)`
everywhere.

### 4.3 `shadow`

**Current usage.** Shared `NbShadow` (`none|sm|default|hard|heavy`) via
`NbShadowCapability` on Surface, MediaFrame, Chip, Callout (Callout narrows to
`none|default|hard`).

**Inconsistencies.**
- **Button** `shadow` = `default|none|reverse`. `default` *and* `reverse` encode
  **hover-translate interaction**, not a static box-shadow. This conflates two
  concepts: static `shadow` and interactive `press`.
- **IconButton** has no `shadow` input; hover-translate is hardcoded.

**Recommended split.**

```txt
shadow = static box-shadow (the NbShadow scale).
press  = interactive offset/translate behavior (FUTURE — do not build yet).
```

**Ownership.** All shell/control primitives. **Capability:**
`NbShadowCapability` for static shadow.

**Public API decision.** Mark Button's `reverse` and the hover-translate baked
into `default` as **questionable / press-behavior** (§9, §10). Do **not** design
`press` in this pass. Keep Button/IconButton interaction as-is for now; record
`press` as a future capability candidate so the next refactor can extract it.

### 4.4 `border`

**Current usage.** Shared `NbBorderStrength` (`none|thin|default|strong|thick`,
width only — color comes from tone) via `NbBorderCapability` on Surface,
MediaFrame. Callout derives border-width from `size`.

**Inconsistencies.**
- **Chip, Button, IconButton** hardcode `border-2` and do **not** compose the
  border capability — so border strength is not adjustable and not consistent
  with Surface/MediaFrame.
- **The `border` vs `divider` conflict is already resolved** in code: Section's
  former `border="bottom"` is now `divider="bottom"` (placement), and `border`
  means strength library-wide. ✓

**Recommended types.**

```txt
border      = NbBorderStrength (outline width).
divider     = NbDivider (separator placement) — Section.
borderStyle = solid|dashed|dotted line style, only where a divider exists.
```

**Ownership.** Shell + control primitives (strength); Section (divider
placement). **Capability:** `NbBorderCapability`.

**Public API decision.** Chip/Button/IconButton adopt `NbBorderCapability` so
`border` strength is uniform and overridable. Border *color* stays owned by the
tone capability (never duplicated).

### 4.5 `padding`

**Current usage.** Shared `NbPadding` (`none|xs|sm|md|lg|xl`, uniform) via
`NbPaddingCapability` on Section, Cluster, Split.

**Inconsistencies.**
- **Surface** has its own `NbSurfacePadding` (`none|sm|md|lg`) implemented as
  Tailwind `px/py` classes — a different (narrower, asymmetric) scale.
- **Chip** has `NbChipPadding` (`none|sm|md|lg|xl`) asymmetric pill padding —
  intentionally primitive-local (documented in code).
- **Callout** padding is size-derived anatomy.

**Recommended shared type.** `NbPadding = none|xs|sm|md|lg|xl`.

**Ownership.** Only primitives that own a **uniform container region**: Section
(strong owner), Cluster, Split. **Capability:** `NbPaddingCapability`.

**Public API decision.**
- Section keeps strong ownership.
- **Surface:** either adopt the shared `NbPadding` scale (preferred — fixes the
  `none|sm|md|lg` vs `none|xs|sm|md|lg|xl` mismatch) or document that Surface
  padding is convenience-only and asymmetric. Decision: **align to `NbPadding`**,
  default `none`.
- Chip & Callout padding stays **primitive-local anatomy** (asymmetric pill /
  size-derived) — correct, do not force the capability.
- Button/IconButton/Chip never expose raw container padding; **`size` owns
  density**.

### 4.6 `gap`

**Current usage.** Shared `NbSpacing` (`none|xs|sm|md|lg|xl|2xl`) via
`NbGapCapability` on Stack, Cluster, Split — fully consistent, single scale,
no duplicated maps. ✓

**Inconsistencies.** None among layout primitives. (MediaItem's
`--nb-media-item-gap` is size-derived anatomy, not the layout gap; Halftone's
`gap` is numeric SVG geometry, **not** this token — see naming note §5.)

**Recommended shared type.** `NbGap = NbSpacing = none|xs|sm|md|lg|xl|2xl`.

**Ownership.** Layout primitives only. **Capability:** `NbGapCapability`.

**Public API decision.** Keep as-is. Good owners: nbStack, nbCluster, nbSplit,
future nbGrid, future nbActions. Do **not** rename Halftone's numeric `gap`
input — but document that it is geometry, not the spacing token (an acceptable
contextual exception, like Split's `ratio`).

### 4.7 `size`

**Current usage / meanings.**

| Primitive | `size` values | Meaning |
|---|---|---|
| nbButton | `sm \| md \| lg \| xl` | interactive density |
| nbCallout | `sm \| md \| lg \| xl` | announcement block scale |
| nbChip | (`padding` is the density knob) | — |
| nbIconButton | `sm \| default \| lg \| xl` | square dimensions |
| nbMediaItem | `sm \| md \| lg` | block scale |
| nbSurface | `auto \| sm \| md \| lg \| xl` | **square dimensions** |
| nbText | `xs \| sm \| md \| lg \| xl \| 2xl \| 3xl` | typography scale |
| nbDisplay | `sm \| default \| lg \| xl` | headline scale |
| nbInput/Textarea/Checkbox | `default`-based | control density |

**Inconsistencies.**
1. **`md` vs `default`** for the same middle rung — IconButton, Display, and the
   form controls use `default`; Button, Callout, MediaItem use `md`. Pick one.
2. **Surface `size`** means literal square dimensions (`size-10` etc.), which is
   shell-as-avatar behavior — questionable for a "visual shell."

**Recommended direction.** `size` is **not** a single shared token — it is
component anatomy with a documented meaning per primitive. But the **rung names
must be consistent**: standardize the middle rung as **`md`** (matches the radius
/ shadow / spacing scales). Treat `default` as the deprecated alias.

**Public API decision.**
- Rename IconButton/Display/form-control middle rung `default` → `md`. **High**
  for IconButton/Display (visual-grammar), **Medium** for form controls.
- Keep `size` where it controls anatomy (Button, IconButton, Chip-density,
  Callout, Text, Display).
- **Surface `size`:** reconsider — a shell that needs fixed square dimensions is
  usually better expressed with Tailwind `size-*`. Decision: keep for now,
  document as "avatar/icon-shell convenience," flag for removal review (§10).
  Do not expand it.

### 4.8 Typography inputs

**Current usage.**
- **nbText** owns `size, weight, tone, transform, tracking, measure, leading,
  underline` — the correct authority.
- **nbDisplay** owns `size, tracking, leading, underline`.
- **Button** *also* exposes `fontSize, weight, transform, tracking` — custom
  typography on an action surface.
- **Chip** bakes `text-xs font-bold` (default only — OK). **Callout** bakes
  `font-black uppercase` (default only — OK). **Stat/MediaItem** set default
  type sizes via local vars (default only — OK).

**Inconsistencies.** Button is the leak: it duplicates four `nbText` concepts
with a narrower, divergent vocabulary (`weight` = bold/extrabold/black vs
nbText's normal…black; `tracking` = normal/wide/wider vs nbText's
tight/normal/wide/wider).

**Recommended direction.** `nbText` / `nbDisplay` own custom typography.
Components provide **default** typography only.

**Public API decision.** Deprecate Button's `fontSize`, `weight`, `transform`,
`tracking`; steer recipes to a nested `nbText` (matches the documented pattern in
`composition-philosophy.md`). Button keeps a sensible **default** weight per
size. **High priority** because it directly shapes recipe authoring.

```html
<button nbButton tone="lavender" size="xl" radius="md">
  <span nbText size="3xl" weight="black" transform="uppercase" tracking="wide">
    Listen Now
  </span>
</button>
```

### 4.9 `align` / `justify` (layout sub-audit)

**Current usage.** Stack/Cluster/Split/Section each expose alignment, with
slightly divergent value sets:

| Primitive | align | justify |
|---|---|---|
| nbStack | stretch\|start\|center\|end | start\|center\|end\|between |
| nbCluster | start\|center\|end\|baseline\|stretch | start\|center\|end\|between |
| nbSplit | start\|center\|end\|stretch | — (align only) |
| nbSection | stretch\|start\|center\|end | folded into `layout` (default/center/between) |

**Decision.** Define shared `NbAlign` and `NbJustify` types so the **shared**
values mean the same thing; allow primitives to **add** axis-specific values
(`baseline` for Cluster only). Section should expose `justify` rather than
folding it into `layout` — **Low priority** (cosmetic, defer).

---

## 5. Naming consistency decisions

### Naming rules (baseline)

- `tone` — visual color intent (bg + fg + border-color).
- `radius` — corner shape.
- `shadow` — static box-shadow.
- `border` — outline strength (width).
- `divider` — separator **placement** (which side(s) carry a line).
- `dividerStyle` — separator line style (solid/dashed/dotted) where a divider exists.
- `padding` — internal container spacing (uniform).
- `gap` — spacing between children (layout primitives).
- `size` — component anatomy scale; documented per primitive; middle rung is `md`.
- `fit` — media object fitting only.
- `ratio` — aspect ratio (MediaFrame) / column ratio (Split) — contextual, documented.
- `align` / `justify` — layout primitives only.
- `weight`, `tracking`, `transform`, `leading`, `measure` — text primitives only.

### Violations

| Current API | Issue | Recommendation | Breaking? |
|---|---|---|---|
| `nbStack/Cluster/Split divider="solid\|dashed\|thick"` | `divider` means **line style** here but **placement** on Section — collision | Rename to `separator` (between-children) **or** repurpose as `divider` placement + `dividerStyle`; pick one library-wide vocabulary | Yes |
| `nbIconButton size="default"`, `nbDisplay size="default"` | Middle rung named `default`, but `md` elsewhere | Rename `default` → `md` | Yes |
| `nbInput/Textarea/Checkbox size="default"` | Same `default` vs `md` split | Rename `default` → `md` | Yes (forms) |
| `nbButton fontSize/weight/transform/tracking` | Custom typography on a non-text primitive | Deprecate; use nested `nbText` | Yes (deprecate→remove) |
| `NbMediaItemTone` (re-declared union) | Duplicate of `NbTone` | Alias to `NbTone`; adopt tone capability | No (type identical) |
| `NbIconButtonRadius` (re-declared, mismatched values) | Duplicate of `NbRadius` with different `md` value | Delete; adopt `NbRadiusCapability` | Yes (value change) |
| `nbButton variant` + `tone` | Two color axes for one concept | Folded `variant` into `tone` | ✅ Shipped |
| MediaItem hardcoded hex tone map | Duplicates `--nb-*` theme tokens; will drift | Replace with `nbToneVars()` | ✅ Shipped |
| `nbHalftone gap/size` (numeric) | Same names as spacing tokens but numeric geometry | Keep; document as geometry exception | No |

---

## 6. Default value audit

### Current defaults (from code)

| Primitive | tone | radius | shadow | border | padding | gap | size |
|---|---|---|---|---|---|---|---|
| nbSurface | surface | md | default | default | none | – | auto |
| nbMediaFrame | surface | lg | none | default | – | – | – |
| nbButton | primary | md | default* | default | – | – | md |
| nbIconButton | surface | none | default | default | – | – | md |
| nbChip | surface | none | sm | default | md | – | – |
| nbCallout | yellow | (size-derived) | hard | (size-derived) | (size) | – | lg |
| nbSection | – | – | – | – | md | – | – |
| nbStack | – | – | – | – | – | md | – |
| nbCluster | – | – | – | – | none | md | – |
| nbSplit | – | – | – | – | none | lg | – |
| nbText | default | – | – | – | – | – | md |
| nbDisplay | – | – | – | – | – | – | default |

\* Button `shadow="default"` includes hover-translate (interaction), not just a
static shadow.

### Proposed default families

These map into `NB_STYLE_DEFAULTS` per primitive.

```txt
Shell defaults (Surface, MediaFrame):
  radius: xl        # see note
  shadow: hard      # see note
  border: strong    # see note

Control defaults (Button, IconButton, Chip):
  radius: md
  shadow: default
  border: default
  size:   md

Layout defaults (Stack, Cluster, Split, Section):
  gap:     md   (Split lg)
  padding: md (Section) / none (Cluster, Split)

Typography defaults (Text, Display):
  size:   md
  weight: normal (Text) / black (Display anatomy)
```

> **Note — shell defaults are aspirational, not current.** Today Surface defaults
> to `radius: md, shadow: default, border: default` and MediaFrame to
> `radius: lg, shadow: none`. The brutalist house style ("chunky borders, offset
> shadows") argues for the louder shell family (`radius: xl, shadow: hard,
> border: strong`) as documented in `composition-philosophy.md`. **Decision:**
> treat the shell family as the target, but changing live defaults is a
> **breaking visual change** (§10, Medium) — confirm against the reference
> designs before flipping. Do not change defaults in the audit.

---

## 7. CSS variable naming audit

Pattern: `--nb-{namespace}-{property}`. Capability-driven primitives already
read public hooks with that shape cleanly.

| Primitive | Current variables | Missing / not-yet-capability | Naming issues | Recommendation |
|---|---|---|---|---|
| nbSurface | `--nb-surface-{bg,fg,border-color,border-width,radius,shadow}` + `--nb-surface-edge-{width,color}` | padding not a var (Tailwind classes) | none | Optionally emit `--nb-surface-padding` if Surface adopts `NbPadding` |
| nbMediaFrame | `--nb-media-frame-{bg,fg,border-color,border-width,radius,shadow}` | — | none | ✓ reference-clean |
| nbButton | `--nb-button-{bg,fg,radius,border-width}` + local `--nb-button-{border-color,shadow}` | tone/shadow via class, not capability | none ✓ | Border capability adopted; `-border-color`/`-border-width` split shipped |
| nbIconButton | `--nb-icon-button-{bg,fg,border-color,border-width,radius,shadow}` | — | none ✓ | Capabilities adopted; `-border-color`/`-border-width` split shipped |
| nbChip | `--nb-chip-{bg,fg,border-color,border-width,radius,shadow}` | — | none ✓ | Border capability adopted → `--nb-chip-border-width` |
| nbCallout | `--nb-callout-{bg,fg,border-color,shadow,radius,border-width}` | radius/border-width size-derived (intentional) | none | OK; document size-derived anatomy |
| nbSection | `--nb-section-padding` | — | none | ✓ |
| nbStack | `--nb-stack-gap` | — | none | ✓ |
| nbCluster | `--nb-cluster-{gap,padding}` + `--nb-cluster-divider-*` | — | none | ✓ |
| nbSplit | `--nb-split-{gap,padding,columns}` | — | none | ✓ |
| nbMediaItem | `--nb-media-item-{bg,fg,border-color}` (via tone capability) + local anatomy (radius, gap, icon-size, …) | — | none ✓ | Tone capability adopted; hex literals replaced by `nbToneVars()` |
| nbStat | `--nb-stat-{value-size,label-size,label-fg}` | — | none | OK (composition block) |
| nbStatusDot | `--nb-status-dot-size` | — | none | OK |

**Rules confirmed:** variables are component-specific hooks (not capability
outputs), names match public inputs, and users can override them from CSS. The
two historical issues are now **resolved**: (a) `--nb-*-border`
color-vs-strength ambiguity on Button/IconButton — split into `-border-color`
(tone) + `-border-width` (border capability); and (b) MediaItem's hex literals —
replaced by `nbToneVars()` via the tone capability.

---

## 8. Shared token contracts

Centralized in `libs/ui/src/lib/tokens/*` (already exist except where noted).

### NbTone
**Purpose:** shared visual color grammar (bg + fg + border-color).
**Values:** semantic (primary, secondary, accent, success, warning, danger) ·
playful (yellow, pink, mint, lavender, blue) · neutral (surface, background,
ink, cream, white, black). **Used by:** Surface, MediaFrame, Chip, Callout,
IconButton, MediaItem, Button. **Capability:** `NbToneCapability` (exists;
adoption widened).

### NbRadius
**Purpose:** shared corner scale. **Values:** none, sm, md, lg, xl, full
(`md` = `var(--nb-radius)`). **Used by:** Surface, MediaFrame, Button, Chip,
IconButton, Callout-override. **Capability:** `NbRadiusCapability` (exists).

### NbShadow
**Purpose:** static offset box-shadow scale. **Values:** none, sm, default, hard,
heavy. **Used by:** Surface, MediaFrame, Chip, Callout, (target) Button.
**Capability:** `NbShadowCapability` (exists). *Companion future token: `press`.*

### NbBorderStrength
**Purpose:** outline width (color from tone). **Values:** none, thin, default,
strong, thick. **Used by:** Surface, MediaFrame, Chip, Button, IconButton.
**Capability:** `NbBorderCapability` (exists).

### NbPadding
**Purpose:** uniform container padding. **Values:** none, xs, sm, md, lg, xl.
**Used by:** Section, Cluster, Split, (target) Surface. **Capability:**
`NbPaddingCapability` (exists).

### NbSpacing (gap)
**Purpose:** layout gap between children. **Values:** none, xs, sm, md, lg, xl,
2xl. **Used by:** Stack, Cluster, Split. **Capability:** `NbGapCapability`
(exists). *Recommend a `NbGap = NbSpacing` alias for input-facing clarity.*

### NbDivider
**Purpose:** separator placement between regions. **Values:** none, top, right,
bottom, left, block, inline, all. **Used by:** Section. **Capability:** No —
placement is layout-specific (not a uniform value write).

### Typography contracts (text primitives only)
- **NbTextSize:** xs, sm, md, lg, xl, 2xl, 3xl.
- **NbTextWeight:** normal, medium, semibold, bold, extrabold, black.
- **NbTextTracking:** tight, normal, wide, wider.
- **NbTextTransform:** none, uppercase, lowercase, capitalize.
Used by: nbText (and a narrowed subset by nbDisplay). **Capability candidate:**
No — typography is the text primitives' job, not a cross-cutting capability.

---

## 9. Internal capability directive candidates

Capabilities are **internal only** — never exported as public user-facing
directives. Primitives expose the public inputs; capabilities remove internal
duplication.

| Capability | Status | Public input | Writes CSS vars | Used by | Notes |
|---|---|---|---|---|---|
| NbToneCapability | **Exists** | tone | `--nb-{ns}-{bg,fg,border-color}` | Surface, MediaFrame, Chip, Callout, IconButton, MediaItem | Adopted; MediaItem hex map killed |
| NbRadiusCapability | **Exists** | radius | `--nb-{ns}-radius` | Surface, MediaFrame, Button, Chip, IconButton | Adopted; `NbIconButtonRadius` removed |
| NbShadowCapability | **Exists** | shadow | `--nb-{ns}-shadow` | Surface, MediaFrame, Chip, Callout, IconButton | Button keeps local shadow (hover-translate) |
| NbBorderCapability | **Exists** | border | `--nb-{ns}-border-width` | Surface, MediaFrame, Chip, Button, IconButton | Adopted; color stays with tone |
| NbPaddingCapability | **Exists** | padding | `--nb-{ns}-padding` | Section, Cluster, Split → +Surface (opt) | Container-owners only |
| NbGapCapability | **Exists** | gap | `--nb-{ns}-gap` | Stack, Cluster, Split | ✓ complete |
| **NbPressCapability** | **Future** | press | `--nb-{ns}-press-*` / translate behavior | Button, IconButton | Extract Button/IconButton hover-translate; **do not build yet** |

Rules: capabilities stay internal; primitives expose public inputs; resolution is
`explicit input → NB_STYLE_DEFAULTS → capability fallback`.

---

## 10. Breaking changes to consider

| Change | Reason | Impact | Priority |
|---|---|---|---|
| Resolve `divider` collision (Stack/Cluster/Split line-style vs Section placement) | One name, two meanings | Renamed layout `divider`→`separator`; recipes/docs updated | ✅ **Shipped** |
| Rename `size="default"`→`"md"` (IconButton, Display) | Middle-rung name drift | Updated usages + recipes | ✅ **Shipped** |
| Remove Button `fontSize/weight/transform/tracking` | Typography belongs to nbText | Removed inputs + types; recipes use nested `nbText` | ✅ **Shipped** |
| MediaItem: replace hex tone map with `nbToneVars()` + adopt tone capability | Hardcoded hex drifts from theme tokens | Tone now resolves from theme vars (yellow/cream shades canonicalized) | ✅ **Shipped** |
| Delete `NbIconButtonRadius`/`NbIconButtonVariant`; adopt capabilities | Duplicate type + mismatched `md` value; `variant` duplicates `tone` | `variant`→`tone`; `md` now `var(--nb-radius)` | ✅ **Shipped** |
| Alias `NbMediaItemTone = NbTone` | Duplicate union | Type-only, no runtime change | ✅ **Shipped** |
| Chip/Button/IconButton adopt `NbBorderCapability` | `border` strength should be uniform/overridable | New `border` input; default strength = 2px parity | ✅ **Shipped** |
| `size="default"`→`"md"` (Input/Textarea/Checkbox) | Same drift, forms | Updated form usages + docs | ✅ **Shipped** |
| Fold Button `variant` into `tone` | Two color axes for one concept | `variant` removed; Button composes `NbToneCapability`, default tone `primary` | ✅ **Shipped** |
| Surface padding: adopt shared `NbPadding` scale | `none\|sm\|md\|lg` ≠ shared `none\|xs\|sm\|md\|lg\|xl` | Add `xs/xl`; values may shift | Medium |
| Flip shell defaults to `radius xl / shadow hard / border strong` | House style; louder brutalism | Visual change across Surface/MediaFrame | Medium (verify vs reference designs) |
| Extract `NbPressCapability` | Separate static shadow from interaction | Button/IconButton internals | Medium (after tone/border) |
| Reconsider Surface `size` (square dims) | Shell vs Tailwind `size-*` | Maybe remove; document meanwhile | Low |
| Section expose `justify` instead of folding into `layout` | align/justify consistency | Minor API addition | Low |

Priority key: **High** = before the capability-adoption refactor · **Medium** =
during it · **Low** = document and revisit.

---

## 11. Migration priorities

1. **Settle naming decisions** — `divider` collision, `size` `default`→`md`,
   Button typography ownership. *(Language must be final before code moves.)*
2. **Centralize remaining token types** — alias `NbMediaItemTone`/
   `NbIconButtonRadius` to shared contracts; add `NbGap`/`NbAlign`/`NbJustify`
   aliases.
3. **Widen capability adoption** — IconButton (tone+radius+shadow+border),
   MediaItem (tone), Chip/Button (border).
4. **Normalize CSS var names** — `--nb-*-border` color→`-border-color` on
   Button/IconButton.
5. **Refactor Surface / Button / MediaFrame first** — they validate the visual
   grammar end to end.
6. **Refactor Stack / Cluster / Split** — already gap-clean; finish the
   separator/divider rename to validate layout grammar.
7. **Refactor Chip / Callout** — validate compact/block anatomy.
8. **Update recipes**, starting with `podcast-card.ts` — proves real composition.
9. **Update docs** — `token-customization.md`, `token-customization-audit.md`,
   `token-customization-migration.md`, `composition-philosophy.md`,
   `primitives-roadmap.md`, and this audit's "target → shipped" status.

Why this order: Surface/Button/MediaFrame validate the visual grammar;
Stack/Cluster/Split validate the layout grammar; Chip/Callout validate
compact/block anatomy; the Podcast Card validates real recipe composition.

---

## 12. Final rules for future primitives

1. Same concept must use the same input name and the shared token type.
2. Different concepts must not share the same input name (see `divider`).
3. `tone` controls visual color intent (bg + fg + border-color).
4. `radius` controls corner shape.
5. `shadow` controls static box-shadow; interaction movement is a separate
   (future) `press` concern.
6. `border` controls outline strength (width); color comes from tone.
7. `divider` controls separator placement; `dividerStyle` controls its line style.
8. `padding` controls uniform internal spacing, only on primitives that own a
   container region.
9. `gap` controls spacing between children and belongs to layout primitives.
10. `size` controls component anatomy scale, is documented per primitive, and its
    middle rung is named `md` (never `default`).
11. Custom typography belongs to `nbText` / `nbDisplay`.
12. Non-typography primitives may set **default** typography but must not expose a
    spread of text-treatment inputs.
13. Component-specific behavior stays inside the primitive (anatomy, not tokens).
14. Repeated token styling becomes an internal capability candidate.
15. Capability directives stay internal unless there is a clear public use case.
16. CSS variables follow `--nb-{namespace}-{property}`; color vars say `-color`.
17. Tailwind remains the escape hatch for layout, responsiveness, positioning,
    and recipe-specific art direction.
18. Do not add an input only because Tailwind has an equivalent utility.
19. Add an input only when it maps to a reusable token, primitive anatomy,
    accessibility behavior, or a repeated brutalist composition pattern.
20. Keep the public API aligned with **"Build loud. Stay sharp."**

---

```txt
The API consistency audit defines the language.
The capability refactor implements the language.
Recipes prove the language works.
```
