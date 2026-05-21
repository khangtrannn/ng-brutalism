import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
    selector: 'docs-button-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsTokens,
        NbButton,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Button</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Displays a button or link that looks like a button, with hard
            borders, offset shadows, strong colors, keyboard focus states, and
            native disabled behavior.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">8</span>
            <span class="nb-stat-tile__label">Variants</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Sizes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Inputs</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/button"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <button
            nbButton
          >
            Button
          </button>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="variants">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Variants</h2>
        <docs-example [code]="variantsExampleCode">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button nbButton variant="default">Default</button>
            <button nbButton variant="neutral">Neutral</button>
            <button nbButton variant="primary">Primary</button>
            <button nbButton variant="secondary">Secondary</button>
            <button nbButton variant="accent">Accent</button>
            <button nbButton variant="danger">Danger</button>
            <button nbButton variant="success">Success</button>
            <button nbButton variant="warning">Warning</button>
          </div>
        </docs-example>
      </section>

      <section id="sizes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesExampleCode">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button nbButton size="sm">Small</button>
            <button nbButton>Default</button>
            <button nbButton size="lg">Large</button>
          </div>
        </docs-example>
      </section>

      <section id="full-width">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Full width</h2>
        <docs-example [code]="fullWidthExampleCode">
          <div class="w-full max-w-md">
            <button
              nbButton
              [fullWidth]="true"
            >
              Full width button
            </button>
          </div>
        </docs-example>
      </section>

      <section id="disabled">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
        <docs-example [code]="disabledExampleCode">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <button
              nbButton
              disabled
            >
              Disabled button
            </button>
            <a
              nbButton
              href="#"
              aria-disabled="true"
            >
              Disabled link style
            </a>
          </div>
        </docs-example>
      </section>

      <section id="anchor-usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Anchor usage</h2>
        <docs-example [code]="anchorExampleCode">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              nbButton
              href="https://angular.dev"
              target="_blank"
              rel="noreferrer"
            >
              Angular Docs
            </a>

            <a
              nbButton
              href="https://github.com/khangtrannn/ng-brutalism"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repo
            </a>
          </div>
        </docs-example>
      </section>

      <docs-tokens component="button" />

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-160 border-collapse text-left">
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
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  variant
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'default' | 'neutral' | 'primary' | 'secondary' | 'accent' |
                  'danger' | 'success' | 'warning'
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'default'
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  shadow
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'default' | 'none' | 'reverse'
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'default'
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  size
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'default' | 'sm' | 'lg' | 'icon'
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'default'
                </td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  fullWidth
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  boolean
                </td>
                <td class="px-4 py-3 font-mono text-sm">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ButtonPage {
  protected readonly defaultExampleCode = `<button nbButton>
  Button
</button>`;

  protected readonly importCode = `import { NbButton } from '@ng-brutalism/ui';`;

  protected readonly variantsExampleCode = `<div class="flex flex-wrap items-center justify-center gap-3">
  <button nbButton variant="default">Default</button>
  <button nbButton variant="neutral">Neutral</button>
  <button nbButton variant="primary">Primary</button>
  <button nbButton variant="secondary">Secondary</button>
  <button nbButton variant="accent">Accent</button>
  <button nbButton variant="danger">Danger</button>
  <button nbButton variant="success">Success</button>
  <button nbButton variant="warning">Warning</button>
</div>`;

  protected readonly sizesExampleCode = `<div class="flex flex-wrap items-center justify-center gap-3">
  <button nbButton size="sm">Small</button>
  <button nbButton>Default</button>
  <button nbButton size="lg">Large</button>
</div>`;

  protected readonly fullWidthExampleCode = `<div class="w-full max-w-md">
  <button nbButton [fullWidth]="true">
    Full width button
  </button>
</div>`;

  protected readonly disabledExampleCode = `<div class="flex flex-wrap items-center justify-center gap-4">
  <button nbButton disabled>Disabled button</button>
  <a nbButton href="#" aria-disabled="true">Disabled link style</a>
</div>`;

  protected readonly anchorExampleCode = `<div class="flex flex-wrap items-center justify-center gap-4">
  <a nbButton href="https://angular.dev" target="_blank" rel="noreferrer">
    Angular Docs
  </a>

  <a
    nbButton
    href="https://github.com/khangtrannn/ng-brutalism"
    target="_blank"
    rel="noreferrer"
  >
    GitHub Repo
  </a>
</div>`;
}
