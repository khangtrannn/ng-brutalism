import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-icon-button-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong>
        <a
          href="https://www.w3.org/WAI/ARIA/apg/patterns/button/"
          target="_blank"
          rel="noreferrer"
          class="underline"
          >Button</a
        >
        · <strong>Status:</strong> Stable. A real
        <code class="font-mono">&lt;button&gt;</code>, so activation and focus
        come from native HTML. Because it's icon-only, there's no visible text
        to supply the accessible name - always set
        <code class="font-mono">aria-label</code> (every example on this page
        does).
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonAccessibility {}
