import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-split-layouts-how-it-works',
  imports: [DocsCodeBlock],
  template: `
    <section id="how-it-works" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        How it works
      </h2>
      <p class="mb-5 text-base font-medium">
        Split uses a CSS grid with two columns. The
        <code class="font-mono">ratio</code> input controls the column
        proportion. The <code class="font-mono">collapse</code> input sets the
        responsive breakpoint where the two columns stack vertically.
      </p>
      <docs-code-block title="Ratios" [code]="ratiosCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSplitLayoutsHowItWorks {
  protected readonly ratiosCode = `<section nbSplit ratio="1:1" gap="lg" collapse="md">...</section>

<section nbSplit ratio="2:1" gap="lg" collapse="md">...</section>

<section nbSplit ratio="3:1" gap="xl" collapse="lg">...</section>

<section nbSplit ratio="fill:auto" gap="lg" collapse="md">...</section>`;
}
