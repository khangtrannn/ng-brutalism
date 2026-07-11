import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-icon-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="icon" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTokens {}
