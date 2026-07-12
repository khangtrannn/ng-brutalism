import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-installation-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Getting Started</p>
        <h1>Installation</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Add the UI package to an Angular app with the schematic, or install it
          manually when you want full control over each setup step.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationOverview {}
