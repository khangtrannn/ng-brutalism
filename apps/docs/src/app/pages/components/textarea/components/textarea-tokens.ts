import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-textarea-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="textarea" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaTokens {}
