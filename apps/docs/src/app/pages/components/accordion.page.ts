import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
  NbButton,
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
  selector: 'docs-accordion-page',
  imports: [
    NbStat,
    NbSurface,
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    DocsStatusBadge,
    DocsTokens,
    NbAccordion,
    NbAccordionContent,
    NbAccordionItem,
    NbAccordionTrigger,
    NbButton,
  ],
  template: `
    <article style="--nb-accordion-trigger-bg: var(--nb-yellow)">
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Accordion</p>
          <h1>Accordion</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist Angular Accordion component. A vertically stacked
            set of interactive headings that reveal related content panels with
            native button semantics, ARIA state, and brutalist borders.
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
            <nb-stat value="4" label="Parts" />
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
            <nb-stat value="∞" label="Items" />
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/accordion"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="exampleCode">
          <nb-accordion class="block w-full max-w-xl" collapsible>
            <nb-accordion-item>
              <nb-accordion-trigger>Lorem, ipsum dolor.</nb-accordion-trigger>
              <nb-accordion-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </nb-accordion-content>
            </nb-accordion-item>

            <nb-accordion-item>
              <nb-accordion-trigger>
                Lorem ipsum dolor sit amet consectetur.
              </nb-accordion-trigger>
              <nb-accordion-content>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </nb-accordion-content>
            </nb-accordion-item>
          </nb-accordion>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="exampleCode" />
      </section>

      <section id="multiple">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Multiple
        </h2>
        <docs-example [code]="multipleExampleCode">
          <nb-accordion
            class="block w-full max-w-xl"
            type="multiple"
            [value]="['item-1']"
          >
            <nb-accordion-item value="item-1">
              <nb-accordion-trigger
                >Can multiple panels open?</nb-accordion-trigger
              >
              <nb-accordion-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </nb-accordion-content>
            </nb-accordion-item>

            <nb-accordion-item value="item-2">
              <nb-accordion-trigger
                >Can panels start open?</nb-accordion-trigger
              >
              <nb-accordion-content>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris.
              </nb-accordion-content>
            </nb-accordion-item>
          </nb-accordion>
        </docs-example>
      </section>

      <section id="controlled">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Controlled
        </h2>
        <docs-example
          previewPadding="compact"
          [code]="controlledExampleTemplateCode"
        >
          <div class="flex w-full max-w-xl flex-col gap-4">
            <div class="flex flex-wrap gap-3">
              <button
                nbButton
                size="sm"
                tone="warning"
                type="button"
                (click)="controlledValue.set('overview')"
              >
                Overview
              </button>
              <button
                nbButton
                size="sm"
                tone="warning"
                type="button"
                (click)="controlledValue.set('details')"
              >
                Details
              </button>
              <button
                nbButton
                size="sm"
                tone="warning"
                type="button"
                (click)="controlledValue.set(null)"
              >
                Collapse All
              </button>
            </div>

            <nb-accordion [(value)]="controlledValue">
              <nb-accordion-item value="overview">
                <nb-accordion-trigger>Overview</nb-accordion-trigger>
                <nb-accordion-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </nb-accordion-content>
              </nb-accordion-item>

              <nb-accordion-item value="details">
                <nb-accordion-trigger>Details</nb-accordion-trigger>
                <nb-accordion-content>
                  Duis aute irure dolor in reprehenderit in voluptate velit.
                </nb-accordion-content>
              </nb-accordion-item>
            </nb-accordion>
          </div>
        </docs-example>
      </section>

      <section id="disabled">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Disabled Item
        </h2>
        <docs-example [code]="disabledExampleCode">
          <nb-accordion
            collapsible
            class="block w-full max-w-xl"
            [value]="'enabled'"
          >
            <nb-accordion-item value="enabled">
              <nb-accordion-trigger>Enabled item</nb-accordion-trigger>
              <nb-accordion-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </nb-accordion-content>
            </nb-accordion-item>

            <nb-accordion-item value="disabled" disabled>
              <nb-accordion-trigger>Disabled item</nb-accordion-trigger>
              <nb-accordion-content>
                Excepteur sint occaecat cupidatat non proident.
              </nb-accordion-content>
            </nb-accordion-item>
          </nb-accordion>
        </docs-example>
      </section>

      <docs-tokens component="accordion" />

      <section id="accessibility">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <p class="mb-4 font-medium">
          <strong>APG pattern:</strong>
          <a
            href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
            target="_blank"
            rel="noreferrer"
            class="underline"
            >Accordion</a
          >
          · <strong>Status:</strong> Stable.
        </p>

        <div
          tabindex="0"
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-nb mb-4"
        >
          <table class="w-full min-w-140 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Key
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  Enter / Space
                </td>
                <td class="px-4 py-3">Toggle the focused trigger's panel</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  ↑ / ↓
                </td>
                <td class="px-4 py-3">
                  Move focus between headers, skipping disabled items
                </td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  Home / End
                </td>
                <td class="px-4 py-3">Jump focus to the first / last header</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="font-medium">
          Triggers use real <code class="font-mono">disabled</code> buttons, not
          <code class="font-mono">aria-disabled</code> - a genuinely disabled
          button can't receive focus, so header navigation skips disabled items
          entirely rather than landing on an inert stop. Closed content is bound
          with <code class="font-mono">[inert]</code> so it can't be tabbed into
          or found by find-in-page while collapsed. Verified with
          <code class="font-mono">vitest-axe</code>; keyboard walkthrough in
          <code class="font-mono">nb-accordion-keyboard.spec.ts</code>.
        </p>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <h3 class="mt-6 mb-3 text-xl font-bold">Accordion</h3>
        <div
          tabindex="0"
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-nb"
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
                  type
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'single' | 'multiple'
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'single'
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  collapsible
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  boolean
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  false
                </td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">value</td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  string | string[] | null
                </td>
                <td class="px-4 py-3 font-mono text-sm">null</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mt-8 mb-3 text-xl font-bold">Accordion Item</h3>
        <div
          tabindex="0"
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-nb"
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
                  value
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  string
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  generated
                </td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  disabled
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

        <h3 class="mt-8 mb-3 text-xl font-bold">Selectors</h3>
        <div
          tabindex="0"
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-nb"
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
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-accordion-trigger
                </td>
                <td class="px-4 py-3">
                  Toggles its parent item open or closed. Supports optional
                  <code class="font-mono">tone</code>.
                </td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-accordion-content
                </td>
                <td class="px-4 py-3">
                  Collapsible body region for an item. Has no inputs.
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
export default class AccordionPage {
  protected readonly controlledValue = signal<string | string[] | null>(
    'overview'
  );

  protected readonly importCode = `import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
} from '@ng-brutalism/ui';`;

  protected readonly exampleCode = `<nb-accordion class="block w-full max-w-xl" collapsible>
  <nb-accordion-item>
    <nb-accordion-trigger>Lorem, ipsum dolor.</nb-accordion-trigger>
    <nb-accordion-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item>
    <nb-accordion-trigger>Lorem ipsum dolor sit amet consectetur.</nb-accordion-trigger>
    <nb-accordion-content>
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>`;

  protected readonly controlledExampleComponentCode = `import { signal } from '@angular/core';

readonly controlledValue = signal<string | string[] | null>('overview');`;

  protected readonly controlledExampleTemplateCode = `<div class="flex w-full max-w-xl flex-col gap-4">
  <div class="flex flex-wrap gap-3">
    <button
      nbButton
      size="sm"
      tone="warning"
      type="button"
      (click)="controlledValue.set('overview')"
    >
      Overview
    </button>
    <button
      nbButton
      size="sm"
      tone="warning"
      type="button"
      (click)="controlledValue.set('details')"
    >
      Details
    </button>
    <button
      nbButton
      size="sm"
      tone="warning"
      type="button"
      (click)="controlledValue.set(null)"
    >
      Collapse All
    </button>
  </div>

  <nb-accordion [(value)]="controlledValue">
    <nb-accordion-item value="overview">
      <nb-accordion-trigger>Overview</nb-accordion-trigger>
      <nb-accordion-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </nb-accordion-content>
    </nb-accordion-item>

    <nb-accordion-item value="details">
      <nb-accordion-trigger>Details</nb-accordion-trigger>
      <nb-accordion-content>
        Duis aute irure dolor in reprehenderit in voluptate velit.
      </nb-accordion-content>
    </nb-accordion-item>
  </nb-accordion>
</div>`;

  protected readonly multipleExampleCode = `<nb-accordion
  class="block w-full max-w-xl"
  type="multiple"
  [value]="['item-1']"
>
  <nb-accordion-item value="item-1">
    <nb-accordion-trigger>Can multiple panels open?</nb-accordion-trigger>
    <nb-accordion-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item value="item-2">
    <nb-accordion-trigger>Can panels start open?</nb-accordion-trigger>
    <nb-accordion-content>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>`;

  protected readonly disabledExampleCode = `<nb-accordion collapsible class="block w-full max-w-xl" [value]="'enabled'">
  <nb-accordion-item value="enabled">
    <nb-accordion-trigger>Enabled item</nb-accordion-trigger>
    <nb-accordion-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item value="disabled" disabled>
    <nb-accordion-trigger>Disabled item</nb-accordion-trigger>
    <nb-accordion-content>
      Excepteur sint occaecat cupidatat non proident.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>`;
}
