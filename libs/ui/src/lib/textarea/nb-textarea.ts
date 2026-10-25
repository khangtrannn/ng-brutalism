import { Directive, computed, inject, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/style-transforms';
import { NB_FIELD } from '../field/field.types';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbTextareaSize } from './textarea.types';

@Directive({
  selector: 'textarea[nbTextarea]',
  exportAs: 'nbTextarea',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    'data-nb-textarea': '',
    '[attr.data-size]': 'size()',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
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
  #group = inject(NB_INPUT_GROUP, { optional: true });

  readonly size = input<NbTextareaSize>('md');
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

  protected readonly isInGroup = this.#group !== null;

  protected readonly field = inject(NB_FIELD, { optional: true });

  protected readonly resolvedId = computed(
    () => this.field?.controlId ?? this.id()
  );
}
