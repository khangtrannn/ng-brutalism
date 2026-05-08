import { InjectionToken } from '@angular/core';

export type NbDensity = 'compact' | 'normal' | 'comfortable';

export const NB_DENSITY = new InjectionToken<NbDensity>('NB_DENSITY', {
  factory: () => 'normal',
});
