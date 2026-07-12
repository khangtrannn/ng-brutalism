import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-composition-stack-cluster-api',
  imports: [RouterLink],
  template: `
    <section id="api" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Key inputs
      </h2>
      <div class="grid gap-3 sm:grid-cols-2">
        @for (input of keyInputs; track input.name) {
          <div
            class="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
          >
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm font-black">{{ input.name }}</code>
              <span
                class="border border-(--nb-border) px-1.5 py-0.5 font-mono text-xs font-bold uppercase"
                [style.background]="
                  input.primitive === 'nbStack'
                    ? 'var(--nb-mint)'
                    : 'var(--nb-pink)'
                "
                >{{ input.primitive }}</span
              >
            </div>
            <p class="mt-1.5 text-sm font-medium text-black/70">
              {{ input.description }}
            </p>
          </div>
        }
      </div>
      <p class="mt-5 text-sm font-medium">
        See the full APIs:
        <a class="underline" routerLink="/components/stack">Stack</a>
        and
        <a class="underline" routerLink="/components/cluster">Cluster</a>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionStackClusterApi {
  protected readonly keyInputs = [
    {
      name: 'gap',
      primitive: 'nbStack',
      description: 'Vertical spacing - none, xs, sm, md, lg, xl, 2xl',
    },
    {
      name: 'align',
      primitive: 'nbStack',
      description: 'Cross-axis - stretch, start, center, end',
    },
    {
      name: 'justify',
      primitive: 'nbStack',
      description: 'Main-axis - start, center, end, between',
    },
    {
      name: 'separator',
      primitive: 'nbStack',
      description: 'Divider between children - none, solid, dashed, thick',
    },
    {
      name: 'gap',
      primitive: 'nbCluster',
      description: 'Horizontal spacing - none, xs, sm, md, lg, xl, 2xl',
    },
    {
      name: 'align',
      primitive: 'nbCluster',
      description: 'Cross-axis - start, center, end, baseline, stretch',
    },
    {
      name: 'justify',
      primitive: 'nbCluster',
      description: 'Main-axis - start, center, end, between',
    },
    {
      name: 'wrap',
      primitive: 'nbCluster',
      description: 'Wrapping - wrap (default), nowrap',
    },
    {
      name: 'separator',
      primitive: 'nbCluster',
      description: 'Divider between items - none, solid, dashed, thick',
    },
    {
      name: 'padding',
      primitive: 'nbCluster',
      description: 'Internal space - none, xs, sm, md, lg, xl',
    },
  ];
}
