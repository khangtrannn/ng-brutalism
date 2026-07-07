import { InjectionToken } from '@angular/core';

import type { NbAccordionTrigger } from './nb-accordion-trigger';

export type NbAccordionType = 'single' | 'multiple';

export type NbAccordionValue = string | string[] | null;

export interface NbAccordionController {
  isItemOpen(value: string): boolean;
  toggleItem(value: string): void;
  focusPreviousTrigger(current: NbAccordionTrigger): void;
  focusNextTrigger(current: NbAccordionTrigger): void;
  focusFirstTrigger(): void;
  focusLastTrigger(): void;
}

export const NB_ACCORDION = new InjectionToken<NbAccordionController>(
  'NB_ACCORDION'
);
