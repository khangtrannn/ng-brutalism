import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CompositionSurfaceSectionApi } from './components/surface-and-section-api';
import { CompositionSurfaceSectionBasicPanel } from './components/surface-and-section-basic-panel';
import { CompositionSurfaceSectionClip } from './components/surface-and-section-clip';
import { CompositionSurfaceSectionHeaderBodyFooter } from './components/surface-and-section-header-body-footer';
import { CompositionSurfaceSectionOverview } from './components/surface-and-section-overview';
import { CompositionSurfaceSectionRelationship } from './components/surface-and-section-relationship';
import { CompositionSurfaceSectionWhenToUse } from './components/surface-and-section-when-to-use';

@Component({
  selector: 'docs-composition-surface-section-page',
  imports: [
    CompositionSurfaceSectionOverview,
    CompositionSurfaceSectionRelationship,
    CompositionSurfaceSectionBasicPanel,
    CompositionSurfaceSectionHeaderBodyFooter,
    CompositionSurfaceSectionClip,
    CompositionSurfaceSectionWhenToUse,
    CompositionSurfaceSectionApi,
  ],
  template: `
    <article>
      <docs-composition-surface-section-overview />
      <docs-composition-surface-section-relationship />
      <docs-composition-surface-section-basic-panel />
      <docs-composition-surface-section-header-body-footer />
      <docs-composition-surface-section-clip />
      <docs-composition-surface-section-when-to-use />
      <docs-composition-surface-section-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SurfaceAndSectionPage {}
