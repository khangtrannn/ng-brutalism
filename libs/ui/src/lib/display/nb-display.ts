import { booleanAttribute, computed, Directive, input } from '@angular/core';

export type NbDisplaySize = 'sm' | 'default' | 'lg' | 'xl';
export type NbDisplayTracking = 'normal' | 'tight' | 'tighter';
export type NbDisplayLeading = 'none' | 'tight' | 'display';
export type NbDisplayUnderline = 'none' | 'bar' | 'wave';

const SIZE_MAP: Record<NbDisplaySize, string> = {
  sm: '2rem',
  default: '3rem',
  lg: '3.75rem',
  xl: '4.75rem',
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
    class: 'font-black',
    '[style.font-size]': 'fontSize()',
    '[style.color]': '"var(--nb-display-color, currentColor)"',
    '[style.letter-spacing]': 'trackingValue()',
    '[style.line-height]': 'leadingValue()',
    '[style.margin]': 'marginValue()',
    '[attr.data-nb-display]': '""',
    '[attr.data-underline]': 'underlineAttr()',
  },
})
export class NbDisplay {
  readonly size = input<NbDisplaySize>('default');
  readonly tracking = input<NbDisplayTracking>('tight');
  readonly leading = input<NbDisplayLeading>('none');
  readonly underline = input<NbDisplayUnderline>('none');
  readonly reset = input<boolean, unknown>(true, { transform: booleanAttribute });

  protected readonly fontSize = computed(
    () => `var(--nb-display-size, ${SIZE_MAP[this.size()]})`
  );
  protected readonly trackingValue = computed(() => TRACKING_MAP[this.tracking()]);
  protected readonly leadingValue = computed(() => LEADING_MAP[this.leading()]);
  protected readonly marginValue = computed(() => (this.reset() ? '0' : null));
  protected readonly underlineAttr = computed(() => {
    const underline = this.underline();
    return underline === 'none' ? null : underline;
  });
}
