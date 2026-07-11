import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDisplay } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-display-sizes',
  imports: [DocsExample, NbDisplay],
  template: `
    <section id="sizes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
      <docs-example [code]="sizesExampleCode">
        <div class="flex flex-col gap-6">
          <div>
            <p
              class="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              size="sm" - 2rem
            </p>
            <h2 nbDisplay size="sm" class="uppercase">PRO PLAN</h2>
          </div>
          <div>
            <p
              class="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              size="md" - 3rem
            </p>
            <h2 nbDisplay size="md" class="uppercase">INDIE CUP</h2>
          </div>
          <div>
            <p
              class="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              size="lg" - 3.75rem
            </p>
            <h2 nbDisplay size="lg" class="uppercase">NORA CHEN</h2>
          </div>
          <div>
            <p
              class="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              size="xl" - 5rem
            </p>
            <h2 nbDisplay size="xl" class="uppercase">GO</h2>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplaySizes {
  protected readonly sizesExampleCode = `<h2 nbDisplay size="sm" class="uppercase">PRO PLAN</h2>
<h2 nbDisplay size="md" class="uppercase">INDIE CUP</h2>
<h2 nbDisplay size="lg" class="uppercase">NORA CHEN</h2>
<h2 nbDisplay size="xl" class="uppercase">GO</h2>`;
}
