import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-textarea-accessibility',
  imports: [RouterLink],
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A -
        <code class="font-mono">nbTextarea</code> is a directive on a real
        <code class="font-mono">&lt;textarea&gt;</code> element, so it
        inherits native semantics with no separate widget pattern.
        <strong>Status:</strong> Stable. Pair it with
        <code class="font-mono">nbLabel</code> - or wrap both in
        <a routerLink="/components/field" class="underline">nb-field</a> for
        generated id linking plus description/error wiring - so every textarea
        has an accessible name.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaAccessibility {}
