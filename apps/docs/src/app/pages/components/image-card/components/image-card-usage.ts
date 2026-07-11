import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-image-card-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <docs-code-block
        class="block mb-5"
        title="Import"
        [code]="importCode"
      />
      <docs-code-block title="Template" [code]="templateCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardUsage {
  protected readonly importCode = `import { NbImageCard, NbImageCardCaption, NbTitle } from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<nb-image-card [image]="imageUrl" alt="A descriptive alt text">
  <nb-image-card-caption>
    Image caption
  </nb-image-card-caption>
</nb-image-card>`;
}
