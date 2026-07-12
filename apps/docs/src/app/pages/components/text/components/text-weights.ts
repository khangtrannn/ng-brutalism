import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbText, type NbTextWeight } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface TextWeightDemo {
  readonly value: NbTextWeight;
  readonly numeric: string;
}

@Component({
  selector: 'docs-text-weights',
  imports: [NbStack, NbText, DocsExample],
  template: `
    <section id="weights">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Weights</h2>
      <docs-example [code]="weightsCode">
        <div class="p-6 w-full" nbStack gap="md">
          @for (w of weights; track w.value) {
            <div class="flex items-baseline gap-4">
              <span
                class="w-20 font-mono text-xs font-bold text-right opacity-50 shrink-0"
                >{{ w.value }}</span
              >
              <span nbText size="lg" [weight]="w.value">
                Build loud. Stay sharp.
              </span>
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextWeights {
  protected readonly weightsCode = `<span nbText size="lg" weight="normal">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="medium">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="semibold">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="bold">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="extrabold">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="black">Build loud. Stay sharp.</span>`;

  protected readonly weights = [
    { value: 'normal', numeric: '400' },
    { value: 'medium', numeric: '500' },
    { value: 'semibold', numeric: '600' },
    { value: 'bold', numeric: '700' },
    { value: 'extrabold', numeric: '800' },
    { value: 'black', numeric: '900' },
  ] satisfies readonly TextWeightDemo[];
}
