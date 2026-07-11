import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-design-props-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Concepts</p>
        <h1>Design Props</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Every ng-brutalism primitive draws its visual inputs from the same
          small vocabulary. Learn the 7 categories once and you can predict
          what every component's API looks like before you open its docs page.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignPropsOverview {}
