import { InjectionToken } from '@angular/core';

import type { NbInputGroup } from './nb-input-group';

export const NB_INPUT_GROUP = new InjectionToken<NbInputGroup>('NB_INPUT_GROUP');

export type NbInputAffixAlign = 'center' | 'stretch';
