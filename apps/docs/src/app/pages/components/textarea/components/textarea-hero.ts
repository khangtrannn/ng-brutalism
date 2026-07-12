import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

import { DocsSourceTile, DocsStatusBadge } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-textarea-hero',
  imports: [NbStat, NbSurface, DocsSourceTile, DocsStatusBadge],
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Neo-Brutalist Angular Textarea</p>
        <h1>Textarea</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          The neo-brutalist Angular Textarea component. A multi-line text input
          with hard borders, offset shadow, and strong focus states matching the
          brutalist style.
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
          <nb-stat value="3" label="Sizes" />
        </div>
        <div
          nbSurface
          tone="mint"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="FORM" label="Native" />
        </div>
        <div
          nbSurface
          tone="pink"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="A11y" label="Label sync" />
        </div>

        <docs-source-tile
          href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/textarea"
        />
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaHero {}
