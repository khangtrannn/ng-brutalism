import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import CharityCardExample from './examples/charity-card';

@Component({
  selector: 'docs-recipe-charity-card-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, CharityCardExample, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Charity Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A donation campaign card with goal progress, category tags, supporter count,
            and a primary donate action. Showcases progress and avatar grouping.
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
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/charity-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="templateCode">
          <recipe-charity-card />
        </docs-example>
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/charity-card"
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
export default class CharityCardRecipePage {
  protected readonly primitives = [
    { name: 'NbDisplay', path: '/components/display', role: 'campaign mega title' },
    { name: 'NbProgress', path: '/components/progress', role: 'donation goal bar' },
    { name: 'NbAvatarGroup', path: '/components/avatar-group', role: 'supporter stack + overflow' },
    { name: 'NbChip', path: '/components/chip', role: 'URGENT / COMMUNITY / LOCAL tags' },
    { name: 'NbSticker', path: '/components/sticker', role: 'IMPACT! burst' },
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

  protected readonly templateCode = `<article class="charity-card">
  <nb-sticker shape="burst" tone="mint" [rotate]="8">MAKE AN IMPACT!</nb-sticker>

  <header class="charity-card__header">
    <span class="charity-card__logo"><!-- heart --></span>
    <div>
      <span>Kind Box</span>
      <span>Share More. Worry Less.</span>
    </div>
  </header>

  <h1 nbDisplay size="lg">FEED 100<br />FAMILIES</h1>

  <div class="charity-card__goal">
    <span>$8.2K</span>
    <span>/ $10K</span>
    <nb-progress [value]="82" [max]="100" tone="success" />
  </div>

  <div nbChipGroup>
    <span nbChip tone="yellow"><!-- bolt --> URGENT</span>
    <span nbChip tone="lavender"><!-- people --> COMMUNITY</span>
    <span nbChip tone="mint"><!-- pin --> LOCAL</span>
  </div>

  <div class="charity-card__illustration">
    <!-- hands holding box illustration -->
  </div>

  <p>Your donation helps us provide meals and essentials...</p>

  <footer class="charity-card__footer">
    <div class="charity-card__supporters">
      <nb-avatar-group [overflow]="142">
        <span class="charity-card__mini-avatar"></span>
        <span class="charity-card__mini-avatar"></span>
        <span class="charity-card__mini-avatar"></span>
      </nb-avatar-group>
      <span>Over 142 supporters this week</span>
    </div>

    <div class="charity-card__actions">
      <button nbButton type="button">DONATE NOW</button>
      <button nbIconButton type="button" size="sm" aria-label="Save"><!-- bookmark --></button>
    </div>
  </footer>

  <nb-halftone position="bottom-right" [rows]="6" [cols]="6" [size]="4" [gap]="4" />
</article>`;
}
