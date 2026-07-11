import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-customization-tone',
  imports: [RouterLink],
  template: `
    <section id="tone">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Tone is different
      </h2>
      <p class="font-medium">
        Scalar props (radius, shadow, padding...) are single variables.
        <code class="font-mono">tone</code> is semantic instead - setting it
        reflects <code class="font-mono">data-nb-tone="..."</code> on the
        host, and a whole recipe of background/foreground/border variables
        resolves from that attribute through
        <code class="font-mono">tone.css</code>. See
        <a routerLink="/docs/design-props" class="underline">Design Props</a>
        for the full vocabulary this applies to.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationTone {}
