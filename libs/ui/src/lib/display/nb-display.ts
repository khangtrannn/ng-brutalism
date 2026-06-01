import { booleanAttribute, computed, Directive, input } from '@angular/core';

import {
  nbFontWeightValue,
  nbUnderlineGapValue,
  nbUnderlineWidthValue,
  type NbFontWeight,
  type NbUnderlineGap,
  type NbUnderlineWidth,
} from '../tokens/typography';

export type NbDisplaySize = 'sm' | 'md' | 'lg' | 'xl';
export type NbDisplayWeight = NbFontWeight;
export type NbDisplayTracking = 'normal' | 'tight' | 'tighter';
export type NbDisplayLeading = 'none' | 'tight' | 'display';
export type NbDisplayUnderline = 'none' | 'bar' | 'wave';

const SIZE_MAP: Record<NbDisplaySize, string> = {
  sm: '2rem',
  md: '3rem',
  lg: '3.75rem',
  xl: '4.75rem',
};

// Fluid scale: each size becomes a viewport-based clamp whose max matches the
// fixed size above. Viewport units (vw) are used rather than container query
// units so the scale is safe with or without an explicit container — the
// library owns the min/preferred/max formula; users only opt in with `fluid`.
const FLUID_MAP: Record<NbDisplaySize, string> = {
  sm: 'clamp(1.75rem, 1.2rem + 2.75vw, 2rem)',
  md: 'clamp(2.25rem, 1.5rem + 3.75vw, 3rem)',
  lg: 'clamp(2.75rem, 1.8rem + 4.75vw, 3.75rem)',
  xl: 'clamp(3.25rem, 2rem + 6.25vw, 4.75rem)',
};

const TRACKING_MAP: Record<NbDisplayTracking, string> = {
  normal: '0',
  tight: '-0.025em',
  tighter: '-0.08em',
};

const LEADING_MAP: Record<NbDisplayLeading, string> = {
  none: '1',
  tight: '0.9',
  display: '0.84',
};

@Directive({
  selector: '[nbDisplay]',
  host: {
    '[style.font-size]': 'fontSize()',
    '[style.font-weight]': 'weightValue()',
    '[style.color]': '"var(--nb-display-color, currentColor)"',
    '[style.letter-spacing]': 'trackingValue()',
    '[style.line-height]': 'leadingValue()',
    '[style.margin]': 'marginValue()',
    '[style.--nb-underline-gap]': 'underlineGapValue()',
    '[style.--nb-underline-width]': 'underlineWidthValue()',
    '[attr.data-nb-display]': '""',
    '[attr.data-underline]': 'underlineAttr()',
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
  readonly underline = input<NbDisplayUnderline>('none');
  readonly underlineGap = input<NbUnderlineGap | undefined>(undefined);
  readonly underlineWidth = input<NbUnderlineWidth | undefined>(undefined);
  readonly reset = input<boolean, unknown>(true, { transform: booleanAttribute });

  protected readonly fontSize = computed(() => {
    const base = this.fluid() ? FLUID_MAP[this.size()] : SIZE_MAP[this.size()];
    return `var(--nb-display-size, ${base})`;
  });
  protected readonly weightValue = computed(() =>
    nbFontWeightValue(this.weight()),
  );
  protected readonly trackingValue = computed(() => TRACKING_MAP[this.tracking()]);
  protected readonly leadingValue = computed(() => LEADING_MAP[this.leading()]);
  protected readonly marginValue = computed(() => (this.reset() ? '0' : null));
  protected readonly underlineAttr = computed(() => {
    const underline = this.underline();
    return underline === 'none' ? null : underline;
  });
  protected readonly underlineGapValue = computed(() => {
    const gap = this.underlineGap();
    return gap ? nbUnderlineGapValue(gap) : null;
  });
  protected readonly underlineWidthValue = computed(() => {
    const width = this.underlineWidth();
    return width ? nbUnderlineWidthValue(width) : null;
  });
}
