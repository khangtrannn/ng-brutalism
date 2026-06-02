import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NbDocsLayout } from '../docs/layout/docs-layout';

@Component({
  selector: 'composition-layout-page',
  imports: [NbDocsLayout],
  template: `<nb-docs-layout />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompositionLayoutPage {}
