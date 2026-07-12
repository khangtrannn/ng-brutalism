import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSplit, NbSurface, type NbSplitSeparator } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SplitSeparatorDemo {
  readonly value: NbSplitSeparator;
  readonly label: string;
}

@Component({
  selector: 'docs-split-separators',
  imports: [NbSplit, NbSurface, DocsExample],
  template: `
    <section id="separators">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Separators
      </h2>
      <docs-example [code]="separatorExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4">
          @for (separator of separators; track separator.value) {
            @if (separator.value !== 'none') {
              <div nbSurface tone="cream" shadow="sm">
                <div
                  nbSplit
                  ratio="2:1"
                  gap="lg"
                  padding="md"
                  collapse="none"
                  [separator]="separator.value"
                >
                  <span class="font-black">{{ separator.label }} main</span>
                  <span class="font-medium">Aside</span>
                </div>
              </div>
            }
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitSeparators {
  protected readonly separatorExampleCode = `<div nbSplit ratio="2:1" gap="lg" separator="solid">
  <div>Main</div>
  <div>Aside</div>
</div>

<div nbSplit ratio="2:1" gap="lg" separator="dashed">
  <div>Main</div>
  <div>Aside</div>
</div>

<div nbSplit ratio="2:1" gap="lg" separator="thick">
  <div>Main</div>
  <div>Aside</div>
</div>`;

  protected readonly separators = [
    { value: 'none', label: 'none' },
    { value: 'solid', label: 'solid' },
    { value: 'dashed', label: 'dashed' },
    { value: 'thick', label: 'thick' },
  ] satisfies readonly SplitSeparatorDemo[];
}
