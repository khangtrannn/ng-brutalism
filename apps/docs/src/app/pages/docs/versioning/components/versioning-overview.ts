import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-versioning-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Project</p>
        <h1>Versioning &amp; Roadmap</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Ng Brutalism is pre-1.0. The components are usable today, but the
          public API can still change between minor versions while the library
          settles.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersioningOverview {}
