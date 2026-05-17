import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NbAccordionItemComponent } from './accordion-item';

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
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          [class]="chevronClasses()"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionTriggerComponent {
  protected readonly item = inject(NbAccordionItemComponent);

  protected readonly triggerClasses = computed(() =>
    nbClass(
      'flex min-h-14 flex-1 items-center justify-between gap-4',
      'w-full bg-(--nb-main) p-4 text-left text-base font-bold',
      'text-(--nb-main-foreground) transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      this.item.open() && 'border-b-2 border-(--nb-border)'
    )
  );

  protected readonly chevronClasses = computed(() =>
    nbClass(
      'pointer-events-none size-5 shrink-0 transition-transform duration-200',
      this.item.open() && 'rotate-180'
    )
  );
}
