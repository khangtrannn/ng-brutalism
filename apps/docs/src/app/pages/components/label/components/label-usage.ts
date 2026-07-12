import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-label-usage',
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
export class LabelUsage {
  protected readonly importCode = `import { NbCheckbox, NbLabel } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div class="flex items-center gap-2">
  <input type="checkbox" nbCheckbox id="accept-terms" />
  <label nbLabel for="accept-terms">Accept terms and conditions</label>
</div>`;
}
