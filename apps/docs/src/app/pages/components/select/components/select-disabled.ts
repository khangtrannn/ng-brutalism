import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSelect, NbSelectOption } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-select-disabled',
  imports: [NbSelect, NbSelectOption, DocsExample],
  template: `
    <section id="disabled">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
      <docs-example [code]="disabledExampleCode">
        <div class="w-80">
          <nb-select placeholder="Select an option" disabled>
            <nb-select-option value="one" label="One">One</nb-select-option>
          </nb-select>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDisabled {
  protected readonly disabledExampleCode = `<div class="w-80">
  <nb-select placeholder="Select an option" disabled>
    <nb-select-option value="one" label="One">One</nb-select-option>
  </nb-select>
</div>`;
}
