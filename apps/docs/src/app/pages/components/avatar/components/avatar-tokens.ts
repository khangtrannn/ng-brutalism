import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-avatar-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="avatar" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarTokens {}
