import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-accordion-disabled',
  imports: [
    NbAccordion,
    NbAccordionContent,
    NbAccordionItem,
    NbAccordionTrigger,
    DocsExample,
  ],
  template: `
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionDisabled {
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
