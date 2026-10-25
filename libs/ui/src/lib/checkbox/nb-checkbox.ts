import { Directive, computed, inject, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import { nbRadiusStyleTransform } from '../core/style-transforms';
import { NB_FIELD } from '../field/field.types';
import type { NbCheckboxSize } from './checkbox.types';

@Directive({
  selector: 'input[nbCheckbox]',
  exportAs: 'nbCheckbox',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    'data-nb-checkbox': '',
    '[attr.data-size]': 'size()',
    '[attr.id]': 'resolvedId() ?? null',
    '[attr.aria-describedby]': 'field?.describedBy() ?? null',
    '[attr.aria-invalid]': 'field?.invalid() ? "true" : null',
    '[attr.aria-required]': 'field?.required() ? "true" : null',
    '[style.--nb-checkbox-radius]': 'radius()',
  },
})
export class NbCheckbox {
  readonly size = input<NbCheckboxSize>('md');
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly id = input<string | undefined>(undefined);

  protected readonly field = inject(NB_FIELD, { optional: true });

  protected readonly resolvedId = computed(
    () => this.field?.controlId ?? this.id()
  );
}
