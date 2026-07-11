import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-marquee-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="marquee" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeTokens {}
