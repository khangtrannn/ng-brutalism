import { ChangeDetectionStrategy, Component } from '@angular/core';

import TextareaPage from '../components/textarea.page';

@Component({
    selector: 'docs-textarea-route-page',
    imports: [TextareaPage],
    template: `<docs-textarea-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsTextareaRoutePage {}
