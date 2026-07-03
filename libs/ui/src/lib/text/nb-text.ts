import { computed, Directive, inject, input } from '@angular/core';

import {
  NbResetMarginCapability,
  NbUnderlineCapability,
} from '../core/capabilities';
import type { NbTone } from '../tokens/tone';
import {
  type NbTextTracking,
  type NbFontWeight,
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

// Tone is text-specific color intent: 'default'/'muted'/'subtle'/'inverse' have
// no surface (bg/fg/border) and aren't part of the shared tone recipe, so they
// resolve here rather than through the shared --_nb-tone-* slots.
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
    // underline variant + optional gap/width overrides
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
  // underline / underlineGap / underlineWidth / reset → composed capabilities

  private readonly underlineCapability = inject(NbUnderlineCapability);

  // No tone input → no inline write; CSS owns the neutral foreground fallback.
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
