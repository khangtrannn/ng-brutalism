# Pre-Release Audit Plan

Plan for finding mismatches between the documentation site (`apps/docs`) and the library implementation (`libs/ui`) before the first pre-release of `@ng-brutalism/ui`.

This document defines **how** the audit will be run. The audit findings will be written to a separate document, `PRE_RELEASE_AUDIT.md`.

---

## 1. Goal

Produce a punch-list of every place where the docs site and the library implementation disagree, severity-tagged, so the user can triage and decide direction-of-fix per item before publishing v0.1.

---

## 2. Source layout (audit map)

- **Library (implementation):** `libs/ui/src/lib/<component>/`
- **Library public surface:** `libs/ui/src/index.ts`
- **Docs page content (source of truth for docs):** `apps/docs/src/app/pages/components/<component>.page.ts`
- **Docs route aliases (thin re-exports, ignore):** `apps/docs/src/app/pages/docs/<component>.page.ts`
- **Setup docs:** `apps/docs/src/app/pages/docs/installation.page.ts`, `introduction.page.ts`
- **Library README:** `libs/ui/README.md`

Each `/components/*.page.ts` typically contains, for every example: a **live demo** (real Angular template using the lib component) AND a separate **hand-written code snippet string** (`protected readonly xxxExampleCode = \`...\``). These two are maintained in parallel by hand — drift is structurally likely.

---

## 3. In-scope mismatch categories

| # | Category | Severity baseline | Description |
|---|----------|-------------------|-------------|
| 1 | **API surface drift** | HIGH | Docs page (API table, prose, header stat tiles) claims an input/output/variant/size that the component does not expose, or the component exposes one the docs never mention. |
| 2 | **Demo vs. code-snippet parity** | BLOCKING | The live `<docs-example>` template and the adjacent `[code]` string must produce the same markup. Any divergence (different attribute, different child element, different class) is a finding. |
| 4 | **Public export drift** | BLOCKING | The docs reference an identifier (component, directive, type, token) that is not re-exported from `libs/ui/src/index.ts`, so consumers cannot import it. Or the opposite: an export exists with no docs page. |
| 5 | **Installation / setup drift** | BLOCKING | `installation.page.ts`, `introduction.page.ts`, and `libs/ui/README.md` reference imports, providers (`provideNgBrutalism`), tokens (`NB_THEME_CONFIG`, `NB_DENSITY`), peer deps, or setup steps that no longer match reality. |

(Categories #3 "live demo vs. prose claim" is folded into #1; numbering kept to match the grilling conversation.)

## 4. Out of scope

- Visual / styling polish (token values, spacing, colors).
- Test coverage gaps.
- Anything in `apps/docs/src/app/pages/docs/<component>.page.ts` that isn't a thin re-render of its `/components/` sibling (these were verified to be thin aliases — they will be spot-checked but not deep-audited).
- The `/components/examples/` directory (composite demos like `job-listing-card`, `contact-us-dialog`) — only audited if they expose a public API claim.
- Old planning docs (`LAUNCH.md`, `MIGRATION_TO_NG21.md`, `AGENTS.md`, `CONTEXT.md`).

---

## 5. Components in scope

All 15 library components plus the foundation surface:

**Foundation:** `provideNgBrutalism`, `NB_THEME_CONFIG` / `NbThemeConfig`, `nbClass`.

**Components:** accordion, avatar, badge, button, card, checkbox, dialog, image-card, input, input-group, label, marquee, select, textarea, title.

---

## 6. Per-category methodology

### Category 1 — API surface drift

For each component:

1. Read the implementation file(s) under `libs/ui/src/lib/<component>/` and extract the **actual public surface**:
   - Selector(s)
   - All `input()` / `@Input()` / `model()` signatures with their accepted types
   - All `output()` / `@Output()` signatures
   - Exported public types/unions (e.g. `NbButtonVariant = 'default' | 'neutral' | ...`)
   - Sub-component / sub-directive selectors (e.g. `NbCardHeader`, `NbAccordionTrigger`)
2. Read the docs page (`apps/docs/src/app/pages/components/<component>.page.ts`) and extract every **claimed surface**:
   - The hand-written API `<table>` rows
   - Header "stat tiles" that quote a number (e.g. "3 Sizes", "5 Variants")
   - Prose mentions of props/variants/values
3. Diff (2) against (1). Record:
   - Claims in docs that do not exist in impl → **API removed or never existed** finding.
   - Surface in impl not in docs → **Undocumented public API** finding.
   - Type mismatch (e.g. docs say `'sm' | 'lg'`, impl accepts `'sm' | 'md' | 'lg'`) → **Type drift** finding.

### Category 2 — Demo vs. code-snippet parity

For each `<docs-example [code]="xxxCode">` on every page:

1. Extract the projected content inside `<docs-example>...</docs-example>` (the live demo template).
2. Extract the matching `xxxCode` string property from the component class.
3. Normalize both (strip indentation, collapse whitespace).
4. If they don't match exactly modulo whitespace, record a finding with both versions side-by-side.

Also flag `<docs-code-block [code]="...">` blocks that purport to be a usage snippet (e.g. "Template", "Import") and verify the snippet would actually compile against the current public surface.

### Category 4 — Public export drift

1. Parse every identifier exported from `libs/ui/src/index.ts`.
2. For each, confirm a docs page exists (component) OR is mentioned in setup docs (foundation).
3. Grep every `import { X } from '@ng-brutalism/ui'` in `apps/docs/**` and confirm `X` is actually exported.
4. Grep every `import { X } from '@ng-brutalism/ui'` in `libs/ui/README.md` and confirm `X` is actually exported.
5. Record any identifier that is imported but not exported, or exported but undocumented.

### Category 5 — Installation / setup drift

1. Read `apps/docs/src/app/pages/docs/installation.page.ts` and `introduction.page.ts`.
2. Read `libs/ui/README.md`.
3. For every claim made (package name, peer dep version, provider call, token injection example, CSS import path, Tailwind setup, theme config shape), verify against:
   - `libs/ui/package.json` (package name, peerDeps, version)
   - `libs/ui/src/lib/core/provide.ts` (`provideNgBrutalism` signature, `NbConfig` shape)
   - `libs/ui/src/lib/tokens/` (theme/density token shapes)
   - `libs/ui/src/lib/styles/` (CSS entry points)
4. Record any claim that no longer holds.

---

## 7. Source-of-truth rules (for the *audit*, not for fixes)

- **Library code is authoritative for what currently exists.** A docs claim that doesn't match the code is a finding regardless of which one was "intended."
- **The audit does not pick a fix direction.** Each finding will be tagged with a *recommended* fix direction (`fix-docs` or `fix-impl`), but the user makes the final call per finding.

---

## 8. Deliverable format

Single Markdown file: `PRE_RELEASE_AUDIT.md` at repo root.

Structure:

```
# Pre-Release Audit — Findings

## Summary
- Total findings: N
- Blocking: N | High: N | Low: N

## Foundation
  ### [BLOCKING] <finding title>
  - **Where:** <docs path:line> vs <impl path:line>
  - **Docs claims:** ...
  - **Impl actually:** ...
  - **Recommended fix:** fix-docs | fix-impl
  - **Notes:** ...

## accordion
  ### ...

## avatar
  ### ...

... (one section per component, alphabetical)
```

Severity definitions:
- **BLOCKING** — consumer cannot use the lib correctly by following the docs (broken import, wrong provider signature, snippet doesn't compile).
- **HIGH** — docs are wrong but consumer can recover by reading the source (missing prop in API table, type drift).
- **LOW** — cosmetic (stat tile says "3 Sizes" when there are 3 but they're named differently; prose phrasing).

---

## 9. Execution order

1. Foundation surface (`index.ts` exports + `provideNgBrutalism` + tokens) — these gate everything else.
2. Installation / introduction / README — Category 5.
3. Components in alphabetical order — Categories 1, 2, 4 per component.
4. Final cross-check: every `index.ts` export appears in the findings doc at least implicitly (covered by a component section or explicitly noted as undocumented).

---

## 10. What this plan deliberately does NOT do

- It does not fix anything. No edits to `libs/ui/**` or `apps/docs/**` during the audit pass.
- It does not redesign the docs page structure (e.g. extracting code snippets from live templates automatically). That's a separate proposal if you want it after seeing the volume of drift.
- It does not run the dev server or visually verify rendering. The audit is static.
