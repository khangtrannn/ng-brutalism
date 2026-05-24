# Building a neo-brutalist job board in Angular with ng-brutalism

> **Live demo:** [StackBlitz — ng-brutalism job board](#) *(add link after publishing)*

Angular has always had rich component libraries — Material, PrimeNG, NG-Zorro — but nothing for the aesthetic that's been taking over design Twitter: **neo-brutalism**. Thick black borders, offset drop shadows, pastel backgrounds, monospace fonts, zero gradients. That raw, intentional look that Figma templates sell for $49.

This tutorial builds a full neo-brutalist job board in Angular using **ng-brutalism** — a free, open-source Angular component library that ships 15 neo-brutalist components with a single install command. By the end you'll have a working job board: dark hero header, scrolling marquee, pastel job cards, an apply dialog, and a collapsible FAQ — all built with real Angular components, not raw CSS.

---

## What we're building

A single-page neo-brutalist job board with:

- A dark `#111` header with a wavy-underline hero title and search bar
- A scrolling marquee banner between the header and the cards
- A 2-column job card grid (mint / pink / cream / lavender) with company logos, badges, and recruiter avatars
- A modal application form triggered by the **Apply** button
- A collapsible accordion FAQ at the bottom

All 15 ng-brutalism components get used — `NbTitle`, `NbButton`, `NbInput`, `NbInputGroup`, `NbLabel`, `NbSelect`, `NbTextarea`, `NbCheckbox`, `NbCard`, `NbImageCard`, `NbAvatar`, `NbBadge`, `NbMarquee`, `NbDialog`, and `NbAccordion`.

---

## Step 1 — Create the project and install ng-brutalism

Start with a fresh Angular CLI app. No Nx, no extra config — just the standard consumer experience that any Angular developer would follow.

```bash
npx @angular/cli@latest new ng-brutalism-job-board \
  --routing=false --style=css --ssr=false
cd ng-brutalism-job-board
```

Now install ng-brutalism with one command:

```bash
ng add @ng-brutalism/ui
```

That's it. The schematic automatically:
- Installs `tailwindcss`, `@tailwindcss/postcss`, and `postcss`
- Creates `.postcssrc.json` wired for Tailwind v4
- Adds `@import 'tailwindcss';` and `@import '@ng-brutalism/ui/styles.css';` to your `styles.css`

No config files to hand-edit, no `tailwind.config.js` to wrestle with.

**Add Google Fonts.** Open `src/index.html` and add three font families from the ng-brutalism design system — Space Grotesk (body), Archivo Black (headings), and JetBrains Mono (monospace):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet">
```

Then set global font defaults in `src/styles.css` (after the existing `@import` lines):

```css
:root {
  --font-body: 'Space Grotesk', sans-serif;
  --font-heading: 'Archivo Black', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

* { box-sizing: border-box; font-family: var(--font-mono); }
body { margin: 0; background: #f9f7f3; color: #111; }
```

---

## Step 2 — Dark header with NbTitle, NbInputGroup, and NbButton

Open `src/app/app.ts`. Import everything you'll need from `@ng-brutalism/ui`:

```typescript
import { Component, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbTitle, NbButton, NbInput, NbInputGroup, NbInputPrefix,
  NbLabel, NbSelect, NbSelectOption, NbTextarea, NbCheckbox,
  NbCard, NbCardHeader, NbCardTitle, NbCardContent, NbCardActions,
  NbImageCard, NbAvatar, NbBadge,
  NbMarquee, NbMarqueeItem,
  NbDialog, NbDialogTitle, NbDialogDescription,
  NbDialogContent, NbDialogActions, NbDialogClose,
  NbAccordion, NbAccordionItem, NbAccordionTrigger, NbAccordionContent,
} from '@ng-brutalism/ui';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    NbTitle, NbButton, NbInput, NbInputGroup, NbInputPrefix,
    NbLabel, NbSelect, NbSelectOption, NbTextarea, NbCheckbox,
    NbCard, NbCardHeader, NbCardTitle, NbCardContent, NbCardActions,
    NbImageCard, NbAvatar, NbBadge,
    NbMarquee, NbMarqueeItem,
    NbDialog, NbDialogTitle, NbDialogDescription,
    NbDialogContent, NbDialogActions, NbDialogClose,
    NbAccordion, NbAccordionItem, NbAccordionTrigger, NbAccordionContent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  selectedJob = signal('');
  dialogRef = viewChild.required<NbDialog>('dialogRef');

  name = ''; email = ''; role: string | null = null;
  coverLetter = ''; agreed = false;

  // ... job data and openDialog() — see Step 3
}
```

In `app.html`, the header uses three ng-brutalism components:

- **`[nbTitle]`** — a directive that adds a wavy underline to any element. Here it highlights the word "dream" in the hero title.
- **`nb-input-group`** — wraps the search input and its prefix icon into a single bordered unit.
- **`button[nbButton]`** — the purple filter button with `variant="primary"`.

```html
<header class="site-header">
  <div class="header-inner">
    <h1 class="hero-title">
      Find your <span nbTitle>dream</span> job
      <span class="hero-sub">Worldwide</span>
    </h1>

    <div class="search-row">
      <nb-input-group class="search-input-group">
        <span nbInputPrefix align="center">🔍</span>
        <input nbInput placeholder="Search jobs..." aria-label="Search jobs" />
      </nb-input-group>
      <button nbButton variant="primary" size="lg">Filter ▼</button>
    </div>
  </div>
</header>
```

In `app.css`, give the header the dark brutalist treatment:

```css
.site-header {
  background: #111111;
  color: #ffffff;
  padding: 48px 32px 40px;
  border-bottom: 3px solid #111111;
}
.header-inner { max-width: 880px; margin: 0 auto; }
.hero-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
  margin: 0 0 32px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.search-row { display: flex; gap: 12px; align-items: center; }
.search-input-group { flex: 1; max-width: 480px; }
```

---

## Step 3 — Marquee banner + job card grid

**Marquee.** Between the header and the card grid, add an `NbMarquee` with a single `NbMarqueeItem`. The component handles cloning, ResizeObserver, and the CSS animation automatically:

```html
<div class="marquee-wrap">
  <nb-marquee duration="25s">
    <nb-marquee-item>
      Now Hiring · Remote-Friendly · Angular Devs Wanted ·
      Open Source · ng-brutalism · Neo-Brutalist UI ·
    </nb-marquee-item>
  </nb-marquee>
</div>
```

**Job data.** Back in `app.ts`, define four job listings — one per pastel card color:

```typescript
interface Job {
  id: number; title: string; company: string;
  logo: string; avatar: string; recruiter: string;
  color: string; badges: string[];
}

readonly jobs: Job[] = [
  {
    id: 1, title: 'Senior Angular Developer', company: 'Google',
    logo: 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    recruiter: 'Alex Kim', color: '#c5f2d8',
    badges: ['Full-time', 'Remote', 'Urgent'],
  },
  {
    id: 2, title: 'UI/UX Designer', company: 'Figma',
    logo: 'https://static.figma.com/app/icon/1/icon-192.png',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    recruiter: 'Sarah Chen', color: '#f8cccc',
    badges: ['Full-time', 'Hybrid'],
  },
  {
    id: 3, title: 'DevOps Engineer', company: 'Vercel',
    logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    recruiter: 'Jordan Lee', color: '#f5e8b8',
    badges: ['Contract', 'Remote'],
  },
  {
    id: 4, title: 'Open Source Maintainer', company: 'GitHub',
    logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
    recruiter: 'Maya Patel', color: '#dcd0f8',
    badges: ['Part-time', 'Remote'],
  },
];
```

**Card grid.** Each card uses five ng-brutalism components: `NbCard` (with `NbCardHeader`, `NbCardTitle`, `NbCardContent`, `NbCardActions`), `NbImageCard`, `NbAvatar`, `NbBadge`, and `NbButton`. The pastel background is set via `[style.background]`:

```html
<main class="job-grid">
  @for (job of jobs; track job.id) {
    <nb-card [style.background]="job.color" class="job-card">
      <nb-card-header class="card-header">
        <nb-image-card [image]="job.logo" [alt]="job.company + ' logo'" class="company-logo" />
        <div class="job-info">
          <nb-card-title>{{ job.title }}</nb-card-title>
          <span class="company-name">{{ job.company }}</span>
        </div>
      </nb-card-header>

      <nb-card-content class="card-content">
        <div class="badge-row">
          @for (badge of job.badges; track badge) {
            <span nbBadge>{{ badge }}</span>
          }
        </div>
        <div class="recruiter-row">
          <nb-avatar [src]="job.avatar" [alt]="job.recruiter" />
          <span class="recruiter-name">{{ job.recruiter }}</span>
        </div>
      </nb-card-content>

      <nb-card-actions class="card-actions">
        <button nbButton (click)="openDialog(job.title)">Apply</button>
        <button nbButton variant="neutral" size="icon" aria-label="Save job">♥</button>
      </nb-card-actions>
    </nb-card>
  }
</main>
```

Add the grid layout and card styles to `app.css`:

```css
.job-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 40px 32px;
  max-width: 880px;
  margin: 0 auto;
}
@media (max-width: 640px) {
  .job-grid { grid-template-columns: 1fr; padding: 24px 16px; }
}
.job-card {
  border-radius: 14px !important;
  border: 2px solid #111 !important;
  box-shadow: 5px 5px 0 #111 !important;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.job-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #111 !important;
}
```

---

## Step 4 — Application dialog

The Apply button triggers a native `<dialog>`-backed `NbDialog`. No dialog service, no overlay — just a template reference and `viewChild.required`.

Wire up the `openDialog` method in `app.ts`:

```typescript
openDialog(title: string): void {
  this.selectedJob.set(title);
  this.name = ''; this.email = '';
  this.role = null; this.coverLetter = ''; this.agreed = false;
  this.dialogRef().open();
}
```

The dialog template uses six ng-brutalism components inside it — `NbDialog`, `NbDialogTitle`, `NbDialogDescription`, `NbDialogContent`, `NbDialogActions`, and `NbDialogClose` — plus `NbLabel`, `NbInputGroup`+`NbInput`, `NbSelect`+`NbSelectOption`, `NbTextarea`, and `NbCheckbox` for the form:

```html
<nb-dialog #dialogRef>
  <h2 nbDialogTitle>Apply for {{ selectedJob() }}</h2>
  <p nbDialogDescription>We'll get back to you within 24 hours.</p>

  <nb-dialog-content class="dialog-form">
    <div class="form-field">
      <label nbLabel for="applicant-name">Name</label>
      <nb-input-group>
        <input nbInput id="applicant-name" [(ngModel)]="name" placeholder="Your full name" />
      </nb-input-group>
    </div>

    <div class="form-field">
      <label nbLabel for="applicant-email">Email</label>
      <nb-input-group>
        <input nbInput id="applicant-email" type="email" [(ngModel)]="email" placeholder="you@example.com" />
      </nb-input-group>
    </div>

    <div class="form-field">
      <label nbLabel>Role / Department</label>
      <nb-select [(value)]="role" placeholder="Select department">
        <nb-select-option value="engineering">Engineering</nb-select-option>
        <nb-select-option value="design">Design</nb-select-option>
        <nb-select-option value="product">Product</nb-select-option>
        <nb-select-option value="marketing">Marketing</nb-select-option>
        <nb-select-option value="devrel">Developer Relations</nb-select-option>
      </nb-select>
    </div>

    <div class="form-field">
      <label nbLabel for="cover-letter">Cover Letter</label>
      <textarea nbTextarea id="cover-letter" rows="4" [(ngModel)]="coverLetter"
        placeholder="Tell us about yourself..."></textarea>
    </div>

    <div class="checkbox-row">
      <input nbCheckbox type="checkbox" id="terms" [(ngModel)]="agreed" />
      <label for="terms">I agree to the terms and conditions</label>
    </div>
  </nb-dialog-content>

  <nb-dialog-actions>
    <button nbButton nbDialogClose>Cancel</button>
    <button nbButton variant="primary" [disabled]="!agreed">Submit Application</button>
  </nb-dialog-actions>
</nb-dialog>
```

`nbDialogClose` is a directive — put it on any button inside the dialog and clicking it closes the modal. No event handler needed.

---

## Step 5 — Accordion footer

Close the page with an `NbAccordion` FAQ section. Set `type="single"` and `[collapsible]="true"` so only one item is open at a time and it can collapse fully:

```html
<section class="accordion-section">
  <nb-accordion type="single" [collapsible]="true">
    <nb-accordion-item value="why">
      <nb-accordion-trigger>Why join us?</nb-accordion-trigger>
      <nb-accordion-content>
        <p>Every listing is hand-curated for remote-friendly, fair-pay roles
           at companies that respect open source and developer experience.</p>
      </nb-accordion-content>
    </nb-accordion-item>

    <nb-accordion-item value="how">
      <nb-accordion-trigger>How it works</nb-accordion-trigger>
      <nb-accordion-content>
        <p>Hit <strong>Apply</strong>, fill out the one-page form.
           Your application goes directly to the hiring manager within 24 hours.</p>
      </nb-accordion-content>
    </nb-accordion-item>

    <nb-accordion-item value="stack">
      <nb-accordion-trigger>What's the tech stack?</nb-accordion-trigger>
      <nb-accordion-content>
        <p>Built with <strong>ng-brutalism</strong> — 15 neo-brutalist Angular components.
           Install: <code>ng add @ng-brutalism/ui</code>.</p>
      </nb-accordion-content>
    </nb-accordion-item>
  </nb-accordion>
</section>
```

---

## Run it

```bash
ng serve
```

Open `http://localhost:4200`. You should see the full neo-brutalist job board — dark header, scrolling marquee, four pastel cards, and an accordion. Click **Apply** on any card to open the dialog.

---

## What you just built

In under 100 lines of template, you've used all 15 **ng-brutalism** components:

| Component | Used for |
|---|---|
| `NbTitle` | Wavy underline on "dream" in hero |
| `NbButton` | Search filter, Apply, Save, dialog actions |
| `NbInput` | Search bar, dialog name/email fields |
| `NbInputGroup` | Wraps search + dialog inputs with border |
| `NbLabel` | Dialog form labels |
| `NbSelect` + `NbSelectOption` | Department dropdown in dialog |
| `NbTextarea` | Cover letter field |
| `NbCheckbox` | Terms checkbox |
| `NbCard` + sub-parts | Job listing card structure |
| `NbImageCard` | Company logo thumbnail |
| `NbAvatar` | Recruiter avatar |
| `NbBadge` | Full-time / Remote / Urgent pills |
| `NbMarquee` | Scrolling "Now Hiring" banner |
| `NbDialog` + sub-parts | Application modal |
| `NbAccordion` | Collapsible FAQ section |

**ng-brutalism** ships 15 neo-brutalist Angular components with a single `ng add @ng-brutalism/ui` — no boilerplate, no config wrestling. Check out the [docs](https://ngbrutalism.khangtran.dev), the [npm package](https://www.npmjs.com/package/@ng-brutalism/ui), or leave a star on [GitHub](https://github.com/khangtrann/ng-brutalism).
