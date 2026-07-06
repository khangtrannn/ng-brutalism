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
**Last action:** Per-component CSS delivery: extracted `styles/base.css` (tokens+tone+reset), added opt-in subpath exports `@ng-brutalism/ui/<name>.css` for all 39 stylesheets (styles.css stays the one-line default). Spike proved co-located `import './x.css'` in directives fails ng-packagr rollup, so Mantine-style opt-in chosen. `styles.spec.ts` now guards exports⇄disk sync both directions. Consumer using 2 components: ~11 KB → ~2 KB gzip.
**Next:** No active work. Ready for v0.2.0 release.
**Goal:** ✅ Hardening completed (Phases 0–8). ✅ Design-props coverage completed — full input↔CSS-var symmetry + legible philosophy page.
→ Arch: `docs/architecture/token-customization.md` · Hardening: `docs/architecture/token-customization-hardening.md` · Design props: `docs/architecture/design-props-plan.md` · `docs/components/design-props.md`

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
**Next:** Design-props coverage landed. Visual QA, bump version in libs/ui, run `docs/release/RELEASE.md` runbook (tag → GitHub release → npm publish).
→ Plan: `docs/release/v0.2.0-plan.md`
