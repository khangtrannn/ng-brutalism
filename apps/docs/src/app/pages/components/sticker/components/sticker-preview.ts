import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSticker, NbStickerFace } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-sticker-preview',
  imports: [NbSticker, NbStickerFace, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="flex flex-wrap items-center justify-center gap-9 p-8">
          <nb-sticker shape="burst" tone="mint" [rotate]="-8" decorative>
            GROW<br />YOUR<br />SELF
          </nb-sticker>
          <nb-sticker shape="burst-wide" tone="yellow" [rotate]="5" decorative>
            LIMITED<br />
            DROP
          </nb-sticker>
          <nb-sticker shape="star" tone="pink" aria-label="Happy sticker">
            <nb-sticker-face />
          </nb-sticker>
          <nb-sticker shape="splat" tone="blue" decorative />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerPreview {
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
