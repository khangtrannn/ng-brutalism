import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbChip, NbChipGroup } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-chip-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbChip, NbChipGroup],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Chip</p>
          <h1>Chip</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A directive on <code class="font-mono">&lt;span&gt;</code> for compact
            labels, tags, and categories. Pairs with <code class="font-mono">NbChipGroup</code>
            for horizontal chip rows. Supports 9 tones and an optional leading icon via
            <code class="font-mono">ng-content</code>.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">span</span>
            <span class="nb-stat-tile__label">Host element</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">9</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/chip"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <nb-chip-group class="p-4">
            <span nbChip>Angular</span>
            <span nbChip tone="mint">TypeScript</span>
            <span nbChip tone="pink">RxJS</span>
            <span nbChip tone="lavender">Signals</span>
          </nb-chip-group>
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
          <nb-chip-group class="p-4">
            <span nbChip>default</span>
            <span nbChip tone="yellow">yellow</span>
            <span nbChip tone="pink">pink</span>
            <span nbChip tone="mint">mint</span>
            <span nbChip tone="lavender">lavender</span>
            <span nbChip tone="accent">accent</span>
            <span nbChip tone="success">success</span>
            <span nbChip tone="warning">warning</span>
            <span nbChip tone="danger">danger</span>
          </nb-chip-group>
        </docs-example>
      </section>

      <section id="with-icon">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">With Icon</h2>
        <p class="mb-4 font-medium">
          Place any SVG icon inside the chip — it auto-sizes to 12px.
        </p>
        <docs-example [code]="withIconExampleCode">
          <nb-chip-group class="p-4">
            <span nbChip tone="mint">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Done
            </span>
            <span nbChip tone="danger">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Error
            </span>
          </nb-chip-group>
        </docs-example>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <p class="mb-4 font-bold">NbChip</p>
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
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">tone</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'accent' | 'success' | 'warning' | 'danger'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default'</td>
                <td class="px-4 py-3">Background color tone.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-6 mb-4 font-bold">NbChipGroup</p>
        <p class="font-medium">Wrapper component with <code class="font-mono">flex flex-wrap gap-2</code>. No inputs — use Tailwind or inline styles to override spacing.</p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChipPage {
  protected readonly importCode = `import { NbChip, NbChipGroup } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-chip-group>
  <span nbChip>Angular</span>
  <span nbChip tone="mint">TypeScript</span>
  <span nbChip tone="pink">RxJS</span>
  <span nbChip tone="lavender">Signals</span>
</nb-chip-group>`;

  protected readonly tonesExampleCode = `<nb-chip-group>
  <span nbChip>default</span>
  <span nbChip tone="yellow">yellow</span>
  <span nbChip tone="pink">pink</span>
  <span nbChip tone="mint">mint</span>
  <span nbChip tone="lavender">lavender</span>
  <span nbChip tone="accent">accent</span>
  <span nbChip tone="success">success</span>
  <span nbChip tone="warning">warning</span>
  <span nbChip tone="danger">danger</span>
</nb-chip-group>`;

  protected readonly withIconExampleCode = `<nb-chip-group>
  <span nbChip tone="mint">
    <svg ...>...</svg>
    Done
  </span>
  <span nbChip tone="danger">
    <svg ...>...</svg>
    Error
  </span>
</nb-chip-group>`;
}
