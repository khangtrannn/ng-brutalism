import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-theming-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Concepts</p>
        <h1>Dark Mode &amp; Theming</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Every visual token flows through
          <code class="font-mono">--nb-*</code>
          CSS variables, so a full rebrand - including the entire 16-tone
          palette - is a stylesheet swap, not a component edit.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingOverview {}
