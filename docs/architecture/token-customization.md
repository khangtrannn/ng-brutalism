# Token Customization

> **The single source of truth** for how ng-brutalism components are styled
> and customized through CSS variables. Other docs link here instead of
> restating it.
>
> **Status: v2.1, accepted (2026-10-25). Not implemented yet.** The shipped
> CSS (`fd5371f`) still uses the older model: one public variable per scalar,
> registered with `@property`. Migration is in §13, decisions still needed in
> §14.
>
> Theme distribution, community themes and the theme validator are in
> [theming.md](theming.md). They build on this contract and don't change it.

---

## 1. The model

| Layer | What it styles | Example |
|---|---|---|
| **Roles** | A *place*: the app or a section. Inherited, settable anywhere. | `--nb-radius-box`, `--nb-surface` |
| **Component tokens** | A *component*: all instances, some, or one. Declared on every component root, so they never leak into nested instances. | `--nb-card-radius` |
| **Inputs** | *One instance* from a template. They write the component token inline. | `<nb-card radius="none">` |
| **Tone** | A three-color preset that stays on the element it's set on. | `tone="pink"` → `--nb-tone-bg/-fg/-border` |

Rule of thumb:
- **Roles** are for a place.
- **Component tokens** are for a component.
- **Inputs** are for one instance.

---

## 2. Consumer guide

What the library ships, for reference (Card):

```css
:where([data-nb-card]) {
  --nb-card-bg: var(--nb-surface);
  --nb-card-radius: var(--nb-radius-box);
  --nb-card-shadow: var(--nb-shadow-box, var(--nb-shadow-box-offset) var(--nb-shadow-box-offset) 0 0 var(--nb-shadow));
  --nb-card-padding: 1.5rem;

  background: var(--nb-tone-bg, var(--nb-card-bg));
  border-radius: var(--nb-card-radius);
  box-shadow: var(--nb-card-shadow);
  padding: var(--nb-card-padding);
}
```

Use cases marked ✓ were verified with a prototype in Chromium, Firefox and
WebKit.

### 2.1 Brand the whole app ✓

```css
:root {
  --nb-primary: #ff5d8f;
  --nb-radius-box: 0;          /* cards, dialogs, callouts */
  --nb-radius-control: 999px;  /* buttons */
}
```

### 2.2 Dark mode or a scoped theme ✓

```css
[data-nb-theme='dark'] {
  --nb-surface: #111;
  --nb-surface-foreground: #f5f5f5;
  --nb-border: #f5f5f5;
  --nb-shadow: #f5f5f5;
}
```

```html
<section data-nb-theme="dark">…</section>
```

### 2.3 Restyle one section ✓

```css
.pricing {
  --nb-radius-box: 0;      /* cards and callouts here go square */
  --nb-shadow: #ff5d8f;    /* every shadow here goes pink */
}
```

Buttons and inputs keep their radius, because they use the `control` and
`field` roles.

### 2.4 Every instance of a component ✓

```css
[data-nb-card] {
  --nb-card-padding: 2rem;
}
[data-nb-button] {
  --nb-button-radius: var(--nb-radius-pill);
}
```

### 2.5 Instances inside a scope ✓

```css
.pricing [data-nb-card] {
  --nb-card-radius: 1rem;
}
```

### 2.6 One instance, from the template ✓

```html
<nb-card radius="none" padding="lg">…</nb-card>
```

### 2.7 One instance, from markup or Tailwind ✓

```html
<nb-card style="--nb-card-bg: #fff3c4">…</nb-card>
<nb-card class="[--nb-card-padding:0]">…</nb-card>
```

### 2.8 One size or variant only ✓

```css
[data-nb-button][data-size='sm'] {
  --nb-button-height: 2rem;
}
```

### 2.9 A state ✓

Each state has its own token, so your other overrides never switch it off.

```css
[data-nb-button] {
  --nb-button-hover-shadow: 2px 2px 0 0 #000;
}
[data-nb-input] {
  --nb-input-invalid-border-color: #c00;
}
```

### 2.10 A built-in tone ✓

```html
<nb-card tone="pink">…</nb-card>
```

An explicit tone wins over a component-wide `--nb-card-bg`.

### 2.11 Your own tone ✓

Put the class on the component itself.

```css
.tone-brand {
  --nb-tone-bg: #0e47df;
  --nb-tone-fg: #fff;
  --nb-tone-border: #000;
}
```

```html
<nb-card class="tone-brand">…</nb-card>
```

### 2.12 A part of a compound component ✓

Set the token on the component root. The part reads it from there.

```css
[data-nb-accordion-item] {
  --nb-accordion-trigger-bg: var(--nb-yellow);
}
```

### 2.13 Nesting is safe ✓

```html
<nb-card radius="none" tone="pink">
  <nb-card>Default radius, no tone</nb-card>
</nb-card>
```

### 2.14 Force a value, for example an accessibility fix ✓

```css
.high-contrast [data-nb-card] {
  --nb-card-border-width: 4px !important;
}
```

### 2.15 Plain HTML, no Angular

```html
<div data-nb-card data-nb-tone="pink" style="--nb-card-radius: 0">…</div>
```

### 2.16 What doesn't work ✓

| Don't | Do |
|---|---|
| `.pricing { --nb-card-radius: 0 }`: each root declares its own | `.pricing { --nb-radius-box: 0 }` or `.pricing [data-nb-card] {…}` |
| `.pricing { --nb-radius-md: 1rem }`: a primitive, inside a section | Override the role: `.pricing { --nb-radius-box: 1rem }` |
| `<div class="tone-brand"><nb-card>`: tone stays on its element | `<nb-card class="tone-brand">` |
| `radius="lg"` and `style="--nb-card-radius: …"` on one element | Pick one. The input wins. |

---

## 3. Precedence

From strongest to weakest:

1. `!important`
2. Inline: an input or a `style` attribute
3. Utilities layer (Tailwind)
4. Consumer rule selecting the component (unlayered or a later layer)
5. Explicit tone, then library States, then Variants, then Tokens
6. Roles, inherited from any ancestor
7. Primitives

The library declares `@layer theme, components, utilities`, the same names
as Tailwind v4's layers. Consumer CSS loads after that declaration.

---

## 4. Layers

```txt
L1 Primitives   --nb-pink, --nb-radius-md, --nb-space-4      theme files only; inherited
L2 Roles        --nb-surface, --nb-primary, --nb-radius-box,  inherited → app/section scope
                --nb-border-width, --nb-shadow-box-offset …
L3 Component    --nb-card-radius, --nb-button-hover-shadow …  declared on each component root
L4 Instance     input (inline L3), style attribute, utility, rule selecting the component
Tone            data-nb-tone → --nb-tone-bg/-fg/-border       on that element only
```

### 4.1 Roles

| Family | Tokens | Used by |
|---|---|---|
| Color | `--nb-surface`, `--nb-surface-foreground`, `--nb-primary`, `--nb-primary-foreground`, …, `--nb-muted-foreground`, `--nb-danger` | all |
| Border | `--nb-border`, `--nb-border-width` | all |
| Shape | `--nb-radius-box` | card, surface, callout, dialog, image-card, media-frame, accordion item |
| | `--nb-radius-field` | input, textarea, select, input-group, checkbox |
| | `--nb-radius-control` | button, icon-button |
| | `--nb-radius-pill` | badge, chip, avatar, status-dot |
| Depth | `--nb-shadow` (color), `--nb-shadow-box-offset`, `--nb-shadow-control-offset`, `--nb-shadow-pill-offset` | the groups above |
| | Optional, unset by default: `--nb-shadow-box`, `--nb-shadow-control`, `--nb-shadow-pill` (a full `box-shadow`, §14.6) | the groups above |
| Tone presets | `--nb-tone-<name>-bg/-fg/-border` | tone layer |

**Roles are atomic values.** A custom property resolves `var()` on the
element that declares it. A role derived on `:root`
(`4px 4px 0 0 var(--nb-shadow)`) therefore ignores a section's override of
its parts. This was verified. Components compose roles inside their own
tokens, and inside a section you override roles, not the primitives behind
them.

### 4.2 Tone

```css
@property --nb-tone-bg { syntax: "*"; inherits: false; }
@property --nb-tone-fg { syntax: "*"; inherits: false; }
@property --nb-tone-border { syntax: "*"; inherits: false; }

:where([data-nb-tone='pink']) {
  --nb-tone-bg: var(--nb-tone-pink-bg);
  --nb-tone-fg: var(--nb-tone-pink-fg);
  --nb-tone-border: var(--nb-tone-pink-border);
}
```

These are the only registered properties in the library. The slots are
public: setting them on a component defines a custom tone. They don't
inherit, so a toned component never tones its children.

### 4.3 Theme contract

A theme is one `[data-nb-theme='<name>']` block that sets L1 primitives, L2
roles and tone presets. Nothing else.

- **Required:** every role in §4.1. A missing role falls back to the
  default theme.
- **Never:** component tokens, tone slots, other selectors, or real CSS
  properties. Component tokens are declared on each root, so a theme block
  can't set them anyway (§2.16).
- **Literals:** set roles to literals or to primitives defined in the same
  block. A role derived from other roles ignores section overrides (§4.1).

Packaging, contribution rules and validation: [theming.md](theming.md).

---

## 5. Library stylesheet contract

Every component stylesheet has four blocks in this order, all inside
`@layer components` and wrapped in `:where()`:

| Block | Selector | May only |
|---|---|---|
| **Tokens** | `[data-nb-x]` | Declare every `--nb-x-*` token, including state tokens, from roles |
| **Variants** | `[data-nb-x][data-size\|variant\|shape…]` | Reassign base tokens |
| **Anatomy** | root and parts | Set properties from `var(--nb-tone-*, var(--nb-x-*))` or `var(--nb-x-*)`. No literals, and no other component's tokens. |
| **States** | `:hover`, `:focus-visible`, `[aria-invalid]`, `[data-state]`, `:disabled` | Set properties from **state tokens**. Never reassign base tokens. |

These rules follow from that contract:

1. **States use their own tokens.** Consumer CSS is unlayered, so it beats
   any library rule that reassigns the same token. A state that reassigned
   `--nb-input-border-color` would be switched off by a consumer override.
   That was verified, so states read `--nb-input-invalid-border-color`.
2. **Tone comes first in Anatomy:**
   `background: var(--nb-tone-bg, var(--nb-card-bg))`. A component-wide
   override then sets the untoned default, and an explicit `tone` still
   wins.
3. **Only the user-facing root declares tokens.** Parts (trigger, listbox,
   caption, slots) read them through inheritance and never re-declare them.
   Compound-part tokens such as `--nb-accordion-trigger-bg` live on the
   root.
4. **No DOM-moving portals.** Overlays use the Popover API, `<dialog>` or
   in-place positioning, so their parts stay inside the root. That was
   verified: a part moved elsewhere in the DOM loses the root's tokens.
5. **Hover styles are gated** behind `@media (hover: hover)`.

Example (Button):

```css
@layer components {
  /* Tokens */
  :where([data-nb-button]) {
    --nb-button-bg: var(--nb-primary);
    --nb-button-fg: var(--nb-primary-foreground);
    --nb-button-border-color: var(--nb-border);
    --nb-button-border-width: var(--nb-border-width);
    --nb-button-radius: var(--nb-radius-control);
    --nb-button-shadow: var(--nb-shadow-control, var(--nb-shadow-control-offset) var(--nb-shadow-control-offset) 0 0 var(--nb-shadow));
    --nb-button-height: 2.75rem;
    --nb-button-padding-x: 1rem;
    --nb-button-font-size: 1rem;
    --nb-button-hover-translate: var(--nb-shadow-control-offset) var(--nb-shadow-control-offset);
    --nb-button-hover-shadow: none;
    --nb-button-disabled-opacity: 0.5;
  }

  /* Variants */
  :where([data-nb-button][data-size='sm']) {
    --nb-button-height: 2.25rem;
    --nb-button-padding-x: 0.75rem;
    --nb-button-font-size: 0.875rem;
  }

  /* Anatomy */
  :where([data-nb-button]) {
    height: var(--nb-button-height);
    padding-inline: var(--nb-button-padding-x);
    font-size: var(--nb-button-font-size);
    background: var(--nb-tone-bg, var(--nb-button-bg));
    color: var(--nb-tone-fg, var(--nb-button-fg));
    border: var(--nb-button-border-width) solid var(--nb-tone-border, var(--nb-button-border-color));
    border-radius: var(--nb-button-radius);
    box-shadow: var(--nb-button-shadow);
  }

  /* States */
  @media (hover: hover) {
    :where([data-nb-button][data-press='push']):hover {
      translate: var(--nb-button-hover-translate);
      box-shadow: var(--nb-button-hover-shadow);
    }
  }
  :where([data-nb-button]:disabled, [data-nb-button][aria-disabled='true']) {
    opacity: var(--nb-button-disabled-opacity);
  }
}
```

---

## 6. TypeScript contract

- Every component root renders `data-nb-<name>`. It's the styling hook and
  the documented customization selector.
- Semantic inputs (`size`, `variant`, `shape`, `press`, `layout`, `tone`)
  render `data-*`.
- Scalar inputs (`radius`, `shadow`, `border`, `padding`, `gap`) write the
  L3 token inline through `core/style-transforms.ts`. Transforms return
  token references (`var(--nb-radius-lg)`), not literals.
- TypeScript never writes final customizable properties and never repeats a
  CSS default. Runtime values that aren't design tokens (progress width,
  icon mask URL, halftone geometry) may be final inline styles.

---

## 7. Vocabulary

One suffix set for every component:

```txt
-bg  -fg  -border-color  -border-width  -radius  -shadow
-padding / -padding-x / -padding-y  -gap  -height  -size
-font-size  -font-weight  -line-height  -tracking
```

State tokens add the state name before the slot:
`--nb-x-hover-bg`, `--nb-x-invalid-border-color`, `--nb-x-disabled-opacity`.

---

## 8. Known limits

- **A directly nested separated stack, cluster or split.** When an inner one
  is directly an item of an outer one, it uses its own gap for its own
  spacing. Fixing this needs CSS `inherit()` or gap decorations; use
  `nbSeparator` between items until then.
- **Parts outside the root.** Descendant part selectors also match parts of
  nested instances. Prefer child combinators, or `@scope` once supported.
- **DevTools noise.** Every component lists its tokens. The runtime cost was
  measured as negligible: 20,000 roots × 10 tokens was within noise in all
  three engines.

---

## 9. Why this design

**Problems with the shipped model:**
- Inline input values inherited, so an outer instance restyled nested ones.
- Patching that with `@property inherits: false` broke child parts. They
  then needed about 60 private forwarder variables, plus an "every forwarder
  must always resolve" rule, and a per-variable `inherits` decision on about
  220 variables.
- Wrapper-level scoping was lost with no replacement.
- Hard-coded values and mixed naming blocked dark mode.

**Constraint:** Baseline CSS only. `if()` is Chromium-only as of 2026, and
`inherit()` support is unconfirmed.

| Option | Used by | Verdict |
|---|---|---|
| Inherited component tokens, scoped by selector | Angular Material, Spectrum, PrimeNG | Rejected: input values leak into nested instances |
| `@property inherits:false` plus private forwarders | the shipped interim | Rejected: correct but heavy and hard to reason about |
| JS or Sass theme configuration | MUI, Chakra, Ant Design, Angular Material | Rejected: adds a runtime or build step and competes with plain CSS and Tailwind |
| **Root-declared component tokens, inherited roles, `data-*` variants** | Mantine, Ionic, Shoelace / Web Awesome, daisyUI 5, Radix | **Chosen** |

**Confidence:** none of the pieces is novel.

| Piece | Precedent |
|---|---|
| Root-declared component vars | Mantine `--button-bg`; Ionic `ion-button { --background }` |
| Group roles | daisyUI `--radius-box/field`; Web Awesome `--wa-form-control-*` |
| State tokens | Ionic `--background-hover`; Mantine `--button-hover` |
| `data-*` variants | Radix, Mantine |

Customizing through CSS is as easy as the easiest peers (Mantine, Ionic,
shadcn). It's simpler than JS-config libraries (MUI, Chakra, Ant, PrimeNG):
no theme object, no provider, no runtime, no specificity fights, and it
works with Tailwind.

**Verification,** with Playwright in Chromium, Firefox and WebKit, identical
across all three:
- 19/19 model checks: precedence, no nested leak from inputs or tone, role
  section scope, compound parts reading root tokens.
- The use cases in §2.
- Risk checks:
  - A state that reassigns a token loses to a consumer override; a state
    token survives.
  - Inline and popover parts keep their tokens; a DOM-moved part doesn't.
  - Derived `:root` roles ignore section overrides.
  - No measurable performance cost.

---

## 10. Gaps vs other libraries (outside tokens)

| Gap | Who has it | Follow-up |
|---|---|---|
| App-wide default props ("all buttons small") | MUI / Mantine `defaultProps`, Angular Material `MAT_*_DEFAULT_OPTIONS` | `provideNbDefaults({ button: { size: 'sm' } })` |
| New sizes, variants, named tones | MUI variants, Chakra recipes, Ionic `.ion-color-*` | Widen the input types to accept your own values (`NbTone \| (string & {})`) |
| Editor autocomplete | libraries themed through TypeScript | Generated VS Code CSS custom data |
| Dark mode | all peers | `theme-dark.css`: one block of role overrides |
| Part API | MUI slots, PrimeNG `pt` | Document `data-slot` names as stable selectors |

---

## 11. Breaking changes for consumers (v0.x)

- Component tokens set on a wrapper are ignored. Use a role, or a selector
  that targets the component.
- The tone slots become public: `--_nb-tone-*` → `--nb-tone-*`.
- Vocabulary renames (§7). For example, `-ink` and `-text` → `-fg`,
  text colors named `-color` → `-fg`, `-thickness`/`-stroke-width` →
  `-border-width`, `-leading` → `-line-height`.
- `--nb-radius` is removed. Set `--nb-radius-box`, `-field`, `-control` and
  `-pill` instead.
- `theme-soft.css` and `theme-mono.css` no longer apply to the whole page
  on import. Add `data-nb-theme="soft"` or `"mono"` to `<html>` or to a
  section.
- The Angular input API is **unchanged**.

---

## 12. Docs and tooling

- The docs-site customization and theming pages (`apps/docs`) describe the
  shipped model. They're rewritten from this file during migration.
- `pnpm docs:tokens:update` regenerates the docs token table. After the
  migration it reads the Tokens blocks.
- `pnpm validate:themes` (planned, [theming.md §7](theming.md#7-theme-validator))
  checks theme files against §4.3 and reads the same role list.

---

## 13. Migration plan

1. Theme: add the role tokens, make the tone slots public and registered.
   **Done 2026-10-25.** Defaults match today's look. `--nb-radius` and
   `--nb-shadow-offset-x/-y` stay until the last component stops reading
   them.
2. Guard: a spec that parses each stylesheet and enforces the four-block
   contract (§5). It replaces the current registration guard.
   **Done 2026-10-25:** `libs/ui/src/lib/styles/stylesheet-contract.spec.ts`.
   A component is checked once its folder is in `MIGRATED`; the rest keep
   the old registration rule until then.
3. Pilot: **Button** (states, variants, tone), **Input** (field role,
   invalid/focus), **Accordion** (compound). Each ships with Chromium,
   Firefox and WebKit contract specs.
4. The rest by archetype: surfaces → controls and fields → compound →
   layout and type.
5. Docs generator, docs-site pages and CHANGELOG renames.
6. Themes: move the shipped theme files from `:root` to
   `[data-nb-theme]` (§4.3). The rest of the theming roadmap is in
   [theming.md §9](theming.md#9-roadmap).

---

## 14. Decisions

Numbers stay stable so other docs can link to them.

**Decided (2026-10-25):**

1. **v2.1 accepted.** It ships in 0.3.0 together with the rest of the
   release. There's no release on the old CSS model first.
2. **No size or density role.** Sizes stay per component: the `size` input
   or a component token. A role can be added later without breaking
   anything, because component tokens would read it as their default.
3. **`--nb-radius` is dropped.** Use the four shape roles (§4.1). Breaking;
   listed in §11.
4. **Vocabulary renames happen in this migration** (§7), including text
   colors named `-color` (for example `--nb-display-color` →
   `--nb-display-fg`). `-border-color` stays.
6. **Optional full-value depth roles:** `--nb-shadow-box`,
   `--nb-shadow-control`, `--nb-shadow-pill`. They're unset by default, and
   each component falls back to the offset recipe:
   ```css
   --nb-card-shadow: var(--nb-shadow-box,
     var(--nb-shadow-box-offset) var(--nb-shadow-box-offset) 0 0 var(--nb-shadow));
   ```
   A theme that sets one to a literal (a glow, say) loses section overrides
   of `--nb-shadow` for that group. Every other theme keeps them.
7. **The default theme matches `:root` and `[data-nb-theme='default']`.**
   Every other theme matches only its own attribute. Importing the library
   works with no attribute set. Apps that import only `theme-soft.css` or
   `theme-mono.css` today add `data-nb-theme` to `<html>`.

**Open:**

5. Include `provideNbDefaults` and extensible tones and sizes in scope?
8. Promote the shipped `--nb-font-body/-display/-accent` and
   `--nb-font-weight-*` to a Type role family in §4.1, so themes can change
   typography?
