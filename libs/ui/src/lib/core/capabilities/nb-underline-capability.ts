import { computed, Directive, input } from '@angular/core';

import {
  nbUnderlineGapValue,
  nbUnderlineWidthValue,
  type NbUnderlineGap,
  type NbUnderlineVariant,
  type NbUnderlineWidth,
} from '../../tokens/typography';

/**
 * INTERNAL capability — not part of the public API. Handles the three underline
 * inputs shared by nbText and nbDisplay: the variant (none/bar/wave), the gap
 * between text baseline and the decoration, and the decoration width.
 *
 * Reflects `data-underline` for the CSS selector and exposes computed gap/width
 * values. The consuming primitive maps those values to the host CSS hooks.
 */
@Directive({
  selector: '[nbUnderlineCapability]',
  host: {
    '[attr.data-underline]': 'underlineAttr()',
  },
})
export class NbUnderlineCapability {
  readonly underline = input<NbUnderlineVariant>('none');
  readonly underlineGap = input<NbUnderlineGap | undefined>(undefined);
  readonly underlineWidth = input<NbUnderlineWidth | undefined>(undefined);

  protected readonly underlineAttr = computed(() => {
    const u = this.underline();
    return u === 'none' ? null : u;
  });

  readonly gap = computed(() => {
    const gap = this.underlineGap();
    return gap ? nbUnderlineGapValue(gap) : null;
  });

  readonly width = computed(() => {
    const width = this.underlineWidth();
    return width ? nbUnderlineWidthValue(width) : null;
  });
}
