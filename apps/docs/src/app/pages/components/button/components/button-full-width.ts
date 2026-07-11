import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-button-full-width',
  imports: [NbButton, DocsExample],
  template: `
    <section id="full-width">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Full width
      </h2>
      <docs-example [code]="fullWidthExampleCode">
        <div class="w-full max-w-md">
          <button nbButton [fullWidth]="true">Full width button</button>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFullWidth {
  protected readonly fullWidthExampleCode = `<div class="w-full max-w-md">
  <button nbButton [fullWidth]="true">
    Full width button
  </button>
</div>`;
}
