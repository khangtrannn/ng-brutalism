import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSticker } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-sticker-rotate',
  imports: [NbSticker, DocsExample],
  template: `
    <section id="rotate">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Rotation
      </h2>
      <docs-example [code]="rotateExampleCode">
        <div class="flex flex-wrap items-center gap-8 p-6">
          <nb-sticker tone="yellow" [rotate]="-12" decorative>-12</nb-sticker>
          <nb-sticker tone="pink" [rotate]="0" decorative>0</nb-sticker>
          <nb-sticker tone="mint" [rotate]="12" decorative>+12</nb-sticker>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerRotate {
  protected readonly rotateExampleCode = `<nb-sticker tone="yellow" [rotate]="-12">-12</nb-sticker>
<nb-sticker tone="pink" [rotate]="0">0</nb-sticker>
<nb-sticker tone="mint" [rotate]="12">+12</nb-sticker>`;
}
