import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import JobCardExample from './examples/job-card';

@Component({
  selector: 'docs-recipe-job-card-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, JobCardExample, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Job Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A job posting card with company logo, role, requirement chips, salary, hiring
            contact, and apply CTA. Composed from v0.2.0 primitives.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">6</span>
            <span class="nb-stat-tile__label">Primitives</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">90%</span>
            <span class="nb-stat-tile__label">Fidelity</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/job-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="templateCode">
          <recipe-job-card />
        </docs-example>
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/job-card"
            target="_blank"
            rel="noreferrer"
            >example source</a
          >
          for the full implementation.
        </p>
        <docs-code-block class="block mb-5" title="Imports" [code]="importCode" />
        <docs-code-block title="Template" [code]="templateCode" />
      </section>

      <section id="primitives">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Primitives used</h2>
        <ul class="space-y-2 text-base font-medium">
          @for (item of primitives; track item.path) {
            <li class="flex items-center gap-2">
              <span class="inline-block size-2 border-2 border-(--nb-border) bg-(--nb-yellow)" aria-hidden="true"></span>
              <a class="underline" [routerLink]="item.path">{{ item.name }}</a>
              <span class="text-sm font-normal opacity-80">— {{ item.role }}</span>
            </li>
          }
        </ul>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class JobCardRecipePage {
  protected readonly primitives = [
    { name: 'NbDisplay', path: '/components/display', role: 'mega role title' },
    { name: 'NbChip', path: '/components/chip', role: 'JOBS label + requirement tags' },
    { name: 'NbStatusDot', path: '/components/status-dot', role: 'hiring manager presence' },
    { name: 'NbIconButton', path: '/components/icon-button', role: 'bookmark action' },
    { name: 'NbSticker', path: '/components/sticker', role: 'NEW JOB! burst' },
    { name: 'NbButton', path: '/components/button', role: 'APPLY NOW CTA with trailing arrow' },
  ];

  protected readonly importCode = `import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbIconButton,
  NbStatusDot,
  NbSticker,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<article class="job-card">
  <nb-sticker shape="burst" tone="mint" [rotate]="-8">NEW JOB!</nb-sticker>

  <header class="job-card__header">
    <span nbChip tone="ink">JOBS</span>
    <span aria-hidden="true">⋯</span>
  </header>

  <div class="job-card__company">
    <span class="job-card__logo"><!-- logo svg --></span>
    <span>Nebula Labs</span>
  </div>

  <h1 nbDisplay size="lg">
    SENIOR<br />ANGULAR<br /><span class="accent">ENGINEER</span>
  </h1>

  <div nbChipGroup>
    <span nbChip tone="ink"><!-- pin --> REMOTE</span>
    <span nbChip tone="lavender"><!-- briefcase --> FULL-TIME</span>
    <span nbChip tone="pink"><!-- bolt --> URGENT</span>
  </div>

  <span
    nbChip
    tone="yellow"
    class="gap-[14px] px-[18px] py-[10px] text-[22px] leading-none font-black"
    style="--nb-chip-radius:8px; --nb-chip-shadow:6px 6px 0 0 var(--nb-shadow); --nb-chip-icon-size:36px"
  >
    <!-- cash icon -->
    $95K - $130K
  </span>

  <p>Build accessible UI primitives for modern web apps.</p>

  <footer class="job-card__footer">
    <div class="job-card__person">
      <!-- avatar -->
      <div>
        <span>Alex Kim</span>
        <span>Hiring Manager</span>
        <span>
          <span nbStatusDot state="online" aria-hidden="true"></span>
          ONLINE
        </span>
      </div>
    </div>

    <div class="job-card__actions">
      <button nbButton type="button">
        APPLY NOW
        <span nbButtonTrailingIcon><!-- arrow --></span>
      </button>
      <button nbIconButton type="button" aria-label="Save job" size="sm">
        <!-- bookmark -->
      </button>
    </div>
  </footer>
</article>`;
}
