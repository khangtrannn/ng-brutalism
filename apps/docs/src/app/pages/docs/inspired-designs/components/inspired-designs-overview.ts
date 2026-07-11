import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-inspired-designs-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Getting Started</p>
        <h1>Inspired Designs</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Neo-brutalist UI ideas to reference and make your own, built with
          @ng-brutalism/ui primitives.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspiredDesignsOverview {}
