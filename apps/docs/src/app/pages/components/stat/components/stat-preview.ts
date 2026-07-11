import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStat } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-stat-preview',
  imports: [NbStat, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="flex flex-wrap items-end gap-8 p-4">
          <nb-stat value="$29" label="per month" />
          <nb-stat value="4.8★" label="rating" />
          <nb-stat value="142" label="backed" />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatPreview {
  protected readonly defaultExampleCode = `<nb-stat value="$29" label="per month" />
<nb-stat value="4.8★" label="rating" />
<nb-stat value="142" label="backed" />`;
}
