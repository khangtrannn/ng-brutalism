import {
  Directive,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';

import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbButtonPress, NbButtonSize } from './button.types';

@Directive({
  selector: 'button[nbButton], a[nbButton]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'button' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'primary',
        radius: 'md',
        shadow: 'default',
        border: 'default',
      } satisfies NbStyleDefaults,
    },
  ],
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
    '[style.background]': 'tone.background()',
    '[style.color]': 'tone.foreground()',
    '[style.border-color]': 'tone.borderColor()',
    '[style.border-radius]': 'radius.value()',
    '[style.box-shadow]': 'shadow.value()',
    '[style.border-width]': 'border.width()',
  },
})
export class NbButton {
  readonly press = input<NbButtonPress>('push');
  readonly size = input<NbButtonSize>('md');
  readonly fullWidth = input<boolean, unknown>(false, { transform: booleanAttribute });

  protected readonly tone = inject(NbToneCapability);
  protected readonly radius = inject(NbRadiusCapability);
  protected readonly shadow = inject(NbShadowCapability);
  protected readonly border = inject(NbBorderCapability);
}
