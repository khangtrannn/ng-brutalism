import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-theming-dark-mode',
  imports: [NbCallout],
  template: `
    <section id="dark-mode">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Dark mode
      </h2>
      <div nbCallout tone="cream" size="sm">
        <p class="normal-case">
          <strong>Not shipped yet.</strong> An earlier partial
          <code class="font-mono">.dark</code> stub covering 6 variables was
          removed rather than left half-finished - a token model that only
          re-derives a handful of variables produces a visibly broken dark
          mode, which is worse than no dark mode at all.
        </p>
      </div>
      <p class="mt-4 font-medium">
        A designed dark theme - every tone re-derived, not just the base
        palette - is tracked as future work once the full token surface (now
        complete) makes it a straightforward derivation rather than a guess.
        Until then, use <code class="font-mono">theme-mono.css</code>
        or a custom preset if you need a darker default.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingDarkMode {}
