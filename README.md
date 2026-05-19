# ng-brutalism

Nx 20 integrated monorepo for the Angular 18 `@ng-neo-brutalism/ui` library
and its Analog docs app.

## Theming

Components follow an Angular Material–style approach so consumers can restyle them
without ever reaching for `!important`:

- **Zero-specificity defaults.** Each primitive ships its visual defaults inside a
  `:where([data-slot="…"])` rule, giving them specificity `0,0,0`. Any consumer
  class — Tailwind utility, custom class, anything — wins automatically.
- **Two-layer scoped tokens.** Each component declares its own scoped tokens
  (`--nb-button-bg`, `--nb-accordion-trigger-bg`, `--nb-dialog-content-bg`, …)
  that default to global theme tokens. Override the global to retheme the whole
  app; override the scoped token to restyle a single instance without leaking.
  See [`libs/ui/TOKENS.md`](libs/ui/TOKENS.md) for the full grammar.
- **Override via tokens or utilities — your call.**

```html
<!-- Utility override (no `!` needed) -->
<input nbInput class="h-12 bg-[#fbf1bf]" />

<!-- Scoped token override — affects this dialog only -->
<nb-dialog-content style="--nb-dialog-content-bg: var(--nb-field-bg);">…</nb-dialog-content>

<!-- Scoped token override — affects this button only, never leaks to children -->
<button nbButton style="--nb-button-bg: hotpink">Boom</button>
```

Size variants on `nbInput` / `nbTextarea` are driven by the `[data-size]`
attribute, so `size="lg"` works out of the box and an inline `h-12` still wins
when you want a one-off.

## Migration notes (pre-1.0)

The token rollout (`libs/ui/TOKENS-ROLLOUT.md`) introduced breaking changes.
Pre-1.0, no aliases are kept.

- **Button variants** — `reverse` and `noShadow` are removed. Use the new
  `shadow` input instead: `variant="reverse"` → `shadow="reverse"`,
  `variant="noShadow"` → `shadow="none"`. Six new variants land in their place:
  `primary | secondary | accent | danger | success | warning`. The default
  `variant="default"` now renders `var(--nb-main)` (yellow), not white.
- **Badge variants** — `destructive` renamed to `danger` for consistency with
  the button variant union.
- **Input-group tokens** renamed to follow the `--nb-<component>-<part>-<prop>`
  grammar:
  - `--nb-input-addon-bg` → `--nb-input-group-addon-bg`
  - `--nb-input-prefix-bg` → `--nb-input-group-prefix-bg`
  - New: `--nb-input-group-suffix-bg` (defaults to `--nb-input-group-addon-bg`).
- **Input/textarea/select background token** — `--nb-input-background` →
  `--nb-input-bg`. Textarea adds `--nb-textarea-bg` (defaults to
  `--nb-input-bg`); select adds `--nb-select-bg`.
- **Dialog description token** — `--nb-dialog-description-color` →
  `--nb-dialog-description-fg`.
- **`--nb-yellow` removed from the lib.** It was never a design-system token,
  just a palette color the docs app uses for chrome. If you were relying on it,
  declare it yourself or pick another color.

## Commands

- `pnpm build:ui` builds the publishable UI package.
- `pnpm build:docs` builds the Analog docs app.
- `pnpm serve:docs` serves the docs app locally.
- `pnpm test` runs affected tests.
- `pnpm lint` runs affected lint targets.
