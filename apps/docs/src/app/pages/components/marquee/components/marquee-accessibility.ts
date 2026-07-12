import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-marquee-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A - a decorative scrolling ticker, not
        an interactive widget. <strong>Status:</strong> Preview. The animation
        freezes under
        <code class="font-mono">prefers-reduced-motion: reduce</code>
        (WCAG 2.2.2, Pause/Stop/Hide) rather than just slowing down, and pauses
        on hover by default so the content can be read without chasing it.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeAccessibility {}
