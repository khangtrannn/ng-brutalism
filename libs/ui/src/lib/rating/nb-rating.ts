import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-rating',
  template: `
    @for (i of stars(); track i) {
      <span [class]="i <= filled() ? filledClass : emptyClass">{{ i <= filled() ? '★' : '☆' }}</span>
    }
    @if (count() !== undefined) {
      <span class="text-xs font-bold text-(--nb-rating-empty) ml-0.5">({{ count() }})</span>
    }
  `,
  host: {
    '[class]': 'classes',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.role]': '"img"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRating {
  readonly value = input<number>(0);
  readonly max = input<number>(5);
  readonly count = input<number | undefined>(undefined);

  protected readonly stars = computed(() =>
    Array.from({ length: this.max() }, (_, i) => i + 1)
  );

  protected readonly filled = computed(() =>
    Math.round(Math.min(Math.max(this.value(), 0), this.max()))
  );

  protected readonly ariaLabel = computed(
    () => `${this.value()} out of ${this.max()} stars`
  );

  protected readonly classes = nbClass(
    '[--nb-rating-filled:#f59e0b]',
    '[--nb-rating-empty:var(--nb-border)]',
    '[--nb-rating-size:1.25rem]',
    'inline-flex items-center gap-0.5'
  );

  protected readonly filledClass = nbClass(
    'text-(--nb-rating-filled)',
    'text-[length:var(--nb-rating-size)]',
    'leading-none'
  );

  protected readonly emptyClass = nbClass(
    'text-(--nb-rating-empty)',
    'text-[length:var(--nb-rating-size)]',
    'leading-none'
  );
}
