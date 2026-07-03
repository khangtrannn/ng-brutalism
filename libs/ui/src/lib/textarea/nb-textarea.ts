import { Directive, inject, input } from '@angular/core';

import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type { NbTone } from '../tokens/tone';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbTextareaSize } from './textarea.types';

@Directive({
  selector: 'textarea[nbTextarea]',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[attr.data-nb-tone]': 'tone() ?? null',
    '[style.--nb-textarea-border-width]': 'border()',
    '[style.--nb-textarea-radius]': 'radius()',
    '[style.--nb-textarea-shadow]': 'shadow()',
  },
})
export class NbTextarea {
  readonly size = input<NbTextareaSize>('md');
  readonly tone = input<NbTone | undefined>(undefined);
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
