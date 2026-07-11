import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCheckbox, NbLabel } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-checkbox-with-label',
  imports: [DocsExample, NbCheckbox, NbLabel],
  template: `
    <section id="with-label">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With Label
      </h2>
      <docs-example [code]="withLabelExampleCode">
        <div class="flex items-center gap-2">
          <input type="checkbox" nbCheckbox id="terms" />
          <label nbLabel for="terms">Accept terms and conditions</label>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxWithLabel {
  protected readonly withLabelExampleCode = `<div class="flex items-center gap-2">
  <input type="checkbox" nbCheckbox id="terms" />
  <label nbLabel for="terms">Accept terms and conditions</label>
</div>`;
}
