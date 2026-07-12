import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbInput, NbInputGroup, NbInputPrefix } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-group-disabled',
  imports: [NbInput, NbInputGroup, NbInputPrefix, DocsExample],
  template: `
    <section id="disabled">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
      <docs-example [code]="disabledExampleCode">
        <nb-input-group class="max-w-80">
          <span nbInputPrefix>@</span>
          <input nbInput placeholder="username" disabled />
        </nb-input-group>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupDisabled {
  protected readonly disabledExampleCode = `<nb-input-group class="max-w-80">
  <span nbInputPrefix>@</span>
  <input nbInput placeholder="username" disabled />
</nb-input-group>`;
}
