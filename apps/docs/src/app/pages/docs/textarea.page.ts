import { ChangeDetectionStrategy, Component } from '@angular/core';

import TextareaPageComponent from '../components/textarea.page';

@Component({
    selector: 'docs-textarea-route-page',
    imports: [TextareaPageComponent],
    template: `<docs-textarea-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsTextareaRoutePageComponent {}
