import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbInput } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-with-button',
  imports: [NbButton, NbInput, DocsExample],
  template: `
    <section id="with-button">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With Button
      </h2>
      <docs-example [code]="withButtonExampleCode">
        <div class="flex gap-2">
          <input nbInput placeholder="Email" class="w-75" />
          <button nbButton tone="yellow">Subscribe</button>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputWithButton {
  protected readonly withButtonExampleCode = `<div class="flex gap-2">
  <input nbInput placeholder="Email" class="w-75" />
  <button nbButton>Subscribe</button>
</div>`;
}
