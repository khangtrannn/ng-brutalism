import { InjectionToken, type Signal } from '@angular/core';

export interface NbInputGroupContext {
  readonly hasPrefix: Signal<boolean>;
  readonly hasSuffix: Signal<boolean>;
}

export const NB_INPUT_GROUP = new InjectionToken<NbInputGroupContext>(
  'NB_INPUT_GROUP'
);

export const NB_INPUT_PREFIX = new InjectionToken<unknown>('NB_INPUT_PREFIX');

export const NB_INPUT_SUFFIX = new InjectionToken<unknown>('NB_INPUT_SUFFIX');
