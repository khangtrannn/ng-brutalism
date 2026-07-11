import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-chip-design-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="chip" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipDesignTokens {}
