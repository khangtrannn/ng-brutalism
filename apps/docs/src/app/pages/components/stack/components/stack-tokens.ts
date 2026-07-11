import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-stack-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="stack" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackTokens {}
