import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-surface-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="surface" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceTokens {}
