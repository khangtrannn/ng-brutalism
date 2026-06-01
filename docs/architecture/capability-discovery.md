# Capability Discovery Lane

A running ledger for the **internal style-capability** system: which repeated
concerns have been promoted to a shared capability, which are recorded as future
candidates, and which deliberately stay primitive-local.

This is the "discovery lane" that runs alongside each capability-adoption
refactor. The rule of thumb:

> Tokens define the vocabulary. Capabilities apply the vocabulary internally.
> Primitives expose the public API. Component CSS variables are the customization
> contract. Recipes prove the vocabulary works.

A repeated concern only becomes a capability when **all** of these hold:

- It appears in **≥3 primitives**, or 2 very important ones.
- It means the **same thing** across those primitives.
- It can write predictable `--nb-{ns}-*` variables or host classes.
- It does not hide important component anatomy.
- It does not make the public API more confusing.
- It is directly needed by the refactor in flight.

When in doubt, **record the candidate; do not build it.** Visual grammar (color,
radius, shadow, border) is capability-shaped. Interaction grammar (press, focus,
disabled) is not — yet.

## Shipped capabilities

| Capability | Public input | Writes | Adopted by |
|---|---|---|---|
| NbToneCapability | `tone` | `--nb-{ns}-{bg,fg,border-color}` | Surface, MediaFrame, Chip, Callout, IconButton, MediaItem |
| NbRadiusCapability | `radius` | `--nb-{ns}-radius` | Surface, MediaFrame, Button, Chip, IconButton |
| NbShadowCapability | `shadow` | `--nb-{ns}-shadow` | Surface, MediaFrame, Chip, Callout, IconButton |
| NbBorderCapability | `border` | `--nb-{ns}-border-width` | Surface, MediaFrame, Chip, Button, IconButton |
| NbPaddingCapability | `padding` | `--nb-{ns}-padding` | Section, Cluster, Split |
| NbGapCapability | `gap` | `--nb-{ns}-gap` | Stack, Cluster, Split |

> Tone owns color (`bg` / `fg` / `border-color`); the border capability owns
> `border-width` only — so color and width never fight.

## Capability discovery candidates

| Candidate | Repeated in | Why it might exist | Decision |
|---|---|---|---|
| NbPressCapability | Button, IconButton | Shared hover/active translate + shadow-shift (brutalist press offset) | **Record only** — interaction semantics need design; do after visual adoption; review with focus/disabled |
| NbFocusCapability | Button, IconButton, Input, Select, Checkbox | Shared `focus-visible` ring treatment | **Record** for the accessibility chapter |
| NbDisabledCapability | Button, IconButton, form controls | Shared disabled/`aria-disabled` styling + semantics | **Record** — needs a11y review |
| NbControlSizeCapability | Button, IconButton, Input, Select, Checkbox | Shared control density naming (`sm/md/lg`) | **Maybe later** — not now; each control's size is its own anatomy today |
| NbAlign / NbJustifyCapability | Stack, Cluster, Split, Section | Shared layout alignment mapping | **Centralize the types first**, then reconsider a capability |
| NbSizeCapability (generic) | Many primitives | One `size` to rule them all | **Do not implement** — `size` means different anatomy per primitive (square dims vs control density vs type scale) |

### Important standing decision

**Do not create a generic `NbSizeCapability`.** `size` is not one concept: on
IconButton it is square dimensions, on Button/Chip it is control density, on Text
it is a type scale. Same name, different meaning → keep primitive-local.

## Future: NbPressCapability

Observed in:
- `nbButton`
- `nbIconButton`

Both implement the brutalist press motion locally today:
`hover:translate-x/y-(--nb-shadow-offset-*) hover:shadow-none` (and Button's
`reverse` variant flips the direction).

Potential responsibility:
- shared hover/active movement
- brutalist press offset
- shadow/translate coordination

Reason to defer:
- interaction semantics need careful design
- should land after visual capability adoption
- should be reviewed together with focus/disabled behavior

For now, Button/IconButton keep their hover/active behavior **primitive-local**.

## Concerns that stay primitive-local

| Concern | Lives in | Why |
|---|---|---|
| press / hover-translate | Button, IconButton | Interaction, not visual value — future `NbPressCapability` |
| `focus-visible` ring | every control | Future `NbFocusCapability` |
| disabled / `aria-disabled` | every control | Future `NbDisabledCapability` |
| asymmetric pill padding | Chip | Anatomy — a chip is an inline pill, not a uniform container |
| square dimensions / icon sizing | IconButton | Anatomy specific to the square target |
| MediaItem layout (orientation/align/size/gap/typography) | MediaItem | Composition anatomy, not shared visual grammar |
| recipe layout | recipes | Tailwind escape hatch — proves the vocabulary, doesn't extend it |
