import { ChangeDetectionStrategy, Component } from '@angular/core';

import CardPageComponent from '../components/card.page';

@Component({
  selector: 'docs-card-route-page',
  standalone: true,
  imports: [CardPageComponent],
  template: `<docs-card-page />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsCardRoutePageComponent {}
