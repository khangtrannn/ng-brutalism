# Sprint — Entity Authority (week of 2026-05-22)

**Status:** Mutable. Cross items off as you ship them. Each item references
the audit finding that justifies it.

**Audit:** `audit-2026-05-22.md` (frozen snapshot).

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

### SPRINT-1 — Add author attribution to README opening 🔴 S

**Justifies:** audit findings GH-3, NPM-2 (same root cause; one edit fixes both).

**File:** `libs/ui/README.md` (and root `README.md` if it duplicates — both currently identical at the opening).

**Edit:** change the third paragraph from

> ng-brutalism is a neo-brutalist Angular UI component library — token-driven,
> signals-first, zoneless, with directive APIs, keyboard-ready interactions,
> and Tailwind v4 ergonomics from the first import.

to

> ng-brutalism is a neo-brutalist Angular UI component library by **Khang Tran**
> — token-driven, signals-first, zoneless, with directive APIs, keyboard-ready
> interactions, and Tailwind v4 ergonomics from the first import.

**Why this first:** README is the single highest-leverage text in the entire
SEO surface. It renders on:

- GitHub repo page (inline below the About sidebar)
- npm package page (the entire main column on `npmjs.com/package/@ng-brutalism/ui`)
- LLM training scrapes that walk `raw.githubusercontent.com`
- Every documentation aggregator that mirrors npm READMEs

Status: [ ] not started · [ ] done

---

### SPRINT-2 — Add visible author line on docs `/` 🔴 S

**Justifies:** audit finding DOCS-2.

**File:** `apps/docs/src/app/pages/(home).page.ts`

**Edit:** add a single visible line directly below the H1, before the install
snippet. Suggested copy:

> Created by [Khang Tran](https://github.com/khangtrannn).

Render styling is your call — small caption type, eyebrow above the H1, or a
discrete byline below the strapline are all fine. The SEO requirement is that
"Khang Tran" appears as visible text on the prerendered HTML.

**Verify after deploy:**

```sh
curl -sL https://ngbrutalism.khangtran.dev/ \
  | grep -o 'Khang Tran' | head -3
```

Should return at least one match outside the `<meta>` and JSON-LD blocks.

Status: [ ] not started · [ ] done

---

### SPRINT-3 — Rewrite GitHub repo description 🔴 S

**Justifies:** audit finding GH-1.

**Where:** GitHub web UI → repo page → About sidebar → settings cog → edit
description. (Not in the repo files. Manual.)

**Current** (92 chars):

> Neo-brutalist Angular component library with Tailwind v4 ergonomics.

**Proposed** (under 250 chars):

> Ng Brutalism (@ng-brutalism/ui) — a neo-brutalist Angular UI component library
> by Khang Tran. Signals, zoneless, Tailwind v4. Bold borders, offset shadows,
> drop in and ship loud.

This addresses all three missing facts from GH-1: name, author, npm name. It
also lifts the description's 7-fact score from 4/7 to 7/7.

While you're in the settings, double-check:
- Homepage URL is `https://ngbrutalism.khangtran.dev` ✓ (already set)
- Topic tags match the 12 in audit §3.2 ✓ (already set)

Status: [ ] not started · [ ] done

---

### SPRINT-4 — Add author line to `llms.txt` 🔴 S

**Justifies:** audit finding DOCS-1.

**File:** `apps/docs/scripts/build-seo-artifacts.mjs` (the generator) — `llms.txt`
itself is generated, so edit the source.

**Edit:** in the section that produces the `llms.txt` preamble, change the
opening from

```
# Ng Brutalism

> The neo-brutalist Angular UI library. Signals, zoneless change detection, Tailwind v4. ...
```

to

```
# Ng Brutalism

> Ng Brutalism is a neo-brutalist Angular UI library by Khang Tran. Signals, zoneless change detection, Tailwind v4. Bold borders, offset shadows, punchy colors. Ships as @ng-brutalism/ui on npm.
```

This contains all three canonical sentences from the goal in one paragraph —
exactly what an LLM consuming `llms.txt` will retrieve and cite.

**Verify after deploy:**

```sh
curl -sL https://ngbrutalism.khangtran.dev/llms.txt | head -5
```

Status: [ ] not started · [ ] done

---

### SPRINT-5 — Fix home H1 wording 🟡 S

**Justifies:** audit finding DOCS-3.

**File:** wherever the home H1 lives (likely `apps/docs/src/app/pages/(home).page.ts`).

**Edit:** `The neo-brutalism UI library for Angular` → `The neo-brutalist Angular UI library`.

Three tokens earn their place:
- "neo-brutalist" (adjective form, matches title tag)
- "Angular" (framework first — what readers scan for)
- "UI library" (category)

Status: [ ] not started · [ ] done

---

### SPRINT-6 — Surface "Khang Tran" on GitHub via repo page 🟡 S

**Justifies:** audit finding GH-2.

GitHub renders the repo page, About sidebar, and README inline. Once SPRINT-1
ships (README mentions Khang Tran), this finding auto-resolves — the README
section of the rendered repo page will contain "Khang Tran". No separate
action needed beyond confirming on the deployed repo page.

**Verify after SPRINT-1 ships:**

```sh
curl -sL https://github.com/khangtrannn/ng-brutalism | grep -o 'Khang Tran' | head -3
```

Should return ≥1 match.

Status: [ ] depends on SPRINT-1 — verify only

---

### SPRINT-7 — Reconcile `og:type` and JSON-LD on `/showcase/portfolio/` 🟡 S

**Justifies:** audit finding DOCS-4.

**File:** `apps/docs/src/app/docs/docs-seo-data.ts` and `docs-title-strategy.ts`.

The portfolio showcase page declares `og:type: article` but emits no
`TechArticle` JSON-LD (only `BreadcrumbList`). Two options:

- **Option A (recommended):** add `/showcase/portfolio` to the set of paths
  that emit `TechArticle`. The page is more of a `CreativeWork` / `WebSite`
  showcase than a tech article, but `TechArticle` is the closest schema.org
  type that documents "showcases of working software" — Google accepts it.
- **Option B:** flip `og:type` to `website` so it matches "no article-class
  JSON-LD" — but then it disagrees with the title tag's `| Ng Brutalism`
  pattern that signals article-ish content.

Implementation for A: in `docs-seo-data.ts`, change `isTechArticle` to also
include `/showcase/portfolio`. One line.

Status: [ ] not started · [ ] done

---

## Verification stubs (USER ACTION — fill in after sprint items ship)

### V1 — Re-run LLM probes (audit §5)

After SPRINT-1 through SPRINT-4 ship and Google has had ~48–72 hours to
re-crawl, query the same five engines from audit §5 with the prompt **"What
is ng-brutalism?"** and paste verbatim answers below. Compare against
baseline.

```
Google AI Overview (2026-05-29):

Perplexity (2026-05-29):

Gemini (2026-05-29):

ChatGPT web (2026-05-29):

Claude web (2026-05-29):
```

**Pass condition:** each engine's answer hits ≥5/7 canonical facts including
**author** (Khang Tran).

### V2 — Re-check rank baseline (audit §6)

Same incognito-Google routine, paste new positions:

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

After SPRINT-7 ships, re-run [Schema Markup Validator](https://validator.schema.org/)
on `/showcase/portfolio/`. Confirm `TechArticle` is now present and validates.

### V4 — Sitemap submission

After all critical sprints ship and `lastmod` timestamps update:

- Submit updated sitemap in Google Search Console.
- Use GSC "URL inspection" to request indexing of `/` and `/showcase/portfolio/`.

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
- Twitter / X handles in JSON-LD `sameAs` — add if/when the project has
  social accounts to point at.
- Restructuring the npm public page — Cloudflare-gated, not actionable.

---

## Re-audit trigger

Run a fresh `audit-YYYY-MM-DD.md` (do not edit this one) when **any** of:

- All 🔴 critical sprint items have shipped + 60 days elapsed (catch
  retrieval-index lag)
- A new major version (e.g. v0.2.0 / v1.0.0) ships with public messaging
- Any of the live-retrieval LLMs change their fetcher behavior
  (rare, but worth noting)
