import { Directive, computed, inject } from '@angular/core';

import { nbClass } from '../core/class';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';

@Directive({
  selector: 'select[nbSelect]',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class NbSelect {
  private readonly group = inject(NB_INPUT_GROUP, { optional: true });

  protected readonly classes = computed(() => {
    const inGroup = this.group !== null;

    return nbClass(
      '[--nb-select-bg:var(--nb-input-bg,var(--nb-field-bg))]',
      '[--nb-select-fg:var(--nb-foreground)]',
      '[--nb-select-border:var(--nb-border)]',
      '[--nb-select-radius:var(--nb-radius)]',
      'flex border-2 border-(--nb-select-border)',
      'bg-(--nb-select-bg) text-(--nb-select-fg)',
      'font-medium',
      'appearance-none',
      'pr-10',
      'has-[option:disabled:checked]:text-gray-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      inGroup
        ? [
            'flex-1 min-w-0',
            'bg-transparent',
            'border-0',
            'focus-visible:outline-none',
          ]
        : [
            'rounded-(--nb-select-radius)',
            'shadow-nb',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-select-border)',
            'focus-visible:ring-offset-2 focus-visible:shadow-none',
          ]
    );
  });
}
