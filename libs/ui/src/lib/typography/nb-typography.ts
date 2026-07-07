import { computed, Directive, input } from '@angular/core';

import {
  nbTypographyFontValue,
  type NbTypographyFont,
} from '@ng-brutalism/ui/tokens';

@Directive({
  selector: '[nbTypography]',
  exportAs: 'nbTypography',
  host: {
    '[attr.data-nb-typography]': 'font()',
    '[style.--nb-typography-font]': 'fontValue()',
  },
})
export class NbTypography {
  readonly font = input<NbTypographyFont>('inherit');

  protected readonly fontValue = computed(() =>
    nbTypographyFontValue(this.font())
  );
}
