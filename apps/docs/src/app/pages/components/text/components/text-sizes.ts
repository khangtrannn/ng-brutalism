import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbText, type NbTextSize } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface TextSizeDemo {
  readonly value: NbTextSize;
  readonly label: string;
  readonly px: string;
}

@Component({
  selector: 'docs-text-sizes',
  imports: [NbStack, NbText, DocsExample],
  template: `
    <section id="sizes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
      <docs-example [code]="sizesCode">
        <div class="p-6 w-full" nbStack gap="md">
          @for (s of sizes; track s.value) {
          <div class="flex items-baseline gap-4">
            <span
              class="w-10 font-mono text-xs font-bold text-right opacity-50 shrink-0"
              >{{ s.value }}</span
            >
            <span nbText [size]="s.value" weight="medium">
              The quick brown fox - {{ s.px }}
            </span>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSizes {
  protected readonly sizesCode = `<span nbText size="xs">The quick brown fox - 0.75rem</span>
<span nbText size="sm">The quick brown fox - 0.875rem</span>
<span nbText size="md">The quick brown fox - 1rem</span>
<span nbText size="lg">The quick brown fox - 1.125rem</span>
<span nbText size="xl">The quick brown fox - 1.25rem</span>`;

  protected readonly sizes = [
    { value: 'xs', label: 'xs', px: '0.75rem / 12px' },
    { value: 'sm', label: 'sm', px: '0.875rem / 14px' },
    { value: 'md', label: 'md', px: '1rem / 16px' },
    { value: 'lg', label: 'lg', px: '1.125rem / 18px' },
    { value: 'xl', label: 'xl', px: '1.25rem / 20px' },
  ] satisfies readonly TextSizeDemo[];
}
