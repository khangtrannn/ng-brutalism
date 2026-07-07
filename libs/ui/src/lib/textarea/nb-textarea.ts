import { Directive, computed, inject, input } from '@angular/core';

import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type { NbTone } from '@ng-brutalism/ui/tokens';
import { NB_FIELD } from '../field/field.types';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbTextareaSize } from './textarea.types';

@Directive({
  selector: 'textarea[nbTextarea]',
  exportAs: 'nbTextarea',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[attr.data-nb-tone]': 'tone() ?? null',
    '[attr.id]': 'resolvedId() ?? null',
    '[attr.aria-describedby]': 'field?.describedBy() ?? null',
    '[attr.aria-invalid]': 'field?.invalid() ? "true" : null',
    '[attr.aria-required]': 'field?.required() ? "true" : null',
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
  readonly id = input<string | undefined>(undefined);

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  protected readonly field = inject(NB_FIELD, { optional: true });

  protected readonly resolvedId = computed(
    () => this.id() ?? this.field?.controlId
  );
}
