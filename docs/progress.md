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
**Status:** v0.3 Track 1 complete. Wave 1 of CSS-in-styles rollout complete (all 3 accordion components).
**Last action:** NbCallout pilot landed for the token-customization migration: radius/shadow now write public CSS variables, tone is semantic `data-tone`, and the new style-input helpers are in place.
**Next:** Wave 2 — `NbBadge`, `NbAvatar`, `NbLabel`, `NbCard` sub-components, `NbImageCard`. Then Track 2 NbTabs. Decisions: scalar inputs write public CSS variables, semantic inputs use `data-*`, and tone recipes stay CSS-owned.
**Goal:** All primitives migrated to component CSS pattern before v0.3 interactive components land.
→ Plan: `docs/architecture/v0.3-refactor-plan.md` · Arch: `docs/architecture/token-customization.md`

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

## Release
**Status:** v0.1.0 + v0.1.1 shipped to npm. v0.2.0 implementation complete: 10 primitives + docs + 7 recipes (added Open to Work Card profile recipe).
**Next:** Visual QA, bump version in libs/ui, run `docs/release/RELEASE.md` runbook (tag → GitHub release → npm publish).
→ Plan: `docs/release/v0.2.0-plan.md`
