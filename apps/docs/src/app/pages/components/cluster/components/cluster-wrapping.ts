import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCluster,
  NbSurface,
  type NbClusterWrap,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface ClusterWrapDemo {
  readonly value: NbClusterWrap;
  readonly label: string;
}

@Component({
  selector: 'docs-cluster-wrapping',
  imports: [DocsExample, NbButton, NbCluster, NbSurface],
  template: `
    <section id="wrapping">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Wrapping
      </h2>
      <p class="mb-4 font-medium">
        Cluster wraps by default so chunky buttons, chips, badges, and media
        items can survive narrow layouts. Switch to
        <code class="font-mono">wrap="nowrap"</code> for compact controls that
        must stay in a single row.
      </p>
      <docs-example [code]="wrappingExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
          @for (wrap of wraps; track wrap.value) {
          <div nbSurface tone="yellow" shadow="sm" class="max-w-88 p-4">
            <span class="font-mono text-xs font-bold uppercase mb-2">{{
              wrap.label
            }}</span>

            <div nbCluster gap="md" [wrap]="wrap.value">
              <button nbButton size="sm">Flight</button>
              <button nbButton size="sm" tone="secondary">Hotel</button>
              <button nbButton size="sm">Top pick</button>
            </div>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterWrapping {
  protected readonly wrappingExampleCode = `<div nbCluster gap="md">
  ...
</div>

<div nbCluster gap="md" wrap="nowrap">
  ...
</div>`;

  protected readonly wraps = [
    { value: 'wrap', label: 'wrap' },
    { value: 'nowrap', label: 'nowrap' },
  ] satisfies readonly ClusterWrapDemo[];
}
