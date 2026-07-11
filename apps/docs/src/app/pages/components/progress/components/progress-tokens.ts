import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-progress-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="progress" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressTokens {}
