import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import type { NbTextareaSize } from './textarea.types';

@Directive({
  selector: 'textarea[nbTextarea]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.data-size]': 'size()',
  },
})
export class NbTextarea {
  readonly size = input<NbTextareaSize>('default');

  protected readonly classes = computed(() =>
    nbClass(
      'flex w-full min-h-20 rounded-nb border-2 border-(--nb-border)',
      'bg-(--nb-secondary-background) text-(--nb-foreground)',
      'font-medium',
      'shadow-nb',
      'placeholder:text-gray-400',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2 focus-visible:shadow-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'resize-y',
      this.sizeClass()
    )
  );

  private sizeClass(): string {
    const map: Record<NbTextareaSize, string> = {
      default: 'px-3 py-2 text-sm',
      sm: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    return map[this.size()];
  }
}
