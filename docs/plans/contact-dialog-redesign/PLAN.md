# Contact Us Dialog — Redesign Plan

**Status:** Phase A complete. Phase B + Phases 1–5 pending.
**Demo target:** [`apps/docs/src/app/pages/components/dialog.page.ts`](../../../apps/docs/src/app/pages/components/dialog.page.ts)
**Library targets:** [`libs/ui/src/lib/input-group/`](../../../libs/ui/src/lib/input-group/) **(✅ created)**, [`libs/ui/src/lib/select/`](../../../libs/ui/src/lib/select/) **(new — pending)**
**Prior-art reference:** Angular Material's `MatFormField` + `MatPrefix`/`MatSuffix` and `MatSelect` (see §A.2.1, §B.2.1)
**Reference screenshot:** [`./reference.png`](./reference.png)

---

## Locked decisions (from grilling session)

These supersede or refine the original §0.4 decisions. They were reached one-by-one in a /grill-me session and are not up for debate without explicit user instruction.

| # | Decision | Where it shows up |
|---|---|---|
| Q1 | **Inner field gets `bg-transparent` inside `<nb-input-group>`** so the group owns the surface. Standalone usage keeps the lib's default yellow `--nb-input-background` for no-regression. | `[nbInput]` / `[nbTextarea]` / `[nbSelect]` computed classes |
| Q2 | **New lib token `--nb-input-addon-bg: #c4a8ff`** added to `libs/ui/src/lib/styles/theme.css`. `[nbInputPrefix]` / `[nbInputSuffix]` use `bg-(--nb-input-addon-bg)`. **No `tone` input** — every addon is purple. (YAGNI; revisit if a second variant is needed.) | `theme.css` `:root`; prefix/suffix directives |
| Q3 | **Close `×` button color → yellow** via `style="--nb-button-bg: #ffd92e; --nb-button-fg: #000;"` matching the Send button. (Screenshot shows yellow, plan's "kept" claim was wrong.) | §1.2, §1.3 |
| Q4 | **`select[nbSelect]` shape rules added to `styles.css :where(...)`**: extend the existing zero-specificity selectors to include `select[nbSelect]` for height/padding/font-size/background. Chevron + `appearance-none` + `pr-10` stay in the directive's `nbClass`. v1 select supports `size='default'` only. | Phase B |
| Q5 | **Focus ring lives on `<nb-input-group>` via `:focus-within`**, inner field's `focus-visible:ring*` suppressed when inside a group. Ensures one focus indicator around the whole unit. | Group host classes; `[nbInput]` / `[nbTextarea]` / `[nbSelect]` group branch |
| Q6 | **Subject options**: `General Inquiry`, `Project Proposal`, `Bug Report`, `Other`. Placeholder: `What is this regarding?` (disabled, value=""). | Phase 2 |
| Q7 | **Footer purple shield box → hand-rolled inline** (no shared primitive). Single docs site of duplication, not worth extracting. | Phase 3 |
| Q8 | §2.1 import list correction: **`NbInputGroup, NbInputPrefix, NbSelect`** (not the stray `NbInputAddon`). `NbInputSuffix` only if used (the dialog doesn't use it). | §2.1 |
| Q9 | **Modern Angular naming**: classes `NbInputGroup` / `NbInputPrefix` / `NbInputSuffix` / `NbSelect` — **no `Component`/`Directive` suffix, no alias dance**. Accordion/dialog stay as-is (separate PR if migrated). **Eslint config updated** to drop `component-class-suffix` + `directive-class-suffix` rules globally + removed redundant button override. | `eslint.config.js`; all new files |
| Q10 | **Demo stays placeholder-only** — no Reactive Forms wiring in this PR. The "Reactive Forms for free" claim for `[nbSelect]` lives in API docs, not in the displayed source. | Phases 1–4 |
| Q11 | **Select placeholder muting via `:has()` (Tailwind `has-[option:disabled:checked]:text-gray-400`)** — no JS, accepts ~95% browser baseline as graceful degradation. | Phase B |
| Q12 | **Header decoration cluster: F3 full fidelity + hand-coded SVG.** Single composite SVG, three-layer stack (burst marks → coral blob → speech bubble), ~80–100px wide, sits in the existing absolute `right-24 top-12` block to the right of the `*` + zigzag. | Phase 1 |
| Q13 | **Form-field icons: inline Lucide paths**, no npm dependency. Stroke-width 2.5px, `currentColor` for inheritance. Icons: `user`, `mail`, `message-square`, `pencil`, `shield`, `arrow-right`. | Phase 2, Phase 3 |
| Q14 | **Commit cadence:** Sequential per-phase verification. Validate Phase A inline in dialog page (no throwaway file). Three atomic commits at the end. Commit 3 bundles template + source-string sync. | §5.5 |

### Implementation defaults (committed; no longer up for grilling)
- `[nbInput].classes` / `[nbTextarea].classes` migrate from plain string → `computed()` signal. Host binding becomes `'[class]': 'classes()'`.
- Group's `:focus-within` Tailwind classes match the current input ring: `ring-2 ring-(--nb-border) ring-offset-2`.
- Prefix/suffix directives have `w-12` baked in (matches the existing `h-12` form inputs). Footer privacy box is hand-rolled at its own size (~`h-10 w-10` per §3.3).
- The uncommitted `apps/docs/src/app/pages/components/examples/job-listing-card.example.ts` change in `git status` is **not part of this work** — staging will be selective.
- No unit tests for `nb-input-group` / `[nbSelect]` in this PR. (The single existing spec file `accordion.component.spec.ts` is broken from a `neo-` → `nb-` rename and was never enforced; matching that baseline.)

### Out of scope (no question)
- No backport of `nb-input-group` to existing demos.
- No `NbFormFieldControl` interface (see §A.6).
- No `<nb-select-rich>` overlay variant.
- No fixing the broken `accordion.component.spec.ts`.
- Dark mode for the dialog is not explicitly designed; falls back to existing theme tokens (`--nb-surface` etc.) without bespoke work.

---

## Phase A — ✅ DONE

Build clean (`pnpm nx build ui`), lint clean (`pnpm nx lint ui`). Files shipped:

| File | Status |
|---|---|
| `libs/ui/src/lib/input-group/input-group.types.ts` | **new** — 3 DI tokens + `NbInputGroupContext` interface |
| `libs/ui/src/lib/input-group/input-group.ts` | **new** — `NbInputGroup` component, `bg-(--nb-surface)`, `:focus-within:` ring |
| `libs/ui/src/lib/input-group/input-group-prefix.ts` | **new** — `NbInputPrefix` directive, `align: 'center' \| 'stretch'`, `w-12` square box |
| `libs/ui/src/lib/input-group/input-group-suffix.ts` | **new** — `NbInputSuffix` directive, symmetric to prefix |
| `libs/ui/src/lib/input-group/index.ts` | **new** — barrel |
| `libs/ui/src/lib/input/input.directive.ts` | **modified** — `inject(NB_INPUT_GROUP, {optional:true})` + `computed()` classes; standalone branch produces identical class set to original |
| `libs/ui/src/lib/textarea/textarea.directive.ts` | **modified** — same pattern as input |
| `libs/ui/src/lib/styles/theme.css` | **modified** — added `--nb-input-addon-bg: #c4a8ff` |
| `libs/ui/src/index.ts` | **modified** — re-exports `NbInputGroup, NbInputPrefix, NbInputSuffix` + types |
| `eslint.config.js` | **modified** — removed `component-class-suffix` + `directive-class-suffix` rules + button override (Q9) |

**Visual verification deferred to Phase 2** — the §A.5 checks (focus ring, single shadow, prefix stretch) all overlap §2.4 when the dialog redesign actually consumes the group. No throwaway test page created; if a regression surfaces in Phase 2 that traces to Phase A, fix at the source.

**Phase A commits (held until everything signs off):** Group all Phase A changes into commit 1: `feat(ui): add nb-input-group with nbInputPrefix and nbInputSuffix`. The eslint config change goes with this commit (justified in the commit body as needed for the locked naming convention).

---

## Phase 0 — Audit

### 0.1 Current implementation audit (demo)

The "With Form" dialog demo lives in **one file** and is duplicated in two places that must stay in sync:

| What | Where |
|---|---|
| Live preview markup | [`dialog.page.ts`](../../../apps/docs/src/app/pages/components/dialog.page.ts) lines 121–205 (`#withFormDialog`) |
| Displayed source string | same file, `withFormExampleCode` lines 296–358 |
| Component imports | same file, lines 21–34 |

### 0.2 Target design audit (per reference screenshot)

| Region | New visual elements |
|---|---|
| Header (yellow) | • `LET'S TALK` purple badge<br>• Title `Send us a message`<br>• **Purple wavy underline** beneath the title (new)<br>• Longer description: `Fill in the form below and we'll get back to you as soon as possible.`<br>• Decorations: black `*` + pink zigzag + **white speech-bubble on coral blob with burst marks** (new)<br>• `×` close button top-right (kept) |
| Body (**white**, not yellow) | • Each form field has a **purple icon-prefix box** butted against the input<br>• Name (person) + Email (envelope) — 2-col on `≥sm`<br>• **Subject = real select** (chat-bubble icon + chevron-down)<br>• Message (pencil) — textarea, icon box stretches full height |
| Footer (white) | • **Left:** shield icon (purple box) + two-line privacy text<br>• Vertical divider, small black zigzag squiggle<br>• `Cancel` (neutral) + **`Send Message →`** (yellow, with arrow icon) |

### 0.3 Library primitive audit

Inventoried `libs/ui/src/lib`: `accordion`, `avatar`, `badge`, `button`, `card`, `checkbox`, `core`, `dialog`, `image-card`, `input`, `label`, `marquee`, `styles`, `textarea`, `tokens`.

**Gaps identified:**
1. **No input-group / input-addon primitive.** `NbInput` ([`input.directive.ts`](../../../libs/ui/src/lib/input/input.directive.ts)) is a flat directive — no slot for a prefix/suffix box. The screenshot pattern (purple icon box butted against an input, sharing one shadow + one continuous border) is used on **all four** form fields and again in the footer, so it qualifies as a reusable primitive.
2. **No select primitive.** The Subject field shows a chevron-down → real combobox semantics. Native `<select>` styled brutalist gives us free keyboard nav, free a11y, free mobile UX, and matches the lib's "thin wrapper over platform primitives" style (`<nb-dialog>` wraps `<dialog>`, `[nbInput]` styles `<input>`).

Conclusion: both `nb-input-group` (+ `[nbInputAddon]`) and `[nbSelect]` are net-new library work. Phases A and B add them; Phases 1–3 consume them.

### 0.4 Decisions — historical (resolved)

> ℹ️ These are the original decision questions. **All are resolved** — see the "Locked decisions" table at the top of this file. Kept here for context on the alternatives that were considered.

| ID | Decision | Outcome |
|---|---|---|
| D1 | Input-group API shape — see §A.2 | **Component + directive marker** (matches `nb-dialog` / `[nbDialogTitle]` pattern) |
| D2 | Select implementation — native `<select>` vs. CDK Overlay popover | **Native `<select>` + `[nbSelect]` directive** (a11y/keyboard/mobile for free, brutalist styling via `appearance: none` + bg-image chevron) |
| D3 | Title wavy underline — inline SVG vs. CSS `text-decoration-style: wavy` | **Inline SVG** (controls color, stroke, amplitude) |
| D4 | Close `×` position — inside yellow header vs. floating on dialog edge | **Inside yellow header** (kept) **— BUT color changes to yellow** per Q3 |
| D5 | Subject options content | **Locked per Q6:** `General Inquiry / Project Proposal / Bug Report / Other` |

---

## Phase A — Library: `nb-input-group` + `[nbInputPrefix]` / `[nbInputSuffix]`

### A.1 Scope (new files)
```
libs/ui/src/lib/input-group/
  index.ts
  input-group.ts            (component)
  input-group-prefix.ts     (directive)
  input-group-suffix.ts     (directive)
  input-group.types.ts      (tokens + types)
libs/ui/src/lib/input/
  input.directive.ts        (modified — adapts when inside a group)
libs/ui/src/lib/textarea/
  textarea.directive.ts     (modified — same adaptation)
libs/ui/src/index.ts        (modified — re-export)
```

### A.2 API design — as shipped

```html
<!-- Prefix icon + input -->
<nb-input-group>
  <span nbInputPrefix><svg>…person…</svg></span>
  <input nbInput placeholder="Your name" />
</nb-input-group>

<!-- Prefix icon + textarea, prefix stretches -->
<nb-input-group>
  <span nbInputPrefix align="stretch"><svg>…pencil…</svg></span>
  <textarea nbTextarea placeholder="Type your message…"></textarea>
</nb-input-group>

<!-- Prefix + suffix -->
<nb-input-group>
  <span nbInputPrefix><svg>…chat…</svg></span>
  <input nbInput placeholder="Search…" />
  <button nbInputSuffix><svg>…x…</svg></button>
</nb-input-group>
```

**Component `<nb-input-group>` (`NbInputGroup`)**
- Host classes: `inline-flex w-full overflow-hidden rounded-nb border-2 border-(--nb-border) bg-(--nb-surface) shadow-nb focus-within:outline-none focus-within:ring-2 focus-within:ring-(--nb-border) focus-within:ring-offset-2 focus-within:shadow-none` (owns offset shadow AND focus ring per Q5; bg is `--nb-surface` not literal `bg-white` for dark-mode compatibility per Q1).
- Provides `NB_INPUT_GROUP` injection token (with `useExisting`) so child `[nbInput]` / `[nbTextarea]` / `[nbSelect]` can detect they're inside a group and drop their own border/shadow conflicts.
- Exposes `hasPrefix` / `hasSuffix` computed signals via `contentChildren(NB_INPUT_PREFIX)` / `contentChildren(NB_INPUT_SUFFIX)`. Not currently consumed by `[nbInput]` / `[nbTextarea]` (inner field has `bg-transparent` and `border-0` so per-corner rounding is moot), but exposed for future consumers.

**Directive `[nbInputPrefix]` (`NbInputPrefix`)**
- Single input: `align: 'center' | 'stretch'` (default `'center'`; `'stretch'` for textarea height — applies `self-stretch`). **No `tone` input** (Q2 — every addon is purple).
- Host classes: `flex w-12 shrink-0 items-center justify-center border-r-2 border-(--nb-border) bg-(--nb-input-addon-bg)`. (`w-12` baked in; matches the existing `h-12` form inputs.)
- Provides `NB_INPUT_PREFIX` token.

**Directive `[nbInputSuffix]` (`NbInputSuffix`)** — symmetric to prefix:
- Host classes: `flex w-12 shrink-0 items-center justify-center border-l-2 border-(--nb-border) bg-(--nb-input-addon-bg)`.
- Provides `NB_INPUT_SUFFIX` token.

**`[nbInput]` / `[nbTextarea]` (and forthcoming `[nbSelect]`) adaptation**
- Inject `NB_INPUT_GROUP` with `{ optional: true }`.
- **In group (`group !== null`):** apply `flex-1 min-w-0 bg-transparent border-0 focus-visible:outline-none`. The group owns border + shadow + focus ring; the field is a transparent text-input area filling the remaining flex space.
- **Standalone (`group === null`):** apply `rounded-nb shadow-nb` + the original focus-visible ring/shadow swap. **Identical class set to pre-Phase-A behavior** — verified by manual diff of the union of all class tokens.

### A.2.1 Audit vs. Angular Material `MatFormField`

| Concern | Angular Material | This plan | Verdict |
|---|---|---|---|
| Wrapper component pattern | `<mat-form-field>` with `ContentChildren` queries for prefix/suffix | `<nb-input-group>` with `contentChildren()` signal queries | ✅ Aligned — same compound-component idea, modernized API |
| DI token for parent ref | `MAT_FORM_FIELD` token (avoids class retention) | `NB_INPUT_GROUP` token (same reason) | ✅ Aligned |
| Prefix/suffix positioning | **Separate directives** `[matPrefix]` / `[matSuffix]` (selector-based) | **Separate directives** `[nbInputPrefix]` / `[nbInputSuffix]` (selector-based) | ✅ Aligned — fixed from earlier draft that used `position` input |
| Icon vs text variants | `[matIconPrefix]` / `[matTextPrefix]` (different padding rules) | **Single prefix selector** | ⚠️ Divergent — brutalist style treats every addon as a bordered icon box, so the icon/text padding distinction doesn't apply. Documented choice. |
| Field control contract | `MatFormFieldControl` **interface** + `_MatFormFieldControl` token; inputs implement the interface, form-field talks to any control through it | Direct: `[nbInput]` / `[nbTextarea]` / `[nbSelect]` each inject `NB_INPUT_GROUP` and adapt themselves | ⚠️ Divergent — simpler, justified by small known set of field types and no floating-label/hint/error features yet. **Documented as a future-evolution path** (see §A.6) |
| Floating label | First-class feature (`<mat-label>`, label-floating animation, `FLOATING_LABEL_PARENT` token) | Not implemented | ⚠️ Out of scope — labels stay outside the group (existing `[nbLabel]` above field) |
| Hint text + error display | `<mat-hint>`, `<mat-error>`, `setDescribedByIds()` wiring | Not implemented | ⚠️ Out of scope — can be added later if needed |
| State change observable | `control.stateChanges: Subject` for focus/disabled/error reactivity | Not needed (no features that depend on it) | ✅ Justified omission |

### A.3 Audit — what changes
| File | Before | After |
|---|---|---|
| `libs/ui/src/lib/input-group/*` | absent | **new** — component + 2 directives + types + index |
| `libs/ui/src/lib/input/input.directive.ts` | flat directive, always applies own border/shadow/radius | injects `NB_INPUT_GROUP` (optional) and conditionally drops conflicting classes |
| `libs/ui/src/lib/textarea/textarea.directive.ts` | same flat pattern | same conditional adaptation |
| `libs/ui/src/index.ts` | no input-group exports | adds `NbInputGroup`, `NbInputPrefix`, `NbInputSuffix`, types |

### A.4 Implementation steps
1. Create `input-group.types.ts` exporting `NB_INPUT_GROUP`, `NB_INPUT_PREFIX`, `NB_INPUT_SUFFIX` tokens and `NbInputGroupContext` interface (e.g. `hasPrefix: Signal<boolean>`, `hasSuffix: Signal<boolean>`).
2. Create `input-group.ts` component:
   - Standalone, `OnPush`.
   - Template: `<ng-content />`.
   - Uses `contentChildren(NB_INPUT_PREFIX)` and `contentChildren(NB_INPUT_SUFFIX)` (signal-based queries) to compute prefix/suffix presence.
   - Provides `NB_INPUT_GROUP` via `useExisting`.
   - Host class composition with `nbClass` helper.
3. Create `input-group-prefix.ts` directive:
   - Selector `[nbInputPrefix]`.
   - Inputs: `align`, `tone` (per §A.2).
   - Provides `NB_INPUT_PREFIX` token (`useExisting`).
   - Host classes computed from inputs (rounded-l-nb, border-r-2, etc.).
4. Create `input-group-suffix.ts` directive — symmetric to prefix.
5. Modify `input.directive.ts`:
   - Add `private readonly group = inject(NB_INPUT_GROUP, { optional: true });`.
   - Switch `classes` to a `computed()` that conditionally omits `shadow-nb` and adjusts rounded corners when `group` is non-null, **and consults the group's `hasPrefix`/`hasSuffix` signals to know which side(s) to strip rounding from**.
6. Mirror change in `textarea.directive.ts`.
7. Create `input-group/index.ts` barrel exporting all three classes + token types.
8. Add exports to `libs/ui/src/index.ts`.

### A.5 Verification (Phase A)
- [ ] `pnpm nx build ui` — clean.
- [ ] `pnpm nx lint ui` — clean.
- [ ] Existing `[nbInput]` and `[nbTextarea]` usages render **identically** when NOT inside `<nb-input-group>` — class output must be byte-identical to today.
- [ ] A throwaway test page renders: prefix-only group (rounded right corners on input), suffix-only group (rounded left corners on input), prefix+suffix group (no rounded corners on input).
- [ ] Single offset shadow under the whole group (no double-shadow seam).
- [ ] Tab/focus on the inner input still shows the focus ring; ring is not clipped by prefix/suffix box.
- [ ] Works with `[nbTextarea]` (prefix stretches when `align="stretch"`).

### A.6 Future-evolution path (NOT in this phase)

If/when the library needs floating labels, hint text, or error display inside a group, the right move is to introduce a formal `NbFormFieldControl` interface (modeled on `MatFormFieldControl`) and migrate `[nbInput]` / `[nbTextarea]` / `[nbSelect]` to implement it. This refactor would be additive (the directives keep their current standalone behavior). Documented here so the simplification in §A.2.1 is a known trade-off, not a corner painted.

---

## Phase B — Library: `[nbSelect]`

### B.1 Scope (new files)
```
libs/ui/src/lib/select/
  index.ts
  select.directive.ts
  select.types.ts
libs/ui/src/index.ts        (modified — re-export)
```

### B.2 API design

```html
<nb-input-group>
  <span nbInputPrefix><svg>…chat…</svg></span>
  <select nbSelect>
    <option value="" disabled selected>What is this regarding?</option>
    <option value="general">General Inquiry</option>
    <option value="project">Project Proposal</option>
    <option value="bug">Bug Report</option>
    <option value="other">Other</option>
  </select>
</nb-input-group>
```

**Directive `[nbSelect]` (`NbSelect`)** applied to native `<select>`:
- Selector: `select[nbSelect]`.
- **v1 supports `size='default'` only** (Q4 — no sm/lg variants until asked).
- **Shape rules live in `styles.css`** (Q4): extend the existing `:where(input[nbInput], textarea[nbTextarea]) { background-color: ... }` to add `select[nbSelect]`, and add a parallel `:where(select[nbSelect]) { height: 2.5rem; padding: 0.5rem 0.75rem; font-size: 0.875rem; }` rule (matching `:where(input[nbInput])`). This keeps `[nbInput]` / `[nbTextarea]` / `[nbSelect]` shape parity automatic via the lib's zero-specificity scaffolding.
- Directive host classes (in `nbClass`) — only the select-specific bits:
  - `appearance-none` (strip native chevron).
  - `bg-[url('…inline-svg-chevron…')] bg-no-repeat bg-right-3 pr-10` (custom chevron via CSS background-image, matching the brutalist style — black, stroke 2).
  - `has-[option:disabled:checked]:text-gray-400` (Q11 — `:has()` muting for the disabled placeholder option, no JS, accepts ~95% browser baseline).
- When inside an `nb-input-group`: same group-aware adaptation as `[nbInput]` (`flex-1 min-w-0 bg-transparent border-0 focus-visible:outline-none`).

**Reactive Forms integration — comes for free.** A native `<select>` already has Angular's built-in `SelectControlValueAccessor` from `@angular/forms`. So this works out of the box without us implementing `ControlValueAccessor`:
```html
<select nbSelect [formControl]="subjectCtrl">…</select>
```

### B.2.1 Audit vs. Angular Material `MatSelect`

| Concern | Angular Material | This plan | Verdict |
|---|---|---|---|
| Underlying element | **CDK Overlay** + custom trigger (`<mat-select>` is its own component) | **Native `<select>`** styled via `[nbSelect]` directive | ⚠️ Divergent — see trade-offs below |
| Keyboard navigation | Hand-rolled via `ActiveDescendantKeyManager` (ArrowDown/Up, Home/End, typeahead) | **Free** — provided by browser native select | ✅ Win for our approach (less code) |
| Accessibility | Hand-rolled combobox role + aria wiring | **Free** — native `<select>` is accessible by default | ✅ Win for our approach |
| Mobile UX | Custom panel; sometimes awkward on mobile | **Native picker** (iOS wheel, Android sheet) | ✅ Win for our approach |
| Forms integration | `MatSelect` implements `ControlValueAccessor` manually | **Free** — Angular ships `SelectControlValueAccessor` for native `<select>` | ✅ Win for our approach |
| Multi-select | Built-in via `multiple` input + `SelectionModel` | Native `multiple` attribute works; UI is a list-box, not a checkbox panel | ⚠️ Visual divergence; not needed for the contact form |
| Custom option content | Full Angular templates inside `<mat-option>` (icons, two-line text) | **Limited** — native `<option>` only takes text | ⚠️ Loss; not needed for the contact form (4 plain options) |
| Custom open animation | Yes (panel slides/scales in) | **No** — browser-controlled open | ⚠️ Loss; brutalist style doesn't prioritize animation |
| `compareWith` for object values | Built-in input | Native select uses string values; objects need `[ngValue]` (Angular handles it) | ✅ Acceptable |
| State change to form-field | `stateChanges` Subject for `MatFormFieldControl` | Direct DI of `NB_INPUT_GROUP`, same pattern as `[nbInput]` | ✅ Consistent with §A |
| Required indicator | `*` on label managed by `MatFormField` | Standard `[required]` attribute; label is outside the group | ✅ Native pattern |

**Decision:** Native `<select>` wrapped by `[nbSelect]` is the right primitive for this design system. The losses (custom option templating, open animation) are not in the brutalist style anyway. The gains (free a11y, keyboard, mobile, forms integration) are substantial.

If/when a use case demands templated options or custom panel UI, an overlay-based `<nb-select-rich>` could be added as a separate component without affecting `[nbSelect]` consumers.

### B.3 Audit — what changes
| File | Before | After |
|---|---|---|
| `libs/ui/src/lib/select/*` | absent | **new** |
| `libs/ui/src/index.ts` | no `NbSelect` exports | adds `NbSelect`, reuses `NbInputSize` |

### B.4 Implementation steps
1. Create `select.types.ts` (re-export `NbInputSize` or define local alias).
2. Create `select.directive.ts`:
   - Selector `select[nbSelect]`, standalone.
   - Inject `NB_INPUT_GROUP` optional.
   - Build host classes via `nbClass` + `computed()`.
   - Inline-encoded chevron SVG as a `bg-[url(...)]` data URI in the class composition.
   - Optional: listen to `(change)` to toggle a `data-empty` host attribute for placeholder styling — or use `:has()` selector if browser support is acceptable for this design system (modern only; check existing usage of `:has()` in `libs/ui/src/lib/styles`).
3. Create `select/index.ts` barrel.
4. Add export to `libs/ui/src/index.ts`.

### B.5 Verification (Phase B)
- [ ] `pnpm nx build ui` + `pnpm nx lint ui` clean.
- [ ] Standalone `<select nbSelect>` (no group) renders styled like `<input nbInput>`, with custom chevron, focus ring intact.
- [ ] Inside `<nb-input-group>`, the prefix icon + select share one border / one shadow.
- [ ] Keyboard: Tab focuses, ArrowDown opens options (native), Enter selects, Esc closes — all free from native `<select>`.
- [ ] Mobile: native picker UI appears.
- [ ] Placeholder option (disabled, value="") renders muted before selection.

---

## Phase 1 — Dialog header overhaul

### 1.1 Scope
- `template:` block lines 122–152.
- `withFormExampleCode` lines 297–327.

### 1.2 Audit — what changes
| Element | Before | After |
|---|---|---|
| Container bg | `bg-[#faf3d6]` | unchanged |
| Badge | `Let's Talk` | unchanged |
| Title text | `Send Message` | `Send us a message` |
| Title decoration | none | inline purple wavy SVG below title |
| Description | short, pink border-bottom | longer text, no border-bottom |
| Top-right cluster | `*` + pink zigzag | `*` + pink zigzag + **speech bubble on coral blob with burst marks** (F3 full fidelity, hand-coded per Q12) |
| **Close `×` button** | `variant="neutral"` (white) | **yellow** via inline `style="--nb-button-bg: #ffd92e; --nb-button-fg: #000;"` matching Send button (Q3) |

### 1.3 Implementation steps
1. Replace `<h2 nbDialogTitle>` text content.
2. Insert wavy SVG immediately after the title: `viewBox="0 0 220 12"`, `preserveAspectRatio="none"`, `width="100%"`, path `M0,6 Q10,0 20,6 T40,6 T60,6 …`, `stroke="#a78bfa"`, `stroke-width="4"`, `stroke-linecap="round"`, `fill="none"`, `aria-hidden="true"`.
3. Lengthen description; remove `border-b-2 border-[#ff2f68]`.
4. Add speech-bubble + coral blob + burst-marks decoration to the existing absolute-positioned top-right block.
5. Mirror all changes in `withFormExampleCode`.

### 1.4 Verification (Phase 1)
- [ ] Title text + wavy underline present and aligned.
- [ ] Decoration cluster does not overlap the `×` button at any width ≥ 640px.
- [ ] Pink border-bottom on description no longer rendered.
- [ ] Live preview HTML and code-block source render identical structure.

---

## Phase 2 — Dialog form fields (consumes Phase A + B)

### 2.1 Scope
- `template:` lines 154–198, `withFormExampleCode` lines 329–352.
- Body container bg: `bg-[#faf3d6]` → `bg-white`.
- `imports:` array gains **`NbInputGroup, NbInputPrefix, NbSelect`** (Q8 — `NbInputAddon` was a stray reference from an earlier draft; `NbInputSuffix` not used in the dialog).

### 2.2 Audit — what changes
| Field | Before | After |
|---|---|---|
| Body bg | `bg-[#faf3d6]` | `bg-white` |
| Name | bare `nbInput` | `nb-input-group` + `nbInputPrefix` (person SVG) + `nbInput` |
| Email | bare `nbInput` | same pattern, envelope SVG |
| Subject | bare `nbInput` | `nb-input-group` + `nbInputPrefix` (chat SVG) + **`select[nbSelect]`** with default + 4 options |
| Message | bare `nbTextarea` | `nb-input-group` + `nbInputPrefix align="stretch"` (pencil SVG) + `nbTextarea` |

### 2.3 Implementation steps
1. Body wrapper bg → `bg-white`.
2. For each field, wrap with `<nb-input-group>` and prepend `<span nbInputPrefix>` containing the SVG.
3. Subject: swap the `<input nbInput>` for `<select nbSelect>` with disabled placeholder option + the option set from D5.
4. Message: `<span nbInputPrefix align="stretch">` so the pencil box matches textarea height.
5. Add `NbInputGroup`, `NbInputPrefix`, `NbSelect` to `imports:` in `DialogPageComponent`.
6. Mirror all changes in `withFormExampleCode`.

### 2.4 Verification (Phase 2)
- [ ] All four fields render as one visual unit (single shadow, single continuous border between addon and input).
- [ ] Name/Email collapse to single column below `sm`.
- [ ] Subject opens native dropdown with options; placeholder shows muted before selection.
- [ ] Message icon box stretches full textarea height.
- [ ] Focus ring on input/select/textarea is not clipped by addon.

---

## Phase 3 — Dialog footer (privacy + actions)

### 3.1 Scope
- `template:` lines 200–204, `withFormExampleCode` lines 354–357.

### 3.2 Audit — what changes
| Element | Before | After |
|---|---|---|
| Footer bg | `bg-[#faf3d6]` | `bg-white` |
| Layout | right-aligned 2 buttons | `justify-between`: left = privacy block, right = divider + zigzag + Cancel + Send |
| Privacy block | absent | shield icon (purple box) + 2-line text |
| Divider | absent | `h-10 w-px bg-(--nb-border)` |
| Zigzag | absent | small black zigzag SVG (`hidden sm:block`) |
| Send button | text `Send` | text `Send Message` + right-arrow SVG |

### 3.3 Implementation steps
1. Change `nb-dialog-actions` classes to `flex items-center justify-between gap-4 bg-white border-t-2 border-(--nb-border) px-8 py-5`.
2. Left group: small purple square (h-10 w-10, same `#c4a8ff` + black border treatment as form prefixes — visually mirrors `[nbInputPrefix]` but stands alone here as a plain `<span>`, not wrapped in a group) + two `<p>` lines.
3. Right group: divider span, zigzag SVG, Cancel button, Send Message button with appended arrow SVG.
4. On `<sm`, stack groups (`flex-col sm:flex-row`); buttons full-width on mobile.
5. Mirror in `withFormExampleCode`.

### 3.4 Verification (Phase 3)
- [ ] Footer renders left/right groups on desktop, stacked on mobile.
- [ ] Shield icon box visually matches form-field addons (same purple, border, dimensions).
- [ ] Send Message arrow inherits button text color.
- [ ] Cancel still closes the dialog.

---

## Phase 4 — Source-string sync

### 4.1 Audit
`withFormExampleCode` is **rendered to the user** as the "view source" snippet under the live preview. Any divergence is a documentation bug.

### 4.2 Implementation steps
1. After Phases 1–3, copy the new `#withFormDialog` markup verbatim into `withFormExampleCode`.
2. Unescape display-only entities (`&#42;` → `*`) per existing convention.
3. Update `importCode` to include `NbInputGroup`, `NbInputPrefix`, `NbSelect` (and `NbInputSuffix` only if used).
4. Preserve indentation; no trailing whitespace.

### 4.3 Verification (Phase 4)
- [ ] Visually diff live preview vs. code-block source — structure matches line-for-line.
- [ ] Copy/paste the code-block source into a fresh component → renders identically.

---

## Phase 5 — End-to-end verification

### 5.1 Build & lint
- [ ] `pnpm nx build ui` — clean.
- [ ] `pnpm nx build docs` — clean.
- [ ] `pnpm nx lint ui` + `pnpm nx lint docs` — clean.
- [ ] `pnpm nx typecheck` (or per-project equivalent) — clean.

### 5.2 Functional
- [ ] "Contact Us" trigger opens the dialog.
- [ ] `×`, `Cancel`, backdrop click, `Esc` all close the dialog.
- [ ] Tab order: Name → Email → Subject → Message → Cancel → Send Message.
- [ ] Subject select: opens with mouse, Space, ArrowDown; placeholder option not selectable as a real value.
- [ ] No console warnings.

### 5.3 Visual diff vs. screenshot
- [ ] Header: badge, title, wavy underline, description, decorations, close button.
- [ ] Body: 4 fields with icon prefix, 2-col layout for Name/Email, chevron on Subject (now real native chevron from `[nbSelect]`), full-height pencil box on Message.
- [ ] Footer: privacy block, divider, zigzag, Cancel, Send Message with arrow.

### 5.4 Regression
- [ ] "Preview" warning dialog (`#confirmDialog`) unchanged and still works.
- [ ] "API" table and "Usage" section unchanged.
- [ ] **Every existing `[nbInput]` and `[nbTextarea]` usage across the docs app renders identically** (Phase A modified those directives — must verify no group-mode regression on bare usage).
- [ ] Other pages that import the changed lib code build cleanly.

### 5.5 Commits

Three commits in order. **Hold all commits until visual diff is signed off** (per Q14).

1. `feat(ui): add nb-input-group with nbInputPrefix and nbInputSuffix`
   - All Phase A files (see "Phase A — ✅ DONE" section at top).
   - Bundle the **`eslint.config.js` change** here (Q9 — drop `component-class-suffix` + `directive-class-suffix` rules + button override). The commit body should briefly justify it: existing `NbInput` / `NbLabel` / `NbTextarea` / `NbDialogClose` already violated the rule, lint was already failing on main, and Q9 locked the modern Angular naming convention which makes the rule obsolete.
   - **Selective staging**: do NOT include the uncommitted `apps/docs/src/app/pages/components/examples/job-listing-card.example.ts` change — that's unrelated work.

2. `feat(ui): add nbSelect directive`
   - Phase B files: `libs/ui/src/lib/select/{index.ts,select.directive.ts,select.types.ts}` + `libs/ui/src/index.ts` re-exports + `libs/ui/src/lib/styles/styles.css` (extend `:where(...)` to include `select[nbSelect]`).

3. `feat(docs): redesign contact us dialog example to match brand reference`
   - Phases 1–4 in `apps/docs/src/app/pages/components/dialog.page.ts` — template + `withFormExampleCode` source string + `importCode` string + `imports:` array. **Atomic** — template and displayed source must change together (Phase 4 = source-string sync).

---

## Out of scope (explicit)

- No edits to the "Preview" warning dialog or its source string.
- No edits to the API table or other sections of `dialog.page.ts`.
- No refactor of unrelated portfolio files surfaced in `git status`.
- No backporting `nb-input-group` to other existing demos in this PR — handled as follow-up if desired.
- No floating labels, hint text, or error display in `nb-input-group` (see §A.6 for future path).
- No formal `NbFormFieldControl` interface yet (see §A.2.1 + §A.6).
- No overlay-based rich select (`<nb-select-rich>`) — `[nbSelect]` on native `<select>` only (see §B.2.1).

## Risks & open questions

1. **Modifying `[nbInput]` / `[nbTextarea]` is the highest-risk change** in the plan — they're used across the codebase. Mitigation: the change is gated by `inject(NB_INPUT_GROUP, { optional: true })`; when null the class composition is byte-identical to today. Verified in Phase A.5.
2. **`<nb-select>` placeholder muting** depends on `:has()` selector support (or a small `(change)` listener). If `:has()` is acceptable in the lib's browser baseline, prefer it (no JS). Confirm before Phase B.
3. **Wavy-underline alignment** — width-100% SVG with `preserveAspectRatio="none"` handles variable title length.
4. **Footer privacy block on narrow widths** — stacked layout with full-width buttons handles overflow.
5. **D5 (Subject options content)** — needs your confirmation before Phase 2.

---

## Approval gate — ✅ passed

All approvals were captured in the grilling session (see "Locked decisions" at top of this file). Original gate items, for the record:
- [x] Decisions **D1–D5** in §0.4 — superseded by Q1–Q14.
- [x] Reference screenshot saved at [`./reference.png`](./reference.png).
- [x] Screenshot details surfaced in Q3 (yellow close button), Q11 (`:has()`), Q12 (decoration cluster), Q13 (icon set).
- [x] `[nbInput]` and `[nbTextarea]` modification approved — standalone class set is identical to pre-Phase-A (verified by manual diff).

---

## Next-session pickup

When resuming, start at **Phase B** with this context:

1. Phase A is shipped and clean (build + lint passing). Don't re-touch input-group files unless a Phase 2 visual regression points there.
2. Phase B is small: ~3 new files (`select/{index.ts, select.directive.ts, select.types.ts}`) + `styles.css` extension + `libs/ui/src/index.ts` re-export. Follow the API design in §B.2 above as the locked spec.
3. Then Phases 1–4 consume both primitives in the dialog page. Phase 1 = header (incl. yellow close button + hand-coded decoration), Phase 2 = form fields, Phase 3 = footer, Phase 4 = source-string sync.
4. Don't commit until Phase 5 visual sign-off. Three atomic commits per §5.5.
5. The grilling decision table at the top of this file is the source of truth for any "should we…" question that resembles something already resolved.
