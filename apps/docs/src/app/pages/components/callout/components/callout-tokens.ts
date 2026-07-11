import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-callout-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="callout" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutTokens {}
