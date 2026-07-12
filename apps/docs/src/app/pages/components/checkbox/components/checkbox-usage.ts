import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-checkbox-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxUsage {
  protected readonly importCode = `import { NbCheckbox } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<input type="checkbox" nbCheckbox />`;
}
