import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
  NbButton,
} from '@ng-neo-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-accordion-page',
  standalone: true,
  imports: [
    DocsCodeBlockComponent,
    DocsExampleComponent,
    NbAccordion,
    NbAccordionItem,
    NbAccordionTrigger,
    NbAccordionContent,
    NbButton,
  ],
  template: `
    <article>
      <header id="overview" class="mb-8 scroll-mt-32">
        <div>
          <p class="mb-2 text-sm font-bold uppercase tracking-wide">
            Components
          </p>
          <h1>Accordion</h1>
          <p class="mt-0 max-w-3xl text-base font-medium sm:text-lg">
            A vertically stacked disclosure set with bold borders, hard
            shadows, native button triggers, and Angular-managed single or
            multiple open state.
          </p>
        </div>

        <a
          nbButton
          size="sm"
          variant="secondary"
          href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/accordion"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </header>

      <section id="preview">
        <h2>Preview</h2>
        <docs-example [code]="basicExampleCode">
          <div class="docs-accordion-demo w-full max-w-xl">
            <neo-accordion>
              <neo-accordion-item value="accessible">
                <neo-accordion-trigger>
                  Is it accessible?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Yes. The trigger is a real button with connected
                  aria-expanded, aria-controls, and region labelling.
                </neo-accordion-content>
              </neo-accordion-item>

              <neo-accordion-item value="signals">
                <neo-accordion-trigger>
                  Can I use it with Angular signals?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Yes. The component API uses signal inputs and internal signal
                  state, so it fits modern Angular patterns.
                </neo-accordion-content>
              </neo-accordion-item>
            </neo-accordion>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2>Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="basicExampleCode" />
      </section>

      <section id="single-collapsible">
        <h2>Single collapsible</h2>
        <docs-example [code]="collapsibleExampleCode">
          <div class="docs-accordion-demo w-full max-w-xl">
            <neo-accordion collapsible>
              <neo-accordion-item value="accessible">
                <neo-accordion-trigger>
                  Is it accessible?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Yes. It follows the WAI-ARIA accordion pattern while keeping
                  native button keyboard behavior intact.
                </neo-accordion-content>
              </neo-accordion-item>

              <neo-accordion-item value="themeable">
                <neo-accordion-trigger>
                  Is it themeable?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Yes. Colors, borders, radius, shadows, and focus rings flow
                  through the ng-neo-brutalism CSS variables.
                </neo-accordion-content>
              </neo-accordion-item>
            </neo-accordion>
          </div>
        </docs-example>
      </section>

      <section id="multiple">
        <h2>Multiple</h2>
        <docs-example [code]="multipleExampleCode">
          <div class="docs-accordion-demo w-full max-w-xl">
            <neo-accordion type="multiple">
              <neo-accordion-item value="multiple-open">
                <neo-accordion-trigger>
                  Can multiple items stay open?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Yes. Set type to multiple and each item toggles independently.
                </neo-accordion-content>
              </neo-accordion-item>

              <neo-accordion-item value="signals">
                <neo-accordion-trigger>
                  Can I use it with Angular signals?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Yes. The public inputs are signal inputs and the internal
                  state stays signal-based.
                </neo-accordion-content>
              </neo-accordion-item>
            </neo-accordion>
          </div>
        </docs-example>
      </section>

      <section id="disabled-item">
        <h2>Disabled item</h2>
        <docs-example [code]="disabledItemExampleCode">
          <div class="docs-accordion-demo w-full max-w-xl">
            <neo-accordion>
              <neo-accordion-item value="themeable">
                <neo-accordion-trigger>
                  Is it themeable?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Yes. It reads the same CSS variables used by the rest of the
                  library.
                </neo-accordion-content>
              </neo-accordion-item>

              <neo-accordion-item value="disabled" disabled>
                <neo-accordion-trigger>
                  Can I open this disabled item?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Disabled items do not toggle.
                </neo-accordion-content>
              </neo-accordion-item>
            </neo-accordion>
          </div>
        </docs-example>
      </section>

      <section id="default-open">
        <h2>Default opened item</h2>
        <docs-example [code]="defaultOpenExampleCode">
          <div class="docs-accordion-demo w-full max-w-xl">
            <neo-accordion defaultValue="themeable">
              <neo-accordion-item value="accessible">
                <neo-accordion-trigger>
                  Is it accessible?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Yes. Trigger and content IDs are generated and connected.
                </neo-accordion-content>
              </neo-accordion-item>

              <neo-accordion-item value="themeable">
                <neo-accordion-trigger>
                  Is it themeable?
                </neo-accordion-trigger>
                <neo-accordion-content>
                  Yes. The default open panel uses the same state path as
                  user-triggered panels.
                </neo-accordion-content>
              </neo-accordion-item>
            </neo-accordion>
          </div>
        </docs-example>
      </section>

      <section id="api">
        <h2>API</h2>

        <div
          class="overflow-hidden border-4 border-[var(--nb-border)] bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th
                  class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-bold"
                >
                  Element
                </th>
                <th
                  class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-bold"
                >
                  Input
                </th>
                <th
                  class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-bold"
                >
                  Type
                </th>
                <th
                  class="border-b-4 border-[var(--nb-border)] px-4 py-3 font-bold"
                >
                  Default
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3">
                  neo-accordion
                </td>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3">
                  type
                </td>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm">
                  'single' | 'multiple'
                </td>
                <td class="border-b-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm">
                  'single'
                </td>
              </tr>
              <tr>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3">
                  neo-accordion
                </td>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3">
                  collapsible
                </td>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm">
                  boolean
                </td>
                <td class="border-b-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm">
                  false
                </td>
              </tr>
              <tr>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3">
                  neo-accordion
                </td>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3">
                  defaultValue
                </td>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm">
                  string | string[] | null
                </td>
                <td class="border-b-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm">
                  null
                </td>
              </tr>
              <tr>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3">
                  neo-accordion
                </td>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3">
                  disabled
                </td>
                <td class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm">
                  boolean
                </td>
                <td class="border-b-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm">
                  false
                </td>
              </tr>
              <tr>
                <td class="border-r-4 border-[var(--nb-border)] px-4 py-3">
                  neo-accordion-item
                </td>
                <td class="border-r-4 border-[var(--nb-border)] px-4 py-3">
                  value / disabled
                </td>
                <td class="border-r-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm">
                  string / boolean
                </td>
                <td class="px-4 py-3 font-mono text-sm">required / false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  styles: [
    `
      .docs-accordion-demo {
        --nb-secondary: #5794f6;
        --nb-secondary-foreground: #000000;
        --nb-primary: var(--nb-secondary);
        --nb-primary-foreground: var(--nb-secondary-foreground);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPageComponent {
  protected readonly importCode = `import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
} from '@ng-neo-brutalism/ui';`;

  protected readonly basicExampleCode = `<neo-accordion>
  <neo-accordion-item value="accessible">
    <neo-accordion-trigger>Is it accessible?</neo-accordion-trigger>
    <neo-accordion-content>
      Yes. The trigger is a real button with connected aria-expanded,
      aria-controls, and region labelling.
    </neo-accordion-content>
  </neo-accordion-item>

  <neo-accordion-item value="signals">
    <neo-accordion-trigger>Can I use it with Angular signals?</neo-accordion-trigger>
    <neo-accordion-content>
      Yes. The component API uses signal inputs and internal signal state.
    </neo-accordion-content>
  </neo-accordion-item>
</neo-accordion>`;

  protected readonly collapsibleExampleCode = `<neo-accordion collapsible>
  <neo-accordion-item value="accessible">
    <neo-accordion-trigger>Is it accessible?</neo-accordion-trigger>
    <neo-accordion-content>
      Yes. It follows the WAI-ARIA accordion pattern.
    </neo-accordion-content>
  </neo-accordion-item>
</neo-accordion>`;

  protected readonly multipleExampleCode = `<neo-accordion type="multiple">
  <neo-accordion-item value="multiple-open">
    <neo-accordion-trigger>Can multiple items stay open?</neo-accordion-trigger>
    <neo-accordion-content>
      Yes. Set type to multiple and each item toggles independently.
    </neo-accordion-content>
  </neo-accordion-item>

  <neo-accordion-item value="signals">
    <neo-accordion-trigger>Can I use it with Angular signals?</neo-accordion-trigger>
    <neo-accordion-content>
      Yes. The public inputs are signal inputs.
    </neo-accordion-content>
  </neo-accordion-item>
</neo-accordion>`;

  protected readonly disabledItemExampleCode = `<neo-accordion>
  <neo-accordion-item value="themeable">
    <neo-accordion-trigger>Is it themeable?</neo-accordion-trigger>
    <neo-accordion-content>
      Yes. It reads the same CSS variables used by the rest of the library.
    </neo-accordion-content>
  </neo-accordion-item>

  <neo-accordion-item value="disabled" disabled>
    <neo-accordion-trigger>Can I open this disabled item?</neo-accordion-trigger>
    <neo-accordion-content>Disabled items do not toggle.</neo-accordion-content>
  </neo-accordion-item>
</neo-accordion>`;

  protected readonly defaultOpenExampleCode = `<neo-accordion defaultValue="themeable">
  <neo-accordion-item value="accessible">
    <neo-accordion-trigger>Is it accessible?</neo-accordion-trigger>
    <neo-accordion-content>
      Yes. Trigger and content IDs are generated and connected.
    </neo-accordion-content>
  </neo-accordion-item>

  <neo-accordion-item value="themeable">
    <neo-accordion-trigger>Is it themeable?</neo-accordion-trigger>
    <neo-accordion-content>
      Yes. The default open panel uses the same state path as user-triggered panels.
    </neo-accordion-content>
  </neo-accordion-item>
</neo-accordion>`;
}
