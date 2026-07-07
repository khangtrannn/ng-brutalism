# Design-System Refactor Plan — @ng-brutalism/ui

> Date: 2026-07-07 · Companion to the immutable audit
> `docs/architecture/design-system-audit-2026-07-06.md`.
> This is the **executable** version of the audit's roadmap: per-phase goal,
> ordered tasks, files touched, breaking flag, effort, and exit criteria.
> Mutable — check items off and log completions in `docs/components/progress.md`.

## How to read this

- **Finding** = the audit section that motivates the task (e.g. `6.1`).
- **Breaking** = requires a semver-visible change to the public API/CSS. Pre-1.0
  is the cheap window for these; that's why the risky renames are front-loaded.
- **Effort** = trivial / small / medium / large, carried from the audit.
- Phases are **sequenced by dependency**, not just severity. Don't reorder
  across the dependency edges called out in each "Depends on" note.

## Sequencing rationale (why this order)

1. **Phase 1** ships the release blockers — small, isolated, no design decisions.
2. **Phase 2** cleans architecture/packaging seams (layering, peers, entry
   points) so later token + forms work lands on stable ground.
3. **Phase 3** is the token/theming redesign. It must precede a designed dark
   mode (dark mode can't work until tone.css literals route through vars) and it
   settles the `NbTone` split — the single most expensive post-1.0 change.
4. **Phase 4** (a11y + forms) depends on Phase 3's tone/motion tokens and Phase
   2's `/tokens` entry point and layering.
5. **Phase 5** documents what Phases 1–4 made true (a docs-before-the-fact guide
   would immediately drift).
6. **Phase 6** is post-1.0 surface growth.

Current in-flight work (uncommitted, per `docs/progress.md`) already covers part
of Phase 1 (stale specs + lint) and Phase 3 (token scales declared in
`theme.css`, resolvers emit `var()` refs, shadow stops derive from offset knobs).
Those rows are marked **▶ in progress**.

---

## Phase 1 — Release blockers (days) — ✅ Complete (2026-07-07)

**Goal:** the branch is releasable — no lint/test debt, no known Critical a11y
bug, no dead machinery shipped to consumers, and CI proves the artifact installs.

All 8 rows below are done and verified (lint clean, 270/270 tests green,
`pnpm smoke:ui` passes end-to-end). Row 1.6's id rename shipped alongside a new
`NbIdGenerator` (`libs/ui/src/lib/core/id-generator.ts`) instead of just a
string rename, since the SSR-mismatch root cause needed the counter itself
fixed, not just its output.

**Depends on:** nothing. Start here.

| # | Task | Finding | Files | Breaking | Effort |
|---|---|---|---|---|---|
| 1.1 ▶ | Fix 3 stale specs (accordion trigger tone; 2 jsdom computed-style precedence tests) + remove unused `input` import | 2.3 | `nb-accordion-trigger.ts:5`, 3 spec files | no | small |
| 1.2 | Accordion: closed content is `aria-hidden` **and still focusable** → bind `[inert]` (or delayed `visibility:hidden`) on the collapsed region | 6.1 (Critical) | `nb-accordion-content.ts`, `nb-accordion-content.css` | no | small |
| 1.3 | Dialog: add `body:has(dialog[data-nb-dialog][open]){overflow:hidden}` scroll-lock + surface a `close`/`cancel` output so consumer `open` state can sync | 6.5, 8.2 | `nb-dialog.ts`, `nb-dialog.css` | no (additive) | small |
| 1.4 | Marquee: pause the infinite animation under `prefers-reduced-motion` (WCAG 2.2.2) | 3.2 | `nb-marquee.css` | no | trivial |
| 1.5 | `engines`: add `|| ^24.0.0` (Angular 21 supports Node 24) | 10.3 | `libs/ui/package.json:52` | no | trivial |
| 1.6 | Rename `neo-select-*` / `neo-option-*` ids to `nb-`; move module-level counters to an injectable ID generator (SSR hydration mismatch) | 2.2 | `nb-select.ts:28`, `nb-select-option.ts` | no* | small |
| 1.7 | Delete vestigial Tailwind machinery from shipped CSS: `@source` line + hand-escaped `.focus-visible\:outline-…` utility | 5.2 | `base.css:10,42` | no | trivial |
| 1.8 | CI package-smoke: build → `npm pack dist/ui` → install into scaffolded app → `ng build` + `ng add` (automate `tmp/ngb-smoke`) | 9.2/P0, 10.5 | new CI job / nx script | no | medium |

\*1.6 ids are internal `aria-controls` values, not public API — safe to rename now.

**Exit criteria:** `nx run-many -t lint test` green; axe finds no
focusable-inside-`aria-hidden` on a closed accordion; dialog open locks body
scroll and emits on Esc/backdrop close; marquee freezes under reduced-motion;
CI package-smoke job passes on a clean checkout.

---

## Phase 2 — Architecture & packaging cleanup (1–2 weeks)

**Goal:** remove adoption friction (hard Tailwind peer, invasive global styles)
and lay the packaging seams (`/tokens`, API guard) the later phases
build on.

**Depends on:** Phase 1 (clean baseline + CI smoke to catch exports regressions).

| # | Task | Finding | Files | Breaking | Effort |
|---|---|---|---|---|---|
| 2.1 | Tailwind → optional peer: `peerDependenciesMeta:{tailwindcss:{optional:true}}`; keep schematic Tailwind path as default | 5.3 (High) | `libs/ui/package.json:43` | no | small |
| 2.2 | Move `body`/reset rules into `@layer base`; add opt-in `.nb-root` scope for body colors so single-widget adopters aren't repainted | 5.1 (High) | `base.css:18-23` | mild visual | small |
| 2.3 | Select outside-click: gate the `(document:click)` listener behind an `effect(() => open())` (or CDK `outsidePointerEvents`) instead of always-on per instance | 2.1 (High) | `nb-select.ts:81` | no | small |
| 2.4 | Introduce `/tokens` entry point (token types, resolvers, `NbThemeConfig`, provider); root re-exports for compat | 10.4 | `ng-package.json`, new secondary entry, `index.ts` | no (additive) | medium |
| 2.5 | Public API guard: snapshot `dist/ui/index.d.ts` (API Extractor or checked-in rollup diff) so accidental export changes fail CI; enforce "no deep imports" on the exports map | 9.2/P2, 10.4 | CI + `package.json` exports | no | small |
| 2.6 | Schematics output assertion: post-build smoke that `dist/ui/schematics/collection.json` exists and its `factory` resolves | 1.4 | `libs/ui/project.json:20-28` | no | small |
| 2.7 | Repo hygiene: gitignore + purge committed `.DS_Store` under `libs/ui/src/lib/`; remove vendored `tmp/` ronit.io clone + screenshots | 1.5 | `.gitignore`, tree | no | trivial |
| 2.8 | Consistency nits: route `NbButtonTrailingIcon` through its folder barrel; adopt "every public directive declares `exportAs`" rule | 1.3, 2.4 | `index.ts:163`, directives | no (additive) | small |
| 2.9 | Confirm whether `@angular-devkit/schematics` runtime dep is truly required under pnpm (use the smoke app); drop if not | 10.1 | `libs/ui/package.json:46` | no | small |

**Exit criteria:** a non-Tailwind Angular app installs and builds with no peer
warning; adopting one widget no longer repaints host `body`; `@ng-brutalism/ui/tokens`
and `/class` resolve and tree-shake; API-guard test fails on an intentional
export change; schematics + package smoke both green in CI.

---

## Phase 3 — Token & theming redesign (2–3 weeks)

**Goal:** land the audit's 4-layer token model (ref → semantic → component →
internal), kill the hardcoded literals that block re-theming/dark mode, and make
the `NbTone` palette-vs-semantic split before it calcifies.

**Depends on:** Phase 2 (`/tokens` entry point, layering). **Blocks:** designed
dark mode (3.7) and Phase 4 tone-aware forms.

| # | Task | Finding | Files | Breaking | Effort |
|---|---|---|---|---|---|
| 3.1 | Route **all** `tone.css` foreground/border literals (`#000`, `#fff`) through `--nb-tone-<name>-fg/-border` vars; finish the `--nb-tone-neutral-*` indirection pattern for every tone | 3.1, 3.7 | `styles/tone.css`, `styles/theme.css` | no | medium |
| 3.2 | Split the `NbTone` union into a **semantic tier** (`primary/danger/surface/…`, documented + stable) and an explicit **palette tier** (`yellow/pink/mint/…`, "brutalist palette"); keep names, add type-level separation + docs | 3.1 (High) | `tokens/tone.ts`, docs | no if names stay | medium |
| 3.3 ▶ | Strip TS resolver fallbacks (emit `var(--nb-radius-md)` not `var(--nb-radius-md, 0.5rem)`) now that `base.css` scales are a hard requirement — or codegen CSS+TS from one JSON source (Style Dictionary direction) | 3.4 | `tokens/radius.ts` etc., specs | no | small–medium |
| 3.4 | Add motion tokens `--nb-motion-fast/base` + `--nb-ease`; route the 7+ hardcoded durations/easings through them (also a one-var motion kill switch) | 3.6 | component `*.css`, `theme.css` | no | small |
| 3.5 | Wire `--nb-size-sm/md/lg` into control heights (button/input/select) → density story for free; **or** delete the dead size tokens. Also remove `--nb-main*`, `--nb-secondary-background` if still unused | 3.5 | `theme.css:67-69`, `nb-button.css`, `nb-input.css` | no | small |
| 3.6 | Reduced-motion rework: disable `transition`/`translate` on interactive states but **keep static offset shadows** (they're identity, not motion — WCAG 2.3.3). Replaces the current "zero the shadow offsets" approach | 3.2 (High) | `theme.css:92-99` | no | small–medium |
| 3.7 | Deprecate the runtime theme-var provider (`provideNgBrutalism({theme})` writing inline `:root` styles). Preferred: drop `theme`, document CSS/`@theme` as the only theming path; keep `provideNgBrutalism()` for real config (default tone, density, a11y flags). Alt: emit an SSR-safe `<style>` rule that joins the cascade | 3.3 (High) | `core/provide.ts`, `tokens/theme.tokens.ts` | **yes** (pre-1.0 deprecation) | small–medium |
| 3.8 | **Dark-mode decision.** Recommended: remove the half-`.dark` 6-var stub now (honest "not yet supported") — shipping a half theme is the worst option. Defer a *designed* dark theme to Phase 6 once 3.1 unblocks it | 3.7 (High) | `theme.css:83-90` | no | trivial (remove) / large (ship) |
| 3.9 | Ship 2–3 alternative `theme-*.css` presets (e.g. mono/ink-only, softened) as proof the token contract rebrands cleanly | Token rec | new `styles/theme-*.css` | no (additive) | small |

**Exit criteria:** no color literals remain in `tone.css` (grep clean); a preset
`theme-*.css` visibly rebrands every tone with zero component edits; reduced-motion
keeps shadows but stops movement; TS↔CSS default drift is impossible (single
source); the provider no longer writes inline `:root` styles (or does so SSR-safely).

---

## Phase 4 — Accessibility & forms hardening (2–3 weeks)

**Goal:** the select/accordion/dialog trio is axe-clean and keyboard-complete,
and forms "just work" with `formControlName` across every control.

**Depends on:** Phase 3 (tone/motion tokens for error states), Phase 2 (`/tokens`,
layering). This is the set that earns the "accessible primitive system" claim.

| # | Task | Finding | Files | Breaking | Effort |
|---|---|---|---|---|---|
| 4.1 | `NbSelect` implements `ControlValueAccessor` (value writes, `onChange`/`onTouched` on close, `setDisabledState` merged with `disabled` input, `aria-invalid`/`aria-required` from `NgControl`) | 7.1 (Critical) | `nb-select.ts` | no (additive) | medium |
| 4.2 | `NbSelect` keyboard completion per APG: Home/End, typeahead, Tab-closes-popup, Escape-on-trigger; switch disabled options to `aria-disabled` + focusable | 6.2 (High) | `nb-select.ts`, `nb-select-option.ts` | no | medium |
| 4.3 | `NbSelect` popover/top-layer positioning (native Popover API → top-layer, keeps zero-dep stance) so the listbox stops clipping inside `overflow` ancestors; document as "Preview" in the interim | 8.1 (High) | `nb-select.ts`, `nb-select.css:103-106` | no | medium |
| 4.4 | `NbField` context primitive: generates ids, links label/control/description/error via `aria-describedby`, reflects `[data-invalid]` from `NgControl`; add error/hint sub-primitives | 7.2, 6.4 (High) | new `nb-field/*` | no (additive) | medium–large |
| 4.5 | Accordion header keyboard nav (Up/Down/Home/End between headers) — Radix/Material parity | 6.3 | `nb-accordion.ts` | no | small–medium |
| 4.6 | Dialog finish: optional `dismissible` input for backdrop click + initial-focus guidance (the `close`/`cancel` output already landed in 1.3) | 6.5 | `nb-dialog.ts:76-80` | no (additive) | small |
| 4.7 | Give `NbSelect` a `size` input; align `NbChip` sizing to `size` (alias its `padding` enum); reconcile `'default'` enum value → `'md'` in `NbShadow`/`NbBorderStrength`; move `NbIconTone` off the shared `data-nb-tone` attribute to `data-icon-tone` | 4.2 | `nb-select.ts`, `nb-chip.ts`, `tokens/*`, `nb-icon.ts:49` | **yes** (rename/alias window now) | small each |
| 4.8 | Regression net: `vitest-axe` on dialog/select/accordion/forms fixtures; APG keyboard specs per interactive component; fill specs for the 8 uncovered components; add per-component "Stable/Preview" status data | 9.2, 8.3 | spec files, docs data | no | medium |

**Exit criteria:** `<nb-select formControlName>` round-trips value + touched/dirty
+ disabled; axe passes on all four fixtures; APG keyboard walkthroughs pass; a
form with an invalid control shows linked error text via `aria-describedby`;
select popup escapes an `overflow:hidden` card.

---

## Phase 5 — Documentation & adoption (1–2 weeks)

**Goal:** the public site documents the library's best feature (theming) and
everything Phases 1–4 made true. Highest-ROI item in the audit — content mostly
already exists internally.

**Depends on:** Phases 3–4 (docs must describe the final token/forms/a11y state).

| # | Task | Finding | Source |
|---|---|---|---|
| 5.1 | Port `design-props.md` §1–2 (design-props vocabulary) + `token-customization.md` (inputs vs CSS vars vs classes mental model) to public site | 11.1 (Critical adoption) | internal docs |
| 5.2 | Generated token reference table (every `--nb-*` var + default) | 11.1 | `theme.css` |
| 5.3 | New guide pages: Customization, Dark mode & theming (matching the 3.8 decision), SSR & hydration, Forms integration, Accessibility statement, "without Tailwind" | 11.2 | — |
| 5.4 | Per-component page additions: API table, CSS-variable table, a11y notes, Status badge (Stable/Preview) | 11.2, 8.3 | — |
| 5.5 | Project pages: Comparison / "when not to use", v0.x breaking-change contract; fix README wording ("recipes ship" → "recipes are copy-paste, not exports") | 11.2, 4.4, 12 | `CONTEXT.md` |
| 5.6 | Extend `llms.txt` as docs grow | 11.3 | — |

**Exit criteria:** a first-time visitor can discover the input↔CSS-var single-slot
contract without reading source; every component page states its APG pattern +
status; the "without Tailwind" path is documented end to end.

---

## Phase 6 — Long-term maturity (post-1.0 track)

**Goal:** table-stakes surface growth and the v1.0 gate.

- Missing primitives on the native-first/popover strategy: **Tabs** (already in
  the v0.3 doc), Tooltip, Menu, Toast, Switch, Radio.
- **Designed dark theme** (all tones re-derived) — now unblocked by Phase 3.1.
- Public **density scale** API (cheap once 3.5 wires `--nb-size-*`).
- Visual regression suite on docs recipes (Playwright screenshots).
- Token codegen pipeline (single JSON source → CSS + TS) if 3.3 stopped at
  fallback-stripping.
- Consider a CDK-backed `@ng-brutalism/ui/overlay` entry point when Menu/Tooltip
  land (take CDK Overlay wholesale, not hand-rolled positioning).
- **v1.0** per the `CONTEXT.md` contract (6 months stable + external usage signal).

---

## Open decisions to confirm before starting

1. **Dark mode (3.8):** plan assumes *remove the stub now, ship designed theme in
   Phase 6*. Confirm, or bring the designed theme forward into Phase 3.
2. **Theme provider (3.7):** plan assumes *drop `theme` from the provider*
   (Option 1). Confirm vs the SSR-`<style>`-emission alternative (Option 2).
3. **Token source of truth (3.3):** strip TS fallbacks now (small) vs stand up a
   Style-Dictionary codegen pipeline (medium, defers to Phase 6). Plan assumes strip now.
4. **Secondary entry points (2.4):** `/tokens` + `/class` now, hold the line on
   per-component JS entries until ~80–100 primitives. Confirm scope.
