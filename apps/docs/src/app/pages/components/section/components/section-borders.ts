import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSection, NbSurface, type NbSectionDivider } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SectionDividerDemo {
  readonly value: NbSectionDivider;
  readonly label: string;
  readonly hint: string;
}

@Component({
  selector: 'docs-section-borders',
  imports: [NbSection, NbSurface, DocsExample],
  template: `
    <section id="borders">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Dividers</h2>
      <p class="mb-4 font-medium">
        Sections share <code class="font-mono">--nb-border</code> and
        <code class="font-mono">--nb-border-width</code> with the rest of the
        system, so a single side never goes out of sync. Use
        <code class="font-mono">block</code> for top + bottom or
        <code class="font-mono">inline</code> for left + right;
        <code class="font-mono">all</code> for a fully outlined region.
      </p>
      <docs-example [code]="bordersExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          @for (border of borders; track border.value) {
            <div nbSurface tone="cream" shadow="sm">
              <div
                class="border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2 font-mono text-xs font-black uppercase"
              >
                divider {{ border.label }}
              </div>
              <div class="p-4">
                <div nbSection padding="md" [divider]="border.value">
                  <div
                    class="grid h-12 place-items-center border-2 border-(--nb-border) bg-(--nb-mint) px-3 font-mono text-xs font-black uppercase"
                  >
                    {{ border.hint }}
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
export class SectionBorders {
  protected readonly bordersExampleCode = `<div nbSection divider="top">...</div>
<div nbSection divider="right">...</div>
<div nbSection divider="bottom">...</div>
<div nbSection divider="left">...</div>
<div nbSection divider="block">...</div>
<div nbSection divider="inline">...</div>
<div nbSection divider="all">...</div>`;

  protected readonly borders = [
    { value: 'top', label: 'top', hint: 'line above' },
    { value: 'right', label: 'right', hint: 'line on the right' },
    { value: 'bottom', label: 'bottom', hint: 'line below' },
    { value: 'left', label: 'left', hint: 'line on the left' },
    { value: 'block', label: 'block', hint: 'top + bottom' },
    { value: 'inline', label: 'inline', hint: 'left + right' },
    { value: 'all', label: 'all', hint: 'fully outlined' },
  ] satisfies readonly SectionDividerDemo[];
}
