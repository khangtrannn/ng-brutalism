import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InspiredDesignsGallery } from './components/inspired-designs-gallery';
import { InspiredDesignsOverview } from './components/inspired-designs-overview';

@Component({
  selector: 'docs-inspired-designs-page',
  imports: [InspiredDesignsGallery, InspiredDesignsOverview],
  template: `
    <article>
      <docs-inspired-designs-overview />
      <docs-inspired-designs-gallery />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InspiredDesignsPage {}
