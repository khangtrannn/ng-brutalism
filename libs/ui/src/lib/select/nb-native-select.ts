import { Directive, inject, input } from '@angular/core';

import { nbBorderWidthStyleTransform } from '../core/input-transforms';
import type { NbTone } from '@ng-brutalism/ui/tokens';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';

@Directive({
  selector: 'select[nbSelect]',
  exportAs: 'nbSelect',
  host: {
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[attr.data-nb-tone]': 'tone() ?? null',
    '[style.--nb-select-border-width]': 'border()',
  },
})
export class NbNativeSelect {
  #group = inject(NB_INPUT_GROUP, { optional: true });

  readonly tone = input<NbTone | undefined>(undefined);
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });

  protected readonly isInGroup = this.#group !== null;
}
