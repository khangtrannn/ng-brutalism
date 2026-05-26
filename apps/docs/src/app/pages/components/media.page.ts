import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMedia } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-media-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbMedia],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Media</p>
          <h1>Media</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A bordered, shadowed container for images, icons, and thumbnails. Think of it
            as the brutalist frame that wraps any visual content — album art, podcast artwork,
            property photos — with hard edges and a hard shadow.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">slot</span>
            <span class="nb-stat-tile__label">ng-content</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">CSS</span>
            <span class="nb-stat-tile__label">4 CSS variables</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/media"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex gap-4 p-4">
            <nb-media class="w-20 h-20" style="background: #ffd24a;">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            </nb-media>
            <nb-media class="w-20 h-20" style="background: #99e8c8;">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </nb-media>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="with-image">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">With image</h2>
        <docs-example [code]="withImageCode">
          <div class="p-4">
            <nb-media class="w-24 h-24">
              <img src="/assets/images/default-og.png" alt="Sample" class="w-full h-full object-cover" />
            </nb-media>
          </div>
        </docs-example>
      </section>

      <section id="customization">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Customization</h2>
        <p class="mb-5 font-medium">Override CSS variables to match any card's color palette.</p>
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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-media-bg</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">var(--nb-background)</td>
                <td class="px-4 py-3">Container background</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-media-border</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">var(--nb-border)</td>
                <td class="px-4 py-3">Border color</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-media-radius</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">var(--nb-radius)</td>
                <td class="px-4 py-3">Corner radius</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-media-shadow</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">2px 2px 0 var(--nb-shadow)</td>
                <td class="px-4 py-3">Box shadow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MediaPage {
  protected readonly importCode = `import { NbMedia } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-media class="w-20 h-20" style="background: #ffd24a;">
  <svg ...>...</svg>
</nb-media>`;

  protected readonly withImageCode = `<nb-media class="w-24 h-24">
  <img src="path/to/image.jpg" alt="Description" class="w-full h-full object-cover" />
</nb-media>`;
}
