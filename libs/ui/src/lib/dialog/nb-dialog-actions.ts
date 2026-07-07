import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-dialog-actions',
  exportAs: 'nbDialogActions',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"dialog-actions"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogActions {}
