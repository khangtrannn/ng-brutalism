import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-customization-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Concepts</p>
        <h1>Customization</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          ng-brutalism has one customization surface, not three. Angular inputs
          and CSS custom properties write to the
          <strong>same public slot</strong> - there's no separate class API and
          no input-only escape hatch. Once you know the rule, you can predict
          how any override resolves without reading source.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationOverview {}
