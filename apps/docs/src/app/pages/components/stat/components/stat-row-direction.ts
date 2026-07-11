import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-stat-row-direction',
  imports: [NbStat, DocsExample],
  template: `
    <section id="row-direction">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Row direction
      </h2>
      <docs-example [code]="rowDirectionCode">
        <div class="flex flex-col gap-3 p-4">
          <nb-stat value="98%" label="satisfaction" direction="row" />
          <nb-stat value="12K" label="downloads" direction="row" />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatRowDirection {
  protected readonly rowDirectionCode = `<nb-stat value="98%" label="satisfaction" direction="row" />
<nb-stat value="12K" label="downloads" direction="row" />`;
}
