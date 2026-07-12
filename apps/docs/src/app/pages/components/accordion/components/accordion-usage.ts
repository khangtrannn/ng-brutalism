import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-accordion-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block title="Template" [code]="exampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionUsage {
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
}
