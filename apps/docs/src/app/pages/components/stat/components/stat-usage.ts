import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-stat-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <docs-code-block
        class="block mb-5"
        title="Import"
        [code]="importCode"
      />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatUsage {
  protected readonly importCode = `import { NbStat } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-stat value="$29" label="per month" />
<nb-stat value="4.8★" label="rating" />
<nb-stat value="142" label="backed" />`;
}
