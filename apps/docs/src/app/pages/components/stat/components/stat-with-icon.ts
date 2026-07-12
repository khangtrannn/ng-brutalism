import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-stat-with-icon',
  imports: [NbStat, DocsExample],
  template: `
    <section id="with-icon">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">With icon</h2>
      <p class="mb-4 font-medium">
        Project any element into the
        <code class="font-mono">slot="icon"</code>
        slot to prepend it to the stat.
      </p>
      <docs-example [code]="withIconCode">
        <div class="flex items-center gap-8 p-4">
          <nb-stat value="4.9" label="rating">
            <span slot="icon" class="text-xl" aria-hidden="true">★</span>
          </nb-stat>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatWithIcon {
  protected readonly withIconCode = `<nb-stat value="4.9" label="rating">
  <span slot="icon" aria-hidden="true">★</span>
</nb-stat>`;
}
