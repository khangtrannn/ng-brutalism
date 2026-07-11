import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
  NbButton,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-accordion-controlled',
  imports: [
    NbAccordion,
    NbAccordionContent,
    NbAccordionItem,
    NbAccordionTrigger,
    NbButton,
    DocsExample,
  ],
  template: `
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionControlled {
  protected readonly controlledValue = signal<string | string[] | null>(
    'overview'
  );

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
}
