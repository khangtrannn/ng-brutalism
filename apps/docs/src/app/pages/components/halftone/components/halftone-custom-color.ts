import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbHalftone } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-halftone-custom-color',
  imports: [NbHalftone, DocsExample],
  template: `
    <section id="custom-color">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Custom Color & Positioning
      </h2>
      <docs-example [code]="customColorCode">
        <div
          class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          style="min-height: 140px;"
        >
          <div nbHalftone color="#ff90e8" class="absolute top-0 right-0"></div>
          <div
            nbHalftone
            color="#8ae9ff"
            class="absolute bottom-0 left-0"
          ></div>
          <p class="font-bold">Custom dot colors</p>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalftoneCustomColor {
  protected readonly customColorCode = `<div
  class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
  style="min-height: 140px;"
>
  <div nbHalftone color="#ff90e8" class="absolute top-0 right-0"></div>
  <div nbHalftone color="#8ae9ff" class="absolute bottom-0 left-0"></div>
  <p class="font-bold">Custom dot colors</p>
</div>`;
}
