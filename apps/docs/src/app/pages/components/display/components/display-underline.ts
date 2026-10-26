import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDisplay } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-display-underline',
  imports: [DocsExample, NbDisplay],
  template: `
    <section id="underline">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Underline</h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">underline="bar"</code> draws a built-in accent
        bar beneath the text - no extra markup. Use
        <code class="font-mono">"wave"</code> for the squiggly variant. The bar
        is decorative (rendered as a pseudo-element, kept out of the
        accessibility tree). Tune it with the
        <code class="font-mono">--nb-display-underline-*</code> tokens below.
      </p>
      <docs-example [code]="underlineExampleCode">
        <div class="flex flex-col gap-8">
          <h2 nbDisplay size="lg" underline="bar" class="uppercase">SHIP IT</h2>
          <h2 nbDisplay size="lg" underline="wave" class="uppercase">
            STAY SHARP
          </h2>
          <h2
            nbDisplay
            size="lg"
            underline="bar"
            class="uppercase"
            style="--nb-display-underline-color: var(--nb-mint); --nb-display-underline-width: 100%"
          >
            FULL WIDTH
          </h2>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayUnderline {
  protected readonly underlineExampleCode = `<h2 nbDisplay size="lg" underline="bar" class="uppercase">SHIP IT</h2>
<h2 nbDisplay size="lg" underline="wave" class="uppercase">STAY SHARP</h2>

<h2
  nbDisplay
  size="lg"
  underline="bar"
  class="uppercase"
  style="--nb-display-underline-color: var(--nb-mint); --nb-display-underline-width: 100%"
>
  FULL WIDTH
</h2>`;
}
