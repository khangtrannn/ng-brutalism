import { Directive, computed, inject, input } from '@angular/core';

import { nbClass } from '../core/class';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
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

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });

  protected readonly classes = computed(() => {
    const inGroup = this.group !== null;

    return nbClass(
      '[--nb-textarea-bg:var(--nb-input-bg,var(--nb-field-bg))]',
      '[--nb-textarea-fg:var(--nb-foreground)]',
      '[--nb-textarea-border:var(--nb-border)]',
      '[--nb-textarea-radius:var(--nb-radius)]',
      '[--nb-textarea-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
      'flex border-2 border-(--nb-textarea-border)',
      'bg-(--nb-textarea-bg) text-(--nb-textarea-fg)',
      'font-medium',
      'placeholder:text-gray-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'resize-none',
      inGroup
        ? [
            'flex-1 min-w-0',
            'bg-transparent',
            'border-0',
            'focus-visible:outline-none',
          ]
        : [
            'rounded-(--nb-textarea-radius)',
            'shadow-[var(--nb-textarea-shadow)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-textarea-border)',
            'focus-visible:ring-offset-2 focus-visible:shadow-none',
          ]
    );
  });
}
