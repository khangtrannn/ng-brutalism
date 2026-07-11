import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-field-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="field" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldTokens {}
