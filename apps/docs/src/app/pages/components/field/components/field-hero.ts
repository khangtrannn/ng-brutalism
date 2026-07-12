import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

import { DocsSourceTile, DocsStatusBadge } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-field-hero',
  imports: [NbStat, NbSurface, DocsSourceTile, DocsStatusBadge],
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Neo-Brutalist Angular Field</p>
        <h1>Field</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          An accessibility-wiring primitive, not a visual one. Wrap a label, a
          control (<code class="font-mono">nbInput</code>,
          <code class="font-mono">nb-select</code>,
          <code class="font-mono">nbTextarea</code>...), an optional
          description, and an optional error message in
          <code class="font-mono">nb-field</code> and it generates ids and links
          them all together - label <code class="font-mono">for</code>/<code
            class="font-mono"
            >id</code
          >, <code class="font-mono">aria-describedby</code>,
          <code class="font-mono">aria-invalid</code>, and
          <code class="font-mono">aria-required</code> - automatically, reading
          state straight off the bound <code class="font-mono">NgControl</code>.
        </p>
      </div>

      <div class="mt-7 flex flex-wrap items-center gap-3">
        <docs-status-badge status="stable" />
        <div
          nbSurface
          tone="mint"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="FORM" label="Reactive Forms" />
        </div>
        <div
          nbSurface
          tone="pink"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="A11Y" label="Id wiring" />
        </div>

        <docs-source-tile
          href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/field"
        />
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldHero {}
