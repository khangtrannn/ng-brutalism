import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCluster, NbSurface, type NbClusterGap } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface ClusterGapDemo {
  readonly value: NbClusterGap;
  readonly label: string;
}

@Component({
  selector: 'docs-cluster-gaps',
  imports: [DocsExample, NbCluster, NbSurface],
  template: `
    <section id="gaps">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Gaps</h2>
      <docs-example [code]="gapsExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          @for (gap of gaps; track gap.value) {
          <div nbSurface shadow="sm" class="p-4">
            <span class="font-mono text-xs font-bold uppercase mb-2">{{
              gap.label
            }}</span>

            <div nbCluster [gap]="gap.value">
              <span
                class="size-10 border-2 border-(--nb-border) bg-(--nb-yellow)"
              ></span>
              <span
                class="size-10 border-2 border-(--nb-border) bg-(--nb-mint)"
              ></span>
              <span
                class="size-10 border-2 border-(--nb-border) bg-(--nb-pink)"
              ></span>
            </div>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterGaps {
  protected readonly gapsExampleCode = `<div nbCluster gap="none">...</div>
<div nbCluster gap="xs">...</div>
<div nbCluster gap="sm">...</div>
<div nbCluster gap="md">...</div>
<div nbCluster gap="lg">...</div>
<div nbCluster gap="xl">...</div>
<div nbCluster gap="2xl">...</div>`;

  protected readonly gaps = [
    { value: 'none', label: 'none' },
    { value: 'xs', label: 'xs' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md' },
    { value: 'lg', label: 'lg' },
    { value: 'xl', label: 'xl' },
    { value: '2xl', label: '2xl' },
  ] satisfies readonly ClusterGapDemo[];
}
