import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbButtonTrailingIcon, NbIcon, NbText } from '@ng-brutalism/ui';

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
        NbButtonTrailingIcon,
        NbIcon,
        NbText,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Button</p>
          <h1>Button</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist Angular Button component. Displays a button or
            link that looks like a button, with hard borders, shared tone and
            shadow tokens, keyboard focus states, and native disabled behavior.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">15</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Sizes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">6</span>
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

      <section id="tones">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
        <docs-example [code]="tonesExampleCode">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button nbButton>Default</button>
            <button nbButton tone="background">Background</button>
            <button nbButton tone="primary">Primary</button>
            <button nbButton tone="secondary">Secondary</button>
            <button nbButton tone="accent">Accent</button>
            <button nbButton tone="danger">Danger</button>
            <button nbButton tone="success">Success</button>
            <button nbButton tone="warning">Warning</button>
          </div>
        </docs-example>
      </section>

      <section id="sizes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesExampleCode">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button nbButton size="sm">Small</button>
            <button nbButton size="md">Medium</button>
            <button nbButton size="lg">Large</button>
            <button nbButton size="xl">Extra Large</button>
          </div>
        </docs-example>
      </section>

      <section id="cta">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">CTA</h2>
        <p class="mb-4 max-w-3xl font-medium">
          Button provides default typography for normal actions. For expressive
          button labels, compose <code class="font-mono">nbText</code> inside
          <code class="font-mono">nbButton</code>.
        </p>
        <docs-example [code]="ctaExampleCode">
          <button nbButton tone="lavender" size="xl" radius="md">
            <span
              nbText
              size="xl"
              weight="black"
              transform="uppercase"
              tracking="wide"
            >
              Apply Now
            </span>
            <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
              <span
                nbIcon
                src="/tokyo-city-escape/nb-arrow-right.svg"
                size="sm"
                decorative
              ></span>
            </span>
          </button>
        </docs-example>
      </section>

      <section id="trailing-icon">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Trailing Icon
        </h2>
        <docs-example [code]="trailingIconExampleCode">
          <div class="grid w-full max-w-md gap-3">
            <button nbButton tone="secondary">
              Keep Together
              <span nbButtonTrailingIcon>
                <span
                  nbIcon
                  src="/tokyo-city-escape/nb-arrow-right.svg"
                  size="sm"
                  decorative
                ></span>
              </span>
            </button>

            <button nbButton tone="primary" [fullWidth]="true">
              Push To End
              <span nbButtonTrailingIcon push="end" shape="square" size="md">
                <span
                  nbIcon
                  src="/tokyo-city-escape/nb-arrow-right.svg"
                  size="sm"
                  decorative
                ></span>
              </span>
            </button>
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
                  tone
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  NbToneToken
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'primary'
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
                  'none' | 'sm' | 'default' | 'hard' | 'heavy'
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
                  press
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'push' | 'reverse' | 'none'
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'push'
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
                  'sm' | 'md' | 'lg' | 'xl'
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'md'
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  border
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'none' | 'thin' | 'default' | 'strong' | 'thick'
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
                  radius
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'md'
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

        <h3 class="mt-8 mb-4 text-xl font-black">Trailing icon API</h3>
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
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">size</td>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'sm' | 'md' | 'lg'</td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm">undefined</td>
              </tr>
              <tr>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">shape</td>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'square' | 'circle'</td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm">undefined</td>
              </tr>
              <tr>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">tone</td>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default' | 'inverse' | 'current'</td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm">undefined</td>
              </tr>
              <tr>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">push</td>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'end'</td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none'</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">icon</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="px-4 py-3 font-mono text-sm">undefined</td>
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

  protected readonly importCode = `import {
  NbButton,
  NbButtonTrailingIcon,
  NbIcon,
} from '@ng-brutalism/ui';`;

  protected readonly tonesExampleCode = `<div class="flex flex-wrap items-center justify-center gap-3">
  <button nbButton>Default</button>
  <button nbButton tone="background">Background</button>
  <button nbButton tone="primary">Primary</button>
  <button nbButton tone="secondary">Secondary</button>
  <button nbButton tone="accent">Accent</button>
  <button nbButton tone="danger">Danger</button>
  <button nbButton tone="success">Success</button>
  <button nbButton tone="warning">Warning</button>
</div>`;

  protected readonly sizesExampleCode = `<div class="flex flex-wrap items-center justify-center gap-3">
  <button nbButton size="sm">Small</button>
  <button nbButton size="md">Medium</button>
  <button nbButton size="lg">Large</button>
  <button nbButton size="xl">Extra Large</button>
</div>`;

  protected readonly ctaExampleCode = `<button nbButton tone="lavender" size="xl" radius="md">
  <span nbText size="xl" weight="black" transform="uppercase" tracking="wide">
    Apply Now
  </span>
  <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
    <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
  </span>
</button>`;

  protected readonly trailingIconExampleCode = `<button nbButton tone="secondary">
  Keep Together
  <span nbButtonTrailingIcon>
    <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
  </span>
</button>

<button nbButton tone="primary" [fullWidth]="true">
  Push To End
  <span nbButtonTrailingIcon push="end" shape="square" size="md">
    <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
  </span>
</button>`;

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
