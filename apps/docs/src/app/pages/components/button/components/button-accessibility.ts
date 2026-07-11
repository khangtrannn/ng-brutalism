import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-button-accessibility',
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
        · <strong>Status:</strong> Stable. Renders a real
        <code class="font-mono">&lt;button&gt;</code> (or
        <code class="font-mono">&lt;a&gt;</code> when used as a link), so
        Enter/Space activation, focus, and the
        <code class="font-mono">disabled</code> attribute all come from native
        HTML semantics rather than ARIA reimplementation. When used as an
        anchor, give it an accessible name the same way you would any link -
        visible text or <code class="font-mono">aria-label</code>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonAccessibility {}
