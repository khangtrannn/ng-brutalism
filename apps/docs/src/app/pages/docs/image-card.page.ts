import { ChangeDetectionStrategy, Component } from '@angular/core';

import ImageCardPageComponent from '../components/image-card.page';

@Component({
    selector: 'docs-image-card-route-page',
    imports: [ImageCardPageComponent],
    template: `<docs-image-card-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsImageCardRoutePageComponent {}
