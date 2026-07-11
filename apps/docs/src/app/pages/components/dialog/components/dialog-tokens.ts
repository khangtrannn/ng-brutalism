import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-dialog-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="dialog" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTokens {}
