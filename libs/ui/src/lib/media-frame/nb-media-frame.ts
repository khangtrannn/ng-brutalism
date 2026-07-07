import { Directive, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type {
  NbBorderStrength,
  NbRadius,
  NbShadow,
  NbTone,
} from '@ng-brutalism/ui/tokens';
// Public type aliases point at the shared token contracts.
export type NbMediaFrameTone = NbTone;
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
  exportAs: 'nbMediaFrame',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-nb-media-frame]': '""',
    '[attr.data-ratio]': 'ratio()',
    '[attr.data-fit]': 'fit()',
    '[style.--nb-media-frame-radius]': 'radius()',
    '[style.--nb-media-frame-shadow]': 'shadow()',
    '[style.--nb-media-frame-border-width]': 'border()',
  },
})
export class NbMediaFrame {
  readonly ratio = input<NbMediaFrameRatio>('auto');
  readonly fit = input<NbMediaFrameFit>('cover');
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
