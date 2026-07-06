# Capability Discovery Lane

A running ledger for the **internal style-capability** system: which repeated
concerns have been promoted to a shared capability or shared transform, which
are recorded as future candidates, and which deliberately stay primitive-local.

This is the "discovery lane" that runs alongside each capability-adoption
refactor. The rule of thumb:

> Tokens define the vocabulary. Capabilities and input transforms apply the
> vocabulary internally. Primitives expose the public API. Component CSS
> variables are the customization contract. Recipes prove the vocabulary works.

A repeated concern only becomes a capability when **all** of these hold:

- It appears in **≥3 primitives**, or 2 very important ones.
- It means the **same thing** across those primitives.
- It can produce predictable literal-or-null values that primitives map to real
  CSS properties.
- It does not hide important component anatomy.
- It does not make the public API more confusing.
- It is directly needed by the refactor in flight.

When in doubt, **record the candidate; do not build it.** Semantic visual
grammar such as tone is capability-shaped. Scalar visual grammar such as
radius, shadow, border, padding, and gap is transform-shaped: the input
normalizes a token to a public CSS variable value, and component CSS owns the
final property.

## Shipped internal adapters

| Adapter | Public input | Output | Adopted by |
|---|---|---|---|
| `NbToneCapability` | `tone` | `data-nb-tone`; CSS maps that to `--_nb-tone-*` slots | Most tone-bearing primitives: Surface, Button, Input, Select, Badge, Card, Avatar, Text, Progress, Rating, Sticker, etc. |
| `NbUnderlineCapability` | `underline` | underline state consumed by `NbText` / `NbDisplay` | Text, Display |
| `NbResetMarginCapability` | `reset` | margin reset state consumed by typography primitives | Text, Display |
| Scalar input transforms | `radius`, `shadow`, `border`, `padding`, `gap` | public component CSS variables such as `--nb-button-radius` | Surface/box, layout, and interactive primitives that expose those inputs |

> Tone owns color (`bg` / `fg` / `border-color`); the border capability owns
> `border-width` only — so color and width never fight.

## Capability discovery candidates

| Candidate | Seen in | Repeated behavior | Decision | Reason |
|---|---|---|---|---|
| NbPressCapability | Button, IconButton | Shared hover/active translate + shadow-shift | Future | Interaction semantics need design; review with focus/disabled |
| NbFocusCapability | Button, IconButton, Input, Select, Checkbox, Dialog, Accordion | Shared `focus-visible` ring treatment | Future | Needs accessibility chapter |
| NbDisabledCapability | Button, IconButton, form controls, Accordion | Shared disabled/`aria-disabled` styling + semantics | Future | Native vs ARIA differences |
| NbControlSizeCapability | Button, IconButton, Input, Select, Checkbox | Shared control density naming (`sm/md/lg`) | Future | Each control's size remains anatomy today |
| NbAlign / NbJustifyCapability | Stack, Cluster, Split, Section, MediaItem | Shared layout alignment mapping | Record only | CSS targets differ; shared layout types are centralized |
| NbSizeCapability (generic) | Many primitives | One `size` to rule them all | Do not implement | `size` means different anatomy per primitive |

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
| size-derived callout padding/radius/border | Callout | Anatomy — callout size controls its whole display shell |
| square dimensions / icon sizing | IconButton | Anatomy specific to the square target |
| MediaItem layout (orientation/align/size/gap/typography) | MediaItem | Composition anatomy, not shared visual grammar |
| form-control shell/focus/disabled | Input, Textarea, Select, InputGroup, Checkbox | Future control/focus/disabled capability pass |
| recipe layout | recipes | Tailwind escape hatch — proves the vocabulary, doesn't extend it |
