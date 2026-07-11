import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="input" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTokens {}
