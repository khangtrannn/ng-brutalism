import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSeparator } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
  selector: 'docs-separator-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, DocsTokens, NbSeparator],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Separator</p>
          <h1>Separator</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A directive on <code class="font-mono">&lt;hr&gt;</code> for visual
            section dividers. Supports horizontal and vertical orientations with
            solid, dashed, and thick variants — a structural staple in every
            brutalist card layout.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">hr</span>
            <span class="nb-stat-tile__label">Host element</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Variants</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Orientations</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/separator"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex w-full flex-col gap-4 p-4">
            <p class="font-bold">Section A</p>
            <hr nbSeparator />
            <p class="font-bold">Section B</p>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="variants">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Variants</h2>
        <docs-example [code]="variantsExampleCode">
          <div class="flex w-full flex-col gap-6 p-4">
            <div class="w-full">
              <p class="mb-3 font-mono text-xs font-bold uppercase text-(--nb-border)">variant="solid" (default)</p>
              <hr nbSeparator />
            </div>
            <div class="w-full">
              <p class="mb-3 font-mono text-xs font-bold uppercase text-(--nb-border)">variant="dashed"</p>
              <hr nbSeparator variant="dashed" />
            </div>
            <div class="w-full">
              <p class="mb-3 font-mono text-xs font-bold uppercase text-(--nb-border)">variant="thick"</p>
              <hr nbSeparator variant="thick" />
            </div>
          </div>
        </docs-example>
      </section>

      <section id="orientation">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Vertical</h2>
        <p class="mb-4 font-medium">
          Set <code class="font-mono">orientation="vertical"</code> to render a
          column divider. The separator stretches to fill the height of its flex
          container.
        </p>
        <docs-example [code]="verticalExampleCode">
          <div class="flex h-16 items-center gap-4 px-4">
            <span class="font-bold">Angular</span>
            <hr nbSeparator orientation="vertical" />
            <span class="font-bold">Brutalism</span>
            <hr nbSeparator orientation="vertical" variant="dashed" />
            <span class="font-bold">v0.2</span>
          </div>
        </docs-example>
      </section>

      <section id="custom-color">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Custom Color</h2>
        <p class="mb-4 font-medium">
          Override <code class="font-mono">--nb-separator-color</code> inline
          to use any color without touching the global theme.
        </p>
        <docs-example [code]="customColorExampleCode">
          <div class="flex w-full flex-col gap-4 p-4">
            <hr nbSeparator style="--nb-separator-color: #ff90e8" />
            <hr nbSeparator variant="thick" style="--nb-separator-color: #8ae9ff" />
            <hr nbSeparator variant="dashed" style="--nb-separator-color: #c8a2ff" />
          </div>
        </docs-example>
      </section>

      <docs-tokens component="separator" />

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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">orientation</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'horizontal' | 'vertical'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'horizontal'</td>
                <td class="px-4 py-3">Direction of the divider line.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">variant</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'solid' | 'dashed' | 'thick'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'solid'</td>
                <td class="px-4 py-3">Line style. <code class="font-mono">thick</code> renders a 4 px border.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SeparatorPage {
  protected readonly importCode = `import { NbSeparator } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<hr nbSeparator />`;

  protected readonly variantsExampleCode = `<hr nbSeparator />
<hr nbSeparator variant="dashed" />
<hr nbSeparator variant="thick" />`;

  protected readonly verticalExampleCode = `<div class="flex h-16 items-center gap-4">
  <span>Angular</span>
  <hr nbSeparator orientation="vertical" />
  <span>Brutalism</span>
  <hr nbSeparator orientation="vertical" variant="dashed" />
  <span>v0.2</span>
</div>`;

  protected readonly customColorExampleCode = `<hr nbSeparator style="--nb-separator-color: #ff90e8" />
<hr nbSeparator variant="thick" style="--nb-separator-color: #8ae9ff" />
<hr nbSeparator variant="dashed" style="--nb-separator-color: #c8a2ff" />`;
}
