import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import EsportsCardExample from './examples/esports-card';

@Component({
  selector: 'docs-recipe-esports-card-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, EsportsCardExample, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Esports Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A wide tournament card with pixel-art hero, format chips, prize stat, top
            teams tile list, and join CTA. Showcases Stat, Tile, and Separator together.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">8</span>
            <span class="nb-stat-tile__label">Primitives</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">90%</span>
            <span class="nb-stat-tile__label">Fidelity</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/esports-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="templateCode">
          <recipe-esports-card />
        </docs-example>
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/esports-card"
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
export default class EsportsCardRecipePage {
  protected readonly primitives = [
    { name: 'NbDisplay', path: '/components/display', role: 'INDIE CUP title' },
    { name: 'NbStat', path: '/components/stat', role: 'Total Prize Pool — $2,500' },
    { name: 'NbTile', path: '/components/tile', role: 'Top 4 teams list' },
    { name: 'NbSeparator', path: '/components/separator', role: 'between label and team list' },
    { name: 'NbChip', path: '/components/chip', role: 'ONLINE / 3V3 / LIVE tags' },
    { name: 'NbStatusDot', path: '/components/status-dot', role: 'LIVE indicator' },
    { name: 'NbSticker', path: '/components/sticker', role: 'LIVE FINALS! burst' },
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
  NbSeparator,
  NbStat,
  NbStatusDot,
  NbSticker,
  NbTile,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<article class="esports-card">
  <nb-sticker shape="burst" tone="mint" [rotate]="-8">LIVE FINALS!</nb-sticker>

  <div class="esports-card__grid">
    <section class="esports-card__main">
      <header>
        <span nbChip tone="lavender"><!-- gamepad --> PIXEL CLASH</span>
        <span aria-hidden="true">⋯</span>
      </header>

      <h1 nbDisplay size="lg">INDIE<br />CUP</h1>

      <p>Where indie teams rise.<br />Only one will pixelate the rest.</p>

      <div nbChipGroup>
        <span nbChip><!-- globe --> ONLINE</span>
        <span nbChip tone="yellow"><!-- users --> 3V3</span>
        <span nbChip tone="pink">
          <span nbStatusDot state="live" aria-hidden="true"></span>
          LIVE
        </span>
      </div>

      <div class="esports-card__prize">
        <nb-stat value="$2,500" label="Total Prize Pool" direction="row">
          <span slot="icon"><!-- coin --></span>
        </nb-stat>
      </div>
    </section>

    <section class="esports-card__side">
      <nb-media class="esports-card__art">
        <!-- pixel-art trophy + character -->
      </nb-media>

      <div class="esports-card__teams">
        <h3>TOP 4 TEAMS</h3>
        <hr nbSeparator />
        <nb-tile>
          <span slot="icon"><!-- crown --></span>
          <span slot="title">PIXEL PUNKS</span>
        </nb-tile>
        <nb-tile>
          <span slot="icon"><!-- crown --></span>
          <span slot="title">BYTE BRIGADE</span>
        </nb-tile>
        <nb-tile>
          <span slot="icon"><!-- crown --></span>
          <span slot="title">8BIT HEROES</span>
        </nb-tile>
        <nb-tile>
          <span slot="icon"><!-- crown --></span>
          <span slot="title">LO-FI LEGENDS</span>
        </nb-tile>
      </div>
    </section>
  </div>

  <footer class="esports-card__footer">
    <button nbButton type="button">
      JOIN MATCH
      <span nbButtonTrailingIcon><!-- arrow --></span>
    </button>
    <button nbIconButton type="button" size="sm" aria-label="Save event">
      <!-- bookmark -->
    </button>
  </footer>

  <nb-halftone position="bottom-left" [rows]="5" [cols]="5" [size]="4" [gap]="4" />
</article>`;
}
