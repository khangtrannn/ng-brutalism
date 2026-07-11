import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCheckbox } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-checkbox-preview',
  imports: [DocsExample, NbCheckbox],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <input type="checkbox" nbCheckbox aria-label="Demo checkbox" />
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPreview {
  protected readonly defaultExampleCode = `<input type="checkbox" nbCheckbox />`;
}
