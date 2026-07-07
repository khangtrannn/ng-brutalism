import { computed, Directive, inject, input } from '@angular/core';

import {
  NbResetMarginCapability,
  NbUnderlineCapability,
} from '../core/capabilities';
import type {
  NbTone,
  NbTextTracking,
  NbFontWeight,
  NbUnderlineVariant,
} from '@ng-brutalism/ui/tokens';
export type NbTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

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

export type { NbTextTracking } from '@ng-brutalism/ui/tokens';

export type NbTextMeasure = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export type NbTextLeading = 'none' | 'tight' | 'normal' | 'relaxed';

export type NbTextUnderline = NbUnderlineVariant;

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

@Directive({
  selector: '[nbText]',
  standalone: true,
  exportAs: 'nbText',
  hostDirectives: [
    {
      directive: NbUnderlineCapability,
      inputs: ['underline', 'underlineGap', 'underlineWidth'],
    },
    { directive: NbResetMarginCapability, inputs: ['reset'] },
  ],
  host: {
    '[attr.data-nb-text]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-weight]': 'weight()',
    '[attr.data-nb-tone]': 'tone() ?? null',
    '[attr.data-transform]': 'transform()',
    '[attr.data-tracking]': 'tracking()',
    '[attr.data-measure]': 'measure()',
    '[attr.data-leading]': 'leading()',

    '[style.--nb-text-color]': 'colorValue()',
    '[style.--nb-underline-gap]': 'underlineGapStyle()',
    '[style.--nb-underline-width]': 'underlineWidthStyle()',
  },
})
export class NbText {
  readonly size = input<NbTextSize>('md');
  readonly weight = input<NbTextWeight>('normal');
  readonly tone = input<NbTextTone | undefined>(undefined);
  readonly transform = input<NbTextTransform>('none');
  readonly tracking = input<NbTextTracking>('normal');
  readonly measure = input<NbTextMeasure>('none');
  readonly leading = input<NbTextLeading>('normal');

  private readonly underlineCapability = inject(NbUnderlineCapability);

  protected readonly colorValue = computed(() => {
    const tone = this.tone();
    return tone ? toneMap[tone] : null;
  });
  protected readonly underlineGapStyle = computed(() =>
    this.underlineCapability.gap()
  );
  protected readonly underlineWidthStyle = computed(() =>
    this.underlineCapability.width()
  );
}
