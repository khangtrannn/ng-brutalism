# ADR 0002: Model-based form controls, no forms runtime dependency

> **SUPERSEDED — 2026-07-15.** Consolidated into `docs/adr/0004-forms-support.md`, the single
> source of truth for forms support. Kept for historical record only; claims below (notably
> "signal forms is experimental" and the deferred compat entry point) are outdated.

## Status
Superseded by ADR 0004. Originally accepted — 2026-07-12 (decided in v0.3 planning interview; supersedes the unreleased CVA work in `55f12d2`)

## Context
Angular 22 shipped with signal forms (`@angular/forms/signals`) as an **experimental** API. Its control contract, `FormValueControl`, is structural and type-only: a component participates by exposing `value = model<T>()` plus optional members (`disabled`, `invalid`, `required`, `touched`, …) that the `Field`/`Control` directive drives automatically. No runtime import from `@angular/forms` is needed on the control side.

Meanwhile the library's forms integration was mid-flight and **unpublished**: `NbSelect` gained a full `ControlValueAccessor` implementation and `NbField` gained `NgControl` content-query auto-detection after the v0.2.0 release (verified against the `v0.2.0` tag — neither shipped). `NbSelect` has exposed `value = model(...)` publicly since v0.2.0, so the model-based API already *is* the published API.

Three files imported `@angular/forms` at runtime: `nb-select.ts` (NgControl + CVA), `nb-field.ts` (NgControl), and their shared helper `core/control-status.ts` — two parallel copies of NgControl status tracking.

Pre-1.0 policy: clean structure over backward compatibility (but nothing here breaks the published v0.2 surface anyway).

## Decision
The library's form controls are **model-based and forms-runtime-free**. They never import `@angular/forms` at runtime; every forms-related member is a plain signal input/output that works standalone, and that signal forms happens to drive automatically.

1. **`NbSelect`**: delete the CVA implementation (`writeValue`/`registerOnChange`/`registerOnTouched`/`setDisabledState`, `NgControl` injection). Conform to `FormValueControl` via the **good-citizen subset**:
   - `value = model()` — required member (already shipped in v0.2.0)
   - `disabled = input()` — already shipped
   - `touched` output — emit on trigger blur / dropdown close, so signal-forms error-timing UX works
   - `invalid = input(false)` — signal forms pushes validity in; reflected as `data-invalid` + `aria-invalid`
   - `required = input(false)` — reflected as `aria-required`
   - Skipped as not meaningful for a select or premature: `errors`, `readonly`, `hidden`, `pending`, `disabledReasons`, `name`, `min`/`max`/`minLength`/`maxLength`/`pattern`.
   - Conformance is asserted **structurally in a spec** (`const _check: FormValueControl<…> = …`), *not* via an `implements` clause on the exported class — keeps `@angular/forms` types out of the published `.d.ts`.
2. **`NbField`**: delete the `NgControl` content-query; replace with explicit `invalid` and `required` inputs feeding the existing `NbFieldContext` (`controlId` / `describedBy` / `invalid` / `required`). The NB_FIELD DI context architecture is unchanged — consumers (`nbInput`, `nbTextarea`, `nbLabel`, `NbSelect`) keep working.
3. **Precedence** when a control sits inside `nb-field`: either source marks invalid — `invalid() || (field?.invalid() ?? false)`; same for `required`.
4. **Delete `core/control-status.ts`** (only consumers were the two files above) and **drop `@angular/forms` from peerDependencies**.
5. This member set is the **house contract** for all future interactive controls (radio group, switch, slider, combobox…): document once, reuse everywhere.

## Consequences
- **Works three ways at once**: plain `[(value)]` two-way binding (no forms system), signal forms `[control]` on ng22+, and manual bindings from classic reactive forms (`[value]`, `[invalid]="ctrl.invalid && ctrl.touched"`).
- **Not supported**: `formControlName` / `ngModel` directly on `NbSelect`. Native-element directives (`nbInput`, `nbCheckbox`, `nbTextarea`, `nbSelect` on `<select>`) are unaffected — native elements work with every forms system including classic ones.
- **Escape hatch stays open, deferred**: adding a CVA bridge later (e.g. `@ng-brutalism/ui/forms-compat` secondary entry point) is non-breaking; removing a shipped CVA later would have been breaking. This asymmetry is why the CVA goes now, pre-publication.
- **Peer range freedom**: `model()` is stable since v17.2 and no experimental runtime is imported, so the package supports `^21.0.0 || ^22.0.0` — the experimental signal-forms runtime lives only in the consumer's app.
- **Experimental-API tripwire**: `FormValueControl` member names come from an experimental interface. The structural conformance spec fails loudly at build time if Angular renames members in a 22.x minor — instead of users' UX failing silently.
- **Dependency headline strengthens**: after ADR 0001 kept `@angular/cdk` out, this removes `@angular/forms` — peer deps shrink to `@angular/core` + `@angular/common` (+ optional tailwind).
