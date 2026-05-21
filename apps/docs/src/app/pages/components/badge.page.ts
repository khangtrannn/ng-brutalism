import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbBadge } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
    selector: 'docs-badge-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsTokens,
        NbBadge,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Badge</p>
          <h1>Badge</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist Angular Badge component. A small status indicator
            with thick borders and flat shadow across five semantic variants.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">5</span>
            <span class="nb-stat-tile__label">Variants</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/badge"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <span nbBadge>Default</span>
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
          <div class="flex flex-wrap items-center gap-3">
            <span nbBadge>Default</span>
            <span nbBadge variant="secondary">Secondary</span>
            <span nbBadge variant="success">Success</span>
            <span nbBadge variant="warning">Warning</span>
            <span nbBadge variant="danger">Danger</span>
          </div>
        </docs-example>
      </section>

      <docs-tokens component="badge" />

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
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">variant</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'default' | 'secondary' | 'success' | 'warning' | 'danger'
                </td>
                <td class="px-4 py-3 font-mono text-sm">'default'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class BadgePage {
  protected readonly defaultExampleCode = `<span nbBadge>Default</span>`;

  protected readonly importCode = `import { NbBadge } from '@ng-brutalism/ui';`;

  protected readonly variantsExampleCode = `<div class="flex flex-wrap items-center gap-3">
  <span nbBadge>Default</span>
  <span nbBadge variant="secondary">Secondary</span>
  <span nbBadge variant="success">Success</span>
  <span nbBadge variant="warning">Warning</span>
  <span nbBadge variant="danger">Danger</span>
</div>`;
}
