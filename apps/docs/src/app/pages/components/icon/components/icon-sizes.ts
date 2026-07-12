import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbIcon, type NbIconSize } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface IconSizeDemo {
  readonly value: NbIconSize;
  readonly px: string;
}

@Component({
  selector: 'docs-icon-sizes',
  imports: [NbIcon, DocsExample],
  template: `
    <section id="sizes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
      <docs-example [code]="sizesCode">
        <div class="flex flex-wrap items-end gap-6 p-6">
          @for (s of sizes; track s.value) {
            <div class="flex flex-col items-center gap-2">
              <span
                nbIcon
                src="/tokyo-city-escape/nb-plane-fill.svg"
                [size]="s.value"
                decorative
              ></span>
              <span class="font-mono text-xs font-bold opacity-50">{{
                s.value
              }}</span>
              <span class="font-mono text-xs opacity-40">{{ s.px }}</span>
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSizes {
  protected readonly sizesCode = `<span nbIcon src="/icons/plane.svg" size="xs" decorative></span>
<span nbIcon src="/icons/plane.svg" size="sm" decorative></span>
<span nbIcon src="/icons/plane.svg" size="md" decorative></span>
<span nbIcon src="/icons/plane.svg" size="lg" decorative></span>
<span nbIcon src="/icons/plane.svg" size="xl" decorative></span>`;

  protected readonly sizes = [
    { value: 'xs', px: '0.75rem' },
    { value: 'sm', px: '1rem' },
    { value: 'md', px: '1.25rem' },
    { value: 'lg', px: '1.5rem' },
    { value: 'xl', px: '2rem' },
  ] satisfies readonly IconSizeDemo[];
}
