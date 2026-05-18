import { ChangeDetectionStrategy, Component } from '@angular/core';

import AvatarPageComponent from '../components/avatar.page';

@Component({
  selector: 'docs-avatar-route-page',
  standalone: true,
  imports: [AvatarPageComponent],
  template: `<docs-avatar-page />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsAvatarRoutePageComponent {}
