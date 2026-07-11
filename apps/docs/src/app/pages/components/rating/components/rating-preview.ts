import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbRating } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-rating-preview',
  imports: [NbRating, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="flex flex-col gap-3 p-4">
          <nb-rating [value]="4.8" [count]="312" />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPreview {
  protected readonly defaultExampleCode = `<nb-rating [value]="4.8" [count]="312" />`;
}
