import { ChangeDetectionStrategy, Component } from '@angular/core';

import ImageCardPage from '../components/image-card.page';

@Component({
    selector: 'docs-image-card-route-page',
    imports: [ImageCardPage],
    template: `<docs-image-card-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsImageCardRoutePage {}
