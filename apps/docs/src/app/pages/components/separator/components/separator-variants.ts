import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSeparator } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-separator-variants',
  imports: [NbSeparator, DocsExample],
  template: `
    <section id="variants">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Variants</h2>
      <docs-example [code]="variantsExampleCode">
        <div class="flex w-full flex-col gap-6 p-4">
          <div class="w-full">
            <p
              class="mb-3 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              variant="solid" (default)
            </p>
            <hr nbSeparator />
          </div>
          <div class="w-full">
            <p
              class="mb-3 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              variant="dashed"
            </p>
            <hr nbSeparator variant="dashed" />
          </div>
          <div class="w-full">
            <p
              class="mb-3 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              variant="thick"
            </p>
            <hr nbSeparator variant="thick" />
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorVariants {
  protected readonly variantsExampleCode = `<hr nbSeparator />
<hr nbSeparator variant="dashed" />
<hr nbSeparator variant="thick" />`;
}
