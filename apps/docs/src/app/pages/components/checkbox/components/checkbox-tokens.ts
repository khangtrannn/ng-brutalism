import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-checkbox-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="checkbox" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxTokens {}
