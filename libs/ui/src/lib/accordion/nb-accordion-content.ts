import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NbAccordionItem } from './nb-accordion-item';

@Component({
  selector: 'nb-accordion-content',
  template: `
    <div
      [id]="item.contentId"
      role="region"
      [attr.aria-labelledby]="item.triggerId"
      data-slot="accordion-content"
      [attr.data-state]="item.open() ? 'open' : 'closed'"
      data-orientation="vertical"
      [attr.aria-hidden]="!item.open()"
      [inert]="!item.open()"
    >
      <div data-slot="accordion-content-inner">
        <ng-content />
      </div>
    </div>
  `,
  host: {
    '[attr.data-nb-accordion-content]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionContent {
  protected readonly item = inject(NbAccordionItem);
}
