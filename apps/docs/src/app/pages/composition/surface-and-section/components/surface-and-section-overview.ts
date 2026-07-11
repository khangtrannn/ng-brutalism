import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-composition-surface-section-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <p class="eyebrow">Composition</p>
      <h1>Surface & Section</h1>
      <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
        <code class="font-mono">nbSurface</code> creates the outer brutalist
        container. <code class="font-mono">nbSection</code> creates internal
        regions. Together they replace repeated card shell markup with a
        clear, intentional structure.
      </p>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSurfaceSectionOverview {}
