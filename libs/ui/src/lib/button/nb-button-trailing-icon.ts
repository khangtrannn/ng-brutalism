import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

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
  none: 'var(--nb-radius-none)',
  square: 'var(--nb-radius-sm)',
  circle: 'var(--nb-radius-full)',
};

@Component({
  selector: '[nbButtonTrailingIcon]',
  exportAs: 'nbButtonTrailingIcon',
  imports: [NbIcon],
  template: `
    @if (icon(); as iconSrc) {
    <span nbIcon [src]="iconSrc" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    '[attr.data-nb-button-trailing-icon]': '""',
    '[attr.data-push]': 'push()',
    '[attr.data-size]': 'size() ?? null',
    '[attr.data-shape]': 'shape() ?? null',
    '[attr.data-tone]': 'tone() ?? null',
    '[style.--nb-button-trailing-icon-size]': 'sizeVal()',
    '[style.--nb-button-trailing-icon-radius]': 'radiusVal()',
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
}
