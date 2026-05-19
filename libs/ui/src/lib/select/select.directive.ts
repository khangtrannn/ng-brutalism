import { Directive, computed, inject, input } from '@angular/core';

import { nbClass } from '../core/class';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbSelectSize } from './select.types';

@Directive({
  selector: 'select[nbSelect]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.data-size]': 'size()',
  },
})
export class NbSelect {
  readonly size = input<NbSelectSize>('default');

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });

  protected readonly classes = computed(() => {
    const inGroup = this.group !== null;

    return nbClass(
      'flex border-2 border-(--nb-border)',
      'text-(--nb-foreground)',
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
            'rounded-nb',
            'shadow-nb',
            'bg-(--nb-input-background,#ffffff)',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border)',
            'focus-visible:ring-offset-2 focus-visible:shadow-none',
          ]
    );
  });
}
