import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTextarea } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-textarea-disabled',
  imports: [NbTextarea, DocsExample],
  template: `
    <section id="disabled">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
      <docs-example [code]="disabledExampleCode">
        <textarea
          nbTextarea
          placeholder="Disabled"
          class="w-75"
          disabled
        ></textarea>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaDisabled {
  protected readonly disabledExampleCode = `<textarea nbTextarea placeholder="Disabled" class="w-75" disabled></textarea>`;
}
