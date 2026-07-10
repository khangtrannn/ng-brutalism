import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NbDocsLayout } from '@ng-brutalism/docs-ui';

@Component({
    selector: 'docs-layout-page',
    imports: [NbDocsLayout],
    template: `<nb-docs-layout />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsLayoutPage {}
