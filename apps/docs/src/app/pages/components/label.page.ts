import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbCheckbox,
  NbInput,
  NbLabel,
  NbStat,
  NbSurface,
} from '@ng-brutalism/ui';

import {
  DocsCodeBlock,
  DocsExample,
  DocsSourceTile,
  DocsStatusBadge,
  DocsTokens,
} from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-label-page',
  imports: [
    NbStat,
    NbSurface,
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    DocsStatusBadge,
    DocsTokens,
    NbCheckbox,
    NbInput,
    NbLabel,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Label</p>
          <h1>Label</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist Angular Label component. Renders an accessible
            form label with bold typography and brutalist styling, associated
            with form controls.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <docs-status-badge status="stable" />
          <div
            nbSurface
            tone="yellow"
            border="strong"
            padding="sm"
            layout="stack"
            class="items-start"
          >
            <nb-stat value="FOR" label="htmlFor sync" />
          </div>
          <div
            nbSurface
            tone="mint"
            border="strong"
            padding="sm"
            layout="stack"
            class="items-start"
          >
            <nb-stat value="A11y" label="ARIA-ready" />
          </div>
          <div
            nbSurface
            tone="pink"
            border="strong"
            padding="sm"
            layout="stack"
            class="items-start"
          >
            <nb-stat value="∞" label="Pairs with" />
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/label"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex items-center gap-2">
            <input type="checkbox" nbCheckbox id="accept-terms" />
            <label nbLabel for="accept-terms"
              >Accept terms and conditions</label
            >
          </div>
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

      <section id="with-input">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          With Input
        </h2>
        <docs-example [code]="withInputExampleCode">
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

      <section id="disabled-control">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Disabled Control
        </h2>
        <docs-example [code]="disabledControlExampleCode">
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              nbCheckbox
              id="disabled-terms"
              class="peer"
              disabled
            />
            <label nbLabel for="disabled-terms"
              >Accept terms and conditions</label
            >
          </div>
        </docs-example>
      </section>

      <docs-tokens component="label" />

      <section id="accessibility">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <p class="font-medium">
          <strong>APG pattern:</strong> N/A - Label is a structural text marker
          that associates descriptive text with a form control, not an
          interactive widget. <strong>Status:</strong> Stable.
        </p>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          tabindex="0"
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-160 border-collapse text-left">
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
export default class LabelPage {
  protected readonly defaultExampleCode = `<div class="flex items-center gap-2">
  <input type="checkbox" nbCheckbox id="accept-terms" />
  <label nbLabel for="accept-terms">Accept terms and conditions</label>
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
