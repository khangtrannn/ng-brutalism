import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-accordion-preview',
  imports: [
    NbAccordion,
    NbAccordionContent,
    NbAccordionItem,
    NbAccordionTrigger,
    DocsExample,
  ],
  template: `
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionPreview {
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
}
