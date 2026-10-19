import { Directive, input } from '@angular/core';

import type { NbInputAffixAlign } from './input-group.types';

export type NbInputPrefixAlign = NbInputAffixAlign;

@Directive({
  selector: '[nbInputPrefix]',
  exportAs: 'nbInputPrefix',
  host: {
    '[attr.data-align]': 'align()',
  },
})
export class NbInputPrefix {
  readonly align = input<NbInputPrefixAlign>('center');
}
