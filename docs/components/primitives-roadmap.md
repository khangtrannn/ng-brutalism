# Library Improvement Roadmap — Brutalist Primitives

**Status:** Decisions locked (2026-05-24 grill session). Ready to research + build. Pick up in next session.

**Context:** Analysis of the job board demo (`~/ng-brutalism-job-board/`) revealed that users — including Claude implementing the demo — needed 1,446 lines of custom CSS and bypassed several library components entirely. This session diagnosed root causes and set the direction for the next phase of the library.

---

## Philosophy (reaffirmed)

**"Build loud. Stay sharp."**

- **Build loud** = opinionated, stunning defaults. Users should get a great-looking UI by using the components, not by writing CSS first.
- **Stay sharp** = minimal, composable, no bloat. Every component should do one thing well and snap together with others.

The library is NOT a set of neutral primitives. It makes bold design choices by default. Users customize based on their need by assembling the building blocks.

We as a library maintainer will provide them the small building blocks (we can think of them as pieces of lego). We also provide them some example of how we can assemble these pieces to build the real brutalist design for them to reference.

---

## Three Failure Modes (from job board analysis)

### 1. Genuine Component Gaps
Missing functionality that CSS variables cannot fix.

**Evidence:** `nb-badge` was bypassed entirely — zero usages in the job board. Custom `.job-pill` CSS classes were written instead. Root cause: `nb-badge` had no `gap` for icon+text layout, making icon+label pills impossible even if the user knew about `--nb-badge-bg`.

### 2. Discoverability of the CSS Variable System
Component-scoped CSS variables (`--nb-card-radius`, `--nb-badge-bg`, etc.) exist in source but are invisible to users — not documented, not surfaced as public API.

**Evidence:** `nb-card` was overridden with `!important` to set `border-radius: 14px`. The correct fix (`style="--nb-card-radius: 14px"`) was available but unknown. Claude implementing the demo also missed it — confirming the problem is severe, not just a docs gap for non-technical users.

### 3. Composition Complexity
Some components feel too heavy for simple use cases, pushing users toward raw HTML.

**Evidence:** A native `<select>` with custom CSS was used for the sort dropdown instead of `nb-select` + `nb-select-option`, because the `nb-select` API felt heavyweight for a 3-option inline filter.

---

## Direction: Universal Brutalist Primitives

**Decision:** Build small, composable brutalist building blocks. Not domain-specific card variants (no `nb-job-card`, `nb-pricing-card`). Not a layout framework.

**Rationale:**
- We cannot predict all domains users will build for.
- Domain-specific components cause maintenance explosion.
- Small primitives that snap together give users full flexibility while still shipping loud, opinionated defaults.
- The building blocks are NOT card-specific — a `nb-media` primitive works in a navbar, hero section, card, or anywhere else. Composition determines the pattern.

**Docs strategy:** Ship example compositions (job card, profile card, etc.) in the docs as motivation — showing users how to assemble the primitives. Users lift the example they like and customize the pieces.

---

## Candidate Primitives (from job board analysis)

The job board card broke down into these building blocks that don't exist yet:

| Primitive | What it is | Status |
|---|---|---|
| **`nb-media`** | Bordered, shadowed box for image/logo/icon — standalone, not a full card | Missing |
| **`nb-badge` improvement** | Add `gap-1.5` for icon+text layout, document `--nb-badge-bg`/`--nb-badge-fg` as public API | Exists, needs fix |
| **`nb-stat`** | Icon circle + value + label — for salary, metrics, KPIs | Missing |
| **`nb-avatar-row`** | Avatar + name + meta text inline (recruiter row, author row, team grid) | `nb-avatar` exists; row layout missing |

**Important:** This list is based on ONE candidate (job board). More use cases need to be analyzed to validate and complete the primitive set. The plan is to start here and expand as more real-world patterns are studied.

---

## Decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Fix nb-badge | Extend in place (Option A) — free color via CSS vars + icon support | One flexible component beats two with split responsibility |
| Fix nb-badge icon layout | Add `gap-1.5` to base classes | Icon+text already works via native content, just needs spacing |
| Document CSS variables | Expose all component-scoped tokens as public API in docs | Discoverability is severe enough that even Claude missed them |
| Card layout direction | Universal primitives + docs examples, NOT domain-specific card components | Cannot predict all domains; composition over specialization |
| Scope of this work | Gather all issues first, decide release scope later | v0.2.0 vs docs-first TBD |

---

## Open Questions (resolve in next session)

1. **Release scope:** docs-first this week vs component improvements in v0.2.0 vs combined release
2. **More use cases:** what other real-world patterns (pricing table, testimonial, team grid, dashboard) should we analyze to complete the primitive map before building?
3. **`nb-avatar-row` naming:** standalone component or `nb-avatar` with layout inputs?
4. **`nb-select` complexity:** what's the simpler API surface for single-line filter use cases?
5. **Icon system:** 6+ SVGs were embedded inline in the job board — does the library need an icon strategy?

---

## Source Evidence

- Job board app: `~/ng-brutalism-job-board/src/app/` (443-line template, 1,446-line CSS)
- Custom CSS variables defined: 10 colors (`--nb-cream`, `--nb-pink`, `--nb-mint`, `--nb-lavender`, etc.)
- Components bypassed: `nb-badge` (100%), `nb-select` for sort UI
- Components overridden with `!important`: `nb-card` border-radius
- Custom building blocks hand-built: logo box, pill/badge row, salary stat, recruiter row, decorative patterns

---

## Next Session Checklist

- [ ] Analyze 1–2 more real-world use cases (suggest: pricing table, testimonial grid) to validate primitive list
- [ ] Lock final primitive list + APIs
- [ ] Fix `nb-badge`: add `gap-1.5`, document CSS variables as public API
- [ ] Design `nb-media` component API
- [ ] Design `nb-stat` component API
- [ ] Design `nb-avatar-row` or improved `nb-avatar` API
- [ ] Decide release scope (docs-first vs v0.2.0)
- [ ] Build + ship
