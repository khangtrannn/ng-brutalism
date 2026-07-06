# CONTEXT

Project-specific terminology for `ng-brutalism-workspace`. Update inline as terms resolve in conversation. Glossary only — no implementation details.

## Glossary

### Showcase
The portfolio site mounted at `/showcase/portfolio` inside `apps/docs`. Built using only `@ng-brutalism/ui` primitives as a real-world stress test of the library, and serves as the marketing demo for the v0.1.0 npm release. Content is the maintainer's actual portfolio (not a fictional persona or starter template).

### Docs deployment
The `apps/docs` site is live at `https://ngbrutalism.khangtran.dev` on
Cloudflare Pages. GitHub Actions runs the repo's `Deploy Docs` workflow,
builds the prerendered Analog output in `dist/apps/docs/analog/public/`, and
uploads it with Wrangler direct upload to the `ng-brutalism-docs` Pages
project. GitHub Pages is no longer the production host.

### Launch-blocker
A missing UI primitive whose absence would prevent the Showcase from being built at acceptable fidelity for the v0.1.0 npm announcement. Confirmed launch-blocker list (2026-05-17): Dialog, Textarea, Badge, Avatar. Sheet was considered and rejected (mobile hamburger menu cut from Showcase scope). Tooltip, Sonner/Toast, Navigation Menu, Skeleton are explicitly NOT launch-blockers and deferred to v0.2+.

### v0.x contract
Until the library publishes v1.0.0, the public API may change between minor versions (e.g., 0.1.x → 0.2.0 may break). Stated in README to set explicit expectations. v1.0.0 will only be cut when (a) the API has been stable for 6+ months, AND (b) at least one external user has reported issues — the signal it's actually stable, not just untouched.

### Vertical slice
The build approach for the Showcase phase: rough versions of all four new components (Dialog, Textarea, Badge, Avatar) are wired end-to-end into the Showcase before any single component is hardened. Catches API ergonomic issues before polish time is sunk. Dialog is built first within the slice to derisk SSR before easier components are tackled.

### Nb prefix
The library-wide TypeScript export prefix (`NbButton`, `NbCard`, etc.) and CSS variable prefix (`--nb-border`, `--nb-main`). Originally derived from "Neo-Brutalism"; now treated as an opaque brand token. With the package renamed to `@ng-brutalism/ui`, `Nb` reads as the initials of "ng-brutalism." Component selectors also use `nb-*` (e.g., `nb-card`) — formerly `neo-*`, renamed pre-v0.1.0 for cross-surface consistency.

### NbButton CSS variable override
`NbButton` composes `NbToneCapability`, which reflects `tone` as
`data-nb-tone`. Shared tone CSS maps that attribute to internal `--_nb-tone-*`
slots, and `nb-button.css` consumes those slots behind public hooks such as
`--nb-button-bg`, `--nb-button-fg`, and `--nb-button-border-color`. Scalar
inputs such as `radius`, `shadow`, and `border` write public component
variables (`--nb-button-radius`, `--nb-button-shadow`,
`--nb-button-border-width`) rather than final inline properties.

### CSS individual transform properties for animation
When replicating a Framer Motion `whileHover` that combines a persistent `scale` with a one-shot keyframe `rotate` array, use CSS individual transform properties — **not** the `transform` shorthand — so they stay independent:
- `transition: scale 200ms ease` on the base element + `scale: 1.1` on `:hover` → smooth scale that persists while hovered.
- A `@keyframes` block that animates only the `rotate` property (not `transform: rotate()`) → one-shot wiggle that doesn't interfere with scale.
Baking both into a single `transform` keyframe breaks the persistence: after the animation ends, `transform` resets to its default and the scale is lost.
