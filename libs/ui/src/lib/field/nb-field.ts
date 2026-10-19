import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';

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
    'data-nb-field': '',
    '[attr.data-invalid]': 'invalid() ? "" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbField implements NbFieldContext {
  #idGenerator = inject(NbIdGenerator);

  // Set by `NbFieldControlBridge` (forms-compat) — a classic `NgControl` has no
  // way to write an `input()` from outside a template binding, so status
  // mirroring goes through these instead. ORed into the public signals below.
  readonly #compatInvalid = signal(false);
  readonly #compatRequired = signal(false);

  // A field owns the identity of its single control: the control and `nbLabel`
  // both resolve to this id so `for`/`id`/`aria-*` always agree. Wrap one control
  // per field — a second control would reuse this id.
  readonly controlId = `nb-field-control-${this.#idGenerator.next()}`;

  private readonly description = contentChild(NbFieldDescription);
  private readonly error = contentChild(NbFieldError);

  // Aliased (unlike the project's usual no-rename convention) so the public
  // `[invalid]`/`[required]` bindings can stay put while `invalid`/`required`
  // themselves become the merged signal below (`NbFieldContext` needs those
  // exact names). Public, not protected: Angular's strict template checker
  // type-checks external `[invalid]`/`[required]` bindings against the
  // declared property name, which requires public access.
  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly invalidInput = input(false, { alias: 'invalid' });
  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly requiredInput = input(false, { alias: 'required' });

  readonly invalid = computed(
    () => this.invalidInput() || this.#compatInvalid()
  );
  readonly required = computed(
    () => this.requiredInput() || this.#compatRequired()
  );

  readonly describedBy = computed(() => {
    const ids = [
      this.description()?.id,
      this.invalid() ? this.error()?.id : undefined,
    ].filter((id): id is string => !!id);

    return ids.length > 0 ? ids.join(' ') : null;
  });

  /** @internal Set by `NbFieldControlBridge` (forms-compat) — not for template use. */
  ɵsetCompatInvalid(invalid: boolean): void {
    this.#compatInvalid.set(invalid);
  }

  /** @internal Set by `NbFieldControlBridge` (forms-compat) — not for template use. */
  ɵsetCompatRequired(required: boolean): void {
    this.#compatRequired.set(required);
  }
}
