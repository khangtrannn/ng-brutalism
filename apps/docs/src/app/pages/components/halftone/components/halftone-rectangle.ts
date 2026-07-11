import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbHalftone } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-halftone-rectangle',
  imports: [NbHalftone, DocsExample],
  template: `
    <section id="rectangle">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Rectangle
      </h2>
      <p class="mb-4 max-w-3xl font-medium">
        Use rectangle halftone as a decorative strip behind headings, badges,
        image cards, recipe accents, and banner edges. Rows and columns give
        you a predictable dot count, while size and gap inputs tune the visual
        rhythm.
      </p>

      <docs-example [code]="rectangleExampleCode">
        <div
          class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <div
            nbHalftone
            shape="rectangle"
            [rows]="3"
            [columns]="13"
            class="mb-5"
          ></div>
          <p class="font-bold text-lg">Graphic strip accent</p>
          <p class="font-medium text-sm mt-1">
            A rectangular dot matrix with a predictable 3 by 13 count.
          </p>
        </div>
      </docs-example>

      <docs-example [code]="customRectangleExampleCode">
        <div
          class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <div
            nbHalftone
            shape="rectangle"
            [rows]="3"
            [columns]="13"
            [size]="8"
            [gapX]="28"
            [gapY]="27"
          ></div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalftoneRectangle {
  protected readonly rectangleExampleCode = `<div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <div
    nbHalftone
    shape="rectangle"
    [rows]="3"
    [columns]="13"
    class="mb-5"
  ></div>
  <p class="font-bold text-lg">Graphic strip accent</p>
  <p class="font-medium text-sm mt-1">
    A rectangular dot matrix with a predictable 3 by 13 count.
  </p>
</div>`;

  protected readonly customRectangleExampleCode = `<div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <div
    nbHalftone
    shape="rectangle"
    [rows]="3"
    [columns]="13"
    [size]="8"
    [gapX]="28"
    [gapY]="27"
  ></div>
</div>`;
}
