import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StickerAccessibility } from './components/sticker-accessibility';
import { StickerApi } from './components/sticker-api';
import { StickerHero } from './components/sticker-hero';
import { StickerPreview } from './components/sticker-preview';
import { StickerRotate } from './components/sticker-rotate';
import { StickerShapes } from './components/sticker-shapes';
import { StickerTokens } from './components/sticker-tokens';
import { StickerTones } from './components/sticker-tones';
import { StickerUsage } from './components/sticker-usage';

@Component({
  selector: 'docs-sticker-page',
  imports: [
    StickerHero,
    StickerPreview,
    StickerUsage,
    StickerShapes,
    StickerTones,
    StickerRotate,
    StickerTokens,
    StickerAccessibility,
    StickerApi,
  ],
  template: `
    <article>
      <docs-sticker-hero />
      <docs-sticker-preview />
      <docs-sticker-usage />
      <docs-sticker-shapes />
      <docs-sticker-tones />
      <docs-sticker-rotate />
      <docs-sticker-tokens />
      <docs-sticker-accessibility />
      <docs-sticker-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StickerPage {}
