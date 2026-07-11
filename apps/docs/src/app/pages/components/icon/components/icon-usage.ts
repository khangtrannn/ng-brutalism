import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-icon-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Add <code class="font-mono">nbIcon</code> to any
        <code class="font-mono">&lt;span&gt;</code>. Provide a
        <code class="font-mono">src</code> path and mark the icon as
        <code class="font-mono">decorative</code> or give it a
        <code class="font-mono">label</code>. The
        <code class="font-mono">src</code> input is intended for trusted local
        icon/image assets; do not pass unsanitized user-generated URLs.
      </p>
      <docs-code-block
        class="block mb-5"
        title="Import"
        [code]="importCode"
      />
      <docs-code-block title="Template" [code]="usageCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconUsage {
  protected readonly importCode = `import { NbIcon } from '@ng-brutalism/ui';`;

  protected readonly usageCode = `<span nbIcon src="/icons/plane.svg" size="sm" decorative></span>

<span nbIcon src="/icons/warning.svg" size="md" tone="danger" label="Warning"></span>

<span nbIcon src="/icons/star.svg" size="xl" tone="warning" decorative></span>

<span nbIcon src="/icons/avatar-badge.png" mode="image" size="xl" label="Verified"></span>`;
}
