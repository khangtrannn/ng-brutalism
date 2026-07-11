import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-composition-overview-overview',
  imports: [NbStack],
  template: `
    <header
      id="overview"
      nbStack
      gap="sm"
      align="start"
      class="relative scroll-mt-32"
    >
      <p class="eyebrow">Composition</p>
      <h1>Build loud. Compose smart.</h1>
      <p class="max-w-3xl text-base font-medium sm:text-lg">
        v0.2.0 introduces a composition system for building loud,
        token-driven, Angular-first brutalist UIs. Small primitives that lock
        together like LEGO - each primitive owns one job, and they compose to
        build anything.
      </p>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionOverviewOverview {}
