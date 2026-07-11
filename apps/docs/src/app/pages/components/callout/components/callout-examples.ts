import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout, NbSeparator } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-callout-examples',
  imports: [NbCallout, NbSeparator, DocsExample],
  template: `
    <section id="examples">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Examples
      </h2>
      <docs-example [code]="examplesCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          <div nbCallout tone="yellow" size="xl">$799</div>

          <div nbCallout tone="pink" size="lg">
            <span>$420K</span>
          </div>

          <div nbCallout tone="mint" size="md">
            <span>4.9</span>
            <hr nbSeparator orientation="vertical" />
            <span class="text-sm">842 REVIEWS</span>
          </div>

          <div nbCallout tone="lavender" size="lg" layout="between">
            <span>TODAY</span>
            <span>3:30 PM</span>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutExamples {
  protected readonly examplesCode = `<div nbCallout tone="yellow" size="xl">$799</div>

<div nbCallout tone="mint" size="md">
  <span>4.9</span>
  <hr nbSeparator orientation="vertical" />
  <span class="text-sm">842 REVIEWS</span>
</div>

<div nbCallout tone="lavender" size="lg" layout="between">
  <span>TODAY</span>
  <span>3:30 PM</span>
</div>`;
}
