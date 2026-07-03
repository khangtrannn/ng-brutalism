import { Directive, booleanAttribute, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type { NbButtonPress, NbButtonSize } from './button.types';

@Directive({
  selector: 'button[nbButton], a[nbButton]',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-press]': 'press()',
    '[attr.data-size]': 'size()',
    '[attr.data-full-width]': 'fullWidth() ? "" : null',
    '[style.--nb-button-radius]': 'radius()',
    '[style.--nb-button-shadow]': 'shadow()',
    '[style.--nb-button-border-width]': 'border()',
  },
})
export class NbButton {
  readonly press = input<NbButtonPress>('push');
  readonly size = input<NbButtonSize>('md');
  readonly fullWidth = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
}
