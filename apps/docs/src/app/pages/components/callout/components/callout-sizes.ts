import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout, type NbCalloutSize } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface CalloutSizeDemo {
  readonly value: NbCalloutSize;
  readonly sample: string;
}

@Component({
  selector: 'docs-callout-sizes',
  imports: [NbCallout, DocsExample],
  template: `
    <section id="sizes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
      <docs-example [code]="sizesExampleCode">
        <div class="flex w-full flex-col items-start gap-4 p-4">
          @for (size of sizes; track size.value) {
          <div nbCallout tone="yellow" [size]="size.value">
            {{ size.sample }}
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutSizes {
  protected readonly sizesExampleCode = `<div nbCallout size="sm">SM</div>
<div nbCallout size="md">MD</div>
<div nbCallout size="lg">LG</div>
<div nbCallout size="xl">XL</div>`;

  protected readonly sizes = [
    { value: 'sm', sample: 'SM $129' },
    { value: 'md', sample: 'MD 4.9' },
    { value: 'lg', sample: 'LG $420K' },
    { value: 'xl', sample: 'XL $799' },
  ] satisfies readonly CalloutSizeDemo[];
}
