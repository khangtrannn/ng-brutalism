import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbChip, NbCluster } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-stack-cluster-cluster-example',
  imports: [DocsExample, NbCluster, NbChip],
  template: `
    <section id="cluster-example" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Cluster - chip group
      </h2>
      <p class="mb-6 text-base font-medium">
        A Cluster wraps chips inline, letting them reflow naturally without
        fixed-width constraints.
      </p>

      <docs-example [code]="clusterExampleCode">
        <div nbCluster gap="xs" justify="center" class="max-w-md">
          <span nbChip tone="yellow">Angular</span>
          <span nbChip tone="mint">Signals</span>
          <span nbChip tone="pink">Zoneless</span>
          <span nbChip tone="lavender">TypeScript</span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionStackClusterClusterExample {
  protected readonly clusterExampleCode = `<div nbCluster gap="xs">
  <span nbChip tone="yellow">Angular</span>
  <span nbChip tone="mint">Signals</span>
  <span nbChip tone="pink">Zoneless</span>
  <span nbChip tone="lavender">TypeScript</span>
</div>`;
}
