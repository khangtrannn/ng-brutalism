import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { trackControlStatus } from '../core/control-status';
import { NbIdGenerator } from '../core/id-generator';
import { NbFieldDescription } from './nb-field-description';
import { NbFieldError } from './nb-field-error';
import { NB_FIELD, type NbFieldContext } from './field.types';

@Component({
  selector: 'nb-field',
  exportAs: 'nbField',
  template: `<ng-content />`,
  providers: [{ provide: NB_FIELD, useExisting: NbField }],
  host: {
    '[attr.data-nb-field]': '""',
    '[attr.data-invalid]': 'invalid() ? "" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbField implements NbFieldContext {
  private readonly idGenerator = inject(NbIdGenerator);

  readonly controlId = `nb-field-control-${this.idGenerator.next()}`;

  private readonly ngControl = contentChild(NgControl, { descendants: true });
  private readonly description = contentChild(NbFieldDescription);
  private readonly error = contentChild(NbFieldError);

  private readonly controlStatus = trackControlStatus(() => this.ngControl());
  readonly invalid = this.controlStatus.invalid;
  readonly required = this.controlStatus.required;

  readonly describedBy = computed(() => {
    const ids = [
      this.description()?.id,
      this.invalid() ? this.error()?.id : undefined,
    ].filter((id): id is string => !!id);

    return ids.length > 0 ? ids.join(' ') : null;
  });
}
