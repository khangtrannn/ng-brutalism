import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

import { DocsSourceTile, DocsStatusBadge } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-cluster-hero',
  imports: [NbStat, NbSurface, DocsSourceTile, DocsStatusBadge],
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Neo-Brutalist Angular Cluster</p>
        <h1>Cluster</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Use <code class="font-mono">nbCluster</code> whenever children should
          flow horizontally, align together, and wrap cleanly on smaller
          screens. It is the inline composition pair to
          <code class="font-mono">nbStack</code>.
        </p>
      </div>

      <div class="mt-7 flex flex-wrap items-center gap-3">
        <docs-status-badge status="stable" />
        <div
          nbSurface
          tone="yellow"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="7" label="Gaps" />
        </div>
        <div
          nbSurface
          tone="mint"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="5" label="Alignments" />
        </div>
        <div
          nbSurface
          tone="pink"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="Wrap" label="Default" />
        </div>
        <div
          nbSurface
          tone="lavender"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="4" label="Separators" />
        </div>

        <docs-source-tile
          href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/cluster"
        />
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterHero {}
