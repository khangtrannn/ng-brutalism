import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../../docs/docs-code-block';
import { DocsSourceTile } from '../../../docs/docs-source-tile';

import { TravelCard } from './travel-card';

@Component({
  selector: 'docs-recipe-travel-card-page',
  imports: [DocsCodeBlock, DocsSourceTile, TravelCard, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Travel Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A bold travel-package card composing the library's media, sticker,
            chip, and display primitives into a single brutalist promo. Hero
            banner, trip highlights, price, and a call to action — responsive
            down to mobile.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">7</span>
            <span class="nb-stat-tile__label">Primitives</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">100%</span>
            <span class="nb-stat-tile__label">Composed</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/travel-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>

        <recipe-travel-card />
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/travel-card"
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
export default class TravelCardRecipePage {
  protected readonly primitives = [
    { name: 'NbCard', path: '/components/card', role: 'bordered card shell' },
    { name: 'NbMediaFrame', path: '/components/media-frame', role: 'hero banner image' },
    { name: 'NbSticker', path: '/components/sticker', role: '4D/3N highlight burst' },
    { name: 'NbDisplay', path: '/components/display', role: 'destination mega title' },
    { name: 'NbChip', path: '/components/chip', role: 'flight / hotel / top-pick tags' },
    { name: 'NbMediaItem', path: '/components/media-item', role: 'icon + label trip features' },
    { name: 'NbButton', path: '/components/button', role: 'book trip call to action' },
  ];

  protected readonly importCode = `import {
  NbButton,
  NbButtonTrailingIcon,
  NbCard,
  NbChip,
  NbDisplay,
  NbMediaFrame,
  NbMediaItem,
  NbSticker,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<nb-card class="relative w-full max-w-220">
  <!-- Hero banner with floating sticker -->
  <div class="relative px-5">
    <nb-sticker shape="burst" tone="mint" [size]="0.6"
      class="absolute -top-7 -left-5 z-20">4D<br />3N</nb-sticker>
    <div nbMediaFrame ratio="21/9" radius="lg" shadow="hard">
      <img src="/tokyo-city-escape/hero-illustration.png" alt="Tokyo skyline" />
    </div>
  </div>

  <!-- Headline + trip meta -->
  <div class="flex flex-col gap-6 px-6 md:flex-row md:justify-between">
    <div class="flex flex-col gap-4 md:flex-1">
      <h1 nbDisplay size="lg" class="uppercase">Tokyo City Escape</h1>
      <p>Explore iconic neighborhoods, savor local flavors…</p>
    </div>
    <div class="flex flex-col gap-4 md:items-end">
      <span nbChip tone="mint">Flight included</span>
      <span nbChip tone="lavender">Hotel</span>
      <span nbChip tone="pink">Top pick</span>
    </div>
  </div>

  <!-- Features + CTA -->
  <div class="flex border-t-2 px-6 pt-6 sm:justify-between">
    <nb-media-item icon="…/central-locations.png" title="Central Locations" />
    <button nbButton variant="secondary" size="lg">
      Book Trip
      <svg nbButtonTrailingIcon>…</svg>
    </button>
  </div>
</nb-card>`;
}
