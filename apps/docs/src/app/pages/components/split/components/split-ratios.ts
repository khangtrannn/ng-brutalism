import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSplit, NbSurface, type NbSplitRatio } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SplitRatioDemo {
  readonly value: NbSplitRatio;
  readonly label: string;
}

@Component({
  selector: 'docs-split-ratios',
  imports: [NbSplit, NbSurface, DocsExample],
  template: `
    <section id="ratios">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Ratios</h2>
      <docs-example [code]="ratiosExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4">
          @for (ratio of ratios; track ratio.value) {
          <div nbSurface shadow="sm" class="p-3">
            <div nbSplit [ratio]="ratio.value" gap="sm" collapse="none">
              <span
                class="border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-4 text-center font-mono text-xs font-black uppercase"
                >{{ ratio.label }} main</span
              >
              <span
                class="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-4 text-center font-mono text-xs font-black uppercase"
                >Aside</span
              >
            </div>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitRatios {
  protected readonly ratiosExampleCode = `<div nbSplit ratio="1:1">...</div>
<div nbSplit ratio="2:1">...</div>
<div nbSplit ratio="3:1">...</div>
<div nbSplit ratio="1:2">...</div>
<div nbSplit ratio="1:3">...</div>
<div nbSplit ratio="fill:auto">...</div>
<div nbSplit ratio="auto:fill">...</div>`;

  protected readonly ratios = [
    { value: '1:1', label: '1:1' },
    { value: '2:1', label: '2:1' },
    { value: '3:1', label: '3:1' },
    { value: '1:2', label: '1:2' },
    { value: '1:3', label: '1:3' },
    { value: 'fill:auto', label: 'fill:auto' },
    { value: 'auto:fill', label: 'auto:fill' },
  ] satisfies readonly SplitRatioDemo[];
}
