import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-surface-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Add <code class="font-mono">nbSurface</code> to the element that owns
        the outer panel. Use <code class="font-mono">nbSection</code> for
        internal regions, <code class="font-mono">nbStack</code> for vertical
        rhythm, <code class="font-mono">nbCluster</code> for inline groups, and
        <code class="font-mono">nbSplit</code> for two-region layouts.
      </p>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceUsage {
  protected readonly importCode = `import { NbSurface } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<article
  nbSurface
  tone="yellow"
  radius="xl"
  border="thick"
  shadow="heavy"
  clip
  class="max-w-md"
>
  <div class="border-b-2 border-(--nb-border) bg-nb-primary px-5 py-3">
    <p class="font-mono text-xs font-black uppercase">Launch deck</p>
  </div>
  <div class="p-5">
    <h3>Ship the loud version</h3>
    <p>Surface gives custom layouts the same brutalist frame.</p>
  </div>
</article>`;
}
