# Library Improvement Roadmap — Brutalist Primitives

**Status:** Primitive list locked (2026-05-24 grill session #2). Ready to build.

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

## How the Primitive List Was Derived

The final primitive list was validated against 10 real-world UI scenarios (pricing table, testimonial grid, team directory, analytics dashboard, e-commerce product card, blog article card, event listing, recipe card, social profile card, job board). Each scenario was decomposed bottom-up into atomic visual units — no preconceptions — and patterns were counted across scenarios.

| Pattern | Scenarios | Verdict |
|---|---|---|
| Bounded image container | 6/10 | → `nb-media` |
| Stat / number display | 6/10 | → `nb-stat` |
| Compact media row | 5/10 | → `nb-media-item` |
| Attribution row (avatar + name + meta) | 5/10 | Dismissed — just `nb-avatar` + raw HTML |
| Star / review rating | 4/10 | → `nb-rating` |
| Icon + text pair | 6/10 | Dismissed — no built-in icon system; use `nb-label` |
| Badge / tag | 9/10 | Already exists — needs icon gap fix |

---

## Final Primitive List (locked)

### v0.1.3 — patch
| Primitive | Change |
|---|---|
| **`nb-badge`** | Add `gap-1.5` for icon+text layout; document `--nb-badge-bg` / `--nb-badge-fg` / `--nb-badge-border` / `--nb-badge-radius` / `--nb-badge-shadow` as public API |
| **CSS variables** | Document all component-scoped tokens as public API across all components |

### v0.2.0 — minor (new components)
| Primitive | What it is | API notes |
|---|---|---|
| **`nb-media`** | Bordered, shadowed container for any media — image, logo, icon, screenshot | CSS vars for size, border, shadow, radius; content projected |
| **`nb-stat`** | Stylized data display — icon (optional) + large value + small label | Icon via optional projected slot; `value` and `label` as inputs or projected |
| **`nb-media-item`** | Compact media row — icon/image + title + optional description | Shared primitive for feature lists, specs, chips, and contact rows |
| **`nb-rating`** | N filled/unfilled stars + optional count | `value` input (0–5), `max` input, `count` input; read-only display |

---

## Decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Release versioning | v0.1.3 patch + v0.2.0 minor | Semver: fixes are patch, new components are minor |
| Fix nb-badge | Extend in place — add `gap-1.5`, document CSS vars as public API | Quick win; ships in v0.1.3 |
| Document CSS variables | Expose all component-scoped tokens as public API in docs | Discoverability is severe enough that even Claude missed them |
| Card layout direction | Universal primitives + docs examples, NOT domain-specific components | Cannot predict all domains; composition over specialization |
| nb-avatar-row | Dismissed — not a primitive | Just `nb-avatar` + raw HTML layout; no distinct brutalist treatment needed |
| Icon + text pair | Dismissed — not a primitive | No built-in icon system; users bring their own icon + `nb-label` |
| nb-stat icon | Optional projected slot, not a built-in | Consistent with no-built-in-icon policy |
| Primitive list scope | Lock at 4 new components for v0.2.0, expand in v0.2.1+ based on real usage | Avoid scope creep; validate with job board refactor first |

---

## Build Checklist

### v0.1.3
- [ ] Fix `nb-badge`: add `gap-1.5` to base classes
- [ ] Document all CSS variables as public API in docs (all 15 existing components)
- [ ] Release v0.1.3

### v0.2.0
- [ ] Build `nb-rating` (simplest — stars display, value/max inputs)
- [ ] Build `nb-media` (bordered container, CSS vars for size/border/shadow/radius)
- [ ] Build `nb-stat` (value + label inputs, optional icon slot, brutalist typography)
- [x] Build `nb-media-item` (icon/image + title + description, variants, tones, sizes)
- [ ] Refactor job board demo to use new components
- [ ] Write docs composition examples (job card, profile card, etc.)
- [ ] Release v0.2.0

---

## Source Evidence

- Job board app: `~/ng-brutalism-job-board/src/app/` (443-line template, 1,446-line CSS)
- Custom CSS variables defined: 10 colors (`--nb-cream`, `--nb-pink`, `--nb-mint`, `--nb-lavender`, etc.)
- Components bypassed: `nb-badge` (100%), `nb-select` for sort UI
- Components overridden with `!important`: `nb-card` border-radius
- Custom building blocks hand-built: logo box, pill/badge row, salary stat, recruiter row, decorative patterns
