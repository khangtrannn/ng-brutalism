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
**Status:** Design-system audit (2026-07-06) + refactor plan (2026-07-07) landed. Refactor Phase 1 (release blockers) complete: lint/test debt cleared, Critical a11y bug fixed, CI package-smoke added.
**Last action:** Phase 1 shipped (uncommitted): accordion closed-panel content is now `[inert]` (was focusable despite `aria-hidden`); dialog got scroll-lock CSS + a `closed` output for Esc/backdrop state sync; marquee pauses under `prefers-reduced-motion`; `neo-select-*`/`neo-option-*` ids renamed to `nb-*` via a new injectable `NbIdGenerator` (SSR-hydration-safe); removed dead `@source`/escaped Tailwind class from `base.css`; `engines` now allows Node 24; new `pnpm smoke:ui` + CI job builds→packs→`ng add`s→`ng build`s the real artifact. 3 pre-migration-stale specs fixed to match current CSS-first architecture (not reverted to old behavior).
**Next:** Phase 2 (architecture/packaging cleanup — Tailwind optional peer, `body` into `@layer base`, select outside-click gating, `/tokens`+`/class` entry points, API guard). Note: `nbClass`/`class.ts` and its `clsx`+`tailwind-merge` deps were removed from the tree concurrently with this session's work — verify that's an intentional supersede of the refactor plan's 2.4/10.2 `/class`-entry-point recommendation, and update stale "nbClass" prose in `apps/docs` introduction/installation pages if so.
**Goal:** ✅ Hardening completed (Phases 0–8). ✅ Design-props coverage completed. ✅ Refactor Phase 1 (release blockers) complete.
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
