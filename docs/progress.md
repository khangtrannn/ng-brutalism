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
**Status:** Improvement-plan Phases 1–4 landed. Forms architecture consolidated in ADR 0004 (2026-07-15): model-based forms-runtime-free core re-affirmed, plus a new `forms-compat` secondary entry point (CVA bridge for `formControlName`/`ngModel` + field bridge) landed 2026-07-15, closing v0.3.0 scope; Angular 22 only (`^22.0.0`). ADRs 0002/0003 archived.
**Last action:** 2026-07-15 forms audit follow-up: `forms-compat` now uses a shared `NB_ERROR_STATE_MATCHER` with Material-style default timing (`invalid && (touched || submitted)`), covers parent `NgForm`/`FormGroupDirective` submission, tests real `formControlName`, `ngModel` submit, custom matcher override, and `requiredTrue`, and renamed compat hooks to `ɵsetCompat*` internals. `pnpm nx test ui --run` and `pnpm api-guard:update` are green.
**Next:** Run `smoke:ui:ng22` in an environment with Node ≥22.22.3, then CHANGELOG date refresh + publish per `docs/release/RELEASE.md`. Phase 5 roadmap (Playwright visual-regression → dark theme → Phase 6 primitives) not started.
→ Plan: `docs/release/v0.3-angular-22-plan.md` · ADR: `docs/adr/0004-forms-support.md` · Improvement plan: `docs/architecture/library-improvement-plan-2026-07-09.md` · Arch: `docs/architecture/token-customization.md`

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
**Status:** 0.3.0 scope reopened by ADR 0004 (2026-07-15) is code-complete and gate-verified: the `forms-compat` entry point landed and every gate runnable in this sandbox is green. Peers: `@angular/core`/`@angular/common` `^22.0.0`, `@angular/forms` optional. Only blocker is `smoke:ui:ng22`, which needs Node ≥22.22.3 (this sandbox is 22.22.2).
**Last action:** 2026-07-15 forms audit follow-up landed: matcher token + submitted-state timing, expanded bridge specs, docs/ADR wording, and API snapshots. `pnpm nx test ui --run` and `pnpm api-guard:update` are green.
**Next:** Run `smoke:ui:ng22` on a Node ≥22.22.3 machine, refresh the CHANGELOG `[0.3.0]` date, then follow `docs/release/RELEASE.md` steps 2–8 (build → tag → GitHub release → npm publish).
→ Runbook: `docs/release/RELEASE.md` · v0.3 plan: `docs/release/v0.3-angular-22-plan.md` · Historical scope: `docs/_archive/v0.2.0-plan.md`
