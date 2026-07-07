import { Directive } from '@angular/core';

@Directive({
  selector: '[nbDialogDescription]',
  exportAs: 'nbDialogDescription',
  host: {
    '[attr.data-slot]': '"dialog-description"',
  },
})
export class NbDialogDescription {}
