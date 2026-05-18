import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbBadge, NbButton } from '@ng-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-badge-page',
  standalone: true,
  imports: [DocsCodeBlockComponent, DocsExampleComponent, NbBadge, NbButton],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Badge</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A small status indicator with thick borders and flat shadow across
            five semantic variants.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">5</span>
            <span class="nb-stat-tile__label">Variants</span>
          </div>

          <a
            nbButton
            size="sm"
            variant="neutral"
            href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/badge"
            target="_blank"
            rel="noreferrer"
          >
            Source ↗
          </a>
        </div>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <span nbBadge>Default</span>
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="variants">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Variants</h2>
        <docs-example [code]="variantsExampleCode">
          <div class="flex flex-wrap items-center gap-3">
            <span nbBadge>Default</span>
            <span nbBadge variant="secondary">Secondary</span>
            <span nbBadge variant="success">Success</span>
            <span nbBadge variant="warning">Warning</span>
            <span nbBadge variant="destructive">Destructive</span>
          </div>
        </docs-example>
      </section>

      <section id="api">
        <h2 class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
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
                  'default' | 'secondary' | 'success' | 'warning' | 'destructive'
                </td>
                <td class="px-4 py-3 font-mono text-sm">'default'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BadgePageComponent {
  protected readonly defaultExampleCode = `<span nbBadge>Default</span>`;

  protected readonly importCode = `import { NbBadge } from '@ng-brutalism/ui';`;

  protected readonly variantsExampleCode = `<span nbBadge>Default</span>
<span nbBadge variant="secondary">Secondary</span>
<span nbBadge variant="success">Success</span>
<span nbBadge variant="warning">Warning</span>
<span nbBadge variant="destructive">Destructive</span>`;
}
