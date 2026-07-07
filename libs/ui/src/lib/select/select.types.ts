import { InjectionToken } from '@angular/core';

import type { NbSelectOption } from './nb-select-option';

export type NbSelectValue = string | number;

export type NbSelectSize = 'sm' | 'md' | 'lg';

export interface NbSelectController {
  readonly isDisabled: () => boolean;
  readonly listboxId: string;

  isSelected(value: NbSelectValue | null): boolean;
  selectOption(option: NbSelectOption): void;
  focusPreviousOption(current: NbSelectOption): void;
  focusNextOption(current: NbSelectOption): void;
  focusFirstOption(): void;
  focusLastOption(): void;
  handleTypeahead(current: NbSelectOption, key: string): void;
  closeOnTab(): void;
  closeAndFocusTrigger(): void;
}

export const NB_SELECT = new InjectionToken<NbSelectController>('NB_SELECT');
