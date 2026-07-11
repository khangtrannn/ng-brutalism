import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-faq-who-made-it',
  template: `
    <section id="who-made-it">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Who made Ng Brutalism?
      </h2>
      <p class="text-base font-medium">
        Ng Brutalism was created by Khang Tran, is MIT licensed, and is
        published to npm as
        <code class="font-mono text-sm">&#64;ng-brutalism/ui</code>. The
        source code is available on GitHub.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqWhoMadeIt {}
