import { ChangeDetectionStrategy, Component } from '@angular/core';

import LabelPageComponent from '../components/label.page';

@Component({
    selector: 'docs-label-route-page',
    imports: [LabelPageComponent],
    template: `<docs-label-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsLabelRoutePageComponent {}
