import { booleanAttribute, computed, Directive, input } from '@angular/core';

export type NbTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type NbTextWeight =
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type NbTextTone =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'inverse'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'danger'
  | 'success'
  | 'warning';

export type NbTextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export type NbTextTracking = 'tight' | 'normal' | 'wide' | 'wider';

export type NbTextMeasure = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export type NbTextLeading = 'none' | 'tight' | 'normal' | 'relaxed';

const sizeMap: Record<NbTextSize, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
};

const defaultLineHeightMap: Record<NbTextSize, string> = {
  xs: '1rem',
  sm: '1.25rem',
  md: '1.5rem',
  lg: '1.75rem',
  xl: '1.875rem',
};

const leadingMap: Record<NbTextLeading, string | null> = {
  none: '1',
  tight: '1.15',
  normal: null,
  relaxed: '1.65',
};

const weightMap: Record<NbTextWeight, string> = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
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
  host: {
    '[attr.data-nb-text]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-weight]': 'weight()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-transform]': 'transform()',
    '[attr.data-tracking]': 'tracking()',
    '[attr.data-measure]': 'measure()',
    '[attr.data-leading]': 'leading()',

    '[style.margin]': 'marginValue()',
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

  /**
   * Reset native paragraph/heading margins.
   * Default true so spacing comes from layout primitives (nbStack, nbCluster, etc.).
   */
  readonly reset = input(true, { transform: booleanAttribute });

  protected readonly marginValue = computed(() => (this.reset() ? '0' : null));

  protected readonly sizeValue = computed(() => sizeMap[this.size()]);

  protected readonly lineHeightValue = computed(() => {
    const explicitLeading = leadingMap[this.leading()];
    return explicitLeading ?? defaultLineHeightMap[this.size()];
  });

  protected readonly weightValue = computed(() => weightMap[this.weight()]);
  protected readonly colorValue = computed(() => toneMap[this.tone()]);
  protected readonly transformValue = computed(() => this.transform());
  protected readonly trackingValue = computed(
    () => trackingMap[this.tracking()],
  );
  protected readonly measureValue = computed(() => {
    const val = measureMap[this.measure()];
    return val === 'none' ? null : val;
  });
}
