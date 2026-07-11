import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TextAccessibility } from './components/text-accessibility';
import { TextApi } from './components/text-api';
import { TextComposition } from './components/text-composition';
import { TextHero } from './components/text-hero';
import { TextLeading } from './components/text-leading';
import { TextMeasure } from './components/text-measure';
import { TextPreview } from './components/text-preview';
import { TextSizes } from './components/text-sizes';
import { TextTokens } from './components/text-tokens';
import { TextTones } from './components/text-tones';
import { TextTracking } from './components/text-tracking';
import { TextTransform } from './components/text-transform';
import { TextUnderline } from './components/text-underline';
import { TextUsage } from './components/text-usage';
import { TextWeights } from './components/text-weights';

@Component({
  selector: 'docs-text-page',
  imports: [
    TextHero,
    TextPreview,
    TextUsage,
    TextSizes,
    TextWeights,
    TextTones,
    TextTransform,
    TextTracking,
    TextMeasure,
    TextLeading,
    TextUnderline,
    TextComposition,
    TextTokens,
    TextAccessibility,
    TextApi,
  ],
  template: `
    <article>
      <docs-text-hero />
      <docs-text-preview />
      <docs-text-usage />
      <docs-text-sizes />
      <docs-text-weights />
      <docs-text-tones />
      <docs-text-transform />
      <docs-text-tracking />
      <docs-text-measure />
      <docs-text-leading />
      <docs-text-underline />
      <docs-text-composition />
      <docs-text-tokens />
      <docs-text-accessibility />
      <docs-text-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextPage {}
