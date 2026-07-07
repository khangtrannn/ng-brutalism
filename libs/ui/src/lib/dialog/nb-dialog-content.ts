import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-dialog-content',
  exportAs: 'nbDialogContent',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"dialog-content"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogContent {}
