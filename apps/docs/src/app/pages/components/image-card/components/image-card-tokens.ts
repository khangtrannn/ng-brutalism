import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-image-card-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="image-card" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardTokens {}
