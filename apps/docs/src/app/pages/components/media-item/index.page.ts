import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MediaItemAccessibility } from './components/media-item-accessibility';
import { MediaItemAlignment } from './components/media-item-alignment';
import { MediaItemApi } from './components/media-item-api';
import { MediaItemHero } from './components/media-item-hero';
import { MediaItemOrientations } from './components/media-item-orientations';
import { MediaItemPreview } from './components/media-item-preview';
import { MediaItemSizes } from './components/media-item-sizes';
import { MediaItemTokens } from './components/media-item-tokens';
import { MediaItemUsage } from './components/media-item-usage';
import { MediaItemVariants } from './components/media-item-variants';
import { MediaItemWithDescription } from './components/media-item-with-description';

@Component({
  selector: 'docs-media-item-page',
  imports: [
    MediaItemHero,
    MediaItemPreview,
    MediaItemUsage,
    MediaItemVariants,
    MediaItemOrientations,
    MediaItemWithDescription,
    MediaItemSizes,
    MediaItemAlignment,
    MediaItemTokens,
    MediaItemAccessibility,
    MediaItemApi,
  ],
  template: `
    <article>
      <docs-media-item-hero />
      <docs-media-item-preview />
      <docs-media-item-usage />
      <docs-media-item-variants />
      <docs-media-item-orientations />
      <docs-media-item-with-description />
      <docs-media-item-sizes />
      <docs-media-item-alignment />
      <docs-media-item-tokens />
      <docs-media-item-accessibility />
      <docs-media-item-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MediaItemPage {}
