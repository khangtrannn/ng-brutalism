# Project Progress — Dashboard

One-screen status across all active domains. Max 5 lines per section.
For history and details, read the domain's own `progress.md`.

---

## SEO
**Status:** dev.to demo built + article draft done. Khang publishes and adds URL to JSON-LD.
**Last action:** `~/ng-brutalism-job-board/` scaffolded; all 15 components wired; `ng build` clean; full article draft at `docs/seo/devto-article-draft.md`.
**Next:** Khang: screenshot → StackBlitz → post dev.to article → add URL to `sameAs` in `docs-seo-data.ts`.
**Blocking:** bestofjs gated at 100 stars (currently 12).
→ Details: `docs/seo/progress.md`

---

## Performance
**Status:** Lighthouse targets met. Docs homepage 100/100 Perf+A11y. Portfolio mobile 98, desktop 100.
**Last action:** `@defer` lazy load on journey section; image WebP + lazy loading; pagination a11y contrast fix.
**Next:** No active work. Monitor `/docs/introduction` mobile score (floor 80 due to Angular TBT).
→ Details: `docs/performance/lighthouse-improvements.md`

---

## Components
**Status:** Improvement-plan Phases 1–4 landed: type consolidation + public-API export drift closed, export-drift checker gating api-guard, CSS token discipline (border-width var + status-dot reduced-motion + chip text-transform slot), minimum hook-contract check, and JSDoc across the public component API.
**Last action:** Phase 4 JSDoc on every configurable exported component (pure slot markers left uncommented per feedback); api-guard stays green since its normalizer strips comments. Gates green: lint/test/build/api-guard/docs:tokens:check.
**Next:** Release 0.3.0 when ready (no publish this pass). Phase 5 roadmap (Playwright visual-regression → dark theme → Phase 6 primitives) not started.
**Goal:** ✅ Improvement-plan Phases 1–4 complete. Active: Phase 5 roadmap (deferred).
→ Plan: `docs/architecture/library-improvement-plan-2026-07-09.md` · Arch: `docs/architecture/token-customization.md` · Design props: `docs/components/design-props.md` · Frozen audit: `docs/_archive/library-audit-2026-07-08.md`

---

## Deployment
**Status:** Live on Cloudflare Pages at `https://ngbrutalism.khangtran.dev`. Auto-deploy on `main` push.
**Last action:** Migrated from GitHub Pages to Cloudflare Pages (immutable asset caching, edge CDN).
**Next:** No active work.
→ Details: `docs/deployment/DEPLOY.md`

---

## Analytics

**Status:** Local weekly report generator in progress. Combines Cloudflare Web Analytics with D1 copy events.
**Next:** Run `pnpm analytics:report` with Cloudflare env vars and review first committed report.
→ Details: `docs/analytics/README.md`

---

## Docs Site
**Status:** Audit complete (2026-07-10). First P0 fix pass in progress: sidebar chip contrast restored, converted `nb-stat` tiles keep docs typography, interactive surface shadow presses work again, peach tiles restored, API guard snapshot updated.
**Last action:** Corrected the unsafe `DOC_NAV` dead-code claim; `DOC_NAV` is live in sidebar, mobile drawer, and pagination. Fixed stale progress wording for the active fix pass.
**Next:** Continue P0 backlog — finish replacing old `nb-stat-tile` markup instead of carrying compatibility CSS; add `tabindex=0` to scroll regions (39 pages); then move to docs-ui chrome + `docs/comparison`.
→ Details: `docs/docs-site/dogfooding-audit-2026-07-10.md`

---

## Release
**Status:** 0.3.0 finalized in-repo: CHANGELOG `[0.3.0]` complete (callout `lg`→`md` + expanded type surface), `libs/ui/package.json` at 0.3.0, api-guard baseline current. Improvement-plan Phases 1–4 landed. Not tagged/published.
**Next:** Follow `docs/release/RELEASE.md` steps 3–7 (build → tag → GitHub release → npm publish) to ship 0.3.0 when ready.
→ Runbook: `docs/release/RELEASE.md` · Historical scope: `docs/_archive/v0.2.0-plan.md`
