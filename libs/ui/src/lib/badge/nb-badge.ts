import { Directive } from '@angular/core';

import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
} from '../core/capabilities';
import type { NbBorderStrength } from '../tokens/border';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbTone } from '../tokens/tone';

export type NbBadgeTone = NbTone;
export type NbBadgeRadius = NbRadius;
export type NbBadgeShadow = NbShadow;
export type NbBadgeBorder = NbBorderStrength;

@Directive({
  selector: 'span[nbBadge]',
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: {
    '[attr.data-nb-badge]': '""',
  },
})
export class NbBadge {}
