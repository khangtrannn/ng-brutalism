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
**Status:** Design-system audit (2026-07-06) + refactor plan (2026-07-07) landed. Refactor Phases 1–3 complete: release blockers cleared, packaging cleaned up, token/theming redesign shipped.
**Last action:** Phase 3 shipped (uncommitted): every `tone.css` tone (not just neutral) now indirects through `--nb-tone-<name>-bg/fg/border` in `theme.css` — zero color literals left in `tone.css`; `NbTone` split into `NbSemanticTone`/`NbPaletteTone` (non-breaking, same union); all TS/CSS resolver fallbacks stripped (`radius`/`spacing`/`padding`/`border`/`shadow`/`typography` + 3 hand-authored component files), promoting `--nb-shadow-sm/hard/heavy` to real `theme.css` vars first; added `--nb-motion-fast/base` + `--nb-ease`, routed through button/icon-button/select/accordion transitions; deleted the dead, unwired `--nb-size-*` tokens; reduced-motion now zeroes the motion tokens instead of the shadow offsets (static shadows survive, only transitions stop); removed the half-`.dark` stub; dropped `theme` from `provideNgBrutalism()` entirely (CSS-only theming is now the only path) — deleted `theme.tokens.ts`/`NB_THEME_CONFIG`/`NbThemeConfig`/`NbConfig`, updated docs installation page + both READMEs; shipped `theme-mono.css` and `theme-soft.css` presets. API-guard snapshots updated deliberately for the intentional export changes; full `lint`/`test`/`build:ui`/`build docs`/`smoke:ui` all green.
**Next:** Phase 4 (a11y + forms hardening — NbSelect CVA, keyboard completion, popover positioning, NbField primitive, accordion keyboard nav).
**Goal:** ✅ Hardening completed (Phases 0–8). ✅ Design-props coverage completed. ✅ Refactor Phases 1–3 complete.
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
