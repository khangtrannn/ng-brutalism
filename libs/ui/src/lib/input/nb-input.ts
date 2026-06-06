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
import type { NbInputSize } from './input.types';

@Directive({
  selector: 'input[nbInput]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'input' },
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
export class NbInput {
  readonly size = input<NbInputSize>('md');

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  protected readonly classes = computed(() => {
    const inGroup = this.isInGroup;

    return nbClass(
      '[--nb-input-radius:var(--nb-radius)]',
      '[--nb-input-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
      'flex font-medium',
      'placeholder:text-gray-400',
      'file:h-full file:py-0 file:my-0 file:mr-3 file:px-3',
      'file:cursor-pointer file:text-sm file:font-bold',
      'file:bg-(--nb-main) file:text-(--nb-main-foreground)',
      'file:border-0 file:border-r-2 file:border-(--nb-border)',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      inGroup
        ? ['flex-1 min-w-0', 'focus-visible:outline-none']
        : [
            'rounded-(--nb-input-radius)',
            'shadow-[var(--nb-input-shadow)]',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-[var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
            'focus-visible:ring-offset-2 focus-visible:shadow-none',
          ]
    );
  });
}
