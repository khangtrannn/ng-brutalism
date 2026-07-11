import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-progress-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A - Progress is static, presentational
        content that visualizes a completion percentage, not an interactive
        widget. <strong>Status:</strong> Stable.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressAccessibility {}
