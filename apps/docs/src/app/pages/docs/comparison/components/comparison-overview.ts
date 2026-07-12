import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-comparison-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Project</p>
        <h1>Comparison</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Ng Brutalism starts from a narrower design promise than most Angular
          UI libraries - neo-brutalist, opinionated visuals rather than a
          neutral base you theme into your own look. That tradeoff is a good fit
          for some projects and a bad fit for others.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonOverview {}
