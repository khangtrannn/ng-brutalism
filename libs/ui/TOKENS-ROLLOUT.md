# Tokens Rollout Plan

Companion to `TOKENS.md`. That file is the **spec**: the model, grammar, and pilot design. This file is the **execution plan**: phased work to bring the library up to that spec, component by component — without changing how anything _looks_.

Source of truth for design decisions: `TOKENS.md`. Source of truth for _what to do next_ and _how to verify it_: this file.

---

## 0. The two prime constraints

This refactor has two outputs that are scored separately:

1. **Library:** adopts the new token system **strictly per `TOKENS.md`**. No backward-compat aliases, no legacy variant/prop names, no carryover bugs. Library defaults follow the spec — `button` `default` resolves to `var(--nb-main)`, `neutral` resolves to `var(--nb-background)`, removed variants (`reverse`, `noShadow`) are gone.
2. **Docs pages:** every example **renders the same colors as it does today**. Example _markup_ is freely rewritten — that's how we keep colors identical despite the library defaults shifting underneath. Backward compat at the markup level is not required.

The two are reconciled by the **docs example migration** step (§3.7): after the library refactor for a component lands, walk its docs page and rewrite any example whose rendered color drifted, using the new token system to restore the original look.

### 0.1 Why this framing

The earlier draft tried to negotiate a "visual parity except for an acknowledged bug list" boundary. That gave the library an awkward middle path — partly spec, partly carryover. With this split, each side is clean:

- The library is a faithful implementation of `TOKENS.md`.
- The docs page is a faithful record of the current visual design.
- Where they would clash (e.g. today's default-white button), the docs example acquires an explicit scoped override (`style="--nb-button-bg: #fff"`) or switches to a variant that produces the same color. The library default is not weakened to accommodate it.

Future docs-content work (separate PRs) can update examples to _showcase_ the new defaults if desired. That's a content decision, not a refactor concern.

---

## 1. Current state assessment

A snapshot of where the codebase actually is versus what `TOKENS.md` describes.

### 1.1 Button (the named pilot)

`libs/ui/src/lib/button/button.directive.ts`

| Aspect                   | Spec (`TOKENS.md`)                                                                     | Today                                       | Phase 1 library        | Phase 1 docs                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Variants                 | `default \| neutral \| primary \| secondary \| accent \| danger \| success \| warning` | `default \| reverse \| noShadow \| neutral` | Spec; shadow split out | Examples using `reverse`/`noShadow` rewritten to `shadow=` prop                                                                   |
| `shadow` prop            | `default \| none \| reverse`                                                           | Does not exist                              | Added                  | Used wherever `reverse`/`noShadow` variant was used                                                                               |
| `--nb-button-bg` default | `var(--nb-main)`                                                                       | `#fff` (every variant)                      | Spec                   | Examples that today render white add `style="--nb-button-bg: #fff"` or pick a variant that still renders white in the target mode |
| `neutral` background     | `var(--nb-background)`                                                                 | `#fff`                                      | Spec                   | (see row above)                                                                                                                   |
| `--nb-button-fg`         | Variant-driven                                                                         | Hardcoded per variant                       | Variant-driven         | n/a                                                                                                                               |
| `--nb-button-border`     | Tokenized → `var(--nb-border)`                                                         | Read direct from `--nb-border`              | Tokenized              | n/a                                                                                                                               |
| `--nb-button-shadow`     | Tokenized                                                                              | `shadow-nb` utility                         | Tokenized              | n/a                                                                                                                               |
| `--nb-button-radius`     | Tokenized → `var(--nb-radius)`                                                         | `rounded-nb` utility                        | Tokenized              | n/a                                                                                                                               |

**Conclusion:** the library snaps fully to the spec. Docs examples migrate to preserve current rendered colors via overrides or variant swaps.

### 1.2 Legacy ad-hoc token surface

These tokens exist today and do not follow the spec grammar. They need to be renamed, removed, or kept with documentation that they're legacy:

| Existing token                              | Where defined                                          | Proposed name (if kept)                |
| ------------------------------------------- | ------------------------------------------------------ | -------------------------------------- |
| `--nb-input-addon-bg`                       | `theme.css`, `input-group-suffix.ts`                   | `--nb-input-group-addon-bg`            |
| `--nb-input-prefix-bg`                      | `theme.css`, `input-group-prefix.ts`                   | `--nb-input-group-prefix-bg`           |
| `--nb-input-background`                     | inline defaults in input/select/textarea, `styles.css` | `--nb-input-bg`                        |
| `--nb-dialog-description-color`             | `styles.css`                                           | `--nb-dialog-description-fg`           |
| `--nb-dialog-content-bg`                    | `styles.css`                                           | keep as-is                             |
| `--nb-dialog-actions-bg`                    | `styles.css`                                           | keep as-is                             |
| `--nb-title-wave-{width,height,gap,color}`  | `styles.css`                                           | keep — on-grammar with `wave` sub-part |
| `--nb-marquee-duration`                     | `marquee.ts`                                           | keep                                   |
| `--nb-focus-ring`, `--nb-focus-ring-offset` | `theme.css`, `styles.css`                              | keep — global, not component-scoped    |

In-flight working-tree changes (`select.ts`, `select.directive.ts`, `input-group.ts`, `input-group-prefix.ts`, `dialog.page.ts`, examples) are partial — Phase 2 absorbs or reverts them per the audit results.

### 1.3 Test + docs infrastructure available

- **Unit tests:** vitest + jsdom (`libs/ui/vitest.config.mts`). Existing specs (`select.spec.ts`, `accordion.component.spec.ts`, `class.spec.ts`) assert on class string contents.
- **Limitation:** jsdom does not resolve CSS variables in `getComputedStyle()`. Unit tests can verify _that_ a token is declared in a class string and _that_ a variant reassigns it, but cannot assert the final computed color.
- **No browser/visual test setup today.** No Playwright, no Storybook snapshots, no pixel-diff. Visual parity is verified manually via the docs dev server.
- **Docs dev server:** `pnpm nx serve docs` (Nx-based). Per-component example pages live at `apps/docs/src/app/pages/components/<comp>.page.ts`.

---

## 2. Guiding principles

Restating from `TOKENS.md`, with execution implications:

0. **Visual parity is non-negotiable.** See §0. Every other principle is subordinate.
1. **No token without a driver.** A scoped token gets added only when (a) a prop reassigns it, or (b) a concrete, named external customization use case exists ("pill-shaped buttons everywhere"). Symmetry is not a driver.
2. **Variants are token reassignments, not utility classes.** A `variant="primary"` button is "the same button with `--nb-button-bg` pointing at `--nb-primary`." Variant class strings contain only `[--nb-button-bg:var(--nb-primary)] [--nb-button-fg:...]`, never `bg-primary text-white`.
3. **`variant="default"` is `''`.** Defaults live in the base class. Variant maps only contain _differences_ from default.
4. **Token defaults live inline in the directive's class string**, not in `theme.css`. `theme.css` only holds _global_ tokens.
5. **Match existing names where they already conform.** `--nb-button-bg` exists; don't bikeshed it into `--nb-button-background`.

---

## 3. Per-component audit + test protocol

A reusable checklist applied identically to every component in the rollout (button included). Each component's section in §4 and §5 fills out this template.

### 3.1 Step A — Inventory (read-only)

For the component:

1. **List every example on its docs page** (`apps/docs/src/app/pages/components/<comp>.page.ts`). Capture every variant, size, state combination shown. Note any inline `style="--nb-*: ..."` overrides — these are existing API promises that must keep working.
2. **List every CSS-affecting class** in the directive's current class string. Separate into:
   - **Layout/typography classes** (e.g. `inline-flex`, `font-bold`, `gap-2`) — won't be tokenized
   - **Color/border/shadow/radius classes** — will be tokenized
3. **List every existing CSS variable read** (`var(--nb-...)`, `bg-(--nb-...)`, `border-(--nb-...)`) — these are part of the current public token surface. Decide for each: keep, rename, or supersede.

Output: a short audit table per component (see §4.1 for the button example).

### 3.2 Step B — Baseline capture (visual)

Before any directive change:

1. `pnpm nx serve docs`, navigate to the component's docs page.
2. For each example × each interactive state (rest, hover, focus, active, disabled, plus `open`/`checked` where applicable) × light mode + dark mode:
   - Screenshot. Save under `docs/baseline/<component>/<example>-<state>-<mode>.png` (gitignored — local-only).
3. Pick one representative variant. Open DevTools, inspect the rendered element, and record the computed values for: `background-color`, `color`, `border-color`, `border-width`, `border-radius`, `box-shadow`. Paste into the component's audit section as the source of truth for default token values.

The baseline screenshots are the **acceptance reference** for Step E. They are not committed; the audit table is.

### 3.3 Step C — Token defaults derived from baseline

For each color/border/shadow/radius class identified in Step A:

- Replace with a `[--nb-<component>[-<part>]-<property>:<value>]` default plus a `bg-(--nb-...)` / `border-(--nb-...)` / etc. read.
- `<value>` is **the exact value the class produced today**, not a value taken from `TOKENS.md`'s table. If today's class is `bg-white`, default is `#fff` — even if the spec says it should be `var(--nb-main)`.
- If a discrepancy with `TOKENS.md` surfaces, log it in §8 open questions and proceed with the audited value.

### 3.4 Step D — Variant/state class maps

If the component has a `variant` prop (or `shadow`, `size` if size affects color), build the map:

- `default` row is empty string — base class already produces it.
- Other rows contain only the _token reassignments_ that differ from the base. No utility colors.
- Verify each row would produce the same rendered class set as the pre-refactor code did. This is a paper-and-pencil check before code, then a unit-test check after code.

### 3.5 Step E — Verification

Three layers, in order:

1. **Unit tests (vitest):**
   - Existing tests must still pass with no changes to assertions. If they reference a removed class (e.g. `bg-(--nb-main)` directly), the test is updated to assert the token reassignment chain instead.
   - New tests added per the patterns in §3.6.
2. **Manual visual diff via docs dev server:**
   - Restart `pnpm nx serve docs`, navigate to the component's docs page.
   - Compare side-by-side against Step B screenshots, for each example × state × mode.
   - **Acceptance:** every pixel matches. Differences ≠ acceptable just because they look "close." If a pixel differs, either: the token default was wrong (fix it), or the refactor changed behavior (revert that part).
3. **Override smoke test:**
   - For one example on the docs page, apply an inline `style="--nb-<component>-<property>: hotpink"` and verify only that element changes — no leak to siblings or descendants.
   - For one example, apply a `:root { --nb-<component>-<property>: ... }` global override (via DevTools), and verify every instance of that component restyles.

### 3.6 Step F — Tests to add per component

In `libs/ui/src/lib/<component>/<component>.tokens.spec.ts` (new file per component):

```ts
// Pattern (adapt per component shape — directive vs. component)
describe('<component> token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createDefaultFixture();
    const host = fixture.nativeElement.querySelector(/* selector */);
    const cls = host.className;

    // Each token's default must appear literally in the class string.
    expect(cls).toContain('[--nb-<comp>-bg:<expected-default>]');
    expect(cls).toContain('[--nb-<comp>-fg:<expected-default>]');
    // ...one per documented token
  });

  it('reads its scoped tokens (not global tokens directly)', async () => {
    const fixture = await createDefaultFixture();
    const host = fixture.nativeElement.querySelector(/* selector */);
    const cls = host.className;

    // After refactor the host reads its scoped tokens, not raw globals.
    expect(cls).toContain('bg-(--nb-<comp>-bg)');
    expect(cls).not.toContain('bg-(--nb-main)'); // example — adjust per component
  });

  // One test per variant (if the component has variants):
  it('variant="<x>" reassigns expected tokens', async () => {
    const fixture = await createVariantFixture('<x>');
    const host = fixture.nativeElement.querySelector(/* selector */);
    const cls = host.className;
    expect(cls).toContain('[--nb-<comp>-bg:var(--nb-<x>)]');
  });

  it('does not regress existing class shape', async () => {
    // Lift the pre-refactor expected class set; assert it is still produced
    // for default variant. Catches accidental removal of layout/focus classes.
  });
});
```

Why this shape:

- Each test maps directly to one row of `TOKENS.md`'s per-component token table — easy to read, easy to extend.
- jsdom can't resolve CSS variables, so we assert the _declaration_, not the computed value. The visual diff in §3.5 step 2 closes that gap.
- The "does not regress existing class shape" test is the safety net — it pins down what the refactor must not break.

### 3.7 Step G — Docs example migration (color preservation)

After the library refactor for the component lands, before the PR is reviewed:

1. Run `pnpm nx serve docs`, navigate to the component's docs page.
2. For each example screenshot captured in Step B, compare against the now-refactored docs page:
   - **Color matches today's baseline** → leave example markup alone.
   - **Color drifted** (e.g. a button that was white now renders yellow because the library default changed) → rewrite the example using the new token system to restore the original color. Two tactics, in order of preference:
     - **a) Variant swap.** If a new variant in the spec produces the original color in the relevant mode, switch to it. Lowest-noise change, idiomatic.
     - **b) Scoped inline override.** Add `style="--nb-<component>-<property>: <original-value>"` to the element. Use when no variant matches. Acceptable; this is exactly the override use case the token system exists to support.
3. Re-take screenshots after migration. Pixel-diff against the Step B baseline. Acceptance: identical.
4. Note: example markup _may_ change. Example rendering _must not_.

### 3.8 Step H — Documentation sync

- Update `apps/docs/src/app/docs/docs-tokens.ts` to match the component's new token surface exactly. Each token in the table corresponds to a real entry in the directive's class string.
- If `--nb-main`/`--nb-surface`/other globals previously appeared in the per-component table because the component read them directly, remove them — they're not part of the per-component public surface after the refactor.

---

## 4. Phase 1 — Button pilot

**Goal:** finish the button pilot per `TOKENS.md` §"Pilot: Button," using the audit protocol in §3, **with visual parity preserved.** The pilot is also the dry run for the audit protocol itself — if §3 needs adjustment, learn it here.

### 4.1 Step A — Inventory

Examples on the button docs page (`apps/docs/src/app/pages/components/button.page.ts`): Preview, full-width, plus per-variant and per-size examples. The Preview example uses `<button nbButton variant="neutral" style="--nb-button-bg: var(--nb-yellow)">` — confirming `--nb-button-bg` is already a public API that must continue to work identically.

Current class string color/border/shadow/radius surface:

| Class today                                                     | Source                             | Becomes                                                                                                            |
| --------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `bg-(--nb-button-bg)`                                           | base                               | unchanged                                                                                                          |
| `text-(--nb-button-fg)`                                         | base                               | unchanged                                                                                                          |
| `border-2 border-(--nb-border)`                                 | variant map (every variant)        | `border-2 border-(--nb-button-border)` + default `[--nb-button-border:var(--nb-border)]`                           |
| `rounded-nb`                                                    | base (via `font-bold rounded-nb`)  | `rounded-(--nb-button-radius)` + default `[--nb-button-radius:var(--nb-radius)]`                                   |
| `shadow-nb`                                                     | variant map (`default`, `neutral`) | `shadow-[var(--nb-button-shadow)]` + default expanding to the existing `--nb-shadow-offset-* / --nb-shadow` triple |
| `[--nb-button-bg:#fff]` per variant                             | variant map                        | base default `[--nb-button-bg:#fff]`; variant map empty for `default`/`neutral` (or sets fg only)                  |
| `hover:translate-x-... hover:translate-y-... hover:shadow-none` | variant map (`default`, `neutral`) | `shadow` prop value `default`                                                                                      |
| `hover:-translate-x-... hover:-translate-y-... hover:shadow-nb` | variant map (`reverse`)            | `shadow` prop value `reverse`                                                                                      |
| (no shadow classes)                                             | variant map (`noShadow`)           | `shadow` prop value `none`                                                                                         |

### 4.2 Step B — Baseline capture

Take the screenshots described in §3.2 for the button docs page before any code change. Record default-variant computed values into the audit table below — these are the **target rendered values** for the docs page, regardless of how the library now produces them.

Default variant (light mode), pre-refactor computed values:

| Property           | Today's rendered value        | Source after refactor                                                             |
| ------------------ | ----------------------------- | --------------------------------------------------------------------------------- |
| `background-color` | `rgb(255, 255, 255)` (`#fff`) | docs example uses `style="--nb-button-bg: #fff"` to override the new spec default |
| `color`            | `oklch(10% 0 0)`              | `var(--nb-button-fg)` default `var(--nb-main-foreground)`                         |
| `border-color`     | `rgb(0, 0, 0)`                | `var(--nb-button-border)` default `var(--nb-border)`                              |
| `border-radius`    | `0`                           | `var(--nb-button-radius)` default `var(--nb-radius)`                              |
| `box-shadow`       | `4px 4px 0 #000`              | `var(--nb-button-shadow)` default                                                 |

All other variants and states on the docs page have their rendered values preserved the same way — via override or variant swap as captured in Step G.

### 4.3 Step C — Token defaults (spec, not audit)

The library follows the spec exactly. The audit values are _not_ used here — they live in the docs example markup via overrides if needed (§3.7).

```ts
// In base classes() — strict TOKENS.md spec
'[--nb-button-bg:var(--nb-main)]',
'[--nb-button-fg:var(--nb-main-foreground)]',
'[--nb-button-border:var(--nb-border)]',
'[--nb-button-radius:var(--nb-radius)]',
'[--nb-button-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
```

### 4.4 Step D — Variant + shadow + size

Variants (semantics-only, color reassignments derived from audit — see §8 open question 1):

```ts
const variantMap: Record<NbButtonVariant, string> = {
  default: '', // matches base (yellow main)
  neutral: '[--nb-button-bg:var(--nb-background)] [--nb-button-fg:var(--nb-foreground)]',
  primary: '[--nb-button-bg:var(--nb-primary)] [--nb-button-fg:var(--nb-primary-foreground)]',
  secondary: '[--nb-button-bg:var(--nb-secondary)] [--nb-button-fg:var(--nb-secondary-foreground)]',
  accent: '[--nb-button-bg:var(--nb-accent)] [--nb-button-fg:var(--nb-accent-foreground)]',
  danger: '[--nb-button-bg:var(--nb-danger)] [--nb-button-fg:var(--nb-danger-foreground)]',
  success: '[--nb-button-bg:var(--nb-success)] [--nb-button-fg:var(--nb-success-foreground)]',
  warning: '[--nb-button-bg:var(--nb-warning)] [--nb-button-fg:var(--nb-warning-foreground)]',
};
```

The six new semantic variants (`primary`/`secondary`/`accent`/`danger`/`success`/`warning`) don't exist today. They're added per spec. Block on light + dark contrast review before merging (see §9 question 2).

Shadows (lifted out of variant — see §4.5 migration):

```ts
const shadowMap: Record<NbButtonShadow, string> = {
  default: 'hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none',
  none: '[--nb-button-shadow:none]',
  reverse: '[--nb-button-shadow:none] hover:-translate-x-(--nb-reverse-shadow-offset-x) hover:-translate-y-(--nb-reverse-shadow-offset-y) hover:shadow-[var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
};
```

Note: `shadow="default"` keeps the current `hover:shadow-none` (matches today's behavior). The alternative (`hover:[--nb-button-shadow:none]`) is more "correct" tokenwise but depends on Tailwind v4 arbitrary-property hover syntax. **Decision: use `hover:shadow-none` to preserve today's behavior exactly.** Document the asymmetry: overriding `--nb-button-shadow` won't be respected on hover with `shadow="default"`. See §8 open question 3.

Sizes unchanged from today's `sizeClass()`.

### 4.5 Migration of removed variants (docs examples)

Old variants `reverse` and `noShadow` are removed. Docs examples migrate to the new API:

| Old example markup                                                   | New example markup                                                                                                                | Color preserved by                  |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `<button nbButton>` (renders `#fff`)                                 | `<button nbButton style="--nb-button-bg: #fff">`                                                                                  | inline override                     |
| `<button nbButton variant="neutral">` (renders `#fff` in both modes) | `<button nbButton style="--nb-button-bg: #fff">` _or_ `variant="neutral"` if dark-mode color change is acceptable on that example | inline override (safest)            |
| `<button nbButton variant="reverse">`                                | `<button nbButton shadow="reverse" style="--nb-button-bg: #fff">`                                                                 | inline override + new `shadow` prop |
| `<button nbButton variant="noShadow">`                               | `<button nbButton shadow="none" style="--nb-button-bg: #fff">`                                                                    | inline override + new `shadow` prop |

**Action:** grep `variant="reverse"` and `variant="noShadow"` across `apps/docs`. Every call site is rewritten in the same PR. The lib has no internal call sites to migrate — only docs.

External consumers face a breaking change (variant names + default color). Pre-1.0, acceptable. Note in CHANGELOG.

### 4.6 Step E — Verification (button)

1. **Unit tests:**
   - New `button.tokens.spec.ts` per §3.6 pattern: token defaults match spec (`var(--nb-main)` etc.), variant reassignments, shadow reassignments, base class shape preserved.
   - Existing button specs referencing removed variants (`reverse`/`noShadow`) updated to the new `shadow` prop API.
2. **Docs visual diff (must be pixel-identical):**
   - Library refactor lands. Walk the docs button page comparing against Step B baseline.
   - Any example whose color shifted → migrate per §3.7 (override or variant swap, see §4.5 table).
   - Re-screenshot. Acceptance: every example × state × mode matches baseline exactly.
   - Special attention: the Preview example's existing `style="--nb-button-bg: var(--nb-yellow)"` keeps the override semantics — verify it still wins over the new spec default.
3. **Override smoke test (library-level, demonstrates token API):**
   - `<button nbButton style="--nb-button-radius: 9999px">` → only that button is pill-shaped.
   - `:root { --nb-button-radius: 9999px }` in DevTools → every button on the page becomes pill-shaped.
   - `<button nbButton style="--nb-button-shadow: 6px 6px 0 magenta">` → only that button has magenta shadow at rest.

### 4.7 Step F — Phase 1 verification checklist

Walk through `TOKENS.md` §"Rollout plan, step 2":

- [x] Directive readable, class string not bloated past today's ceiling
- [x] Variant and shadow maps each fit on one screen
- [ ] DevTools shows the token chain cleanly: `--nb-button-bg: var(--nb-primary)` resolving to the hex
- [ ] All eight spec variants render with acceptable contrast in light + dark mode
- [ ] `style="--nb-button-bg: hotpink"` overrides one button only, no leak to nested elements
- [ ] `:root { --nb-button-radius: 9999px }` makes every button pill-shaped without further changes
- [ ] `style="--nb-button-shadow: 6px 6px 0 magenta"` works
- [x] Existing button tests pass; new tokens spec passes
- [ ] **Docs button page renders pixel-identical to Step B baseline** (after example migration per §3.7 and §4.5)
- [x] No `variant="reverse"` or `variant="noShadow"` remains anywhere under `apps/`

**Stop point.** Do not start Phase 2 until each box is ticked. If any box cannot be ticked, revise the pattern in `TOKENS.md` first, then come back.

### 4.8 Phase 1 implementation handoff

Status as of 2026-05-19: the button pilot code migration is implemented, formatted, linted, and built. Manual visual verification is still outstanding.

Library changes:

- `libs/ui/src/lib/button/button.directive.ts`
  - Added `shadow = input<NbButtonShadow>('default')`.
  - Added `data-shadow` host attribute.
  - Replaced direct border/radius/shadow utilities with scoped token defaults and reads:
    - `--nb-button-bg: var(--nb-main)`
    - `--nb-button-fg: var(--nb-main-foreground)`
    - `--nb-button-border: var(--nb-border)`
    - `--nb-button-radius: var(--nb-radius)`
    - `--nb-button-shadow: var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)`
  - Changed `variantClass()` so `default` is empty and non-default variants only reassign scoped tokens.
  - Added `shadowClass()` for `default`, `none`, and `reverse`.
- `libs/ui/src/lib/button/button.types.ts`
  - Replaced old `NbButtonVariant = 'default' | 'reverse' | 'noShadow' | 'neutral'`.
  - New variants are `default | neutral | primary | secondary | accent | danger | success | warning`.
  - Added `NbButtonShadow = 'default' | 'none' | 'reverse'`.
- `libs/ui/src/lib/button/index.ts` and `libs/ui/src/index.ts`
  - Export `NbButtonShadow`.

Test changes:

- Added `libs/ui/src/lib/button/button.tokens.spec.ts`.
- Test coverage asserts:
  - base scoped token defaults are present literally in the class string,
  - the directive reads scoped tokens rather than direct global utility tokens,
  - every non-default variant reassigns `--nb-button-bg` and `--nb-button-fg`,
  - `shadow="none"` and `shadow="reverse"` reassign the shadow token/hover behavior,
  - the default layout/focus/disabled class shape did not regress.

Docs/example migration:

- Updated `apps/docs/src/app/docs/docs-tokens.ts` so the button table lists only the real button scoped token surface:
  - `--nb-button-bg`
  - `--nb-button-fg`
  - `--nb-button-border`
  - `--nb-button-radius`
  - `--nb-button-shadow`
- Updated `apps/docs/src/app/pages/components/button.page.ts`:
  - API table now includes the new variant union and `shadow` input.
  - Variants snippet now uses `shadow="reverse"` and `shadow="none"` instead of removed variants.
  - Examples that relied on the old white default now use `style="--nb-button-bg: #fff"`.
- Updated docs call sites that relied on the old button default or old variants:
  - `apps/docs/src/app/pages/(home).page.ts`
  - `apps/docs/src/app/pages/docs/introduction.page.ts`
  - `apps/docs/src/app/pages/docs/installation.page.ts`
  - `apps/docs/src/app/pages/components/card.page.ts`
  - `apps/docs/src/app/pages/components/dialog.page.ts`
  - `apps/docs/src/app/pages/components/input.page.ts`
  - `apps/docs/src/app/pages/components/examples/contact-us-dialog.ts`
  - `apps/docs/src/app/pages/components/examples/job-listing-card.ts`
  - `apps/docs/src/app/pages/showcase/portfolio/components/portfolio-contact-dialog.ts`

Verification already run:

- `pnpm nx lint ui --output-style=stream` — passed.
- `pnpm nx lint docs --output-style=stream` — passed.
- `pnpm nx build ui --output-style=stream` — passed.
- `pnpm nx build docs --output-style=stream` — passed.
- `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/button/button.tokens.spec.ts --reporter=verbose` — passed, 12 tests.
- `rg -n "variant=\"(reverse|noShadow)\"|noShadow" apps libs -g '*.ts' -g '*.html'` — no old button variant call sites remain.

Known verification gaps:

- `pnpm nx test ui` does not pass yet, but the failures observed are outside the button pilot:
  - `libs/ui/src/lib/accordion/accordion.component.spec.ts` imports missing `./accordion.component`.
  - `libs/ui/src/lib/select/select.spec.ts` expects focus/border classes that the current select trigger class string does not include.
- Manual browser checks from §4.7 are not complete:
  - DevTools token-chain inspection.
  - Light/dark contrast review for all eight variants.
  - Scoped override smoke tests for `--nb-button-bg`, `--nb-button-radius`, and `--nb-button-shadow`.
  - Pixel comparison of the button docs page against the pre-refactor baseline.

Recommended next step before Phase 2:

1. Run `pnpm nx serve docs` and open `/components/button`.
2. Complete the remaining §4.7 manual checks.
3. If visual parity holds, mark the remaining §4.7 checkboxes complete.
4. Then start Phase 2 with accordion (§5.1), because it is the original motivating example for scoped tokens and still reads global color tokens directly.

---

## 5. Phase 2 — Component rollout

Order chosen by motivating value (accordion was the original example in `TOKENS.md`) then by complexity (small, prop-light components before compound components). One PR per component, each applying the §3 protocol end-to-end.

### 5.0 Phase 2 entry criteria + proven recipe

Phase 1 landed the button pilot (commit `5168aca`) and confirmed the protocol works. Phase 2 inherits that ground truth — every component PR replicates the same shape rather than re-deriving it.

**Entry gate** (must hold before opening a Phase 2 PR):

- Manual checks left over from §4.7 (DevTools token chain inspection, light/dark contrast review, scoped override smoke tests, pixel comparison of the button docs page) can land alongside the first Phase 2 PR — they don't gate Phase 2 conceptually, but flag any drift they uncover as it could change the per-component shadow/border defaults you'll mirror.
- ~~The remaining pre-existing full-suite blocker is `libs/ui/src/lib/accordion/accordion.component.spec.ts`.~~ **RESOLVED 2026-05-19.** The spec now imports the real accordion files (`accordion.ts`, `accordion-content.ts`, `accordion-item.ts`, `accordion-trigger.ts`), uses the real `nb-accordion-*` selectors, and preserves the useful open/close/disabled/default-value coverage.
- The earlier select spec blocker is resolved in §5.5. `libs/ui/src/lib/select/select.spec.ts` now asserts focus treatment on the `<nb-select>` host and grouped native selects through the `border-0` override.

**Current handoff as of 2026-05-19:**

- Implemented in this working tree: button, accordion, card, input, textarea, select, input-group, and dialog scoped-token surfaces.
- The accordion full-suite blocker is fixed and accordion §5.1 is implemented. `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/accordion/accordion.tokens.spec.ts src/lib/accordion/accordion.component.spec.ts --reporter=verbose` passes with `11 passed`.
- Dialog §5.7 is implemented. `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/dialog/dialog.tokens.spec.ts --reporter=verbose` passes with `4 passed`.
- `pnpm nx test ui --output-style=stream` now passes.
- Focused input-group/select verification passed: `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/input-group/input-group.tokens.spec.ts src/lib/select/select.spec.ts src/lib/select/select.tokens.spec.ts --reporter=verbose` — `22 passed`.
- Latest validation also passed: `pnpm nx lint ui --output-style=stream`, `pnpm nx lint docs --output-style=stream`, `pnpm nx build ui --output-style=stream`, and `pnpm nx build docs --output-style=stream`.
- Manual docs visual checks are still outstanding for `/components/accordion`, `/components/input`, `/components/textarea`, `/components/input-group`, `/components/select`, and `/components/dialog`; do those before claiming those component PRs visually complete.
- Recommended next step: either run the outstanding manual docs visual checks, or continue implementation with badge token rollout (§5.2). After badge, continue checkbox (§5.6).

**Per-component PR template** (literal recipe, distilled from button pilot — replicate verbatim):

1. **Branch + audit.** Inventory per §3.1 into a markdown table inside the PR description (mirrors the button table in §4.1). List: every example on the docs page + every override prop currently demonstrated + every class in the directive's class string sorted into layout vs color/border/shadow/radius.
2. **Refactor the directive.** Inline the scoped-token defaults block-first (`[--nb-<comp>-<prop>:<value>]`), then the reads (`bg-(--nb-<comp>-bg)`, `border-(--nb-<comp>-border)`, etc.). Defaults follow `TOKENS.md` spec strictly — visual parity is preserved at the docs layer (§3.7), not by weakening library defaults. For radius/border/shadow specifically: keep the chain `--nb-<comp>-radius: var(--nb-radius)`, `--nb-<comp>-border: var(--nb-border)`, `--nb-<comp>-shadow: var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)`. Don't anchor to a hex.
3. **Variant/state maps.** Default row is `''`. Non-default rows reassign tokens only — never `bg-*` or `text-*` utilities. Apply to badge, etc.
4. **Write `<component>.tokens.spec.ts`** following the button spec's shape verbatim (`libs/ui/src/lib/button/button.tokens.spec.ts:1` is the reference). The five tests it ships:
   - declares the expected default tokens on the base host (one `toContain` per token),
   - reads its scoped tokens, not globals directly (positive `bg-(--nb-<comp>-bg)` assertions + negative `not.toContain('bg-(--nb-main)')`),
   - one `it.each` row per non-default variant asserting both `--nb-<comp>-bg` and `--nb-<comp>-fg` reassignment,
   - one test per non-default state prop (shadow, etc.) asserting the token reassignment and hover behavior,
   - "does not regress the default class shape" — pins the layout/focus/disabled classes that must survive the refactor.
5. **Docs example migration per §3.7 + §4.5 pattern.** For every example whose rendered color shifts, prefer variant swap; if none matches, add a scoped inline override `style="--nb-<comp>-<prop>: <value>"`. Re-screenshot and verify pixel-identical to baseline.
6. **Update `apps/docs/src/app/docs/docs-tokens.ts`** so the component's table lists only its real scoped surface. Remove global tokens that were leaking in (e.g. the `--nb-main`/`--nb-surface` rows in `accordion`, `--nb-input-background` in `input`/`select`/`textarea`).
7. **Verification matrix run before requesting review:**
   - `pnpm nx lint ui --output-style=stream`
   - `pnpm nx lint docs --output-style=stream`
   - `pnpm nx build ui --output-style=stream`
   - `pnpm nx build docs --output-style=stream`
   - `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/<component>/<component>.tokens.spec.ts --reporter=verbose`
   - `rg -n "<any old variant/token names>" apps libs -g '*.ts' -g '*.html'` to confirm no orphan call sites
   - Manual: `pnpm nx serve docs`, walk the component's page with DevTools open, verify the token chain resolves cleanly and a scoped `style="--nb-<comp>-<prop>: hotpink"` override does not leak.

**Patterns proven in Phase 1, mandatory for Phase 2:**

- Defaults live inline in the directive's class string, not in `theme.css` (TOKENS.md §"Guiding principles" #4). Phase 2 must not regress this — if a draft adds new entries to `theme.css`, treat as a review-blocking smell.
- `variant="default"` map row is `''` — base produces it. Verified working in `button.directive.ts:57`.
- Hover token reassignment limitation (§9 question 3): the literal `hover:shadow-none` form was kept in button (`button.directive.ts:80`) because Tailwind v4 arbitrary-property-in-variant syntax isn't proven in this project. Phase 2 components with hover state changes mirror this — use literal `hover:` utilities for now. The asymmetry that scoped overrides won't be respected on the hover branch is documented per-component in the PR description.
- Test pattern: `it.each` for the variant axis (see `button.tokens.spec.ts:50`). Keeps the spec compact when a component has 5+ variants.

| #   | Component                      | Driving props                               | Anticipated scoped tokens                                                                                                    | Complexity                  |
| --- | ------------------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| 1   | accordion                      | (none yet — see 5.1)                        | `--nb-accordion-item-bg/fg/border/radius/shadow`, `--nb-accordion-trigger-bg/fg`, `--nb-accordion-content-bg/fg`             | Medium — implemented        |
| 2   | badge                          | `variant`                                   | `--nb-badge-bg/fg/border/radius/shadow`                                                                                      | Low                         |
| 3   | card                           | (none yet)                                  | `--nb-card-bg/fg/border/radius/shadow`                                                                                       | Low                         |
| 4   | input                          | `size` (layout, not color)                  | `--nb-input-bg/fg/border/radius`                                                                                             | Low                         |
| 5   | textarea                       | `size`                                      | `--nb-textarea-bg/fg/border/radius` (see 5.4)                                                                                | Low                         |
| 6   | select (directive + component) | `size`                                      | `--nb-select-bg/fg/border/radius`, `--nb-select-listbox-bg`                                                                  | Medium — implemented        |
| 7   | checkbox                       | (none yet)                                  | `--nb-checkbox-bg/fg/border/radius`                                                                                          | Low                         |
| 8   | input-group + prefix/suffix    | (none yet)                                  | `--nb-input-group-bg/border/radius`, `--nb-input-group-addon-bg`, `--nb-input-group-prefix-bg`, `--nb-input-group-suffix-bg` | Medium — implemented        |
| 9   | dialog                         | (none yet)                                  | `--nb-dialog-bg/fg/border/radius/shadow`, `--nb-dialog-description-fg`, `--nb-dialog-content-bg`, `--nb-dialog-actions-bg`   | Medium — implemented        |
| 10  | title                          | (existing wave tokens conform)              | Keep `--nb-title-wave-*`                                                                                                     | Trivial — rename audit only |
| 11  | image-card                     | (none yet)                                  | `--nb-image-card-bg/fg/border/radius/shadow`                                                                                 | Low                         |
| 12  | avatar                         | (none yet)                                  | `--nb-avatar-bg/fg/border/radius`                                                                                            | Low                         |
| 13  | label                          | (none yet)                                  | Likely zero scoped tokens — reads `--nb-foreground` only                                                                     | Trivial                     |
| 14  | marquee                        | (existing `--nb-marquee-duration` conforms) | Keep                                                                                                                         | Trivial                     |

For every component, the work pattern is identical:

1. §3.1 inventory (what's in the directive today, what's on the docs page, what overrides are demonstrated)
2. §3.2 baseline capture
3. §3.3 token defaults derived from baseline values
4. §3.4 variant/state maps
5. §3.5 verification: unit + visual diff + override smoke
6. §3.6 add a `<component>.tokens.spec.ts`
7. §3.7 update `docs-tokens.ts`

The component-specific notes below capture decisions or pitfalls beyond the template.

### 5.1 Accordion

The accordion has **three** scoped surfaces, not two as the §5 table previously implied. Inventory of the current directive code (`libs/ui/src/lib/accordion/`):

- **`accordion-item.ts:44`** wrapper reads `rounded-nb border-2 border-(--nb-border) bg-(--nb-surface) text-(--nb-surface-foreground) shadow-nb` — the outer box. Needs its own scope.
- **`accordion-trigger.ts:44`** reads `bg-(--nb-main) text-(--nb-main-foreground)` directly — the leaky pattern from `TOKENS.md` line 16 and the original motivating example.
- **`accordion-content.ts:40`** reads `bg-(--nb-surface) text-(--nb-surface-foreground)` directly.

Audit-derived defaults (spec column from `TOKENS.md`, baseline column from current code — both match here, no override gymnastics needed):

| Token                        | Default                        | Source                                            |
| ---------------------------- | ------------------------------ | ------------------------------------------------- |
| `--nb-accordion-item-bg`     | `var(--nb-surface)`            | `accordion-item.ts:44` (`bg-(--nb-surface)`)      |
| `--nb-accordion-item-fg`     | `var(--nb-surface-foreground)` | `accordion-item.ts:44` (`text-(--nb-surface-fg)`) |
| `--nb-accordion-item-border` | `var(--nb-border)`             | `accordion-item.ts:44` (`border-(--nb-border)`)   |
| `--nb-accordion-item-radius` | `var(--nb-radius)`             | `accordion-item.ts:44` (`rounded-nb`)             |
| `--nb-accordion-item-shadow` | standard `--nb-shadow*` chain  | `accordion-item.ts:44` (`shadow-nb`)              |
| `--nb-accordion-trigger-bg`  | `var(--nb-main)`               | `accordion-trigger.ts:44`                         |
| `--nb-accordion-trigger-fg`  | `var(--nb-main-foreground)`    | `accordion-trigger.ts:44`                         |
| `--nb-accordion-content-bg`  | `var(--nb-surface)`            | `accordion-content.ts:40`                         |
| `--nb-accordion-content-fg`  | `var(--nb-surface-foreground)` | `accordion-content.ts:40`                         |

Do **not** add `--nb-accordion-trigger-bg-open` — no prop drives it (the `border-b-2` open-state class on `accordion-trigger.ts:52` is structural, not a color reassignment). Post-migration, the motivating override becomes scoped: `<nb-accordion-trigger style="--nb-accordion-trigger-bg: var(--nb-lavender)">`.

**Status 2026-05-19:** implemented.

- `libs/ui/src/lib/accordion/accordion-item.ts` now declares and reads `--nb-accordion-item-bg`, `--nb-accordion-item-fg`, `--nb-accordion-item-border`, `--nb-accordion-item-radius`, and `--nb-accordion-item-shadow`.
- `libs/ui/src/lib/accordion/accordion-trigger.ts` now declares and reads `--nb-accordion-trigger-bg` and `--nb-accordion-trigger-fg`; its focus ring and open-state bottom border read the inherited `--nb-accordion-item-border`.
- `libs/ui/src/lib/accordion/accordion-content.ts` now declares and reads `--nb-accordion-content-bg` and `--nb-accordion-content-fg`.
- `apps/docs/src/app/pages/components/accordion.page.ts` replaced the leaky `style="--nb-main: var(--nb-lavender)"` trigger overrides with `style="--nb-accordion-trigger-bg: var(--nb-lavender)"`.
- `apps/docs/src/app/docs/docs-tokens.ts` now lists the nine-token accordion scoped surface instead of global `--nb-main` / `--nb-surface` rows.
- Added `libs/ui/src/lib/accordion/accordion.tokens.spec.ts`.

Verified:

- `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/accordion/accordion.tokens.spec.ts src/lib/accordion/accordion.component.spec.ts --reporter=verbose` — passed, 11 tests.

Known verification gaps:

- Manual docs visual checks are still outstanding for `/components/accordion`: default, multiple, controlled, disabled, open/closed states, light mode, dark mode, and scoped override smoke tests for `--nb-accordion-item-bg`, `--nb-accordion-trigger-bg`, and `--nb-accordion-content-bg`.

### 5.2 Badge

Closest analogue to button. Existing variants: `default | secondary | success | warning | destructive` (`libs/ui/src/lib/badge/badge.directive.ts:28`).

**Partial migration already on `main`:** commit `698b410` tokenized the radius (`--nb-badge-radius: 9999px` inline default + `rounded-(--nb-badge-radius)` read) and shipped `libs/ui/src/lib/badge/badge.directive.spec.ts` asserting it. The variant map still uses raw utilities (`bg-(--nb-accent) text-(--nb-accent-foreground)`, etc.) — those are the leaky pattern the rest of this PR must convert.

What's left in this PR:

1. Add the rest of the scoped surface inline as defaults:
   - `--nb-badge-bg` default `#fff` (audit value — today's `default` variant is `bg-white`)
   - `--nb-badge-fg` default `var(--nb-foreground)`
   - `--nb-badge-border` default `var(--nb-border)`
   - `--nb-badge-shadow` default `2px 2px 0 var(--nb-shadow)` (verbatim from `badge.directive.ts:22` — note the `2px 2px` is per-component, not the global `--nb-shadow-offset-x/y`; see §9 question 5)
2. Replace direct reads (`border-(--nb-border)`, `shadow-[2px_2px_0_0_var(--nb-shadow)]`) with `border-(--nb-badge-border)` and `shadow-[var(--nb-badge-shadow)]`.
3. Convert the variant map to token reassignments only (no `bg-*`/`text-*` utilities). `default` row becomes `''`.
4. Roll the existing `badge.directive.spec.ts` into the §5.0 token spec template — current file only tests the radius; expand to cover all defaults, every variant reassignment, and the no-regression class-shape check.

**Naming wart:** badge calls it `destructive`; button calls it `danger`. Don't rename in this phase — it's a separate visual+API concern. Flagged in §6 cleanup.

**`--nb-badge-shadow` follow-up:** the badge uses `2px 2px` while the global `--nb-shadow-offset-x/y` is `4px`. Preserve `2px 2px` in the token default — do not silently re-anchor to the global. Same boundary as the dialog `8px 8px` case in §5.7.

### 5.3 Card

No `variant` prop. Audit current values (`bg-(--nb-background) text-(--nb-foreground) rounded-nb border-2 border-(--nb-border) shadow-nb`). Tokens are scoped escape hatches only — base class produces identical output.

Status as of 2026-05-19: the root card surface is implemented.

- `libs/ui/src/lib/card/card.ts` now declares and reads:
  - `--nb-card-bg: var(--nb-background)`
  - `--nb-card-fg: var(--nb-foreground)`
  - `--nb-card-border: var(--nb-border)`
  - `--nb-card-radius: 18px`
  - `--nb-card-shadow: var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)`
- Added `libs/ui/src/lib/card/card.tokens.spec.ts` covering default token declarations, scoped reads, default root class shape, and sub-part class shape.
- Updated `apps/docs/src/app/docs/docs-tokens.ts` so the card token table lists the five scoped card tokens.

Verification already run:

- `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/card/card.tokens.spec.ts --reporter=verbose` — passed, 4 tests.
- `pnpm nx lint ui --output-style=stream` — passed.
- `pnpm nx lint docs --output-style=stream` — passed.
- `pnpm nx build ui --output-style=stream` — passed.
- `pnpm nx build docs --output-style=stream` — passed.

Next step for card:

- Run `pnpm nx serve docs --output-style=stream` and open `/components/card`.
- Compare the card examples against the pre-token rollout baseline in light and dark mode. The root card should still render with the same background, text color, border, and shadow; the scoped radius now defaults to `18px`.
- In DevTools, smoke-test scoped overrides:
  - Set `style="--nb-card-bg: hotpink"` on one `<nb-card>` and verify only that card changes.
  - Set `style="--nb-card-radius: 9999px"` on one `<nb-card>` and verify only that card becomes pill-shaped.
  - Set `:root { --nb-card-shadow: 8px 8px 0 magenta; }` and verify all cards pick up the shadow.
- If those checks pass, mark card as manually verified and move to the next rollout component. Per the phase order, the next implementation target is `input`/`textarea` token renaming, unless you want to return to the earlier `accordion` or `badge` slots first.

### 5.4 Input vs textarea — token sharing

Both read `--nb-input-background` today. Two options:

- **Option A — separate scopes:** `--nb-input-bg`, `--nb-textarea-bg`. Independently customizable.
- **Option B — shared scope:** `--nb-input-bg` only; textarea reads it too.

**Recommendation: Option A**, with `--nb-textarea-bg` defaulting to `var(--nb-input-bg)`. Same default, optional override. Costs one extra default line, gains independence.

Status as of 2026-05-19: the input + textarea field surface is implemented.

- `libs/ui/src/lib/input/input.directive.ts` now declares and reads:
  - `--nb-field-bg: #faf3d6`
  - `--nb-input-bg: var(--nb-field-bg)`
  - `--nb-input-fg: var(--nb-foreground)`
  - `--nb-input-border: var(--nb-border)`
  - `--nb-input-radius: var(--nb-radius)`
  - `--nb-input-shadow: var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)`
- `libs/ui/src/lib/textarea/textarea.directive.ts` now declares and reads:
  - `--nb-textarea-bg: var(--nb-input-bg, var(--nb-field-bg))`
  - `--nb-textarea-fg: var(--nb-foreground)`
  - `--nb-textarea-border: var(--nb-border)`
  - `--nb-textarea-radius: var(--nb-radius)`
  - `--nb-textarea-shadow: var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)`
- The legacy `--nb-input-background` name was removed from code and docs. Native and custom select now use `--nb-input-bg` as the transitional shared field background until the full select token PR lands.
- Added:
  - `libs/ui/src/lib/input/input.tokens.spec.ts`
  - `libs/ui/src/lib/textarea/textarea.tokens.spec.ts`
- Updated `apps/docs/src/app/docs/docs-tokens.ts` for the input and textarea token tables, and changed select/input-group references from `--nb-input-background` to `--nb-input-bg`.

Verification already run:

- `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/input/input.tokens.spec.ts src/lib/textarea/textarea.tokens.spec.ts --reporter=verbose` — passed, 6 tests.
- `pnpm nx lint ui --output-style=stream` — passed.
- `pnpm nx lint docs --output-style=stream` — passed.
- `pnpm nx build ui --output-style=stream` — passed.
- `pnpm nx build docs --output-style=stream` — passed.
- `rg --glob '*.ts' --glob '*.css' -n -- "--nb-input-background" libs/ui/src/lib apps/docs/src/app` — no old token call sites remain.

Known verification gaps:

- Manual docs visual checks are still outstanding for `/components/input`, `/components/textarea`, `/components/input-group`, and `/components/select`. Expected rendered color is unchanged (`#faf3d6`) because the new token defaults preserve the old field background.

### 5.5 Select (compound: directive + component)

Both `select[nbSelect]` and `<nb-select>` share scoped tokens (named `select`, not separated):

- `--nb-select-bg` default `var(--nb-input-bg, var(--nb-field-bg))` — chained from input scope when present, with the shared field background fallback
- `--nb-select-fg`, `--nb-select-border`, `--nb-select-radius` standard
- `--nb-select-listbox-bg` for `<nb-select>` dropdown only

Don't add `--nb-select-option-hover-bg` yet — no driving use case.

**Working-tree status note (resolved):** the in-flight changes flagged in §1.2 were merged ahead of Phase 1 — `select.directive.ts`, `select.ts`, `input-group.ts`, and `input-group-prefix.ts` are committed on `main`. Treat them as the current baseline; re-audit fresh against them.

**Pre-existing test blocker for this PR (resolved):** `libs/ui/src/lib/select/select.spec.ts` was red on `pnpm nx test ui`. The "uses the same focus treatment as inputs and textareas" test asserted `focus-visible:ring-2` / `focus-visible:ring-(--nb-border)` / `focus-visible:ring-offset-2` / `focus-visible:shadow-none` on `button[aria-haspopup="listbox"]`. But in `select.ts`, `triggerClasses()` deliberately omits those — they live on `hostClasses()` as `focus-within:ring-*` on the `<nb-select>` host. The assertions now read the host element and the scoped select border token.

**`--nb-input-bg` rename ordering:** resolved by §5.4. Select no longer reads `--nb-input-background`; both native `select[nbSelect]` and custom `<nb-select>` now expose `--nb-select-bg`, which defaults through `--nb-input-bg` before falling back to `--nb-field-bg`.

Status as of 2026-05-19: select scoped-token rollout is implemented.

- `select[nbSelect]` now declares and reads `--nb-select-bg/fg/border/radius`.
- `<nb-select>` now declares and reads `--nb-select-bg/fg/border/radius` plus `--nb-select-listbox-bg`; the custom options read the select foreground and border tokens for text and focus rings.
- Select option selected/hover backgrounds stay literal (`#bdf7c8` / `#e8d6ff`) so `--nb-select-selected-bg` and `--nb-select-option-hover-bg` do not become public token surface yet.
- `libs/ui/src/lib/styles/styles.css` keeps native select base background aligned with `--nb-select-bg`.
- `libs/ui/src/lib/select/select.spec.ts` now asserts custom select focus on the host `focus-within` treatment and native grouped selects via the `border-0` override.
- Added `libs/ui/src/lib/select/select.tokens.spec.ts`.
- Updated `apps/docs/src/app/docs/docs-tokens.ts` for the select token table.

Verification already run:

- `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/select/select.spec.ts src/lib/select/select.tokens.spec.ts --reporter=verbose` — passed, 18 tests.
- `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/input-group/input-group.tokens.spec.ts src/lib/select/select.spec.ts src/lib/select/select.tokens.spec.ts --reporter=verbose` — passed, 22 tests.
- `pnpm nx lint ui --output-style=stream` — passed.
- `pnpm nx lint docs --output-style=stream` — passed.
- `pnpm nx test docs --output-style=stream` — passed.
- `pnpm nx build ui --output-style=stream` — passed.
- `pnpm nx build docs --output-style=stream` — passed.
- `pnpm nx test ui --output-style=stream` — still blocked by the pre-existing `libs/ui/src/lib/accordion/accordion.component.spec.ts` import of missing `./accordion.component`; select specs pass directly.

Known verification gaps:

- Manual docs visual checks are still outstanding for `/components/select`: custom select rest/hover/focus/open/selected/disabled states, native select, grouped select inside forms, light mode, dark mode, and scoped override smoke tests for `--nb-select-bg`, `--nb-select-fg`, `--nb-select-border`, `--nb-select-radius`, and `--nb-select-listbox-bg`.

### 5.6 Input-group rename

`--nb-input-addon-bg` and `--nb-input-prefix-bg` exist today with inconsistent grammar (the component is _input-group_, not input). Rename:

- `--nb-input-addon-bg` → `--nb-input-group-addon-bg`
- `--nb-input-prefix-bg` → `--nb-input-group-prefix-bg`
- Add `--nb-input-group-suffix-bg` defaulting to `var(--nb-input-group-addon-bg)`

**Audit watch:** `styles.css` line 101 sets `--nb-input-prefix-bg` on `:where([nbInputPrefix]:has(svg))`. The override must continue to work post-rename — likely means updating that selector to set the new name.

Breaking change. Pre-1.0 acceptable; no alias.

Status as of 2026-05-19: input-group scoped-token rollout is implemented.

- `nb-input-group` now declares and reads `--nb-input-group-bg/border/radius`.
- `[nbInputPrefix]` now declares `--nb-input-group-addon-bg` and `--nb-input-group-prefix-bg`; `[nbInputSuffix]` declares `--nb-input-group-addon-bg` and `--nb-input-group-suffix-bg`.
- `libs/ui/src/lib/styles/styles.css` moved the SVG-prefix override to `--nb-input-group-prefix-bg`.
- Removed legacy component-scoped `--nb-input-addon-bg` and `--nb-input-prefix-bg` from `theme.css`.
- Updated `apps/docs/src/app/docs/docs-tokens.ts` and `libs/ui/src/lib/input-group/input-group.tokens.spec.ts`.

Verification already run:

- `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/input-group/input-group.tokens.spec.ts src/lib/select/select.spec.ts src/lib/select/select.tokens.spec.ts --reporter=verbose` — passed, 22 tests.
- `pnpm nx lint ui --output-style=stream` — passed.
- `pnpm nx lint docs --output-style=stream` — passed.
- `pnpm nx build ui --output-style=stream` — passed.
- `pnpm nx build docs --output-style=stream` — passed.
- `pnpm nx test ui --output-style=stream` — still blocked by the pre-existing `libs/ui/src/lib/accordion/accordion.component.spec.ts` import of missing `./accordion.component`; input-group specs pass directly.

Known verification gaps:

- Manual docs visual checks are still outstanding for `/components/input-group`: prefix/suffix, textarea, disabled, light mode, dark mode, and scoped override smoke tests for `--nb-input-group-bg`, `--nb-input-group-border`, `--nb-input-group-radius`, `--nb-input-group-addon-bg`, `--nb-input-group-prefix-bg`, and `--nb-input-group-suffix-bg`.

### 5.7 Dialog

Existing `--nb-dialog-content-bg`, `--nb-dialog-actions-bg` conform — keep. Add the outer-box tokens (`--nb-dialog-bg/fg/border/radius/shadow`) replacing today's hardcoded `bg-white shadow-[8px_8px_0_0_var(--nb-shadow)]`. **Audit watch:** the shadow is `8px 8px` here, not `var(--nb-shadow-offset-x) var(--nb-shadow-offset-y)`. Preserve `8px 8px` in the token default — do not silently re-anchor to the global offset.

Rename `--nb-dialog-description-color` → `--nb-dialog-description-fg` for grammar conformance.

**Status 2026-05-19:** implemented.

- `libs/ui/src/lib/dialog/dialog.ts` now declares and reads `--nb-dialog-bg`, `--nb-dialog-fg`, `--nb-dialog-border`, `--nb-dialog-radius`, and `--nb-dialog-shadow`; the shadow default preserves `8px 8px 0 0 var(--nb-shadow)`.
- `libs/ui/src/lib/dialog/dialog-description.ts` now declares and reads `--nb-dialog-description-fg`; the old `--nb-dialog-description-color` string has no remaining code/docs references.
- `libs/ui/src/lib/dialog/dialog-content.ts` and `libs/ui/src/lib/dialog/dialog-actions.ts` declare/read `--nb-dialog-content-bg` and `--nb-dialog-actions-bg`.
- `libs/ui/src/lib/styles/styles.css` reads the component-scoped tokens without fallback aliases.
- `apps/docs/src/app/docs/docs-tokens.ts` lists the eight-token dialog surface.
- Added `libs/ui/src/lib/dialog/dialog.tokens.spec.ts`.

Verified:

- `pnpm vitest run --config libs/ui/vitest.config.mts src/lib/dialog/dialog.tokens.spec.ts --reporter=verbose`
- `pnpm nx test ui --output-style=stream`
- `pnpm nx lint ui --output-style=stream`
- `pnpm nx lint docs --output-style=stream`
- `pnpm nx build ui --output-style=stream`
- `pnpm nx build docs --output-style=stream`

Manual docs visual check for `/components/dialog` is still outstanding.

---

## 6. Phase 3 — Cross-cutting cleanup

After every component is migrated:

1. **`theme.css` audit.** Every variable here should be a _global_ theme token. Component-scoped tokens should not appear in `theme.css`. Remove `--nb-input-addon-bg`, `--nb-input-prefix-bg` once consumers are migrated. Visual parity must hold — verify by inspecting docs pages.
2. **`styles.css` `@layer base` audit.** Same principle. The `--nb-input-background` fallback in `styles.css` lines 73 / 110 — replace with the new `--nb-input-bg` token sourced from the directive's class string. Watch out for cascade ordering: the `:where(...)` rule must not paint before the directive's class binds.
3. **Variant naming consistency.** Badge's `destructive` vs button's `danger`. Recommend renaming badge's `destructive` → `danger`. **Breaking change** — separate PR with its own visual + API audit.
4. **Drop `--nb-yellow`.** Its only consumer is `:where([nbInputPrefix]:has(svg))` in `styles.css`. Replace with `--nb-input-group-prefix-bg` overridden in that scope, then remove from `theme.css`. Or keep, documented as "legacy palette token, not part of the design-token API."
5. **`docs-tokens.ts` `theme:` entry.** Prune to global tokens only. Every component table matches its real surface.

---

## 7. Phase 4 — Documentation pass

1. Update `TOKENS.md` itself once Phase 1 is real: change "Pilot — button only" to "Pilot complete." Adjust the spec's button variant/default table if §8 open question 1 resolved in favor of preserving `#fff` defaults.
2. Add a Migration section to `README.md` or CHANGELOG: button variant renames (`reverse`/`noShadow` → `shadow` prop), input-group token renames, badge `destructive` → `danger` if Phase 3 step 3 accepted.
3. Each component's docs page: verify examples are idiomatic with the new tokens. Replace any leftover leaky `style="--nb-main: ..."` overrides with scoped `style="--nb-<component>-bg: ..."` ones.

---

## 8. Order-of-operations summary (TL;DR)

1. **Phase 1: Button pilot — audit, refactor, verify pixel-identical.** Until §4.7 every box ticks, nothing else moves.
2. **Phase 2: Per-component rollout** in §5 table order, applying §3 protocol end-to-end. One PR per component (or per logical pair like input + textarea).
3. **Phase 3: Cleanup.** Token renames, drop legacy globals, normalize variant names. Each step has its own visual parity check.
4. **Phase 4: Documentation.** Update `TOKENS.md`, README, per-component docs pages.

---

## 9. Open questions

Resolve before / during Phase 1. Each has implications for visual parity, so the answer matters.

1. ~~**Spec vs reality: button `default` background.**~~ **RESOLVED.** Library follows the spec — `default` = `var(--nb-main)`, `neutral` = `var(--nb-background)`. Docs example markup is rewritten (§3.7, §4.5) to preserve the rendered colors users see today via scoped overrides or variant swaps. No "acknowledged bug list" — the library is clean spec, the docs page is clean visual record.

2. **New variants on button.** The spec lists `primary | secondary | accent | danger | success | warning` variants that don't exist today. Adding them is additive (no visual change to existing variants), but they need design review for light + dark mode contrast.

   - **Recommendation:** ship them in Phase 1 alongside the refactor, since they're zero-impact on existing rendered output. Block on contrast review before merging.

3. **Hover token reassignment in Tailwind v4.** §4.4 uses `hover:shadow-none` to preserve today's behavior, accepting that `--nb-button-shadow` overrides won't be respected on hover for `shadow="default"`. Alternative is `hover:[--nb-button-shadow:none]` — needs verification that Tailwind v4 arbitrary-property-in-variant syntax works in this project's config.

   - **Recommendation:** ship the verbatim-preserving `hover:shadow-none` in Phase 1. Revisit if a real consumer use case shows up.

4. ~~**Type-level breaking change policy.**~~ **RESOLVED.** Phase 1 confirmed: `rg -n "variant=\"(reverse|noShadow)\"|noShadow" apps libs -g '*.ts' -g '*.html'` returned no matches after the docs migration. Internal docs were the only consumers. Pre-1.0 policy carries forward for Phase 2 renames (input-group tokens, badge `destructive` → `danger`).

5. **Per-component shadow size tokens.** `--nb-shadow-offset-x/y` are global today. Per-component shadow size (e.g. dialog is `8px 8px` — see §5.7) — supported by overriding `--nb-<comp>-shadow` directly, not by per-component offset tokens. Confirm boundary.

6. **Density tokens** (`density.tokens.ts`). Density is an orthogonal axis. **Recommendation: out of scope for this rollout. Revisit after Phase 4 closes.**
