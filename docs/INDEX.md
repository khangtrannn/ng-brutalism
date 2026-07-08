# Docs Index

Agent session protocol:
1. Read this file to identify relevant domains for the current task.
2. Read `docs/progress.md` for live status across all domains.
3. Read the listed domain files only if the domain is relevant.
4. After completing work in any domain: update `docs/progress.md` summary + that domain's `progress.md`.

---

## SEO
**When to read:** working on meta tags, structured data, sitemap, `llms.txt`, keyword rankings, Open Graph, JSON-LD, search console, backlinks, social signals, Show HN / launch posts.

| File | Purpose | Mutable? |
|---|---|---|
| `docs/seo/progress.md` | Live metrics, pending actions, shipped log — **read first** | Yes |
| `docs/seo/sprint-devto-article.md` | dev.to article + StackBlitz handoff checklist | Yes |
| `docs/seo/devto-article-draft.md` | Draft article pending screenshot, StackBlitz URL, and publication | Yes |

---

## Performance
**When to read:** working on Lighthouse scores, Core Web Vitals, LCP, TBT, lazy loading, image optimization, bundle size, caching, TTFB, prerendering.

| File | Purpose | Mutable? |
|---|---|---|
| `docs/performance/progress.md` | Live scores + pending work — **read first** | Yes |
| `docs/performance/lighthouse-improvements.md` | Historical audit results, before/after scores, playbook | Yes |

---

## Deployment
**When to read:** working on Cloudflare Pages, GitHub Actions, deploy workflow, DNS, `_headers`, wrangler, domain config.

| File | Purpose | Mutable? |
|---|---|---|
| `docs/deployment/DEPLOY.md` | Deployment instructions and current config | Yes |

---

## Analytics

**When to read:** working on Cloudflare Web Analytics, D1 copy events, traffic reports, usage signals, visitor/source/page metrics.

| File | Purpose | Mutable? |
|---|---|---|
| `docs/analytics/README.md` | How to generate and interpret local analytics reports | Yes |
| `docs/analytics/reports/` | Generated weekly analytics reports | Yes |

---

## Components
**When to read:** working on UI primitives, component API design, design system decisions, contact dialog, input-group, select.

| File | Purpose | Mutable? |
|---|---|---|
| `docs/components/design-props.md` | **Canonical entry point** — design-prop vocabulary (7 categories), 5 archetypes, per-component prop matrix, standard-input vs CSS-only-hook tiers | Yes |
| `docs/components/composition-philosophy.md` | ng-brutalism + `nbText` + Tailwind boundary — when to add an input vs. reach for Tailwind | Yes |
| `docs/architecture/token-customization.md` | Current CSS-first token customization architecture — rationale, rules, and accepted direction | Yes |
| `docs/architecture/library-audit-2026-07-08.md` | Library implementation audit — strengths, severity-ranked findings, and next-action plan | No |
| `docs/components/contact-dialog/PLAN.md` | Contact dialog redesign — status + design decisions | Yes |
| `docs/adr/0001-dialog-native-element.md` | ADR: why native `<dialog>` over overlay approach | No |
| `CONTEXT.md` (root) | Project glossary — `Nb` prefix, v0.x contract, CSS transform patterns | Yes |

---

## Release
**When to read:** working on npm publishing, versioning, changelogs, GitHub releases, v0.2+ planning.

| File | Purpose | Mutable? |
|---|---|---|
| `CHANGELOG.md` (root) | Running changelog — update on every release | Yes |
| `docs/release/RELEASE.md` | Step-by-step release runbook (build → tag → GitHub release → npm publish) | Yes |

---

## Archive
Completed work — read-only historical reference.

`docs/_archive/` contains completed release plans, launch plans, frozen audits,
superseded architecture plans, and dated SEO sprint artifacts. Check there for
historical context such as v0.1/v0.2 planning, the 2026-05-22 SEO audit, the
2026-07-06 design-system audit and 2026-07-07 refactor plan, the v0.3 refactor
plan and customization-flexibility extensions, token customization migration
notes, CSS co-location audits, and design-props rollout history.
