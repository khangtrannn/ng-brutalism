import { Directive, inject } from '@angular/core';

import { NB_DIALOG } from './dialog.types';

@Directive({
  selector: '[nbDialogClose]',
  exportAs: 'nbDialogClose',
  host: { '(click)': 'controller.close()' },
})
export class NbDialogClose {
  protected readonly controller = inject(NB_DIALOG);
}
