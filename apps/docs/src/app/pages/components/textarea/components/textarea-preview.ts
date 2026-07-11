import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTextarea } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-textarea-preview',
  imports: [NbTextarea, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <textarea
          nbTextarea
          placeholder="Write something..."
          class="w-75"
        ></textarea>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaPreview {
  protected readonly defaultExampleCode = `<textarea nbTextarea placeholder="Write something..." class="w-75"></textarea>`;
}
