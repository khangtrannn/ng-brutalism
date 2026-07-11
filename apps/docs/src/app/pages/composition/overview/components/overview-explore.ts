import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbStack, NbStat, NbSurface } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-composition-overview-explore',
  imports: [NbStat, RouterLink, NbSurface, NbStack],
  template: `
    <section id="explore" nbStack gap="md" class="scroll-mt-32">
      <h2 data-docs-heading class="text-2xl font-bold">Explore the system</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <a
          nbSurface
          tone="yellow"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          routerLink="/composition/surface-and-section"
          class="items-start"
        >
          <nb-stat value="Surface &amp; Section" label="Panels and regions" />
        </a>
        <a
          nbSurface
          tone="mint"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          routerLink="/composition/stack-and-cluster"
          class="items-start"
        >
          <nb-stat
            value="Stack & Cluster"
            label="Vertical and horizontal flow"
          />
        </a>
        <a
          nbSurface
          tone="pink"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          routerLink="/composition/split-layouts"
          class="items-start"
        >
          <nb-stat value="Split Layouts" label="Main / aside patterns" />
        </a>
        <a
          nbSurface
          tone="lavender"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          routerLink="/composition/common-patterns"
          class="items-start"
        >
          <nb-stat value="Common Patterns" label="Copy-pasteable recipes" />
        </a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionOverviewExplore {}
