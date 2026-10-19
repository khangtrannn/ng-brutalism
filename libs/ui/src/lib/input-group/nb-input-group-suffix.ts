import { Directive, input } from '@angular/core';

import type { NbInputAffixAlign } from './input-group.types';

export type NbInputSuffixAlign = NbInputAffixAlign;

@Directive({
  selector: '[nbInputSuffix]',
  exportAs: 'nbInputSuffix',
  host: {
    '[attr.data-align]': 'align()',
  },
})
export class NbInputSuffix {
  readonly align = input<NbInputSuffixAlign>('center');
}
