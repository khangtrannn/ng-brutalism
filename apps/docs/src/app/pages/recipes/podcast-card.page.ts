import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import PodcastCardExample from './examples/podcast-card';

@Component({
  selector: 'docs-recipe-podcast-card-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, PodcastCardExample, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Podcast Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A podcast episode card with show branding, topic chips, live host status,
            playback progress, and a primary listen CTA.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">7</span>
            <span class="nb-stat-tile__label">Primitives</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">90%</span>
            <span class="nb-stat-tile__label">Fidelity</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/podcast-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="templateCode">
          <recipe-podcast-card />
        </docs-example>
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/podcast-card"
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
export default class PodcastCardRecipePage {
  protected readonly primitives = [
    { name: 'NbDisplay', path: '/components/display', role: 'episode mega title' },
    { name: 'NbProgress', path: '/components/progress', role: 'playback position' },
    { name: 'NbChip', path: '/components/chip', role: 'PODCAST + duration / NEW / topic' },
    { name: 'NbStatusDot', path: '/components/status-dot', role: 'ON AIR pulse' },
    { name: 'NbIconButton', path: '/components/icon-button', role: 'play + bookmark' },
    { name: 'NbSticker', path: '/components/sticker', role: 'star burst' },
    { name: 'NbHalftone', path: '/components/halftone', role: 'decorative dots' },
  ];

  protected readonly importCode = `import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbHalftone,
  NbIconButton,
  NbProgress,
  NbStatusDot,
  NbSticker,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<article class="podcast-card">
  <nb-sticker shape="burst" tone="yellow" [rotate]="10">★</nb-sticker>

  <header>
    <span nbChip tone="pink"><!-- mic --> PODCAST</span>
  </header>

  <div class="podcast-card__brand">
    <span class="podcast-card__logo">B+FM</span>
    <span>Build Loud FM</span>
  </div>

  <span class="podcast-card__episode">EP 42</span>

  <h1 nbDisplay size="lg">
    DESIGN<br />SYSTEMS<br /><span class="accent">THAT SCALE</span>
  </h1>

  <div nbChipGroup>
    <span nbChip><!-- clock --> 45 MIN</span>
    <span nbChip tone="mint"><!-- spark --> NEW</span>
    <span nbChip tone="lavender"><!-- tag --> UX</span>
  </div>

  <p>Practical strategies for building design systems...</p>

  <div class="podcast-card__host">
    <!-- avatar -->
    <div>
      <span>Kai Nguyen</span>
      <span>Host</span>
      <span>
        <span nbStatusDot state="live" aria-hidden="true"></span>
        ON AIR
      </span>
    </div>
  </div>

  <div class="podcast-card__player">
    <button nbIconButton type="button" shape="circle" size="sm" aria-label="Play">
      <!-- play -->
    </button>
    <div class="podcast-card__progress-wrap">
      <!-- waveform svg -->
      <nb-progress [value]="49" [max]="100" tone="accent" label="Playback position" />
    </div>
    <span>22:18 / 45:00</span>
  </div>

  <footer>
    <button nbButton type="button">
      LISTEN NOW
      <span nbButtonTrailingIcon><!-- play --></span>
    </button>
    <button nbIconButton type="button" size="sm" aria-label="Save episode">
      <!-- bookmark -->
    </button>
  </footer>

  <nb-halftone position="bottom-right" [rows]="5" [cols]="5" [size]="4" [gap]="4" />
</article>`;
}
