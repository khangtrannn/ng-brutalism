import { Directive, input } from '@angular/core';

import { NB_INPUT_SUFFIX } from './input-group.types';

export type NbInputSuffixAlign = 'center' | 'stretch';

@Directive({
  selector: '[nbInputSuffix]',
  exportAs: 'nbInputSuffix',
  host: {
    '[attr.data-align]': 'align()',
  },
  providers: [{ provide: NB_INPUT_SUFFIX, useExisting: NbInputSuffix }],
})
export class NbInputSuffix {
  readonly align = input<NbInputSuffixAlign>('center');
}
