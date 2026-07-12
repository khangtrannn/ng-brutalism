import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-chip-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A - a chip is a
        <code class="font-mono">&lt;span&gt;</code>, presentational by default.
        When used as a removable/selectable control (not currently built in),
        give it a real interactive role and keyboard handling rather than
        relying on the visual style alone. <strong>Status:</strong> Stable.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipAccessibility {}
