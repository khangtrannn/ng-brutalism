import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-accessibility-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Concepts</p>
        <h1>Accessibility</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Interactive primitives follow their
          <a
            href="https://www.w3.org/WAI/ARIA/apg/patterns/"
            target="_blank"
            rel="noreferrer"
            class="underline"
            >WAI-ARIA Authoring Practices Guide (APG)</a
          >
          pattern, are scanned with <code class="font-mono">vitest-axe</code>,
          and have a keyboard-completion spec covering the pattern's full
          interaction model - not just a smoke test.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessibilityOverview {}
