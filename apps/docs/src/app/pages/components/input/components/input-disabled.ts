import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbInput } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-disabled',
  imports: [NbInput, DocsExample],
  template: `
    <section id="disabled">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
      <docs-example [code]="disabledExampleCode">
        <input
          nbInput
          aria-label="Email"
          placeholder="Email"
          class="w-75"
          disabled
        />
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDisabled {
  protected readonly disabledExampleCode = `<input nbInput placeholder="Email" class="w-75" disabled />`;
}
