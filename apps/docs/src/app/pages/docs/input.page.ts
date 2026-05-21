import { ChangeDetectionStrategy, Component } from '@angular/core';

import InputPage from '../components/input.page';

@Component({
    selector: 'docs-input-route-page',
    imports: [InputPage],
    template: `<docs-input-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsInputRoutePage {}
