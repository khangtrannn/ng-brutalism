import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NbAccordionItem } from './nb-accordion-item';

@Component({
  selector: 'nb-accordion-trigger',
  standalone: true,
  template: `
    <h3 class="flex">
      <button
        type="button"
        [id]="item.triggerId"
        [attr.aria-expanded]="item.open()"
        [attr.aria-controls]="item.contentId"
        [attr.data-state]="item.open() ? 'open' : 'closed'"
        [disabled]="item.disabled()"
        [class]="triggerClasses()"
        (click)="item.toggle()"
      >
        <ng-content />
        <svg
          class="size-6 shrink-0 fill-none stroke-current stroke-[3] stroke-linecap-round stroke-linejoin-round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path [attr.d]="item.open() ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'" />
        </svg>
      </button>
    </h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionTrigger {
  protected readonly item = inject(NbAccordionItem);

  protected readonly triggerClasses = computed(() =>
    nbClass(
      '[--nb-accordion-trigger-bg:var(--nb-main)]',
      '[--nb-accordion-trigger-fg:var(--nb-main-foreground)]',
      'flex min-h-14 flex-1 items-center justify-between gap-4',
      'w-full bg-(--nb-accordion-trigger-bg) p-4 text-left text-base font-bold',
      'text-(--nb-accordion-trigger-fg) transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-(--nb-accordion-item-border) focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      this.item.open() && 'border-b-2 border-(--nb-accordion-item-border)'
    )
  );
}
