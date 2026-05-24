# Sprint — dev.to Article + StackBlitz Demo

**Status:** Decisions locked (2026-05-23 grill session #2). Ready to build. Pick up in the next session.

**Context:** Decisions from two `/grill-me` sessions (2026-05-23). All decisions below are
locked — do not re-litigate them. Start building.

**SEO motivation:** ChatGPT and Claude both score 0/7 on entity recognition for
"ng-brutalism" (Perplexity gets 5/7 but misses author + npm name). Root cause is
thin crawlable content footprint — one docs site, one README, one FAQ page. A
dev.to tutorial gets indexed fast, is dofollow, and LLM scrapers routinely index
dev.to. This is the highest-leverage move available in the 5-day window before
Angular Weekly publishes (2026-05-28).

---

## Decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Article format | Tutorial (step-by-step build) | Keyword density, LLM indexing, shareable |
| Article title | *"Building a neo-brutalist job board in Angular with ng-brutalism"* | Hits T2 keywords naturally: "neo-brutalist Angular", "ng-brutalism" |
| Demo type | Standalone StackBlitz (web layout, Option A) | Real use case, not a mobile mockup |
| Demo concept | Neo-brutalist job board | Uses all 15 components in one coherent UI flow |
| Design reference | [Dribbble — Job search app Retro brutalism style by Kim Phuong](https://dribbble.com/shots/23724865-Job-search-app-Retro-brutalism-style) | Pastel palette, monospace font, dark header |
| Article structure | Section-by-section (~5 steps) | Matches visual mental model of building a page |
| Article draft ownership | Claude writes full draft, Khang reviews + posts | Keyword density baked in end-to-end |
| Build workflow | Build locally first → verify → export to StackBlitz | Avoid shipping a broken demo |
| Project type | **`ng new` standalone Angular CLI app** (NOT Nx) | Real consumer experience — mirrors what article readers will do |
| Project name | `ng-brutalism-job-board` | Hits npm keyword in repo name; no redundant suffix |
| Project location | `~/ng-brutalism-job-board/` (sibling to monorepo, separate git repo) | Zero chance of Nx tsconfig/path-alias interference; linkable from article |
| Install method | `ng add @ng-brutalism/ui` | Schematic auto-wires Tailwind (postcss, imports); matches article Step 1 |
| `ng new` flags | `--routing=false --style=css --ssr=false` | Single-page demo, no SSR needed |
| Fonts | Space Grotesk (body) + Archivo Black (headings) + JetBrains Mono — Google Fonts | Same stack as ng-brutalism docs app; imported in `index.html` |
| Job cards | Google (mint) · Figma (pink) · Vercel (cream) · GitHub (lavender) | Recognizable logos, covers all 4 pastel variants |
| Company logos | CDN URLs from each company's own domain | No asset management, renders in StackBlitz |
| Dialog trigger | Template-based `viewChild.required<NbDialog>('dialogRef')`, `.open()` | No service needed; `ApplyDialogComponent` takes job title as `@Input()` |

---

## Design spec (from Dribbble reference)

### Color palette

| Role | Color | Usage |
|---|---|---|
| Header background | `#111111` | Dark hero section |
| Header text | `#ffffff` | Title, search placeholder |
| Card — mint | `~#c5f2d8` | Job card background variant A |
| Card — pink | `~#f8cccc` | Job card background variant B |
| Card — cream | `~#f5e8b8` | Job card background variant C |
| Card — lavender | `~#dcd0f8` | Job card background variant D |
| CTA / filter button | `~#7c5cfc` | Purple — primary action color |
| Border / shadow | `#111111` | Thick black borders + offset shadows |
| Card border radius | `12–16px` | Rounded but structured |

### Typography
- **Font**: Monospace throughout (matches ng-brutalism's existing mono style)
- **Hero**: Large bold title, mixed weight — "Find your dream job" light + bold contrast
- **Wavy underline**: Use `NbTitle` directive on the keyword word (e.g. "Worldwide" or "Angular")
- **Labels/pills**: Small uppercase mono

### Brutalist elements
- Thick black borders: `2–3px solid #111`
- Offset box shadows: `4–6px solid #111`
- High contrast: dark `#111` header vs pastel card section
- No gradients, no blur — flat

---

## Page structure (web layout)

```
┌─────────────────────────────────────────────────────┐
│  DARK HEADER (#111)                                  │
│  "Find your dream job"  [NbTitle on "dream"]         │
│  ┌─────────────────────────────┐  ┌──────────────┐  │
│  │ 🔍 Search jobs...           │  │ ▼ Filter     │  │
│  └─────────────────────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────┤
│  MARQUEE (white bg)                                  │
│  Now Hiring · Remote-Friendly · Angular Devs Wanted ·│
├─────────────────────────────────────────────────────┤
│  JOB CARD GRID (2-col on desktop, 1-col mobile)      │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │ [ImageCard logo] │  │ [ImageCard logo] │          │
│  │ Senior Dev       │  │ UI Designer      │          │
│  │ [Badge] [Badge]  │  │ [Badge] [Badge]  │          │
│  │ [Avatar] name    │  │ [Avatar] name    │          │
│  │ [Apply] [Save ♥] │  │ [Apply] [Save ♥] │          │
│  └──────────────────┘  └──────────────────┘          │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │ [ImageCard logo] │  │ [ImageCard logo] │          │
│  │ ...              │  │ ...              │          │
│  └──────────────────┘  └──────────────────┘          │
├─────────────────────────────────────────────────────┤
│  ACCORDION — "Why join us?" / "How it works"         │
└─────────────────────────────────────────────────────┘

On "Apply" click → NbDialog opens:
  ┌──────────────────────────────────┐
  │ Apply for Senior Developer       │
  │ [Label] Name   [NbInput]         │
  │ [Label] Email  [NbInput]         │
  │ [Label] Role   [NbSelect]        │
  │ [Label] Cover  [NbTextarea]      │
  │ [NbCheckbox] I agree to terms    │
  │ [Cancel]  [Submit Application]   │
  └──────────────────────────────────┘
```

### Components used (all 15)

| Component | Where |
|---|---|
| `NbTitle` | Wavy underline on hero word in header |
| `NbButton` | Search filter, Apply, Save (heart icon), dialog actions |
| `NbInput` | Search bar in header + dialog name/email fields |
| `NbInputGroup` | Wraps search bar (with prefix icon) + dialog inputs |
| `NbLabel` | Dialog form field labels |
| `NbSelect` + `NbSelectOption` | Dialog role/department dropdown |
| `NbTextarea` | Dialog cover letter field |
| `NbCheckbox` | Dialog "agree to terms" |
| `NbCard` + sub-parts | Job listing cards |
| `NbImageCard` | Company logo thumbnail on each job card |
| `NbAvatar` | Recruiter/poster avatar on each job card |
| `NbBadge` | Status pills: Full-time, Remote, Urgent, etc. |
| `NbMarquee` | Scrolling banner between header and cards |
| `NbDialog` + sub-parts | Application form dialog |
| `NbAccordion` | "Why join us?" section at bottom |

---

## Article structure (section-by-section, ~5 steps)

**Title:** *Building a neo-brutalist job board in Angular with ng-brutalism*

**Intro (100 words):** What neo-brutalism is, why Angular had nothing for it, what
we're building (link to live StackBlitz at the top).

**Step 1 — Install (50 words + code):**
```bash
ng add @ng-brutalism/ui
```
One command, done. Show what gets added.

**Step 2 — Page header + search bar:**
- Dark `#111` section, `NbTitle` wavy underline on hero word
- `NbInputGroup` + `NbInput` for search
- Purple `NbButton` for filter

**Step 3 — Marquee + job card grid:**
- `NbMarquee` scrolling banner
- 4× `NbCard` with `NbImageCard`, `NbAvatar`, `NbBadge`, `NbButton`
- Pastel backgrounds per card (mint, pink, cream, lavender)

**Step 4 — Application dialog:**
- `NbButton` (Apply) triggers `NbDialog`
- Form: `NbLabel`, `NbInputGroup`+`NbInput`, `NbSelect`, `NbTextarea`, `NbCheckbox`

**Step 5 — Accordion footer:**
- `NbAccordion` for "Why join us?" / FAQ section
- Ties the page together

**Closing (50 words):** Link to docs, GitHub, npm. Natural keyword close:
"ng-brutalism ships 15 neo-brutalist Angular components..."

---

## Build checklist

- [x] `ng new ng-brutalism-job-board --routing=false --style=css --ssr=false` at `~/` (sibling to monorepo)
- [x] `cd ~/ng-brutalism-job-board && ng add @ng-brutalism/ui` (auto-wires Tailwind + CSS imports)
- [x] Add Google Fonts import to `index.html` (Space Grotesk, Archivo Black, JetBrains Mono)
- [x] Set CSS custom properties in `styles.css` (colors, fonts matching design spec)
- [x] Build dark header component (NbTitle on "dream", NbInputGroup+NbInput, NbButton)
- [x] Build Marquee banner
- [x] Build job card grid (4 cards, pastel variants, all sub-components)
- [x] Build Apply dialog (full form)
- [x] Build Accordion footer
- [x] Verify locally — `ng build` passed clean; dev server running at localhost:4210
- [ ] Screenshot / record GIF for article hero image (Khang)
- [ ] Khang creates StackBlitz project, pastes files from `~/ng-brutalism-job-board/src/`
- [x] Claude writes full article draft in `docs/seo/devto-article-draft.md`
- [ ] Khang reviews + posts to dev.to
- [ ] Add dev.to URL to `sameAs` in JSON-LD (one-line edit in `docs-seo-data.ts`)
- [ ] Log in `progress.md` shipped log

---

## File locations

| File | Purpose |
|---|---|
| `~/ng-brutalism-job-board/` | Standalone Angular CLI app — separate git repo, sibling to monorepo |
| `docs/seo/devto-article-draft.md` | Full article draft (Claude writes after demo is built) |
| `docs/seo/sprint-devto-article.md` | This file — decisions + build checklist |
