import { ChangeDetectionStrategy, Component } from '@angular/core';

import LabelPage from '../components/label.page';

@Component({
    selector: 'docs-label-route-page',
    imports: [LabelPage],
    template: `<docs-label-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsLabelRoutePage {}
