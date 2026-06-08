import { Directive, inject, input } from '@angular/core';

import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbBorderStrength } from '../tokens/border';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbToneToken } from '../tokens/tone';

// Public type aliases point at the shared token contracts.
export type NbMediaFrameTone = NbToneToken;
export type NbMediaFrameRadius = NbRadius;
export type NbMediaFrameShadow = NbShadow;
export type NbMediaFrameBorder = NbBorderStrength;

// Media-frame-specific anatomy.
export type NbMediaFrameRatio =
  | 'auto'
  | '1/1'
  | '3/4'
  | '4/3'
  | '3/2'
  | '16/9'
  | '21/9';

export type NbMediaFrameFit = 'cover' | 'contain' | 'fill';

@Directive({
  selector: '[nbMediaFrame]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'media-frame' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'default',
        radius: 'lg',
        shadow: 'none',
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
    '[attr.data-nb-media-frame]': '""',
    '[attr.data-ratio]': 'ratio()',
    '[attr.data-fit]': 'fit()',
    '[style.background]': 'tone.background()',
    '[style.color]': 'tone.foreground()',
    '[style.border-color]': 'tone.borderColor()',
    '[style.border-radius]': 'radius.value()',
    '[style.box-shadow]': 'shadow.value()',
    '[style.border-width]': 'border.width()',
  },
})
export class NbMediaFrame {
  readonly ratio = input<NbMediaFrameRatio>('auto');
  readonly fit = input<NbMediaFrameFit>('cover');

  protected readonly tone = inject(NbToneCapability);
  protected readonly radius = inject(NbRadiusCapability);
  protected readonly shadow = inject(NbShadowCapability);
  protected readonly border = inject(NbBorderCapability);
}
