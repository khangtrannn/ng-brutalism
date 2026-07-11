import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-title-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="title" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleTokens {}
