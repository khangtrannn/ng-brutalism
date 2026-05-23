# SEO Progress — Live Status

> **This file is always current.** Update the metrics block and add a shipped-log
> entry at the start of any session that touches SEO-adjacent work — even if the
> primary goal is performance, accessibility, analytics, or deployment.
>
> **What counts as SEO-relevant:**
> rankings · structured data · sitemap · llms.txt · Core Web Vitals / Lighthouse
> scores · accessibility (a11y affects ranking) · external backlinks · social
> signals · analytics wiring · meta tags · JSON-LD · caching / TTFB
>
> **Ritual:** open this file first, update the metrics section with today's date,
> log what shipped, then work.

---

## Current metrics (last updated: 2026-05-23)

| Signal | Value | Delta from launch (2026-05-22) |
|---|---|---|
| GitHub stars | 12 | +7 |
| npm weekly downloads | 231 | first reading |
| Sitemap URLs (live) | 20 | — |
| Google indexed URLs | pending GSC | — |
| awesome-angular PR | **MERGED** ✅ | — |
| bestofjs | **Gated at 100 stars** (currently 12, need +88) | ❌ was planned as "done" |
| Docs homepage — Desktop Perf / A11y | 100 / 100 | ↑ from 91 / 95 |
| Portfolio — Mobile / Desktop Perf | 98 / 100 | ↑ from 66 / 90 |
| Portfolio mobile LCP | 1.9s | ↓ from 7.0s |

---

## Pending (next actions)

| Priority | Item | Gate / deadline |
|---|---|---|
| 🔴 | Angular Weekly (ng-news, Rainer Hahnenkamp) — submit for inclusion | Submit ASAP; high-intent Angular audience, best star-growth channel |
| 🟡 | 72h verification (LLM probes, rank baseline, star/download delta) | Run ~72h after Angular Weekly goes out |
| 🟡 | bestofjs listing | Gate: 100 stars (currently 12) |
| 🟢 | GSC URL inspection: request re-index of `/` and `/showcase/portfolio/` | User action, after GSC finishes processing |
| ~~🟡~~ | ~~Show HN~~ | **DROPPED** — poor audience fit; see sprint-launch-day.md |

---

## Shipped log

> One line per SEO-relevant change. Include commit hash, date, and the SEO
> consequence. Future-you will thank present-you.

### 2026-05-23 (session 2)

- **FAQPage JSON-LD on `/docs/faq/`**: 9-item `FAQPage` structured data block added to `DocsTitleStrategy`. Unlocks Google FAQ rich results for the FAQ page. Data lives in `FAQ_ITEMS` constant in `docs-seo-data.ts`. Shipped alongside `TechArticle` + `BreadcrumbList` already on that route.
- **`MODIFIED_DATE` updated to 2026-05-23**: All `TechArticle` JSON-LD blocks now reflect the correct last-modified date (was `2026-05-21`, pre-launch).
- **`Person.sameAs` expanded**: LinkedIn (`linkedin.com/in/khangtrann`) and GitHub profile (`github.com/khangtrannn`) added alongside X. Both `SoftwareApplication.author` and `TechArticle.author` blocks updated. GitHub is fully crawlable (unlike X which returns 403 to bots), strengthening entity binding.

### 2026-05-23 (session 1)

- **Analytics wiring** (`6bc9e7e`): Cloudflare Web Analytics beacon added to
  `index.html`. Async, no Lighthouse impact. Enables real traffic data for
  kill-criterion V1–V4 verification on 2026-05-29. Copy-event tracking wired
  via D1 Worker.

- **Portfolio `@defer` lazy load** (`0ea9133`): OpenLayers deferred on
  viewport. Portfolio mobile Perf 87 → 98; desktop 100 (unchanged). Mobile
  LCP 1.9s maintained. **CWV impact:** mobile performance score is a Google
  ranking signal.

- **Pagination contrast a11y fix** (`9b50098`): White-on-pink → black-on-pink
  on pagination cards. All `/docs/*` pages: A11y 95 → 100. **a11y → SEO:**
  Lighthouse Accessibility score is a minor direct ranking signal and a strong
  proxy for crawlability.

- **Image optimization + lazy loading** (`dbb5e8c`): WebP responsive images
  for portfolio hero, nav logo, and project cards. LCP 7.0s → 1.9s (mobile),
  1.9s → 0.6s (desktop). `loading="lazy"` + `decoding="async"` on below-fold
  images. `fetchpriority="high"` on LCP image. **CWV impact:** LCP is the
  primary Google CWV ranking factor.

- **Cloudflare Pages migration + caching** (`c55b745`, `3355db4`): Moved from
  GitHub Pages (10-min TTL hard-coded) to Cloudflare Pages with `_headers`.
  Hashed assets: 1-year immutable cache. HTML: `must-revalidate`. **CWV
  impact:** ~563KB savings on repeat visits; CDN edge reduces TTFB globally.

### 2026-05-22

- All 7 entity-authority sprint items shipped (author attribution across all
  surfaces). See `sprint-entity-authority.md` for details.
- X profile updated + JSON-LD `Person.url` / `Person.sameAs` wired (`20941f6`).
- awesome-angular PR #2200 filed (merged 2026-05-23 — see above).
- bestofjs issue #439 filed (michaelrambeau: gated at 100 stars).
- r/Angular2 launch post: #1 post on the sub.
- LinkedIn launch post.
- FAQ page `/docs/faq/` shipped — content-depth exception approved in
  `sprint-launch-day.md`.

---

## Core Web Vitals — current state

PLAN.md marked CWV as "out of scope." It has been partially shipped as a side
effect of the performance sprint. Recording here so future audits have a
reference baseline.

| Page | Mobile Perf | Desktop Perf | Mobile LCP | Desktop LCP |
|---|---|---|---|---|
| `/` | 99 | 100 | 1.5s | 0.5s |
| `/docs/introduction` | 80 | 98 | — | 0.7s |
| `/showcase/portfolio` | 98 | 100 | 1.9s | 0.7s |

Source: `docs/performance/lighthouse-improvements.md` (May 2026 runs).
Mobile 80 floor on `/docs/introduction` is Angular TBT (770ms) — unfixable
without framework-level changes.

---

## History / related files

| File | Purpose | Mutable? |
|---|---|---|
| `PLAN.md` | Master plan + decisions from 2026-05-21 grill-me | No (decisions are frozen) |
| `audit-2026-05-22.md` | External SEO snapshot — npm, GitHub, docs site | No (frozen snapshot) |
| `sprint-entity-authority.md` | Author-attribution punch list (all shipped) | Yes (cross off items) |
| `sprint-launch-day.md` | Launch-week execution (Fri 2026-05-22 → Tue 2026-05-26) | Yes (cross off items) |
| `progress.md` (this file) | **Always-current state. Update every session.** | Yes — always |
| `docs/performance/lighthouse-improvements.md` | CWV fix log with before/after scores | Yes |
