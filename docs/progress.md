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
**Status:** Design-system audit (2026-07-06) + refactor plan (2026-07-07) landed. Refactor Phases 1–5 complete: release blockers, packaging, token/theming redesign, a11y/forms hardening, and public docs/adoption all shipped.
**Last action:** Phase 5 shipped: 8 new public pages (`NbField` component page — a Phase 4 primitive that had shipped with zero docs — plus 7 Concepts/Project guides: Design Props, Customization, Dark Mode & Theming, Forms Integration, Accessibility, SSR & Hydration, Without Tailwind, Comparison, Versioning & Roadmap); a real token-reference generator (`apps/docs/scripts/generate-token-reference.mjs`, parses `var(--nb-x, fallback)` call sites + declarations straight out of shipped CSS) replaced the hand-maintained `docs-tokens.ts` map that was missing 16 of 36 components, wired into `docs:tokens:check`/`:update` + a new CI step; a `DocsStatusBadge` component now marks every component page Stable/Preview (plus a sidebar tag for Preview); all 37 component pages gained a tiered Accessibility section (deep keyboard/ARIA prose for ~13 interactive components, a one-line APG-N/A statement for the rest); FAQ's "Tailwind required" answer and both READMEs' "recipes ship" wording were corrected to match Phase 2/audit reality. Verified via `lint`/`test`/`build:docs`/`validate:docs-routes`/`docs:tokens:check`/`smoke:ui` all green plus a live-browser Playwright spot-check (zero console errors). Found and flagged (not fixed, out of scope): `api-guard` fails on a pure JSDoc-comment-loss artifact in ng-packagr's `.d.ts` rollup, unrelated to this phase (`ui:lint`/`ui:test`/`smoke:ui` all confirm the library itself is unaffected).
**Next:** No active Phase 1–5 work remaining. Phase 6 (post-1.0 track — Tabs/Tooltip/Menu/Toast/Switch/Radio, designed dark theme, density scale API, visual regression suite) is unscheduled.
**Goal:** ✅ Hardening completed (Phases 0–8). ✅ Design-props coverage completed. ✅ Refactor Phases 1–5 complete.
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
