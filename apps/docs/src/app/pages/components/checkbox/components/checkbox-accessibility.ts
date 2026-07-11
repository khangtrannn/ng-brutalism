import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-checkbox-accessibility',
  imports: [RouterLink],
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong>
        <a
          href="https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"
          target="_blank"
          rel="noreferrer"
          class="underline"
          >Checkbox</a
        >
        · <strong>Status:</strong> Stable. Renders a real
        <code class="font-mono">&lt;input type="checkbox"&gt;</code>, so
        checked state, keyboard toggling with Space, and
        <code class="font-mono">formControlName</code>/
        <code class="font-mono">[(ngModel)]</code> binding all come from the
        browser and Angular's built-in
        <code class="font-mono">DefaultValueAccessor</code> - no custom ARIA
        state to keep in sync. Pair it with
        <code class="font-mono">nbLabel</code> (or wrap both in
        <a routerLink="/components/field" class="underline">nb-field</a>) so
        the checkbox has an accessible name.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxAccessibility {}
