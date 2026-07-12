import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-section-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Add <code class="font-mono">nbSection</code> to the wrapper around any
        region inside a surface or card. Pair it with
        <code class="font-mono">padding</code>,
        <code class="font-mono">divider</code>, and
        <code class="font-mono">layout</code> to compose headers, content, and
        footers without ad-hoc utility classes.
      </p>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionUsage {
  protected readonly importCode = `import { NbSection } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbSurface tone="cream" shadow="hard" radius="lg" clip>
  <div nbSection divider="bottom" padding="lg" layout="between" align="center">
    <h2 nbDisplay>Alpha Launch</h2>
    <span nbChip tone="mint">Active</span>
  </div>

  <div nbSection padding="lg">
    <p>Section owns the inner regions of a card.</p>
  </div>

  <div nbSection divider="top" padding="lg" layout="between" align="center">
    <span>12 collaborators</span>
    <button nbButton>Open project</button>
  </div>
</div>`;
}
