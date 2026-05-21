import { ChangeDetectionStrategy, Component } from '@angular/core';

import InputGroupPage from '../components/input-group.page';

@Component({
    selector: 'docs-input-group-route-page',
    imports: [InputGroupPage],
    template: `<docs-input-group-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsInputGroupRoutePage {}
