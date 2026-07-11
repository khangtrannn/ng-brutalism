import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-group-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="input-group" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupTokens {}
