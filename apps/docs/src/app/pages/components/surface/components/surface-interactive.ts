import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-surface-interactive',
  imports: [NbStat, NbSurface, DocsExample],
  template: `
    <section id="interactive">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Interactive
      </h2>
      <p class="mb-4 font-medium">
        Add the boolean <code class="font-mono">interactive</code> input when a
        surface is clickable (a link or a custom button). It adds a pointer
        cursor, lifts the surface with a bigger shadow on hover, presses it into
        a smaller shadow on click, and resets anchor underline/color so the
        surface owns the look instead of the browser default.
      </p>
      <docs-example [code]="interactiveExampleCode">
        <a
          nbSurface
          tone="yellow"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          href="#interactive"
          class="items-start"
        >
          <nb-stat value="Click" label="Try me" />
        </a>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceInteractive {
  protected readonly interactiveExampleCode = `<a
  nbSurface
  tone="yellow"
  border="strong"
  padding="sm"
  layout="stack"
  interactive
  routerLink="/docs/installation"
>
  <nb-stat value="Click" label="Try me" />
</a>`;
}
