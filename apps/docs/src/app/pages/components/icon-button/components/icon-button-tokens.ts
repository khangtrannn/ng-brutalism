import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-icon-button-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="icon-button" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonTokens {}
