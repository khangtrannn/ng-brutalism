# Architecture Review: ng-brutalism vs. Best Practice and Peer Libraries — 2026-10-19

> This is a companion to `library-audit-2026-10-19.md`, which lists the bugs
> and the action plan. This document steps back and judges the architecture:
> the decisions every component inherits. It compares them with current
> practice and with how well-known libraries solve the same problems. Its
> recommendations feed into the audit's phases.

**What "architecture" means here.** Seven layers that every component
inherits:

1. Tokens
2. How props become styles
3. The override and precedence contract
4. CSS delivery
5. The component and composition model
6. The behavior and accessibility foundation
7. Forms, i18n and testing

**Peers compared:**
- **Angular options:** Angular Material (M3), PrimeNG (v18+ styled mode),
  Spartan (the Angular port of shadcn).
- **Libraries the README positions against:** shadcn/ui and daisyUI. Also
  neobrutalism.dev, which has the same look built on shadcn's architecture.
- **Reference points for specific mechanisms:** Radix Themes, Chakra UI v3,
  Mantine, Spectrum CSS, Shoelace, Ark UI (Zag), React Aria.

**Method:**
- Claims about ng-brutalism come from its source at `5feec2c`. Claims about
  the cascade were checked in Chromium.
- Claims about Angular Material, PrimeNG, Radix Themes, Mantine, Spectrum CSS,
  daisyUI and Angular Aria were checked against their docs or source (links at
  the end).
- Claims about shadcn/ui, Spartan, Chakra, Ark UI, Shoelace and React Aria come
  from familiarity with their public docs and were not re-checked for this
  review.
- Where a peer doesn't document a mechanism, this doc says so rather than
  guessing.

---

## Verdict

**Ahead of most peers:**
- How easy it is to override library styles from CSS.
- Forms: the core is built for Signal Forms first.

**On par:** the component model.

**Behind on four foundations:**
- The cascade rule for per-instance props.
- Where the tokens sit in the cascade (and so how they can be overridden).
- Token tiers: no dark mode and no contrast-safe text colors.
- A separate behavior layer for complex widgets such as select, menu and
  tabs.

The most useful lesson from the peers is that **each one decides, per
variable, whether it is an inherited setting or an instance value, and
implements it to match.**

- Radix Themes treats `radius` as an inherited setting, and says so.
- Mantine and Shoelace reset component variables on every instance, so they
  are instance values.

ng-brutalism does neither consistently. Its scalar variables are documented as
instance values ("use inputs for one-off overrides", `token-customization.md`
§27). They are implemented as inherited settings, and that mismatch is the
cause of the nested-leak bug (audit 1.1).

---

## 1. Token system

### How peers structure tokens

| Library | Tiers | Color pairs and contrast | Dark mode | How consumers override |
|---|---|---|---|---|
| Angular Material (M3) | reference → system (`--mat-sys-*`) → component tokens | `on-*` roles for each color role | `mat.theme()` emits `light-dark()`, and `color-scheme` picks the mode | `mat.<component>-overrides(…)` mixins, under any selector |
| PrimeNG | primitive → semantic → component, with presets via `definePreset` | semantic tokens for each color scheme | `darkModeSelector` (a system media query or a class) | `--p-*` variables, plus per-component `dt` |
| Spectrum CSS | global → alias → component | — | theme classes | public `--mod-*` hooks that fall back to `--spectrum-*` |
| Radix Themes | a 12-step scale per hue, where each step has a job (9 is solid, 11–12 are text) | contrast is designed into the scale | `appearance` on a nested `<Theme>` | nested `<Theme>`; `[data-radius]` and `[data-accent-color]` set scale variables for a subtree |
| daisyUI 5 | semantic colors plus role tokens (`--radius-field/box/selector`, `--size-field/selector`, `--border`, `--depth`) | a `-content` pair for each color | `color-scheme` per theme, `prefersdark` | `data-theme` on any element, and themes can nest |
| shadcn/ui | semantic pairs (`--primary` and `--primary-foreground`), `--radius` | `-foreground` pairs | `.dark` class overrides | the tokens live in your own CSS and are mapped into Tailwind with `@theme inline` |

### ng-brutalism

The token set has five parts:
- A palette (`--nb-yellow` …).
- Semantic pairs (`--nb-primary` and `-foreground`, as in shadcn).
- Scales.
- A table of tone recipes.
- Hooks for each component.

The mono and soft presets are whole-file `:root` overrides. Every token is
unlayered `:root`.

**On par:** foreground pairs, and theming in plain CSS. Material needs Sass
mixins and PrimeNG needs a TypeScript preset.

**Behind:**

1. **Where the tokens sit in the cascade. This is a verified bug on your own
   docs site.**
   - Tailwind v4 emits `@theme` into `@layer theme`, and unlayered
     declarations always beat layered ones.
   - The docs app overrides `--nb-blue`, `--nb-mint`, `--nb-cream` and
     `--nb-shadow-offset-*` inside `@theme`.
   - In the production build, Chromium resolves all of them to the library
     defaults: `--nb-blue` is `#8ae9ff` instead of `#0e47de`, and the shadow
     offset is 4px instead of 5px.
   - Every Tailwind user who themes the normal Tailwind way will hit this
     without any warning.

   The fix, checked in Chromium:

   ```css
   @layer theme {
     :where(:root) { --nb-blue: #8ae9ff; /* … every token … */ }
   }
   ```

   Because `:where(:root)` has zero specificity, both ways of overriding work
   regardless of import order:
   - A consumer's `@theme` block (`:root, :host` in the same layer) wins on
     specificity.
   - A plain unlayered `:root` block wins because it is outside any layer.

   The presets go in the same layer and are imported after the base theme.

2. **No text-safe colors.** The semantic colors are tuned as backgrounds.
   Used as text, they fail AA: primary is 2.0:1 on white (audit 3.6). Radix
   (steps 11–12) and M3 (`on-*` roles) build text-safe colors into their
   tiers. Add a `--nb-<role>-text` step.

3. **No dark mode and no scoped themes.** The peers have settled on two
   mechanisms:
   - `light-dark()` plus `color-scheme` (M3).
   - A theme attribute that can be nested (daisyUI `data-theme`, Radix nested
     `<Theme>`).

   Use both: author the tokens with `light-dark()`, and add `[data-nb-theme]`
   scopes for local inversions. Brutalist pages use inverted sections a lot.

4. **Two brand colors.** `--nb-main`, which follows neobrutalism.dev's naming,
   sits next to `--nb-primary`. The library reads `--nb-main` once
   (`input/nb-input.css:56`) and `--nb-primary` 14 times. Someone theming the
   library can't tell which one to set. Merge `main` into `primary`, or make
   `main` an alias of it.

5. **Per-component hooks where role tokens would do.** In daisyUI, one
   variable (`--radius-field`) restyles every field-like control. In
   ng-brutalism you set `--nb-input-radius`, `--nb-textarea-radius`,
   `--nb-select-radius` and `--nb-checkbox-radius` separately. Add role tokens
   (`--nb-radius-field`, `--nb-radius-box`) as the fallback tier, with the
   component hooks still taking priority over them. Theming gets easier and
   no control is lost.

## 2. How props become styles

Every styled library has to answer one question. A component prop such as
`radius="lg"` must change what renders, and some libraries also want certain
values to flow down into the subtree. How is that wired?

| Mechanism | Used by | Flows into children? | Trade-off |
|---|---|---|---|
| A class per variant or step | Radix Themes (`rt-r-size-2`, layout props), daisyUI (`btn-sm`), shadcn (`cva` variants) | No | No leak, but you need a class per step. Arbitrary values need a second channel. |
| A data attribute that sets CSS variables | Radix Themes (`[data-radius]`, `[data-accent-color]`), Mantine (`data-variant`, `data-size`), ng-brutalism (`data-nb-tone`, `data-size`) | Only if the variables inherit. Radix lets `radius` cascade on purpose, even when it is set on a component. | The DOM is readable, and there is one shared recipe per category. |
| A component variable written inline, **reset on every instance** | Mantine (`.root { --paper-radius: var(--mantine-radius-default) }`, plus the inline value from the prop) | No | No leak. But a parent element can't customize through that variable, so Mantine routes customization through the theme and its Styles API instead. |
| A component variable written inline, **with no reset** | ng-brutalism's scalar inputs | **Yes, even though the docs call them one-off overrides** | The nested leak (audit 1.1, verified) |
| Design tokens scoped to one instance | PrimeNG `dt` | The mechanism isn't documented | You pass token objects instead of props. |
| Classes generated from style props | Chakra v3 (`p="4"`), Tailwind | No | Needs a runtime or a build step. |
| Variable overrides scoped by selector | Angular Material `*-overrides` mixins, Spectrum `--mod-*` | Yes, by design | No per-instance style props at all. Variants come from `appearance`-style inputs. |

**The pattern across peers:** whether a value cascades is a deliberate choice
for each category, and the docs say which it is.
- **Radius in Radix:** inherited everywhere, so that nested parts follow the
  same rounding.
- **Chakra's `colorPalette`:** cascades, so that children of a colored
  container follow it.
- **daisyUI's `data-theme`:** cascades by definition.
- **Layout values (gap and padding):** don't cascade in any of these
  libraries. Inheriting a parent's padding is never what a user wants.

**ng-brutalism already does this correctly for tone.** A data attribute sets
private `--_nb-tone-*` variables with `inherits: false`. For scalar inputs it
does not. The fix is to apply the tone pattern to scalars:
- A data attribute feeds one shared private variable per category, which does
  not inherit.
- The public variable stays inheriting, for customizing a whole section from
  CSS.

That is the Radix Themes model plus one channel Radix doesn't have. It was
checked in Chromium on 2026-10-19:
- Nested instances keep their own defaults.
- A variable set on a parent section still reaches them.
- The input beats both.

**Write the rule into the architecture doc:**
- *Settings that cascade:* theme tokens, `data-nb-theme`, the defaults
  `nbChipGroup` sets for its chips, and any CSS variable set on a container.
- *Settings that never cascade:* anything set through an Angular input.

## 3. Override contract and escape hatches

| Library | How a consumer overrides | Who wins | Internal parts |
|---|---|---|---|
| shadcn/ui and Spartan helm | Pass classes, which are merged last with tailwind-merge, or edit the copied source | Your class wins, decided by class merging | A `data-slot` on each part (shadcn) |
| Mantine | Styles API: `classNames`, `styles` and `vars` for each named part, plus default props per component in the theme | Explicit, part by part | Named selectors (`root`, `label`, …) plus `data-*` states |
| PrimeNG | Tokens (`dt`, presets), `pt` (pass-through) attributes into the internal DOM, or unstyled mode | The library's CSS layer is opt-in (`cssLayer`, off by default) | A `pt` key for each part |
| Shoelace | `::part()` plus component custom properties | The shadow DOM boundary | Exported parts |
| Ark UI (Zag) | Style any part by its attributes | — | `data-scope` and `data-part` on every element |
| Angular Material | Tokens through the override mixins. The internal classes are not public API. | Tokens only | None public |
| ng-brutalism | Inputs, public CSS variables, or any class or utility on the element | `:where()` (zero specificity) inside `@layer components`, so any consumer CSS wins without `!important` | Mixed: un-namespaced `data-slot` on some components, `data-nb-*` on others |

**Where ng-brutalism is ahead:** of the libraries here, only ng-brutalism
ships zero-specificity, layered component CSS by default. PrimeNG's layer is
opt-in. shadcn needs tailwind-merge to settle class conflicts; ng-brutalism's
layers settle them for free.

**What to fix:**

- **The documented precedence order is incomplete.** The docs say "the input
  wins". But Tailwind's `utilities` layer, and any unlayered rule, beat
  `@layer components`. So the real order is:
  1. a utility class or unlayered CSS that sets the property itself
  2. the input
  3. a CSS variable (local first, then inherited)
  4. the default

  That order makes sense, since a class is also a per-instance choice, but
  document it with an example: `rounded-none` beats `radius="lg"`.

- **Namespace the internal parts.** `data-slot="dialog-title"` collides with
  shadcn-style markup. Ark/Zag's `data-scope` plus `data-part` is a version of
  the same idea that can't collide. Adopt `data-nb-part`, or scope the slot
  selectors under each component's root. Then treat parts as documented public
  API. That gives consumers Mantine's "style any part" ability without a
  Styles API.

- **Don't copy PrimeNG's `pt` or Mantine's `classNames` props.** In Angular
  templates, consumers can already put classes on projected parts, and
  zero-specificity CSS means plain selectors work. Namespaced, documented
  parts are enough.

## 4. CSS delivery

| | ng-brutalism | Peers |
|---|---|---|
| Delivery | One global `styles.css` plus a CSS subpath export per component | Material and PrimeNG ship styles with each component, so you only pay for components you use. Spectrum has one package per component. shadcn ships none: the utilities are in your own code. |
| Cascade layers | `@layer base, components` | PrimeNG: an optional `primeng` layer. shadcn and daisyUI: Tailwind's layers. |
| Runtime | None | PrimeNG and Chakra generate styles at runtime. Material compiles Sass at build time. |

A global stylesheet with no runtime suits the library at its current size: it
works with SSR and caches well. Two changes:
- Move the tokens into a layer (§1, item 1).
- Document how the library's layers combine with Tailwind's. Its `base` and
  `components` layers merge into Tailwind's layers of the same name, which is
  the behavior you want. But `@ng-brutalism/ui/styles.css` must be imported
  after `tailwindcss` for utilities to win.

The per-component CSS exports are a good escape valve. Styles attached to each
component (Material's model) only become worth it if the component count
grows a lot.

## 5. Component and composition model

- **Directives on native elements** (`button[nbButton]`, `input[nbInput]`)
  are the same choice Angular Material (`matButton`), Spartan helm (`hlmBtn`)
  and PrimeNG (`pButton`) made. It is the best practice for Angular: you keep
  native semantics and native forms, with no wrapper DOM. Keep it.

- **Compound components with DI controllers** (`NB_FIELD`, `NB_SELECT`,
  `NB_ACCORDION`) are the Angular version of Radix and Ark compound
  components. Keep them, but turn the field contract around the way Angular
  Material does.
  - In Material, `mat-form-field` consumes a `MatFormFieldControl` interface,
    and any control can implement it.
  - In ng-brutalism, each control reads `NB_FIELD` and repeats the same
    wiring (audit 2.2).
  - A small `NbFieldControl` contract would remove that duplication. It would
    also let controls from other libraries, such as a date picker, sit inside
    `nb-field`.

- **`hostDirectives` composition** is used inside the library (the tone,
  underline and margin-reset capabilities), which is modern Angular. But the
  component CSS keys on the selector attribute, for example `[nbButton]`. A
  consumer who composes a directive through `hostDirectives` doesn't get that
  attribute rendered, so the styles never apply. Spartan helm and Material
  bind their styling hook from host metadata (a host class), which still
  works under composition. The rule should be: **styling hooks come from host
  bindings, never from the selector.**

## 6. Behavior and accessibility foundation

Every mature styled library sits on a separate behavior layer:

| Styled layer | Behavior layer |
|---|---|
| Radix Themes, shadcn/ui | Radix Primitives |
| Chakra UI v3, Park UI | Ark UI (Zag state machines) |
| React Spectrum | React Aria |
| Spartan helm | Spartan brain |
| Angular Material | Angular CDK |
| PrimeNG | Built in-house, with an unstyled mode |

ng-brutalism writes its behavior by hand inside each styled component (the
select's keyboard model, the accordion's focus handling). It uses the platform
where it can (`<dialog>`, `popover`).
- **Simple controls:** relying on the platform is excellent for the dialog,
  inputs and checkbox.
- **Composite widgets:** this is where the audit's accessibility bugs cluster
  (select tab stops, lost focus). The Phase 6 roadmap (tabs, menu, tooltip,
  toast) would add many more widgets of this kind.

**Angular now has a first-party behavior layer: Angular Aria
(`@angular/aria`).**
- It provides 12 headless patterns, including Select, Listbox, Combobox, Menu,
  Menubar, Tabs, Accordion, Toolbar, Tree and Grid.
- The directives handle keyboard interaction, ARIA attributes and focus; you
  supply the markup and CSS. That is exactly the gap in ng-brutalism's
  interactive components.
- The cost: it depends on `@angular/cdk`, which reopens ADR 0001's "zero CDK"
  decision. It also launched as a developer preview in v21, so check its
  status for v22 before committing.

**Recommendation:**
- Keep native elements for the simple controls.
- Once Angular Aria is stable, build the select and every Phase 6 composite
  widget on it, the way shadcn sits on Radix.
- Record this in an ADR that replaces the dependency part of ADR 0001.

## 7. Forms, i18n, testing

- **Forms: ahead.**
  - The core is model-based and shaped for Signal Forms (`FormValueControl`).
  - A bridge supports classic forms, with a Material-style
    `NB_ERROR_STATE_MATCHER`.
  - Most libraries, Material and PrimeNG included, are built around
    `ControlValueAccessor`.

  Keep this design.

- **i18n: behind.** Material has `*Intl` services (for example
  `MatPaginatorIntl`), PrimeNG takes translations in `providePrimeNG`, and
  React Aria ships with locales. ng-brutalism hardcodes English strings
  (audit 3.6). `provideNgBrutalism({ intl })` is the obvious place for this.
  It mirrors `providePrimeNG` and gives the currently empty provider a
  purpose.

- **Testing: mixed.**
  - **Strong:** the release gates (`api-guard`, the export check, the minimum
    version check, and the pack + `ng add` smoke test) are stronger than in
    many larger libraries.
  - **Weak:** behavior tests run only in jsdom, which can't see the cascade,
    and the cascade is where this architecture lives (audit 2.1). Mature
    libraries test the rendered output in real browsers.
  - **Later:** Material also ships component test harnesses for consumers
    (`MatButtonHarness`). An `@ng-brutalism/ui/testing` entry point could do
    the same, though it would need `@angular/cdk/testing`.

---

## Scorecard

| Area | Best practice (who does it well) | ng-brutalism | Rating |
|---|---|---|---|
| Override ergonomics | Zero-specificity, layered CSS | `:where()` plus `@layer components` | ✓ ahead |
| Forms | Signal Forms first, plus a bridge for classic forms | Yes | ✓ ahead |
| Theming in plain CSS | CSS variables (shadcn, daisyUI), not Sass mixins or TS presets | Yes | ✓ |
| Components on native elements | Material, Spartan and PrimeNG directives | Yes | ≈ |
| Compound components with DI | Radix/Ark compound components, Material's form field | Yes, but the field contract points the wrong way | ≈ |
| Shared vocabulary for design props | Radix props, Chakra recipes | Documented, but drifting (audit 3.1) | ≈ |
| Inherited setting vs. instance value | Decided per category and documented (Radix, Mantine) | Scalars documented as one-off but they cascade | ✗ |
| Where tokens sit in the cascade | Overridable from any layer | Unlayered, so Tailwind `@theme` overrides are lost (verified) | ✗ |
| Token tiers and text-safe colors | M3 roles, Radix 12-step scales | Pairs only; text tones fail AA | ✗ |
| Dark mode and scoped themes | `light-dark()` (M3), nestable `data-theme` (daisyUI, Radix) | None | ✗ |
| Behavior layer for composite widgets | Radix, Ark, React Aria, Angular Aria | Written by hand | ✗ |
| Namespaced internal parts | Ark's `data-scope` and `data-part` | Un-namespaced `data-slot` | ✗ |
| i18n | Intl services or provider config | English strings hardcoded | ✗ |
| Real-browser tests | Visual regression, test harnesses | jsdom only | ✗ |

## What to adopt, and what not to

**Adopt, in the audit plan's order:**

1. Make every input an instance value: a data attribute feeds one shared,
   non-inheriting private variable per category (the Radix Themes model
   combined with the tone pattern). *Audit Phase 2.*
2. Put the tokens in `@layer theme` with `:where(:root)`, so overrides through
   `@theme`, a plain `:root` block or a scoped class all win. Fix the docs
   site's dead overrides at the same time. *Phases 2–3.*
3. Formalize the tiers:
   - the palette
   - semantic roles, each with a `-foreground` **and** a `-text` variant
   - role tokens (field, box, selector)
   - component hooks

   Merge `--nb-main` into `--nb-primary`. *Phase 3.*
4. Dark mode through `light-dark()` and `color-scheme`, plus a nestable
   `[data-nb-theme]`. *Phase 4.*
5. Namespaced, documented internal parts (`data-nb-part`). *Phase 5.*
6. An `NbFieldControl` contract, following Material's `MatFormFieldControl`.
   *Phase 2.*
7. Angular Aria as the behavior layer for the select and the Phase 6
   composite widgets, recorded in a new ADR. *Prerequisite for Phase 6.*
8. `provideNgBrutalism({ intl })`. *Phase 5.*

**Deliberately don't copy:**

- **TypeScript theme objects or presets** (PrimeNG, MUI). They fight the
  CSS-first model and add runtime work.
- **Generating styles at runtime** (Chakra and Emotion). Static CSS does the
  job here with no downside.
- **Pass-through or `classNames` APIs** (PrimeNG `pt`, Mantine's Styles API).
  They add a lot of API surface, and in Angular, documented parts plus
  zero-specificity CSS cover the same need.
- **Responsive object props** (Radix). Already rejected in `design-props.md`
  §6, since Tailwind owns responsiveness.
- **Copy-paste as the main distribution channel** (shadcn, Spartan,
  neobrutalism.dev). It removes the npm upgrade path that `api-guard` and the
  release gates exist to protect. A copy-paste registry for compositions and
  recipes, on top of the package, could still be worth adding later.

---

## Sources

- Angular Material, button styling and the `button-overrides` tokens:
  <https://material.angular.io/components/button/styling>
- Angular Material, theming with `light-dark()` and `color-scheme` (mirror):
  <https://www.mintlify.com/angular/components/essentials/theming>
- PrimeNG styled mode (`dt` scoped tokens, `cssLayer`, `--p-` prefix,
  `darkModeSelector`): <https://primeng.dev/theming/styled>
- PrimeNG token tiers: <https://v19.primeng.org/theming>
- Angular Aria overview: <https://angular.dev/guide/aria/overview>
- Angular Aria dependencies (docs mirror):
  <https://www.mintlify.com/angular/components/aria/overview>
- Radix Themes, the `[data-radius]` recipe:
  <https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/styles/tokens/radius.css>
- Radix Themes, the `Theme` component:
  <https://www.radix-ui.com/themes/docs/components/theme>
- Mantine `Paper` CSS, with component variables reset on `.root`:
  <https://raw.githubusercontent.com/mantinedev/mantine/master/packages/@mantine/core/src/components/Paper/Paper.module.css>
- Spectrum CSS, `--mod-*` customization: <https://github.com/adobe/spectrum-css>
- daisyUI 5 themes (role tokens, nested `data-theme`, `prefersdark`):
  <https://daisyui.com/docs/themes/>
