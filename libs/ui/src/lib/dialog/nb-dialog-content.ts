import { ChangeDetectionStrategy, Component } from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-dialog-content',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"dialog-content"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogContent {
  protected readonly classes = nbClass(
    '[--nb-dialog-content-bg:transparent]',
    'bg-(--nb-dialog-content-bg)'
  );
}
