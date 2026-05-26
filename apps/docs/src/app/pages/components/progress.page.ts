import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbProgress } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-progress-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbProgress],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Progress</p>
          <h1>Progress</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A progress bar component with ARIA progressbar semantics. Supports
            <code class="font-mono">value</code>, <code class="font-mono">max</code>,
            and 5 tones for different semantic contexts — from fundraising goals to
            media playback.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">A11y</span>
            <span class="nb-stat-tile__label">ARIA progressbar</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">5</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/progress"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex w-full flex-col gap-4 p-4">
            <nb-progress [value]="68" label="Campaign progress" />
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="tones">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
        <docs-example [code]="tonesExampleCode">
          <div class="flex w-full flex-col gap-5 p-4">
            <div>
              <p class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)">default</p>
              <nb-progress [value]="60" />
            </div>
            <div>
              <p class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)">success</p>
              <nb-progress [value]="80" tone="success" />
            </div>
            <div>
              <p class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)">warning</p>
              <nb-progress [value]="45" tone="warning" />
            </div>
            <div>
              <p class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)">danger</p>
              <nb-progress [value]="20" tone="danger" />
            </div>
            <div>
              <p class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)">accent</p>
              <nb-progress [value]="70" tone="accent" />
            </div>
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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">0</td>
                <td class="px-4 py-3">Current progress value. Clamped between 0 and max.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">max</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">100</td>
                <td class="px-4 py-3">Maximum value (100% fill point).</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">tone</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default' | 'success' | 'warning' | 'danger' | 'accent'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default'</td>
                <td class="px-4 py-3">Fill color tone.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">label</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'Progress'</td>
                <td class="px-4 py-3">ARIA label for the progressbar role.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProgressPage {
  protected readonly importCode = `import { NbProgress } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-progress [value]="68" label="Campaign progress" />`;

  protected readonly tonesExampleCode = `<nb-progress [value]="60" />
<nb-progress [value]="80" tone="success" />
<nb-progress [value]="45" tone="warning" />
<nb-progress [value]="20" tone="danger" />
<nb-progress [value]="70" tone="accent" />`;
}
