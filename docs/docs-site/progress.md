# Docs Site — Progress

Live status + shipped log for the docs app (`apps/docs`) and docs chrome (`libs/docs-ui`).

## Status

**Current:** Audit complete (2026-07-10). First P0 fix pass in progress.

- **Builds & routes:** ✅ `nx build docs` clean; 60/60 routes registered = discovered; all 60 return HTTP 200, 0 load/console errors.
- **Content / API accuracy:** ✅ no snippet/import references a non-existent public symbol.
- **Dogfooding:** ⚠️ mixed. Recipes / component examples / composition pages dogfood excellently; `docs/*` guides, the `nb-stat-tile` custom CSS (295 uses / 45 files), and docs-ui chrome hand-roll primitive anatomy. Follow-up bridged converted `nb-stat` tiles, but old/new markup still coexist.
- **a11y:** only `/` and `/showcase/portfolio` passed axe cleanly during the audit. Follow-up restored sidebar yellow chip contrast; scrollable regions remain.

## Next (P0 backlog)

1. Finish replacing old `nb-stat-tile` markup with `nbStat` + `nbSurface`/`nbCard`; remove compatibility CSS once grids no longer mix old/new markup.
2. Add `tabindex="0"` to `overflow-x-auto` table/code regions (clears 39 pages).
3. Rebuild docs-ui chrome + `docs/comparison` gap called out in the audit.

Full detail + P1/P2: `dogfooding-audit-2026-07-10.md`.

## Shipped log

- 2026-07-10 — Docs-site verification + dogfooding audit written (`dogfooding-audit-2026-07-10.md`); "Docs Site" domain registered in `INDEX.md` + dashboard. _(no commit yet)_
- 2026-07-10 — Follow-up fixes: sidebar yellow chip contrast, converted stat-tile typography, interactive surface press shadows, peach docs tiles, `NbSticker` API guard snapshot, stale progress text, and the incorrect `DOC_NAV` cleanup note. _(no commit yet)_
