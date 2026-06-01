# Capability Adoption Inventory

Working inventory for the 2026-06-01 full-library style-capability sweep.

## Capability adoption inventory

| Primitive | Current style logic | Existing capability adoption | Missing capabilities | Keep local | Action |
|---|---|---|---|---|---|
| Surface | host shell tone/radius/shadow/border plus container padding, size/layout/edge/clip | tone/radius/shadow/border/padding | none | size, layout, edge, clip | Adopted padding capability for uniform container padding |
| Section | uniform region padding, divider placement/style, layout/align | padding | none | divider placement/style, layout, align, flush | Already clean |
| Stack | child gap, align/justify, optional child separator | gap | none | align/justify, separator placement/style | Already clean |
| Cluster | child gap, uniform padding, alignment/wrap, optional child separator | gap/padding | none | align/justify/wrap, separator anatomy | Already clean |
| Split | child gap, uniform padding, ratio/collapse/align, optional separator | gap/padding | none | ratio/collapse/align, separator anatomy | Already clean |
| MediaFrame | host shell tone/radius/shadow/border, media ratio/fit | tone/radius/shadow/border | none | ratio, fit | Already clean |
| MediaItem | host color for boxed/chip variants, local layout anatomy | tone | none | variant, orientation, align, size-derived gap/padding/icon anatomy | Already clean after tone adoption |
| Button | host color/radius/border, local size and press shadow behavior | tone/radius/border | future press | size, fullWidth, shadow press/reverse behavior | Already normalized; keep shadow local |
| IconButton | host color/radius/shadow/border, local square size/shape | tone/radius/shadow/border | future press | size, shape, icon, hover/focus/disabled | Already clean |
| Chip | host color/radius/shadow/border, asymmetric pill padding | tone/radius/shadow/border | none | padding, icon, iconSize | Already clean; keep pill padding local |
| Callout | host tone/shadow, size-derived radius/border/padding | tone/shadow | none | size-derived radius, border width, padding, layout | Keep local anatomy |
| Badge | host label color/radius/shadow/border | tone/radius/shadow/border | none | pill padding/gap | Adopted visual capabilities; removed variant API |
| Card | host shell color/radius/shadow/border | tone/radius/shadow/border | none | subpart layout/gaps/padding | Adopted visual capabilities |
| Avatar | host fallback shell color/radius/shadow/border | tone/radius/shadow/border | none | intrinsic size, image/fallback anatomy | Adopted visual capabilities |
| ImageCard | host shell color/radius/shadow/border | tone/radius/shadow/border | none | image/caption anatomy | Adopted visual capabilities |
| Dialog | dialog shell color/radius/shadow/border | tone/radius/shadow/border | future focus/disabled | modal behavior, subpart layout | Adopted visual shell capabilities |
| Accordion | item shell color/radius/shadow/border; trigger/content local colors | item tone/radius/shadow/border | future focus/disabled | open/closed behavior, trigger/content anatomy | Adopted item shell capabilities |
| Input | field shell tokens, focus/disabled, file slot | none | future control/focus/disabled | control semantics, group integration, file anatomy | Keep local for control capability pass |
| Textarea | field shell tokens, focus/disabled | none | future control/focus/disabled | control semantics, group integration | Keep local for control capability pass |
| Select / NativeSelect | field/listbox shell tokens, focus/open/disabled | none | future control/focus/disabled | combobox/native-select behavior | Keep local for control capability pass |
| InputGroup / Prefix / Suffix | grouped field shell and add-on color | none | future control/focus/disabled | grouping anatomy and add-on placement | Keep local for control capability pass |
| Checkbox | checked-state color, size, focus/disabled | none | future control/focus/disabled | native input semantics, state color | Keep local |
| Progress | semantic fill color, track shell | none | possible future state/tone | progress semantics, fill state | Keep local |
| StatusDot | semantic state color | none | possible future state/tone | state semantics, pulse | Keep local |
| Stat | typography/layout block | none | none | value/label typography | Already clean |
| Text | text-specific typography tone/size/weight/tracking | none | none | typography authority | Already clean |
| Display | display typography | none | none | typography authority | Already clean |
| Title | marker directive | none | none | no visual grammar | Already clean |
| Label | label typography/disabled peer style | none | future disabled | label semantics | Keep local |
| Separator | line orientation/style | none | possible divider/separator shared type | line anatomy | Keep local |
| Marquee | animated strip shell | none | none | animation/media-strip anatomy | Decorative/out of scope |
| Rating | glyph color/size | none | possible state/tone | rating semantics | Keep local |
| Sticker / StickerFace | decorative SVG fill/ink/shadow | none | none | SVG art geometry | Decorative/out of scope |
| Halftone | numeric SVG geometry/color | none | none | SVG geometry | Decorative/out of scope |

## Buckets

| Bucket | Primitives |
|---|---|
| A. Already clean | Section, Stack, Cluster, Split, MediaFrame, Button, IconButton, Chip, MediaItem, Stat, Text, Display, Title |
| B. Adopted existing capability now | Surface padding, Badge, Card, Avatar, ImageCard, Dialog shell, Accordion item shell |
| C. Keep local anatomy | Callout, Input, Textarea, Select, NativeSelect, InputGroup, Checkbox, Progress, StatusDot, Label, Separator, Rating |
| D. Decorative / out of scope | Sticker, StickerFace, Halftone, Marquee |
| E. Needs future capability, not now | Button/IconButton press, focus rings, disabled states, control sizing, align/justify shared types |

## Future candidates recorded only

| Candidate | Seen in | Repeated behavior | Decision | Reason |
|---|---|---|---|---|
| NbPressCapability | Button, IconButton | hover/active translate and shadow shift | Future | Needs interaction design |
| NbFocusCapability | Button, IconButton, Input, Select, Checkbox, Dialog, Accordion | focus-visible ring treatment | Future | Needs accessibility chapter |
| NbDisabledCapability | Button, IconButton, form controls, Accordion | disabled state styling/semantics | Future | Native vs ARIA differences |
| NbControlSizeCapability | Button, Input, Select, Textarea, Checkbox | control density | Future | Size meaning differs by primitive |
| NbAlign/NbJustify shared types | Stack, Cluster, Split, Section, MediaItem | alignment vocabulary | Record only | CSS targets differ |
