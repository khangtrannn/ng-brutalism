import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-composition-split-layouts-api',
  imports: [RouterLink],
  template: `
    <section id="api" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Key inputs
      </h2>
      <div class="grid gap-3 sm:grid-cols-2">
        @for (input of keyInputs; track input.name + input.description) {
          <div
            class="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
          >
            <code class="font-mono text-sm font-black">{{ input.name }}</code>
            <p class="mt-1.5 text-sm font-medium text-black/70">
              {{ input.description }}
            </p>
          </div>
        }
      </div>
      <p class="mt-5 text-sm font-medium">
        See the full API:
        <a class="underline" routerLink="/components/split">Split</a>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSplitLayoutsApi {
  protected readonly keyInputs = [
    {
      name: 'ratio',
      description:
        'Column proportions - 1:1, 2:1, 3:1, 1:2, 1:3, fill:auto, auto:fill',
    },
    {
      name: 'collapse',
      description: 'Breakpoint where columns stack - none, sm, md, lg',
    },
    {
      name: 'gap',
      description:
        'Space between the two columns - none, xs, sm, md, lg, xl, 2xl',
    },
    {
      name: 'align',
      description: 'Cross-axis alignment - start, center, end, stretch',
    },
    {
      name: 'separator',
      description: 'Vertical divider - none, solid, dashed, thick',
    },
    {
      name: 'padding',
      description:
        'Inner padding on the split container - none, xs, sm, md, lg, xl',
    },
  ];
}
