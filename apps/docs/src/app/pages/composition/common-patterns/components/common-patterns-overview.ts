import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-composition-common-patterns-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <p class="eyebrow">Composition</p>
      <h1>Common Patterns</h1>
      <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
        Copy-pasteable composition patterns built from ng-brutalism
        primitives. Each pattern shows the rendered output and the template -
        adjust tones, radii, and gaps to fit your context.
      </p>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionCommonPatternsOverview {}
