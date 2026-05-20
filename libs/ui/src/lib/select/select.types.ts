import { InjectionToken } from '@angular/core';

import type { NbSelectOption } from './select-option';

export type NbSelectValue = string | number;

export interface NbSelectController {
  readonly disabled: () => boolean;
  readonly listboxId: string;

  isSelected(value: NbSelectValue | null): boolean;
  selectOption(option: NbSelectOption): void;
  focusPreviousOption(current: NbSelectOption): void;
  focusNextOption(current: NbSelectOption): void;
  closeAndFocusTrigger(): void;
}

export const NB_SELECT = new InjectionToken<NbSelectController>('NB_SELECT');
