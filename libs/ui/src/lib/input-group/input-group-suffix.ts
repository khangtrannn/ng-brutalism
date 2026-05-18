import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import { NB_INPUT_SUFFIX } from './input-group.types';

export type NbInputSuffixAlign = 'center' | 'stretch';

@Directive({
  selector: '[nbInputSuffix]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.data-align]': 'align()',
  },
  providers: [{ provide: NB_INPUT_SUFFIX, useExisting: NbInputSuffix }],
})
export class NbInputSuffix {
  readonly align = input<NbInputSuffixAlign>('center');

  protected readonly classes = computed(() =>
    nbClass(
      'flex w-12 shrink-0 items-center justify-center',
      'border-l-2 border-(--nb-border)',
      'bg-(--nb-input-addon-bg)',
      this.align() === 'stretch' ? 'self-stretch' : ''
    )
  );
}
