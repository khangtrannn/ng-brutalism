import { ChangeDetectionStrategy, Component } from '@angular/core';

import TitlePageComponent from '../components/title.page';

@Component({
    selector: 'docs-title-route-page',
    imports: [TitlePageComponent],
    template: `<docs-title-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsTitleRoutePageComponent {}
