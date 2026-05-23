# Performance Progress

## Current scores (last updated: 2026-05-23)

| Page | Mobile Perf | Desktop Perf | Mobile LCP | Desktop LCP | A11y |
|---|---|---|---|---|---|
| `/` | 99 | 100 | 1.5s | 0.5s | 100 |
| `/docs/introduction` | 80 | 98 | — | 0.7s | 100 |
| `/showcase/portfolio` | 98 | 100 | 1.9s | 0.7s | 100 |

Note: `/docs/introduction` mobile floor of 80 is Angular TBT (770ms) — not fixable without framework-level changes.

## Pending

No active performance work. After next deploy, run Lighthouse to confirm `Content-Encoding: br` is present on HTML responses and the "No compression applied" audit clears.

## Shipped log

### 2026-05-23
- Removed `no-transform` from all HTML routes in `_headers`: re-enables Cloudflare Brotli compression. Lighthouse est. savings: 19 KiB per document request. Root cause: `no-transform` was added to block CWA auto-injection but wasn't needed (only 1 beacon in source, no double-load).
- `@defer` lazy load on portfolio journey section (`0ea9133`): Portfolio mobile 87→98.
- Pagination contrast fix (`9b50098`): All `/docs/*` A11y 95→100.
- WebP images + lazy loading + `fetchpriority` (`dbb5e8c`): Mobile LCP 7.0s→1.9s, desktop 1.9s→0.6s.
- Cloudflare Pages migration (`c55b745`): 1-year immutable cache on hashed assets, edge CDN reduces TTFB.

### 2026-05-22 (pre-launch baseline)
- Docs homepage Desktop Perf 91→100, A11y 95→100. See `lighthouse-improvements.md` for full audit.
