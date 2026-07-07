import { InjectionToken, type Signal } from '@angular/core';

export interface NbFieldContext {
  readonly controlId: string;
  readonly describedBy: Signal<string | null>;
  readonly invalid: Signal<boolean>;
  readonly required: Signal<boolean>;
}

export const NB_FIELD = new InjectionToken<NbFieldContext>('NB_FIELD');
