import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import { NB_INPUT_PREFIX } from './input-group.types';

export type NbInputPrefixAlign = 'center' | 'stretch';

@Directive({
  selector: '[nbInputPrefix]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.data-align]': 'align()',
  },
  providers: [{ provide: NB_INPUT_PREFIX, useExisting: NbInputPrefix }],
})
export class NbInputPrefix {
  readonly align = input<NbInputPrefixAlign>('center');

  protected readonly classes = computed(() =>
    nbClass(
      'flex w-12 shrink-0 items-center justify-center',
      'border-r-2 border-(--nb-border)',
      'bg-(--nb-input-addon-bg)',
      this.align() === 'stretch' ? 'self-stretch' : ''
    )
  );
}
