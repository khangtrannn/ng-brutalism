import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-status-dot-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="status-dot" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDotTokens {}
