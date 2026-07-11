import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-composition-surface-section-api',
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
              class="font-mono text-xs font-bold uppercase px-1.5 py-0.5 border border-(--nb-border)"
              [style.background]="
                input.primitive === 'nbSurface'
                  ? 'var(--nb-yellow)'
                  : 'var(--nb-mint)'
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
        <a class="underline" routerLink="/components/surface">Surface</a>
        and
        <a class="underline" routerLink="/components/section">Section</a>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSurfaceSectionApi {
  protected readonly keyInputs = [
    {
      name: 'tone',
      primitive: 'nbSurface',
      description:
        'Color theme - cream, yellow, pink, mint, lavender, black, white, etc.',
    },
    {
      name: 'radius',
      primitive: 'nbSurface',
      description: 'Corner shape - none, sm, md, lg, xl, full',
    },
    {
      name: 'shadow',
      primitive: 'nbSurface',
      description: 'Brutalist offset depth - none, sm, md, hard, heavy',
    },
    {
      name: 'border',
      primitive: 'nbSurface',
      description: 'Outline strength - none, thin, md, strong, thick',
    },
    {
      name: 'clip',
      primitive: 'nbSurface',
      description: 'Boolean. Clips inner content to the surface radius.',
    },
    {
      name: 'padding',
      primitive: 'nbSection',
      description: 'Internal space - none, xs, sm, md, lg, xl',
    },
    {
      name: 'divider',
      primitive: 'nbSection',
      description:
        'Divider position - top, bottom, left, right, block (top + bottom), inline (left + right), all, none',
    },
    {
      name: 'layout',
      primitive: 'nbSection',
      description: 'Flex layout - default, center, between',
    },
  ];
}
