import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RatingAccessibility } from './components/rating-accessibility';
import { RatingApi } from './components/rating-api';
import { RatingCustomMax } from './components/rating-custom-max';
import { RatingHero } from './components/rating-hero';
import { RatingPreview } from './components/rating-preview';
import { RatingTokens } from './components/rating-tokens';
import { RatingUsage } from './components/rating-usage';
import { RatingValues } from './components/rating-values';
import { RatingWithCount } from './components/rating-with-count';

@Component({
  selector: 'docs-rating-page',
  imports: [
    RatingHero,
    RatingPreview,
    RatingUsage,
    RatingValues,
    RatingWithCount,
    RatingCustomMax,
    RatingTokens,
    RatingAccessibility,
    RatingApi,
  ],
  template: `
    <article>
      <docs-rating-hero />
      <docs-rating-preview />
      <docs-rating-usage />
      <docs-rating-values />
      <docs-rating-with-count />
      <docs-rating-custom-max />
      <docs-rating-tokens />
      <docs-rating-accessibility />
      <docs-rating-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RatingPage {}
