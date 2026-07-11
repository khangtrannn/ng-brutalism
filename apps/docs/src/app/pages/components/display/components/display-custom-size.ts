import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDisplay } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-display-custom-size',
  imports: [DocsExample, NbDisplay],
  template: `
    <section id="custom-size">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Custom Size
      </h2>
      <p class="mb-4 font-medium">
        Override <code class="font-mono">--nb-display-size</code> inline for
        any arbitrary value outside the 4 presets.
      </p>
      <docs-example [code]="customSizeExampleCode">
        <h2 nbDisplay class="uppercase" style="--nb-display-size: 2.25rem">
          $29/mo
        </h2>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayCustomSize {
  protected readonly customSizeExampleCode = `<h2 nbDisplay class="uppercase" style="--nb-display-size: 2.25rem">
  $29/mo
</h2>`;
}
