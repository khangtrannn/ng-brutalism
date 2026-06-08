import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
} from '../core/capabilities';
import { NbIcon, type NbIconSize } from '../icon';

export type NbIconButtonShape = 'square' | 'circle';
export type NbIconButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const iconSizeMap: Record<NbIconButtonSize, NbIconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

@Component({
  selector: 'button[nbIconButton]',
  imports: [NbIcon],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  template: `
    @if (icon(); as iconSrc) {
      <span nbIcon [src]="iconSrc" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    '[attr.data-shape]': 'shape()',
    '[attr.data-size]': 'size()',
    '[attr.data-nb-icon-button]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbIconButton {
  readonly shape = input<NbIconButtonShape>('square');
  readonly size = input<NbIconButtonSize>('md');
  // Optional icon, given as an SVG/image URL. Rendered through nbIcon in mask
  // mode so it tints to the button's foreground color and sizes to match the
  // button. For full-color or custom icons, project an `<svg>`/`nbIcon` as
  // content instead — the internal slot is only used when `icon` is set.
  readonly icon = input<string>();

  protected readonly iconSize = computed<NbIconSize>(() => iconSizeMap[this.size()]);
}
