import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbInput } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-sizes',
  imports: [NbInput, DocsExample],
  template: `
    <section id="sizes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
      <docs-example [code]="sizesExampleCode">
        <div class="flex flex-col items-center gap-4">
          <input nbInput size="sm" placeholder="Small" class="w-75" />
          <input nbInput placeholder="Default" class="w-75" />
          <input nbInput size="lg" placeholder="Large" class="w-75" />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSizes {
  protected readonly sizesExampleCode = `<div class="flex flex-col items-center gap-4">
  <input nbInput size="sm" placeholder="Small" class="w-75" />
  <input nbInput placeholder="Default" class="w-75" />
  <input nbInput size="lg" placeholder="Large" class="w-75" />
</div>`;
}
