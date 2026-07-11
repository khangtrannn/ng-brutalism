import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCheckbox, NbLabel } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-label-disabled-control',
  imports: [NbCheckbox, NbLabel, DocsExample],
  template: `
    <section id="disabled-control">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Disabled Control
      </h2>
      <docs-example [code]="disabledControlExampleCode">
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            nbCheckbox
            id="disabled-terms"
            class="peer"
            disabled
          />
          <label nbLabel for="disabled-terms"
            >Accept terms and conditions</label
          >
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelDisabledControl {
  protected readonly disabledControlExampleCode = `<div class="flex items-center gap-2">
  <input
    type="checkbox"
    nbCheckbox
    id="disabled-terms"
    class="peer"
    disabled
  />
  <label nbLabel for="disabled-terms">Accept terms and conditions</label>
</div>`;
}
