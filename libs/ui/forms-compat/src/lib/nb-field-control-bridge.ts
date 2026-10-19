import { Directive, DoCheck, contentChild, effect, inject } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm, Validators } from '@angular/forms';

import { NbField } from '@ng-brutalism/ui';

import { NB_ERROR_STATE_MATCHER } from './nb-error-state-matcher';

// Drives `nb-field`'s `invalid`/`required` from whichever classic control is
// projected into it — `formControlName`, `formControl`, or `ngModel`, on either
// `nb-select` (via `NbSelectControlBridge`) or a native element directive
// (`nbInput`, `nbTextarea`, ...), since `NgControl` is content-queried generically.
// Makes `nb-field-error` visibility automatic without an explicit `[invalid]`
// binding. See ADR 0004 §3.
@Directive({
  selector: 'nb-field',
})
export class NbFieldControlBridge implements DoCheck {
  private readonly nbField = inject(NbField, { self: true });
  private readonly errorStateMatcher = inject(NB_ERROR_STATE_MATCHER);
  private readonly parentForm = inject(NgForm, { optional: true });
  private readonly parentFormGroup = inject(FormGroupDirective, {
    optional: true,
  });
  private readonly ngControl = contentChild(NgControl, { descendants: true });

  constructor() {
    effect((onCleanup) => {
      const ngControl = this.ngControl();
      const control = ngControl?.control;

      if (!control) {
        this.nbField.ɵsetCompatInvalid(false);
        this.nbField.ɵsetCompatRequired(false);
        return;
      }

      this.update();
      const subscription = control.events.subscribe(() => this.update());
      onCleanup(() => subscription.unsubscribe());
    });
  }

  ngDoCheck(): void {
    this.update();
  }

  private update(): void {
    const control = this.ngControl()?.control ?? null;

    this.nbField.ɵsetCompatInvalid(
      this.errorStateMatcher.isErrorState({
        control,
        parentForm: this.parentForm,
        parentFormGroup: this.parentFormGroup,
      })
    );
    this.nbField.ɵsetCompatRequired(
      !!(
        control?.hasValidator(Validators.required) ||
        control?.hasValidator(Validators.requiredTrue)
      )
    );
  }
}
