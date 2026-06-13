import { Directive, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import type { NbCheckboxSize } from './checkbox.types';

@Directive({
  selector: 'input[nbCheckbox]',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-size]': 'size()',
  },
})
export class NbCheckbox {
  readonly size = input<NbCheckboxSize>('md');
}
