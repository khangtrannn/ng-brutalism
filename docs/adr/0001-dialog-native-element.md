# ADR 0001: Dialog built on native `<dialog>`, not Angular CDK Overlay

## Status
Accepted — 2026-05-17

## Context
The library needs a Dialog primitive for the v0.1.0 launch — the Showcase's contact form requires a modal, and Dialog is table-stakes for any serious UI library (neobrutalism.dev ships one). Three foundations were considered: native HTML `<dialog>`, Angular CDK Overlay + FocusTrap, hand-rolled portal + focus trap.

The library currently has **zero** dependencies on `@angular/cdk` and consists entirely of small directives over native elements (`input[nbInput]`, `input[nbCheckbox]`) plus compound `nb-*` components. Adding CDK would change the dependency story (~30 KB gzipped peer dep) and break the "tiny directives over native semantics" pattern that defines the library's design philosophy. At launch the library will have 12 components — small enough that "zero peer deps beyond Angular" is a defensible headline.

## Decision
Implement Dialog using the native `<dialog>` element. Defer the option to adopt CDK Overlay to a future major version if/when the library needs overlay-heavy primitives (Tooltip, Popover, Sheet, Dropdown), all of which are currently deferred past v0.1.0.

## Consequences
- **Bundle**: library remains `@angular/cdk`-free. "Zero peer deps beyond Angular" stays true as a launch-day claim.
- **Animation**: entry/exit animation uses `transition` + `@starting-style` (or a `data-state="open|closed"` toggle) rather than CDK's animation hooks.
- **SSR**: `dialog.showModal()` is browser-only. The Dialog component must defer the imperative call with `afterNextRender()` or an `isPlatformBrowser` check. An SSR smoke test is required as part of the Dialog test suite — render the Showcase contact section in SSR mode and assert no exceptions.
- **Future roadmap risk**: if the library later adds Tooltip / Popover / Sheet / Dropdown, they would all want CDK Overlay for positioning math, stacking, and animation coordination. Dialog would likely be rebuilt on CDK at that point for behavioral consistency — a breaking change scoped to a major version bump (v1.0 → v2.0 or v0.x → v0.(x+1) under the v0.x contract).
- **Scope**: stacking, anchored variants, and non-centered positioning are out of scope at v0.1.0. Pure centered modal only.

## Alternatives considered
- **CDK Overlay**: rejected on bundle size, pattern break, and unnecessary feature ceiling for v0.1.0 scope (no positioning, no stacking, no anchored variants needed at launch).
- **Hand-rolled portal + focus trap**: rejected — focus trap is consistently misimplemented in hand-rolled solutions, and the browser provides a correct one for free via `<dialog>.showModal()`.
