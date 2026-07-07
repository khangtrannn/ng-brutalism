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
**Status:** Design-system audit (2026-07-06) + refactor plan (2026-07-07) landed. Refactor Phases 1–2 complete: release blockers cleared, Tailwind is now an optional peer, `/tokens` entry point shipped, API guard added.
**Last action:** Phase 2 shipped (uncommitted): Tailwind → optional peer; `body`/reset rules moved into `@layer base` with opt-in `.nb-root` scope for page colors; select's outside-click listener now gates on `open()` via `effect()` instead of an always-on per-instance document listener; every public directive/component declares `exportAs`; `@angular-devkit/schematics` dropped as a runtime dep (confirmed via a real pnpm `ng add` that it's already reachable through pnpm's hoisted layer); new `@ng-brutalism/ui/tokens` secondary entry point (token types/resolvers/`NbThemeConfig`/provider physically moved to `libs/ui/tokens/`, root re-exports for compat, verified no DI-token duplication across bundles); new `tools/api-guard/run.mjs` + `pnpm api-guard`/`api-guard:update` snapshot-diffs each entry point's `.d.ts` in CI; schematics-assembly assertion added to `tools/package-smoke/run.mjs`.
**Next:** Phase 3 (token/theming redesign — tone.css literals through vars, `NbTone` semantic/palette split, motion tokens, reduced-motion rework, dark-mode decision).
**Goal:** ✅ Hardening completed (Phases 0–8). ✅ Design-props coverage completed. ✅ Refactor Phases 1–2 complete.
→ Arch: `docs/architecture/token-customization.md` · Design props: `docs/components/design-props.md` · Audit: `docs/architecture/design-system-audit-2026-07-06.md` · Refactor plan: `docs/architecture/design-system-refactor-plan-2026-07-07.md` · History: `docs/_archive/token-customization-hardening.md`, `docs/_archive/design-props-plan.md`

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
**Status:** v0.2.0 package metadata and changelog are present in repo; verify npm/GitHub release state before the next publish.
**Next:** Resolve current lint/test blockers, run visual QA, then follow `docs/release/RELEASE.md` for any publish or patch release.
→ Runbook: `docs/release/RELEASE.md` · Historical scope: `docs/_archive/v0.2.0-plan.md`
