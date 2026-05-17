import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbCheckbox, NbInput, NbLabel } from '@ng-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-label-page',
  standalone: true,
  imports: [
    DocsCodeBlockComponent,
    DocsExampleComponent,
    NbButton,
    NbCheckbox,
    NbInput,
    NbLabel,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Label</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Renders an accessible label associated with form controls.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">FOR</span>
            <span class="nb-stat-tile__label">htmlFor sync</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">A11y</span>
            <span class="nb-stat-tile__label">ARIA-ready</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">∞</span>
            <span class="nb-stat-tile__label">Pairs with</span>
          </div>

          <a
            nbButton
            size="sm"
            variant="neutral"
            href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/label"
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
          <div class="flex items-center gap-2">
            <input type="checkbox" nbCheckbox id="terms-preview" />
            <label nbLabel for="terms-preview">Accept terms and conditions</label>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="with-input">
        <h2 class="mt-10 mb-4 text-2xl font-bold">With Input</h2>
        <docs-example [code]="withInputExampleCode">
          <div class="flex flex-col gap-2">
            <label nbLabel for="email">Email</label>
            <input nbInput id="email" type="email" placeholder="m@example.com" class="w-75" />
          </div>
        </docs-example>
      </section>

      <section id="disabled-control">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Disabled Control</h2>
        <docs-example [code]="disabledControlExampleCode">
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              nbCheckbox
              id="disabled-terms"
              class="peer"
              disabled
            />
            <label nbLabel for="disabled-terms">Accept terms and conditions</label>
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
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Selector
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  label[nbLabel]
                </td>
                <td class="px-4 py-3">
                  Applies label typography and disabled peer styling to a native
                  label element.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LabelPageComponent {
  protected readonly defaultExampleCode = `<div class="flex items-center gap-2">
  <input type="checkbox" nbCheckbox id="terms" />
  <label nbLabel for="terms">Accept terms and conditions</label>
</div>`;

  protected readonly importCode = `import { NbCheckbox, NbLabel } from '@ng-brutalism/ui';`;

  protected readonly withInputExampleCode = `<div class="flex flex-col gap-2">
  <label nbLabel for="email">Email</label>
  <input nbInput id="email" type="email" placeholder="m@example.com" class="w-75" />
</div>`;

  protected readonly disabledControlExampleCode = `<div class="flex items-center gap-2">
  <input
    type="checkbox"
    nbCheckbox
    id="disabled-terms"
    class="peer"
    disabled
  />
  <label nbLabel for="disabled-terms">Accept terms and conditions</label>
</div>`;
}
