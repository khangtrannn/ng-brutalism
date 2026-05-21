import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NbDocsLayout } from '../docs/layout/docs-layout';

@Component({
    selector: 'docs-layout-page',
    imports: [NbDocsLayout],
    template: `<nb-docs-layout />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsLayoutPage {}
