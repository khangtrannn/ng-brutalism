import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../../docs/docs-code-block';
import { DocsExample } from '../../../docs/docs-example';
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
            Description
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
    { name: 'NbDisplay', path: '/components/display', role: 'destination mega title' },
    { name: 'NbProgress', path: '/components/progress', role: 'trip completion bar' },
    { name: 'NbAvatarGroup', path: '/components/avatar-group', role: 'traveler stack + overflow' },
    { name: 'NbChip', path: '/components/chip', role: 'category tags' },
    { name: 'NbSticker', path: '/components/sticker', role: 'highlight burst' },
    { name: 'NbHalftone', path: '/components/halftone', role: 'decorative dots' },
    { name: 'NbIconButton', path: '/components/icon-button', role: 'save action' },
  ];

  protected readonly importCode = `import {
  NbAvatarGroup,
  NbButton,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbHalftone,
  NbIconButton,
  NbProgress,
  NbSticker,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = ``;
}
