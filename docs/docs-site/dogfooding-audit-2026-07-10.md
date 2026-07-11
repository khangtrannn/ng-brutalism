# Docs Site Audit — Verification + Dogfooding (2026-07-10)

**Goal:** verify every docs page works, and measure how well the docs site behaves
as a *real consumer* of `@ng-brutalism/ui` — i.e. does it actually use the library's
own components instead of hand-rolling their look with raw HTML/Tailwind/custom CSS.

**Deliverable:** this report began as a backlog. A follow-up pass started the P0
fixes; keep the remaining checklist below as the live backlog.

**Scope:** all 60 public routes / 65 `*.page.ts` files in `apps/docs`, **plus** the
`libs/docs-ui` chrome (shell, navbar, sidebar, TOC, code-block, example frame).

**Rubric (4 dimensions):**
1. Dogfooding — hand-rolled duplicates of a primitive + library-wide component coverage.
2. Builds & routes — compiles, reachable, no dead code / broken links.
3. Content/API accuracy — documented API & code snippets match real library exports.
4. Visual & a11y — serve + `axe-core` on all routes + full-page screenshot of each, eyes on high-value pages.

**Guardrail:** per `docs/components/composition-philosophy.md`, Tailwind legitimately
owns layout / positioning / art-direction. A finding is only raised where a primitive
is genuinely *suitable*, not for every `<div>`.

---

## Executive summary

| Dimension | Verdict |
|---|---|
| **Builds & routes** | ✅ Clean. `nx build docs` passes; 60/60 routes registered = discovered; all 60 return HTTP 200 with 0 load/console errors. |
| **Content / API accuracy** | ✅ Clean. No snippet or import references a non-existent public symbol. |
| **Dogfooding** | ⚠️ **Mixed.** Recipes, component examples, and composition pages dogfood *excellently*. The **`docs/*` guide pages, the `nb-stat-tile` custom CSS, and the docs-ui chrome do not** — they hand-roll what primitives already provide. |
| **Visual & a11y** | ✅ renders / ⚠️ a11y. Every page renders correctly. **Only 2 of 60 routes pass axe with zero violations** — but the violations trace to a *small number of shared root causes*, so they're cheap to fix broadly. |

**Top 5 things to act on (highest leverage first):**

1. **Replace the `nb-stat-tile` custom CSS system** with `nbStat` + `nbSurface`/`nbCard`.
   295 occurrences across 45 files — the single biggest dogfooding gap, and it also
   brings the demo-only `NbStat` into real use. *(Dogfooding — flagship)*
2. **Fix the sidebar chip contrast once** → clears the `color-contrast` violation on
   **58 of 60 pages** (174 nodes). *(a11y — one fix, site-wide win)*
3. **Convert the `docs/*` guide-page concept cards** (`border-3 border-(--nb-border) … shadow-[…]`
   + `font-heading uppercase` headings) to `nbCard`/`nbSurface` + `nbCardTitle`/`nbText`. *(Dogfooding)*
4. **Add keyboard access to scrollable regions** (`tabindex="0"` on `overflow-x-auto`
   table wrappers + code blocks) → clears `scrollable-region-focusable` on 39 pages. *(a11y)*
5. **Rebuild the docs-ui chrome on primitives** (navbar / example-frame / drawer / sidebar
   surfaces → `nbSurface`) so even the site scaffolding consumes the library. *(Dogfooding)*

---

## Dimension 2 — Builds & routes ✅

- **Build:** `nx build docs` → success (exit 0), SSR + prerender complete, no warnings of note.
- **Route registry:** `validate-public-routes.mjs` → `60 registered, 60 discovered`, sitemap + llms.txt in sync.
- **Runtime:** Playwright sweep of all 60 routes → **all HTTP 200, 0 load errors, 0 page/console errors.**
- **Internal links:** 27 distinct `routerLink` targets, all resolve to real routes. No broken links.

**Dead code (remove):**

| File | Symbol | Status |
|---|---|---|
| `libs/docs-ui/src/lib/docs-shell.ts` | `DocsShell` | **Dead** — not exported from `index.ts`, only self-referenced. Superseded by `NbDocsLayout`. |
| `libs/docs-ui/src/lib/nav.ts` | `DOC_NAV`, `NavItem`, `NavGroup` | **Live** — imported by `layout/sidebar.ts`, `layout/mobile-drawer.ts`, and `layout/pagination.ts`. Keep. |

> Note: `libs/docs-ui/src/lib/layout/sections.ts` (`TOP_SECTIONS`) looked orphaned by name
> but is **live** — consumed by `navbar.ts` + `mobile-drawer.ts`. Keep.

---

## Dimension 3 — Content / API accuracy ✅

Cross-checked every `Nb*` identifier referenced anywhere in `apps/docs` against the real
public exports of `libs/ui` (+ tokens). Directive selectors in snippets checked against the
74 real `nb*` selectors.

- **No drift.** The only referenced-but-not-public symbols are `NbDocsLayout` / `NbDocsNavbar`
  (docs-ui's own exports — expected) and `NbIdGenerator`.
- **`NbIdGenerator`** (`docs/ssr`, `docs/without-tailwind`) is **internal-design documentation**
  — the SSR page shows *how the library solves* stable id generation, not an API to import.
  Accurate, not a bug.

Snippets that are complete standalone components are valid; fragments reference only real
symbols/inputs. No action required.

---

## Dimension 1 — Dogfooding ⚠️ (the core)

### The reframe

The recipes and component examples the user pointed at (`job-listing-card`, `podcast-card`,
`job-card`) are the **gold standard** — richly composed from primitives, CSS vars for local
art-direction, Tailwind only for layout escape hatches. The problem isn't that the site
*can't* dogfood; it's that whole categories of pages **don't yet**.

**Dogfood well (reference these — no action):**
- `recipes/*` — podcast-card (17 components), job-card (15), travel-card, open-to-work-card
- `components/examples/*` — job-listing-card (15), contact-us-dialog
- `composition/*` — 8–10 primitives per page
- `showcase/portfolio/*` — hero + nav (map section is 3rd-party OpenLayers)
- all 37 `components/*` demo pages — import their component + wrap demos in `DocsExample`

### Library coverage

No component is *entirely* unused, but **10 are demo-only** — they appear only on their own
demo page and are never consumed as a real building block anywhere else:

`NbAccordion` · `NbAvatarGroup` · `NbBadge` · `NbCard` · `NbField` · `NbImageCard` ·
`NbNativeSelect` · `NbProgress` · `NbRating` · `NbStat`

Fixing the gaps below naturally pulls several of these (`NbStat`, `NbCard`, `NbImageCard`,
`NbField`) into real use.

### 🚩 Flagship gap — `nb-stat-tile` custom CSS → `nbStat` + `nbSurface`/`nbCard`

`apps/docs/src/styles.css` (~lines 262–336) defines a full BEM component that **reimplements
primitives**: value + label typography (= `nbStat`), border + offset shadow + tone background
(= `nbSurface`/`nbCard` `border`/`shadow`/`tone`), and hover/active/focus interactive states.

- **295 occurrences across 45 files** (worst: `introduction` = 70, `home` = 36, ~12 on every component demo page).
- **Replacement:** `nbStat` (value/label) inside an `nbSurface`/`nbCard` (`tone`/`border`/`shadow`);
  the interactive nav-tile variant becomes a linked `nbSurface`/`nbCard`.
- **Payoff:** deletes ~75 lines of custom CSS, brings the demo-only `NbStat` + `NbCard` into
  real consumer use, and is visible on the two highest-traffic pages.

### `docs/*` guide-page gaps

The guide group is where dogfooding is thinnest. Recurring hand-rolled patterns:
- **Concept cards:** `class="border-3 border-(--nb-border) bg-(--nb-tone) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"`
  → `nbCard` / `nbSurface` with `tone`/`border`/`shadow`.
- **Headings:** `class="font-heading text-xl font-black uppercase"` → `nbTitle` / `nbDisplay` / `nbText`.
- **Nav / at-a-glance tiles:** `nb-stat-tile` → see flagship above.

| Page | Components today | Gap |
|---|---|---|
| `docs/introduction` | NbButton, NbSurface | 70 `nb-stat-tile`; hand-rolled 3-up "why" card grid → `nbCard`; hero art-direction is honest Tailwind (keep) |
| `docs/comparison` | **none** | All "when it fits / doesn't" cards hand-rolled → `nbCard`/`nbSurface` + `nbCardTitle` |
| `docs/faq` | NbButton | Comparison cards → `nbCard`; component grid (`nb-stat-tile`) → `nbStat`+linked `nbSurface` |
| `docs/inspired-designs` | **none** | Image thumbs `border-3 border-black` → `nbImageCard`/`nbMediaFrame`; hand-rolled lightbox + manual Esc → **`nbDialog`** (free focus-trap/Esc/a11y) |
| `docs/theming`, `customization`, `forms`, `accessibility`, `ssr`, `versioning`, `without-tailwind` | NbCallout (± NbButton/NbSelect) | Same concept-card + heading + tile patterns; convert per above |
| `docs/design-props` | none | Mostly a **data table** — honest Tailwind (no table primitive). Only the `overflow-x-auto` wrapper → `nbSurface` |

### Chrome gaps (`libs/docs-ui`)

Even the site scaffolding hand-rolls primitive anatomy:

| File | Hand-rolled | → |
|---|---|---|
| `docs-example.ts` | `border-4 border-(--nb-border) … shadow-[8px_8px_0_0_var(--nb-shadow)]` frame | `nbSurface` (`border`/`shadow`/`radius`) |
| `layout/navbar.ts` | `border-4 … shadow-[8px…]` bar + logo tile; custom `.nav-link` | `nbSurface`; nav actions can compose `nbButton` |
| `layout/mobile-drawer.ts` | border/shadow panel | `nbSurface` |
| `layout/docs-layout.ts` | border/shadow regions | `nbSurface`/`nbSection` where suitable |
| `layout/sidebar.ts` | border + colored group chips | `nbSurface`; chips → `nbChip` (also fixes the contrast bug — see a11y) |
| `docs-code-block.ts` | border/shadow shell | `nbSurface` (keep Shiki internals) |

### Guardrail — do **not** convert (honest Tailwind / custom)

- `docs/design-props` token table (library has no table primitive)
- `inspired-designs` masonry `columns-*` layout
- `introduction` mascot hero decorative squares (art-direction)
- `job-listing-card` decorative bullet dots (not semantically a status dot)
- `showcase/portfolio` OpenLayers map container (3rd-party integration)

---

## Dimension 4 — Visual & a11y

### Visual (screenshots reviewed)
All 60 pages render correctly — brutalist aesthetic intact, no broken/overflowing layouts.
- **`showcase/portfolio` "My Journey"** renders as an empty blue box in the headless sweep:
  it's an **OpenLayers map** whose XYZ tiles didn't load during capture. **Verify in a real
  browser** — expected artifact, not a confirmed defect.

### Accessibility (axe-core, all 60 routes — only `/` and `/showcase/portfolio` fully clean)

Ranked by leverage. Most violations share a single root cause, so fixes are broad:

| Rule | Impact | Reach | Root cause / fix |
|---|---|---|---|
| `color-contrast` | serious | **58 pages / 174 nodes** | Sidebar `.sidebar-group__chip` colored category headers. Home + portfolio are clean *because they have no sidebar*. **Fix once in `sidebar.ts`.** |
| `scrollable-region-focusable` | serious | 39 pages / 80 nodes | `overflow-x-auto` table wrappers + code blocks lack keyboard scroll. Add `tabindex="0"` in `DocsCodeBlock` + the table-wrapper pattern. |
| `label` | **critical** | 2 pages (`components/input`, `components/checkbox`) | A demo control has no `<label>`/`aria-label` — ironically on the input & checkbox pages. Fix the demo markup. |
| `role-img-alt` | serious | `components/sticker` (7 nodes) | `nb-sticker` renders `role="img"` with no alt text. **Likely a `libs/ui` a11y gap in `NbSticker`**, not just docs — investigate the component. |
| `landmark-complementary-is-top-level` | moderate | `composition/split-layouts` (1) | `<aside>` nested inside another landmark. |
| `aria-allowed-role` | minor | `components/card` (1) | Role not appropriate for the element in a demo. |

> Fixing the top two rows clears the large majority of all violations across the site.

---

## Prioritized backlog

**P0 — high leverage**
- [ ] Replace `nb-stat-tile` (styles.css) with `nbStat` + `nbSurface`/`nbCard`; migrate 45 files (295 uses). Follow-up started: converted `nb-stat` typography is bridged in CSS, but old/new markup still coexist.
- [x] Fix sidebar chip contrast in `sidebar.ts` (clears 58 pages).
- [ ] Add `tabindex="0"` to scrollable table/code regions (clears 39 pages).

**P1 — dogfooding depth**
- [ ] Convert `docs/*` guide concept-cards + headings to `nbCard`/`nbSurface`/`nbTitle`/`nbText` (start: `comparison`, `faq`, `introduction`, `inspired-designs`).
- [ ] `inspired-designs`: image frames → `nbImageCard`/`nbMediaFrame`; lightbox → `nbDialog`.
- [ ] Rebuild docs-ui chrome surfaces (`docs-example`, `navbar`, `mobile-drawer`, `sidebar`, `docs-code-block`) on `nbSurface`.

**P2 — correctness / cleanup**
- [ ] Fix `label` (critical) on input + checkbox demos; `role-img-alt` on sticker (check `NbSticker` in `libs/ui`); split-layouts landmark; card `aria-allowed-role`.
- [ ] Remove dead code: `docs-shell.ts` (`DocsShell`). Keep `nav.ts` (`DOC_NAV`); it drives sidebar, mobile drawer, and pagination.
- [ ] Verify portfolio "My Journey" map renders in a real browser.

---

## Method & data

- **Build/routes:** `nx build docs`, `apps/docs/scripts/validate-public-routes.mjs`.
- **Dogfooding:** grep coverage of every `Nb*` export across `apps/docs` + `libs/docs-ui`; per-page component maps; hand-rolled-markup counts (`border-(--nb-border)`, `shadow-[…--nb-shadow]`, `nb-stat-tile`); source reads of representative pages.
- **API accuracy:** diff of referenced `Nb*` identifiers vs real public exports; selector cross-check.
- **Visual/a11y:** `nx serve docs` (localhost:4201) + Playwright + `axe-core@4.10.2`, all 60 routes, full-page screenshots + violations JSON. Raw data in the session scratchpad (`axe-results.json`, `shots/`).
