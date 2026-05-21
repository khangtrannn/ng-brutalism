import { Directive } from '@angular/core';

@Directive({
  selector: '[nbDialogTitle]',
  host: {
    '[attr.data-slot]': '"dialog-title"',
  },
})
export class NbDialogTitle {}
