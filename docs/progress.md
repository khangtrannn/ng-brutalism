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
**Status:** Internal style-capability refactor landed on `refactor/internal-style-capabilities`. Shared token contracts + resolvers (`NbRadius`/`NbShadow`/`NbBorderStrength`/`NbSpacing`/`NbPadding`/`NbDivider` + `nbToneVars`) feed 6 internal capability directives composed into 9 primitives via `hostDirectives`. Capabilities write component-specific CSS vars (`--nb-surface-radius`, `--nb-button-radius`, …) through signal-driven `[style]` maps (no `effect()`). Values canonicalized; duplicated maps removed. ui build + 150 tests green.
**Last action:** Refactored Surface/MediaFrame/Button/Chip/Callout/Section/Stack/Cluster/Split. Renamed `nbSection border`→`divider` (+ `borderStyle`→`dividerStyle`); dropped Surface `radius="base"`/`shadow="lifted"`. Architecture + migration summary in `docs/components/style-capabilities.md`.
**Next:** Build docs app + visual QA podcast-card; then resume v0.2.0 release. Follow-up: fold Button tone/variant into tone capability post-1.0.
**Goal:** All 18 reference designs buildable with v0.2.0 primitives (~90% fidelity).
→ Plan: `docs/release/v0.2.0-plan.md` · Arch: `docs/components/style-capabilities.md`

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
**Status:** v0.1.0 + v0.1.1 shipped to npm. v0.2.0 implementation complete: 10 primitives + docs + 6 recipes.
**Next:** Visual QA, bump version in libs/ui, run `docs/release/RELEASE.md` runbook (tag → GitHub release → npm publish).
→ Plan: `docs/release/v0.2.0-plan.md`
