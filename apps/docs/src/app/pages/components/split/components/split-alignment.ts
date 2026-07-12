import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSplit, NbSurface, type NbSplitAlign } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SplitAlignDemo {
  readonly value: NbSplitAlign;
  readonly label: string;
}

@Component({
  selector: 'docs-split-alignment',
  imports: [NbSplit, NbSurface, DocsExample],
  template: `
    <section id="alignment">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Alignment</h2>
      <docs-example [code]="alignmentExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          @for (align of alignments; track align.value) {
            <div nbSurface tone="white" shadow="sm" class="p-4">
              <div nbSplit gap="sm" [align]="align.value" collapse="none">
                <span
                  class="min-h-24 border-2 border-(--nb-border) bg-(--nb-yellow) p-3 font-mono text-xs font-black uppercase"
                  >{{ align.label }}</span
                >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-mint) p-3 font-black"
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
export class SplitAlignment {
  protected readonly alignmentExampleCode = `<div nbSplit align="start">...</div>
<div nbSplit align="center">...</div>
<div nbSplit align="end">...</div>
<div nbSplit align="stretch">...</div>`;

  protected readonly alignments = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'stretch', label: 'stretch' },
  ] satisfies readonly SplitAlignDemo[];
}
