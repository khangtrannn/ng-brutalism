import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

import { DocsSourceTile, DocsStatusBadge } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-chip-hero',
  imports: [NbStat, NbSurface, DocsSourceTile, DocsStatusBadge],
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Neo-Brutalist Angular Chip</p>
        <h1>Chip</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          A directive on <code class="font-mono">&lt;span&gt;</code> for compact
          labels, tags, and categories. Pairs with
          <code class="font-mono">nbChipGroup</code>
          for horizontal chip rows. Supports 10 tones and an optional leading
          icon via
          <code class="font-mono">ng-content</code>.
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
          <nb-stat value="span" label="Host element" />
        </div>
        <div
          nbSurface
          tone="mint"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="10" label="Tones" />
        </div>

        <docs-source-tile
          href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/chip"
        />
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipHero {}
