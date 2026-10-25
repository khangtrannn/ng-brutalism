import { Directive, computed, inject, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import { nbBorderWidthStyleTransform } from '../core/style-transforms';
import { NB_FIELD } from '../field/field.types';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbSelectSize } from './select.types';

@Directive({
  selector: 'select[nbSelect]',
  exportAs: 'nbSelect',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    'data-nb-native-select': '',
    '[attr.data-size]': 'size()',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[attr.id]': 'resolvedId() ?? null',
    '[attr.aria-describedby]': 'field?.describedBy() ?? null',
    '[attr.aria-invalid]': 'field?.invalid() ? "true" : null',
    '[attr.aria-required]': 'field?.required() ? "true" : null',
    '[style.--nb-native-select-border-width]': 'border()',
  },
})
export class NbNativeSelect {
  #group = inject(NB_INPUT_GROUP, { optional: true });

  readonly size = input<NbSelectSize>('md');
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
  readonly id = input<string | undefined>(undefined);

  protected readonly isInGroup = this.#group !== null;
  protected readonly field = inject(NB_FIELD, { optional: true });

  protected readonly resolvedId = computed(
    () => this.field?.controlId ?? this.id()
  );
}
