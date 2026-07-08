# Design-System Audit — @ng-brutalism/ui

> Date: 2026-07-06 · Scope: full library audit (architecture, Angular implementation,
> tokens/theming, component APIs, styling, accessibility, forms, overlays, testing,
> packaging, docs, DX) benchmarked against Angular Material/CDK, Radix, shadcn/ui,
> Chakra, MUI/Base UI, Tailwind v4 theming, and Material Design token layering.
> Audited at v0.2.0 on branch `refactor/token-customization`.

---

# Executive Summary

**Verdict: a genuinely well-architected pre-1.0 library with one excellent, differentiated idea — the CSS-first token contract — and three serious gaps that would stop production adoption today: no Angular Forms integration for `NbSelect`, an accessibility bug class around hidden-but-focusable content, and a public docs site that doesn't document the library's best feature (theming).**

**Already strong (do not change):**

- The CSS-first customization architecture (`docs/architecture/token-customization.md`) — semantic inputs → `data-*` attributes, scalar inputs → one public CSS variable slot, CSS owns final properties via fallback chains, `:where()` for zero specificity. Better thought-out than most shipped libraries. The precedence contract (input wins via inline var, CSS wins otherwise) is coherent and tested.
- Directive-first APIs on native elements (`button[nbButton]`, `input[nbInput]`) — the Angular-idiomatic equivalent of Radix `asChild`; native semantics and free `ControlValueAccessor` support for native controls.
- Modern Angular execution: signal inputs, `model()`, `hostDirectives` capabilities, OnPush, `afterNextRender` + `DestroyRef` cleanup (`nb-marquee.ts` is exemplary), platform guards, zero RxJS, zero zone dependence.
- Per-component CSS subpath exports guarded by a registry sync test (`libs/ui/src/lib/styles/styles.spec.ts`) — an unusual and smart quality gate.
- Token contract tests (`button.tokens.spec.ts`) that pin the *customization contract*, not implementation details.

**Feels immature:**

- Forms: `NbSelect` has no `ControlValueAccessor` — it cannot be used with `formControlName`. No error/invalid state modeling anywhere in the form primitives.
- Overlay behavior: dialog has no scroll lock, no dismiss configuration, no open/close events; select's listbox is CSS-`absolute` (clips inside any `overflow` ancestor).
- `provideNgBrutalism({ theme })` writes inline styles on `:root` at app init — it undermines the CSS-first architecture (blocks dark mode/scoped overrides, causes SSR theme flash).
- Dark mode is a 6-variable stub; named-color tones hardcode `#000` text and won't survive it.

**Biggest architectural risk:** the 17-value `NbTone` union mixing raw palette names (`yellow`, `pink`, `mint`) with semantic roles (`primary`, `danger`) — the API most likely to force a painful breaking change post-1.0.

**Biggest token customization risk:** three sources of truth for default values (theme.css declarations, TS resolver fallbacks like `var(--nb-radius-md, 0.5rem)` in `tokens/radius.ts`, and repeated fallbacks in component CSS) with tests pinning the duplicated strings.

**Biggest adoption blocker:** the public docs site has component pages, installation, and FAQ — but **no theming guide, no token reference, no forms guide, no dark-mode page**. The internal docs (`docs/components/design-props.md`) are excellent; consumers never see them.

---

# Current Architecture Map

```
ng-brutalism (Nx workspace, pnpm)
├── libs/ui                      @ng-brutalism/ui — single ng-packagr entry point
│   ├── src/index.ts             flat 245-line barrel (all exports)
│   └── src/lib/
│       ├── core/                provide.ts,
│       │                        capabilities (tone/underline/reset-margin),
│       │                        input-transforms (radius/shadow/padding/gap/border)
│       ├── tokens/              TS token vocab: NbTone, NbRadius, NbShadow, NbSpacing,
│       │                        NbPadding, NbBorderStrength, typography, NbThemeConfig
│       ├── styles/              theme.css (all --nb-* vars), tone.css (data-nb-tone
│       │                        recipes), base.css (reset+layers), styles.css (full bundle)
│       └── <40 primitives>/     one folder each: nb-x.ts + nb-x.css + index.ts + specs
├── libs/schematics              ng-add; built separately, copied into dist/ui/schematics
├── apps/docs                    Analog docs site (37 component pages, recipes, showcase)
├── docs/                        internal: architecture ADRs, design-props, progress logs
└── tools/                       analytics worker/report
```

Styling model: components render **no CSS classes at all** (`button.className === ''` is asserted in tests). All styling comes from shipped plain-CSS files selecting on attributes (`:where(button[nbButton])[data-size='sm']`) inside `@layer components`, consuming `--nb-*` variables with fallback chains. Recipes (Travel Card, etc.) live only in the docs app as copy-paste compositions — shadcn-style, not shipped code.

---

# Comparison Matrix

| | ng-brutalism | Angular Material/CDK | Radix UI | shadcn/ui | Chakra UI | MUI/Base UI | Tailwind v4 theming | Material Design tokens |
|---|---|---|---|---|---|---|---|---|
| **Architecture** | Directive-first primitives + compound components, single entry point | Behavior (CDK) / styled (Material) split, secondary entry points per component | Headless behavior primitives, per-package | Copy-paste styled compositions over Radix | Styled system components | Styled + headless (Base) split, per-path imports | N/A (CSS framework) | Spec, not code |
| **Styling model** | Shipped plain CSS, attribute selectors, `@layer` + `:where()` — **zero specificity, best-in-class overridability** | Component-encapsulated + Sass theming API | None (consumer-owned) | Tailwind utilities in your codebase | Runtime CSS-in-JS / Panda | Emotion / zero-runtime moving | Utilities from `@theme` vars | N/A |
| **Token model** | 2.5 layers: global `--nb-*` + component `--nb-x-*` + internal `--_nb-tone-*`; palette/semantic blurred | System tokens (M3: ref→sys→comp) via Sass/CSS vars | None (Radix Colors optional) | Flat semantic CSS vars (`--primary`, `--radius`) | ref tokens + semanticTokens, first-class | theme object + CSS vars | `@theme` → CSS vars → utilities | ref → sys → comp, canonical 3-layer |
| **Accessibility** | Good bones (native elements, native `<dialog>`), gaps in select/accordion | Gold standard (CDK a11y, FocusTrap, LiveAnnouncer) | Gold standard (full APG) | Inherits Radix | Good | Good | N/A | N/A |
| **API ergonomics** | Consistent 7-category design-prop vocabulary — genuinely good | Verbose but complete | Composable parts | Own-the-code | Style props everywhere | Slots + sx | Utility classes | N/A |
| **Customization** | Inputs ∥ CSS vars single-slot contract — novel and clean | Sass API + M3 tokens (historically painful) | Total (headless) | Total (you own code) | Theme object | Slots/sx/theme | `@theme` | Spec-level |
| **Packaging** | APF, FESM2022, per-component CSS exports; single JS entry; 2 runtime deps + schematics dep | APF, secondary entry points, tslib only | Per-package ESM | N/A (not a package) | Many packages | Path imports | N/A | N/A |
| **Documentation** | Internal docs excellent; public site missing theming/token/forms/a11y guides | Comprehensive | Excellent | Excellent | Excellent | Excellent | Excellent | Spec |

---

# Deep Findings

## 1. Architecture

**1.1 — Single entry point will not scale to 100+ primitives, but is fine today.** — **Medium**
Evidence: `libs/ui/ng-package.json` has one `entryFile`; `src/index.ts` is a flat 245-line barrel. `sideEffects: ["**/*.css"]` correctly marks JS as pure, and every component is standalone, so tree-shaking works today — this is *not* the barrel-file anti-pattern (components import each other via relative paths, not the barrel). But: (a) one FESM2022 file means consumers parse the whole library even if they use one button; (b) a single flat namespace makes API review, docs generation, and deprecation harder at 100 primitives. Angular Material solved this with secondary entry points per component. See "Public API Recommendation". Effort: medium. Breaking: no (additive).

**1.2 — The `ɵ` capability exports are handled correctly.** — **Low (positive)**
`index.ts:39-47` exports capabilities as `ɵNbToneCapability` with a clear comment — matches Angular Material's convention for NG3001-forced exports. Keep it.

**1.3 — `NbButtonTrailingIcon` bypasses its barrel.** — **Low**
`index.ts:163` imports from `./lib/button/nb-button-trailing-icon` directly while everything else goes through folder barrels; its types aren't exported alongside the button types block. Consistency nit.

**1.4 — Schematics assembly is fragile but functional.** — **Medium**
`libs/ui/project.json:20-28` chains `nx run schematics:build` → `ng-package` → hand-rolled `node -e cpSync` + a stamped `{"type":"commonjs"}`. Works, but nothing verifies the assembled output (a renamed file in `libs/schematics` would ship a broken `ng add` silently). Add a post-build smoke assertion (does `dist/ui/schematics/collection.json` exist and does its `factory` resolve?). Effort: small.

**1.5 — Repo hygiene.** — **Low**
`.DS_Store` files are committed inside `libs/ui/src/lib/`; `tmp/` contains a vendored clone of ronit.io and screenshot piles. None ships (`files` allowlist), but it's contributor noise. Gitignore and purge.

## 2. Angular implementation

**2.1 — Always-on document click listener per select instance.** — **High**
`nb-select.ts:81`: `'(document:click)': 'closeOnOutsideClick($event)'` runs for **every document click, for every select instance, even when closed**. In a zoneless app each click triggers the handler on every rendered select; in a zone app it also triggers change detection. Material/CDK attach outside-click handling only while an overlay is open. Fix: register the listener inside an effect gated on `open()`, or move to CDK Overlay's `outsidePointerEvents`. Effort: small.

**2.2 — Module-level ID counters.** — **Medium**
`nb-select.ts:28` `let nextSelectId = 0` (same in option). Two problems: IDs are `neo-select-trigger-*` — the `neo` prefix was supposed to be renamed to `nb` pre-v0.1.0 per `CONTEXT.md`; and module-level counters can produce SSR/client ID mismatches when render order differs (hydration `aria-controls` mismatch). Use an injectable ID generator and rename to `nb-`. Effort: small.

**2.3 — Known lint/test debt blocks release.** — **High (acknowledged)**
`docs/progress.md` records it: unused `input` import in `nb-accordion-trigger.ts:5` (lint error) and 3 stale specs. Confirmed the unused import exists. Phase-1 work.

**2.4 — `exportAs` coverage is inconsistent.** — **Medium**
Only 4 primitives declare `exportAs` (section, typography, text, icon). Adopt a rule: every public directive gets `exportAs`. Effort: small.

**2.5 — Everything else is genuinely modern.** — **Positive**
Signal inputs with `transform`, `model()`, signal queries, `hostDirectives`, `afterNextRender` + `DestroyRef.onDestroy` for observers, `isPlatformBrowser` guards on all imperative browser calls, dev-mode a11y warning in `nb-icon.ts`. No RxJS, no zone reliance. Ahead of most published Angular libraries.

## 3. Tokens and theming

**3.1 — `NbTone` conflates palette and semantics; this is the riskiest API.** — **High**
`tokens/tone.ts`: `'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'cream' | 'white' | 'black' | 'ink'` sit in the same union as `'primary' | 'danger' | 'surface'`. Material's ref→sys→comp layering and Chakra's `semanticTokens` exist precisely to avoid this: when a consumer rebrands, `tone="yellow"` either lies or breaks. Worse, `styles/tone.css` hardcodes `#000000` foregrounds for all named colors and `#000`/`#fff` for ink/white/black — those recipes cannot be re-themed and cannot adapt to dark mode. Recommendation: keep both vocabularies but *separate them* — semantic tones as the documented, stable tier; palette tones as an explicit "brutalist palette" tier whose fg/border route through `--nb-tone-<name>-fg` variables instead of literals (the `--nb-tone-neutral-*` indirection already exists at `theme.css:32-34` — finish the pattern for all tones). Effort: medium. Breaking: no if names stay.

**3.2 — `prefers-reduced-motion` deletes the design language instead of the motion.** — **High**
`theme.css:92-99` zeroes `--nb-shadow-offset-*` under reduced motion. Because the press interaction *translates by the shadow offset*, this stops motion — but it also removes **every static offset shadow in the entire library**, i.e. the visual identity, for reduced-motion users. Reduced motion is about movement, not decoration (WCAG 2.3.3). Fix: under reduced motion, disable `transition`/`translate` on interactive states and keep shadows. Separately, marquee CSS has **no** reduced-motion handling — an infinite auto-playing animation must pause under `prefers-reduced-motion` (WCAG 2.2.2). Effort: small–medium.

**3.3 — `provideNgBrutalism({ theme })` fights the CSS-first architecture.** — **High**
`core/provide.ts` sets inline styles on `document.documentElement` in an app initializer, browser-only. Consequences: (a) **SSR/prerender theme flash**; (b) inline `:root` styles beat every stylesheet, so provider users can never override those tokens per-scope, in `.dark`, or in media queries — the exact use cases the CSS architecture is built for; (c) it covers an arbitrary 18-key subset (`tokens/theme.tokens.ts`) that the README has to caveat. Compare: shadcn is CSS-vars-only; Chakra's TS config *generates* CSS; Material theming compiles to stylesheet rules. Recommendation: deprecate the runtime var-setter. Either (1) drop `theme` from the provider and document CSS/`@theme` as the only theming path (recommended), or (2) emit a `<style>` tag with a `:root { … }` rule during SSR + browser so it participates in the cascade. Keep `provideNgBrutalism()` as the future home for real config (default tone, density, a11y flags). Effort: small–medium. Breaking: yes (pre-1.0 deprecation is the right time).

**3.4 — Default values are triplicated.** — **Medium**
`--nb-radius-md: 0.5rem` lives in `theme.css:45`; `'var(--nb-radius-md, 0.5rem)'` duplicates the fallback in `tokens/radius.ts:14`; tests pin the concatenated string. If theme.css changes, TS fallbacks silently drift. Since `base.css` is a hard requirement anyway, the TS fallbacks are dead weight — emit `var(--nb-radius-md)` without fallback, or generate both CSS and TS from one JSON token source (Style Dictionary direction). Effort: small (strip fallbacks) to medium (codegen).

**3.5 — Dead and vestigial tokens.** — **Medium**
Verified by grep: `--nb-size-sm/md/lg` (`theme.css:67-69`) are declared and consumed **nowhere** — meanwhile button heights are hardcoded (`2.75rem`, `2.25rem`… in `nb-button.css`), which also means there is no density story. `--nb-main`/`--nb-main-foreground` survive in exactly one selector in nb-input.css. `--nb-secondary-background` appears unused. Either wire the size scale into control heights (density theming for free) or delete the tokens. Every public `--nb-*` in theme.css is API. Effort: small.

**3.6 — No motion tokens.** — **Medium**
Durations/easings are hardcoded across component CSS (`150ms ease-out`, `200ms`, `300ms` — verified in 7+ files). Add `--nb-motion-fast/base` + `--nb-ease` reference tokens and route component transitions through them. Also gives a one-variable kill switch complementing 3.2. Effort: small.

**3.7 — Dark mode is a stub and named tones will break it.** — **High**
`theme.css:83-90` `.dark` overrides 6 variables. Pastels, `--nb-cream`, `--nb-field-bg`, and every hardcoded `#000` foreground in tone.css don't adapt. Nothing on the docs site mentions dark mode. Decide explicitly: either ship a designed dark theme (all tones re-derived, tone.css literals routed through vars) or document "not yet supported" and remove the half-`.dark` block. Shipping a half theme is the worst option. Effort: large (real theme) / trivial (honest removal).

**3.8 — What's already right (protect it).** — **Positive**
Single-slot input↔CSS-var contract; `data-nb-tone` recipes with internal `--_nb-tone-*` slots and `@property` registration; the "never set public vars as component defaults" authoring rule (arch doc §21) which keeps inheritance working; fallback-comma discipline; `NbBorderStrength` naming reading as brutalist decisions; the Tier-1/Tier-2 split in `design-props.md`. This is the moat — document it publicly (see §11).

## 4. Component APIs

**4.1 — The 7-category vocabulary is the strongest API asset.** — **Positive**
`tone / size / radius / shadow / border / spacing / typography` applied by archetype, with a documented per-component matrix and a documented leaf-exemption rule. More API governance than most 1.0 libraries. The deliberate refusals (no responsive-object props, no width/columns inputs, Tailwind owns layout) are correctly reasoned in `design-props.md §6`.

**4.2 — Vocabulary leaks and misfits.** — **Medium**
- `NbIconTone` reuses the `data-nb-tone` **attribute** with a different value set (`current/muted/inverse` — `nb-icon.ts:49`). `tone="primary"` on an icon *also* activates the shared tone recipe in tone.css, setting `--_nb-tone-*` slots that cascade tone context to descendants. Two vocabularies, one attribute = future collision. Use `data-icon-tone`.
- `NbChip` sizes via a chip-local `padding` enum instead of `size` (the only interactive primitive off-pattern).
- `NbSelect` lacks `size` while input/textarea/button have it.
- Enum value `'default'` in `NbShadow`/`NbBorderStrength` is awkward (`shadow="default"` reads as a no-op); `'md'` would align with every other scale. Cheap to fix pre-1.0, painful after.
Effort: small each. Breaking: yes (rename/alias window is now).

**4.3 — Escape hatches are right.** — **Positive**
Inputs → CSS vars → classes is a clear three-tier hatch. Consumer classes don't collide with library classes, only with library CSS, which `:where()` guarantees they beat. A stronger guarantee than tailwind-merge-based libraries can make.

**4.4 — Recipes: keep them copy-paste.** — **Low**
Recipes live only in `apps/docs/src/app/pages/recipes/`. Correct call (shadcn model). But the README says recipes "ship with v0.2.0", implying package code. Clarify: "recipes are copy-paste compositions in the docs, not exports."

## 5. Styling system

**5.1 — Unlayered global `body` styles are invasive.** — **High**
`base.css:18-23` sets `body { background-color; color; font-family; font-weight }` **outside any `@layer`**, plus a universal `box-sizing` reset. Unlayered styles beat all layered styles — an app adopting ng-brutalism for one widget gets its body background repainted, and its own `@layer`-organized styles can't win without specificity games. Material scopes equivalents to opt-in classes; Tailwind puts preflight in `@layer base`. Fix: move body/reset rules into `@layer base` *and* consider an opt-in `.nb-root` scope for body colors. Effort: small. Breaking: mild visual, pre-1.0 fine.

**5.2 — Vestigial Tailwind machinery in shipped CSS.** — **Medium**
`base.css:10` ships `@source '../fesm2022/ng-brutalism-ui.mjs';` and line 42 ships a hand-escaped utility class `.focus-visible\:outline-\[…\]`. Both date from v0.1.x when templates emitted Tailwind classes; templates now emit **zero** classes (verified by grep). The `@source` forces every consumer's Tailwind build to scan the FESM for nothing; in a non-Tailwind pipeline it's an unknown at-rule shipped to the browser. Delete both. Effort: trivial.

**5.3 — Tailwind should be an optional peer.** — **High**
`libs/ui/package.json:43` declares `tailwindcss: ^4.0.0` as a hard peer dependency, and the FAQ says Tailwind is required. After the CSS-first migration that's no longer true: the shipped CSS is plain CSS; Tailwind is only the *recommended companion* for layout. A hard peer blocks (or warning-spams) every non-Tailwind Angular team. Move to `peerDependenciesMeta: { tailwindcss: { optional: true } }`, keep the schematic's Tailwind setup as the default happy path, add a "without Tailwind" docs page. Single change, meaningfully wider adoption. Effort: small.

**5.4 — Layering strategy is otherwise sound.** — **Positive**
`@layer base, components` + `:where()` means: library defaults < consumer anything. One gap: the per-component-CSS import path depends on consumers importing `base.css` first; the exports map can't enforce it. Document loudly.

**5.5 — Hardcoded `z-index: 50`** on the select listbox, no z-scale token. — **Low** (moot if select moves to top-layer positioning).

## 6. Accessibility

**6.1 — Collapsed accordion content is `aria-hidden` but still focusable.** — **Critical**
`nb-accordion-content.ts:15` sets `aria-hidden` when closed; the CSS collapses via `grid-template-rows: 0fr` + `overflow: hidden`. Links/buttons/inputs inside a closed panel **remain in the tab order** — keyboard users tab into invisible content, and `aria-hidden` on an element containing focusable descendants is an ARIA violation flagged by axe. Radix hides content with `hidden`/`display:none` after animation. Fix: bind `[inert]` on the closed region or toggle `visibility: hidden` after the collapse transition (`transition: grid-template-rows 200ms, visibility 0s 200ms`). Effort: small.

**6.2 — Select keyboard model is incomplete.** — **High**
ArrowUp/Down (wrapping) and Escape-on-option exist. Missing vs APG: **Home/End**, **typeahead**, **Tab closes the popup** (currently tabbing away leaves the listbox open until a document click), Escape when focus is on the trigger with the popup open. Also `role="option"` sits on `<button>` elements with `disabled` — unfocusable disabled options are invisible to screen-reader arrow browsing; APG prefers `aria-disabled` + focusable. Effort: medium.

**6.3 — Accordion has no header keyboard navigation.** — **Medium**
APG lists Up/Down/Home/End between headers as optional but Radix/Material ship it; parity expectation. Effort: small–medium.

**6.4 — No error/invalid accessibility in forms.** — **High** (see §7).

**6.5 — Dialog relies on native `<dialog>` — right call, incomplete finish.** — **Medium**
The ADR (`docs/adr/0001-dialog-native-element.md`) is well-reasoned. Missing finish: initial-focus control guidance, a `closed`/`cancel` output so consumer state can sync (a consumer's `open` flag desyncs when the user presses Esc — the native `close` event is not surfaced), and configurable backdrop dismissal (`dismissible` input; currently always closes on backdrop click, `nb-dialog.ts:76-80`). Effort: small–medium.

**6.6 — Positives.** Focus ring tokens applied via `:focus-visible` consistently; native elements everywhere; icon dev-mode warning; `aria-expanded`/`aria-controls` wiring correct; target sizes fine (36px+ controls). The base is good — the gaps are in the interactive composites.

## 7. Forms

**7.1 — `NbSelect` does not implement `ControlValueAccessor`.** — **Critical**
Verified: zero `ControlValueAccessor`/`NG_VALUE_ACCESSOR` references in the library. `NbSelect` uses `model()` two-way binding only — `<nb-select formControlName="…">` throws. For an Angular UI library, forms integration is table stakes (Material, PrimeNG, ng-zorro treat CVA as mandatory). The directive-on-native-element strategy covers input/textarea/checkbox/native-select for free — which makes the one custom control's gap stand out more. Implement CVA on `NbSelect` (value writes, `onChange`/`onTouched` on close, `setDisabledState` merged with the `disabled` input, `aria-invalid`/`aria-required` reflection from `NgControl`). Effort: medium.

**7.2 — No error-state modeling anywhere.** — **High**
No `data-invalid` styling, no error-message primitive, no `aria-describedby` wiring between label/hint/error and control, no touched/dirty visual states. Compare Material's `mat-form-field` + `mat-error` or shadcn's `FormMessage`. A small `NbField` context component that generates IDs, links label/control/description/error via `aria-describedby`, and reflects `[data-invalid]` from `NgControl` state would complete the story in the library's idiom. Effort: medium–large. Breaking: no (additive).

**7.3 — Native-first form controls are the right architecture.** — **Positive**
`input[nbInput]`, `input[nbCheckbox]`, `select[nbSelect]` keep native CVA, native validation, autofill, platform behavior. Both reactive and template-driven forms work today for those. Say this out loud in the docs — it's a differentiator vs wrapped-component libraries.

## 8. Overlays / interactions

**8.1 — Select popup is clipped by any overflow ancestor.** — **High**
`nb-select.css:103-106` positions the listbox `absolute` under the trigger. Inside `overflow: auto/hidden` containers (cards, dialogs, tables) the popup clips; no flip, no collision detection. Options: (a) CDK Overlay for the listbox only; (b) native Popover API (`popover` attribute → top-layer) — preserves the zero-dependency stance and pairs with the native-`<dialog>` philosophy; (c) document `NbSelect` as a "simple in-flow primitive" and recommend `NbNativeSelect` for production forms. Recommended: (b), with (c) in the interim. Effort: medium.

**8.2 — Dialog lacks scroll lock.** — **Medium**
Native `showModal()` does not prevent body scroll-behind. One CSS line: `body:has(dialog[data-nb-dialog][open]) { overflow: hidden; }`. Effort: trivial.

**8.3 — Label the tiers.** — **Medium**
Dialog is near-production; Select's popup is not; Marquee is decorative. Add a per-component "Status: Stable / Preview" badge to docs pages (Material and Base UI both do this). Honesty converts to trust. Effort: small.

## 9. Testing

**9.1 — Current state:** 37 spec files; contract-grade token tests; interaction tests for select/accordion; a packaging registry test; a schematics spec; Playwright e2e on the docs app; jsdom via Vitest + Analog. **Missing:** specs for 8 components (avatar-group, chip, icon-button, label, marquee, stat, status-dot, title); zero axe/a11y assertions; no browser-mode tests (the arch doc itself says computed-style precedence needs a real browser — progress.md notes 2 jsdom precedence specs are stale for exactly that reason); no SSR smoke test (the dialog ADR explicitly requires one); no public API guard; no consumer install smoke in CI (the manual `tmp/ngb-smoke` app exists but isn't automated).

**9.2 — Recommended strategy (prioritized):**

1. **Vitest + TestBed (keep, expand)** — token contract + interaction per component; fill the 8 gaps.
2. **Vitest browser mode (Playwright provider) for the precedence suite** — makes the *central architectural claim* (input beats CSS var beats fallback) verified in a real engine.
3. **axe-core in component tests** — `vitest-axe` against dialog/select/accordion/forms fixtures; catches 6.1-class bugs permanently.
4. **Keyboard interaction specs** — APG walkthroughs per interactive component as TestBed tests dispatching real KeyboardEvents.
5. **Public API guard** — snapshot `dist/ui/index.d.ts` (API Extractor or a checked-in rollup diff) so accidental export changes fail CI.
6. **Package smoke in CI** — build → `npm pack dist/ui` → install into scaffolded app (automate `tmp/ngb-smoke`) → `ng build` + `ng add` harness. Catches exports-map/sideEffects/schematics regressions — the 0.1.1 hotfix was exactly this class.
7. **SSR smoke** — prerender a page using dialog/select/marquee; assert no exceptions (satisfies the ADR's open requirement).
8. **Later:** visual regression on docs recipes via Playwright screenshots; defer cross-browser matrices until post-1.0.

## 10. Packaging

**10.1 — `@angular-devkit/schematics` as a runtime dependency.** — **Medium**
`libs/ui/package.json:46`. Exists so `ng add` factories resolve under pnpm's strict layout — a real concern — but drags the devkit (+ transitive deps) into every consumer install. Angular Material ships schematics without it. Test whether it's actually required under pnpm with the smoke app; if it is, keep it consciously — otherwise drop. Effort: small.

**10.2 — Removed class-merge utility deps.** — **Resolved**
The public class-merge helper is no longer shipped, so `clsx` and `tailwind-merge` do not need to be runtime dependencies.

**10.3 — Engines exclude Node 24.** — **Medium**
`libs/ui/package.json:52`: `^20.19.0 || ^22.12.0`. Angular 21 supports Node 24; this hard-fails legitimate installs. Add `|| ^24.0.0`. Effort: trivial.

**10.4 — Secondary entry points: adopt at the *component-family* level before 1.0.** — **High (strategic)**
Full per-component entry points (Material-style) are overkill at this size. But `/tokens` at minimum should split: token types + provider are consumable without component code, and it creates the structure for future splits. See Public API Recommendation. Effort: medium. Breaking: no (root re-exports).

**10.5 — Positives:** APF-compliant build; hand-maintained exports map *with a sync test*; per-component CSS exports (rare, good); Keep-a-Changelog discipline; nx release wiring; documented release runbook; `files` allowlist. The `^21.0.0` peer range is standard Angular-library practice — budget for the every-6-months major bump.

## 11. Documentation

**11.1 — The best content is trapped in internal docs.** — **Critical (adoption)**
Public site pages (verified): introduction, installation, FAQ, inspired-designs, 37 component pages, recipes, showcase. **Absent:** theming/customization guide, token reference (`--nb-*` catalog), design-props vocabulary, dark mode, SSR, forms integration, accessibility statement, "without Tailwind," comparison/when-not-to-use. Meanwhile `docs/components/design-props.md` and `docs/architecture/token-customization.md` contain a publishable theming guide *already written*. A consumer evaluating the library today cannot discover that inputs and CSS vars share a slot — the library's whole point. Highest-ROI item in this audit. Effort: medium (mostly porting).

**11.2 — Proposed information architecture** (mirrors Radix/shadcn/Material conventions):

```
Getting started      Introduction · Installation (ng add / manual / without Tailwind)
                     · Angular & Node support policy · FAQ
Concepts             Design props vocabulary (port design-props.md §1–2)
                     · Customization: inputs vs CSS vars vs classes (the mental model)
                     · Token reference (generated table of every --nb-* var + default)
                     · Tone system · Dark mode & theming · SSR & hydration · Accessibility
Components           (existing 37 pages) + per-page: API table · CSS variable table
                     · a11y notes · Status badge (Stable/Preview)
Recipes              (existing) + explicit "copy-paste, not shipped" framing
Project              Changelog · Roadmap/versioning contract (v0.x policy from CONTEXT.md)
                     · Contributing · Comparison with alternatives / when not to use
```

**11.3 —** `llms.txt` exists — good instinct; extend it as docs grow.

## 12. DX / adoption

- The `ng add` schematic is genuinely robust (project resolution, stylesheet creation, Tailwind fallback with postcss config, idempotent imports). Better than most small libraries.
- Positioning: the honest current identity is **"Angular-first shadcn alternative with a brutalist default skin"** — styled primitives you compose, CSS-variable theming, copy-paste recipes, native-element philosophy. Lean into that phrase. "Accessible Angular primitive system" is not yet earned (§6); "full component library" oversells 40 primitives without menus/tabs/toast/tooltip.

---

# Token Architecture Recommendation

Adopt an explicit, documented 4-layer model — the library is already 80% there; this mostly *names and enforces* what exists:

**Layer 0 — Reference tokens** (raw values, rebrandable):

```css
--nb-ref-yellow: #ffd24a;  --nb-ref-pink: #ff7eb6;  --nb-ref-black: #000000;
--nb-radius-sm: 0.25rem;   --nb-space-md: 0.75rem;  --nb-border-width-strong: 3px;
--nb-motion-fast: 150ms;   --nb-ease: ease-out;     --nb-size-md: 2.5rem;   /* wire it in */
```

**Layer 1 — Semantic/system tokens** (what consumers theme):

```css
--nb-background / --nb-foreground          /* paper / ink            */
--nb-surface / --nb-surface-foreground
--nb-primary / --nb-primary-foreground     /* + secondary, accent    */
--nb-success|warning|danger (+-foreground)
--nb-border  --nb-shadow                   /* the brutalist ink lines */
--nb-shadow-offset-x/y  --nb-border-width  --nb-radius
--nb-focus-ring  --nb-focus-ring-offset
--nb-font-body|display|accent|mono
--nb-tone-<name>-bg/-fg/-border            /* complete this for ALL tones —
                                              kills the #000 literals in tone.css */
```

**Layer 2 — Component tokens** (set at use-site only, never defaulted — the existing rule): `--nb-button-radius`, `--nb-callout-bg`, … unchanged.

**State/internal slots**: `--_nb-tone-bg/-fg/-border-color` unchanged, documented as unstable.

Brutalist-specific tokens are already well-modeled (offset shadow as two offsets + color, border width scale, press interaction derived from shadow offsets). Add `--nb-motion-*` and route halftone/sticker geometry through documented hooks. "Ink/paper": keep `foreground`/`background` as the variables; use ink/paper only as prose vocabulary.

**Customization surfaces — recommendation:**

- ✅ **CSS variable overrides** — primary, documented mechanism (global, scoped, per-element). Already true.
- ✅ **Tailwind `@theme` interop** — document the pattern (`@theme { --color-nb-primary: var(--nb-primary); }`); don't build machinery.
- ✅ **Scoped themes** — already works via inheritance; add one docs page + a test.
- ⚠️ **TypeScript provider** — deprecate the runtime var-setter (finding 3.3).
- ⚠️ **Dark mode** — decide (finding 3.7); prerequisite is tone.css literal removal.
- ⏳ **Density** — cheap once `--nb-size-*` is wired into control heights; defer the public API until asked for.
- ✅ **Theme presets** — ship 2–3 alternative `theme-*.css` files (e.g. mono/ink-only, softened) as proof the token contract supports rebranding. Small effort, big credibility.

---

# Public API Recommendation

Keep the single package; introduce **three secondary entry points now**, not forty:

```
@ng-brutalism/ui              re-exports everything (compat, unchanged)
@ng-brutalism/ui/tokens       token types, value resolvers, NbThemeConfig, provider
@ng-brutalism/ui/<css files>  (existing CSS subpaths — keep)
```

Rationale: `tokens` is the only piece with a distinct dependency/consumption profile today. Standalone components + correct `sideEffects` already deliver tree-shaking; per-component JS entry points buy little until the library approaches ~80–100 primitives or ships heavyweight pieces (a CDK-backed overlay layer would be the trigger — `@ng-brutalism/ui/overlay`). Hold the line on: no deep imports (enforce via an API-guard test on the exports map); types exported next to their component's block in one generated barrel.

---

# Accessibility Hardening Plan

1. **Accordion (small):** `inert` (or delayed `visibility: hidden`) on closed content — fixes the Critical; then Up/Down/Home/End across headers.
2. **Select (medium):** CVA + keyboard completion (Home/End, typeahead, Tab-closes, Escape-on-trigger) + `aria-disabled` options + popover/top-layer positioning + `aria-invalid`/`aria-required` from `NgControl`.
3. **Dialog (small):** `cancel`/`close` event outputs + optional `dismissible` input + scroll-lock CSS + initial-focus docs; keep native `<dialog>` (the ADR holds).
4. **Forms (medium):** `NbField` wrapper generating ids + `aria-describedby` chain + `data-invalid` reflection; error/hint primitives.
5. **Motion (small):** reduced-motion rework (finding 3.2) + marquee pause.
6. **Regression net:** axe in component specs; keyboard APG specs per interactive component.
7. **Docs:** per-component a11y section stating the APG pattern followed and known limits.

CDK question: stay CDK-free for now — the ADR's reasoning holds, and native `<dialog>` + Popover API cover both overlays. Revisit only when building Tooltip/Menu/Popover, and then take CDK Overlay wholesale rather than hand-rolling positioning.

---

# Testing Plan (prioritized)

| Priority | What | Tool |
|---|---|---|
| P0 | Fix 3 stale specs + accordion lint error (release blocker per progress.md) | Vitest |
| P0 | Package smoke in CI: build → pack → install into scaffolded app → `ng build` + `ng add` | Nx + script (automate `tmp/ngb-smoke`) |
| P1 | axe pass on dialog/select/accordion/forms fixtures | vitest-axe |
| P1 | Keyboard APG specs for select/accordion/dialog | TestBed + KeyboardEvent |
| P1 | Precedence suite in real browser (input > CSS var > fallback, computed styles) | Vitest browser mode (Playwright) |
| P2 | Specs for the 8 uncovered components | Vitest |
| P2 | Public API guard on `index.d.ts` | API Extractor or checked-in rollup diff |
| P2 | SSR smoke (dialog/select/marquee prerender) | Angular SSR + Vitest |
| P3 | Visual regression on recipes/docs | Playwright screenshots |
| P3 | Token-customization e2e (scoped theme page renders overrides) | Playwright on docs app |

---

# Roadmap

**Phase 1 — must-fix before next release (days):**
fix stale specs + lint error · accordion `inert` fix (6.1) · dialog scroll-lock + `close` event · marquee reduced-motion pause · engines `|| ^24` · rename `neo-` ids · delete `@source` + escaped class from base.css · CI package-smoke job.

**Phase 2 — architecture cleanup (1–2 weeks):**
Tailwind → optional peer + "without Tailwind" docs · `body`/reset into `@layer base` · select outside-click gating (2.1) · `/tokens` + `/class` entry points · public API guard · schematics output assertion · repo hygiene (.DS_Store, tmp/).

**Phase 3 — token/theming redesign (2–3 weeks):**
route all tone.css literals through `--nb-tone-*-fg/-border` vars · split semantic vs palette tone tiers in docs/types · strip TS var fallbacks (or codegen from one token source) · add `--nb-motion-*`, wire `--nb-size-*` into control heights, delete dead tokens · reduced-motion rework · deprecate runtime theme-var provider (or move to SSR-safe style emission) · dark-mode decision (ship designed theme or remove `.dark` stub) · 2 theme presets.

**Phase 4 — accessibility + forms hardening (2–3 weeks):**
`NbSelect` CVA + full keyboard model + popover/top-layer listbox · accordion header navigation · `NbField` + error/hint primitives with `aria-describedby` wiring · axe + keyboard test suites · per-component Status badges.

**Phase 5 — documentation & adoption polish (1–2 weeks):**
port design-props + token-customization to public docs · generated token reference table · theming/dark-mode/SSR/forms/a11y guides · per-page CSS-variable tables · comparison & "when not to use" page · README recipe-wording fix.

**Phase 6 — long-term design-system maturity:**
missing table-stakes primitives (Tabs — already planned in v0.3 doc — Tooltip, Menu, Toast, Switch, Radio) on the native-first/popover strategy · density scale · visual regression suite · token codegen pipeline · consider CDK-backed `/overlay` entry point when Menu/Tooltip land · v1.0 per the CONTEXT.md contract (6 months stable + external usage signal).

---

# Final Verdict

**Is the current direction good?** Yes — unusually so. The CSS-first token contract, directive-on-native-element philosophy, and modern signals implementation form a coherent identity no other Angular library currently occupies.

**What should not be changed:** the single-slot input↔CSS-variable contract; `:where()` + `@layer` zero-specificity styling; `data-nb-tone` recipe architecture; directive-first native-element APIs; native `<dialog>`; copy-paste recipes; per-component CSS exports with the registry test; the design-prop vocabulary and archetype governance.

**What should be refactored before v1.0:** `NbSelect` (CVA + keyboard + positioning); the tone vocabulary split (palette vs semantic) and tone.css literals; the runtime theme provider; Tailwind as hard peer; the reduced-motion strategy; error-state form modeling; `'default'` enum values and the other §4.2 naming misfits — all exponentially more expensive after 1.0.

**What should be explicitly documented as design decisions:** inputs = design decisions, CSS vars = art direction, classes = layout (the mental model, publicly); "no responsive props, Tailwind owns layout"; native-first/no-CDK with the revisit trigger; recipes are copy-paste; the v0.x breaking-change contract; per-component maturity status.

**What would make it feel trustworthy next to famous libraries:** four things, in order — (1) a public theming guide + token reference proving the customization story (the content already exists internally); (2) forms that just work with `formControlName` across every control; (3) an axe-clean, keyboard-complete select/accordion/dialog trio with honest status badges; (4) a CI pipeline that packs and installs the real artifact before every release. Everything else is polish on top of an already-solid foundation.
