import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-cluster-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="cluster" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterTokens {}
