import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-stack-responsive',
  imports: [DocsCodeBlock],
  template: `
    <section id="responsive">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Responsive Gap
      </h2>
      <p class="mb-4 font-medium">
        Stack keeps the API focused. For breakpoint changes, override the CSS
        variable with Tailwind arbitrary properties.
      </p>
      <docs-code-block [code]="responsiveExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackResponsive {
  protected readonly responsiveExampleCode = `<div
  nbStack
  gap="md"
  class="md:[--nb-stack-gap:1.5rem]"
>
  ...
</div>`;
}
