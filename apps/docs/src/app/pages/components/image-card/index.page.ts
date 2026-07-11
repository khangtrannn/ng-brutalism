import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ImageCardAccessibility } from './components/image-card-accessibility';
import { ImageCardApi } from './components/image-card-api';
import { ImageCardHero } from './components/image-card-hero';
import { ImageCardImageOnly } from './components/image-card-image-only';
import { ImageCardPreview } from './components/image-card-preview';
import { ImageCardTokens } from './components/image-card-tokens';
import { ImageCardUsage } from './components/image-card-usage';

@Component({
  selector: 'docs-image-card-page',
  imports: [
    ImageCardHero,
    ImageCardPreview,
    ImageCardUsage,
    ImageCardImageOnly,
    ImageCardTokens,
    ImageCardAccessibility,
    ImageCardApi,
  ],
  template: `
    <article>
      <docs-image-card-hero />
      <docs-image-card-preview />
      <docs-image-card-usage />
      <docs-image-card-image-only />
      <docs-image-card-tokens />
      <docs-image-card-accessibility />
      <docs-image-card-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageCardPage {}
