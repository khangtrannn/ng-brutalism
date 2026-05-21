import { ChangeDetectionStrategy, Component } from '@angular/core';

import TitlePage from '../components/title.page';

@Component({
    selector: 'docs-title-route-page',
    imports: [TitlePage],
    template: `<docs-title-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsTitleRoutePage {}
