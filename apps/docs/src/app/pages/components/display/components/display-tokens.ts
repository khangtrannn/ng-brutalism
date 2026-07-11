import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-display-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="display" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayTokens {}
