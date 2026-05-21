import { Directive } from '@angular/core';

@Directive({
  selector: '[nbDialogTitle]',
  standalone: true,
  host: {
    '[attr.data-slot]': '"dialog-title"',
  },
})
export class NbDialogTitle {}
