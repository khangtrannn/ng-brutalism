import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-accordion-multiple',
  imports: [
    NbAccordion,
    NbAccordionContent,
    NbAccordionItem,
    NbAccordionTrigger,
    DocsExample,
  ],
  template: `
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionMultiple {
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
}
