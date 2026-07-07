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
**Status:** Design-system audit (2026-07-06) + refactor plan (2026-07-07) landed. Refactor Phases 1–4 complete: release blockers, packaging, token/theming redesign, and a11y/forms hardening all shipped.
**Last action:** Phase 4 shipped: `NbSelect` implements `ControlValueAccessor` (value/touched/dirty/disabled round-trip, `aria-invalid`/`aria-required` from `NgControl`) plus full APG keyboard completion (Home/End, typeahead, Tab-close, Escape-on-trigger, disabled-but-focusable options) and Popover-API-based top-layer positioning (escapes `overflow:hidden`, confirmed in a real browser); new `NbField` primitive (`nb-field/*`) links label/control/description/error via generated ids + `aria-describedby`, wired into `nbInput`/`nbTextarea`/`nb-select`; `NbAccordion` gained header keyboard nav (Up/Down/Home/End); `NbDialog` gained a `dismissible` input; pre-1.0 renames landed (`NbShadow`/`NbBorderStrength` `'default'`→`'md'`, `NbIconTone` off shared `data-nb-tone`, `NbSelect` `size`, `NbChip` `padding`→`size`); `@angular/forms` added as a peer dep (previously unused in the library); `vitest-axe` added with axe assertions on dialog/select/accordion/field fixtures; specs filled for the 8 previously-uncovered components; a `docsComponentStatus` stable/preview data map added (badge UI itself is Phase 5). API-guard snapshots updated deliberately; full `lint`/`test`/`smoke:ui`/`api-guard` all green (313 `ui` + 8 `docs` tests).
**Next:** Phase 5 (documentation & adoption — port design-props/token-customization guides to the public site, generated token reference, Stable/Preview badge UI).
**Goal:** ✅ Hardening completed (Phases 0–8). ✅ Design-props coverage completed. ✅ Refactor Phases 1–4 complete.
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
