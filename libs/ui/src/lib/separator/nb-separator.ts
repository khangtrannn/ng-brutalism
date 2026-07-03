import { Directive, input } from '@angular/core';

export type NbSeparatorOrientation = 'horizontal' | 'vertical';
export type NbSeparatorVariant = 'solid' | 'dashed' | 'thick';

@Directive({
  selector: 'hr[nbSeparator]',
  host: {
    '[attr.data-nb-separator]': '""',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-variant]': 'variant()',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class NbSeparator {
  readonly orientation = input<NbSeparatorOrientation>('horizontal');
  readonly variant = input<NbSeparatorVariant>('solid');
}
