# CSS Co-location Audit

Original Phase 0 audit of `libs/ui/src/lib/styles/styles.css` (932 lines) ahead
of moving directive/component CSS into sibling files. Implementation has now
completed Phase 1, Phase 2, and the simple Phase 4 sibling-CSS pass.

## Summary

- **Global blocks kept:** theme import, `@source`, box-sizing reset, `body` defaults, layering comment (`styles.css:1–22`).
- **Directive sibling CSS candidates (Phase 1 scope):** `nbButton`/`nbButtonTrailingIcon`, `nbIconButton`, `nbSurface`, `nbStack`, `nbCluster`, `nbSplit`, `nbTextarea`.
- **Directive sibling CSS candidates (Phase 2 scope):** `nbInput`, `nbInputGroup`/`nbInputPrefix`/`nbInputSuffix`, native `select[nbSelect]`.
- **Component-local style candidates:** none confirmed yet for Phase 1 scope — `nbIconButton` is technically a `@Component` but its rules target projected content (`svg` via `<ng-content>`), so emulated encapsulation would not match; keep it in a sibling CSS file (see Risks).
- **Public utilities kept:** `[data-nb-reset-margin]`, the shared `nbDisplay`/`nbText` underline rules, `.nb-focus-visible:focus-visible`.
- **Phase 4 sibling CSS moved:** `nbBadge`, `nbAvatar`, `nbChip`, `nb-card`, `nb-image-card`, `nbMediaFrame`, `nbCallout`.
- **Deferred complex blocks:** dialog parts (`[data-slot="dialog-*"]`, `dialog[data-nb-dialog]`, backdrop), checkbox checked-icon, custom `nb-select` shell, `nb-title` underline, `data-nb-media-item`, `data-nb-section`, `label[nbLabel]`.
- **Stale block kept:** `.focus-visible\:outline-\[var\(--nb-focus-ring\)\]` still appears unused anywhere in the workspace, but remains in `styles.css` because it may be accidental public API.

## Proposed structure

```txt
libs/ui/src/lib/styles/styles.css
libs/ui/src/lib/button/nb-button.css
libs/ui/src/lib/icon-button/nb-icon-button.css
libs/ui/src/lib/badge/nb-badge.css
libs/ui/src/lib/avatar/nb-avatar.css
libs/ui/src/lib/chip/nb-chip.css
libs/ui/src/lib/card/nb-card.css
libs/ui/src/lib/image-card/nb-image-card.css
libs/ui/src/lib/media-frame/nb-media-frame.css
libs/ui/src/lib/surface/nb-surface.css
libs/ui/src/lib/stack/nb-stack.css
libs/ui/src/lib/cluster/nb-cluster.css
libs/ui/src/lib/split/nb-split.css
libs/ui/src/lib/callout/nb-callout.css
libs/ui/src/lib/textarea/nb-textarea.css
libs/ui/src/lib/input/nb-input.css
libs/ui/src/lib/input/nb-input-group.css
libs/ui/src/lib/select/nb-native-select.css
```

## Classification table

| Current selector/block | Lines | Classification | Target location | Notes |
| --- | --- | --- | --- | --- |
| `@import './theme.css'`, `@source`, comment header | 1–4 | GLOBAL_KEEP | `styles.css` | Entry-point imports |
| `*, *::before, *::after { box-sizing }` | 6–10 | GLOBAL_KEEP | `styles.css` | Global reset |
| `body { ... }` | 12–17 | GLOBAL_KEEP | `styles.css` | Global base |
| Layering explanation comment | 19–22 | GLOBAL_KEEP | `styles.css` | Explains `@layer` ordering |
| `[data-nb-reset-margin]` | 25–27 | PUBLIC_UTILITY_KEEP | `styles.css` | Shared consumer-facing reset attr |
| `[data-slot="dialog-title"]` | 29–35 | DEFER_COMPLEX | — | Dialog content part, anatomy-driven |
| `[data-nb-title][data-underline]::after` | 37–48 | DEFER_COMPLEX | — | Belongs to `nbTitle` directive — out of this plan's primitive list; revisit alongside `nbDisplay`/`nbText`/`nbTitle` later |
| `[data-nb-display][data-underline], [data-nb-text][data-underline]` (+ `bar`/`wave` variants) | 50–85 | PUBLIC_UTILITY_KEEP | `styles.css` | Shared underline renderer explicitly named as a `PUBLIC_UTILITY_KEEP` example in the plan |
| `[data-slot="dialog-description"]` | 87–93 | DEFER_COMPLEX | — | Dialog content part |
| `[data-slot="dialog-content"]` | 95–102 | DEFER_COMPLEX | — | Dialog content part |
| `[data-slot="dialog-actions"]` | 104–111 | DEFER_COMPLEX | — | Dialog content part |
| `[data-nb-title]` | 115–124 | DEFER_COMPLEX | — | `nbTitle` directive, out of scope |
| `:where(button[nbButton], a[nbButton])` base + svg + focus + disabled + `data-press` + `data-size` + `data-full-width` | 126–206 | DIRECTIVE_SIBLING_CSS | `button/nb-button.css` | Matches Phase 1 mapping exactly |
| `:where([nbButtonTrailingIcon])` + `[data-push]` + `[data-size]` | 208–222 | DIRECTIVE_SIBLING_CSS | `button/nb-button.css` | `NbButtonTrailingIcon` directive lives in `button/` — co-locate with button |
| `:where(button[nbIconButton])` base + svg + hover + focus + disabled + `data-shape` + `data-size` (sm/md/lg/xl incl. svg) | 224–302 | DIRECTIVE_SIBLING_CSS | `icon-button/nb-icon-button.css` | `NbIconButton` is technically `@Component` (selector `button[nbIconButton]`) — see Risks for why sibling CSS (not component-local `styles`) is still correct |
| `:where(span[nbBadge])` | 304–312 | DIRECTIVE_SIBLING_CSS | `badge/nb-badge.css` | Phase 4 moved |
| `:where(nb-avatar)` | 314–322 | COMPONENT_SIBLING_CSS | `avatar/nb-avatar.css` | Phase 4 moved as sibling CSS, not component-local `styles` |
| `:where(span[nbChip])` | 324–332 | COMPONENT_SIBLING_CSS | `chip/nb-chip.css` | Phase 4 moved as sibling CSS, not component-local `styles` |
| `:where(nb-card)` | 334–345 | COMPONENT_SIBLING_CSS | `card/nb-card.css` | Phase 4 moved as sibling CSS, not component-local `styles` |
| `:where(nb-image-card)` | 347–358 | COMPONENT_SIBLING_CSS | `image-card/nb-image-card.css` | Phase 4 moved as sibling CSS, not component-local `styles` |
| `:where([nbMediaFrame])` | 360–368 | DIRECTIVE_SIBLING_CSS | `media-frame/nb-media-frame.css` | Phase 4 moved |
| `:where([nbSurface])` base + `[data-clip]` + `[data-size]` (sm/md/lg/xl) + `[data-layout]` + `[data-edge]` | 370–429 | DIRECTIVE_SIBLING_CSS | `surface/nb-surface.css` | Matches Phase 1 mapping |
| `[data-nb-section]` | 431–433 | DEFER_COMPLEX | — | `NbSection` directive, not in this plan's primitive list |
| `:where([data-nb-stack])` base + `[data-align]` + `[data-justify]` + `[data-separator]` (solid/dashed/thick) | 435–470 | DIRECTIVE_SIBLING_CSS | `stack/nb-stack.css` | Matches Phase 1 mapping |
| `:where([data-nb-cluster])` base + `[data-align]` + `[data-justify]` + `[data-wrap]` + `[data-separator]` | 472–512 | DIRECTIVE_SIBLING_CSS | `cluster/nb-cluster.css` | Matches Phase 1 mapping |
| `:where([data-nb-split])` base + `[data-align]` + `[data-ratio]` (×7) + `[data-collapse]` + separator `::after` rules + collapse media queries | 514–623 | DIRECTIVE_SIBLING_CSS | `split/nb-split.css` | Matches Phase 1 mapping; largest single block to move (~110 lines incl. 3 `@media` queries) |
| `[data-nb-media-item][data-variant="boxed"\|"chip"]` | 625–629 | DEFER_COMPLEX | — | `NbMediaItem` directive, out of scope |
| `:where([nbCallout])` | 631–637 | DIRECTIVE_SIBLING_CSS | `callout/nb-callout.css` | Phase 4 moved |
| `:where(input[nbInput])` base (bg/fg/border/radius/shadow) | 639–650 | DIRECTIVE_SIBLING_CSS | `input/nb-input.css` | Phase 2 scope |
| `:where(textarea[nbTextarea])` base (bg/fg/border/radius/shadow) | 652–663 | DIRECTIVE_SIBLING_CSS | `textarea/nb-textarea.css` | Phase 1 scope — note this base rule is interleaved with `nb-select`/`dialog` blocks; must be combined with the size-variant rules at 854–897 when migrating |
| `:where(nb-select)` base (bg/fg/border) | 665–671 | DEFER_COMPLEX | — | Custom `NbSelect` `@Component` shell — explicitly excluded from Phase 2 (only native `select[nbSelect]` migrates) |
| `:where(dialog[data-nb-dialog])` | 673–681 | DEFER_COMPLEX | — | Dialog primitive |
| `:where(input[nbInput])` size variants (`data-size` sm/lg) + `[type="file"]` + `::file-selector-button` (short form) | 683–706 | DIRECTIVE_SIBLING_CSS | `input/nb-input.css` | Phase 2 — **note:** `::file-selector-button` is set here (704–706, only `font-family`/`background-color`) and again fully at 717–730; consolidate into one rule when migrating, do not duplicate |
| `:where(input[nbInput])` display/font-weight | 708–711 | DIRECTIVE_SIBLING_CSS | `input/nb-input.css` | Duplicate selector split from base block at 639 — consolidate on move |
| `::placeholder`, `::file-selector-button` (full), `:disabled`, `[data-in-group]`, `:not([data-in-group]):focus-visible` | 713–750 | DIRECTIVE_SIBLING_CSS | `input/nb-input.css` | Phase 2 |
| `:where(nb-input-group)` base + `:focus-within` | 752–768 | DIRECTIVE_SIBLING_CSS | `input/nb-input-group.css` | Phase 2 — `NbInputGroup` is a `@Component`; plan explicitly calls for a sibling file here rather than component-local styles |
| `:where([nbInputPrefix])`, `:where([nbInputSuffix])` + `[data-align='stretch']` | 770–799 | DIRECTIVE_SIBLING_CSS | `input/nb-input-group.css` | Phase 2 |
| `:where(select[nbSelect])` base (incl. bg-image chevron) | 801–821 | DIRECTIVE_SIBLING_CSS | `select/nb-native-select.css` | Phase 2, native select only |
| `:where(select[nbSelect])` display/appearance/padding | 823–828 | DIRECTIVE_SIBLING_CSS | `select/nb-native-select.css` | Duplicate selector split from base block — consolidate on move |
| `:has(option:disabled:checked)`, `:disabled`, `[data-in-group]`, `:not([data-in-group]):focus-visible` | 830–852 | DIRECTIVE_SIBLING_CSS | `select/nb-native-select.css` | Phase 2 |
| `:where(textarea[nbTextarea])` size variants (`data-size` sm/lg) | 854–867 | DIRECTIVE_SIBLING_CSS | `textarea/nb-textarea.css` | Phase 1 — combine with base block at 652 |
| `:where(textarea[nbTextarea])` display/font-weight/resize | 869–873 | DIRECTIVE_SIBLING_CSS | `textarea/nb-textarea.css` | Duplicate selector split — consolidate on move |
| `::placeholder`, `:disabled`, `[data-in-group]`, `:not([data-in-group]):focus-visible` | 875–897 | DIRECTIVE_SIBLING_CSS | `textarea/nb-textarea.css` | Phase 1 |
| `:where(label[nbLabel])`, `:where(.peer:disabled ~ label[nbLabel])` | 899–908 | DEFER_COMPLEX | — | `NbLabel` directive, not yet scheduled in any phase of this plan — candidate for a future sibling-CSS pass |
| `.nb-focus-visible:focus-visible` | 911–915 | PUBLIC_UTILITY_KEEP | `styles.css` | Named explicitly as the "public focus utility" example in the plan |
| `.focus-visible\:outline-\[var\(--nb-focus-ring\)\]:focus-visible` | 917–919 | REMOVE_STALE (needs confirmation) | — | No references found anywhere in the workspace (`grep` for the class name returns nothing); looks like a leftover Tailwind-arbitrary-value utility. Flag for the user to confirm before deleting — not removed in Phase 0 |
| `dialog[data-nb-dialog]::backdrop` | 922–924 | DEFER_COMPLEX | — | Dialog backdrop |
| `input[nbCheckbox]:checked` | 927–932 | DEFER_COMPLEX | — | Checkbox checked-icon |

## Risks

| Area | Risk | Recommendation |
| --- | --- | --- |
| `NbIconButton` is `@Component`, not `@Directive` | Its CSS rules include descendant selectors (`svg`, `[data-size] svg`) that target content rendered through `<ng-content>`/`nbIcon`. Angular's emulated encapsulation stamps `_ngcontent-*` attributes that do **not** propagate to projected content, so moving these rules into the component's `styles` array would silently stop matching projected `<svg>`/`nbIcon` elements. | Keep `nb-icon-button.css` as a sibling (globally-applied) file, exactly as the Phase 1 mapping specifies — do not "upgrade" it to component-local `styles` despite it being a `@Component`. |
| Split selectors for `input[nbInput]`, `select[nbSelect]`, `textarea[nbTextarea]` | Each of these selectors appears as 3+ separate `:where(...)` rule blocks scattered through `styles.css` (e.g. `input[nbInput]` at lines 639, 683, 708). Migrating "as written" would scatter the same selector across the new sibling file too. | When moving (Phase 1 for textarea, Phase 2 for input/select), it's safe — and arguably required for "exists exactly once" in the acceptance criteria — to consolidate same-selector blocks into one rule per file. This is pure reorganization, not a behavior change, as long as declaration order/specificity within `:where()` stays equivalent (no conflicting properties exist across the split blocks — verified by inspection). |
| Duplicate `::file-selector-button` rule for `input[nbInput]` | Lines 704–706 set `font-family`/`background-color` on `::file-selector-button`; lines 717–730 redefine the same pseudo-element fully (including `background-color: var(--nb-main)` again). The second block's later cascade position wins for overlapping properties, making 704–706 partially dead. | Confirm with the user whether 704–706 is intentional layering or stale before consolidating in Phase 2 — likely safe to fold into the single full rule, but flagging since CLAUDE.md says not to delete pre-existing dead code without asking. |
| `data-nb-stack`/`cluster`/`split` vs. directive selector | The TS directive selectors are `[nbStack]`, `[nbCluster]`, `[nbSplit]` (host attribute inputs), but the CSS targets `[data-nb-stack]`/`[data-nb-cluster]`/`[data-nb-split]` — set via `host: { '[attr.data-nb-*]': '""' }`. | No risk to the move itself (selectors copy verbatim), just noting for anyone unfamiliar with the indirection — worth a short ownership comment when these land in their sibling files. |
| `nb-button-trailing-icon` co-location | `[nbButtonTrailingIcon]` rules (208–222) are interleaved inside the button block in `styles.css`, and the directive's `.ts` file lives at `button/nb-button-trailing-icon.ts` — a sibling of `nb-button.ts`. | Co-locate its CSS in `button/nb-button.css` alongside `nbButton`/`nbButtonTrailingIcon`, matching the Phase 1 target mapping (which lists it under the button file) and the existing file co-location. |
| `nb-select` (custom component) vs. `select[nbSelect]` (native directive) | Both a `:where(nb-select)` shell rule (665–671) and a `:where(select[nbSelect])` rule (801+) exist with overlapping property names but different selectors/values — easy to confuse during Phase 2. | Phase 2 must touch only `select[nbSelect]`; leave `nb-select` (custom select shell) untouched and DEFER_COMPLEX as instructed. |
| `@layer` boundaries | Base-layer rules (lines 24–112) and components-layer rules (114–909) must keep their `@layer base { ... }` / `@layer components { ... }` wrappers when copied into sibling files, per the plan's migration rules. Imported sibling files make `@layer components` appear before the local `@layer base` block unless the order is declared explicitly. | `styles.css` now declares `@layer base, components;` before importing sibling files. Each moved block stays wrapped in `@layer components { ... }`. |

## Phase 1 result

| Primitive | CSS file | Status | Notes |
| --- | --- | --- | --- |
| button | `button/nb-button.css` | Done | Moved `nbButton`/`nbButtonTrailingIcon` rules verbatim; imported from `styles.css` via the feature-folder path |
| icon-button | `icon-button/nb-icon-button.css` | Done | Moved verbatim as a sibling (globally-applied) file per the Risks note — not component-local `styles` |
| surface | `surface/nb-surface.css` | Done | Moved verbatim |
| stack | `stack/nb-stack.css` | Done | Moved verbatim |
| cluster | `cluster/nb-cluster.css` | Done | Moved verbatim |
| split | `split/nb-split.css` | Done | Moved verbatim, including the 3 `@media` collapse queries |
| textarea | `textarea/nb-textarea.css` | Done | Consolidated the 3 split `:where(textarea[nbTextarea])` blocks (639-style base, size variants, display/font-weight/resize) into a single base rule per the Risks note |

`ng-package.json` now copies `styles/*.css` to `dist/ui/styles` and each
sibling file to its matching feature folder (`dist/ui/button`,
`dist/ui/icon-button`, etc.). `styles.css` imports those files with
`../feature/file.css` paths. Its Tailwind `@source` points to
`../fesm2022/ng-brutalism-ui.mjs` from the packaged `dist/ui/styles` folder, and
`package.json` exports `@ng-brutalism/ui/styles.css` from `./styles/styles.css`.

## Phase 2 result

| Primitive | CSS file | Status | Notes |
| --- | --- | --- | --- |
| input | `input/nb-input.css` | Done | Consolidated the 3 split `:where(input[nbInput])` blocks (base, size variants, display/font-weight) into a single base rule; folded the duplicate `::file-selector-button` rule (704–706) into the full rule (717–730) — both set `background-color: var(--nb-main)` so the merge is behavior-preserving, and the short rule's `font-family: inherit` was not present in the full rule, so it now survives in the merged rule |
| input-group | `input/nb-input-group.css` | Done | Moved `nb-input-group`/`nbInputPrefix`/`nbInputSuffix` rules verbatim |
| native-select | `select/nb-native-select.css` | Done | Consolidated the 2 split `:where(select[nbSelect])` blocks (base, display/appearance/padding) into a single base rule; kept the original effective `font-weight: 500` from the later block; left `nb-select` (custom shell) and `dialog[data-nb-dialog]` untouched in `styles.css` per Risks |

`ng-package.json` now globs `input/*.css` and `select/nb-native-select.css` alongside the Phase 1 entries.

## Phase 3 component-local candidates

Phase 3 asks a narrower question than Phase 1/2: of the remaining `styles.css` blocks
that belong to an `@Component` (not `@Directive`), which could move into that
component's own `styles: [...]` array (true `ViewEncapsulation.Emulated`
component-local CSS), rather than staying as a global/sibling stylesheet?

**Headline finding: none of them can, for one structural reason that applies
uniformly.** Angular's emulated encapsulation compiles every selector in a
component's `styles` array by appending a `[_ngcontent-c#]` attribute selector
to it (e.g. `nb-card { ... }` → `nb-card[_ngcontent-c0] { ... }`, `:host { ... }`
→ `[_nghost-c0] { ... }`). That appended attribute selector always contributes
`(0,1,0)` specificity, **outside and unaffected by any `:where()` wrapper inside
the rule** — `:where(...)[_ngcontent-c0]` still carries `(0,1,0)`. Every
candidate below currently ships as `:where(selector) { ... }` specifically so
that a consumer's Tailwind utility class (also `(0,1,0)`, but declared later in
the cascade / in `@layer utilities`) wins outright, per the "zero-specificity
defaults" contract documented at `styles.css:29-32`. Moving any of these into
`styles: [...]` would silently raise their specificity from `(0,0,0)` to
`(0,1,0)`, breaking that contract — Tailwind overrides on the host (or on an
internal templated element that forwards a `class` input) would start losing
ties non-deterministically based on stylesheet insertion order.

This is a stronger, more general version of the `nbIconButton` finding from
Phase 0 (which was blocked for a narrower reason — projected content not
receiving `_ngcontent` markers). Here, even rules with **no** projected-content
involvement are blocked, purely by the specificity the compiler always adds.

| Component | Current selector(s) in `styles.css` | `@Component`? | Targets host or template-internal element? | Can move to component styles? | Risk | Recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| `NbAvatar` | `:where(nb-avatar)` (146–154) | Yes | Host | No | `:host {...}` compiles to `[_nghost-c#]`, raising specificity to `(0,1,0)`; breaks zero-specificity contract for consumer classes on `<nb-avatar class="...">` | Moved to sibling `avatar/nb-avatar.css` in Phase 4, not component-local `styles` |
| `NbCard` | `:where(nb-card)` (166–177) | Yes | Host | No | Same `:host` specificity issue; `nb-card-header`/`-title`/`-description`/`-actions`/`-content`/`-footer` siblings have no CSS in `styles.css` to migrate | Moved to sibling `card/nb-card.css` in Phase 4 |
| `NbImageCard` | `:where(nb-image-card)` (179–190) | Yes | Host | No | Same `:host` specificity issue | Moved to sibling `image-card/nb-image-card.css` in Phase 4 |
| `NbChip` | `:where(span[nbChip])` (156–164) | Yes (selector `span[nbChip]`) | Host | No | Same specificity issue — compiles to `span[nbChip][_ngcontent-c#]`/`:host` either way | Moved to sibling `chip/nb-chip.css` in Phase 4 |
| `NbSelect` (custom shell) | `:where(nb-select)` (220–226) | Yes | Host | No | Same `:host` specificity issue; also explicitly excluded from Phase 2's native-`select[nbSelect]` migration to avoid confusing the two | Keep global, deferred alongside the Phase 2 "leave `nb-select` untouched" decision |
| `NbDialog` | `:where(dialog[data-nb-dialog])` (228–236), `dialog[data-nb-dialog]::backdrop` (261–263) | Yes | Template-internal `<dialog>` element (not host) | No | Even though this is an internal element (so no `:host`/projected-content concern), the `<dialog>` receives a consumer-mergeable `class` via `nbClass(...)` (`nb-dialog.ts:80`); component-local styles would still compile to `dialog[data-nb-dialog][_ngcontent-c#]`, `(0,1,0)`, breaking Tailwind overrides passed through that `class` input. `::backdrop` is also generally unreliable to scope from component styles across browsers | Keep global — these are already correctly marked `DEFER_COMPLEX` (dialog primitive) in the Phase 0 table; no change needed |

### Directive-only blocks (not eligible at all)

The remaining `DEFER_COMPLEX` blocks in `styles.css` belong to `@Directive`
classes (`NbLabel`, `NbSection`, `NbTitle`) or to a `@Component` whose selector
is shared with a directive usage (`NbMediaItem`, selector
`'nb-media-item, [nbMediaItem]'`). Directives have no `styles` array —
component-local CSS is not an option for them regardless of specificity
concerns, so any future co-location should use the sibling-CSS pattern.

### Conclusion

Phase 3 produces no migrations. The "component-local style candidate" path
identified as theoretically open in the Phase 0 summary (`styles.css` audit,
line 11: "none confirmed yet for Phase 1 scope") remains empty after checking
every `@Component` left in the file — Angular's emulated-encapsulation
specificity floor of `(0,1,0)` is incompatible with this design system's
zero-specificity override contract for any globally-applied primitive default.
The Phase 4 implementation follows that recommendation for
`nb-avatar`/`nb-card`/`nb-image-card`/`nbChip`: verbatim `:where(...)` rules in
co-located sibling files imported from `styles.css`, not `styles: [...]`.

## Phase 4 result

| Primitive | CSS file | Status | Notes |
| --- | --- | --- | --- |
| badge | `badge/nb-badge.css` | Done | Moved the `span[nbBadge]` visual token defaults verbatim |
| avatar | `avatar/nb-avatar.css` | Done | Moved as sibling CSS to preserve zero specificity |
| chip | `chip/nb-chip.css` | Done | Moved as sibling CSS to preserve zero specificity |
| card | `card/nb-card.css` | Done | Moved host defaults only; card part components had no `styles.css` rules |
| image-card | `image-card/nb-image-card.css` | Done | Moved host defaults verbatim |
| media-frame | `media-frame/nb-media-frame.css` | Done | Moved directive defaults verbatim |
| callout | `callout/nb-callout.css` | Done | Moved directive defaults verbatim |

`ng-package.json` now includes the Phase 4 sibling files in the package assets.
`styles.css` imports them before the remaining deferred blocks, with
`@layer base, components;` preserving the intended cascade layer order.
