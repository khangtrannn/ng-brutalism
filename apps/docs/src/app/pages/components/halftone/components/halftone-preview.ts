import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbHalftone } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-halftone-preview',
  imports: [NbHalftone, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div
          class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          style="min-height: 140px;"
        >
          <div nbHalftone class="absolute bottom-0 right-0"></div>
          <p class="font-bold text-lg">Card with halftone</p>
          <p class="font-medium text-sm mt-1">
            Dot grid anchors to the bottom-right corner.
          </p>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalftonePreview {
  protected readonly defaultExampleCode = `<div
  class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
  style="min-height: 140px;"
>
  <div nbHalftone class="absolute bottom-0 right-0"></div>
  <p class="font-bold text-lg">Card with halftone</p>
  <p class="font-medium text-sm mt-1">Dot grid anchors to the bottom-right corner.</p>
</div>`;
}
