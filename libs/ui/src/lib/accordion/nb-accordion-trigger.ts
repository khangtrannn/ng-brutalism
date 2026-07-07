import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import { NbAccordionItem } from './nb-accordion-item';

@Component({
  selector: 'nb-accordion-trigger',
  exportAs: 'nbAccordionTrigger',
  template: `
    <h3 data-slot="accordion-trigger-heading">
      <button
        type="button"
        data-slot="accordion-trigger-button"
        [id]="item.triggerId"
        [attr.aria-expanded]="item.open()"
        [attr.aria-controls]="item.contentId"
        [attr.data-state]="item.open() ? 'open' : 'closed'"
        [disabled]="item.disabled()"
        (click)="item.toggle()"
      >
        <ng-content />
        <svg
          data-slot="accordion-trigger-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path [attr.d]="item.open() ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'" />
        </svg>
      </button>
    </h3>
  `,
  host: {
    '[attr.data-nb-accordion-trigger]': '""',
  },
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionTrigger {
  protected readonly item = inject(NbAccordionItem);
}
