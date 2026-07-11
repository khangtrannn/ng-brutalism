import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-composition-overview-api-language',
  imports: [NbStack],
  template: `
    <section id="api-language" nbStack gap="md" class="scroll-mt-32">
      <h2 data-docs-heading class="text-2xl font-bold">API language</h2>
      <p class="text-base font-medium">
        Every primitive in ng-brutalism speaks the same token vocabulary.
        Learn it once, use it everywhere.
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        @for (token of apiLanguage; track token.name) {
        <div
          class="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
        >
          <code class="font-mono text-sm font-black">{{ token.name }}</code>
          <p class="mt-1 text-sm font-medium text-black/70">
            {{ token.description }}
          </p>
        </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionOverviewApiLanguage {
  protected readonly apiLanguage = [
    { name: 'tone', description: 'Visual intent / color theme' },
    { name: 'size', description: 'Component scale' },
    { name: 'radius', description: 'Corner shape' },
    { name: 'shadow', description: 'Brutalist offset depth' },
    { name: 'border', description: 'Outline strength' },
    { name: 'padding', description: 'Internal space' },
    { name: 'gap', description: 'Child spacing' },
    { name: 'align', description: 'Cross-axis alignment' },
    { name: 'justify', description: 'Main-axis alignment' },
    { name: 'collapse', description: 'Responsive layout behavior' },
    { name: 'clip', description: 'Keep inner regions inside the outer radius' },
    {
      name: 'divider',
      description: 'Border between regions - top, bottom, etc.',
    },
  ];
}
