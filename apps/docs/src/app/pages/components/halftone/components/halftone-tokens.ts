import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-halftone-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="halftone" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalftoneTokens {}
