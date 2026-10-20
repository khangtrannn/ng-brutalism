# Directive vs. Component Audit — 2026-10-20

**Scope:** all 69 exported classes in `libs/ui/src/lib`: 35 directives and 34
components.

**Method:**
- Scripted an inventory of each class's decorator, selector, template,
  `hostDirectives` and providers.
- Ran a strict-template `ngc` probe to confirm that a directive with an
  element selector compiles.

## The rule

| Use a… | When | Why |
|---|---|---|
| **Directive** | The class styles or wires its host, or projects children unchanged (`<ng-content />` only) | Composes with `hostDirectives`, and any number can share an element. Creates no view of its own. |
| **Component** | The class renders DOM of its own: an `<img>`, `<svg>`, `<button>`, wrapper `<div>`, or `<dialog>` | Only components have templates |

A component whose template is only `<ng-content />` creates a view for each
instance and gets nothing in return. It also can't be used in `hostDirectives`,
and it takes the element's single component slot.

**Moving such a class to a directive is safe:**
- Directives can use element selectors. A strict-template `ngc` probe showed
  that a directive with selector `nb-probe-header` satisfies the compiler;
  only an unmatched element raised NG8001.
- `providers`, `contentChild`, `exportAs` and `hostDirectives` all work on
  directives, so templates, imports and class names don't change.

**What does break:**
- Code that creates these classes as components
  (`TestBed.createComponent(NbCard)`, `ViewContainerRef.createComponent`).
- The `api-guard` snapshot (`ɵcmp` becomes `ɵdir`).

## Results

### ✓ Directives used correctly (35)

These style or wire their host and render nothing:
- **Host styling:** Badge, Button, Callout, Checkbox, ChipGroup, Cluster,
  Display, Icon, Input, MediaFrame, Section, NativeSelect, Separator, Split,
  Stack, StatusDot, Surface, Text, Textarea, Title, Typography
- **Wiring:** Label, FieldDescription, FieldError, DialogTitle,
  DialogDescription, DialogClose, InputPrefix, InputSuffix
- **Media-item parts:** MediaItemIcon, MediaItemTitle, MediaItemDescription
- **Internal capabilities:** Tone, Underline, ResetMargin

### ✓ Components used correctly (16)

These render internal parts that consumers don't write:

| Component | Renders |
|---|---|
| `NbAccordionTrigger` | `<h3><button>` + chevron `<svg>` |
| `NbAccordionContent` | `role="region"` wrapper + inner grid wrapper (needed for the height animation) |
| `NbAvatar` | `<img>` |
| `NbAvatarGroup` | the `+N` overflow `<span>` |
| `NbDialog` | the native `<dialog>` |
| `NbImageCard` | the lazy `<img>` |
| `NbMarquee` | two animated strips |
| `NbMediaItem` | icon, title and description slots |
| `NbProgress` | track + fill |
| `NbRating` | stars |
| `NbSelect` | trigger `<button>` + listbox |
| `NbSelectOption` | option `<button>` + check `<svg>` |
| `NbStat` | value + label spans |
| `NbSticker`, `NbStickerFace` | SVG shapes |
| `NbHalftone` | dot `<svg>` |

`NbHalftone` is correct today, but becomes a directive if the CSS-gradient
renderer replaces the SVG (library audit 2.6).

### ✗ Should be directives: their template is only `<ng-content />` (14)

| Class | Selector | Notes |
|---|---|---|
| `NbCard` | `nb-card` | Same job as `NbSurface`, which is a directive. Also has `hostDirectives` (tone). |
| `NbCardHeader`, `NbCardTitle`, `NbCardDescription`, `NbCardActions`, `NbCardContent`, `NbCardFooter` | `nb-card-*` | Pure parts. Each sets a `data-slot`; `Actions` also sets `data-align`. |
| `NbDialogActions`, `NbDialogContent` | `nb-dialog-*` | Their siblings `NbDialogTitle` and `NbDialogDescription` are already directives, so the dialog is half and half. |
| `NbImageCardCaption` | `nb-image-card-caption` | A pure part |
| `NbMarqueeItem` | `nb-marquee-item` | A pure part |
| `NbField` | `nb-field` | Provides `NB_FIELD` and uses `contentChild`; both work on a directive |
| `NbInputGroup` | `nb-input-group` | Provides `NB_INPUT_GROUP` |
| `NbAccordionItem` | `nb-accordion-item` | Provides nothing; only state, inputs and `hostDirectives` |

### ⚠ Judgment calls (4)

| Class | Today | Issue | Recommendation |
|---|---|---|---|
| `NbAccordion` | Component rendering `<div data-slot="accordion-items"><ng-content/></div>` | The wrapper `<div>` only exists for `display: flex; gap`. The host can do that itself. | Drop the wrapper and make it a directive. This changes the DOM, so check for consumer CSS that targets `[data-slot='accordion-items']`. |
| `NbIconButton` | Component on `button[nbIconButton]`; its only template is an optional `NbIcon` from the `icon` input | Its sibling `NbButton` is a directive, where you project the icon yourself. As a component, it can't be combined with another component on the `<button>`, or composed through `hostDirectives`. | Make it a directive with a projected `<span nbIcon>`, as `NbButton` does. The cost is the convenience `icon` input. |
| `NbChip` | Component on `span[nbChip]`, same pattern (optional icon from `icon`) | Same as icon-button | Same: a directive with a projected icon |
| `NbButtonTrailingIcon` | Component on `[nbButtonTrailingIcon]`; optional icon from `icon` | Same pattern. The size and radius values in TypeScript are a separate finding (library audit 2.6). | Same: a directive, which also lets the size and radius maps move to CSS |

For these four, decide once. Either keep `icon` inputs on everything (every
button-like primitive stays a component), or project icons everywhere (every
one becomes a directive). Today it's half and half: `NbButton` projects the
icon; `NbIconButton`, `NbChip` and `NbButtonTrailingIcon` render it. Projecting
fits the directive-first design better.

## Smaller consistency notes

- **Dual selectors** (`nb-media-item, [nbMediaItem]`, `nb-halftone,
  [nbHalftone]`, the `nb-media-item-*` parts) give two ways to write the same
  thing. Other primitives pick one. Choose one form per class, or document
  the rule (an element for a standalone block, an attribute to decorate a
  semantic host).
- **Narrow element restrictions** (`span[nbBadge]`, `span[nbStatusDot]`,
  `span[nbChip]`) stop `<a nbBadge>` or `<button nbChip>` from working.
  Directives make widening a selector cheap. Decide whether badge and chip
  should work on interactive elements (a clickable filter chip is a common
  pattern).

## Summary

| Verdict | Count |
|---|---|
| Correct | 51 (35 directives + 16 components) |
| Should be a directive (`<ng-content />` only) | 14 |
| Judgment calls (wrapper `<div>` or `icon` input) | 4 |

## Suggested order

1. **The 14 ng-content-only classes.** Change the decorator and remove
   `template`/`changeDetection`. Templates don't change. Regenerate
   `api-guard`, and treat it as a 0.4.0 change because of the `ɵcmp` → `ɵdir`
   change in the snapshot.
2. **Decide the `icon` input question**, then apply it to icon-button, chip
   and the trailing icon together.
3. **`NbAccordion`:** drop the wrapper `<div>`, with a note in the changelog.
4. **Dual selectors and the narrow `span[...]` restrictions:** decide during
   the 0.4.0 API cleanup (library audit Phase 5).
