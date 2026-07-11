import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbRating } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-rating-values',
  imports: [NbRating, DocsExample],
  template: `
    <section id="values">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Values</h2>
      <docs-example [code]="valuesCode">
        <div class="flex flex-col gap-4 p-4">
          <nb-rating [value]="5" />
          <nb-rating [value]="4.7" />
          <nb-rating [value]="3" />
          <nb-rating [value]="1.2" />
          <nb-rating [value]="0" />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingValues {
  protected readonly valuesCode = `<nb-rating [value]="5" />
<nb-rating [value]="4.7" />
<nb-rating [value]="3" />
<nb-rating [value]="1.2" />
<nb-rating [value]="0" />`;
}
