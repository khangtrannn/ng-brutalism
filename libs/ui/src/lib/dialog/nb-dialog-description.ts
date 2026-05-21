import { Directive } from '@angular/core';

import { nbClass } from '../core/class';

@Directive({
  selector: '[nbDialogDescription]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"dialog-description"',
  },
})
export class NbDialogDescription {
  protected readonly classes = nbClass(
    '[--nb-dialog-description-fg:#4b5563]',
    'text-(--nb-dialog-description-fg)'
  );
}
