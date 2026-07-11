import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbInput, NbLabel } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-label-with-input',
  imports: [NbInput, NbLabel, DocsExample],
  template: `
    <section id="with-input">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With Input
      </h2>
      <docs-example [code]="withInputExampleCode">
        <div class="flex flex-col gap-2">
          <label nbLabel for="email">Email</label>
          <input
            nbInput
            id="email"
            type="email"
            placeholder="m@example.com"
            class="w-75"
          />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelWithInput {
  protected readonly withInputExampleCode = `<div class="flex flex-col gap-2">
  <label nbLabel for="email">Email</label>
  <input nbInput id="email" type="email" placeholder="m@example.com" class="w-75" />
</div>`;
}
