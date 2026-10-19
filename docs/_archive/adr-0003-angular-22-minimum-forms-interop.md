# ADR 0003: Angular 22 minimum; classic-forms support via verified interop recipes

> **SUPERSEDED — 2026-07-15.** Consolidated into `docs/adr/0004-forms-support.md`, the single
> source of truth for forms support. Kept for historical record only; the "recipes, not
> directive support" position below is outdated — classic forms are now supported via the
> `forms-compat` bridge.

## Status
Superseded by ADR 0004. Originally accepted — 2026-07-14 (v0.3 pre-publish stress-test of ADR 0002; supersedes two of its consequences, re-affirms its core decision)

## Context
Before publishing v0.3.0, ADR 0002's model-based approach was stress-tested against how established libraries (Angular Material) support template-driven, reactive, and signal forms. The findings were verified against the shipped `@angular/forms` code (22.0.6 stable and 22.1.0-next.5), not blog posts — several widely-cited articles overstate the interop:

1. **No automatic classic-forms bridge exists.** The classic forms runtime (`fesm2022/forms.mjs`) contains zero references to `FormValueControl` in both 22.0.6 and 22.1.0-next.5, and no adapter exposes a `FormValueControl` component as a CVA. `formControlName` / `ngModel` cannot bind directly to a `FormValueControl` component in any published Angular.
2. **What actually ships in Angular 22:**
   - Signal forms' `[formField]` directive fully drives `FormValueControl` components — and also legacy CVA components (this is how Material participates in signal forms, not the reverse).
   - `@angular/forms/signals/compat` (`@publicApi 22.0`) provides `SignalFormControl` (a signal-forms-backed `FormControl` usable inside a classic `FormGroup`; the custom control binds via `[formField]="ctrl.fieldTree"`, siblings keep `formControlName`, value/touched/validity propagate) and `compatForm` (wraps existing `FormControl`s into a signal-forms field tree).
3. **`NbSelect`'s member set matches `FormUiControl` exactly** (`value` model, `disabled`/`invalid`/`required` inputs, `touch: OutputRef<void>` — the contract member is named `touch`, not `touched`).
4. Material's CVA-everywhere design is the legacy path it is locked into, not the direction the framework points new libraries at.

v0.3.0 is finalized in-repo but unpublished — the last cheap moment to change the support floor.

## Decision
1. **Re-affirm ADR 0002.** Controls stay model-based and forms-runtime-free. No CVA, no `@angular/forms` peer/runtime dependency.
2. **Require Angular 22**: peerDependencies narrow from `^21.0.0 || ^22.0.0` to `^22.0.0` (pre-1.0 simplicity; the entire classic-forms mixing story — `signals/compat` — is `@publicApi 22.0`).
3. **Classic-forms support is documented as verified recipes, not directive support:**
   - Signal forms: `[formField]` — the native path.
   - Reactive forms: `SignalFormControl` inside the existing `FormGroup` + `[formField]="ctrl.fieldTree"` on the control (parent form untouched).
   - Template-driven: manual bindings (`[(value)]`, `[invalid]`), or the native-element directives (`nbInput`, `nbSelect` on `<select>`, `nbCheckbox`), which work with every forms system.
4. **Behavioral tripwire**: `select-forms.spec.ts` mounts `NbSelect` under `[formField]` and under a `SignalFormControl`-in-`FormGroup` and asserts value/disabled/touched/validity flow. Complements the type-level `forms-contract-check`; a behavioral change in an experimental 22.x minor fails our CI before consumers' apps.

## Superseded consequences of ADR 0002
- ~~"Peer range freedom … the package supports `^21.0.0 || ^22.0.0`"~~ → `^22.0.0`.
- ~~"manual bindings from classic reactive forms"~~ as the only reactive-forms story → the `SignalFormControl` recipe is the supported reactive-forms path (manual bindings remain valid).

## Consequences
- `tools/min-version-check` flips meaning: it no longer guards the ng21 floor (fail ≥ 22.0.0) but the ng22.0 floor (fail > 22.0.0), so no API stamping a higher `minVersion` leaks into the build.
- The `smoke:ui:ng21` CI leg is removed; `smoke:ui:ng22` remains the consumer-shaped gate.
- Docs forms pages open with a support matrix (system × what works) and state that the consumer's forms runtime drives our controls — the library still has no `@angular/forms` dependency.
- The escape hatch stays open: if direct `formControlName`/`ngModel` binding to `FormValueControl` ever lands upstream, consumers get it for free; if demand appears sooner, a `forms-compat` CVA entry point remains addable without breaking changes.
