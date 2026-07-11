import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSticker, NbStickerFace } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-sticker-tones',
  imports: [NbSticker, NbStickerFace, DocsExample],
  template: `
    <section id="tones">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
      <docs-example [code]="tonesExampleCode">
        <div class="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-5">
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              aria-label="Default tone smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">default</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              tone="yellow"
              aria-label="Yellow smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">yellow</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              tone="pink"
              aria-label="Pink smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">pink</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              tone="mint"
              aria-label="Mint smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">mint</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              tone="lavender"
              aria-label="Lavender smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">lavender</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              tone="blue"
              aria-label="Blue smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">blue</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              tone="accent"
              aria-label="Accent smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">accent</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              tone="success"
              aria-label="Success smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">success</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              tone="warning"
              aria-label="Warning smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">warning</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <nb-sticker
              class="sticker-tone-face"
              shape="star"
              tone="danger"
              aria-label="Danger smiling sticker"
            >
              <nb-sticker-face />
            </nb-sticker>
            <span class="font-mono text-xs font-bold">danger</span>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  styles: [
    `
      nb-sticker.sticker-tone-face {
        --nb-sticker-min-inline-size: 7.25rem;
        --nb-sticker-min-block-size: 6.25rem;
        --nb-sticker-max-inline-size: 7.75rem;
        --nb-sticker-max-block-size: 6.75rem;
        --nb-sticker-padding-inline: 2.35rem;
        --nb-sticker-padding-block: 2.15rem;
        --nb-sticker-content-max-inline-size: 58%;
        --nb-sticker-face-size: 2.8rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerTones {
  protected readonly tonesExampleCode = `<nb-sticker class="sticker-tone-face" shape="star" aria-label="Default tone smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="yellow" aria-label="Yellow smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="pink" aria-label="Pink smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="mint" aria-label="Mint smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="lavender" aria-label="Lavender smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="blue" aria-label="Blue smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="accent" aria-label="Accent smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="success" aria-label="Success smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="warning" aria-label="Warning smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="danger" aria-label="Danger smiling sticker">
  <nb-sticker-face />
</nb-sticker>`;
}
