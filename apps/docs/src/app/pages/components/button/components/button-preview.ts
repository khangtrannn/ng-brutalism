import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-button-preview',
  imports: [NbButton, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <button nbButton>Button</button>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPreview {
  protected readonly defaultExampleCode = `<button nbButton>
  Button
</button>`;
}
