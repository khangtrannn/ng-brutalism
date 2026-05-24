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
| `docs/seo/PLAN.md` | Master strategy + decisions from 2026-05-21 grill session | No (decisions frozen) |
| `docs/seo/sprint-launch-day.md` | Launch-week execution (2026-05-22 → 2026-05-26) | Yes |
| `docs/seo/sprint-entity-authority.md` | Author-attribution punch list | Yes |
| `docs/seo/sprint-devto-article.md` | dev.to article + StackBlitz demo plan (next sprint) | Yes |
| `docs/seo/audit-2026-05-22.md` | Frozen external audit snapshot | No |

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
| `docs/components/primitives-roadmap.md` | Brutalist primitives roadmap — failure modes, decisions, candidate primitives, next steps | Yes |
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

`docs/_archive/` contains: `RELEASE_PLAN_v0.1.0.md`, `LAUNCH_v0.1.0.md`, `MIGRATION_TO_NG21.md`, `PRE_RELEASE_AUDIT.md`, `RELEASE_NOTES_v0.1.0.md`, `TOKENS.md`, `TOKENS-ROLLOUT.md`.
