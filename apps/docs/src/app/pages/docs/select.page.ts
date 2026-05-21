import { ChangeDetectionStrategy, Component } from '@angular/core';

import SelectPage from '../components/select.page';

@Component({
    selector: 'docs-select-route-page',
    imports: [SelectPage],
    template: `<docs-select-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsSelectRoutePage {}
