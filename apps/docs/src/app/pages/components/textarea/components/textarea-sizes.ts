import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTextarea } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-textarea-sizes',
  imports: [NbTextarea, DocsExample],
  template: `
    <section id="sizes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
      <docs-example [code]="sizesExampleCode">
        <div class="flex flex-col items-center gap-4">
          <textarea
            nbTextarea
            size="sm"
            placeholder="Small"
            class="w-75"
          ></textarea>
          <textarea nbTextarea placeholder="Default" class="w-75"></textarea>
          <textarea
            nbTextarea
            size="lg"
            placeholder="Large"
            class="w-75"
          ></textarea>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaSizes {
  protected readonly sizesExampleCode = `<div class="flex flex-col items-center gap-4">
  <textarea nbTextarea size="sm" placeholder="Small" class="w-75"></textarea>
  <textarea nbTextarea placeholder="Default" class="w-75"></textarea>
  <textarea nbTextarea size="lg" placeholder="Large" class="w-75"></textarea>
</div>`;
}
