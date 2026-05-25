import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDisplay } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
  selector: 'docs-display-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, DocsTokens, NbDisplay],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Display</p>
          <h1>Display</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A directive for mega-sized heading text. Apply it to any
            <code class="font-mono">h1</code> or <code class="font-mono">h2</code>
            to get ultra-bold, tight-leading display typography — the dominant
            visual element in every brutalist card design.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">h1/h2</span>
            <span class="nb-stat-tile__label">Host elements</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Size variants</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">CSS variables</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/display"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <h2 nbDisplay class="uppercase">SENIOR ANGULAR ENGINEER</h2>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="sizes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesExampleCode">
          <div class="flex flex-col gap-6">
            <div>
              <p class="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)">size="sm" — 2rem</p>
              <h2 nbDisplay size="sm" class="uppercase">PRO PLAN</h2>
            </div>
            <div>
              <p class="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)">size="default" — 3rem</p>
              <h2 nbDisplay class="uppercase">INDIE CUP</h2>
            </div>
            <div>
              <p class="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)">size="lg" — 3.75rem</p>
              <h2 nbDisplay size="lg" class="uppercase">NORA CHEN</h2>
            </div>
            <div>
              <p class="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)">size="xl" — 5rem</p>
              <h2 nbDisplay size="xl" class="uppercase">GO</h2>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="custom-size">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Custom Size</h2>
        <p class="mb-4 font-medium">
          Override <code class="font-mono">--nb-display-size</code> inline for any arbitrary value
          outside the 4 presets.
        </p>
        <docs-example [code]="customSizeExampleCode">
          <h2
            nbDisplay
            class="uppercase"
            style="--nb-display-size: 2.25rem"
          >
            $29/mo
          </h2>
        </docs-example>
      </section>

      <docs-tokens component="display" />

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
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'sm' | 'default' | 'lg' | 'xl'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default'</td>
                <td class="px-4 py-3">Controls font size via <code class="font-mono">--nb-display-size</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DisplayPage {
  protected readonly importCode = `import { NbDisplay } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<h2 nbDisplay class="uppercase">SENIOR ANGULAR ENGINEER</h2>`;

  protected readonly sizesExampleCode = `<h2 nbDisplay size="sm" class="uppercase">PRO PLAN</h2>
<h2 nbDisplay class="uppercase">INDIE CUP</h2>
<h2 nbDisplay size="lg" class="uppercase">NORA CHEN</h2>
<h2 nbDisplay size="xl" class="uppercase">GO</h2>`;

  protected readonly customSizeExampleCode = `<h2 nbDisplay class="uppercase" style="--nb-display-size: 2.25rem">
  $29/mo
</h2>`;
}
