import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-split-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Add <code class="font-mono">nbSplit</code> to the parent that owns two
        regions. Use <code class="font-mono">ratio</code> to size the columns
        and <code class="font-mono">collapse</code> to choose when they stack.
        Separators are centered in the split gap, so avoid pairing
        <code class="font-mono">separator</code> with
        <code class="font-mono">gap="none"</code>.
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
export class SplitUsage {
  protected readonly importCode = `import { NbSplit } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbSplit ratio="2:1" gap="xl" padding="lg">
  <div nbStack gap="md">
    <h2 nbDisplay>Tokyo City Escape</h2>
    <p>Main content</p>
  </div>

  <div nbStack gap="md" align="start">
    <span>$799</span>
    <button nbButton>Book Trip</button>
  </div>
</div>`;
}
