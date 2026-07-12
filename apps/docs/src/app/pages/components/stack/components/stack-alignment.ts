import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbSurface, type NbStackAlign } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface StackAlignDemo {
  readonly value: NbStackAlign;
  readonly label: string;
}

@Component({
  selector: 'docs-stack-alignment',
  imports: [NbStack, NbSurface, DocsExample],
  template: `
    <section id="alignment">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Alignment</h2>
      <docs-example [code]="alignmentExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          @for (align of alignments; track align.value) {
            <div nbSurface tone="cream" shadow="sm" class="p-4">
              <div nbStack gap="sm" [align]="align.value">
                <span class="font-mono text-xs font-black uppercase">{{
                  align.label
                }}</span>
                <span
                  class="w-18 border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-2 text-center font-black"
                  >A</span
                >
                <span
                  class="w-28 border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-2 text-center font-black"
                  >B</span
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
export class StackAlignment {
  protected readonly alignmentExampleCode = `<div nbStack gap="sm" align="stretch">...</div>
<div nbStack gap="sm" align="start">...</div>
<div nbStack gap="sm" align="center">...</div>
<div nbStack gap="sm" align="end">...</div>`;

  protected readonly alignments = [
    { value: 'stretch', label: 'stretch' },
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
  ] satisfies readonly StackAlignDemo[];
}
