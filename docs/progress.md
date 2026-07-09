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
**Last action:** `@typescript-eslint/member-ordering` enabled (2026-07-09) so `#private` fields/`inject()` must precede other class members; 12 components reordered to comply (accordion-item/trigger, dialog, display, field, input, marquee, native-select, select, text, textarea) plus one schematics interface. Rule can't tell `input()`/`computed()`/`inject()` apart, so finer ordering stays a reviewed convention, not linted. Green on `ui`/`docs`/`schematics` lint, build, test.
**Next:** Deferred as roadmap: dark theme (M1, explicitly out of scope now), Playwright visual-regression suite (M2), Phase 6 primitives (L2 — Tabs/Switch/Radio/Tooltip/Menu/Toast). Release: commit + tag/publish 0.3.0 via `docs/release/RELEASE.md` when ready. See `docs/architecture/library-audit-2026-07-08.md`.
**Goal:** ✅ Hardening completed (Phases 0–8). ✅ Design-props coverage completed. ✅ Refactor Phases 1–5 complete.
→ Arch: `docs/architecture/token-customization.md` · Design props: `docs/components/design-props.md` · Audit: `docs/architecture/library-audit-2026-07-08.md` · History: `docs/_archive/design-system-audit-2026-07-06.md`, `docs/_archive/design-system-refactor-plan-2026-07-07.md`, `docs/_archive/token-customization-hardening.md`, `docs/_archive/design-props-plan.md`

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
**Status:** 0.3.0 prepared in-repo: CHANGELOG `[0.3.0]` entry written and `libs/ui/package.json` bumped to 0.3.0. Not yet committed/tagged/published.
**Next:** Commit the audit fixes, then follow `docs/release/RELEASE.md` steps 3–7 (commit → build → tag → GitHub release → npm publish) to ship 0.3.0.
→ Runbook: `docs/release/RELEASE.md` · Historical scope: `docs/_archive/v0.2.0-plan.md`
