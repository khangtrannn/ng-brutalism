import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

import { DocsSourceTile, DocsStatusBadge } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-image-card-hero',
  imports: [NbStat, NbSurface, DocsSourceTile, DocsStatusBadge],
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Neo-Brutalist Angular Image Card</p>
        <h1>Image Card</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          The neo-brutalist Angular Image Card component. A media card with
          thick borders and offset shadow, optimized for displaying images with
          captions.
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
          <nb-stat value="2" label="Inputs" />
        </div>
        <div
          nbSurface
          tone="mint"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="A11y" label="Alt + caption" />
        </div>
        <div
          nbSurface
          tone="pink"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="IMG" label="Optimized" />
        </div>

        <docs-source-tile
          href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/image-card"
        />
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardHero {}
