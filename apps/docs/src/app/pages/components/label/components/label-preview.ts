import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCheckbox, NbLabel } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-label-preview',
  imports: [NbCheckbox, NbLabel, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="flex items-center gap-2">
          <input type="checkbox" nbCheckbox id="accept-terms" />
          <label nbLabel for="accept-terms">Accept terms and conditions</label>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelPreview {
  protected readonly defaultExampleCode = `<div class="flex items-center gap-2">
  <input type="checkbox" nbCheckbox id="accept-terms" />
  <label nbLabel for="accept-terms">Accept terms and conditions</label>
</div>`;
}
