import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-ssr-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Concepts</p>
        <h1>SSR &amp; Hydration</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          ng-brutalism has no browser-only assumptions in its core primitives,
          works under zoneless change detection, and generates ids through an
          injectable counter so server-rendered markup matches the client on
          hydration.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SsrOverview {}
