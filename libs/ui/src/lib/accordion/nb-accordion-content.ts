import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NbAccordionItem } from './nb-accordion-item';

@Component({
  selector: 'nb-accordion-content',
  exportAs: 'nbAccordionContent',
  template: `
    <div
      role="region"
      data-slot="accordion-content"
      data-orientation="vertical"
      [id]="item.contentId"
      [attr.aria-labelledby]="item.triggerId"
      [attr.data-state]="item.open() ? 'open' : 'closed'"
      [attr.aria-hidden]="!item.open()"
      [inert]="!item.open()"
    >
      <div data-slot="accordion-content-inner">
        <ng-content />
      </div>
    </div>
  `,
  host: {
    'data-nb-accordion-content': '',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionContent {
  protected readonly item = inject(NbAccordionItem);
}
