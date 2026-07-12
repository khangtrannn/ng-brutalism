import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSeparator } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-separator-orientation',
  imports: [NbSeparator, DocsExample],
  template: `
    <section id="orientation">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Vertical</h2>
      <p class="mb-4 font-medium">
        Set <code class="font-mono">orientation="vertical"</code> to render a
        column divider. The separator stretches to fill the height of its flex
        container.
      </p>
      <docs-example [code]="verticalExampleCode">
        <div class="flex h-16 items-center gap-4 px-4">
          <span class="font-bold">Angular</span>
          <hr nbSeparator orientation="vertical" />
          <span class="font-bold">Brutalism</span>
          <hr nbSeparator orientation="vertical" variant="dashed" />
          <span class="font-bold">v0.2</span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorOrientation {
  protected readonly verticalExampleCode = `<div class="flex h-16 items-center gap-4">
  <span>Angular</span>
  <hr nbSeparator orientation="vertical" />
  <span>Brutalism</span>
  <hr nbSeparator orientation="vertical" variant="dashed" />
  <span>v0.2</span>
</div>`;
}
