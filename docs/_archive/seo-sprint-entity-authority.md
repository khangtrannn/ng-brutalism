# Sprint — Entity Authority (week of 2026-05-22)

**Status:** Mutable. Cross items off as you ship them. Each item references
the audit finding that justifies it.

**Audit:** `audit-2026-05-22.md` (frozen snapshot).

**Shipping snapshot (2026-05-22):** all 7 sprint items shipped. SPRINT-3 was
completed via `.github/repository.json` + `pnpm sync:repo-metadata`; GSC
indexing is currently processing, so rank baseline (V2) and LLM probe (V1)
re-checks should wait until the index settles plus the recommended 48–72 hr
re-crawl window.

| Sprint | Status | Where |
|---|---|---|
| SPRINT-1 README author section | ✅ shipped | `libs/ui/README.md`, root `README.md` |
| SPRINT-2 home byline | ✅ shipped | `apps/docs/src/app/pages/(home).page.ts` |
| SPRINT-3 GitHub description | ✅ shipped | `.github/repository.json` + GitHub repo settings |
| SPRINT-4 `llms.txt` preamble | ✅ shipped | `apps/docs/scripts/build-seo-artifacts.mjs` |
| SPRINT-5 home H1 wording | ✅ shipped | `apps/docs/src/app/pages/(home).page.ts` |
| SPRINT-6 GitHub repo page author | ✅ auto-resolved by SPRINT-1 | — |
| SPRINT-7 portfolio TechArticle | ✅ shipped | `apps/docs/src/app/docs/docs-seo-data.ts` |

**Goal (verbatim from audit §0.1):** When a user asks a live-retrieval engine
*"What is ng-brutalism?"*, the answer converges on:

> *"Ng Brutalism is a neo-brutalist Angular UI library by Khang Tran. Built
> with signals, zoneless change detection, and Tailwind v4. It ships as
> `@ng-brutalism/ui` on npm."*

**One-line summary of the audit's headline finding:** the author name "Khang
Tran" is missing from the *visible body text* of every primary crawled
surface except `/showcase/portfolio/`. Most of this sprint is closing that gap.

---

## Punch list (ordered by impact-per-minute)

### SPRINT-1 — Add author attribution to README ✅ shipped 2026-05-22

**Justifies:** audit findings GH-3, NPM-2 (same root cause; one edit fixes both).

**File:** `libs/ui/README.md` + root `README.md`.

**As shipped:** rather than editing the opening paragraph, a dedicated `## Author`
section was inserted between the FAQ and `## Status`. Opening product copy was
left untouched.

```md
## Author

Created by [Khang Tran](https://github.com/khangtrannn).
```

**Why the deviation:** putting "by Khang Tran" in the opening paragraph read as
duplicative on the GitHub view (where the repo owner breadcrumb already
identifies the author by username), and read awkwardly when combined with the
home-page byline. A dedicated section keeps the author string present for the
surfaces that lack GitHub chrome — npm package page, raw README scrapes,
aggregators — without doubling up on the GitHub-rendered view.

**Why this first:** README is the single highest-leverage text in the entire
SEO surface. It renders on:

- GitHub repo page (inline below the About sidebar)
- npm package page (the entire main column on `npmjs.com/package/@ng-brutalism/ui`)
- LLM training scrapes that walk `raw.githubusercontent.com`
- Every documentation aggregator that mirrors npm READMEs

Status: [x] done

---

### SPRINT-2 — Add visible author line on docs `/` ✅ shipped 2026-05-22

**Justifies:** audit finding DOCS-2.

**File:** `apps/docs/src/app/pages/(home).page.ts`

**As shipped:** a small-caption byline rendered directly below the H1, styled
to match the existing eyebrow type (mono, uppercase, tracked):

```html
<p class="mt-5 font-mono text-xs font-bold tracking-[0.08em] uppercase">
  Created by
  <a … href="https://github.com/khangtrannn" target="_blank" rel="noreferrer">
    Khang Tran
  </a>
</p>
```

Hero description paragraph was left as the original product copy (no second
"by Khang Tran") — the byline is the canonical attribution; doubling up read
awkward.

**Verify after deploy:**

```sh
curl -sL https://ngbrutalism.khangtran.dev/ \
  | grep -o 'Khang Tran' | head -3
```

Expect: 2 matches — one in the visible byline and one in the
`SoftwareApplication` JSON-LD author block. The `<meta name="author">` tag
also carries it but won't match this exact string in casing/context.

Status: [x] done

---

### SPRINT-3 — Rewrite GitHub repo description ✅ shipped 2026-05-22

**Justifies:** audit finding GH-1.

**Where:** `.github/repository.json`, synced to GitHub repo settings with
`pnpm sync:repo-metadata`.

**Current** (92 chars):

> Neo-brutalist Angular component library with Tailwind v4 ergonomics.

**Originally proposed** (under 250 chars):

> Ng Brutalism (@ng-brutalism/ui) — a neo-brutalist Angular UI component library
> by Khang Tran. Signals, zoneless, Tailwind v4. Bold borders, offset shadows,
> drop in and ship loud.

**As shipped:**

> Ng Brutalism (@ng-brutalism/ui) - a neo-brutalist Angular UI component library.
> Signals, zoneless, Tailwind v4. Bold borders, offset shadows, drop in and ship
> loud.

The final copy intentionally omits "by Khang Tran" because GitHub already
renders owner context and the README now carries the full author attribution.
It still closes the project-name and npm-package gaps from GH-1 while keeping
the About text tighter.

While you're in the settings, double-check:
- Homepage URL is `https://ngbrutalism.khangtran.dev` ✓ (already set)
- Topic tags match the 12 in audit §3.2 ✓ (already set)

Status: [x] done

---

### SPRINT-4 — Add author line to `llms.txt` ✅ shipped 2026-05-22

**Justifies:** audit finding DOCS-1.

**File:** `apps/docs/scripts/build-seo-artifacts.mjs` (the generator).

**As shipped:** preamble rewritten to embed all three canonical sentences plus
an explicit `Author:` reference line.

```
# Ng Brutalism

> Ng Brutalism is a neo-brutalist Angular UI library by Khang Tran. Built with signals, zoneless change detection, and Tailwind v4. It ships as @ng-brutalism/ui on npm. Bold borders, offset shadows, punchy colors.

- Author: Khang Tran (https://github.com/khangtrannn)
- Repository: https://github.com/khangtrannn/ng-brutalism
- npm: https://www.npmjs.com/package/@ng-brutalism/ui
- License: MIT
```

This contains all three canonical sentences from the goal in one paragraph —
exactly what an LLM consuming `llms.txt` will retrieve and cite.

**Verify after deploy:**

```sh
curl -sL https://ngbrutalism.khangtran.dev/llms.txt | head -10
```

Status: [x] done

---

### SPRINT-5 — Fix home H1 wording ✅ shipped 2026-05-22

**Justifies:** audit finding DOCS-3.

**File:** `apps/docs/src/app/pages/(home).page.ts`.

**As shipped:** H1 restructured to read `The neo-brutalist Angular UI library`
across three lines, with the existing yellow "Angular" pill kept as the visual
hook between "neo-brutalist" and "UI library". `aria-label` updated to match.

```
The neo-brutalist
[Angular]
UI library
```

Three tokens earn their place:
- "neo-brutalist" (adjective form, matches title tag)
- "Angular" (framework — what readers scan for, also the visual anchor)
- "UI library" (category)

Status: [x] done

---

### SPRINT-6 — Surface "Khang Tran" on GitHub via repo page ✅ auto-resolved via SPRINT-1

**Justifies:** audit finding GH-2.

GitHub renders the repo page, About sidebar, and README inline. SPRINT-1 added
the `## Author` section to the README, which the repo page now renders inline.
No separate action needed.

**Verify after SPRINT-1 ships (push merged to `main`):**

```sh
curl -sL https://github.com/khangtrannn/ng-brutalism | grep -o 'Khang Tran' | head -3
```

Should return ≥1 match.

Status: [x] resolved (verify only)

---

### SPRINT-7 — Reconcile `og:type` and JSON-LD on `/showcase/portfolio/` ✅ shipped 2026-05-22

**Justifies:** audit finding DOCS-4.

**File:** `apps/docs/src/app/docs/docs-seo-data.ts`.

**As shipped:** Option A — `isTechArticle` now matches `/showcase/portfolio`
in addition to `/docs/*` and `/components/*`. Prerendered
`showcase/portfolio/index.html` now contains a `TechArticle` JSON-LD block,
so `og:type=article` and the structured data agree.

```ts
const isTechArticle =
  path.startsWith('/docs/') ||
  path.startsWith('/components/') ||
  path === '/showcase/portfolio';
```

Status: [x] done

---

## Verification stubs (USER ACTION — fill in after sprint items ship)

### V1 — Re-run LLM probes (audit §5)

**Gate:** wait until GSC reports "Indexing: completed" (currently still
"processing data") AND ~48–72 hr have elapsed since the post-deploy crawl, so
LLM retrieval engines have a chance to pick up the new content. Then query
the same five engines from audit §5 with the prompt **"What is ng-brutalism?"**
and paste verbatim answers below. Compare against baseline.

```
Google AI Overview (2026-05-29):

Perplexity (2026-05-29):

Gemini (2026-05-29):

ChatGPT web (2026-05-29):

Claude web (2026-05-29):
```

**Pass condition:** each engine's answer hits ≥5/7 canonical facts including
**author** (Khang Tran).

#### Partial launch-day probe — 2026-05-22

Prompt: **"What is ng-brutalism?"**

Purpose: early entity-recognition smoke test, not the formal 72h V1. Full V1
still runs on 2026-05-29 after Show HN + additional crawl time.

| Engine | Result | Score vs canonical facts | Notes |
|---|---|---:|---|
| Perplexity | Entity recognized | 5/7 | Correctly described `ng-brutalism` as a neo-brutalist Angular UI component library with directive-first APIs, signal-friendly internals, zoneless architecture, Tailwind v4 compatibility, CSS tokens, and component examples. Missed author (`Khang Tran`) and npm package name (`@ng-brutalism/ui`). |
| ChatGPT with web | Entity missed | 0/7 | Answered generic neo-brutalism / UI design style, not the library. Mentioned Tailwind as a commonly associated tool but did not identify Angular, package, author, docs, or project. |
| Claude with web | Entity missed | 0/7 | Answered generic neo-brutalism / neubrutalism design trend. Did not identify the Angular library, package, author, docs, or project. |

**Interpretation:** early LLM/entity recognition is weak but not zero.
Perplexity has picked up enough launch-day surface to identify the library;
ChatGPT and Claude still collapse the query into the generic design-style
meaning. This is expected for a fresh no-history project and reinforces the
need for the two longer-horizon surfaces opened today: awesome-angular PR
#2200 and bestofjs issue #439.

### V2 — Re-check rank baseline (audit §6)

**Gate:** wait until GSC indexing finishes processing. The dashboard
currently reads *"indexing: processing data, please check again in a day or
so"* — running the rank baseline before the index settles produces noise.
Then same incognito-Google routine, paste new positions:

```
T1 — ng-brutalism:             before [    ]  →  after [    ]
T1 — ng brutalism:             before [    ]  →  after [    ]
T1 — @ng-brutalism/ui:         before [    ]  →  after [    ]
T2 — angular brutalism:        before [    ]  →  after [    ]
T2 — neobrutalism angular:     before [    ]  →  after [    ]
T2 — brutalist angular components: before [    ]  →  after [    ]
T2 — neo-brutalist angular ui library: before [    ]  →  after [    ]
```

**Pass condition (audit §0.1 thresholds):** T1 ≤ 3, T2 ≤ 10.

### V3 — Schema validators (audit §4.7)

Re-run [Schema Markup Validator](https://validator.schema.org/) on
`/showcase/portfolio/`. Confirm the newly-emitted `TechArticle` block is
present and validates. Also re-validate `/` and `/components/button/` since
the home page DOM changed (byline + H1 restructure) — no JSON-LD shape change
expected, but worth a quick re-check.

### V4 — Sitemap submission

`lastmod` timestamps refreshed on the SPRINT-2/5 deploy. Once GSC moves out
of "processing data":

- Submit updated sitemap in Google Search Console.
- Use GSC "URL inspection" to request indexing of `/` and `/showcase/portfolio/`.
- SPRINT-3 has landed; re-fetch the GitHub repo page on the next audit to
  confirm the synced description remains live.

---

## Out of scope for this sprint

Captured here so a future audit can tell what was deliberately deferred vs.
forgotten:

- T3 / T4 ranking (`angular ui library`, `angular component library`) — these
  are 12+ month domain-authority work; on-page changes don't move them
  meaningfully.
- Dynamic per-page OG images (PLAN.md goal B, already deprioritized).
- New backlink campaigns (Reddit, dev.to, awesome-angular PRs) — off-site work.
- Core Web Vitals / Lighthouse perf — separate ticket, needs real-device
  measurement.
- Additional social handles beyond X — add later only if they become stable
  entity surfaces worth asserting in JSON-LD.
- Restructuring the npm public page — Cloudflare-gated, not actionable.

---

## Re-audit trigger

Run a fresh `audit-YYYY-MM-DD.md` (do not edit this one) when **any** of:

- All 🔴 critical sprint items have shipped + 60 days elapsed (catch
  retrieval-index lag)
- A new major version (e.g. v0.2.0 / v1.0.0) ships with public messaging
- Any of the live-retrieval LLMs change their fetcher behavior
  (rare, but worth noting)
