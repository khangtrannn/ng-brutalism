import { ChangeDetectionStrategy, Component } from '@angular/core';

import CheckboxPage from '../components/checkbox.page';

@Component({
    selector: 'docs-checkbox-route-page',
    imports: [CheckboxPage],
    template: `<docs-checkbox-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsCheckboxRoutePage {}
