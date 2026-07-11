import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-button-disabled',
  imports: [NbButton, DocsExample],
  template: `
    <section id="disabled">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Disabled
      </h2>
      <docs-example [code]="disabledExampleCode">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button nbButton disabled>Disabled button</button>
          <a nbButton href="#" aria-disabled="true"> Disabled link style </a>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDisabled {
  protected readonly disabledExampleCode = `<div class="flex flex-wrap items-center justify-center gap-4">
  <button nbButton disabled>Disabled button</button>
  <a nbButton href="#" aria-disabled="true">Disabled link style</a>
</div>`;
}
