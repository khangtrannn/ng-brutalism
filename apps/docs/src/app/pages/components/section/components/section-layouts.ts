import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbSection,
  NbSurface,
  type NbSectionAlign,
  type NbSectionLayout,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SectionLayoutDemo {
  readonly value: NbSectionLayout;
  readonly align: NbSectionAlign;
  readonly label: string;
  readonly hint: string;
}

@Component({
  selector: 'docs-section-layouts',
  imports: [NbSection, NbSurface, DocsExample],
  template: `
    <section id="layouts">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Layouts</h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">layout="default"</code> keeps block flow.
        <code class="font-mono">layout="center"</code> and
        <code class="font-mono">layout="between"</code> switch to flex with
        sensible justify defaults - pair with
        <code class="font-mono">align</code> for cross-axis control.
      </p>
      <docs-example [code]="layoutsExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4">
          @for (layout of layouts; track layout.value) {
          <div nbSurface tone="white" shadow="sm">
            <div
              class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2"
            >
              <span class="font-mono text-xs font-black uppercase">
                layout {{ layout.label }}
              </span>
              <span class="font-mono text-xs font-medium">
                {{ layout.hint }}
              </span>
            </div>
            <div
              nbSection
              padding="md"
              [layout]="layout.value"
              [align]="layout.align"
              class="bg-(--nb-cream)"
            >
              <span
                class="border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-2 font-mono text-xs font-black uppercase"
              >
                Lead
              </span>
              <span
                class="border-2 border-(--nb-border) bg-(--nb-pink) px-3 py-2 font-mono text-xs font-black text-white uppercase"
              >
                Trail
              </span>
            </div>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionLayouts {
  protected readonly layoutsExampleCode = `<div nbSection layout="default">...</div>
<div nbSection layout="center" align="center">...</div>
<div nbSection layout="between" align="center">...</div>`;

  protected readonly layouts = [
    {
      value: 'default',
      align: 'stretch',
      label: 'default',
      hint: 'block flow',
    },
    {
      value: 'center',
      align: 'center',
      label: 'center',
      hint: 'flex, justify-content: center',
    },
    {
      value: 'between',
      align: 'center',
      label: 'between',
      hint: 'flex, justify-content: space-between',
    },
  ] satisfies readonly SectionLayoutDemo[];
}
