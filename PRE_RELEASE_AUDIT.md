# Pre-Release Audit — Findings

Static audit per [PRE_RELEASE_AUDIT_PLAN.md](PRE_RELEASE_AUDIT_PLAN.md). Library code (`libs/ui/**`) is treated as authoritative; every docs-vs-impl divergence is recorded with a *recommended* fix direction.

## Summary

- **Total findings:** 38
- **BLOCKING:** 4
- **HIGH:** 14
- **LOW:** 20

Severity legend:
- **BLOCKING** — consumer cannot use the lib correctly by copying from docs (broken selector, undocumented variant of an API surface, snippet that does not compile).
- **HIGH** — docs are wrong but consumer can recover by reading source.
- **LOW** — cosmetic (wrapper `<div>` omitted from a snippet, redundant attribute, stat tile slightly off).

---

## Foundation

### [BLOCKING] `NB_DENSITY` / `NbDensity` exported but completely unused

- **Where:** [libs/ui/src/index.ts:7-8](libs/ui/src/index.ts#L7-L8) re-exports `NB_DENSITY` and `NbDensity` from [libs/ui/src/lib/tokens/density.tokens.ts](libs/ui/src/lib/tokens/density.tokens.ts)
- **Docs claims:** No docs page mentions density at all. `installation.page.ts` does not surface it; `provideNgBrutalism` does not accept it; no component injects it.
- **Impl actually:** The injection token exists with a default factory (`'normal'`), but `grep -r NB_DENSITY` returns only the token definition and the re-export — zero consumers.
- **Recommended fix:** **fix-impl** — either remove the export (and the token file) until density is actually wired into a component, or wire it into `provideNgBrutalism`'s `NbConfig` and document it. Shipping a no-op public API at v0.1 sets a bad precedent.

### [HIGH] `libs/ui/README.md` is a stub

- **Where:** [libs/ui/README.md](libs/ui/README.md)
- **Docs claims:** `# ui\n\nThis library was generated with [Nx](https://nx.dev).`
- **Impl actually:** This is the README that npm consumers will see when they land on the package page. It contains no install, no usage, no link to the docs site.
- **Recommended fix:** **fix-docs** — write a real README before publishing (install command, single import example, link to docs site).

### [HIGH] `--nb-yellow`, `--nb-mint`, `--nb-pink`, `--nb-lavender` are docs-only tokens, used inside published code snippets

- **Where:** [apps/docs/src/styles.css:32-35](apps/docs/src/styles.css#L32-L35) defines them; [libs/ui/src/lib/styles/theme.css](libs/ui/src/lib/styles/theme.css) does not.
- **Docs claims:** Several "Template" snippets a consumer is meant to copy use these tokens (e.g. button page's `style="--nb-button-bg: var(--nb-yellow)"`, accordion's `--nb-accordion-trigger-bg: var(--nb-lavender)`, etc.).
- **Impl actually:** The library only ships `--nb-primary`, `--nb-secondary`, `--nb-accent`, `--nb-danger`, `--nb-success`, `--nb-warning`, plus `--nb-main`, `--nb-surface`, `--nb-field-bg`, etc. A consumer pasting these snippets gets unstyled (default) buttons because the referenced custom property is unset.
- **Recommended fix:** **fix-docs** — rewrite the snippets to use library-shipped tokens (e.g. `var(--nb-warning)` instead of `var(--nb-yellow)`), or **fix-impl** by adding the four palette tokens to `theme.css`. Pick one and apply consistently.

### [HIGH] `--nb-input-group-addon-bg` documented as `var(--nb-yellow)`

- **Where:** [apps/docs/src/app/docs/docs-tokens.ts:362](apps/docs/src/app/docs/docs-tokens.ts#L362) lists `--nb-input-group-addon-bg` default as `var(--nb-yellow)`.
- **Impl actually:** [libs/ui/src/lib/input-group/input-group-prefix.ts:22](libs/ui/src/lib/input-group/input-group-prefix.ts#L22) sets `[--nb-input-group-addon-bg:#ffd24a]` (a literal hex, not a token reference). Same in `input-group-suffix.ts:22`.
- **Recommended fix:** **fix-docs** — update the default column to `#ffd24a`. (Or pick a side: have the impl reference an existing token like `var(--nb-warning)` to dedupe.)

### [LOW] Duplicate dialog component export

- **Where:** [libs/ui/src/index.ts:50-58](libs/ui/src/index.ts#L50-L58)
- **Docs claims:** Imports use `NbDialog`.
- **Impl actually:** Both `NbDialog` (alias) and `NbDialogComponent` are exported. The dialog docs page itself shows only `NbDialog` in imports — `NbDialogComponent` is part of the public surface but not documented.
- **Recommended fix:** **fix-impl** — drop the `NbDialogComponent` re-export; the alias `NbDialog` is the documented name. Same pattern is already collapsed for `NbAccordion`, `NbCard`, etc.

### [LOW] Select exposes both `NbSelect` (directive) and `NbSelectComponent` — name collision risk

- **Where:** [libs/ui/src/index.ts:45](libs/ui/src/index.ts#L45) exports `NbSelect, NbSelectComponent, NbSelectOption`.
- **Docs claims:** `select.page.ts` imports both and only the dialog page's "Native Select" section uses `NbSelect` (the `select[nbSelect]` directive). All other examples on the page use `<nb-select>` which is `NbSelectComponent`.
- **Impl actually:** `NbSelect` is a directive on the native `<select>` element; `NbSelectComponent` is a full custom listbox component. Two unrelated components share a confusing name.
- **Recommended fix:** **fix-impl** — rename one of them before v0.1 (e.g. `NbNativeSelect` for the directive). Renaming after publish is breaking.

---

## Installation / Introduction / README (Category 5)

### [LOW] Installation page does not mention the CSS entry points

- **Where:** [apps/docs/src/app/pages/docs/installation.page.ts](apps/docs/src/app/pages/docs/installation.page.ts) shows install + provider + usage, but no CSS import.
- **Impl actually:** [libs/ui/package.json:20-27](libs/ui/package.json#L20-L27) ships `@ng-brutalism/ui/styles.css` and `@ng-brutalism/ui/theme.css` as subpath exports. Without one of them imported, every component renders without theme tokens.
- **Recommended fix:** **fix-docs** — add a "Styles" step that says `@import '@ng-brutalism/ui/styles.css';` (or wire it via `styles` array in `angular.json`).

### [LOW] Installation page does not mention Tailwind dependency

- **Where:** [apps/docs/src/app/pages/docs/installation.page.ts](apps/docs/src/app/pages/docs/installation.page.ts)
- **Impl actually:** Every component is composed from Tailwind utilities via `nbClass`. The library will not render correctly in a project without Tailwind v4 set up.
- **Recommended fix:** **fix-docs** — call out Tailwind v4 as a setup prerequisite, or **fix-impl** by shipping a compiled CSS sheet that doesn't require Tailwind at consumption time.

### [LOW] `provideNgBrutalism` only customises theme tokens — docs imply more

- **Where:** [apps/docs/src/app/pages/docs/installation.page.ts:28-34](apps/docs/src/app/pages/docs/installation.page.ts#L28-L34): "Register the provider once if you want to customize the global theme tokens from Angular configuration."
- **Impl actually:** [libs/ui/src/lib/core/provide.ts:37-39](libs/ui/src/lib/core/provide.ts#L37-L39) — `NbConfig` only has `theme?: NbThemeConfig`. There is no other configuration surface. The provider is essentially optional.
- **Recommended fix:** **fix-docs** — explicitly state the provider is optional (you only need it if you customise tokens). Mention CSS-variable overrides as the simpler alternative.

### [LOW] Introduction page only links to two components

- **Where:** [apps/docs/src/app/pages/docs/introduction.page.ts:29-46](apps/docs/src/app/pages/docs/introduction.page.ts#L29-L46) — only Accordion and Button.
- **Impl actually:** 16 components shipped.
- **Recommended fix:** **fix-docs** — either link all 16 or rename the section to something narrower ("Highlights"). The current `<h2>Components</h2>` is misleading.

---

## accordion

### [LOW] Stat tile "4 Parts" — but no Trigger/Content sub-API documented

- **Where:** [apps/docs/src/app/pages/components/accordion.page.ts:42-45](apps/docs/src/app/pages/components/accordion.page.ts#L42-L45)
- **Docs claims:** 4 Parts (Accordion, Item, Trigger, Content) — counts correctly.
- **Impl actually:** Accordion + Item are documented in the API table. Trigger and Content are not — they have no public inputs, but they ARE separate selectors a consumer must know about. Cardinality is right but the table is incomplete.
- **Recommended fix:** **fix-docs** — add a "Parts" / "Selectors" subsection (or 2 more rows to the API table) listing `nb-accordion-trigger` and `nb-accordion-content` with a one-line description even though they have no inputs. Same pattern card.page.ts and dialog.page.ts use.

### [LOW] Controlled example snippet drops live demo wrapper div + flex toolbar

- **Where:** [apps/docs/src/app/pages/components/accordion.page.ts:127-184](apps/docs/src/app/pages/components/accordion.page.ts#L127-L184) (live) vs `controlledExampleTemplateCode` (snippet)
- The snippet matches modulo whitespace ✓ — but note `--nb-button-bg: var(--nb-pink|mint|yellow)` are docs-only tokens (see Foundation finding above).

---

## avatar

### [HIGH] Default example: live demo has `class="h-20 w-20"`, snippet does not

- **Where:** [apps/docs/src/app/pages/components/avatar.page.ts:45](apps/docs/src/app/pages/components/avatar.page.ts#L45) (live) vs [line 98](apps/docs/src/app/pages/components/avatar.page.ts#L98) (snippet)
- **Docs claims (live):** `<nb-avatar class="h-20 w-20" src="..." alt="khangtrannn" />`
- **Docs claims (snippet):** `<nb-avatar src="..." alt="khangtrannn" />`
- **Impl actually:** Avatar host is `h-10 w-10` — without the override, the preview would render at half the documented size. A user copying the snippet gets a 40×40 avatar where the docs preview showed 80×80.
- **Recommended fix:** **fix-docs** — add `class="h-20 w-20"` to the snippet.

### [LOW] `sizesExampleCode` defined on the class but never rendered

- **Where:** [apps/docs/src/app/pages/components/avatar.page.ts:104-106](apps/docs/src/app/pages/components/avatar.page.ts#L104-L106)
- **Impl actually:** There is no `Sizes` section on the page. Dead code.
- **Recommended fix:** **fix-docs** — either add the section that consumes it, or delete the property.

---

## badge

### [LOW] Variants snippet omits `<div class="flex flex-wrap items-center gap-3">` wrapper

- **Where:** [apps/docs/src/app/pages/components/badge.page.ts:57-65](apps/docs/src/app/pages/components/badge.page.ts#L57-L65) (live) vs [line 105-109](apps/docs/src/app/pages/components/badge.page.ts#L105-L109) (snippet)
- **Recommended fix:** **fix-docs** — wrap the snippet too. (Or fix the demo to drop the flex wrapper — but then the badges stack vertically in the preview.)

---

## button

### [HIGH] Stat tile claims "8 Variants" and "4 Sizes" but page has no Variants / Sizes section

- **Where:** [apps/docs/src/app/pages/components/button.page.ts:39-50](apps/docs/src/app/pages/components/button.page.ts#L39-L50)
- **Docs claims:** Stat tiles "8 Variants", "4 Sizes", "4 Inputs". The API table later confirms all 8 variants and all 4 sizes.
- **Impl actually:** All 8 variants and 4 sizes exist in `NbButtonVariant` / `NbButtonSize`. But no section on the page shows them. Sibling pages (badge, checkbox, input) all have a Variants/Sizes preview. Two unused properties on the class (`variantsExampleCode`, `sizesExampleCode`) suggest they were intentionally removed but never re-added.
- **Recommended fix:** **fix-docs** — add a Variants section and a Sizes section that consume the existing `variantsExampleCode` / `sizesExampleCode` properties, mirroring the checkbox page.

### [LOW] Class-level `providerCode`, `variantsExampleCode`, `sizesExampleCode` are never rendered

- **Where:** [apps/docs/src/app/pages/components/button.page.ts:253-268](apps/docs/src/app/pages/components/button.page.ts#L253-L268)
- **Recommended fix:** **fix-docs** — wire them into sections (see prior finding) or delete.

### [LOW] Full-width / Disabled / Anchor snippets omit live-demo wrapper divs

- **Where:** [apps/docs/src/app/pages/components/button.page.ts:84-148](apps/docs/src/app/pages/components/button.page.ts#L84-L148)
- **Docs claims (live):** wraps each example in `<div class="w-full max-w-md">` or `<div class="flex flex-wrap items-center justify-center gap-4">`.
- **Docs claims (snippet):** raw button(s) only.
- **Recommended fix:** **fix-docs** — wrap snippets to match, or strip wrappers from the live demos.

---

## card

### [BLOCKING] Sub-parts table uses wrong selector prefix (`neo-` instead of `nb-`)

- **Where:** [apps/docs/src/app/pages/components/card.page.ts:106-176](apps/docs/src/app/pages/components/card.page.ts#L106-L176)
- **Docs claims:** Selectors listed as `neo-card`, `neo-card-header`, `neo-card-title`, `neo-card-description`, `neo-card-action`, `neo-card-content`, `neo-card-footer`.
- **Impl actually:** Selectors are `nb-card`, `nb-card-header`, `nb-card-title`, `nb-card-description`, `nb-card-action`, `nb-card-content`, `nb-card-footer` (see [libs/ui/src/lib/card/card.ts](libs/ui/src/lib/card/card.ts)). The `templateCode` snippet on the same page uses the correct `nb-card` prefix. A consumer who scrolls to the API table and copies a selector from there will produce a template that does not compile.
- **Recommended fix:** **fix-docs** — replace every `neo-card*` with `nb-card*` in the table.

### [HIGH] Stat tile "6 Parts" but prose + table list 7

- **Where:** [apps/docs/src/app/pages/components/card.page.ts:46-49](apps/docs/src/app/pages/components/card.page.ts#L46-L49) (stat tile) vs [line 83-87](apps/docs/src/app/pages/components/card.page.ts#L83-L87) ("composed of 7 sub-parts") and the 7-row table.
- **Impl actually:** 7 components are exported (`NbCard`, `NbCardHeader`, `NbCardTitle`, `NbCardDescription`, `NbCardAction`, `NbCardContent`, `NbCardFooter`).
- **Recommended fix:** **fix-docs** — change stat tile value to `7`.

### [HIGH] `NbCardAction` not imported on the page; preview never demonstrates the action slot

- **Where:** [apps/docs/src/app/pages/components/card.page.ts:19-33](apps/docs/src/app/pages/components/card.page.ts#L19-L33) — `imports` does not include `NbCardAction`. The preview just renders `<docs-job-listing-card-example />` which doesn't use it either.
- **Impl actually:** `NbCardAction` is exported from `@ng-brutalism/ui` and has a non-trivial behaviour (`has-[[data-slot=card-action]]:grid-cols-[1fr_auto]` in `NbCardHeader`).
- **Recommended fix:** **fix-docs** — add a section that demonstrates `<nb-card-action>`, otherwise consumers won't discover it works.

### [LOW] "Preview" code block shows TS component code, not a template

- **Where:** [apps/docs/src/app/pages/components/card.page.ts:67-69](apps/docs/src/app/pages/components/card.page.ts#L67-L69)
- **Docs claims:** `<docs-example [code]="jobListingExampleCode">` where `jobListingExampleCode` is the *TypeScript* of how to import the example component (`import JobListingCardExampleComponent ...`).
- **Impl actually:** Every other page uses the `[code]` slot to hold an *Angular template* that mirrors the live demo. Here it holds a TS snippet referencing a non-public path `./examples/job-listing-card`.
- **Recommended fix:** **fix-docs** — inline the actual card template that the job-listing example renders, so the Preview's Code tab matches the Preview's rendered output. (Or split into "Composition example" and link out.)

### [LOW] Unused `simpleExampleCode` property

- **Where:** [apps/docs/src/app/pages/components/card.page.ts:222-238](apps/docs/src/app/pages/components/card.page.ts#L222-L238)
- **Recommended fix:** **fix-docs** — wire into a Simple Example section or delete.

---

## checkbox

### [LOW] "Sizes" and "Disabled" snippets omit wrapping flex div

- **Where:** [apps/docs/src/app/pages/components/checkbox.page.ts:66-83](apps/docs/src/app/pages/components/checkbox.page.ts#L66-L83) (live demos wrap; snippets [148-153](apps/docs/src/app/pages/components/checkbox.page.ts#L148-L153) don't)
- **Recommended fix:** **fix-docs** — add the wrapper or drop it from the demo.

---

## dialog

### [LOW] Preview's `[code]` is the full inline contact-us template, not what the demo renders

- **Where:** [apps/docs/src/app/pages/components/dialog.page.ts:52-56](apps/docs/src/app/pages/components/dialog.page.ts#L52-L56) — live demo is `<contact-us-dialog />`, a Composite example component. The snippet is a 150-line standalone template containing the same markup.
- **Impl actually:** The Composite component in `examples/contact-us-dialog` is not part of the public surface; users can copy the snippet though, so this is fine.
- **Recommended fix:** **none, accept** — snippet is meant to be a copy-paste recipe of the Composite. Worth a one-line note above the Preview saying "copy the snippet, it's self-contained" so consumers know they don't need the `contact-us-dialog` component.

### [LOW] `importCode` lists symbols not used in the snippet

- **Where:** [apps/docs/src/app/pages/components/dialog.page.ts:164-179](apps/docs/src/app/pages/components/dialog.page.ts#L164-L179)
- **Docs claims:** Imports `NbDialog, NbDialogTitle, NbDialogDescription, NbDialogContent, NbDialogActions, NbDialogClose, NbTitle, NbInput, NbInputGroup, NbInputPrefix, NbLabel, NbSelectComponent, NbSelectOption, NbTextarea`.
- **Impl actually:** All identifiers ARE exported, but the snippet also uses `nbButton` (`NbButton`), which is **missing** from the imports. A consumer following the import list will get a compile error on `<button nbButton>`.
- **Recommended fix:** **fix-docs** — add `NbButton` to the import list.

---

## image-card

### [HIGH] Stat tile "2 Inputs" but the component has 3 inputs

- **Where:** [apps/docs/src/app/pages/components/image-card.page.ts:30-32](apps/docs/src/app/pages/components/image-card.page.ts#L30-L32)
- **Docs claims:** "2 Inputs"
- **Impl actually:** [libs/ui/src/lib/image-card/image-card.ts:34-36](libs/ui/src/lib/image-card/image-card.ts#L34-L36) — `image`, `alt`, `caption` (3 inputs). The page's own API table correctly lists all 3.
- **Recommended fix:** **fix-docs** — stat tile value to `3`.

### [LOW] Default & image-only snippets use literal `...` placeholder URL while live demos use a real URL

- **Where:** [apps/docs/src/app/pages/components/image-card.page.ts:180-191](apps/docs/src/app/pages/components/image-card.page.ts#L180-L191)
- **Docs claims (snippet):** `image="https://hips.hearstapps.com/.../flowers.jpg"` — `...` is literal text, not an ellipsis CSS-renders.
- **Impl actually:** Live demo uses `[image]="previewImage"` which resolves to the full URL.
- **Recommended fix:** **fix-docs** — either match snippet to demo, or use a `[image]="imageUrl"` placeholder binding so the truncation is obviously a binding stub.

---

## input

### [HIGH] "With Button" snippet references `--nb-yellow` (docs-only token)

- **Where:** [apps/docs/src/app/pages/components/input.page.ts:186-189](apps/docs/src/app/pages/components/input.page.ts#L186-L189)
- **Docs claims:** `style="--nb-button-bg: var(--nb-yellow)"` — copy-pasted as-is by a consumer, this resolves to nothing because `--nb-yellow` is not defined in `libs/ui/src/lib/styles/theme.css`.
- **Recommended fix:** **fix-docs** — same as the global Foundation finding; either swap to `var(--nb-warning)` or define the palette tokens in the lib.

### [LOW] "Sizes" snippet omits wrapping `<div class="flex flex-col items-center gap-4">`

- **Where:** [apps/docs/src/app/pages/components/input.page.ts:71-77](apps/docs/src/app/pages/components/input.page.ts#L71-L77) (live) vs [175-177](apps/docs/src/app/pages/components/input.page.ts#L175-L177) (snippet)
- **Recommended fix:** **fix-docs** — wrap snippet or drop wrapper.

---

## input-group

### [HIGH] `NB_INPUT_GROUP`, `NB_INPUT_PREFIX`, `NB_INPUT_SUFFIX`, `NbInputGroupContext` exported by sub-barrel but NOT by root index

- **Where:** [libs/ui/src/lib/input-group/index.ts:6-11](libs/ui/src/lib/input-group/index.ts#L6-L11) re-exports the tokens; [libs/ui/src/index.ts](libs/ui/src/index.ts) does not.
- **Impl actually:** These tokens are used internally by `NbInput`, `NbTextarea`, `NbSelect`, `NbSelectComponent` to detect when they're inside a group. They are not stable enough or documented enough to expose, but the sub-barrel makes them reachable via deep import.
- **Recommended fix:** **fix-impl** — drop `NB_INPUT_GROUP, NB_INPUT_PREFIX, NB_INPUT_SUFFIX, NbInputGroupContext` from the input-group barrel (move to a `*.internal.ts`). Otherwise either document them or expect external consumers to depend on them.

### [LOW] "With Label" snippet omits the prefix's `class="text-[0.8rem]"`

- **Where:** [apps/docs/src/app/pages/components/input-group.page.ts:94-98](apps/docs/src/app/pages/components/input-group.page.ts#L94-L98) (live: `<span nbInputPrefix class="text-[0.8rem]">https</span>`) vs [181-186](apps/docs/src/app/pages/components/input-group.page.ts#L181-L186) (snippet drops the class)
- **Impl actually:** Without the smaller text, "https" wraps badly inside the fixed-width 3rem prefix slot.
- **Recommended fix:** **fix-docs** — add the class to the snippet.

### [LOW] Default snippet uses `@` while live demo uses `&#64;`

- **Where:** [apps/docs/src/app/pages/components/input-group.page.ts:66](apps/docs/src/app/pages/components/input-group.page.ts#L66) vs [167-170](apps/docs/src/app/pages/components/input-group.page.ts#L167-L170)
- **Impl actually:** Renders identically. Only a cosmetic source difference.
- **Recommended fix:** **fix-docs** — pick one (prefer literal `@`).

---

## label

### [LOW] Default snippet uses `id="terms"` while live demo uses `id="terms-preview"`

- **Where:** [apps/docs/src/app/pages/components/label.page.ts:55-56](apps/docs/src/app/pages/components/label.page.ts#L55-L56) (live) vs [135-138](apps/docs/src/app/pages/components/label.page.ts#L135-L138) (snippet)
- **Impl actually:** The live demo intentionally uses `terms-preview` to avoid an `id` collision with the checkbox docs page (which already uses `terms`). The snippet shows the cleaner `terms` — but if a consumer copies it onto a page that already has a `terms` id, they get duplicate-ID a11y warnings.
- **Recommended fix:** **fix-docs** — match snippet to live (`id="terms-preview"`) or pick a generic name like `id="accept-terms"` in both.

---

## marquee

### [LOW] Default snippet refers to `skills` while live demo uses `portfolioSkills`

- **Where:** [apps/docs/src/app/pages/components/marquee.page.ts:62](apps/docs/src/app/pages/components/marquee.page.ts#L62) (live: `@for (skill of portfolioSkills; ...)`) vs [289](apps/docs/src/app/pages/components/marquee.page.ts#L289) (snippet: `@for (skill of skills; ...)`)
- **Impl actually:** The class-level component code snippet ([260-286](apps/docs/src/app/pages/components/marquee.page.ts#L260-L286)) does declare `skills`, so the snippet IS internally consistent — it documents a different variable name from the live demo. Plan says "exactly modulo whitespace" — this is a variable-name divergence.
- **Recommended fix:** **fix-docs** — rename live demo's array to `skills` for consistency, since the snippet defines that name.

### [LOW] "Custom speed" section snippet shows no custom speed (same as default)

- **Where:** [apps/docs/src/app/pages/components/marquee.page.ts:125](apps/docs/src/app/pages/components/marquee.page.ts#L125)
- **Docs claims:** `customSpeedExampleCode = this.defaultExampleTemplateCode` — identical to the default.
- **Impl actually:** Live demo also uses `duration="10s"` (which is a slowdown vs the default `5s`, so it IS technically a custom speed) — but visually indistinguishable from the Preview section above. Section conveys no information.
- **Recommended fix:** **fix-docs** — make the Custom speed demo actually slower or faster than the default (e.g. `duration="20s"`) and update the snippet.

### [LOW] "Pause on hover" demo sets `[pauseOnHover]="true"` redundantly

- **Where:** [apps/docs/src/app/pages/components/marquee.page.ts:154](apps/docs/src/app/pages/components/marquee.page.ts#L154)
- **Impl actually:** [libs/ui/src/lib/marquee/marquee.ts:108](libs/ui/src/lib/marquee/marquee.ts#L108) — `pauseOnHover` defaults to `true`. The example does not demonstrate the difference vs the default.
- **Recommended fix:** **fix-docs** — flip default to `false` (impl) and have this section show the opt-in, OR rename the section to "Disable pause" and show `[pauseOnHover]="false"`.

---

## select

### [BLOCKING] API table only documents `NbSelectComponent`; `NbSelect` (directive) inputs are missing

- **Where:** [apps/docs/src/app/pages/components/select.page.ts:249-360](apps/docs/src/app/pages/components/select.page.ts#L249-L360)
- **Docs claims:** API documents `placeholder`, `defaultValue`, `value`, `disabled`, `defaultOpen`, `aria-label`, `aria-labelledby` (these are `NbSelectComponent` inputs only).
- **Impl actually:** The page also documents a "Native Select" section using `<select nbSelect>` which is a separate directive ([libs/ui/src/lib/select/select.directive.ts:15](libs/ui/src/lib/select/select.directive.ts#L15)). That directive has a `size: NbSelectSize` input that's nowhere on the page.
- **Recommended fix:** **fix-docs** — split the API into two tables: `<nb-select>` (component) vs `select[nbSelect]` (directive). Document `size` on the directive even though it currently has only one value.

### [HIGH] `NbSelectSize` type contains only `'default'` — exported as a stub

- **Where:** [libs/ui/src/lib/select/select.types.ts:5](libs/ui/src/lib/select/select.types.ts#L5)
- **Impl actually:** `export type NbSelectSize = 'default';` — a one-value type, exported as public API.
- **Recommended fix:** **fix-impl** — either add real sizes (`sm`, `lg`) to match the other field directives, or drop the input + type entirely. Shipping a single-value type union signals an incomplete API.

### [HIGH] Default snippet shows 2 options; live demo shows 4

- **Where:** [apps/docs/src/app/pages/components/select.page.ts:67-99](apps/docs/src/app/pages/components/select.page.ts#L67-L99) (live, 4 options) vs [366-383](apps/docs/src/app/pages/components/select.page.ts#L366-L383) (snippet, 2 options with truncated SVGs)
- **Recommended fix:** **fix-docs** — match snippet to the 4-option live demo, or trim live to match.

### [HIGH] "Option Content" snippet shows 3 options; live demo shows 7 + an extra placeholder option

- **Where:** [apps/docs/src/app/pages/components/select.page.ts:163-218](apps/docs/src/app/pages/components/select.page.ts#L163-L218) (live) vs [424-438](apps/docs/src/app/pages/components/select.page.ts#L424-L438) (snippet)
- **Recommended fix:** **fix-docs** — trim live demo to 3 (snippet's count) or expand snippet.

### [LOW] "With Prefix" snippet uses `w-80`; live demo uses `w-90`

- **Where:** [apps/docs/src/app/pages/components/select.page.ts:128-156](apps/docs/src/app/pages/components/select.page.ts#L128-L156) (live wraps in `w-90`) vs [396-422](apps/docs/src/app/pages/components/select.page.ts#L396-L422) (snippet wraps in `w-80`)
- **Recommended fix:** **fix-docs** — pick one width.

---

## textarea

### [LOW] Only 2 stat tiles (other components have 3)

- **Where:** [apps/docs/src/app/pages/components/textarea.page.ts:32-43](apps/docs/src/app/pages/components/textarea.page.ts#L32-L43) — Yellow "3 Sizes" + Mint "Native". No third tile.
- **Recommended fix:** **fix-docs** — add a third tile for visual consistency with input/select/checkbox pages, or remove the third tile from those pages.

### [LOW] "Sizes" snippet omits wrapping `<div class="flex flex-col items-center gap-4">`

- **Where:** [apps/docs/src/app/pages/components/textarea.page.ts:62-68](apps/docs/src/app/pages/components/textarea.page.ts#L62-L68) (live) vs [123-125](apps/docs/src/app/pages/components/textarea.page.ts#L123-L125) (snippet)
- **Recommended fix:** **fix-docs** — wrap or unwrap consistently.

---

## title

### [HIGH] Stat tile "3 Wave tokens" but `docs-tokens` lists 4

- **Where:** [apps/docs/src/app/pages/components/title.page.ts:34-35](apps/docs/src/app/pages/components/title.page.ts#L34-L35) ("3 Wave tokens") vs [apps/docs/src/app/docs/docs-tokens.ts:563-584](apps/docs/src/app/docs/docs-tokens.ts#L563-L584) (4 tokens: `--nb-title-wave-width`, `--nb-title-wave-height`, `--nb-title-wave-gap`, `--nb-title-wave-color`)
- **Impl actually:** [libs/ui/src/lib/styles/styles.css:33-44](libs/ui/src/lib/styles/styles.css#L33-L44) — all four tokens are referenced by the pseudo-element.
- **Recommended fix:** **fix-docs** — update stat tile value to `4`.

---

## Cross-check: index.ts exports vs docs presence

| Public export | Has docs page / section | Notes |
|---|---|---|
| `nbClass` | NO | Documented inline at usage sites; consider an "Utilities" subsection on the introduction page. **LOW** |
| `provideNgBrutalism` | YES (installation) | ✓ |
| `NbConfig` | NO (type only) | Acceptable — surfaced via `provideNgBrutalism`. |
| `NB_THEME_CONFIG` / `NbThemeConfig` | YES (installation + docs-tokens theme) | ✓ |
| `NB_DENSITY` / `NbDensity` | **NO** | See Foundation BLOCKING above. |
| All component classes | YES (one page each) | ✓ |
| `NbSelectSize` | Surface-only, see Select HIGH | Stub type. |
| `NbDialogComponent` | Surface-only | Duplicate of `NbDialog`, see Foundation LOW. |
| Sub-barrel `NB_INPUT_GROUP` etc. | NO | See Input-Group HIGH. |

---

## What this audit deliberately did NOT do

- It did not change any file.
- It did not run the dev server or verify visual rendering — every finding is from static reading.
- It did not deep-audit the `examples/*` composite demo components except where their public API claims affected a docs page.
- It did not assess test coverage or styling polish.
