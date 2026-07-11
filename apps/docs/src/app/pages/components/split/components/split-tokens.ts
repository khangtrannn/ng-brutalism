import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-split-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="split" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitTokens {}
