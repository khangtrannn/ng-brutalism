import { Directive, computed, inject, input } from '@angular/core';

import { NB_FIELD } from '../field/field.types';

@Directive({
  selector: 'label[nbLabel]',
  exportAs: 'nbLabel',
  host: {
    '[attr.for]': 'forId()',
  },
})
export class NbLabel {
  #field = inject(NB_FIELD, { optional: true });

  readonly for = input<string | undefined>(undefined);

  protected readonly forId = computed(
    () => this.for() ?? this.#field?.controlId ?? null
  );
}
