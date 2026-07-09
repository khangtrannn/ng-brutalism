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
export type NbBadgeTone = NbTone;
export type NbBadgeRadius = NbRadius;
export type NbBadgeShadow = NbShadow;
export type NbBadgeBorder = NbBorderStrength;

@Directive({
  selector: 'span[nbBadge]',
  exportAs: 'nbBadge',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    'data-nb-badge': '',
    '[style.--nb-badge-radius]': 'radius()',
    '[style.--nb-badge-shadow]': 'shadow()',
    '[style.--nb-badge-border-width]': 'border()',
  },
})
export class NbBadge {
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
