import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-badge-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="badge" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeTokens {}
