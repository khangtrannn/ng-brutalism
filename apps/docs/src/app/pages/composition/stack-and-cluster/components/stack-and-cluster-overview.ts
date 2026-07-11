import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-composition-stack-cluster-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <p class="eyebrow">Composition</p>
      <h1>Stack & Cluster</h1>
      <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
        <code class="font-mono">nbStack</code> is the default primitive for
        vertical rhythm. <code class="font-mono">nbCluster</code> is the
        default primitive for inline groups that may wrap. Use them everywhere
        instead of manually wiring up flex utilities.
      </p>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionStackClusterOverview {}
