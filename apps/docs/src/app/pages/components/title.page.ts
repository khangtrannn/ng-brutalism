import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTitle } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
    selector: 'docs-title-page',
    imports: [DocsCodeBlock, DocsExample, DocsSourceTile, DocsTokens, NbTitle],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Title</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Adds a brutal wave underline to headings without changing the
            heading level or document structure.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">CSS</span>
            <span class="nb-stat-tile__label">Pseudo element</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">Any</span>
            <span class="nb-stat-tile__label">Heading level</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Wave tokens</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/title"
          />
        </div>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <h2 nbTitle class="font-mono text-4xl font-black leading-tight uppercase">
            Brutal section title
          </h2>
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="custom-wave">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Custom Wave</h2>
        <docs-example [code]="customWaveExampleCode">
          <h3
            nbTitle
            class="font-mono text-3xl font-black leading-tight"
            style="--nb-title-wave-color: #ff5d8f; --nb-title-wave-width: 12rem; --nb-title-wave-height: 0.75rem;"
          >
            Sharp editorial heading
          </h3>
        </docs-example>
      </section>

      <section id="mixed-content">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Mixed Content</h2>
        <docs-example [code]="mixedContentExampleCode">
          <div class="max-w-xl border-2 border-(--nb-border) bg-nb-surface p-6 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <p class="mb-3 inline-block border-2 border-(--nb-border) bg-nb-secondary px-3 py-1 font-mono text-xs font-black uppercase">
              Release notes
            </p>
            <h2 nbTitle class="font-mono text-4xl font-black leading-tight">
              Fast primitives, loud defaults
            </h2>
            <p class="mt-5 font-medium">
              Use it with your own typography classes, then tune the underline
              with CSS variables when a title needs more attitude.
            </p>
          </div>
        </docs-example>
      </section>

      <docs-tokens component="title" />

      <section id="api">
        <h2 class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Selector</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">[nbTitle]</td>
                <td class="px-4 py-3">
                  Applies <code class="font-mono">data-nb-title</code> and draws
                  a configurable wave underline with a CSS pseudo element.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TitlePageComponent {
  protected readonly defaultExampleCode = `<h2 nbTitle class="font-mono text-4xl font-black leading-tight uppercase">
  Brutal section title
</h2>`;

  protected readonly importCode = `import { NbTitle } from '@ng-brutalism/ui';`;

  protected readonly customWaveExampleCode = `<h3
  nbTitle
  class="font-mono text-3xl font-black leading-tight"
  style="--nb-title-wave-color: #ff5d8f; --nb-title-wave-width: 12rem; --nb-title-wave-height: 0.75rem;"
>
  Sharp editorial heading
</h3>`;

  protected readonly mixedContentExampleCode = `<div class="max-w-xl border-2 border-(--nb-border) bg-nb-surface p-6 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <p class="mb-3 inline-block border-2 border-(--nb-border) bg-nb-secondary px-3 py-1 font-mono text-xs font-black uppercase">
    Release notes
  </p>
  <h2 nbTitle class="font-mono text-4xl font-black leading-tight">
    Fast primitives, loud defaults
  </h2>
  <p class="mt-5 font-medium">
    Use it with your own typography classes, then tune the underline with CSS variables when a title needs more attitude.
  </p>
</div>`;
}
