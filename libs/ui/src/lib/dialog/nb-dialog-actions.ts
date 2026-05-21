import { ChangeDetectionStrategy, Component } from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-dialog-actions',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"dialog-actions"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogActions {
  protected readonly classes = nbClass(
    '[--nb-dialog-actions-bg:transparent]',
    'bg-(--nb-dialog-actions-bg)'
  );
}
