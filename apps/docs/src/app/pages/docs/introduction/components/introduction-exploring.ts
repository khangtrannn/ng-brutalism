import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-introduction-exploring',
  imports: [NbStat, NbSurface, RouterLink],
  template: `
    <section id="components">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Start exploring
      </h2>
      <p class="mb-5 text-base font-medium">
        Start with the composition grammar, then move into setup and
        individual primitives.
      </p>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          nbSurface
          tone="cream"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          routerLink="/composition/overview"
          class="items-start"
        >
          <nb-stat
            value="Composition Overview"
            label="Mental model & decision guide"
          />
        </a>
        <a
          nbSurface
          tone="cream"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          routerLink="/composition/surface-and-section"
          class="items-start"
        >
          <nb-stat value="Surface & Section" label="Panels and regions" />
        </a>
        <a
          nbSurface
          tone="cream"
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
          tone="cream"
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
          tone="cream"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          class="items-start"
          routerLink="/composition/common-patterns"
        >
          <nb-stat
            value="Common Patterns"
            label="Copy-pasteable compositions"
          />
        </a>
        <a
          nbSurface
          tone="cream"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          class="items-start"
          routerLink="/docs/installation"
        >
          <nb-stat value="Installation" label="Package, styles, tokens" />
        </a>
        <a
          nbSurface
          tone="cream"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          class="items-start"
          routerLink="/components/button"
        >
          <nb-stat value="Button" label="High-impact actions" />
        </a>
        <a
          nbSurface
          tone="cream"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          class="items-start"
          routerLink="/components/input"
        >
          <nb-stat value="Input" label="Sharp form fields" />
        </a>
        <a
          nbSurface
          tone="cream"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          class="items-start"
          routerLink="/components/dialog"
        >
          <nb-stat value="Dialog" label="Native modal flow" />
        </a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionExploring {}
