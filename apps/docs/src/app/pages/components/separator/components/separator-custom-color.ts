import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSeparator } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-separator-custom-color',
  imports: [NbSeparator, DocsExample],
  template: `
    <section id="custom-color">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Custom Color
      </h2>
      <p class="mb-4 font-medium">
        Override <code class="font-mono">--nb-separator-border-color</code> inline to
        use any color without touching the global theme.
      </p>
      <docs-example [code]="customColorExampleCode">
        <div class="flex w-full flex-col gap-4 p-4">
          <hr nbSeparator style="--nb-separator-border-color: #ff90e8" />
          <hr
            nbSeparator
            variant="thick"
            style="--nb-separator-border-color: #8ae9ff"
          />
          <hr
            nbSeparator
            variant="dashed"
            style="--nb-separator-border-color: #c8a2ff"
          />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorCustomColor {
  protected readonly customColorExampleCode = `<hr nbSeparator style="--nb-separator-border-color: #ff90e8" />
<hr nbSeparator variant="thick" style="--nb-separator-border-color: #8ae9ff" />
<hr nbSeparator variant="dashed" style="--nb-separator-border-color: #c8a2ff" />`;
}
