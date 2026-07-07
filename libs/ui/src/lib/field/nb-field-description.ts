import { Directive, inject } from '@angular/core';

import { NbIdGenerator } from '../core/id-generator';

@Directive({
  selector: '[nbFieldDescription]',
  exportAs: 'nbFieldDescription',
  host: {
    '[attr.id]': 'id',
  },
})
export class NbFieldDescription {
  private readonly idGenerator = inject(NbIdGenerator);

  readonly id = `nb-field-description-${this.idGenerator.next()}`;
}
