import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NbAccordionItemComponent } from './accordion-item';

@Component({
  selector: 'neo-accordion-content',
  standalone: true,
  template: `
    <div
      [class]="classes()"
      role="region"
      [attr.data-slot]="'accordion-content'"
      [attr.data-state]="item.open() ? 'open' : 'closed'"
      [attr.data-orientation]="'vertical'"
      [attr.aria-hidden]="!item.open()"
    >
      <div class="overflow-hidden">
        <div class="p-4">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionContentComponent {
  protected readonly item = inject(NbAccordionItemComponent);

  protected readonly classes = computed(() =>
    nbClass(
      'grid overflow-hidden rounded-b-nb bg-nb-surface text-sm font-medium',
      'text-nb-surface-fg transition-[grid-template-rows] duration-200 ease-out',
      this.item.open() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
    )
  );
}
