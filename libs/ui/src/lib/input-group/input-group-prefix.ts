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
      '[--nb-input-prefix-bg:var(--nb-input-addon-bg,var(--nb-yellow))]',
      'flex w-12 shrink-0 justify-center',
      'border-r-2 border-(--nb-border)',
      'bg-(--nb-input-prefix-bg)',
      this.align() === 'stretch' ? 'self-stretch items-start pt-2' : 'items-center'
    )
  );
}
