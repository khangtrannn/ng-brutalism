import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCheckbox, NbLabel } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
    selector: 'docs-checkbox-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsTokens,
        NbCheckbox,
        NbLabel,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Checkbox</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A control that allows the user to toggle between checked and not
            checked in the neo-brutalism style.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Sizes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">FORM</span>
            <span class="nb-stat-tile__label">Native</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">A11y</span>
            <span class="nb-stat-tile__label">Label sync</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/checkbox"
          />
        </div>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <input type="checkbox" nbCheckbox />
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="sizes">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesExampleCode">
          <div class="flex items-center gap-4">
            <input type="checkbox" nbCheckbox size="sm" />
            <input type="checkbox" nbCheckbox />
            <input type="checkbox" nbCheckbox size="lg" />
          </div>
        </docs-example>
      </section>

      <section id="disabled">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
        <docs-example [code]="disabledExampleCode">
          <div class="flex items-center gap-4">
            <input type="checkbox" nbCheckbox disabled />
            <input type="checkbox" nbCheckbox disabled checked />
          </div>
        </docs-example>
      </section>

      <section id="with-label">
        <h2 class="mt-10 mb-4 text-2xl font-bold">With Label</h2>
        <docs-example [code]="withLabelExampleCode">
          <div class="flex items-center gap-2">
            <input type="checkbox" nbCheckbox id="terms" />
            <label nbLabel for="terms">Accept terms and conditions</label>
          </div>
        </docs-example>
      </section>

      <docs-tokens component="checkbox" />

      <section id="api">
        <h2 class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Input
                </th>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Type
                </th>
                <th
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Default
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  size
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'default' | 'sm' | 'lg'
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
export default class CheckboxPageComponent {
  protected readonly defaultExampleCode = `<input type="checkbox" nbCheckbox />`;

  protected readonly importCode = `import { NbCheckbox } from '@ng-brutalism/ui';`;

  protected readonly sizesExampleCode = `<input type="checkbox" nbCheckbox size="sm" />
<input type="checkbox" nbCheckbox />
<input type="checkbox" nbCheckbox size="lg" />`;

  protected readonly disabledExampleCode = `<input type="checkbox" nbCheckbox disabled />
<input type="checkbox" nbCheckbox disabled checked />`;

  protected readonly withLabelExampleCode = `<div class="flex items-center gap-2">
  <input type="checkbox" nbCheckbox id="terms" />
  <label nbLabel for="terms">Accept terms and conditions</label>
</div>`;
}
