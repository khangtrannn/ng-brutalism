import { ChangeDetectionStrategy, Component } from '@angular/core';

import ButtonPage from '../components/button.page';

@Component({
    selector: 'docs-button-route-page',
    imports: [ButtonPage],
    template: `<docs-button-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsButtonRoutePage {}
