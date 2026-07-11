import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbInput } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-preview',
  imports: [NbInput, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <input nbInput aria-label="Email" placeholder="Email" class="w-75" />
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPreview {
  protected readonly defaultExampleCode = `<input nbInput placeholder="Email" class="w-75" />`;
}
