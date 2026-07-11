import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-callout-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Add <code class="font-mono">nbCallout</code> to the element that owns
        the emphasized value. Compose icons, labels, dividers, and secondary
        text inside the host with normal template markup.
      </p>
      <docs-code-block
        class="block mb-5"
        title="Import"
        [code]="importCode"
      />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutUsage {
  protected readonly importCode = `import { NbCallout, NbSeparator } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbCallout tone="yellow" size="xl">
  $799
</div>`;
}
