import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
  NbButton,
} from '@ng-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-accordion-page',
  standalone: true,
  imports: [
    DocsCodeBlockComponent,
    DocsExampleComponent,
    NbAccordion,
    NbAccordionContent,
    NbAccordionItem,
    NbAccordionTrigger,
    NbButton,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Accordion</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A vertically stacked set of interactive headings that reveal related
            content panels with native button semantics, ARIA state, and
            neo-brutalist borders.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Parts</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">A11y</span>
            <span class="nb-stat-tile__label">ARIA-ready</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">∞</span>
            <span class="nb-stat-tile__label">Items</span>
          </div>

          <a
            nbButton
            size="sm"
            variant="neutral"
            href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/accordion"
            target="_blank"
            rel="noreferrer"
          >
            Source ↗
          </a>
        </div>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="exampleCode">
          <nb-accordion class="block w-full max-w-xl" collapsible>
            <nb-accordion-item>
              <nb-accordion-trigger>Is it accessible?</nb-accordion-trigger>
              <nb-accordion-content>
                Yes. It uses native button semantics and ARIA state.
              </nb-accordion-content>
            </nb-accordion-item>

            <nb-accordion-item>
              <nb-accordion-trigger>
                Is it styled like neobrutalism.dev?
              </nb-accordion-trigger>
              <nb-accordion-content>
                Yes. It keeps the heavy border, offset shadow, bright trigger,
                and rotating chevron from the referenced component.
              </nb-accordion-content>
            </nb-accordion-item>
          </nb-accordion>
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="exampleCode" />
      </section>

      <section id="multiple">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Multiple</h2>
        <docs-example [code]="multipleExampleCode">
          <nb-accordion
            class="block w-full max-w-xl"
            type="multiple"
            [defaultValue]="['item-1']"
          >
            <nb-accordion-item value="item-1">
              <nb-accordion-trigger
                >Can multiple panels open?</nb-accordion-trigger
              >
              <nb-accordion-content>
                Yes. Set <code>type="multiple"</code> to allow independent panel
                state.
              </nb-accordion-content>
            </nb-accordion-item>

            <nb-accordion-item value="item-2">
              <nb-accordion-trigger
                >Can panels start open?</nb-accordion-trigger
              >
              <nb-accordion-content>
                Yes. Use <code>defaultValue</code> for uncontrolled accordions
                or bind <code>value</code> for controlled state.
              </nb-accordion-content>
            </nb-accordion-item>
          </nb-accordion>
        </docs-example>
      </section>

      <section id="controlled">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Controlled</h2>
        <docs-example [code]="controlledExampleCode">
          <div class="flex w-full max-w-xl flex-col gap-4">
            <div class="flex flex-wrap gap-3">
              <button
                nbButton
                size="sm"
                variant="neutral"
                type="button"
                (click)="controlledValue.set('overview')"
              >
                Overview
              </button>
              <button
                nbButton
                size="sm"
                variant="neutral"
                type="button"
                (click)="controlledValue.set('details')"
              >
                Details
              </button>
              <button
                nbButton
                size="sm"
                variant="neutral"
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
                  Bind <code>[(value)]</code> when another control should open
                  or close accordion panels. The trigger can switch panels, but
                  only the external button can collapse the active panel.
                </nb-accordion-content>
              </nb-accordion-item>

              <nb-accordion-item value="details">
                <nb-accordion-trigger>Details</nb-accordion-trigger>
                <nb-accordion-content>
                  The value matches the active item in single mode.
                </nb-accordion-content>
              </nb-accordion-item>
            </nb-accordion>
          </div>
        </docs-example>
      </section>

      <section id="disabled">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Disabled Item</h2>
        <docs-example [code]="disabledExampleCode">
          <nb-accordion collapsible class="block w-full max-w-xl" defaultValue="enabled">
            <nb-accordion-item value="enabled">
              <nb-accordion-trigger>Enabled item</nb-accordion-trigger>
              <nb-accordion-content>
                This panel can be opened and closed normally.
              </nb-accordion-content>
            </nb-accordion-item>

            <nb-accordion-item value="disabled" disabled>
              <nb-accordion-trigger>Disabled item</nb-accordion-trigger>
              <nb-accordion-content>
                Disabled triggers cannot be activated.
              </nb-accordion-content>
            </nb-accordion-item>
          </nb-accordion>
        </docs-example>
      </section>

      <section id="api">
        <h2 class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <h3 class="mt-6 mb-3 text-xl font-bold">Accordion</h3>
        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-nb"
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
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  value
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  string | string[] | null
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  null
                </td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  defaultValue
                </td>
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
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-nb"
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
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPageComponent {
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
    <nb-accordion-trigger>Is it accessible?</nb-accordion-trigger>
    <nb-accordion-content>
      Yes. It uses native button semantics and ARIA state.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item>
    <nb-accordion-trigger>Is it styled like neobrutalism.dev?</nb-accordion-trigger>
    <nb-accordion-content>
      Yes. It keeps the heavy border, offset shadow, bright trigger,
      and rotating chevron from the referenced component.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>`;

  protected readonly controlledExampleCode = `// component.ts
import { signal } from '@angular/core';

readonly value = signal<string | string[] | null>('overview');

// component.html
<button nbButton (click)="value.set('overview')">Overview</button>
<button nbButton (click)="value.set('details')">Details</button>
<button nbButton (click)="value.set(null)">Close</button>

<nb-accordion [(value)]="value">
  <nb-accordion-item value="overview">
    <nb-accordion-trigger>Overview</nb-accordion-trigger>
    <nb-accordion-content>
      Bind [(value)] when another control should open or close panels.
      Without collapsible, only the external button can collapse the active panel.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item value="details">
    <nb-accordion-trigger>Details</nb-accordion-trigger>
    <nb-accordion-content>
      The value matches the active item in single mode.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>`;

  protected readonly multipleExampleCode = `<nb-accordion
  class="block w-full max-w-xl"
  type="multiple"
  [defaultValue]="['item-1']"
>
  <nb-accordion-item value="item-1">
    <nb-accordion-trigger>Can multiple panels open?</nb-accordion-trigger>
    <nb-accordion-content>
      Yes. Set type="multiple" to allow independent panel state.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item value="item-2">
    <nb-accordion-trigger>Can panels start open?</nb-accordion-trigger>
    <nb-accordion-content>
      Yes. Use defaultValue for uncontrolled accordions
      or bind value for controlled state.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>`;

  protected readonly disabledExampleCode = `<nb-accordion class="block w-full max-w-xl" defaultValue="enabled">
  <nb-accordion-item value="enabled">
    <nb-accordion-trigger>Enabled item</nb-accordion-trigger>
    <nb-accordion-content>
      This panel can be opened and closed normally.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item value="disabled" disabled>
    <nb-accordion-trigger>Disabled item</nb-accordion-trigger>
    <nb-accordion-content>
      Disabled triggers cannot be activated.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>`;
}
