import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCheckbox } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-checkbox-sizes',
  imports: [DocsExample, NbCheckbox],
  template: `
    <section id="sizes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
      <docs-example [code]="sizesExampleCode">
        <div class="flex items-center gap-4">
          <input
            type="checkbox"
            nbCheckbox
            size="sm"
            aria-label="Small checkbox"
          />
          <input type="checkbox" nbCheckbox aria-label="Default checkbox" />
          <input
            type="checkbox"
            nbCheckbox
            size="lg"
            aria-label="Large checkbox"
          />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxSizes {
  protected readonly sizesExampleCode = `<div class="flex items-center gap-4">
  <input type="checkbox" nbCheckbox size="sm" />
  <input type="checkbox" nbCheckbox />
  <input type="checkbox" nbCheckbox size="lg" />
</div>`;
}
