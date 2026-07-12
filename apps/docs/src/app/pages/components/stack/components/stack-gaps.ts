import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbSurface, type NbStackGap } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface StackGapDemo {
  readonly value: NbStackGap;
  readonly label: string;
}

@Component({
  selector: 'docs-stack-gaps',
  imports: [NbStack, NbSurface, DocsExample],
  template: `
    <section id="gaps">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Gaps</h2>
      <docs-example [code]="gapsExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          @for (gap of gaps; track gap.value) {
            <div nbSurface shadow="sm" class="p-4">
              <div nbStack [gap]="gap.value">
                <span class="font-mono text-xs font-black uppercase">{{
                  gap.label
                }}</span>
                <span
                  class="h-8 border-2 border-(--nb-border) bg-(--nb-yellow)"
                ></span>
                <span
                  class="h-8 border-2 border-(--nb-border) bg-(--nb-mint)"
                ></span>
                <span
                  class="h-8 border-2 border-(--nb-border) bg-(--nb-pink)"
                ></span>
              </div>
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackGaps {
  protected readonly gapsExampleCode = `<div nbStack gap="none">...</div>
<div nbStack gap="xs">...</div>
<div nbStack gap="sm">...</div>
<div nbStack gap="md">...</div>
<div nbStack gap="lg">...</div>
<div nbStack gap="xl">...</div>
<div nbStack gap="2xl">...</div>`;

  protected readonly gaps = [
    { value: 'none', label: 'none' },
    { value: 'xs', label: 'xs' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md' },
    { value: 'lg', label: 'lg' },
    { value: 'xl', label: 'xl' },
    { value: '2xl', label: '2xl' },
  ] satisfies readonly StackGapDemo[];
}
