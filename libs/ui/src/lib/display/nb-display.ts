import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
} from '@angular/core';

import {
  NbResetMarginCapability,
  NbUnderlineCapability,
} from '../core/capabilities';
import {
  type NbFontWeight,
  type NbUnderlineVariant,
} from '@ng-brutalism/ui/tokens';

export type NbDisplaySize = 'sm' | 'md' | 'lg' | 'xl';
export type NbDisplayWeight = NbFontWeight;
export type NbDisplayTracking = 'normal' | 'tight' | 'tighter';
export type NbDisplayLeading = 'none' | 'tight' | 'display';

export type NbDisplayUnderline = NbUnderlineVariant;

@Directive({
  selector: '[nbDisplay]',
  exportAs: 'nbDisplay',
  hostDirectives: [
    {
      directive: NbUnderlineCapability,
      inputs: ['underline', 'underlineGap', 'underlineWidth'],
    },
    { directive: NbResetMarginCapability, inputs: ['reset'] },
  ],
  host: {
    'data-nb-display': '',
    '[attr.data-size]': 'size()',
    '[attr.data-weight]': 'weight()',
    '[attr.data-tracking]': 'tracking()',
    '[attr.data-leading]': 'leading()',
    '[attr.data-fluid]': 'fluid() ? "" : null',

    '[style.--nb-underline-gap]': 'underlineGapStyle()',
    '[style.--nb-underline-width]': 'underlineWidthStyle()',
  },
})
export class NbDisplay {
  readonly size = input<NbDisplaySize>('md');
  readonly weight = input<NbDisplayWeight>('black');
  readonly fluid = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly tracking = input<NbDisplayTracking>('tight');
  readonly leading = input<NbDisplayLeading>('none');
  private readonly underlineCapability = inject(NbUnderlineCapability);

  protected readonly underlineGapStyle = computed(() =>
    this.underlineCapability.gap()
  );
  protected readonly underlineWidthStyle = computed(() =>
    this.underlineCapability.width()
  );
}
