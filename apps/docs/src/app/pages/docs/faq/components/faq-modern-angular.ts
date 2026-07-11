import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-faq-modern-angular',
  template: `
    <section id="modern-angular">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Does it support signals and zoneless Angular?
      </h2>
      <p class="text-base font-medium">
        Yes. The library is designed for modern Angular: standalone imports,
        signal-friendly internals, and zoneless-friendly interaction patterns.
        You can use Ng Brutalism in a zoneless app, and you can also use it in
        Angular apps that still run with zone.js.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqModernAngular {}
