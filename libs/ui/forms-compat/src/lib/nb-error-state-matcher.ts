import { InjectionToken } from '@angular/core';
import type { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

export interface NbErrorStateMatcherContext {
  control: AbstractControl | null;
  parentForm: NgForm | null;
  parentFormGroup: FormGroupDirective | null;
}

export interface NbErrorStateMatcher {
  isErrorState(context: NbErrorStateMatcherContext): boolean;
}

export const nbDefaultErrorStateMatcher: NbErrorStateMatcher = {
  isErrorState({ control, parentForm, parentFormGroup }) {
    return !!(
      control?.invalid &&
      (control.touched || parentForm?.submitted || parentFormGroup?.submitted)
    );
  },
};

export const NB_ERROR_STATE_MATCHER =
  new InjectionToken<NbErrorStateMatcher>('NB_ERROR_STATE_MATCHER', {
    providedIn: 'root',
    factory: () => nbDefaultErrorStateMatcher,
  });
