# ng-brutalism + Tailwind — Composition Philosophy

ng-brutalism is intentionally **not** a replacement for Tailwind. The two own
different layers, and a healthy recipe uses all three of the following without
blurring their responsibilities.

## The three layers

| Layer | Owns | Examples |
|---|---|---|
| **ng-brutalism primitives** | Brutalist visual grammar + component anatomy | `tone`, `radius`, `shadow`, `border`, `variant`, `state`, layout `gap`/`padding`/`align`/`justify`, interaction & accessibility behavior |
| **`nbText`** (and `nbDisplay`) | Expressive typography | `size`, `weight`, `tracking`, `transform`, `leading`, `measure`, underline treatment |
| **Tailwind** | Page-specific layout & art direction | `relative`, `absolute`, `z-*`, `w-full`, `max-w-*`, `mx-auto`, `hidden sm:block`, `top-[25%]`, `size-*`, `flex-1`, arbitrary geometry |

> Use ng-brutalism inputs for visual grammar.
> Use `nbText` for custom typography.
> Use Tailwind for composition, responsive tweaks, and recipe-specific art direction.

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

`size` stays on `nbButton` (it controls box height/padding/density — anatomy). But
`fontSize`, `transform`, `tracking`, and expressive `weight` belong on a nested
`nbText`, not on the button. Default typography for ordinary buttons is fine:

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
