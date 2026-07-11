import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ClusterAccessibility } from './components/cluster-accessibility';
import { ClusterAlignment } from './components/cluster-alignment';
import { ClusterApi } from './components/cluster-api';
import { ClusterComposition } from './components/cluster-composition';
import { ClusterGaps } from './components/cluster-gaps';
import { ClusterHero } from './components/cluster-hero';
import { ClusterJustification } from './components/cluster-justification';
import { ClusterPreview } from './components/cluster-preview';
import { ClusterResponsive } from './components/cluster-responsive';
import { ClusterSeparators } from './components/cluster-separators';
import { ClusterTokens } from './components/cluster-tokens';
import { ClusterUsage } from './components/cluster-usage';
import { ClusterWrapping } from './components/cluster-wrapping';

@Component({
  selector: 'docs-cluster-page',
  imports: [
    ClusterHero,
    ClusterPreview,
    ClusterUsage,
    ClusterGaps,
    ClusterAlignment,
    ClusterJustification,
    ClusterWrapping,
    ClusterSeparators,
    ClusterComposition,
    ClusterResponsive,
    ClusterTokens,
    ClusterAccessibility,
    ClusterApi,
  ],
  template: `
    <article>
      <docs-cluster-hero />
      <docs-cluster-preview />
      <docs-cluster-usage />
      <docs-cluster-gaps />
      <docs-cluster-alignment />
      <docs-cluster-justification />
      <docs-cluster-wrapping />
      <docs-cluster-separators />
      <docs-cluster-composition />
      <docs-cluster-responsive />
      <docs-cluster-tokens />
      <docs-cluster-accessibility />
      <docs-cluster-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClusterPage {}
