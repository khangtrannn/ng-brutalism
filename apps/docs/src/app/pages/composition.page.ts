import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NbDocsLayout } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'composition-layout-page',
  imports: [NbDocsLayout],
  template: `<nb-docs-layout />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompositionLayoutPage {}
