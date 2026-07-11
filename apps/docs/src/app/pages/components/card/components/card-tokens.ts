import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-card-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="card" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTokens {}
