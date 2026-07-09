import { Directive } from '@angular/core';

@Directive({
  selector: '[nbDialogTitle]',
  exportAs: 'nbDialogTitle',
  host: {
    'data-slot': 'dialog-title',
  },
})
export class NbDialogTitle {}
