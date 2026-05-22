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

## Fix 6 — Responsive logo images

**Impact:** logo.webp: 44 KB → 1.4 KB (1x) / 2.9 KB (2x retina). Fixes `uses-responsive-images` audit.

**Root cause:** `logo.webp` is 1166×1166 px but displayed at 48×48 (mobile) / 56×56 (desktop sm+).

**Generate size variants:**
```bash
magick public/logo.png -resize 56x56 /tmp/logo-56-tmp.png && cwebp -q 85 /tmp/logo-56-tmp.png -o public/logo-56.webp
magick public/logo.png -resize 112x112 /tmp/logo-112-tmp.png && cwebp -q 85 /tmp/logo-112-tmp.png -o public/logo-112.webp
```

**Update `<picture>` in `navbar.ts`:**
```html
<picture>
  <source
    srcset="/logo-56.webp 56w, /logo-112.webp 112w"
    sizes="(min-width: 640px) 56px, 48px"
    type="image/webp"
  />
  <img src="/logo.png" alt="" width="56" height="56" aria-hidden="true" ... />
</picture>
```

**Why these sizes:**
- 56w = exact 1× display size for sm+ (desktop)
- 112w = 2× retina for desktop; also best match for 2× mobile (96px needed, browser picks 112w as nearest)
- `sizes` tells the browser the CSS display size so it can select the right descriptor

---

## Fix 7 — Cache TTL via Cloudflare Pages migration

**Impact:** ~563KB savings on repeat visits. GitHub Pages hard-codes 10-minute TTL for all assets.

**Steps:**

1. Create `apps/docs/public/_headers` (Cloudflare Pages reads this file from the build output):
```
# HTML pages — always revalidate
/*
  Cache-Control: public, max-age=0, must-revalidate

# Hashed JS/CSS bundles — content-addressed, safe to cache 1 year
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Videos / images — 1 day
/angular-mascot.webm
  Cache-Control: public, max-age=86400
/angular-mascot.mp4
  Cache-Control: public, max-age=86400
/logo*.webp
  Cache-Control: public, max-age=86400
```

2. Update `.github/workflows/deploy-docs.yml` to use `cloudflare/wrangler-action@v3` instead of `actions/deploy-pages`.

3. In the Cloudflare dashboard:
   - Create a new Pages project (`ng-brutalism-docs`)
   - Add custom domain `ngbrutalism.khangtran.dev`
   - Add secrets to GitHub: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

4. In the GitHub Pages settings: disable GitHub Pages for the repo (it will now serve from Cloudflare).

**Why `/*` then `/assets/*` ordering works:** Cloudflare Pages applies ALL matching header rules top-to-bottom; later rules win on conflicts. So `/assets/*` overrides the `max-age=0` from `/*` for asset paths.

---

## Fix 13 — Pagination contrast: white-on-pink → black-on-pink

**Impact:** Fixes WCAG AA failure on every docs page — brings A11y 95 → 100 for `/docs/introduction` and all other docs pages.

**Root cause:** `--nb-pink` = `#ff7eb6`. White text (`#fff`) on this background yields a contrast ratio of **2.33:1** (WCAG AA requires 4.5:1). Black text (`#000`) on the same background yields **9.01:1**.

**File:** `apps/docs/src/app/docs/layout/pagination.ts`

```diff
  .pagination__card--next {
    background: var(--nb-pink);
    text-align: right;
    align-items: flex-end;
-   color: #fff;
+   color: #000;
  }

- .pagination__card--next .pagination__eyebrow {
-   color: rgba(255, 255, 255, 0.95);
- }

  .pagination__title {
    ...
    color: #000;
  }

- .pagination__card--next .pagination__title {
-   color: #fff;
- }
```

**Why:** Removed the overrides that forced white text on the "next" card. The base rules (`color: #000` on the card, `rgba(0,0,0,0.7)` on the eyebrow, `#000` on the title) already apply correctly to both cards.

---

## Remaining known opportunities (not yet implemented)

| Audit | Estimated savings | Notes |
|---|---|---|
| `unused-javascript` | ~39KB (docs), ~94KB (portfolio) | Main Angular bundle; needs code-splitting / lazy-loading investigation |
| `render-blocking-resources` | 350ms (mobile) | Main Vite CSS bundle (16KB) — making it async causes FOUC; not worth the tradeoff on SSG |
| LCP element render delay | ~1,560ms (docs homepage) | Text `<p>` in prerendered HTML. Blocked by render-blocking CSS (748ms on mobile) + Angular bootstrap style/layout (780ms). Fixing render-blocking CSS is the lever but has FOUC tradeoff. |
| Font CLS | 0.001 | Caused by async Google Fonts WOFF2 load; already using `display=swap`. Score well within good threshold (<0.1) — safe to ignore |

---

## Other pages audited (May 2026)

### `/docs/introduction`

| | Mobile | Desktop |
|---|---|---|
| Performance | 80 | 98 |
| Accessibility | 100 | 100 |
| Desktop LCP | — | 0.7s |

**Fixes applied:** Fix 8 (GIF → video), Fix 13 (pagination contrast).

**Mobile 80 floor:** Angular TBT (770ms, score 38) + unused-javascript. Same unfixable floor as homepage.

---

### `/showcase/portfolio`

**Before:**

| | Mobile | Desktop |
|---|---|---|
| Performance | 66 | 90 |
| Accessibility | 100 | 100 |
| Mobile LCP | 7.0s | — |
| Desktop LCP | — | 1.9s |

**After (all fixes applied):**

| | Mobile | Desktop |
|---|---|---|
| Performance | 87 | **100** |
| Accessibility | 100 | 100 |
| Mobile LCP | 1.9s | — |
| Desktop LCP | — | **0.6s** |

**Fixes applied:** Fix 9, 10, 11, 12 (see below).

**Mobile 87 floor:** Angular TBT (420ms, score 65) + unused-javascript (94KB). Code-splitting is the only lever.

---

## Fix 8 — Introduction page: GIF → Video

**Impact:** ~1MB payload saving. Same fix as Fix 1 — video files already existed from the homepage fix.

**File:** `apps/docs/src/app/pages/docs/introduction.page.ts`

Replace `<img src="/angular-mascot.gif">` with:
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

---

## Fix 9 — Portfolio nav logo → responsive WebP

**Impact:** 2MB → 1.6KB (1×) / 3.2KB (2×). Fixes `uses-responsive-images` audit.

**Root cause:** `logo.png` is 1536×1024 px displayed at 52–70px.

**Generate size variants:**
```bash
magick public/showcase/portfolio/logo.png -resize 70x70 /tmp/logo-70-tmp.png && cwebp -q 85 /tmp/logo-70-tmp.png -o public/showcase/portfolio/logo-70.webp
magick public/showcase/portfolio/logo.png -resize 140x140 /tmp/logo-140-tmp.png && cwebp -q 85 /tmp/logo-140-tmp.png -o public/showcase/portfolio/logo-140.webp
```

**Update `<picture>` in `portfolio-nav.ts`:**
```html
<picture>
  <source
    [attr.srcset]="assetPath() + '/logo-70.webp 70w, ' + assetPath() + '/logo-140.webp 140w'"
    sizes="(min-width: 768px) 70px, (min-width: 640px) 64px, 52px"
    type="image/webp"
  />
  <img
    class="h-[52px] w-[52px] object-contain sm:h-[64px] sm:w-[64px] md:h-[70px] md:w-[70px]"
    [src]="assetPath() + '/logo.png'"
    alt="Khang Tran portfolio logo"
  />
</picture>
```

**Note:** Use `[attr.srcset]` (not `[srcset]`) on `<source>` elements — Angular needs the attribute binding form here.

---

## Fix 10 — Portfolio project card images: lazy loading

**Impact:** Defers all below-fold project images from blocking initial paint.

**File:** `apps/docs/src/app/pages/showcase/portfolio/components/portfolio-projects.ts`

```diff
  <img
    class="h-full w-full object-cover transition-transform group-hover:scale-110"
    [src]="assetPath() + '/' + project.image"
    [alt]="project.title"
+   loading="lazy"
+   decoding="async"
  />
```

---

## Fix 11 — Portfolio hero portrait: CSS background → `<img fetchpriority="high">` + WebP

**Impact:** Mobile LCP 7.0s → 1.9s, Desktop LCP 1.9s → 0.6s. Biggest single win.

**Root cause:** `div.portfolio-hero-portrait` used `background: url('/showcase/portfolio/khang.png')` (366KB PNG, 1081×1249px displayed at 180–450px). CSS background images are invisible to the browser's preload scanner — they block on JS parse + CSS evaluation before load starts. The in-template `<link rel="preload">` was also ineffective (Angular renders it into the body, not `<head>`).

**Generate size variants:**
```bash
magick public/showcase/portfolio/khang.png -resize 450x /tmp/khang-450-tmp.png && cwebp -q 85 /tmp/khang-450-tmp.png -o public/showcase/portfolio/khang-450.webp
magick public/showcase/portfolio/khang.png -resize 900x /tmp/khang-900-tmp.png && cwebp -q 85 /tmp/khang-900-tmp.png -o public/showcase/portfolio/khang-900.webp
```

Result: 366KB → 48KB (1×) / 147KB (2×).

**Template change in `portfolio-hero.ts`** — replace `<link rel="preload">` + `<div>` with:
```html
<picture>
  <source
    srcset="/showcase/portfolio/khang-450.webp 450w, /showcase/portfolio/khang-900.webp 900w"
    sizes="(min-width: 1280px) 450px, (min-width: 1024px) 400px, (min-width: 768px) 300px, (min-width: 640px) 220px, 180px"
    type="image/webp"
  />
  <img
    class="portfolio-hero-portrait"
    src="/showcase/portfolio/khang.png"
    alt="Khang Tran"
    width="1081"
    height="1249"
    fetchpriority="high"
  />
</picture>
```

**CSS change in `portfolio.page.scss`:**
```diff
  .portfolio-hero-portrait {
    aspect-ratio: 1081 / 1249;
-   background: url('/showcase/portfolio/khang.png') center / contain no-repeat;
+   object-fit: contain;
  }
```

---

## Fix 12 — Contact dialog: lazy-load decorative image

**Impact:** 624KB deferred until dialog opens (saves on every page that embeds `<contact-us-dialog>`).

**Root cause:** `message.png` (639KB) inside `contact-us-dialog.ts` loaded eagerly even though the dialog is closed on page load.

**File:** `apps/docs/src/app/pages/components/examples/contact-us-dialog.ts`

```diff
  <img
    src="/showcase/contact-dialog/message.png"
    alt=""
    aria-hidden="true"
+   loading="lazy"
    class="pointer-events-none hidden h-28 w-auto select-none sm:block"
  />
```

---

## Color contrast investigation (portfolio project links)

**Conclusion: no fix needed.**

`bg-blue-400` (#60a5fa) and `bg-green-400` (#4ade80) with `color: #000` give contrast ratios of **8.76:1** and **12.52:1** respectively — both well above the WCAG AA threshold of 4.5:1.

---

## Pages deferred

- `/components/button` — no images or GIF found; no obvious aria-label issues. Audit when a concrete Lighthouse flag surfaces.
