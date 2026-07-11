import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-section-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="section" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTokens {}
