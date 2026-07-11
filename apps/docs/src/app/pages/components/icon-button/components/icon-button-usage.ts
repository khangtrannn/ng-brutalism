import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-icon-button-usage',
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
export class IconButtonUsage {
  protected readonly importCode = `import { NbIconButton } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<button nbIconButton aria-label="Like">
  <svg ...>...</svg>
</button>
<button nbIconButton shape="circle" aria-label="Like">
  <svg ...>...</svg>
</button>
<button nbIconButton tone="danger" aria-label="Delete">
  <svg ...>...</svg>
</button>`;
}
