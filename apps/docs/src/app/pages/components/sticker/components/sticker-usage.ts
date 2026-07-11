import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-sticker-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
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
export class StickerUsage {
  protected readonly importCode = `import { NbSticker, NbStickerFace } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-sticker shape="burst" tone="mint" [rotate]="-8">
  NEW<br />
  JOB!
</nb-sticker>
<nb-sticker shape="burst-wide" tone="yellow" [rotate]="5">
  LIMITED<br />
  DROP
</nb-sticker>
<nb-sticker shape="star" tone="pink" aria-label="Happy sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker shape="splat" tone="blue" decorative />`;
}
