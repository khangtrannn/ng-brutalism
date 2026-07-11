import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MediaFrameAccessibility } from './components/media-frame-accessibility';
import { MediaFrameApi } from './components/media-frame-api';
import { MediaFrameFit } from './components/media-frame-fit';
import { MediaFrameHero } from './components/media-frame-hero';
import { MediaFramePreview } from './components/media-frame-preview';
import { MediaFrameRatios } from './components/media-frame-ratios';
import { MediaFrameShape } from './components/media-frame-shape';
import { MediaFrameTokens } from './components/media-frame-tokens';
import { MediaFrameUsage } from './components/media-frame-usage';

@Component({
  selector: 'docs-media-frame-page',
  imports: [
    MediaFrameHero,
    MediaFramePreview,
    MediaFrameUsage,
    MediaFrameRatios,
    MediaFrameFit,
    MediaFrameShape,
    MediaFrameTokens,
    MediaFrameAccessibility,
    MediaFrameApi,
  ],
  template: `
    <article>
      <docs-media-frame-hero />
      <docs-media-frame-preview />
      <docs-media-frame-usage />
      <docs-media-frame-ratios />
      <docs-media-frame-fit />
      <docs-media-frame-shape />
      <docs-media-frame-tokens />
      <docs-media-frame-accessibility />
      <docs-media-frame-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MediaFramePage {}
