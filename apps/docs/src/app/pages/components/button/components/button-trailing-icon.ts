import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbButtonTrailingIcon, NbIcon } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-button-trailing-icon',
  imports: [NbButton, NbButtonTrailingIcon, NbIcon, DocsExample],
  template: `
    <section id="trailing-icon">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Trailing Icon
      </h2>
      <docs-example [code]="trailingIconExampleCode">
        <div class="grid w-full max-w-md gap-3">
          <button nbButton tone="secondary">
            Keep Together
            <span nbButtonTrailingIcon>
              <span
                nbIcon
                src="/tokyo-city-escape/nb-arrow-right.svg"
                size="sm"
                decorative
              ></span>
            </span>
          </button>

          <button nbButton tone="primary" [fullWidth]="true">
            Push To End
            <span nbButtonTrailingIcon push="end" shape="square" size="md">
              <span
                nbIcon
                src="/tokyo-city-escape/nb-arrow-right.svg"
                size="sm"
                decorative
              ></span>
            </span>
          </button>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonTrailingIcon {
  protected readonly trailingIconExampleCode = `<button nbButton tone="secondary">
  Keep Together
  <span nbButtonTrailingIcon>
    <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
  </span>
</button>

<button nbButton tone="primary" [fullWidth]="true">
  Push To End
  <span nbButtonTrailingIcon push="end" shape="square" size="md">
    <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
  </span>
</button>`;
}
