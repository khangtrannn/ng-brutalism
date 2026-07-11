import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-avatar-group-tokens',
  imports: [DocsTokens],
  template: `<docs-tokens component="avatar-group" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarGroupTokens {}
