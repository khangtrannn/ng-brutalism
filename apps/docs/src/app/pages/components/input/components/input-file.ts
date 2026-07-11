import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbInput } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-file',
  imports: [NbInput, DocsExample],
  template: `
    <section id="file">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">File</h2>
      <docs-example [code]="fileExampleCode">
        <input nbInput type="file" class="w-[250px]" />
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFile {
  protected readonly fileExampleCode = `<input nbInput type="file" class="w-[250px]" />`;
}
