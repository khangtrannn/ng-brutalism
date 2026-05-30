import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import type {
  NbButtonIconShape,
  NbButtonIconSize,
  NbButtonIconTone,
} from './button.types';

const iconSizeMap: Record<NbButtonIconSize, string> = {
  sm: '1.5rem',
  md: '2rem',
  lg: '2.5rem',
};

const iconRadiusMap: Record<NbButtonIconShape, string> = {
  none: '0',
  square: 'var(--nb-radius-sm, 0.25rem)',
  circle: '999px',
};

const iconToneMap: Record<NbButtonIconTone, { bg: string; color: string }> = {
  default: { bg: 'transparent', color: 'currentColor' },
  inverse: { bg: 'var(--nb-foreground)', color: 'var(--nb-background)' },
  current: { bg: 'currentColor', color: 'var(--nb-background)' },
};

@Directive({
  selector: '[nbButtonTrailingIcon]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-button-trailing-icon]': '""',
    '[style.width]': 'sizeVal()',
    '[style.height]': 'sizeVal()',
    '[style.borderRadius]': 'radiusVal()',
    '[style.background]': 'bgVal()',
    '[style.color]': 'colorVal()',
  },
})
export class NbButtonTrailingIcon {
  readonly size = input<NbButtonIconSize | undefined>(undefined);
  readonly shape = input<NbButtonIconShape | undefined>(undefined);
  readonly tone = input<NbButtonIconTone | undefined>(undefined);

  protected readonly sizeVal = computed(() => {
    const s = this.size();
    return s !== undefined ? iconSizeMap[s] : null;
  });

  protected readonly radiusVal = computed(() => {
    const s = this.shape();
    return s !== undefined ? iconRadiusMap[s] : null;
  });

  protected readonly bgVal = computed(() => {
    const t = this.tone();
    return t !== undefined ? iconToneMap[t].bg : null;
  });

  protected readonly colorVal = computed(() => {
    const t = this.tone();
    return t !== undefined ? iconToneMap[t].color : null;
  });

  protected readonly classes = computed(() =>
    nbClass(
      'ml-auto [&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.size() !== undefined && 'inline-flex items-center justify-center shrink-0'
    )
  );
}
