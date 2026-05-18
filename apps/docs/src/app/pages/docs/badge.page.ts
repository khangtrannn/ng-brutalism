import { ChangeDetectionStrategy, Component } from '@angular/core';

import BadgePageComponent from '../components/badge.page';

@Component({
  selector: 'docs-badge-route-page',
  standalone: true,
  imports: [BadgePageComponent],
  template: `<docs-badge-page />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsBadgeRoutePageComponent {}
