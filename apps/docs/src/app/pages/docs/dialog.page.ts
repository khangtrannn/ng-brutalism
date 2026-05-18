import { ChangeDetectionStrategy, Component } from '@angular/core';

import DialogPageComponent from '../components/dialog.page';

@Component({
  selector: 'docs-dialog-route-page',
  standalone: true,
  imports: [DialogPageComponent],
  template: `<docs-dialog-page />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsDialogRoutePageComponent {}
