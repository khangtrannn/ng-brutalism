import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-label-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="label" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelTokens {}
