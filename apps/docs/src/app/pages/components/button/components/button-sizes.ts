import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-button-sizes',
  imports: [NbButton, DocsExample],
  template: `
    <section id="sizes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
      <docs-example [code]="sizesExampleCode">
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button nbButton size="sm">Small</button>
          <button nbButton size="md">Medium</button>
          <button nbButton size="lg">Large</button>
          <button nbButton size="xl">Extra Large</button>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSizes {
  protected readonly sizesExampleCode = `<div class="flex flex-wrap items-center justify-center gap-3">
  <button nbButton size="sm">Small</button>
  <button nbButton size="md">Medium</button>
  <button nbButton size="lg">Large</button>
  <button nbButton size="xl">Extra Large</button>
</div>`;
}
