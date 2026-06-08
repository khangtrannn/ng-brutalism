import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-dialog-actions',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"dialog-actions"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogActions {}
