import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
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
  exportAs: 'nbIconButton',
  imports: [NbIcon],
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
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
    '[style.--nb-icon-button-radius]': 'radius()',
    '[style.--nb-icon-button-shadow]': 'shadow()',
    '[style.--nb-icon-button-border-width]': 'border()',
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
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });

  protected readonly iconSize = computed<NbIconSize>(
    () => iconSizeMap[this.size()]
  );
}
