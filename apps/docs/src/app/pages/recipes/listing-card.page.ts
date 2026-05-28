import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import ListingCardExample from './examples/listing-card';

@Component({
  selector: 'docs-recipe-listing-card-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, ListingCardExample, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Listing Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A real estate listing card with hero photo, feature chips, price, agent
            contact, and tour CTA. Showcases the Media primitive for visuals.
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
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/listing-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="templateCode">
          <recipe-listing-card />
        </docs-example>
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/listing-card"
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
export default class ListingCardRecipePage {
  protected readonly primitives = [
    { name: 'NbMedia', path: '/components/media', role: 'hero photo frame' },
    { name: 'NbDisplay', path: '/components/display', role: 'mega listing title' },
    { name: 'NbChip', path: '/components/chip', role: 'feature tags' },
    { name: 'NbStatusDot', path: '/components/status-dot', role: 'agent presence' },
    { name: 'NbIconButton', path: '/components/icon-button', role: 'bookmark action' },
    { name: 'NbSticker', path: '/components/sticker', role: 'NEW LISTING burst' },
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
  NbMedia,
  NbStatusDot,
  NbSticker,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<article class="listing-card">
  <nb-sticker shape="burst" tone="mint" [rotate]="10">NEW LISTING!</nb-sticker>

  <header class="listing-card__header">
    <span class="listing-card__logo"><!-- building --></span>
    <div>
      <span>Bricklane</span>
      <span>Homes</span>
    </div>
    <span class="listing-card__est">EST. 2021</span>
  </header>

  <nb-media class="listing-card__photo">
    <!-- photo -->
  </nb-media>

  <h1 nbDisplay size="lg">SUNLIT <span class="accent">LOFT</span></h1>

  <div nbChipGroup>
    <span nbChip><!-- bed --> 2 BED</span>
    <span nbChip tone="lavender"><!-- view --> CITY VIEW</span>
    <span nbChip tone="yellow"><!-- paw --> PET FRIENDLY</span>
  </div>

  <div class="listing-card__price">$420K</div>

  <p>Bright, airy loft with floor-to-ceiling windows...</p>

  <footer class="listing-card__footer">
    <div class="listing-card__agent">
      <!-- avatar -->
      <div>
        <span>Lena Park</span>
        <span>Sr. Property Advisor</span>
        <span>
          <span nbStatusDot state="online" aria-hidden="true"></span>
          ONLINE
        </span>
      </div>
    </div>

    <div class="listing-card__actions">
      <button nbButton type="button">
        VIEW TOUR
        <span nbButtonTrailingIcon><!-- arrow --></span>
      </button>
      <button nbIconButton type="button" size="sm" aria-label="Save listing">
        <!-- bookmark -->
      </button>
    </div>
  </footer>

  <nb-halftone position="bottom-left" [rows]="5" [cols]="5" [size]="4" [gap]="4" />
</article>`;
}
