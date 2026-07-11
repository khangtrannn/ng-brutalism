import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardAccessibility } from './components/card-accessibility';
import { CardActions } from './components/card-actions';
import { CardHero } from './components/card-hero';
import { CardParts } from './components/card-parts';
import { CardPreview } from './components/card-preview';
import { CardTokens } from './components/card-tokens';
import { CardUsage } from './components/card-usage';

@Component({
  selector: 'docs-card-page',
  imports: [
    CardHero,
    CardPreview,
    CardUsage,
    CardParts,
    CardActions,
    CardTokens,
    CardAccessibility,
  ],
  template: `
    <article>
      <docs-card-hero />
      <docs-card-preview />
      <docs-card-usage />
      <docs-card-parts />
      <docs-card-actions />
      <docs-card-tokens />
      <docs-card-accessibility />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardPage {}
