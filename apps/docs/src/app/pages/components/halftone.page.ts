import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbHalftone } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-halftone-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbHalftone],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Halftone</p>
          <h1>Halftone</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A decorative dot-grid component that anchors to card corners via absolute
            positioning. The classic halftone pattern borrowed from print design — adds
            depth and texture to brutalist cards without cluttering the layout.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Positions</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">SVG</span>
            <span class="nb-stat-tile__label">Inline dot grid</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/halftone"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]" style="min-height: 140px;">
            <nb-halftone position="bottom-right" />
            <p class="font-bold text-lg">Card with halftone</p>
            <p class="font-medium text-sm mt-1">Dot grid anchors to the bottom-right corner.</p>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Place <code class="font-mono">&lt;nb-halftone&gt;</code> inside a
          <code class="font-mono">relative overflow-hidden</code> container. It uses
          <code class="font-mono">position: absolute</code> and is decorative
          (<code class="font-mono">aria-hidden="true"</code>).
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="positions">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Positions</h2>
        <docs-example [code]="positionsExampleCode">
          <div class="grid grid-cols-2 gap-4 p-4">
            @for (pos of positions; track pos) {
              <div
                class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper shadow-[3px_3px_0_0_var(--nb-shadow)] flex items-center justify-center"
                style="min-height: 160px;"
              >
                <nb-halftone [position]="pos" />
                <span class="font-mono text-sm font-bold">{{ pos }}</span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="custom-color">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Custom Color</h2>
        <docs-example [code]="customColorCode">
          <div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]" style="min-height: 140px;">
            <nb-halftone position="top-right" color="#ff90e8" />
            <nb-halftone position="bottom-left" color="#8ae9ff" />
            <p class="font-bold">Custom dot colors</p>
          </div>
        </docs-example>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-160 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Input</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Type</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">position</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'bottom-right'</td>
                <td class="px-4 py-3">Which corner to anchor the dot grid.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">color</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">var(--nb-border)</td>
                <td class="px-4 py-3">Dot fill color (any CSS color value).</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">rows</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">7</td>
                <td class="px-4 py-3">Number of dot rows.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">cols</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">7</td>
                <td class="px-4 py-3">Number of dot columns.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">6</td>
                <td class="px-4 py-3">Dot diameter in px.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">gap</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">5</td>
                <td class="px-4 py-3">Gap between dots in px.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HalftonePage {
  protected readonly positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;

  protected readonly importCode = `import { NbHalftone } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div class="relative overflow-hidden ...">
  <nb-halftone position="bottom-right" />
  <p>Card content</p>
</div>`;

  protected readonly positionsExampleCode = `<div class="relative overflow-hidden ...">
  <nb-halftone position="top-left" />
  <!-- ... -->
</div>`;

  protected readonly customColorCode = `<div class="relative overflow-hidden ...">
  <nb-halftone position="top-right" color="#ff90e8" />
  <nb-halftone position="bottom-left" color="#8ae9ff" />
</div>`;
}
