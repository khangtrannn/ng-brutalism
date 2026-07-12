import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSticker, NbStickerFace } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-sticker-shapes',
  imports: [NbSticker, NbStickerFace, DocsExample],
  template: `
    <section id="shapes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shapes</h2>
      <docs-example [code]="shapesExampleCode">
        <div
          class="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 p-8"
        >
          <div class="flex flex-col items-center gap-4">
            <nb-sticker shape="burst" tone="mint" decorative>BURST</nb-sticker>
            <span class="font-mono text-xs font-bold">burst</span>
          </div>
          <div class="flex flex-col items-center gap-4">
            <nb-sticker shape="burst-wide" tone="yellow" decorative
              >WIDE</nb-sticker
            >
            <span class="font-mono text-xs font-bold">burst-wide</span>
          </div>
          <div class="flex flex-col items-center gap-4">
            <nb-sticker shape="star" tone="pink" aria-label="Face sticker">
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">star</span>
          </div>
          <div class="flex flex-col items-center gap-4">
            <nb-sticker shape="splat" tone="blue" decorative />
            <span class="font-mono text-xs font-bold">splat</span>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerShapes {
  protected readonly shapesExampleCode = `<nb-sticker shape="burst" tone="mint">BURST</nb-sticker>
<nb-sticker shape="burst-wide" tone="yellow">WIDE</nb-sticker>
<nb-sticker shape="star" tone="pink" aria-label="Face sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker shape="splat" tone="blue" decorative />`;
}
