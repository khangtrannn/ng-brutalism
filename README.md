# ng-brutalism

Nx monorepo for [`@ng-brutalism/ui`](libs/ui/README.md) — a neo-brutalist Angular
component library — and its Analog-powered docs app.

- **`libs/ui`** — the publishable component library (Angular 21, Tailwind v4).
- **`apps/docs`** — the Analog docs site that doubles as a live playground.

## Install

```bash
pnpm add @ng-brutalism/ui
```

```css
/* src/styles.css */
@import '@ng-brutalism/ui/styles.css';
@import '@ng-brutalism/ui/theme.css';
```

```ts
import { NbButton } from '@ng-brutalism/ui';
```

Requires Angular 21+ and Tailwind CSS v4. Full consumer guide: [`libs/ui/README.md`](libs/ui/README.md).

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

## Breaking changes

Pre-1.0 — no aliases are kept. See [`libs/ui/TOKENS-ROLLOUT.md`](libs/ui/TOKENS-ROLLOUT.md)
for the token-rollout migration notes.

## Commands

- `pnpm build:ui` builds the publishable UI package.
- `pnpm build:docs` builds the Analog docs app.
- `pnpm serve:docs` serves the docs app locally.
- `pnpm test` runs affected tests.
- `pnpm lint` runs affected lint targets.
