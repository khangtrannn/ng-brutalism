import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-stat-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="stat" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatTokens {}
