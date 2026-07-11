import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-select-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="select" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTokens {}
