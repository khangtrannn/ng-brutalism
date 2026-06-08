import { Directive, booleanAttribute, input } from '@angular/core';

import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
} from '../core/capabilities';
import type { NbButtonPress, NbButtonSize } from './button.types';

@Directive({
  selector: 'button[nbButton], a[nbButton]',
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: {
    '[attr.data-press]': 'press()',
    '[attr.data-size]': 'size()',
    '[attr.data-full-width]': 'fullWidth() ? "" : null',
  },
})
export class NbButton {
  readonly press = input<NbButtonPress>('push');
  readonly size = input<NbButtonSize>('md');
  readonly fullWidth = input<boolean, unknown>(false, { transform: booleanAttribute });
}
