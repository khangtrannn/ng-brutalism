import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

import { DocsSourceTile, DocsStatusBadge } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-progress-hero',
  imports: [NbStat, NbSurface, DocsSourceTile, DocsStatusBadge],
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Neo-Brutalist Angular Progress</p>
        <h1>Progress</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          A progress bar component with ARIA progressbar semantics. Supports
          <code class="font-mono">value</code>,
          <code class="font-mono">max</code>, and 5 tones for different semantic
          contexts - from fundraising goals to media playback.
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
          <nb-stat value="A11y" label="ARIA progressbar" />
        </div>
        <div
          nbSurface
          tone="mint"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="5" label="Tones" />
        </div>

        <docs-source-tile
          href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/progress"
        />
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressHero {}
