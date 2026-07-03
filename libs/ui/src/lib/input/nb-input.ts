import { Directive, inject, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbBorderStrength } from '../tokens/border';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbTone } from '../tokens/tone';
import type { NbInputSize } from './input.types';

export type NbInputTone = NbTone;
export type NbInputBorder = NbBorderStrength;
export type NbInputRadius = NbRadius;
export type NbInputShadow = NbShadow;

@Directive({
  selector: 'input[nbInput]',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[style.--nb-input-border-width]': 'border()',
    '[style.--nb-input-radius]': 'radius()',
    '[style.--nb-input-shadow]': 'shadow()',
  },
})
export class NbInput {
  readonly size = input<NbInputSize>('md');
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;
}
