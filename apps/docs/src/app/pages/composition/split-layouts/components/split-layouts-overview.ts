import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-composition-split-layouts-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <p class="eyebrow">Composition</p>
      <h1>Split Layouts</h1>
      <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
        <code class="font-mono">nbSplit</code> creates two-region layouts -
        hero sections, media/content pairs, sidebar layouts, pricing sections,
        and profile cards. It replaces repeated grid boilerplate with a
        single, responsive primitive.
      </p>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSplitLayoutsOverview {}
