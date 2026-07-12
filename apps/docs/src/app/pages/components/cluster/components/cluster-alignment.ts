import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCluster, NbSurface, type NbClusterAlign } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface ClusterAlignDemo {
  readonly value: NbClusterAlign;
  readonly label: string;
}

@Component({
  selector: 'docs-cluster-alignment',
  imports: [DocsExample, NbCluster, NbSurface],
  template: `
    <section id="alignment">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Alignment</h2>
      <docs-example [code]="alignmentExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          @for (align of alignments; track align.value) {
            <div nbSurface tone="cream" shadow="sm" class="p-4">
              <span class="font-mono text-xs font-bold uppercase mb-2">{{
                align.label
              }}</span>

              <div nbCluster gap="sm" [align]="align.value">
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-2 font-black"
                  >Small</span
                >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-mint) px-4 py-5 font-black"
                  >Tall</span
                >
              </div>
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterAlignment {
  protected readonly alignmentExampleCode = `<div nbCluster align="start">...</div>
<div nbCluster align="center">...</div>
<div nbCluster align="end">...</div>
<div nbCluster align="baseline">...</div>
<div nbCluster align="stretch">...</div>`;

  protected readonly alignments = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'baseline', label: 'baseline' },
    { value: 'stretch', label: 'stretch' },
  ] satisfies readonly ClusterAlignDemo[];
}
