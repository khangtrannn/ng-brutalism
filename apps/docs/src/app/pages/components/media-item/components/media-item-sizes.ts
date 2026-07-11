import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMediaItem, type NbMediaItemSize } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SizeDemo {
  readonly value: NbMediaItemSize;
  readonly label: string;
}

@Component({
  selector: 'docs-media-item-sizes',
  imports: [NbMediaItem, DocsExample],
  template: `
    <section id="sizes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
      <docs-example [code]="sizesExampleCode">
        <div class="flex flex-col gap-4 p-4">
          @for (size of sizes; track size.value) {
          <nb-media-item
            variant="boxed"
            [size]="size.value"
            tone="cream"
            icon="/icons/baggage.png"
            iconAlt="Baggage"
            [title]="size.label + ' - Checked Baggage'"
            description="Up to 23kg included"
          />
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemSizes {
  protected readonly sizesExampleCode = `<nb-media-item
  variant="boxed"
  size="sm"
  tone="cream"
  icon="/icons/baggage.png"
  iconAlt="Baggage"
  title="SM - Checked Baggage"
  description="Up to 23kg included"
/>

<nb-media-item
  variant="boxed"
  size="md"
  tone="cream"
  icon="/icons/baggage.png"
  iconAlt="Baggage"
  title="MD - Checked Baggage"
  description="Up to 23kg included"
/>

<nb-media-item
  variant="boxed"
  size="lg"
  tone="cream"
  icon="/icons/baggage.png"
  iconAlt="Baggage"
  title="LG - Checked Baggage"
  description="Up to 23kg included"
/>`;

  protected readonly sizes = [
    { value: 'sm', label: 'SM' },
    { value: 'md', label: 'MD' },
    { value: 'lg', label: 'LG' },
  ] satisfies readonly SizeDemo[];
}
