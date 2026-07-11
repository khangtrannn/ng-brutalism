import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-composition-overview-decision-guide',
  imports: [NbStack],
  template: `
    <section id="decision-guide" nbStack gap="md" class="scroll-mt-32">
      <h2 data-docs-heading class="text-2xl font-bold">Decision guide</h2>
      <div
        class="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]"
      >
        <div
          class="border-b border-white/20 px-5 py-3 font-mono text-xs font-bold tracking-[0.1em] uppercase text-white/70"
        >
          Which primitive do I need?
        </div>
        @for (entry of decisionGuide; track entry.need) {
        <div
          class="flex flex-wrap gap-x-6 gap-y-1 border-b border-white/10 px-5 py-3 last:border-none"
        >
          <span class="shrink-0 font-mono text-xs text-white/50">{{
            entry.need
          }}</span>
          <span
            class="font-mono text-sm font-bold"
            [style.color]="entry.color"
            >→ {{ entry.primitive }}</span
          >
        </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionOverviewDecisionGuide {
  protected readonly decisionGuide = [
    {
      need: 'Need a panel?',
      primitive: 'nbSurface',
      color: 'var(--nb-yellow)',
    },
    {
      need: 'Need header / body / footer inside a panel?',
      primitive: 'nbSection',
      color: 'var(--nb-mint)',
    },
    {
      need: 'Need vertical spacing?',
      primitive: 'nbStack',
      color: 'var(--nb-pink)',
    },
    {
      need: 'Need horizontal or wrapping items?',
      primitive: 'nbCluster',
      color: 'var(--nb-lavender)',
    },
    {
      need: 'Need two columns or main/aside?',
      primitive: 'nbSplit',
      color: 'var(--nb-cream)',
    },
    {
      need: 'Need an action?',
      primitive: 'nbButton or nbIconButton',
      color: '#ffffff',
    },
    {
      need: 'Need metadata?',
      primitive: 'nbChip or nbBadge',
      color: 'var(--nb-yellow)',
    },
    {
      need: 'Need emphasis text?',
      primitive: 'nbTitle, nbDisplay, or nbText',
      color: 'var(--nb-mint)',
    },
    {
      need: 'Need status?',
      primitive: 'nbStatusDot, nbBadge, or nbCallout',
      color: 'var(--nb-pink)',
    },
  ];
}
