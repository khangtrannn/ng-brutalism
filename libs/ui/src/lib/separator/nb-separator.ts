import { Directive, input } from '@angular/core';

import type {
  NbLayoutSeparator,
  NbOrientation,
} from '@ng-brutalism/ui/tokens';

export type NbSeparatorOrientation = NbOrientation;
export type NbSeparatorVariant = Exclude<NbLayoutSeparator, 'none'>;

@Directive({
  selector: 'hr[nbSeparator]',
  exportAs: 'nbSeparator',
  host: {
    'data-nb-separator': '',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-variant]': 'variant()',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class NbSeparator {
  readonly orientation = input<NbSeparatorOrientation>('horizontal');
  readonly variant = input<NbSeparatorVariant>('solid');
}
