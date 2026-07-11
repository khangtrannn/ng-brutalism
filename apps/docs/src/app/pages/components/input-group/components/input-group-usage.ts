import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-group-usage',
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
export class InputGroupUsage {
  protected readonly importCode = `import { NbInput, NbInputGroup, NbInputPrefix, NbInputSuffix } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-input-group class="max-w-80">
  <span nbInputPrefix>@</span>
  <input nbInput placeholder="username" />
</nb-input-group>`;
}
