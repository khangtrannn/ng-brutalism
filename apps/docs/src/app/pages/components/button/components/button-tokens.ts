import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-button-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="button" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonTokens {}
