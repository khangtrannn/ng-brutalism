import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CompositionStackClusterApi } from './components/stack-and-cluster-api';
import { CompositionStackClusterClusterExample } from './components/stack-and-cluster-cluster-example';
import { CompositionStackClusterCombinedExample } from './components/stack-and-cluster-combined-example';
import { CompositionStackClusterGapValues } from './components/stack-and-cluster-gap-values';
import { CompositionStackClusterOverview } from './components/stack-and-cluster-overview';
import { CompositionStackClusterStackExample } from './components/stack-and-cluster-stack-example';
import { CompositionStackClusterWhenEach } from './components/stack-and-cluster-when-each';

@Component({
  selector: 'docs-composition-stack-cluster-page',
  imports: [
    CompositionStackClusterOverview,
    CompositionStackClusterWhenEach,
    CompositionStackClusterStackExample,
    CompositionStackClusterClusterExample,
    CompositionStackClusterCombinedExample,
    CompositionStackClusterGapValues,
    CompositionStackClusterApi,
  ],
  template: `
    <article>
      <docs-composition-stack-cluster-overview />
      <docs-composition-stack-cluster-when-each />
      <docs-composition-stack-cluster-stack-example />
      <docs-composition-stack-cluster-cluster-example />
      <docs-composition-stack-cluster-combined-example />
      <docs-composition-stack-cluster-gap-values />
      <docs-composition-stack-cluster-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StackAndClusterPage {}
