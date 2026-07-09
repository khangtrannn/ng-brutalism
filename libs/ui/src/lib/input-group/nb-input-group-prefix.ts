import { Directive, input } from '@angular/core';

import { NB_INPUT_PREFIX, type NbInputAffixAlign } from './input-group.types';

export type NbInputPrefixAlign = NbInputAffixAlign;

@Directive({
  selector: '[nbInputPrefix]',
  exportAs: 'nbInputPrefix',
  host: {
    '[attr.data-align]': 'align()',
  },
  providers: [{ provide: NB_INPUT_PREFIX, useExisting: NbInputPrefix }],
})
export class NbInputPrefix {
  readonly align = input<NbInputPrefixAlign>('center');
}
