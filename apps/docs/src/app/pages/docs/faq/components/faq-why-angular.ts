import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-faq-why-angular',
  template: `
    <section id="why-angular">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Why build it for Angular?
      </h2>
      <p class="mb-4 text-base font-medium">
        Angular has a strong component model, and Ng Brutalism is built to fit
        it directly rather than being ported from another framework's
        conventions - directive-first APIs and interaction patterns that feel
        native to Angular applications. See the next question for the specific
        modern-Angular features it targets.
      </p>
      <p class="text-base font-medium">
        Each component can be imported directly into the Angular component that
        uses it, which keeps examples small and makes the API easy to scan.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqWhyAngular {}
