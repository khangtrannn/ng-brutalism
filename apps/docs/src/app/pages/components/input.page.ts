import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbInput, NbLabel } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
    selector: 'docs-input-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsTokens,
        NbButton,
        NbInput,
        NbLabel,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Input</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Displays a form input field with hard borders, offset shadow, and
            strong focus states in the neo-brutalism style.
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
            <span class="nb-stat-tile__value">∞</span>
            <span class="nb-stat-tile__label">Types</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/input"
          />
        </div>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <input nbInput placeholder="Email" class="w-75" />
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="sizes">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesExampleCode">
          <div class="flex flex-col items-center gap-4">
            <input nbInput size="sm" placeholder="Small" class="w-75" />
            <input nbInput placeholder="Default" class="w-75" />
            <input nbInput size="lg" placeholder="Large" class="w-75" />
          </div>
        </docs-example>
      </section>

      <section id="disabled">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
        <docs-example [code]="disabledExampleCode">
          <input nbInput placeholder="Email" class="w-75" disabled />
        </docs-example>
      </section>

      <section id="with-label">
        <h2 class="mt-10 mb-4 text-2xl font-bold">With Label</h2>
        <docs-example [code]="withLabelExampleCode">
          <div class="flex flex-col gap-2">
            <label nbLabel for="email">Email</label>
            <input
              nbInput
              id="email"
              type="email"
              placeholder="m@example.com"
              class="w-75"
            />
          </div>
        </docs-example>
      </section>

      <section id="with-button">
        <h2 class="mt-10 mb-4 text-2xl font-bold">With Button</h2>
        <docs-example [code]="withButtonExampleCode">
          <div class="flex gap-2">
            <input nbInput placeholder="Email" class="w-75" />
            <button
              nbButton
              variant="neutral"
              style="--nb-button-bg: var(--nb-warning)"
            >
              Subscribe
            </button>
          </div>
        </docs-example>
      </section>

      <section id="file">
        <h2 class="mt-10 mb-4 text-2xl font-bold">File</h2>
        <docs-example [code]="fileExampleCode">
          <input nbInput type="file" class="w-[250px]" />
        </docs-example>
      </section>

      <docs-tokens component="input" />

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
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Default
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">size</td>
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
export default class InputPageComponent {
  protected readonly defaultExampleCode = `<input nbInput placeholder="Email" class="w-75" />`;

  protected readonly importCode = `import { NbInput } from '@ng-brutalism/ui';`;

  protected readonly sizesExampleCode = `<input nbInput size="sm" placeholder="Small" class="w-75" />
<input nbInput placeholder="Default" class="w-75" />
<input nbInput size="lg" placeholder="Large" class="w-75" />`;

  protected readonly disabledExampleCode = `<input nbInput placeholder="Email" class="w-75" disabled />`;

  protected readonly withLabelExampleCode = `<div class="flex flex-col gap-2">
  <label nbLabel for="email">Email</label>
  <input nbInput id="email" type="email" placeholder="m@example.com" class="w-75" />
</div>`;

  protected readonly withButtonExampleCode = `<div class="flex gap-2">
  <input nbInput placeholder="Email" class="w-75" />
  <button nbButton variant="neutral" style="--nb-button-bg: var(--nb-warning)">Subscribe</button>
</div>`;

  protected readonly fileExampleCode = `<input nbInput type="file" class="w-[250px]" />`;
}
