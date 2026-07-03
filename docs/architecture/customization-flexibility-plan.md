# Customization Flexibility Plan — Radix-Inspired Extensions

> **Status:** Proposed (2026-06-30). No tracks started.
> **Context:** Audit comparing ng-brutalism architecture to Radix UI primitives
> identified four extensions that increase consumer customization flexibility
> without restructuring the library. All four fit the existing capability
> system and respect decisions frozen in `v0.3-refactor-plan.md`.

---

## 1. What triggered this session

v0.3 Track 1 closed the capability gap. Before the next round of primitives
ships, an architecture audit compared each ng-brutalism primitive against
Radix UI's customization surface (composition, polymorphism, controlled
state, data-attributes, token extensibility, a11y primitives, form
integration). The audit found the foundation is already Radix-shaped:
injection-token compounds, `data-state` attributes, public CSS custom
properties, native `<dialog>`, closed-enum variants reflected to data-attrs.

Four extensions surfaced as high-leverage and architecture-compatible. This
doc records them as proposed tracks.

---

## 2. What stays — confirmed by prior decisions

Recap from `v0.3-refactor-plan.md` §8 and §4 — these are not on the table:

- **Capability system architecture** stays as-is (five layers).
- **Pure composition (Fix B)** — primitives stay single-responsibility.
  No convenience inputs.
- **Recipe approach** — docs ship example compositions, library ships
  primitives only.
- **Native form elements** — `NbInput`, `NbTextarea`, `NbCheckbox`,
  `NbSelect` stay visual shells on native elements. **No
  `ControlValueAccessor`.** Signal Forms binds natively.
- **Injection-token + `data-state` pattern** for stateful components.
- **Public API naming** (tone/radius/shadow/border/gap/padding/separator)
  locked.

Anything below must honor these.

---

## 3. What's already Radix-shaped — don't change

| ng-brutalism today | Radix equivalent | Sample file |
|---|---|---|
| DI injection tokens for compound coordination | React Context provider | `NB_DIALOG`, `NB_ACCORDION` |
| `[attr.data-state]` reflected on host | `data-state` attribute | `nb-accordion-item.ts`, `nb-dialog.ts`, `nb-select.ts` |
| Public CSS custom properties per component | unstyled + CSS vars | `--nb-button-bg`, `--nb-dialog-radius`, etc. |
| Closed-enum variants reflected to data-attrs | data-attribute API | `data-size`, `data-press`, `data-nb-tone` |
| Native `<dialog>` element | bespoke modal | `nb-dialog.ts` |
| Capability directives via `hostDirectives` | composable hooks | `core/capabilities/` |

---

## 4. Out of scope

- **`ControlValueAccessor` on form controls.** Settled by
  `v0.3-refactor-plan.md` §4.
- **Fully headless mode / behavior-only directives sold separately.**
  Brutalism is the product. Splitting behavior from style competes with
  Radix on Radix's turf and dilutes the value prop. Tracks A–D deliver
  Radix-style flexibility without that split.
- **Named `ng-content` slots inside compound parts.** Conflicts with pure
  composition (v0.3 §2). Consumers who need to reshape layout compose
  primitives directly; recipes absorb the verbosity.

---

## 5. Track A — Extensible tone registry via DI

### Problem
`data-nb-tone` resolves through a closed enum
(`warning|danger|neutral|...`). A consumer who wants a brand tone has to
either fork the library or write CSS that competes with token resolution
(brittle, breaks on capability updates).

### Proposal
Expose the tone registry as an injectable provider:

```ts
providers: [
  provideNbTones({
    brand: { bg: '#ff0', fg: '#000', border: '#000' },
    muted: { bg: '#eee', fg: '#444', border: '#888' },
  }),
]
```

- Custom tones merge with built-in tones at injection time.
- `NbToneCapability` reads from the registry instead of static
  `nbToneTokens()`.
- `[tone]="'brand'"` and `[attr.data-nb-tone]="'brand'"` work the same as
  built-in tones.
- Token shape matches `core/capabilities/nb-tone-capability.ts`.

### Acceptance criteria
- Built-in tones still work without any provider call.
- Consumer-defined tone renders correctly on button, badge, surface,
  callout (the four current `data-nb-tone` adopters).
- Components that don't import the tone capability don't pull the registry
  (tree-shake check).
- One docs recipe showing brand-tone setup end-to-end.

### Tradeoffs
- One DI lookup per component instance — negligible.
- Tone names become open-ended strings → no autocomplete unless consumer
  extends the type. Document this clearly.
- Provider-merged tones extend, do not override, built-ins. Open question §10.

### Dependencies
- None. Independent of Tracks B, C, D.

---

## 6. Track B — `asChild`-equivalent via `hostDirectives`

### Problem
`nbButton` selectors today: `button[nbButton], a[nbButton]`. Consumers who
need button styling/behavior on `[routerLink]` containers, custom elements,
or generic hosts have no path. The "consumer authors every element"
philosophy (v0.3 §5) is undermined by the fact that current primitives
restrict the element they attach to.

### Proposal
Promote pure-visual primitives from component selectors to standalone
directives that any host can adopt via `hostDirectives`:

```ts
@Component({
  selector: 'my-fancy-router-button',
  hostDirectives: [{
    directive: NbButtonStyleDirective,
    inputs: ['tone', 'size', 'press', 'fullWidth'],
  }],
  template: `<ng-content/>`,
})
```

- Keep `[nbButton]` on `button|a` for the happy path (one-line consumer
  ergonomics).
- Extract style/state logic into `NbButtonStyleDirective` with no selector
  restriction.
- Same data-attributes, CSS variables, capability inputs.
- First adopters: `NbButton`, `NbChip`, `NbSurface`, `NbBadge`. Expand to
  others if the pattern lands.

### Acceptance criteria
- `<a [routerLink]>` with `nbButton` works exactly as today.
- Consumer can attach `NbButtonStyleDirective` to any element host and get
  identical visuals.
- No regression on existing selector behavior.
- Docs recipe: routerLink wrapper inheriting button visuals.
- A11y guidance: when attaching to non-native hosts, consumer is
  responsible for `role`/`tabindex`/keyboard. Documented explicitly.

### Tradeoffs
- Slight refactor per adopting primitive.
- Two ways to apply a primitive's visuals (selector vs hostDirectives) →
  more docs surface.
- ARIA correctness shifts to consumer on non-native hosts; this is
  inherent to the `asChild` pattern in Radix too.

### Dependencies
- None. Independent of A, C, D.

---

## 7. Track C — Controlled + uncontrolled state symmetry

### Problem
`NbAccordion`, `NbSelect`, `NbDialog` (open state), and the upcoming
`NbTabs` use `model()` exclusively — consumer MUST own state. Radix's
contract is `value`/`defaultValue` symmetry: controlled when `value` is
bound, uncontrolled otherwise. Today the simplest "just show me a working
accordion" demo requires consumer state plumbing.

### Proposal
Introduce a `nbControllableSignal` helper in `core/`:

```ts
const open = nbControllableSignal({
  value: this.open,            // input<boolean | undefined>
  defaultValue: this.defaultOpen, // input<boolean>
  onChange: this.openChange,   // output<boolean>
});
```

- If `value` is bound, runs controlled (mirror Radix).
- If only `defaultValue` is set, runs uncontrolled with internal signal.
- `change` event fires in both modes.
- Reads/writes are signal-shaped so existing template bindings keep working.

### Targets, in landing order
1. `NbAccordion` — `value` + `defaultValue`.
2. `NbDialog` — `open` + `defaultOpen`.
3. `NbSelect` — `value` + `defaultValue`; `open` + `defaultOpen`.
4. `NbTabs` — bake in from day one (this is why C should land before v0.3 Track 2).
5. `NbRating` — `value` + `defaultValue`.

### Acceptance criteria
- All five primitives support both modes with identical DX.
- Existing controlled consumers (`[(value)]="x"`) keep working unchanged.
- The helper has its own unit tests separate from the primitives.
- One docs recipe per primitive showing uncontrolled mode.

### Tradeoffs
- Doubles state-management surface per primitive.
- Migration is additive (`defaultValue` is new); no breaking change.
- Slightly more to test per primitive — mitigated by the shared helper.

### Dependencies
- Best landed **before** `NbTabs` (v0.3 Track 2) to avoid retrofit.

---

## 8. Track D — Lift a11y capabilities out of "deferred"

### Problem
ARIA is open-coded across components — `nb-select.ts` manages
focus/listbox manually, accordion triggers set `aria-expanded` inline,
there's no shared focus-trap, no roving-tabindex, no dismissable-layer
contract. `v0.3-refactor-plan.md` §9 deferred `NbFocusCapability` and
`NbDisabledCapability` "to the a11y chapter, post-Track 1." Track 1 is done.

### Proposal
Promote a11y to a first-class capability set:

| Capability | Purpose | First adopter |
|---|---|---|
| `NbFocusCapability` | Focus-visible ring tokens, focus-within, imperative focus helper | NbButton, NbInput, NbSelect |
| `NbDisabledCapability` | `aria-disabled` + `data-disabled` reflection, click suppression | All interactive primitives |
| `NbRovingTabindexDirective` | Single-tab-stop container (tablist, listbox, menubar) | NbSelect listbox, NbAccordion, NbTabs |
| `NbDismissableLayerDirective` | Escape + outside-click + focus-return contract | Future NbPopover/NbDropdown, NbDialog overlay layer |

### Acceptance criteria
- Each capability has unit tests independent of consuming primitives.
- One existing primitive migrated onto each capability before declaring
  it stable.
- Documented contract: which layer sets which ARIA attribute, so consumers
  who write their own primitives via Track B's `hostDirectives` path
  inherit the same a11y contract.

### Tradeoffs
- Touches almost every interactive primitive.
- Must avoid double-managing ARIA (capability vs template) during
  migration — same risk pattern as Track 1.
- Largest blast radius of the four tracks; do last.

### Dependencies
- `NbDismissableLayerDirective` is a prerequisite for non-dialog overlays
  (NbPopover, NbDropdown). Those primitives don't exist yet, so D can
  land alongside their introduction.

---

## 9. Phasing

```
A. Tones registry          — 1 PR, independent
B. asChild via hostDirectives — 1 PR, independent
C. Controllable signal      — 1 PR before NbTabs (v0.3 Track 2)
D. A11y capability set      — multi-PR, last
```

**Recommended order: C → A → B → D.**

- **C first** so it ships into NbTabs day one — avoids retrofit later.
- **A second** because it's small, high-leverage, unblocks consumer
  branding before the dev.to article lands.
- **B third** because it's the largest API surface change and benefits
  from C's helper being stable.
- **D last** because it touches the most surface and benefits from
  established patterns from A–C.

---

## 10. Open questions

- **Tone registry override semantics.** Provider-merged tones extend
  built-ins, or can they replace them? Lean: extend only — built-ins are
  the contract.
- **`NbButtonStyleDirective` naming.** Keep `[nbButton]` working as
  today, or unify under one name and deprecate the component selector?
  Lean: keep both. The selector is the happy path.
- **Where does `nbControllableSignal` live?** `core/` or per-component?
  Lean: `core/`, since it's pure logic and reusable.
- **Disabled-while-loading semantics.** Belongs in `NbDisabledCapability`
  or a separate `NbBusyCapability`? Defer until two primitives need it.

---

## Summary

```txt
A. Tones registry            — extensible tones via DI provider
B. asChild                   — hostDirectives lets any host adopt primitive visuals
C. Controlled + uncontrolled — value+defaultValue symmetry (Radix pattern)
D. A11y capabilities         — promote deferred work: focus/disabled/roving/dismissable

Out of scope:                — CVA, fully headless, named ng-content slots
Architecture changes:        — none. All four tracks fit the capability system.
```
