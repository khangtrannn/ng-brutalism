import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbSection,
  NbSurface,
  type NbSectionDividerStyle,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SectionDividerStyleDemo {
  readonly value: NbSectionDividerStyle;
  readonly label: string;
}

@Component({
  selector: 'docs-section-border-styles',
  imports: [NbSection, NbSurface, DocsExample],
  template: `
    <section id="border-styles">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Divider styles
      </h2>
      <docs-example [code]="borderStylesExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-3">
          @for (style of borderStyles; track style.value) {
            <div nbSurface tone="white" shadow="sm">
              <div
                class="border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2 font-mono text-xs font-black uppercase"
              >
                {{ style.label }}
              </div>
              <div class="p-4">
                <div
                  nbSection
                  padding="md"
                  divider="all"
                  [dividerStyle]="style.value"
                >
                  <div
                    class="grid h-12 place-items-center border-2 border-(--nb-border) bg-(--nb-lavender) px-3 font-mono text-xs font-black uppercase"
                  >
                    {{ style.label }} edge
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionBorderStyles {
  protected readonly borderStylesExampleCode = `<div nbSection divider="all" dividerStyle="solid">...</div>
<div nbSection divider="all" dividerStyle="dashed">...</div>
<div nbSection divider="all" dividerStyle="dotted">...</div>`;

  protected readonly borderStyles = [
    { value: 'solid', label: 'solid' },
    { value: 'dashed', label: 'dashed' },
    { value: 'dotted', label: 'dotted' },
  ] satisfies readonly SectionDividerStyleDemo[];
}
