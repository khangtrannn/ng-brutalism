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
import type { NbIconShape, NbSize } from '@ng-brutalism/ui/tokens';

export type NbIconButtonShape = NbIconShape;
export type NbIconButtonSize = NbSize;

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
    'data-nb-icon-button': '',
    '[style.--nb-icon-button-radius]': 'radius()',
    '[style.--nb-icon-button-shadow]': 'shadow()',
    '[style.--nb-icon-button-border-width]': 'border()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbIconButton {
  readonly shape = input<NbIconButtonShape>('square');
  readonly size = input<NbIconButtonSize>('md');
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
