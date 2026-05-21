import { ChangeDetectionStrategy, Component } from '@angular/core';

import BadgePage from '../components/badge.page';

@Component({
    selector: 'docs-badge-route-page',
    imports: [BadgePage],
    template: `<docs-badge-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsBadgeRoutePage {}
