import { Directive, inject, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import { nbBorderWidthStyleTransform } from '../core/input-transforms';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbBorderStrength } from '../tokens/border';
import type { NbTone } from '../tokens/tone';
import type { NbInputSize } from './input.types';

export type NbInputTone = NbTone;
export type NbInputBorder = NbBorderStrength;

@Directive({
  selector: 'input[nbInput]',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[style.--nb-input-border-width]': 'border()',
  },
})
export class NbInput {
  readonly size = input<NbInputSize>('md');
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;
}
