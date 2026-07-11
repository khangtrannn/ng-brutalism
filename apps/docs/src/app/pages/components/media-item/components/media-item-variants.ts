import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMediaItem, type NbMediaItemVariant } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface VariantDemo {
  readonly value: NbMediaItemVariant;
  readonly label: string;
  readonly description: string;
}

@Component({
  selector: 'docs-media-item-variants',
  imports: [NbMediaItem, DocsExample],
  template: `
    <section id="variants">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Variants
      </h2>
      <docs-example [code]="variantsExampleCode">
        <div class="flex flex-col divide-y-2 divide-(--nb-border) p-4">
          @for (variant of variants; track variant.value) {
          <div class="py-5 first:pt-0 last:pb-0">
            <div class="mb-3 flex items-baseline gap-3">
              <span class="font-black uppercase">{{ variant.label }}</span>
              <span class="text-sm font-medium opacity-60">{{
                variant.description
              }}</span>
            </div>
            <nb-media-item
              [variant]="variant.value"
              size="md"
              tone="yellow"
              icon="/icons/star.png"
              iconAlt="Star"
              title="Premium Access"
              description="Unlimited features"
            />
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemVariants {
  protected readonly variantsExampleCode = `<nb-media-item
  variant="plain"
  size="md"
  icon="/icons/star.png"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/>

<nb-media-item
  variant="boxed"
  size="md"
  tone="yellow"
  icon="/icons/star.png"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/>

<nb-media-item
  variant="chip"
  size="md"
  tone="yellow"
  icon="/icons/star.png"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/}`;

  protected readonly variants = [
    {
      value: 'plain',
      label: 'Plain',
      description: 'No container - just gap, icon size, and typography',
    },
    {
      value: 'boxed',
      label: 'Boxed',
      description: 'Hard border with offset shadow and tone fill',
    },
    {
      value: 'chip',
      label: 'Chip',
      description: 'Fully-rounded pill - great for status or tags',
    },
  ] satisfies readonly VariantDemo[];
}
