import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-rating-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="rating" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingTokens {}
