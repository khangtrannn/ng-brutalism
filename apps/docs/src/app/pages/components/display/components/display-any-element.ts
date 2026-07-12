import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDisplay } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-display-any-element',
  imports: [DocsExample, NbDisplay],
  template: `
    <section id="any-element">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Any Element
      </h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">nbDisplay</code> is presentational - apply it to
        a <code class="font-mono">span</code>,
        <code class="font-mono">div</code>, or anything else when display type
        isn't a heading (stats, prices, badges). Pick the element for its
        semantics, not its size.
      </p>
      <docs-example [code]="anyElementExampleCode">
        <div class="flex flex-wrap items-end gap-8">
          <span nbDisplay size="lg">$2.4M</span>
          <span nbDisplay size="lg" class="uppercase">24/7</span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayAnyElement {
  protected readonly anyElementExampleCode = `<span nbDisplay size="lg">$2.4M</span>
<span nbDisplay size="lg" class="uppercase">24/7</span>`;
}
