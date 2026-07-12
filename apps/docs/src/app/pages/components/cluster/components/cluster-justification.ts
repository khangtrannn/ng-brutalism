import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCluster, NbSurface, type NbClusterJustify } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface ClusterJustifyDemo {
  readonly value: NbClusterJustify;
  readonly label: string;
}

@Component({
  selector: 'docs-cluster-justification',
  imports: [DocsExample, NbCluster, NbSurface],
  template: `
    <section id="justification">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Justification
      </h2>
      <docs-example [code]="justificationExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          @for (justify of justifications; track justify.value) {
            <div nbSurface tone="white" shadow="sm" class="p-4">
              <span class="font-mono text-xs font-bold uppercase mb-2">{{
                justify.label
              }}</span>

              <div
                nbCluster
                gap="sm"
                [justify]="justify.value"
                class="min-h-24"
              >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-2 font-black"
                  >One</span
                >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-blue) px-3 py-2 font-black"
                  >Two</span
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
export class ClusterJustification {
  protected readonly justificationExampleCode = `<div nbCluster justify="start">...</div>
<div nbCluster justify="center">...</div>
<div nbCluster justify="end">...</div>
<div nbCluster justify="between">...</div>`;

  protected readonly justifications = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'between', label: 'between' },
  ] satisfies readonly ClusterJustifyDemo[];
}
