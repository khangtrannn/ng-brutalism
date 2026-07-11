import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbRating } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-rating-with-count',
  imports: [NbRating, DocsExample],
  template: `
    <section id="with-count">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With review count
      </h2>
      <docs-example [code]="withCountCode">
        <div class="flex flex-col gap-3 p-4">
          <nb-rating [value]="4.5" [count]="1204" />
          <nb-rating [value]="3.8" [count]="87" />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingWithCount {
  protected readonly withCountCode = `<nb-rating [value]="4.5" [count]="1204" />
<nb-rating [value]="3.8" [count]="87" />`;
}
