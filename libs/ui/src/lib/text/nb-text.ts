import { computed, Directive, input } from '@angular/core';

import {
  NbResetMarginCapability,
  NbUnderlineCapability,
} from '../core/capabilities';
import type { NbTone } from '../tokens/tone';
import {
  nbFontWeightValue,
  type NbFontWeight,
  type NbTextTracking,
  type NbUnderlineVariant,
} from '../tokens/typography';

export type NbTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// Weight reuses the shared font-weight scale so it stays in lockstep with
// nbDisplay and any future typographic primitive.
export type NbTextWeight = NbFontWeight;

export type NbTextTone =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'inverse'
  | Extract<
      NbTone,
      'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'
    >;

export type NbTextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

// NbTextTracking is defined in tokens/typography and re-exported here to keep
// the public type path stable.
export type { NbTextTracking } from '../tokens/typography';

export type NbTextMeasure = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export type NbTextLeading = 'none' | 'tight' | 'normal' | 'relaxed';

// Alias of the shared underline variant — keeps the public type name stable.
export type NbTextUnderline = NbUnderlineVariant;

const sizeMap: Record<NbTextSize, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
};

const defaultLineHeightMap: Record<NbTextSize, string> = {
  xs: '1rem',
  sm: '1.25rem',
  md: '1.5rem',
  lg: '1.75rem',
  xl: '1.875rem',
  '2xl': '2rem',
  '3xl': '2.25rem',
};

const leadingMap: Record<NbTextLeading, string | null> = {
  none: '1',
  tight: '1.15',
  normal: null,
  relaxed: '1.65',
};

const toneMap: Record<NbTextTone, string> = {
  default: 'var(--nb-foreground)',
  muted: 'color-mix(in srgb, var(--nb-foreground) 80%, transparent)',
  subtle: 'color-mix(in srgb, var(--nb-foreground) 65%, transparent)',
  inverse: 'var(--nb-background)',
  primary: 'var(--nb-primary)',
  secondary: 'var(--nb-secondary)',
  accent: 'var(--nb-accent)',
  danger: 'var(--nb-danger)',
  success: 'var(--nb-success)',
  warning: 'var(--nb-warning)',
};

const trackingMap: Record<NbTextTracking, string> = {
  tight: '-0.025em',
  // Explicit 'normal' resets any inherited letter-spacing; do not collapse to null.
  normal: 'normal',
  wide: '0.025em',
  wider: '0.05em',
};

const measureMap: Record<NbTextMeasure, string> = {
  none: 'none',
  xs: '20rem',
  sm: '28rem',
  md: '36rem',
  lg: '44rem',
};

@Directive({
  selector: '[nbText]',
  standalone: true,
  exportAs: 'nbText',
  hostDirectives: [
    // underline variant + optional gap/width overrides → data-underline + CSS vars
    {
      directive: NbUnderlineCapability,
      inputs: ['underline', 'underlineGap', 'underlineWidth'],
    },
    // reset input → margin: 0 (removes native paragraph/heading margin)
    { directive: NbResetMarginCapability, inputs: ['reset'] },
  ],
  host: {
    '[attr.data-nb-text]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-weight]': 'weight()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-transform]': 'transform()',
    '[attr.data-tracking]': 'tracking()',
    '[attr.data-measure]': 'measure()',
    '[attr.data-leading]': 'leading()',

    '[style.color]': 'colorValue()',
    '[style.font-size]': 'sizeValue()',
    '[style.line-height]': 'lineHeightValue()',
    '[style.font-weight]': 'weightValue()',
    '[style.text-transform]': 'transformValue()',
    '[style.letter-spacing]': 'trackingValue()',
    '[style.max-width]': 'measureValue()',
  },
})
export class NbText {
  readonly size = input<NbTextSize>('md');
  readonly weight = input<NbTextWeight>('normal');
  readonly tone = input<NbTextTone>('default');
  readonly transform = input<NbTextTransform>('none');
  readonly tracking = input<NbTextTracking>('normal');
  readonly measure = input<NbTextMeasure>('none');
  readonly leading = input<NbTextLeading>('normal');
  // underline / underlineGap / underlineWidth / reset → composed capabilities

  protected readonly sizeValue = computed(() => sizeMap[this.size()]);

  protected readonly lineHeightValue = computed(() => {
    const explicitLeading = leadingMap[this.leading()];
    return explicitLeading ?? defaultLineHeightMap[this.size()];
  });

  protected readonly weightValue = computed(() => nbFontWeightValue(this.weight()));
  protected readonly colorValue = computed(() => toneMap[this.tone()]);
  protected readonly transformValue = computed(() => this.transform());
  protected readonly trackingValue = computed(() => trackingMap[this.tracking()]);
  protected readonly measureValue = computed(() => {
    const val = measureMap[this.measure()];
    return val === 'none' ? null : val;
  });
}
