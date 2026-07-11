import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-separator-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="separator" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorTokens {}
