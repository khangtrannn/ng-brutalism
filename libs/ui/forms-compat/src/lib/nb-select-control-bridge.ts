import { Directive, DoCheck, OnDestroy, inject } from '@angular/core';
import type { OutputRefSubscription } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import type { Subscription } from 'rxjs';

import { NbSelect, type NbSelectValue } from '@ng-brutalism/ui';

import { NB_ERROR_STATE_MATCHER } from './nb-error-state-matcher';

// Bridges `nb-select` into classic Angular forms, mirroring Angular Material's CVA
// pattern: assign `ngControl.valueAccessor = this` directly instead of providing
// `NG_VALUE_ACCESSOR` (avoids a circular DI dependency and gives free access to the
// resolved control for status mirroring). See ADR 0004 §3.
@Directive({
  selector:
    'nb-select[formControl], nb-select[formControlName], nb-select[ngModel]',
})
export class NbSelectControlBridge
  implements ControlValueAccessor, DoCheck, OnDestroy
{
  private readonly nbSelect = inject(NbSelect, { self: true });
  private readonly errorStateMatcher = inject(NB_ERROR_STATE_MATCHER);
  private readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });
  private readonly parentForm = inject(NgForm, { optional: true });
  private readonly parentFormGroup = inject(FormGroupDirective, {
    optional: true,
  });

  // Set while `writeValue` is pushing a programmatic value into the model, so the
  // resulting `value` emission isn't echoed back into the control as a user edit.
  private writingValue = false;
  private statusSubscription?: Subscription;
  private readonly valueSubscription: OutputRefSubscription;
  private readonly touchSubscription: OutputRefSubscription;

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.valueSubscription = this.nbSelect.value.subscribe((value) => {
      if (!this.writingValue) {
        this.onChange(value);
      }
    });
    this.touchSubscription = this.nbSelect.touch.subscribe(() =>
      this.onTouched()
    );
  }

  ngDoCheck(): void {
    this.updateInvalid();
  }

  ngOnDestroy(): void {
    this.valueSubscription.unsubscribe();
    this.touchSubscription.unsubscribe();
    this.statusSubscription?.unsubscribe();
  }

  // `@typescript-eslint/member-ordering` treats function-valued fields as
  // methods, so these (despite being plain fields, reassigned by `register*`
  // below) live here in the method section rather than up with the other fields.
  private onChange: (value: NbSelectValue | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: NbSelectValue | null): void {
    this.writingValue = true;
    this.nbSelect.value.set(value);
    this.writingValue = false;

    // `writeValue` is called once the control is fully resolved (Angular's
    // `setUpControl` calls it last), so this is the first safe point to read
    // `ngControl.control` — doing it in the constructor is too early.
    this.watchControlStatusOnce();
  }

  registerOnChange(fn: (value: NbSelectValue | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nbSelect.ɵsetCompatDisabled(isDisabled);
  }

  private watchControlStatusOnce(): void {
    if (this.statusSubscription) {
      return;
    }

    const control = this.ngControl?.control;
    if (!control) {
      return;
    }

    this.updateInvalid();
    this.statusSubscription = control.events.subscribe(() => this.updateInvalid());
  }

  private updateInvalid(): void {
    const control = this.ngControl?.control ?? null;
    this.nbSelect.ɵsetCompatInvalid(
      this.errorStateMatcher.isErrorState({
        control,
        parentForm: this.parentForm,
        parentFormGroup: this.parentFormGroup,
      })
    );
  }
}
