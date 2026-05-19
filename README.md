# ng-brutalism

Nx 20 integrated monorepo for the Angular 18 `@ng-neo-brutalism/ui` library
and its Analog docs app.

## Theming

Components follow an Angular Material–style approach so consumers can restyle them
without ever reaching for `!important`:

- **Zero-specificity defaults.** Each primitive ships its visual defaults inside a
  `:where([data-slot="…"])` rule, giving them specificity `0,0,0`. Any consumer
  class — Tailwind utility, custom class, anything — wins automatically.
- **CSS custom property tokens.** Properties users routinely customize are
  exposed as variables with sensible fallbacks, e.g.:
  - `--nb-field-bg`, `--nb-input-bg`
  - `--nb-dialog-content-bg`, `--nb-dialog-actions-bg`
  - `--nb-dialog-description-color`
- **Override via tokens or utilities — your call.**

```html
<!-- Utility override (no `!` needed) -->
<input nbInput class="h-12 bg-[#fbf1bf]" />

<!-- Token override -->
<nb-dialog-content style="--nb-dialog-content-bg: var(--nb-field-bg);">…</nb-dialog-content>
```

Size variants on `nbInput` / `nbTextarea` are driven by the `[data-size]`
attribute, so `size="lg"` works out of the box and an inline `h-12` still wins
when you want a one-off.

## Commands

- `pnpm build:ui` builds the publishable UI package.
- `pnpm build:docs` builds the Analog docs app.
- `pnpm serve:docs` serves the docs app locally.
- `pnpm test` runs affected tests.
- `pnpm lint` runs affected lint targets.
