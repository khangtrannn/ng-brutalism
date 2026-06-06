import { Directive, computed, inject } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbBorderCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';

@Directive({
  selector: 'select[nbSelect]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'select' },
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
    '[style.background-color]': 'isInGroup ? "transparent" : null',
    '[style.border-width]': 'isInGroup ? "0" : null',
  },
})
export class NbNativeSelect {
  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  protected readonly classes = computed(() => {
    const inGroup = this.isInGroup;

    return nbClass(
      '[--nb-select-fg:var(--_nb-tone-fg-token,var(--_nb-tone-fg-default))]',
      '[--nb-select-border:var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
      '[--nb-select-radius:var(--nb-radius)]',
      'flex font-medium',
      'appearance-none',
      'pr-10',
      'has-[option:disabled:checked]:text-gray-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      inGroup
        ? ['flex-1 min-w-0', 'focus-visible:outline-none']
        : [
            'bg-(--nb-select-bg)',
            'text-(--nb-select-fg)',
            'border-(--nb-select-border)',
            'rounded-(--nb-select-radius)',
            'shadow-nb',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-select-border)',
            'focus-visible:ring-offset-2 focus-visible:shadow-none',
          ]
    );
  });
}
