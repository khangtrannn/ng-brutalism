import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbRating } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-rating-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbRating],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Rating</p>
          <h1>Rating</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A read-only star rating display. Accepts a decimal value and rounds to the
            nearest whole star. Optionally shows a review count. Fully accessible via
            <code class="font-mono">role="img"</code> with an auto-generated
            <code class="font-mono">aria-label</code>.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">A11y</span>
            <span class="nb-stat-tile__label">role="img"</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">★</span>
            <span class="nb-stat-tile__label">Unicode stars</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/rating"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex flex-col gap-3 p-4">
            <nb-rating [value]="4.8" [count]="312" />
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="values">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Values</h2>
        <docs-example [code]="valuesCode">
          <div class="flex flex-col gap-4 p-4">
            <nb-rating [value]="5" />
            <nb-rating [value]="4.7" />
            <nb-rating [value]="3" />
            <nb-rating [value]="1.2" />
            <nb-rating [value]="0" />
          </div>
        </docs-example>
      </section>

      <section id="with-count">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">With review count</h2>
        <docs-example [code]="withCountCode">
          <div class="flex flex-col gap-3 p-4">
            <nb-rating [value]="4.5" [count]="1204" />
            <nb-rating [value]="3.8" [count]="87" />
          </div>
        </docs-example>
      </section>

      <section id="custom-max">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Custom max</h2>
        <docs-example [code]="customMaxCode">
          <div class="p-4">
            <nb-rating [value]="7" [max]="10" />
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
                <td class="px-4 py-3">Rating value. Decimal — rounds to nearest whole star.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">max</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">5</td>
                <td class="px-4 py-3">Total number of stars to render.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">count</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number | undefined</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">undefined</td>
                <td class="px-4 py-3">Optional review count shown in parentheses.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RatingPage {
  protected readonly importCode = `import { NbRating } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-rating [value]="4.8" [count]="312" />`;

  protected readonly valuesCode = `<nb-rating [value]="5" />
<nb-rating [value]="4.7" />
<nb-rating [value]="3" />
<nb-rating [value]="1.2" />
<nb-rating [value]="0" />`;

  protected readonly withCountCode = `<nb-rating [value]="4.5" [count]="1204" />
<nb-rating [value]="3.8" [count]="87" />`;

  protected readonly customMaxCode = `<nb-rating [value]="7" [max]="10" />`;
}
