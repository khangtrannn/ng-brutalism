import { Directive, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import { nbRadiusStyleTransform } from '../core/input-transforms';
import type { NbCheckboxSize } from './checkbox.types';

@Directive({
  selector: 'input[nbCheckbox]',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-size]': 'size()',
    '[style.--nb-checkbox-radius]': 'radius()',
  },
})
export class NbCheckbox {
  readonly size = input<NbCheckboxSize>('md');
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
}
