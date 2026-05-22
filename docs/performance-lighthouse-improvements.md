# Lighthouse Performance & Accessibility Improvements

## Baseline (docs homepage, local production build, May 2026)

| | Mobile | Desktop |
|---|---|---|
| Performance | 98 | 91 |
| Accessibility | 95 | 95 |
| Desktop LCP | — | 1.9s |

## After applying all fixes

| | Mobile | Desktop |
|---|---|---|
| Performance | 97 | 100 |
| Accessibility | 100 | 100 |
| Desktop LCP | — | 0.6s |

---

## Fix 1 — Animated GIF → Video

**Impact:** ~1 MB payload savings. GIF was the desktop LCP element.

**Steps:**
```bash
# Convert to WebM (transparency-safe, preferred by Chrome/Firefox)
ffmpeg -i public/angular-mascot.gif \
  -vf "fps=20,scale=488:-1:flags=lanczos" \
  -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 35 -an \
  -y public/angular-mascot.webm

# Convert to MP4 (fallback for Safari)
ffmpeg -i public/angular-mascot.gif \
  -vf "fps=20,scale=488:-1:flags=lanczos" \
  -c:v libx264 -movflags faststart -pix_fmt yuv420p -crf 28 -an \
  -y public/angular-mascot.mp4
```

**Template change** — replace `<img>` with:
```html
<video
  class="..."
  width="488"
  height="488"
  autoplay
  loop
  muted
  playsinline
  aria-label="Animated Angular mascot for Ng Brutalism"
>
  <source src="/angular-mascot.webm" type="video/webm" />
  <source src="/angular-mascot.mp4" type="video/mp4" />
</video>
```

**Add to global styles** (respects OS accessibility preference):
```css
@media (prefers-reduced-motion: reduce) {
  video[autoplay] {
    display: none;
  }
}
```

---

## Fix 2 — Google Fonts non-blocking load

**Impact:** Removes render-blocking font request (~1.4s savings on mobile).

**Change in `index.html`** — replace the synchronous `<link rel="stylesheet">` with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Coming+Soon&family=JetBrains+Mono:wght@500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link
    href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Coming+Soon&family=JetBrains+Mono:wght@500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</noscript>
```

---

## Fix 3 — Color contrast on navbar CTA

**Impact:** Fixes accessibility failure (WCAG AA contrast ratio).

**Root cause:** `--nb-hot` is `#ff4f8a` (hot pink). White text on it = 3.07:1 (fails). Black text = 6.84:1 (passes).

**Change in `navbar.ts`:**
```diff
- class="... text-white ..."
+ class="... text-black ..."
```

---

## Fix 4 — Accessible name mismatch on brand logo link

**Impact:** Fixes `label-content-name-mismatch` accessibility audit.

**Root cause:** `aria-label` on the `<a>` didn't match the visually rendered text (which is uppercase via CSS `text-transform`). Axe runs a case-sensitive string comparison.

**Fix:** Remove `aria-label` from the `<a>` element entirely. Instead, change the hidden text span from `hidden sm:flex` (which uses `display:none`, removing it from the a11y tree on mobile) to `sr-only sm:not-sr-only sm:flex` (which clips it visually on mobile but keeps it in the a11y tree).

```diff
- <a routerLink="/" aria-label="Ng Brutalism home" class="brand ...">
-   <img ... />
-   <span class="hidden flex-col leading-none sm:flex">
+ <a routerLink="/" class="brand ...">
+   <img ... />
+   <span class="sr-only flex-col leading-none sm:not-sr-only sm:flex">
```

**Why this works:**
- Mobile: `sr-only` makes text visually invisible but keeps it in the accessibility tree, so the link has an accessible name.
- Desktop: `sm:not-sr-only sm:flex` removes the clip and shows the text visually — the accessible name is computed directly from visible text, so no mismatch.

---

## Fix 5 — PNG logo → WebP with `<picture>` fallback

**Impact:** 73KB → 44KB for logo (40% savings).

**Convert:**
```bash
cwebp -q 85 public/logo.png -o public/logo.webp
```

**Wrap existing `<img>` in `<picture>`:**
```html
<picture>
  <source srcset="/logo.webp" type="image/webp" />
  <img src="/logo.png" alt="" width="56" height="56" aria-hidden="true" ... />
</picture>
```

---

## How to reproduce the audit

```bash
# 1. Build
pnpm nx build docs

# 2. Serve prerendered output (use a gzip-capable server — not python http.server)
npx serve dist/apps/docs/analog/public -p 4444

# 3. Run Lighthouse
npx lighthouse http://localhost:4444 \
  --output=json --output-path=/tmp/lh-mobile.json \
  --form-factor=mobile --preset=perf \
  --only-categories=performance,accessibility \
  --chrome-flags="--headless --no-sandbox"

npx lighthouse http://localhost:4444 \
  --output=json --output-path=/tmp/lh-desktop.json \
  --form-factor=desktop --preset=desktop \
  --only-categories=performance,accessibility \
  --chrome-flags="--headless --no-sandbox"

# 4. Read scores
node -e "
const m = JSON.parse(require('fs').readFileSync('/tmp/lh-mobile.json'));
const d = JSON.parse(require('fs').readFileSync('/tmp/lh-desktop.json'));
const fmt = v => Math.round(v * 100);
console.log('Mobile  Perf:', fmt(m.categories.performance.score), '| A11y:', fmt(m.categories.accessibility.score));
console.log('Desktop Perf:', fmt(d.categories.performance.score), '| A11y:', fmt(d.categories.accessibility.score));
"
```

---

## Remaining known opportunities (not yet implemented)

| Audit | Estimated savings | Notes |
|---|---|---|
| `uses-long-cache-ttl` | ~461KB | Requires CDN/server cache-control headers, not a build change |
| `unused-javascript` | ~39KB | Main Angular bundle; needs code-splitting investigation |
| `uses-responsive-images` | ~44KB | `logo.png` is still served at one size; add `srcset` with multiple widths |
| `render-blocking-resources` | 0ms est. savings | Main CSS bundle; Lighthouse flags it but savings are minimal on SSG |

---

## Applying to other pages

Pages to audit next (all prerendered):
- `/docs/introduction`
- `/components/button`
- `/showcase/portfolio`

Check each for:
1. Animated GIFs (same `angular-mascot.gif` used on introduction page — same video fix applies)
2. Unoptimized images served without `srcset` or modern formats
3. Color contrast issues specific to that page's color usage
4. Missing or mismatched `aria-label` attributes
