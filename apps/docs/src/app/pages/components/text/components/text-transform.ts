import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbText, type NbTextTransform } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface TextTransformDemo {
  readonly value: NbTextTransform;
}

@Component({
  selector: 'docs-text-transform',
  imports: [NbStack, NbText, DocsExample],
  template: `
    <section id="transform">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Transform
      </h2>
      <docs-example [code]="transformCode">
        <div class="p-6 w-full" nbStack gap="md">
          @for (t of transforms; track t.value) {
          <div class="flex items-baseline gap-4">
            <span
              class="w-24 font-mono text-xs font-bold text-right opacity-50 shrink-0"
              >{{ t.value }}</span
            >
            <span nbText size="md" weight="bold" [transform]="t.value">
              Flight Included - Tokyo City Escape
            </span>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTransform {
  protected readonly transformCode = `<span nbText weight="bold" transform="none">Flight Included - Tokyo City Escape</span>
<span nbText weight="bold" transform="uppercase">Flight Included - Tokyo City Escape</span>
<span nbText weight="bold" transform="lowercase">Flight Included - Tokyo City Escape</span>
<span nbText weight="bold" transform="capitalize">Flight Included - Tokyo City Escape</span>`;

  protected readonly transforms = [
    { value: 'none' },
    { value: 'uppercase' },
    { value: 'lowercase' },
    { value: 'capitalize' },
  ] satisfies readonly TextTransformDemo[];
}
