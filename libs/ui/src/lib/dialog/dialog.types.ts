import { InjectionToken } from '@angular/core';

export interface NbDialogController {
  open(): void;
  close(): void;
}

export const NB_DIALOG = new InjectionToken<NbDialogController>('NB_DIALOG');
