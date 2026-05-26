import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTile } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-tile-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbTile],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Tile</p>
          <h1>Tile</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            An icon + title + description row — the building block for feature lists,
            amenity grids, and benefit check-lists. Pairs with an optional leading
            icon slot and subtle press animation on interaction.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Slots</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">CSS</span>
            <span class="nb-stat-tile__label">5 CSS variables</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/tile"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex flex-col gap-2 p-4 max-w-sm">
            <nb-tile>
              <span slot="icon" class="text-xl" aria-hidden="true">🏠</span>
              <span slot="title">2 Bedrooms</span>
              <span slot="description">Bright, south-facing rooms with city views</span>
            </nb-tile>
            <nb-tile>
              <span slot="icon" class="text-xl" aria-hidden="true">🌿</span>
              <span slot="title">Private Garden</span>
              <span slot="description">80 sqm terrace with mature planting</span>
            </nb-tile>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="feature-list">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Feature list</h2>
        <p class="mb-4 font-medium">
          Wrap tiles in a <code class="font-mono">&lt;ul&gt;</code> with
          <code class="font-mono">list-none</code> for semantic markup.
        </p>
        <docs-example [code]="featureListCode">
          <ul class="flex flex-col gap-2 p-4 list-none max-w-sm">
            <li><nb-tile>
              <span slot="icon">✓</span>
              <span slot="title">Unlimited components</span>
              <span slot="description">All primitives included</span>
            </nb-tile></li>
            <li><nb-tile>
              <span slot="icon">✓</span>
              <span slot="title">TypeScript first</span>
              <span slot="description">Full type safety</span>
            </nb-tile></li>
            <li><nb-tile>
              <span slot="icon">✓</span>
              <span slot="title">Zero deps</span>
              <span slot="description">Just Angular + Tailwind</span>
            </nb-tile></li>
          </ul>
        </docs-example>
      </section>

      <section id="customization">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Customization</h2>
        <p class="mb-5 font-medium">Override CSS variables on the tile or a parent to style the whole list.</p>
        <div class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]">
          <table class="w-full min-w-160 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Token</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Used for</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-tile-bg</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">var(--nb-background)</td>
                <td class="px-4 py-3">Tile background</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-tile-border</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">var(--nb-border)</td>
                <td class="px-4 py-3">Border color</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-tile-radius</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">var(--nb-radius)</td>
                <td class="px-4 py-3">Corner radius</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-tile-shadow</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">2px 2px 0 var(--nb-shadow)</td>
                <td class="px-4 py-3">Box shadow</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-tile-description-fg</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">var(--nb-foreground)</td>
                <td class="px-4 py-3">Description text color</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TilePage {
  protected readonly importCode = `import { NbTile } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-tile>
  <span slot="icon" aria-hidden="true">🏠</span>
  <span slot="title">2 Bedrooms</span>
  <span slot="description">Bright, south-facing rooms with city views</span>
</nb-tile>`;

  protected readonly featureListCode = `<ul class="list-none">
  <li><nb-tile>
    <span slot="icon">✓</span>
    <span slot="title">Unlimited components</span>
    <span slot="description">All primitives included</span>
  </nb-tile></li>
</ul>`;
}
