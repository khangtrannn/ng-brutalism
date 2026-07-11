import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-input-group-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A - a visual wrapper around a real
        <code class="font-mono">&lt;input&gt;</code> or
        <code class="font-mono">&lt;textarea&gt;</code>; the prefix/suffix
        addons are presentational and don't participate in the form control's
        accessible name. <strong>Status:</strong> Stable. Label the inner
        control the same way you would a bare
        <code class="font-mono">nbInput</code> - the addon text alone isn't a
        substitute for a <code class="font-mono">nbLabel</code> or
        <code class="font-mono">aria-label</code>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupAccessibility {}
