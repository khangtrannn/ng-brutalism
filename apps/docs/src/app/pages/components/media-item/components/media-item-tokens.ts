import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-media-item-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="media-item" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemTokens {}
