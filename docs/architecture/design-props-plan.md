# Design Props Plan — Radix-Inspired Input Coverage & Philosophy

> **Status:** Implemented (2026-07-03). All 6 phases shipped — 9 inputs, philosophy doc, tests, doc hygiene.
> **Goal:** Make ng-brutalism's *existing* customization vocabulary complete and
> legible — Radix-grade clarity — without adopting Radix's layout runtime.
> **Appetite:** Additive-only (hard constraint). Ships in v0.2.0.

---

## 1. Framing — what this is (and isn't)

The premise "we lack flexibility to customize via input directly" turned out to
be **half true**. The library already has a CSS-first input vocabulary
(`tone`, `size`, `radius`, `shadow`, `border`, `gap`, `padding`, plus `nbText`
typography). What it lacks is:

- **Coverage:** a handful of components read a public `--nb-*` var in CSS but
  never expose the matching ergonomic input (input↔var asymmetry).
- **Legibility:** no single Radix-style "design philosophy" page makes the
  taxonomy discoverable, so the system *feels* less capable than it is.

**Rejected (explicitly):** bringing Radix Themes' layout props
(`width`/`columns`/`rows`/margin as inputs). Layout stays Tailwind's job — a
principled boundary already documented in `composition-philosophy.md`. Copying
Radix's layout runtime would compete with Tailwind on its own turf.

---

## 2. Frozen decisions (from the grill)

1. **Scope:** legibility (a philosophy doc) + additive coverage fill. Reject
   Radix layout props. *(No Box/Flex/Grid, no `width`/`columns`/`rows` inputs.)*
2. **Tier:** additive-only. No renames, no breaking changes this cycle.
3. **Taxonomy (human-facing):** 7 prop categories × 5 archetypes.
   - Categories: `tone`, `size`, `radius`, `shadow`, `border`, spacing
     (`gap`+`padding`), typography (`nbText`/`nbDisplay` only).
   - Archetypes: Surface/box · Layout · Interactive · Text · Indicator/leaf.
   - Rule: within an archetype, members expose the archetype's standard set;
     Indicator/leaf primitives are **exempt** (we don't force `shadow` onto a
     `status-dot`).
4. **Reject Radix mechanics:** named tokens *not* numeric `1–9`; responsiveness
   stays Tailwind (no `{{ initial, md }}` prop syntax); no layout primitives.
   The doc gets a "**What we deliberately don't do (and why)**" section.
5. **Enforcement:** doc matrix + extend each primitive's existing
   `*.tokens.spec.ts` for every added input. **No new test mechanism** — a naive
   coverage-manifest/grep test would misfire (see §4 methodology).
6. **Concrete audit rule — one-way symmetry:**
   - Every scalar *input* writes a public var (already holds).
   - A public var *may* be input-less → deliberate advanced "CSS-only hook."
   - A var is a **gap** (needs an input) only when it's a **standard category**
     (`radius`/`shadow`/`border`/`gap`/`padding`) used as a **public slot with a
     fallback** on a non-leaf primitive.
7. **Doc placement:** new **canonical entry point** at
   `docs/components/design-props.md` (Option B). `composition-philosophy.md` and
   `token-customization.md` get a one-line pointer up to it and remain the
   deep-dives. Do **not** add a fourth orphan doc.

---

## 3. Verified gap list (add these inputs)

Audited across **all 38 component dirs**, prefix-aware, using the
fallback-comma signal. Every item below is a public slot the CSS **already
reads** — the change is purely "expose the input that writes it." All transforms
already exist (`nbRadiusStyleTransform`, `nbShadowStyleTransform`,
`nbBorderWidthStyleTransform`).

| # | Input | Slot already read in CSS | Archetype |
|---|---|---|---|
| 1 | `callout.border` | `--nb-callout-border-width` | Surface |
| 2 | `checkbox.radius` | `--nb-checkbox-radius` | Interactive |
| 3 | `input.radius` | `--nb-input-radius` | Interactive |
| 4 | `input.shadow` | `--nb-input-shadow` | Interactive |
| 5 | `textarea.radius` | `--nb-textarea-radius` | Interactive |
| 6 | `textarea.shadow` | `--nb-textarea-shadow` | Interactive |
| 7 | `select.radius` | `--nb-select-radius` | Interactive |
| 8 | `select.shadow` | `--nb-select-shadow` | Interactive |
| 9 | `input-group.radius` | `--nb-input-group-radius` | Surface/wrapper |

**9 inputs across 7 components.**

### Explicitly excluded (do NOT add — verified false positives)

| Slot / candidate | Reason |
|---|---|
| `sticker.shadow` | `fill: var(--nb-sticker-shadow, … #050505)` — a shadow **color**, not elevation. Wrong transform. |
| `--nb-title-wave-gap`, `--nb-underline-radius` | Fine-grained **decorative hooks**, like the intentionally CSS-only `--nb-underline-gap`. |
| `media-item.{radius,gap}` | Internal anatomy vars (**no fallback**, size-driven), not public slots. |
| `sticker.padding-inline/block` | Prefix false-match; internal anatomy. |
| `checkbox.shadow` | The `box-shadow` there is a **focus ring**, not customizable elevation. |
| `select.size` | Anatomy decision, not a var-symmetry gap — out of scope this cycle. |
| accordion / chip "dead inputs" | False alarm — compound sub-part prefixes (`--nb-accordion-item-radius`, `--nb-chip-group-gap`) are wired correctly. |

---

## 4. Audit methodology (so it's reproducible — and why no auto-test)

A trustworthy symmetry audit needs **three refinements** that a naive grep lacks.
The docs' "architecture complete/hardened" claim hid these gaps; each refinement
below was learned by producing (and catching) a wrong result:

1. **Fallback-comma signal.** A genuine public slot is written
   `var(--nb-<c>-<cat>, <fallback>)`. Internal anatomy vars have **no fallback**
   and must be skipped (else `media-item` false-positives).
2. **Semantic check.** `--nb-sticker-shadow` matches mechanically but is a
   *color*. A category name match ≠ category meaning.
3. **Prefix-awareness.** Compound components use sub-part prefixes
   (`accordion-item`, `chip-group`, `input-group`) ≠ the directory name. Both
   forward and reverse audits must key on the **actual var prefix**.

Because (2) can't be mechanized and (1)/(3) are subtle, **enforcement stays
doc-based** (decision §2.5). Per-input correctness is covered by extending the
existing `*.tokens.spec.ts` pattern.

---

## 5. Deliverables

### 5.1 Philosophy doc — `docs/components/design-props.md` (canonical entry point)

Sections:
1. **The vocabulary** — 7 categories, each with its named scale (not numeric).
2. **The 5 archetypes** — which categories each exposes; leaf exemption.
3. **Per-component prop matrix** — the reference table (Radix-style).
4. **Two tiers of customization** — *standard inputs* (ergonomic) vs.
   *CSS-only hooks* (advanced, var-only). Name the distinction explicitly.
5. **Input vs CSS-var vs Tailwind** — link to `composition-philosophy.md`.
6. **What we deliberately don't do (and why)** — named-not-numeric,
   responsive-is-Tailwind, layout-is-Tailwind.
7. **Deep-dive links** — `token-customization.md` (mechanics),
   `composition-philosophy.md` (boundary).

Add one-line "↑ start at design-props.md" pointers to the two deep-dive docs.

### 5.2 Code — 9 additive inputs (§3)

Each: `readonly <prop> = input(null, { transform: nb<Cat>StyleTransform })` +
host binding `[style.--nb-<c>-<prop>]`. No CSS changes (slots already read).

### 5.3 Tests — extend existing specs

For each new input, add to that component's `*.tokens.spec.ts`: (no input →
no inline var) and (input set → writes `var(--nb-<c>-<prop>, …)`), mirroring
`card.tokens.spec.ts`.

### 5.4 Doc hygiene

- **Do NOT** change progress.md's "10 primitives" — verified to mean the *10 new*
  v0.2.0 primitives (`v0.2.0-plan.md`), not a total. Not stale.
- **Do NOT** soften "complete and hardened (Phases 0–8)" — accurate as history;
  the 9 input gaps are *new scope* from this plan, not a hardening regression.
- Update `docs/progress.md` **Next** lines (Components + Release): they currently
  say "No active work / ready for release"; point them at this design-props work.
- Register both this plan and the eventual `design-props.md` in `docs/INDEX.md`.
- On completion: update `docs/progress.md` Components summary + shipped-log entry.

---

## 6. Phasing (one PR, additive)

1. Write `design-props.md` taxonomy/archetype/symmetry/"don't-do" sections
   (the contract) → verify: reads cleanly, matrix drafted.
2. Add the 9 inputs → verify: `nx run ui:build` clean, no CSS touched.
3. Extend the 7 components' `*.tokens.spec.ts` → verify: `nx run ui:test` green.
4. Fill the per-component matrix in the doc from the now-complete code.
5. Doc hygiene (§5.4) → verify: INDEX + progress updated per doc protocol.

**Timing:** ride in v0.2.0 (additive, CSS pre-wired, near-zero risk), unless the
release is time-boxed to imminent.
