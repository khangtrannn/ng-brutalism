import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-accessibility-testing-policy',
  imports: [NbCallout, RouterLink],
  template: `
    <section id="testing-policy">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Testing policy
      </h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">vitest-axe</code> runs against real rendered
        fixtures for dialog, select, accordion, and
        <a routerLink="/components/field" class="underline">field</a> - both
        closed/valid and open/invalid states, since an invalid, error-linked
        control is a distinct accessibility surface from a clean one. The dialog
        fixture sets the native <code class="font-mono">open</code> attribute
        directly, since jsdom doesn't implement
        <code class="font-mono">showModal()</code>.
      </p>
      <div nbCallout tone="cream" size="sm">
        <p class="normal-case">
          The select popup's escape from an
          <code class="font-mono">overflow:hidden</code> ancestor and the
          <code class="font-mono">formControlName</code>
          round-trip are the two things the unit-test suite can't prove on its
          own - both were confirmed in a real Chromium session (Playwright) with
          zero console errors.
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessibilityTestingPolicy {}
