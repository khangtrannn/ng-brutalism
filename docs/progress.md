# Project Progress — Dashboard

One-screen status across all active domains. Max 5 lines per section.
For history and details, read the domain's own `progress.md`.

---

## SEO
**Status:** Launch week in progress. Show HN post due 2026-05-26.
**Last action:** awesome-angular PR merged; Cloudflare Web Analytics wired; Portfolio mobile Perf 87→98.
**Next:** Show HN Block 6 content prep (grilling session), then go-live Tue 2026-05-26 20:00 ICT.
**Blocking:** bestofjs gated at 100 stars (currently 12). GSC indexing pending.
→ Details: `docs/seo/progress.md`

---

## Performance
**Status:** Lighthouse targets met. Docs homepage 100/100 Perf+A11y. Portfolio mobile 98, desktop 100.
**Last action:** `@defer` lazy load on journey section; image WebP + lazy loading; pagination a11y contrast fix.
**Next:** No active work. Monitor `/docs/introduction` mobile score (floor 80 due to Angular TBT).
→ Details: `docs/performance/lighthouse-improvements.md`

---

## Components
**Status:** v0.1.1 shipped. Contact dialog redesign phases A+B complete, visual sign-off pending.
**Next:** v0.2 component planning not yet started.
→ Details: `docs/components/contact-dialog/PLAN.md`

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
**Status:** v0.1.0 + v0.1.1 shipped to npm. No v0.2 plan yet.
**Next:** Begin v0.2 planning when component backlog is prioritized.
→ Details: `CHANGELOG.md`
