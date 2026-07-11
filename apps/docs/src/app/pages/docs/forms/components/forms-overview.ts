import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-forms-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Concepts</p>
        <h1>Forms Integration</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Every ng-brutalism control works with
          <code class="font-mono">formControlName</code> and
          <code class="font-mono">[(ngModel)]</code>. Native-element controls
          get this for free from Angular; the one non-native control,
          <code class="font-mono">nb-select</code>, implements
          <code class="font-mono">ControlValueAccessor</code> explicitly to
          match.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsOverview {}
