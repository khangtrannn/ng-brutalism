import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-sticker-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="sticker" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerTokens {}
