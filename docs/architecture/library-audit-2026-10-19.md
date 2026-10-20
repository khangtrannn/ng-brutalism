# Library Audit — 2026-10-19

> **Status:** Open. This is the active improvement plan for `@ng-brutalism/ui`. It
> takes over from `library-improvement-plan-2026-07-09.md`, whose Phases 1–4 have
> shipped. That plan's Phase 5 (visual regression, then dark theme, then new
> primitives) is folded into Phases 4–6 below.

**Scope:** `libs/ui` (root entry point, `tokens`, `forms-compat`) and
`libs/schematics`, on branch `refactor/token-customization` at `5feec2c`
(clean tree).

**Lenses:**
1. *A Philosophy of Software Design* (Ousterhout): deep vs. shallow modules,
   information hiding and leakage, change amplification, cognitive load,
   unknown unknowns, and "define errors out of existence".
2. Design-system practice: token tiers, one shared vocabulary, a stable public
   CSS API, accessible defaults, dark-mode readiness, i18n, and clear
   boundaries between components.
3. Angular library practice: signals, host metadata, `hostDirectives`
   composition, SSR, and testing.

**Method:**
- Read every non-spec source file (about 7.7k lines across TS and CSS), the
  architecture docs (`token-customization.md`, `design-props.md`,
  `composition-philosophy.md`, ADR 0001/0004), the README, the CI workflow and
  `api-guard`.
- Ran `pnpm nx run-many -t lint test -p ui`. Both pass: 317 tests, lint clean.
- Wrote a scripted scan for CSS variables that are referenced but never
  defined.
- **Rendered the component CSS in real Chromium (Playwright) to check
  cascade behavior** that jsdom can't see. Every finding marked
  **[verified]** was observed there, not just reasoned from the code.

---

## TL;DR — the ten things worth doing first

| # | Finding | Severity | Effort |
|---|---|---|---|
| 1 | Values set through Angular inputs **leak into nested instances**. A surface with `padding="xl"` gives the same padding to every surface inside it, and the same happens with stack gaps. **[verified]** | P0 | M |
| 2 | **Cluster ignores CSS variables set on a parent element**, and **the surface shadow input loses to a parent's CSS variable**. Both contradict the documented precedence contract. **[verified]** | P0 | S |
| 3 | 317 green tests did not catch #1 or #2, because the specs check the strings that TS writes into inline styles, in jsdom, rather than the styles the browser actually computes. → Add a **Vitest browser-mode "CSS contract" suite**. | P0 | M |
| 4 | **Field/label id mismatch.** `nbLabel` prefers its own explicit `for`, but controls prefer the field's id, so an explicit `for`/`id` pair inside `nb-field` breaks the label association. | P0 | S |
| 5 | **Dialog has no accessible name**, and `dismissible=false` still closes on Esc. | P0 | S |
| 6 | **Accessibility bugs in the details:** the checkbox tick is always black (invisible on dark tones), all select options sit in the tab order, the marquee's clone strip has focusable content under `aria-hidden` and no way to pause, and an avatar with no `alt` renders as an image role with an empty name. | P0 | S–M |
| 7 | **Semantic colors used as text fail contrast** (`nbText tone="primary"` is 2.0:1 on white, `success` 1.5:1, placeholder text 2.5:1). The token set needs on-color/text-safe pairs. | P1 | M |
| 8 | **Shared vocabulary drift (cognitive load).** "tone" has 4 meanings, "size" 5, "layout" 3. There are 86 exported type aliases that only rename another type. Component CSS hooks onto three different kinds of selector. | P1 | M–L |
| 9 | **Shallow or duplicated modules:** the same field wiring is repeated in 5 controls, `NbSelect` exposes about 15 implementation methods publicly, `provideNgBrutalism()` does nothing, and the underline styles are passed through by hand. | P1 | M |
| 10 | **Dark-mode blockers:** hardcoded `#fff`/`#000`/`#4b5563`, hardcoded px shadows and focus rings, and two theme variables that are never defined. These have to be fixed before the dark theme can ship. | P1 | S–M |

---

## Where the library stands

The fundamentals are strong. These are worth protecting while you make the
changes below:

- **Modern Angular throughout:** signal `input()`/`model()`, `host` metadata
  rather than decorators, OnPush everywhere, `inject()`, standalone defaults,
  and platform guards around browser-only work (dialog, select, marquee).
- **Easy to override:** component CSS uses `:where()` (zero specificity) inside
  `@layer components`, so consumer CSS and Tailwind utilities win without
  `!important`. Few libraries get this right.
- **Release discipline is unusually good:** `api-guard`, the export-drift
  check, `min-version-check`, the signal-forms contract typecheck, the token
  reference check, and a pack → `ng add` → `ng build` smoke test all run in CI.
  ADRs record the decisions.
- **Forms architecture:** a model-based core with no forms runtime, plus an
  opt-in `forms-compat` bridge that uses a Material-style
  `NB_ERROR_STATE_MATCHER`. This is a clean split.
- **The tone recipe** (a `data-nb-tone` attribute that sets private
  `--_nb-tone-*` variables registered with `inherits: false`) is the
  best-designed part of the token system. It is also the pattern that fixes
  finding 1.

---

## P0 — Correctness and accessibility bugs

### 1.1 Values set through inputs leak into nested instances **[verified]**

**What:** Inputs write their value as an inline public variable, for example
`[style.--nb-surface-padding]`. Custom properties inherit by default, so every
descendant that reads the same variable and has no input of its own picks up
the ancestor's value instead of its default.

**Evidence (Chromium):**

| Setup | Expected | Actual |
|---|---|---|
| `<div nbSurface padding="xl"><div nbSurface>` (inner padding) | `0px` | **`32px`** |
| `<div nbStack gap="2xl"><div nbStack>` (inner gap) | `12px` | **`32px`** |

**Affected:** every scalar input whose component nests in practice. That
includes surface (padding, radius, shadow, border width), stack (gap and
separator gap), split, section, card, and the cluster separator gap.
`nbChipGroup` relies on the same mechanism on purpose, to style its chips.

**Why it matters (unknown unknowns):** nothing in the API hints that a parent's
input can restyle a child. Nested surfaces and stacks are the core of the
composition system, so this will show up in real layouts as "my inner card has
mysterious padding".

**Root cause:** the one-slot rule (`token-customization.md` §10). It was
weighed only as a question of DevTools noise (§5–6). Its correctness cost when
components nest was never assessed.

**Fix (recommended):** give inputs a private slot that doesn't inherit, and
keep the single public variable for CSS:

```css
@property --_nb-surface-padding { syntax: "*"; inherits: false; }

:where([data-nb-surface]) {
  padding: var(--_nb-surface-padding, var(--nb-surface-padding, 0px));
}
```

```ts
'[style.--_nb-surface-padding]': 'padding()',
```

- The input wins over CSS, as §28 requires.
- The input no longer leaks into children.
- Scoped CSS customization still inherits, as §21 intends.
- Users still learn only one public variable. The private one only appears in
  DevTools on elements where an input was actually set.

This is the pattern `--_nb-tone-*` already uses, so it adds no new concept to
the codebase. Record it as an amendment to §6 in an ADR.

Caveat: where the value has to reach an inner anatomy element (progress fill,
select listbox), resolve it on the host into a final property or into one
inheriting internal variable.

### 1.2 Cluster drops scoped customization; surface shadow precedence is inverted **[verified]**

- **Cluster** registers `--nb-cluster-gap`/`--nb-cluster-padding` with
  `inherits: false` (`cluster/nb-cluster.css:1-9`). So
  `.scope { --nb-cluster-gap: 2rem }` has **no effect** (measured: 12px).
  Stack and split honor the same pattern, so the three layout primitives
  disagree. The fix from 1.1 resolves this: register only the private input
  slot.
- **Surface** writes its `shadow` input to `--nb-surface-shadow-base`, but the
  CSS reads `--nb-surface-shadow` first (`surface/nb-surface.css:13-19`,
  `nb-surface.ts:45`). A parent's `--nb-surface-shadow` beats `shadow="none"`
  on the element (measured: the ancestor's red shadow rendered). This breaks
  the "explicit input wins" contract and is the only component with two shadow
  slots. Collapse them as part of 1.1.

### 1.3 Field and label disagree on the control id

`nbLabel` uses `for() ?? field.controlId` (`label/nb-label.ts:17-19`), while
`nbInput`/`nbTextarea`/`nbCheckbox`/`select[nbSelect]`/`nb-select` use
`field.controlId ?? id()` (`input/nb-input.ts:59-61`, `select/nb-select.ts:164`).

```html
<nb-field>
  <label nbLabel for="email">Email</label>
  <input nbInput id="email" />
</nb-field>
<!-- result: label for="email", input id="nb-field-control-3" → not associated -->
```

An explicit `id` on a control inside a field is also silently ignored.

**Fix ("define errors out of existence"):** make the field adopt the control's
id when one is given (`controlId = computed(() => explicitControlId() ?? generated)`),
and have the label and control both read that. Then no combination of
attributes can disagree. The duplication behind this bug is covered in 2.2.

### 1.4 Dialog accessibility

- **No accessible name.** `NbDialogTitle`/`NbDialogDescription` only set
  `data-slot`. `<dialog>` gets no `aria-labelledby`/`aria-describedby`
  (`dialog/nb-dialog.ts:36-46`). Screen readers announce an unnamed dialog.
  Fix: give the title and description generated ids (as `NbFieldDescription`
  does) and bind them through `contentChild`.
- **`dismissible=false` doesn't stop Esc.** Only backdrop clicks are guarded
  (`nb-dialog.ts:85`). The native `cancel` event still closes the dialog. Fix:
  `(cancel)="dismissible() || $event.preventDefault()"`. The spec only covers
  backdrop clicks.
- **API inconsistency:** the dialog is only imperative (`open()`/`close()`) and
  emits `closed`, while `nb-select` and `nb-accordion` use `model()` and emit
  `*Change`. Consider an `open = model(false)` so `[(open)]` works.

### 1.5 Smaller accessibility bugs

| Component | Bug | Fix |
|---|---|---|
| `checkbox` | The tick is an SVG data URI with a hardcoded `stroke='%23000000'` (`nb-checkbox.css:47`), so it is invisible on `tone="ink"`/`black` and ignores `--nb-checkbox-fg`. | Use `mask-image` and set `background-color: currentColor` on a pseudo-element. |
| `select` | Every option is a tabbable `<button>` (`nb-select-option.ts:19-20`). The listbox pattern allows one tab stop. A real Tab from an open listbox probably lands on the next option, which is then removed, so focus falls to `<body>`. The jsdom spec can't see this. | Give options `tabindex="-1"` with roving focus, or move to the APG select-only combobox pattern (`role="combobox"` + `aria-activedescendant`). Verify in browser mode. |
| `marquee` | The cloned strip is `aria-hidden` but its copies of links and buttons stay focusable. It also has no pause control, which WCAG 2.2.2 requires for auto-moving content that runs longer than 5 seconds (`pauseOnHover` only helps mouse users). | Add `inert` on the clone strip, plus a pause button or `paused` input. |
| `avatar` | The host always sets `role="img"` with `aria-label=alt()`, and `alt` defaults to `''` (`nb-avatar.ts:33-43`). The result is an image role with an empty name, which axe flags as `role-img-alt`. There is also no fallback when the image fails to load. | Treat an empty `alt` as decorative (`aria-hidden`). Add an `(error)` fallback to the projected initials. |
| `avatar-group` | `aria-label` on a generic `<span>`, which ARIA 1.2 doesn't allow. | Use visually hidden text instead. |
| `button` | `a[nbButton][aria-disabled]` is only styled. The link stays focusable and Enter still navigates. `cursor: not-allowed` never shows because `pointer-events: none` is also set. | Add a `disabled` input that sets `aria-disabled` and `tabindex=-1` on anchors and stops the click. |
| `icon-button` | No accessible-name guard, because the icon is always `decorative`. | Reuse the dev-mode warning pattern from `nbIcon`. |
| `accordion` | Heading level hardcoded to `<h3>` (`nb-accordion-trigger.ts:17`). | Add a `headingLevel` input. |

### 1.6 Theme variables that are never defined

The scripted scan found theme-level references that no stylesheet defines:

- `--nb-spacing-md` (`section/nb-section.css:16`) is a typo for
  `--nb-space-md`. The section gap is always the 1rem fallback and ignores
  theming.
- `--nb-black` (`sticker/nb-sticker.css:72,81,94`) is not in the palette. The
  sticker ink always falls back to `#050505`.

**Prevent the class of bug:** turn the scan into `tools/css-token-check` and run
it next to `docs:tokens:check`. The rule: every `var(--nb-X)` must be either
defined in `styles/*.css` or a documented component hook.

### 1.7 Icon button `shape="circle"` overrides radius **[verified]**

`:where(button[nbIconButton][data-shape='circle']) { border-radius: 9999px }`
is declared after the base rule with equal specificity, so both the `radius`
input and `--nb-icon-button-radius` are ignored (measured: 9999px with the
variable set to 0). Fix:
`border-radius: var(--nb-icon-button-radius, var(--nb-radius-full))`.

---

## P1 — Design-level findings (Ousterhout)

### 2.1 The tests check how styles are written, not what the browser renders

**The most important process finding.** The library's behavior lives mostly in
CSS. The specs run in **jsdom** (`vitest.config.mts`) and check the inline
style strings TS writes (`expect(el.style.getPropertyValue('--nb-callout-radius')).toBe('var(--nb-radius-lg)')`).
Only one spec calls `getComputedStyle`, and only 4 of 37 components run axe
(jsdom axe can't check contrast).

The documented contract, "input > local CSS > inherited CSS > default" (§28),
is therefore never actually exercised. That is how 1.1, 1.2 and 1.7 shipped
with every check green.

**Fix:** add a `ui:test-browser` target using Vitest 4 browser mode (Playwright
provider, Chromium). Write one table-driven **CSS contract spec per
archetype** (Surface/box, Layout, Interactive) that asserts *computed* values
for each of these cases:

- no input
- input
- scoped variable
- input combined with a scoped variable
- nested instance without an input (the 1.1 regression)

Move axe there as well and run it for every component and every tone, which
gives you contrast checks. This is also the base for the visual-regression
suite (Phase 4).

### 2.2 Field wiring is copied into 5 controls; it belongs in one host directive

`NbInput`, `NbTextarea`, `NbCheckbox`, `NbNativeSelect` (and partly
`NbSelect`) each repeat the same 12 or so lines:

- an `id` input
- `inject(NB_FIELD)` and `inject(NB_INPUT_GROUP)`
- a `resolvedId` computed
- `data-in-group`
- `aria-describedby`, `aria-invalid`, `aria-required`

This is **change amplification**: 1.3 has to be fixed in five places, and any
future `aria-errormessage` support would also go into five places.

**Fix:** make an internal `NbFieldControl` directive that owns this logic and
compose it with
`hostDirectives: [{ directive: NbFieldControl, inputs: ['id'] }]`. Each control
then keeps only its visual inputs. The module is deep: small surface, all the
a11y wiring inside.

### 2.3 `NbSelect` exposes its implementation

The `.d.ts` shows about 15 public methods on `NbSelect`: `toggle`,
`openAndFocusOption`, `closeOnOutsideClick`, `openListboxOnKey`,
`onFocusOut`, `handleTypeahead`, `focusNextOption`, and so on
(`api-guard/ng-brutalism-ui.api.d.ts:468-481`). Most exist only for the
template or for `NbSelectOption`. Consumers can call them, and `api-guard` now
freezes them as API.

**Fix:**
- Make the template handlers `protected`.
- Let options reach the parent only through the `NB_SELECT` controller token,
  so `NbSelectController` is the private contract.
- Keep public: `value`, `open`, `compareWith`, and perhaps `focus()`.

**Related information leakage:** `positionListbox()` hardcodes the CSS overhang
(`const overhang = 6`, `nb-select.ts:251`), so TS has to know the stylesheet's
geometry. Read the value from a CSS variable through
`getComputedStyle`, or use CSS anchor positioning where available and keep the
JS path only as a fallback.

### 2.4 Input values read back as CSS strings

Because scalar inputs use `transform: nbRadiusStyleTransform`, reading the
input returns CSS: `button.radius()` gives `'var(--nb-radius-md)'`, and the
public type is `InputSignalWithTransform<string | null, NbRadius | …>`. The
representation chosen for the CSS layer has leaked into the component's
programmatic API. Changing how tokens map to CSS (for example, the 1.1 fix)
counts as a type change under `api-guard`.

**Fix (low urgency, do it alongside 1.1):** keep the token as the input value
(`radius = input<NbRadius>()`) and map it in a `protected` computed. This is a
small cost per input, it keeps the public types at the vocabulary level, and
`nbTokenStyleTransform` becomes an internal helper.

### 2.5 Shallow modules and pass-through code

| Item | Problem | Fix |
|---|---|---|
| `provideNgBrutalism()` (`tokens/src/lib/provide.ts`) | Returns `makeEnvironmentProviders([])`. The README says it "registers library providers", and the docs say it "still needs to be" called. This is an interface with nothing behind it. | Give it a real job (see 3.6, i18n) or remove it in 0.4.0. |
| `NbText`/`NbDisplay` underline | Each re-binds `--nb-underline-gap/-width` through its own computed that just forwards the value from `NbUnderlineCapability` (`text/nb-text.ts:72-96`). Pure pass-through. | Bind the styles in the capability's own `host`. |
| `core/input-transforms/*` | Six files, each a single line. | Merge them into one `style-transforms.ts`. |
| `NbInputPrefix` / `NbInputSuffix` | Identical classes and types. | Make one `NbInputAddon` with a `position`, or keep both but share the implementation. |
| `NbAccordion.items` | A public content query that is never read. | Remove it. |
| `nbFontWeightValue` (`tokens/src/lib/typography.ts:22`) | Not exported and not used. | Delete it. |

### 2.6 TS still duplicates values that belong in CSS

Rule 7 of the architecture ("TypeScript does not duplicate CSS defaults")
has these remaining violations:

- `text/nb-text.ts:37` and `icon/nb-icon.ts:27` each hold their own `toneMap`.
  The `muted` mix is 80% in one and **75%** in the other, which is already
  drifting.
- `chip/nb-chip.ts:36` (`chipSizeMap` puts padding geometry in TS, so `size`
  doesn't use `data-size` like every other component).
- `button/nb-button-trailing-icon.ts:16,28` (sizes and radius maps).
- `tokens/src/lib/typography.ts`: underline gap and width are raw `rem` values,
  not `--nb-*` tokens, so they can't be themed.
- `NbMediaItemIcon.background` defaults to `'var(--nb-surface)'` in TS.
- `NbHalftone` has two renderers: an SVG with one `<circle>` per dot for
  square/circle shapes, and a CSS `radial-gradient` for rectangle. Each has its
  own defaults (6/5 in TS, 8/28/27 in CSS), and `gapX`/`gapY` only work on
  rectangle. Collapse it to the gradient renderer and use a mask for the circle
  shape.

**Fix:** move each one to `data-*` plus CSS. That is the architecture's own
rule.

---

## P1 — Design-system consistency

### 3.1 One word, one meaning

The library sells "learn the vocabulary once" (`design-props.md`). Today these
words don't mean one thing:

| Word | Meanings found |
|---|---|
| **tone** | (1) `NbTone`, a 17-value bg/fg/border recipe; (2) `NbTextTone`, a text color with `default\|muted\|subtle\|inverse`; (3) `NbIconTone`, the same plus `current`; (4) `NbButtonIconTone`, an inversion mode written to `data-tone`, not `data-nb-tone`. `NbText` writes vocabulary (2) into `data-nb-tone`, which is the attribute that recipe (1) owns. |
| **size** | (1) a preset scaling several anatomy values (button, callout); (2) a padding string (chip); (3) a fixed square box (`surface size="xl"` = 3rem × 3rem); (4) a scale factor (`sticker size="1.2"`); (5) dot pixels (halftone). |
| **layout** | surface `block\|center\|row\|stack`; callout `inline\|between\|center`; section `default\|center\|between`. |
| **direction / orientation** | `NbOrientation` (`horizontal\|vertical`) on separator and media item; chip group calls it `direction`; stat uses `direction: 'row'\|'column'`. |
| **boolean attributes** | `data-x=""` almost everywhere, but `data-surface="true"` in media item. |

**Fix:**
- Rename the text and icon color axes to `color` (or `ink`), and keep `tone`
  for the recipe only.
- Rename `surface size` to `square` (or `box`), and sticker `size` to `scale`.
- Standardize on `orientation`.
- Record the glossary in `design-props.md` §1 and add a lint test that rejects
  new inputs using a reserved word with a different type.

### 3.2 The exported type aliases

86 of the 124 exported type aliases only rename another type
(`type NbBadgeTone = NbTone`: 15 for `NbTone`, 12 for `NbRadius`, 11 for
`NbShadow`, …). `design-props.md` §7 explains why each component's types are
public. The cost is that users see roughly 3× more names than concepts. A
whole checker (`api-export-check` plus its allowlist) exists only to keep the
aliases reachable. That is complexity spent managing complexity.

**Recommendation:** in 0.4.0, export the shared vocabulary (`NbTone`,
`NbRadius`, …) plus only those component types that **narrow or extend** it
(`NbChipSize = 'none' | NbSize`, `NbCardActionsAlign`, …). Delete the pure
aliases, or keep them as `@deprecated` for one minor version. The export check
then has far less to police. This reverses a documented decision, so it is
listed under "Decisions needed".

### 3.3 Component CSS hooks onto three kinds of selector

| Hook | Components |
|---|---|
| `[data-nb-*]`, set from `host` metadata | callout, cluster, display, halftone, icon, media-item, separator, split, stack, sticker, text, title, typography |
| The template attribute `[nbX]` | **badge, button, checkbox, chip, icon-button, input, label, media-frame, section, native-select, status-dot, surface, textarea** |
| An element name `nb-*` | accordion, avatar(-group), card, field, image-card, input-group, marquee, progress, rating, select, stat |
| A global `[data-slot=…]` | dialog sub-parts |

**Why it matters:**

- `[nbX]` selectors break **`hostDirectives` composition**, which is the main
  Angular way to build on a directive library. For example,
  `@Component({ hostDirectives: [NbButton] })` has no `nbButton` attribute on
  its host, so it gets no styles.
- Surface, badge, chip and status-dot already set `data-nb-*` on their host
  but their CSS ignores it.
- The dialog's
  `:where([data-slot='dialog-title'])` sits **unscoped in `@layer base`**.
  shadcn/ui (and Angular ports of it) use the same `data-slot="dialog-title"`
  names, so mixing the two libraries cross-styles each other.

**Fix:**
- Every directive sets `data-nb-<name>` in its `host` and its CSS keys only on
  that attribute.
- Scope slot selectors under their root, for example
  `[data-nb-dialog] [data-slot=…]`, or rename them to `data-nb-slot`.
- Add one browser-mode spec that applies each directive through
  `hostDirectives` and checks that a style is applied.

### 3.4 Public CSS API naming

The hook contract (`design-props.md` §4) is `-bg · -fg · -border-color ·
-border-width · -radius · -shadow`. These deviate from it:

- `--nb-text-color`, `--nb-icon-color`, `--nb-display-color` and
  `--nb-button-trailing-icon-color` use `-color` where the contract says `-fg`.
- `--nb-input-group-border` is a color but isn't named `-border-color`.
- `--nb-sticker-fill`/`-ink` and `--nb-rating-fill` don't follow the
  bg/fg names.
- `--nb-progress-tone-bg`, `--nb-rating-tone-bg`, `--nb-select-tone-*` and
  `--nb-sticker-tone-*` are **internal bridge variables** (they carry the
  non-inheriting `--_nb-tone-*` into child slots), but the `--nb-` prefix makes
  them look public. They are also set as component defaults, which breaks
  §21. Rename them to `--_nb-*`.
- `--tw-ring-offset-color` is written by the checkbox
  (`nb-checkbox.css:16,55`) in **Tailwind's namespace**. The checkbox defines
  it itself, so nothing breaks today, but it can collide with Tailwind
  `ring-offset-*` utilities. Use a `--_nb-` name.

Have `docs:tokens:check` reject public hook names outside the contract's
suffixes.

### 3.5 Token discipline: what's left before dark mode

Dark mode is the top roadmap item. These hardcoded values would silently stay
light:

| Category | Occurrences |
|---|---|
| Colors | dialog `#ffffff`/`#000000` fallbacks and description `#4b5563` (`nb-dialog.css:13,46-47`), backdrop `rgba(0,0,0,.45)`, marquee `#ffffff`/`#000000` (`nb-marquee.css:13-14`), checkbox tick (1.5), sticker `#050505`/`#9af7b5`, select shadow `#a3a3a3`. Theme palette tones hardcode `-fg: #000000` and ink/black `-bg: #000000`. |
| Shadows | chip and avatar `2px 2px`, avatar-group `2px 2px`, dialog `6px 6px`, select `5px 5px`. None of them follow `--nb-shadow-offset-*`, so `theme-soft` (3px offsets) doesn't reach them. |
| Borders | cluster `2px`/`4px`, stack and split `4px` (thick separator), callout `2px/3px/4px`, separator `2px/4px`. Use `--nb-border-width`/`-thick`. |
| Focus | 9 components hardcode `outline: 2px solid …; outline-offset: 2px` while `--nb-focus-ring`/`-offset` exist and button, icon-button and surface use them. That is two focus styles in one library. |
| Radius | `9999px` in 6 places, where `--nb-radius-full` exists. |
| Weights | `--nb-font-weight-normal: 500`, but `nbFontWeightValue('normal')` is `400`. The base-layer `.nb-focus-visible` class is unlayered and unused. |
| Vocabulary | `--nb-tone-neutral-*` is defined and used (callout) but `neutral` is not part of `NbTone`. The tone list lives in three places (TS union, `theme.css`, `tone.css`). Generate it from one source, or test that the three stay in sync. |

Add a stylelint config for `libs/ui/src/lib/**/*.css`:
- disallow hex/rgb colors outside `styles/`
- disallow raw `px` in `box-shadow`, `outline` and `border-*-width`
- allow-list custom-property names by pattern

### 3.6 Contrast-safe color pairs and i18n

- **Contrast:** semantic colors are designed as *backgrounds* (with black
  `-foreground`), but `NbTextTone`/`NbIconTone` reuse them as *text colors* on
  the page background. Measured on white:

  | Color | Ratio |
  |---|---|
  | primary `#ff90e8` | 2.02:1 |
  | secondary | 2.09:1 |
  | accent | 1.38:1 |
  | success | 1.54:1 |
  | warning | 2.08:1 |
  | danger | 3.12:1 |
  | placeholder `--nb-muted-foreground` | 2.54:1 |

  All fail AA (4.5:1). **Fix:** add text-safe tokens
  (`--nb-primary-text`, …, or a `-strong` step) and point the text and icon
  tones at those. Lower `--nb-muted-foreground` to at least 4.5:1. The
  browser-mode axe pass (2.1) keeps this fixed.
- **i18n:** five user-facing English strings are hardcoded:
  - `'Select an option'` (`nb-select.ts:133`)
  - `'Progress'` (`nb-progress.ts:22`)
  - `` `${v} out of ${max} stars` `` (`nb-rating.ts:49`)
  - `` `Status: ${state}` `` (`nb-status-dot.ts:30`)
  - `` `${n} more` `` (`nb-avatar-group.ts:11`)

  **Fix:** an `NbIntl` injectable in the style of `MatPaginatorIntl`, provided
  through `provideNgBrutalism({ intl })`. That gives the empty provider from
  2.5 a real job.

### 3.7 Component boundaries and inventory

- **Overlapping components**, where users have to guess which one to use:
  - `nbBadge` vs `nbChip` (chip = badge + padding + icon)
  - `nbTitle` (no inputs, hardcoded wave underline) vs `nbDisplay` vs `nbText`
    vs `nbTypography`
  - `nbSurface` vs `nb-card` vs `nbCallout`, which all implement the same
    box recipe

  Pick a canonical one per job, document when to use each, and fold the rest
  (or mark them `@deprecated`). The box recipe (bg/fg/border/radius/shadow
  fallback chains) is copied into about 15 stylesheets. This is the main
  source of drift in 3.5. A browser-mode contract test per archetype (2.1)
  is the cheapest guard.
- **Gaps for a forms-focused library:** no radio group or switch (both are
  forms basics), plus tabs, tooltip/popover, menu and toast (the existing
  Phase 6 roadmap). Radio and switch should come before tooltip and menu,
  because the forms story is otherwise incomplete.
- **Leftover legacy code:** the accordion uses a module-level counter and
  `neo-accordion-*` ids (`nb-accordion-item.ts:18,38-44`) instead of
  `NbIdGenerator` and the `nb-` prefix. `NbText` sets `standalone: true`,
  which is redundant. `NbSelect`'s `invalid`/`required` and `NbField`'s
  `[invalid]`/`[required]` have no `booleanAttribute` transform, while
  `disabled` does.
- **Edge cases:** `NbProgress` with `max=0` produces `NaN%`, and there is no
  indeterminate state. `nb-media-item` takes both inputs and projected content
  for the same slots (two APIs for one thing). It also selects
  `nb-media-item-action`, which is not a declared element.

---

## P2 — Tooling and docs

- **Nx deprecations:** the `@nx/vitest:test` executor and `nxViteTsPaths` are
  removed in Nx 24 (warnings print on every test run). Run
  `nx g @nx/vitest:convert-to-inferred` and switch to `vite-tsconfig-paths`.
- **README is stale or contradicts other sources:**
  - "What's new in v0.2.0" while the package is 0.3.0.
  - No mention of `forms-compat`.
  - "Do I need Tailwind CSS v4? **Yes**" contradicts the optional
    `tailwindcss` peer and the docs' *without-tailwind* page.
  - Says `provideNgBrutalism()` "registers library providers".
- **`design-props.md`** lists the shadow and border scales as `… default …`,
  but the types use `md`.
- **`token-customization.md` is 1,462 lines.** It mixes normative rules,
  rejected alternatives, "temporary decisions" (Temporary Decision 1 is stale:
  the style directives are gone) and an agent prompt. Split it into a
  one-page normative spec (the 10 rules plus the precedence contract,
  amended for 1.1) and an ADR that keeps the history.

---

## Action plan

Each phase can be verified and committed on its own. Phases 1–3 contain no
breaking public API changes. Phase 5 groups the breaking ones into a single
0.4.0 release under the v0.x contract.

### Phase 1: Set up browser testing (M), first

1. Add a `ui:test-browser` target (Vitest 4 browser mode, Playwright,
   Chromium) and add it to CI.
2. Write the archetype CSS contract specs from 2.1, including **failing tests
   for 1.1, 1.2 and 1.7**.
3. Move axe into browser mode for every component and every tone.

→ verify: the new specs fail on the current tree for exactly the findings
above, and nothing else fails.

### Phase 2: P0 fixes (S–M)

4. Private input slots registered with `inherits: false` (1.1, 1.2). Write an
   ADR amending §6 and §10.
5. The field adopts the control's id, and the `NbFieldControl` host directive
   replaces the 5 copies (1.3, 2.2).
6. Dialog: `aria-labelledby`/`describedby`, and `cancel` respects
   `dismissible` (1.4).
7. The fixes in the 1.5 table, the two undefined-token typos (1.6), and the
   icon-button circle radius (1.7).
8. Add `tools/css-token-check` to CI (1.6).

→ verify: the Phase 1 specs pass; axe is clean in browser mode; `api-guard`
diff shows only additions.

### Phase 3: Token discipline and contrast (S–M), the dark-mode prerequisites

9. Replace the hardcoded values in the 3.5 table.
10. Move the TS value maps into CSS (2.6). Rename the bridge variables to
    `--_nb-*` (3.4).
11. Add text-safe color tokens and fix muted contrast (3.6).
12. Add the stylelint config (3.5).

→ verify: stylelint clean; contrast ≥ 4.5:1 in axe browser mode;
`theme-soft` shadows follow the theme offsets in every component.

### Phase 4: Visual regression, then dark theme (M–L)

13. Playwright screenshot suite for each component × three themes.
14. Dark theme (`data-theme="dark"` plus `prefers-color-scheme`). This should
    mostly be a token file once Phase 3 is done.

### Phase 5: API consolidation, released as 0.4.0 (M–L, breaking)

15. One meaning per word (3.1).
16. Prune the pure type aliases, with a one-minor deprecation (3.2).
17. One selector strategy and namespaced slots (3.3). Rename the public hooks
    (3.4).
18. Shrink `NbSelect`'s public surface (2.3). Keep tokens as the input value
    (2.4).
19. `provideNgBrutalism({ intl })` and `NbIntl` (3.6), or remove the provider.
20. README and doc refresh (P2).

→ verify: `api-guard` diff reviewed line by line; the CHANGELOG `[0.4.0]` has
a migration table.

### Phase 6: New primitives

21. Radio group, switch, then tabs, tooltip/popover, menu and toast.

---

## Decisions needed (yours to make)

1. **Amend `token-customization.md` §6** (private input slot) to fix 1.1? The
   recommendation is yes. The rejection weighed DevTools noise against a
   correctness bug it never considered.
2. **Prune the per-component type aliases** (reverses `design-props.md` §7)?
3. **Is Tailwind required or optional?** The code says optional; the README
   says required. Pick one and make all docs agree.
4. **`provideNgBrutalism()`:** repurpose it for i18n and config, or remove it?
5. **Overlapping components:** badge vs chip, and title/display/text. Which one
   is canonical for each job?

---

## Checked and fine

- SSR guards, OnPush/signals discipline, the `exports` map and `sideEffects`,
  the secondary entry points, and the `ng add` schematic.
- The forms-compat bridge design (`NgControl` content query, error-state
  matcher, `ɵsetCompat*` internals).
- The status-dot and marquee reduced-motion handling (fixed since the
  2026-07-09 plan). `--nb-motion-pulse` now covers the pulse.
- The sanctioned `[style.*]` runtime exceptions (progress width, icon
  mask/image, cluster separator geometry).
