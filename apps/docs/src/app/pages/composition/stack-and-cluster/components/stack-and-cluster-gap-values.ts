import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSpacing, NbStack } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-composition-stack-cluster-gap-values',
  imports: [NbStack],
  template: `
    <section id="gap-values" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Gap values
      </h2>
      <p class="mb-5 text-base font-medium">
        Both Stack and Cluster use the same gap scale. Pick the right gap for
        the relationship between items - tight for related items, wider for
        distinct groups.
      </p>
      <div
        class="grid gap-4 border-3 border-(--nb-border) bg-white p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
      >
        @for (gap of gapValues; track gap.value) {
        <div class="flex items-center gap-6">
          <code class="w-16 shrink-0 font-mono text-sm font-bold">{{
            gap.value
          }}</code>
          <div nbStack [gap]="gap.value" class="flex-1">
            <div
              class="h-3 border-3 border-(--nb-border)"
              [style.background]="gap.color"
            ></div>
            <div
              class="h-3 border-3 border-(--nb-border)"
              [style.background]="gap.color"
            ></div>
          </div>
          <span class="w-32 shrink-0 text-sm font-medium opacity-70">{{
            gap.use
          }}</span>
        </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionStackClusterGapValues {
  protected readonly gapValues: {
    value: NbSpacing;
    color: string;
    use: string;
  }[] = [
    { value: 'none', color: 'var(--nb-border)', use: 'No gap' },
    { value: 'xs', color: 'var(--nb-yellow)', use: 'Related items' },
    { value: 'sm', color: 'var(--nb-mint)', use: 'Tight groups' },
    { value: 'md', color: 'var(--nb-pink)', use: 'Card sections' },
    { value: 'lg', color: 'var(--nb-lavender)', use: 'Distinct regions' },
    { value: 'xl', color: 'var(--nb-cream)', use: 'Page sections' },
    { value: '2xl', color: 'var(--nb-blue)', use: 'Major sections' },
  ];
}
