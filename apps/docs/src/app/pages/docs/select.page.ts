import { ChangeDetectionStrategy, Component } from '@angular/core';

import SelectPageComponent from '../components/select.page';

@Component({
    selector: 'docs-select-route-page',
    imports: [SelectPageComponent],
    template: `<docs-select-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsSelectRoutePageComponent {}
