import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-status-dot-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A - StatusDot is a static
        presence/availability indicator, not an interactive widget.
        <strong>Status:</strong> Stable.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDotAccessibility {}
