import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbProgress } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-progress-preview',
  imports: [NbProgress, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="flex w-full flex-col gap-4 p-4">
          <nb-progress [value]="68" label="Campaign progress" />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPreview {
  protected readonly defaultExampleCode = `<nb-progress [value]="68" label="Campaign progress" />`;
}
