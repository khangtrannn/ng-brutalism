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
**Status:** CSS-first token customization architecture complete and hardened (Phases 0–8). Design-props coverage shipped: 9 additive inputs close every verified input↔var symmetry gap; Radix-grade philosophy doc live.
**Last action:** Architecture-audit fixes (uncommitted): token scales now declared in `theme.css` (`--nb-radius-*`, `--nb-space-*`, `--nb-padding-*`, `--nb-border-width-*`) and resolvers emit `var()` refs; scalar shadow stops (sm/hard/heavy) derive from the offset knobs so reduced-motion + scoped theming reach them; fixed dead callout `border` input (size rules now consume `--nb-callout-border-width`) + cascade guard spec.
**Next:** Fix 3 stale pre-migration specs (accordion trigger tone; 2 jsdom computed-style precedence tests asserting inline final styles / `--nb-accent-parts`) and unused `input` import in `nb-accordion-trigger.ts` (lint error). Then rerun release-readiness checks.
**Goal:** ✅ Hardening completed (Phases 0–8). ✅ Design-props coverage completed — full input↔CSS-var symmetry + legible philosophy page.
→ Arch: `docs/architecture/token-customization.md` · Design props: `docs/components/design-props.md` · History: `docs/_archive/token-customization-hardening.md`, `docs/_archive/design-props-plan.md`

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
