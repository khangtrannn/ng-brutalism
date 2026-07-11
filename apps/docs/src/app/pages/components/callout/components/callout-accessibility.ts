import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-callout-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A - Callout is a static,
        presentational directive for emphasizing a compact value, not an
        interactive widget. <strong>Status:</strong> Stable.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutAccessibility {}
