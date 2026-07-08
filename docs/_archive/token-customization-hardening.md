# Token Customization — Hardening Plan (Phase 8)

Status: Active
Created: 2026-07-03
Scope: Hardening pass on the finished CSS-first token customization architecture for `@ng-brutalism/ui`.

Related (live) documents:

- `docs/architecture/token-customization.md` — canonical architecture rationale (still the source of truth for the pattern).
- `docs/_archive/customization-flexibility-plan.md` — separate, forward-looking Radix-inspired extensions.

Superseded / archived by this doc:

- `docs/_archive/token-customization-migration.md` — the Phase 0–7 migration effort (complete except the stragglers listed below, now tracked here).
- `docs/_archive/token-customization-audit.md` — the original pre-migration audit/source material.
- `docs/_archive/style-capabilities.md` — pre-migration internal style-capability model.

---

## 1. Why this plan exists

Phases 0–7 migrated the primitives to the CSS-first model (semantic inputs → `data-*`, scalar
inputs → public CSS variables, CSS owns final properties + tone recipes). This plan is **not** new
feature work. It is a hardening/validation pass that challenges the finished design and fixes the
seams a hard review exposed.

Four seams were audited. Two are correctness/flexibility risks (tone leak, unmigrated
components), two are cleanliness (dead code, unverified conflict contract).

---

## 2. Corrected component status (the "Done" status was wrong)

The migration tables marked all components Done. A dependency-driven grep proved three
components were never actually migrated (or only partially), and none appear in the Phase 1–7
tables:

| Component | Prior status | Reality | Violation |
|---|---|---|---|
| **NbAccordionTrigger** | not tabled | ❌ unmigrated | Imports `nbToneVars` (the rejected TS tone generator) and writes four final style props inline: `[style.background-color]`, `[style.color]`, `[style.outline-color]`, `[style.border-bottom-color]`. |
| **NbButtonTrailingIcon** | not tabled | ❌ unmigrated | `tone` input resolved in TS → `[style.background]` + `[style.color]` inline. |
| **NbChip** | tabled Done | ⚠️ partial | Tone/radius/shadow migrated, but scalar `tracking` still resolves in TS → `[style.letter-spacing]` inline. |

NbAccordion**Item** is correctly migrated (composes `NbToneCapability`); only the **Trigger** is broken.

These three also bypass the shared `--_nb-tone-*` slots, so the tone-containment fix (Track A)
would not reach them until they are migrated (Track B).

---

## 3. Seam 1 — Tone cascade is a leak (Track A)

### Problem

`--_nb-tone-bg/-fg/-border-color` are regular custom properties, so they **inherit**. A component
that sets a tone sets those slots on itself, and every descendant that consumes them picks them up
unless it declares its own `data-nb-tone` or its own `--nb-<name>-bg`.

```html
<nb-card tone="warning">
  <button nbButton>Save</button>   <!-- no tone set -->
</nb-card>
```

The card sets `--_nb-tone-bg: var(--nb-warning)`; it inherits down; the button's
`background: var(--nb-button-bg, var(--_nb-tone-bg, …))` resolves the middle term → the button
silently turns warning-colored. 21 component stylesheets consume `--_nb-tone-bg`, so the bleed is
broad.

### Decision: containment (shadcn-shaped)

Tone paints only the element that declares it. A parent influences a child **only** by explicitly
setting the child's public namespaced var (`--nb-button-bg`), which already works because those
vars are public and inherit. Neutral-by-default, opt-in-to-tint.

Prior art: shadcn does not cascade at all (explicit tokens per component); Radix *does* cascade,
but the cascaded value is a hue *scale* governed by a separate `variant` axis, so a gray button in
an accent region stays gray. Our current model cascades a *final paint* with no variant gate — the
known anti-pattern between the two safe designs. Containment moves us cleanly onto the shadcn
model. (A Radix-style `variant` axis is a separate, later feature — see
`customization-flexibility-plan.md` — not part of this hardening pass.)

### Mechanism: non-inheriting `@property`

Register the three slots once, globally (top of `libs/ui/src/lib/styles/tone.css`, before the
recipes):

```css
@property --_nb-tone-bg           { syntax: "*"; inherits: false; }
@property --_nb-tone-fg           { syntax: "*"; inherits: false; }
@property --_nb-tone-border-color { syntax: "*"; inherits: false; }
```

Hard constraints:

- **Must** be `syntax: "*"` with **no** `initial-value`. A typed `<color>` syntax forces an
  initial-value, which makes an unset slot resolve to that initial instead of falling through to
  the neutral fallback — silently breaking every `var(--_nb-tone-bg, neutral)` chain. `"*"` with no
  initial gives the "guaranteed-invalid" behavior the fallback depends on.
- Same-element consumption still works (the toned element both sets and reads the slot), so leaf
  component CSS needs **no** change.
- `--_nb-tone-*` is the only private-token surface in the whole library and is produced in exactly
  one file (`tone.css`); every other file only consumes it. This is a one-file mental model.

### Compound components: re-emit (verified blast radius)

Components whose **descendant** slots read the tone slot (relying on inheritance from the toned
host) must re-emit the contained slot under an inheriting, namespaced var so tone reaches their own
parts — and nothing else. Grep-verified list (host carries `data-nb-tone`, slot is a descendant):

| Component | Host | Descendant slot(s) |
|---|---|---|
| **nb-select** | `nb-select` | `[data-slot='select-listbox']`, `nb-select-option [data-slot='select-option-button']` (incl. `:focus-visible`) |
| **nb-progress** | `nb-progress` | `[data-slot='progress-fill']` |
| **nb-rating** | `nb-rating` | `[data-slot='rating-star'][data-filled]` |
| **nb-sticker** | `[data-nb-sticker]` | `[data-slot='sticker-content']`, `[data-slot='sticker-shape']` |

Pattern (progress shown):

```css
:where(nb-progress[data-nb-tone]) {
  --nb-progress-tone-bg: var(--_nb-tone-bg);   /* inheriting, namespaced to progress only */
}
:where(nb-progress [data-slot='progress-fill']) {
  background: var(--nb-progress-fill, var(--nb-progress-tone-bg, var(--nb-primary)));
}
```

A button dropped inside the progress/select subtree reads the raw (contained) `--_nb-tone-bg`, not
`--nb-progress-tone-bg`, so tone fills the component's own anatomy and stops there.

### Blast radius

- **1 file** gets the `@property` block (`tone.css`).
- **4 files** get the re-emit (select, progress, rating, sticker).
- **16 leaf components unchanged**: accordion, badge, button, callout, card, checkbox, chip,
  dialog, icon-button, image-card, input, media-frame, media-item, native-select, surface,
  textarea.
- Entirely CSS. No TypeScript, no input changes, no public-API change.

---

## 4. Seam 2 — Finish the migration (Track B)

Migrate the three stragglers into the CSS-first + containment model. These block the Track C
dead-code deletion.

1. **NbAccordionTrigger** → compose `NbToneCapability` (reflect `data-nb-tone`); move the four color
   properties to CSS reading `--_nb-tone-*` with fallbacks; drop the `nbToneVars` import and the
   `[style.*-color]` host bindings.
2. **NbButtonTrailingIcon** → reflect `data-nb-tone`; consume shared tone slots in CSS; drop the
   TS-resolved `[style.background]` / `[style.color]`.
3. **NbChip** → move scalar `tracking` to a `data-*` attribute + CSS (or a `--nb-chip-tracking`
   var); remove the inline `[style.letter-spacing]`.

No public **input** names change; these are internal mechanism migrations.

---

## 5. Seam 3 — Dead code removal (Track C)

### Dead capability directives (no dependency)

Five capabilities are composed by **zero** components — referenced only by the barrel and the `ɵ`
export. They were superseded by the named input transforms (`nbRadiusStyleTransform`, etc.).

Delete: `NbRadiusCapability`, `NbShadowCapability`, `NbBorderCapability`, `NbPaddingCapability`,
`NbGapCapability` — their files, their entries in `core/capabilities/index.ts`, and their five `ɵ`
exports from `libs/ui/src/index.ts`. Keep `NbToneCapability`, `NbUnderlineCapability`,
`NbResetMarginCapability` (all live). `nb-style-capabilities.spec.ts` does not reference the five by
name (it tests primitives), so it needs no change.

The `ɵ` export exists only to satisfy NG3001 for `hostDirectives`-referenced classes; nothing
composes these five, so the export is unnecessary. By the library's own `ɵ` = private contract this
is not a SemVer break.

### Dead token exports

Grep of the public entry (200 non-`ɵ` exports) found the normal exports are otherwise all
referenced. The genuinely dead ones are pre-migration TS leftovers:

| Symbol | When deletable |
|---|---|
| `nbFontWeightValue` | **Now** — zero consumers. |
| `NB_TONE_TOKENS`, `nbToneTokens`, `NbToneTokens`, `NbToneVars` | Orphan except transitively via `nbToneVars`. |
| `nbToneVars` | After **B-1** (NbAccordionTrigger) — its only remaining consumer. |

So: delete `nbFontWeightValue` immediately; delete the whole TS tone-generator cluster
(`nbToneVars`, `nbToneTokens`, `NbToneTokens`, `NbToneVars`, `NB_TONE_TOKENS`) and their entry-point
exports **after** NbAccordionTrigger is migrated. Update the comment in `tokens/border.ts` that
references `nbToneVars().borderColor`.

---

## 6. Seam 4 — Conflict contract hardening (Track D, independent)

The architecture's central claim — "explicit Angular input wins over CSS customization" — is
verified only that a string lands in an inline style attribute. No spec calls `getComputedStyle`
(forced by jsdom), so the claim is unproven at the computed-value level, and it has three holes:

1. Input vs class/scope/inherited CSS → input genuinely wins (inline beats stylesheet). ✅ untested.
2. Input vs `!important` user CSS → **input loses** (`!important` beats normal inline). The
   "always wins" claim is false here and the escape hatch is undocumented.
3. Input vs inline style on the **same element** → relies on Angular's host-binding-vs-static-style
   precedence; happens to favor input; untested; two competing `[style.--x]` bindings are undefined.

Single-slot design consequence: once any layer sets the input, the value is inlined and no
downstream CSS theme can retune it (short of `!important`). This is inherent to the single-slot
model and consistent with Radix/shadcn (props beat theme), but it is an unstated contract — the
sharp case is a recipe/wrapper hardcoding an input and locking out a consumer theme.

Actions (accept the single-slot model; do **not** reintroduce `--*-input`/`--*-default`):

1. Add one browser/computed-style test (Playwright or vitest-browser) proving precedence: input
   beats class, beats inherited, beats same-element inline; `!important` beats input.
2. Document the contract: inputs beat CSS except `!important`; do not set both an input and its var
   on one element; use inputs for one-off overrides, CSS vars for scope/theme.
3. Document the wrapper/recipe guidance: prefer setting the CSS var over the input when the value
   should remain theme-overridable.

---

## 7. Execution order & dependencies

```
Track A (tone containment)      — CSS only, no deps
Track B (finish migration)      — B-1 → C (tone-generator deletion)
Track C (dead code)             — C.dead-capabilities: no deps
                                  C.nbFontWeightValue: no deps
                                  C.tone-generator cluster: after B-1
Track D (conflict contract)     — independent
```

Dependency spine: **B-1 (NbAccordionTrigger) → C tone-generator deletion.** Everything else is
parallelizable. Only Track C touches the public export surface (removing `ɵ` capability exports +
dead token exports), which is the accepted SemVer-affecting step.

---

## 8. Acceptance criteria

- A plain `nbButton` inside `<nb-card tone="warning">` renders neutral, not warning.
- `<nb-select tone="warning">` tones trigger **and** dropdown; a button inside the dropdown stays neutral.
- No component imports `nbToneVars` / `nbToneTokens`; no component writes final color/typography
  properties inline in TS for tone or tracking.
- `NbRadius/Shadow/Border/Padding/Gap` capability directives and the TS tone-generator cluster no
  longer exist; `nbFontWeightValue` removed.
- A browser test asserts input-vs-CSS precedence at the computed-value level; the `!important`
  escape hatch and single-slot contract are documented.
- `--_nb-tone-*` is registered non-inheriting; it remains the only private-token surface, produced
  solely by `tone.css`.
