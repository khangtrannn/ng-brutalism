import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-faq-ssr',
  imports: [RouterLink],
  template: `
    <section id="ssr">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Does it work with SSR?
      </h2>
      <p class="text-base font-medium">
        Yes. The docs site itself is prerendered with Analog and Angular. The
        UI package avoids browser-only assumptions in core primitives,
        generates ids through an injectable counter so hydration can't
        mismatch, and keeps browser-dependent behavior behind Angular platform
        checks. See
        <a routerLink="/docs/ssr" class="underline">SSR &amp; Hydration</a>
        for details.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSsr {}
