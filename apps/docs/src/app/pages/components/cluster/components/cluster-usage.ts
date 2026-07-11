import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-cluster-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Add <code class="font-mono">nbCluster</code> to the parent that owns
        the inline group. Use <code class="font-mono">gap</code> for spacing,
        <code class="font-mono">align</code> for cross-axis alignment,
        <code class="font-mono">justify</code> for distribution, and
        <code class="font-mono">wrap</code> when a row should stay on one
        line.
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
export class ClusterUsage {
  protected readonly importCode = `import { NbCluster } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbCluster gap="2xl" align="center" justify="center">
  <div>
    <div>NB</div>
    <button nbButton size="lg">Ship it</button>
  </div>

  <div>
    <div nbCluster gap="sm" justify="center">
      <span>Logo</span>
      <span>Actions</span>
      <span>Badges</span>
    </div>

    <h2 nbDisplay>Cluster loud.</h2>
    <p>Inline rhythm for logos, actions, badges, and feature rows.</p>
  </div>
</div>`;
}
