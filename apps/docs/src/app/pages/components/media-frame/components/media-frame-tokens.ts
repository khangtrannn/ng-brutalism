import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-media-frame-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="media-frame" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaFrameTokens {}
