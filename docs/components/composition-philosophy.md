# ng-brutalism + Tailwind — Composition Philosophy

> ↑ Start at [design-props.md](design-props.md) for the design-prop vocabulary
> and per-component matrix; this doc is the deep-dive on the Tailwind boundary.

ng-brutalism is intentionally **not** a replacement for Tailwind. The two own
different layers, and a healthy recipe uses all three of the following without
blurring their responsibilities.

## The three layers

| Layer | Owns | Examples |
|---|---|---|
| **ng-brutalism primitives** | Brutalist visual grammar + component anatomy | `tone`, `radius`, `shadow`, `border`, `press`, `state`, layout `gap`/`padding`/`align`/`justify`, interaction & accessibility behavior |
| **`nbText`** (and `nbDisplay`) | Expressive typography | `size`, `weight`, `tracking`, `transform`, `leading`, `measure`, underline treatment |
| **Tailwind** | Page-specific layout & art direction | `relative`, `absolute`, `z-*`, `w-full`, `max-w-*`, `mx-auto`, `hidden sm:block`, `top-[25%]`, `size-*`, `flex-1`, arbitrary geometry |

> Use ng-brutalism inputs for common design decisions.
> Use CSS variables for local art direction.
> Use Tailwind classes for layout escape hatches.

## Recommended pattern

```html
<div
  nbSurface
  clip
  border="strong"
  shadow="hard"
  radius="xl"
  class="relative mx-auto w-full max-w-[28rem]"
>
  <button nbButton tone="lavender" size="xl" radius="md">
    <span nbText size="3xl" weight="black" transform="uppercase" tracking="wide">
      Listen Now
    </span>
  </button>
</div>
```

In this pattern:

- `nbSurface`, `border`, `shadow`, `radius`, and `clip` come from ng-brutalism — they are tokens and anatomy.
- `nbButton` owns the clickable surface: padding, density, tone, border, shadow, radius, hover/active/focus/disabled state, accessibility.
- `nbText` owns the expressive label typography.
- `relative`, `mx-auto`, `w-full`, `max-w-[28rem]` stay Tailwind — they describe this specific layout.

### Key rule for buttons

> The button decides how the button behaves and feels.
> The text decides how the label looks.
> Tailwind decides where the button sits.

`size` stays on `nbButton` (it controls box height/padding/density — anatomy). The
button no longer exposes any text-treatment inputs: label `size`, `weight`,
`transform`, and `tracking` belong on a nested `nbText`. `nbButton` keeps a
sensible default (`font-bold`) so ordinary buttons need no extra markup:

```html
<button nbButton tone="mint">Subscribe</button>
```

Custom expressive typography is composed:

```html
<button nbButton tone="lavender" size="xl" radius="md">
  <span nbText size="3xl" weight="black" transform="uppercase" tracking="wide">
    Listen Now
  </span>
</button>
```

### Button color

`nbButton` uses `tone` for color — the same shared visual grammar as the rest of
the library. There is no separate `variant` color axis.

```html
<button nbButton tone="primary">Save</button>
<button nbButton tone="danger">Delete</button>
<button nbButton tone="lavender">Listen Now</button>
```

For the default action style, omit `tone` (it resolves to `primary`):

```html
<button nbButton>Save</button>
```

## Inputs, CSS Variables, And Classes

Inputs are the shared vocabulary. Reach for them when the decision should read
the same everywhere:

```html
<div nbSurface tone="cream" radius="xl" shadow="hard"></div>
```

CSS variables are the local art-direction layer. Use them when a recipe needs a
specific color, spacing, or mark treatment without adding a one-off public API:

```html
<div nbSurface style="--nb-surface-bg: #faf6f0"></div>
<h1 nbDisplay underline="bar" class="[--nb-underline-gap:1.25rem]"></h1>
```

Classes are for layout escape hatches and recipe composition:

```html
<img src="/podcast-card/avatar.png" alt="Kai Nguyen" class="size-30 shrink-0" />
<div nbMediaFrame ratio="1/1" radius="lg"><img src="/trip.jpg" alt="" /></div>
<nb-media-item icon="/icons/clock.svg">45 MIN</nb-media-item>
```

## Component-specific CSS variables

Every primitive reads a namespaced public variable set
(`--nb-surface-bg`, `--nb-button-radius`, `--nb-media-frame-shadow`, …) from its
CSS. These are the customization/debug contract: inspect them in devtools,
document them, and override per token. The vocabulary (`tone`, `radius`,
`shadow`, `border`, `gap`, `padding`) is defined once in
`libs/ui/src/lib/tokens/` so a token means the same thing across every primitive.
See [token-customization.md](../architecture/token-customization.md) and
[token-customization-hardening.md](../architecture/token-customization-hardening.md)
for the current CSS-first token architecture.

> Note: `border` means **outline strength** library-wide. Line placement between
> layout regions is `divider` (e.g. `nbSection divider="top"`); the line style
> between adjacent children of a layout primitive is `separator` (e.g.
> `nbStack separator="solid"`). The middle rung of every `size` scale is `md`
> (never `default`).

## Don't duplicate what a primitive already owns

If `nbSurface clip` already applies `overflow: hidden`, don't add `overflow-hidden`
in the class list. Keep Tailwind classes only for composition context the primitive
does not express.

## When to add a new input

Add an input only if it satisfies at least one of:

1. It maps to a reusable ng-brutalism design token.
2. It controls component anatomy.
3. It improves accessibility or keyboard behavior.
4. It expresses a common brutalist composition pattern.
5. It removes repeated code across many recipes without hiding layout intent.
6. It belongs to that primitive's responsibility.

Do **not** add an input if:

1. It only mirrors a Tailwind utility.
2. It is needed by only one recipe.
3. It controls arbitrary positioning.
4. It makes the component harder to understand.
5. It hides useful layout information from the user.
6. It belongs to another primitive (e.g. typography belongs to `nbText`).

> ng-brutalism should not replace Tailwind. It should make brutalist UI decisions
> reusable, consistent, and sharp. `nbText` should own expressive typography.
> Tailwind should remain the escape hatch for layout, responsiveness, and
> recipe-specific art direction.
>
> **Build loud. Stay sharp.**
