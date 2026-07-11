import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSeparator } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-separator-preview',
  imports: [NbSeparator, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="flex w-full flex-col gap-4 p-4">
          <p class="font-bold">Section A</p>
          <hr nbSeparator />
          <p class="font-bold">Section B</p>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorPreview {
  protected readonly defaultExampleCode = `<hr nbSeparator />`;
}
