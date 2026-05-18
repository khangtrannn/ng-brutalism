import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import type { NbInputSize } from './input.types';

@Directive({
  selector: 'input[nbInput]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.data-size]': 'size()',
  },
})
export class NbInput {
  readonly size = input<NbInputSize>('default');

  protected readonly classes = computed(() =>
    nbClass(
      'flex rounded-nb border-2 border-(--nb-border)',
      'text-(--nb-foreground)',
      'font-medium',
      'shadow-nb',
      'placeholder:text-gray-400',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2 focus-visible:shadow-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      this.sizeClass()
    )
  );

  private sizeClass(): string {
    const map: Record<NbInputSize, string> = {
      default: 'h-10 px-3 py-2 text-sm',
      sm: 'h-9 px-3 text-sm',
      lg: 'h-11 px-4 text-base',
    };

    return map[this.size()];
  }
}
