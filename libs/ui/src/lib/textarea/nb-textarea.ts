import { Directive, computed, inject, input } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbBorderCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbTextareaSize } from './textarea.types';

@Directive({
  selector: 'textarea[nbTextarea]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'textarea' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { tone: 'surface', border: 'default' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: {
    '[class]': 'classes()',
    '[attr.data-size]': 'size()',
    '[style.background-color]': 'isInGroup ? "transparent" : null',
    '[style.border-width]': 'isInGroup ? "0" : null',
  },
})
export class NbTextarea {
  readonly size = input<NbTextareaSize>('md');

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  protected readonly classes = computed(() => {
    const inGroup = this.isInGroup;

    return nbClass(
      '[--nb-textarea-radius:var(--nb-radius)]',
      '[--nb-textarea-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
      'flex font-medium',
      'placeholder:text-gray-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'resize-none',
      inGroup
        ? ['flex-1 min-w-0', 'focus-visible:outline-none']
        : [
            'rounded-(--nb-textarea-radius)',
            'shadow-[var(--nb-textarea-shadow)]',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-[var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
            'focus-visible:ring-offset-2 focus-visible:shadow-none',
          ]
    );
  });
}
