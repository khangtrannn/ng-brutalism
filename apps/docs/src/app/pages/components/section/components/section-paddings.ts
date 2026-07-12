import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSection, NbSurface, type NbSectionPadding } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SectionPaddingDemo {
  readonly value: NbSectionPadding;
  readonly label: string;
}

@Component({
  selector: 'docs-section-paddings',
  imports: [NbSection, NbSurface, DocsExample],
  template: `
    <section id="paddings">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Paddings</h2>
      <p class="mb-4 font-medium">
        Padding is the most common knob. Inline layouts (headers, footers,
        toolbars) usually take <code class="font-mono">md</code> to
        <code class="font-mono">lg</code>; hero rows take
        <code class="font-mono">xl</code>.
      </p>
      <docs-example [code]="paddingsExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          @for (padding of paddings; track padding.value) {
            <div nbSurface tone="white" shadow="sm">
              <div
                class="border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2 font-mono text-xs font-black uppercase"
              >
                padding {{ padding.label }}
              </div>
              <div nbSection [padding]="padding.value">
                <div
                  class="grid h-12 place-items-center border-2 border-(--nb-border) bg-(--nb-yellow) font-mono text-xs font-black uppercase"
                >
                  content
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
export class SectionPaddings {
  protected readonly paddingsExampleCode = `<div nbSection padding="none">...</div>
<div nbSection padding="xs">...</div>
<div nbSection padding="sm">...</div>
<div nbSection padding="md">...</div>
<div nbSection padding="lg">...</div>
<div nbSection padding="xl">...</div>`;

  protected readonly paddings = [
    { value: 'none', label: 'none' },
    { value: 'xs', label: 'xs' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md' },
    { value: 'lg', label: 'lg' },
    { value: 'xl', label: 'xl' },
  ] satisfies readonly SectionPaddingDemo[];
}
