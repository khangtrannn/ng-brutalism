import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCheckbox } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-checkbox-disabled',
  imports: [DocsExample, NbCheckbox],
  template: `
    <section id="disabled">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Disabled
      </h2>
      <docs-example [code]="disabledExampleCode">
        <div class="flex items-center gap-4">
          <input
            type="checkbox"
            nbCheckbox
            disabled
            aria-label="Disabled unchecked checkbox"
          />
          <input
            type="checkbox"
            nbCheckbox
            disabled
            checked
            aria-label="Disabled checked checkbox"
          />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxDisabled {
  protected readonly disabledExampleCode = `<div class="flex items-center gap-4">
  <input type="checkbox" nbCheckbox disabled />
  <input type="checkbox" nbCheckbox disabled checked />
</div>`;
}
