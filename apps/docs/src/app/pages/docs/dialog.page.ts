import { ChangeDetectionStrategy, Component } from '@angular/core';

import DialogPage from '../components/dialog.page';

@Component({
    selector: 'docs-dialog-route-page',
    imports: [DialogPage],
    template: `<docs-dialog-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsDialogRoutePage {}
