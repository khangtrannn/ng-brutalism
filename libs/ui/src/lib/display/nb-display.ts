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
import { type NbFontWeight, type NbUnderlineVariant } from '../tokens/typography';

export type NbDisplaySize = 'sm' | 'md' | 'lg' | 'xl';
export type NbDisplayWeight = NbFontWeight;
export type NbDisplayTracking = 'normal' | 'tight' | 'tighter';
export type NbDisplayLeading = 'none' | 'tight' | 'display';

// Alias of the shared underline variant — keeps the public type name stable.
export type NbDisplayUnderline = NbUnderlineVariant;

@Directive({
  selector: '[nbDisplay]',
  hostDirectives: [
    // underline variant + optional gap/width overrides
    {
      directive: NbUnderlineCapability,
      inputs: ['underline', 'underlineGap', 'underlineWidth'],
    },
    // reset input → margin: 0 (removes native heading margin)
    { directive: NbResetMarginCapability, inputs: ['reset'] },
  ],
  host: {
    '[attr.data-nb-display]': '""',
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
  // underline / underlineGap / underlineWidth / reset → composed capabilities

  private readonly underlineCapability = inject(NbUnderlineCapability);

  protected readonly underlineGapStyle = computed(() =>
    this.underlineCapability.gap()
  );
  protected readonly underlineWidthStyle = computed(() =>
    this.underlineCapability.width()
  );
}
