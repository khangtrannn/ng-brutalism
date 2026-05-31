import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NbIcon, type NbIconSize } from '../icon';
import type {
  NbButtonIconPush,
  NbButtonIconShape,
  NbButtonIconSize,
  NbButtonIconTone,
} from './button.types';

const iconSizeMap: Record<NbButtonIconSize, string> = {
  sm: '1.5rem',
  md: '2rem',
  lg: '2.5rem',
};

// Glyph size for the internal `nbIcon`, sized to sit comfortably inside the
// badge box defined by `size` above (roughly half the box).
const iconGlyphMap: Record<NbButtonIconSize, NbIconSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
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

@Component({
  selector: '[nbButtonTrailingIcon]',
  imports: [NbIcon],
  template: `
    @if (icon(); as iconSrc) {
      <span nbIcon [src]="iconSrc" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-button-trailing-icon]': '""',
    '[style.width]': 'sizeVal()',
    '[style.height]': 'sizeVal()',
    '[style.borderRadius]': 'radiusVal()',
    '[style.background]': 'bgVal()',
    '[style.color]': 'colorVal()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbButtonTrailingIcon {
  readonly size = input<NbButtonIconSize | undefined>(undefined);
  readonly shape = input<NbButtonIconShape | undefined>(undefined);
  readonly tone = input<NbButtonIconTone | undefined>(undefined);
  readonly push = input<NbButtonIconPush>('none');
  // Optional icon, given as an SVG/image URL. Rendered through nbIcon in mask
  // mode so it tints to the badge's foreground color. Omit to project your own
  // icon as content instead.
  readonly icon = input<string>();

  protected readonly sizeVal = computed(() => {
    const s = this.size();
    return s !== undefined ? iconSizeMap[s] : null;
  });

  protected readonly iconSize = computed<NbIconSize>(() => {
    const s = this.size();
    return s !== undefined ? iconGlyphMap[s] : 'sm';
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
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.push() === 'end' && 'ml-auto',
      this.size() !== undefined && 'inline-flex items-center justify-center shrink-0'
    )
  );
}
