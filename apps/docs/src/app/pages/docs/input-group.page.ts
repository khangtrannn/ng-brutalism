import { ChangeDetectionStrategy, Component } from '@angular/core';

import InputGroupPageComponent from '../components/input-group.page';

@Component({
    selector: 'docs-input-group-route-page',
    imports: [InputGroupPageComponent],
    template: `<docs-input-group-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsInputGroupRoutePageComponent {}
