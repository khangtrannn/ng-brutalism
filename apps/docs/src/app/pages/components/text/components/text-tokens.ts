import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-text-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="text" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTokens {}
