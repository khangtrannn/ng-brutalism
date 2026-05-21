import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NbAccordionItem } from './nb-accordion-item';

@Component({
  selector: 'nb-accordion-content',
  template: `
    <div
      [id]="item.contentId"
      [class]="classes()"
      role="region"
      [attr.aria-labelledby]="item.triggerId"
      [attr.data-slot]="'accordion-content'"
      [attr.data-state]="item.open() ? 'open' : 'closed'"
      [attr.data-orientation]="'vertical'"
      [attr.aria-hidden]="!item.open()"
    >
      <div class="min-h-0 overflow-hidden">
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
export class NbAccordionContent {
  protected readonly item = inject(NbAccordionItem);

  protected readonly classes = computed(() =>
    nbClass(
      '[--nb-accordion-content-bg:var(--nb-surface)]',
      '[--nb-accordion-content-fg:var(--nb-surface-foreground)]',
      'grid overflow-hidden bg-(--nb-accordion-content-bg) text-sm font-medium',
      'text-(--nb-accordion-content-fg)',
      'transition-[grid-template-rows] duration-200 ease-out',
      this.item.open() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
    )
  );
}
