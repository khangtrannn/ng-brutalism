import { Directive, inject } from '@angular/core';

import { NbIdGenerator } from '../core/id-generator';
import { NB_FIELD } from './field.types';

@Directive({
  selector: '[nbFieldError]',
  exportAs: 'nbFieldError',
  host: {
    '[attr.id]': 'id',
    '[hidden]': '!field?.invalid()',
  },
})
export class NbFieldError {
  private readonly idGenerator = inject(NbIdGenerator);
  protected readonly field = inject(NB_FIELD, { optional: true });

  readonly id = `nb-field-error-${this.idGenerator.next()}`;
}
