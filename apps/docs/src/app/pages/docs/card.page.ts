import { ChangeDetectionStrategy, Component } from '@angular/core';

import CardPage from '../components/card.page';

@Component({
    selector: 'docs-card-route-page',
    imports: [CardPage],
    template: `<docs-card-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsCardRoutePage {}
