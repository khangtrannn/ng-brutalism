import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-stat-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbStat],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Stat</p>
          <h1>Stat</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A compact value + label display for surfacing metrics, prices, counts, and
            scores. Used throughout brutalist card designs to anchor key numbers with
            maximum visual weight.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Inputs</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Directions</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/stat"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex flex-wrap items-end gap-8 p-4">
            <nb-stat value="$29" label="per month" />
            <nb-stat value="4.8★" label="rating" />
            <nb-stat value="142" label="backed" />
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="with-icon">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">With icon</h2>
        <p class="mb-4 font-medium">
          Project any element into the <code class="font-mono">slot="icon"</code>
          slot to prepend it to the stat.
        </p>
        <docs-example [code]="withIconCode">
          <div class="flex items-center gap-8 p-4">
            <nb-stat value="4.9" label="rating">
              <span slot="icon" class="text-xl" aria-hidden="true">★</span>
            </nb-stat>
          </div>
        </docs-example>
      </section>

      <section id="row-direction">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Row direction</h2>
        <docs-example [code]="rowDirectionCode">
          <div class="flex flex-col gap-3 p-4">
            <nb-stat value="98%" label="satisfaction" direction="row" />
            <nb-stat value="12K" label="downloads" direction="row" />
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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">value</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">required</td>
                <td class="px-4 py-3">The primary metric value displayed prominently.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">label</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">required</td>
                <td class="px-4 py-3">Descriptive label rendered below (or beside) the value.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">direction</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'column' | 'row'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'column'</td>
                <td class="px-4 py-3">Stacks value + label vertically or horizontally.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StatPage {
  protected readonly importCode = `import { NbStat } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-stat value="$29" label="per month" />
<nb-stat value="4.8★" label="rating" />
<nb-stat value="142" label="backed" />`;

  protected readonly withIconCode = `<nb-stat value="4.9" label="rating">
  <span slot="icon" aria-hidden="true">★</span>
</nb-stat>`;

  protected readonly rowDirectionCode = `<nb-stat value="98%" label="satisfaction" direction="row" />
<nb-stat value="12K" label="downloads" direction="row" />`;
}
