# ADR 0004: Forms support — model-based core + `forms-compat` classic bridge

## Status
Accepted — 2026-07-15 (adoption-risk stress-test of the v0.3 forms architecture).
**Consolidates and supersedes ADR 0002 and ADR 0003** (archived under `docs/_archive/`); this
file is the single source of truth for forms support. All still-relevant verified facts from
those ADRs are restated here — reading the archived files is never required.

## Context

### How we got here (condensed history)
- **ADR 0002 (2026-07-12):** deleted the unpublished CVA/`NgControl` code from `NbSelect`/`NbField`,
  made controls model-based and forms-runtime-free, dropped `@angular/forms` from peerDependencies.
  A CVA compat entry point was named as an escape hatch and deliberately deferred.
- **ADR 0003 (2026-07-14):** verified the interop reality against shipped `@angular/forms`, narrowed
  peers to `^22.0.0`, documented classic-forms support as `SignalFormControl` recipes.
- **This ADR (2026-07-15):** stress-tested the decision against adoption risk. Outcome: the core
  survives unchanged; the deferred escape hatch is exercised now, pre-publication.

### Verified facts (installed `@angular/forms@22.0.6`, read from source — not blog posts)
1. **Signal forms is stable in Angular 22.** `FormValueControl`, `FormUiControl`, `form()`,
   `[formField]`, and `@angular/forms/signals/compat` are all `@publicApi`. The only remaining
   `@experimental` marker in `types/signals.d.ts` is a WebMCP tool provider. Earlier
   "experimental" framing (measured against 21.2.9, 25 markers) is obsolete — the API is
   semver-protected.
2. **No automatic classic-forms bridge exists.** The classic runtime (`fesm2022/forms.mjs`) has
   zero references to `FormValueControl`; `formControlName`/`ngModel` cannot drive a
   `FormValueControl` component directly. Without a CVA, that binding fails with the cryptic
   `NG01203: No value accessor` error.
3. **`[formField]` binding precedence** (`ɵngControlCreate` in `fesm2022/signals.mjs`):
   CVA → custom control (`value`/`checked` model) → native element. Even on the CVA path the
   runtime still drives the component's declared inputs (`invalid`, `required`, …) via
   `setInputOnDirectives`, and `InteropNgControl` exists specifically so Material-style CVA
   components work under `[formField]`.
4. **Angular Material implements only the legacy contract** (CVA + injected `NgControl` +
   `ErrorStateMatcher`) and participates in signal forms because the framework bridges *down*
   to CVA — not because Material adopted `FormValueControl`. That is the back-compat path it is
   locked into, not the direction new libraries are pointed at.

### Adoption reality
- Target adopter: **greenfield Angular 22 apps** — but LLM codegen and years of tutorials will
  keep producing `formControlName` for a long time. The failure mode is NG01203 at the
  evaluation moment; that user churns silently instead of filing the issue "demand-driven"
  deferral was waiting for.
- Custom-control blast radius today is exactly `NbSelect` (+ `NbField` orchestration). The
  native-element directives (`nbInput`, `nbTextarea`, `nbCheckbox`, `nbSelect` on `<select>`)
  work with every forms system already.

## Decision

### 1. Core stays model-based and forms-runtime-free (re-affirmed)
The main entry point never imports `@angular/forms` at runtime. The **house contract** for every
custom interactive control (today `NbSelect`; future radio group, switch, combobox, …):

- `value = model<T>()` — the one required `FormValueControl` member
- `disabled = input(false)`, `invalid = input(false)`, `required = input(false)`
- `touch` output (`OutputRef<void>` — the signal-forms member is named `touch`, not `touched`)
- Effective state ORs all sources: own input ‖ field context ‖ compat bridge (below)
- Conformance asserted structurally in a spec (`const _check: FormValueControl<…> = …`), never
  via an `implements` clause — keeps `@angular/forms` types out of the published `.d.ts`.
  Enforced by `forms-contract-check` (scoped `tsc`; Vitest does not type-check).

### 2. Peer floor stays `^22.0.0`
Signal forms (`[formField]`) is the headline path and is 22-only; pre-1.0 we support a single
major. The compat bridge below would technically run on ng21, but serving a secondary audience
costs a second smoke-test CI leg and dual-major testing. Widening a peer range later is
non-breaking; narrowing is not.

### 3. New secondary entry point `@ng-brutalism/ui/forms-compat` — ships in v0.3.0
Classic-forms support becomes real directive support, not recipes. The bridge lives outside the
main entry point so only its importers pay the `@angular/forms` dependency
(`peerDependenciesMeta: { "@angular/forms": { "optional": true } }`).

- **Control bridge** — directive on `nb-select[formControl]`, `nb-select[formControlName]`,
  `nb-select[ngModel]`, using Material's pattern: inject `NgControl` `@Self() @Optional()` and
  assign `ngControl.valueAccessor = this` (no `NG_VALUE_ACCESSOR` provider → no circular DI,
  and free access to control status). It bridges:
  - `writeValue` → `value` model (echo-suppressed so programmatic writes don't re-emit)
  - `value` changes → `onChange`; `touch` output → `onTouched`
  - `setDisabledState` and control status → `@internal` writable hooks on `NbSelect`
    (input signals are not writable from outside; the hooks OR into effective state)
  - **Status mirroring:** invalid = `ctrl.invalid && (ctrl.touched || parentForm.submitted)` by
    default, matching Angular Material's classic-forms timing. Override
    `NB_ERROR_STATE_MATCHER` from `@ng-brutalism/ui/forms-compat` for project-specific timing.
    A manual `[invalid]` binding still ORs in for custom timing.
- **Field bridge** — directive on `nb-field`: content-queries `NgControl` and drives the
  existing `NbFieldContext` `invalid`/`required` with the same timing, so `nb-field-error`
  visibility works automatically. Because the query is generic, it also covers native-element
  controls (`nbInput` etc. with `formControlName`) — closing their error-message gap for free.
- **No silent downgrade:** the CVA only exists when a classic directive matches, so
  `[formField]` always takes the native `FormValueControl` path (per verified fact 3, CVA would
  win if present — it never is under signal forms).
- **House contract extension:** every future custom control ships a companion bridge directive
  in `forms-compat`, built on a shared base helper.

### 4. Support matrix (the single story docs must tell)

| Forms system | Binding | Path |
|---|---|---|
| Signal forms (ng22) | `[formField]` | Native `FormValueControl` — headline path |
| Reactive forms | `formControl` / `formControlName` | `forms-compat` bridge (import once); `SignalFormControl` recipe remains a valid alternative |
| Template-driven | `[(ngModel)]` | `forms-compat` bridge |
| No forms system | `[(value)]` | Plain model two-way binding |
| Any system | native-element directives | Work everywhere, no bridge needed |

### 5. Gates
- Existing: structural conformance spec + `forms-contract-check` + behavioral `[formField]` and
  `SignalFormControl` specs in `select-forms.spec.ts` (tripwires against upstream behavioral
  change — still useful post-stabilization, now guarding semver reality rather than an
  experimental API).
- New: behavioral bridge specs mounting `nb-select` under `formControlName` and `[(ngModel)]`
  (value both ways, disabled, touched, invalid-timing) and `nb-field` error visibility under a
  classic control.
- Docs: forms pages open with the support matrix above; **drop the "experimental" callouts**
  for signal forms (stable at 22).

## Consequences
- All four binding styles work; the core keeps the "no `@angular/forms` dependency" headline;
  peer deps of the main entry stay `@angular/core` + `@angular/common`.
- v0.3.0 scope grows by the `forms-compat` entry point + specs + docs-matrix update; CHANGELOG
  `[0.3.0]` and README gain the classic-forms support claim (only after the bridge specs are
  green — same claims-follow-verification rule as ADR 0003's interop work).
- Maintenance cost accepted: echo-suppression/reentrancy guards in the bridge, one small bridge
  per future custom control, `@internal` hooks on controls for bridge cooperation.
- If direct `formControlName` → `FormValueControl` binding ever lands upstream, the bridge
  becomes deletable dead weight in a major — acceptable; it is small and isolated.
- ADR 0002/0003 are archived; their numbering is retired, not reused. Anything they claimed
  that contradicts this file is obsolete.
