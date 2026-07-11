import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-faq-tailwind-v4',
  imports: [RouterLink],
  template: `
    <section id="tailwind-v4">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Does it require Tailwind CSS v4?
      </h2>
      <p class="text-base font-medium">
        No - <code class="font-mono text-sm">tailwindcss</code> is an optional
        peer dependency. Component styling ships as a static, self-contained
        CSS file that needs no Tailwind processing to render correctly. The
        <code class="font-mono text-sm">ng add</code>
        schematic sets up Tailwind CSS v4 by default as a convenience for your
        own app code, but it isn't required by the library itself - see
        <a routerLink="/docs/without-tailwind" class="underline"
          >Without Tailwind</a
        >
        for manual setup.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqTailwindV4 {}
