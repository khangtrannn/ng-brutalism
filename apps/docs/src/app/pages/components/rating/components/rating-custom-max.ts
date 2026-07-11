import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbRating } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-rating-custom-max',
  imports: [NbRating, DocsExample],
  template: `
    <section id="custom-max">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Custom max
      </h2>
      <docs-example [code]="customMaxCode">
        <div class="p-4">
          <nb-rating [value]="7" [max]="10" />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingCustomMax {
  protected readonly customMaxCode = `<nb-rating [value]="7" [max]="10" />`;
}
