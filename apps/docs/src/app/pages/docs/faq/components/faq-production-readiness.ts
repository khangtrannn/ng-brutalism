import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-faq-production-readiness',
  imports: [RouterLink],
  template: `
    <section id="production-readiness">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Is it production ready?
      </h2>
      <p class="text-base font-medium">
        Ng Brutalism is pre-1.0. The components are usable today, but minor
        API changes can happen while the library hardens. It is a good fit for
        prototypes, portfolios, launch pages, side projects, and teams willing
        to track early releases. For conservative enterprise systems, wait for
        a later stable release - see
        <a routerLink="/docs/versioning" class="underline"
          >Versioning &amp; Roadmap</a
        >
        for the exact v1.0 criteria, and
        <a routerLink="/docs/comparison" class="underline">Comparison</a>
        for when another library is the better fit today.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqProductionReadiness {}
